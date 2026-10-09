const $ = (id) => document.getElementById(id);
const maybe = (id) => document.getElementById(id);

/// Translate a UI string. Keys are the English source text; i18n.js maps
/// them for zh-CN. Falls back to the raw key (placeholders interpolated)
/// if i18n.js has not loaded.
const t = (key, params) => (window.RobonixI18N
  ? window.RobonixI18N.t(key, params)
  : String(key ?? "").replace(/\{([a-zA-Z0-9_]+)\}/g, (whole, name) => (
    params && params[name] !== undefined && params[name] !== null ? String(params[name]) : whole
  )));

const state = {
  settings: {},
  sessionId: getSessionId(),
  sessionTitle: "",
  attachments: [],
  messages: [],
  timeline: [],
  plan: null,
  planRecords: [],
  taskState: null,
  batches: [],
  nodeStates: {},
  executorPlans: [],
  executorPlansReady: false,
  executorPlanIds: new Set(),
  executorMissingPolls: new Map(),
  activeAgentId: null,
  history: loadConversations(),
  busy: false,
  taskRunning: false,
  activeStreams: 0,
  interactionSockets: new Set(),
  activeTurnId: "",
  activePilotSessionId: "",
  stopInFlight: false,
  voiceActive: false,
  activeVoiceSocket: null,
  activeVoiceMode: "voice",
  voiceFinishSupported: false,
  finishInFlight: false,
  // Whether the microphone is actually capturing right now. Distinct from
  // voiceActive, which stays true through ASR, Pilot, and TTS playback --
  // the finish control only makes sense while audio is still being recorded.
  voiceRecording: false,
  ttsPlaying: false,
  handsfree: { available: false, enabled: false, state: "unavailable", busy: false },
  // Last /api/system payload, so a language switch can re-render the
  // connection summary without waiting for the next 7 s poll.
  lastSystemData: null,
  handsfreeSocket: null,
  handsfreeReconnect: null,
  audio: {
    port: 60000,
    wsUrl: "",
    devices: [],
    inputCurrent: null,
    outputCurrent: null,
    vuSocket: null,
    vuState: "idle",
    logSocket: null,
    logLines: [],
    levelHistory: Array(28).fill(0),
    outputLevelTarget: 0,
    auraLevel: 0,
    auraFrame: 0,
    route: { micProviders: [], speakerProviders: [], micDevices: [], speakerDevices: [] },
  },
};

/// Name captured for a New session click that is still in flight.
///
/// Pressing the button blurs the name field first, so without this the typed
/// name would be committed as a rename of the session being left and the new
/// one would open unnamed -- two chats from one click. null means no click is
/// pending and the field behaves as a plain rename box.
let pendingNewSessionTitle = null;

const DEFAULT_ATLAS_PORT = 50051;
const AUDIO_LOG_MAX_LINES = 120;
const AUDIO_LOG_MAX_CHARS = 260;

function getSessionId() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function wsUrl(path) {
  const proto = location.protocol === "https:" ? "wss:" : "ws:";
  return `${proto}//${location.host}${path}`;
}

function audioServerWsUrl(path) {
  if (!state.audio.wsUrl) return "";
  return `${state.audio.wsUrl.replace(/\/$/, "")}${path}`;
}

function saveSettings() {
  localStorage.setItem("robonix.settings", JSON.stringify(collectSettings()));
}

async function persistSettings() {
  const settings = collectSettings();
  saveSettings();
  const result = await fetch("/api/settings", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ settings }),
  }).then((response) => response.json()).catch((error) => ({ ok: false, error: String(error) }));
  if (!result.ok) throw new Error(result.error || t("settings write failed"));
  return result;
}

function normalizeRobotHost(raw) {
  return String(raw || "").trim();
}

function normalizeAtlasPort(raw) {
  const port = Number.parseInt(String(raw || "").trim(), 10);
  return Number.isFinite(port) && port > 0 ? port : DEFAULT_ATLAS_PORT;
}

function parseAtlasEndpoint(raw) {
  const value = String(raw || "").trim();
  if (!value) return { host: "", port: DEFAULT_ATLAS_PORT };
  const normalized = value.includes("://") ? value : `grpc://${value}`;
  try {
    const url = new URL(normalized);
    return {
      host: url.hostname || "",
      port: url.port ? Number.parseInt(url.port, 10) : DEFAULT_ATLAS_PORT,
    };
  } catch (_) {
    return { host: "", port: DEFAULT_ATLAS_PORT };
  }
}

function buildAtlasEndpoint(host, port) {
  const cleanHost = normalizeRobotHost(host);
  return cleanHost ? `${cleanHost}:${normalizeAtlasPort(port)}` : "";
}

function loadStoredSettings() {
  try {
    return JSON.parse(localStorage.getItem("robonix.settings") || "{}");
  } catch (_) {
    return {};
  }
}

function loadConversations() {
  try {
    const conversations = JSON.parse(localStorage.getItem("robonix.conversations") || "[]");
    if (Array.isArray(conversations)) return conversations;
  } catch (_) {
    // Fall through to one-time migration from the old prompt-only history.
  }
  try {
    const oldHistory = JSON.parse(localStorage.getItem("robonix.history") || "[]");
    if (!Array.isArray(oldHistory)) return [];
    return oldHistory.slice(0, 18).map((item) => ({
      id: getSessionId(),
      title: item.text || t("Untitled chat"),
      updatedAt: item.at || Date.now(),
      messages: item.text ? [{ id: getSessionId(), role: "user", text: item.text, meta: "" }] : [],
      timeline: [],
      plan: null,
      batches: [],
      nodeStates: {},
    }));
  } catch (_) {
    return [];
  }
}

/// Persist the conversation list, shedding load until it fits.
///
/// Attachments are base64 data URLs, so a couple of screenshots can carry a
/// 30-conversation history past localStorage's ~5MB quota. setItem then
/// throws, which used to propagate out of persistCurrentConversation and
/// skip the renderHistory() below it -- the sidebar entry vanished and the
/// write never landed, so a reload came back to an older snapshot.
///
/// Drop attachment payloads first (the transcript text is what the user came
/// back for), then the oldest conversations, and only give up once a single
/// conversation still will not fit.
function saveConversations() {
  const stripAttachments = (conversations) =>
    conversations.map((conversation) => ({
      ...conversation,
      messages: (conversation.messages || []).map(({ attachments, ...rest }) => ({
        ...rest,
        attachments: (attachments || []).map(({ dataUrl, ...meta }) => meta),
      })),
    }));

  const fits = (conversations) => {
    try {
      localStorage.setItem("robonix.conversations", JSON.stringify(conversations));
      return true;
    } catch (error) {
      if (error?.name !== "QuotaExceededError") throw error;
      return false;
    }
  };

  const capped = state.history.slice(0, 30);
  if (fits(capped)) return;
  // Attachment payloads are the bulk of the data and the least missed.
  let candidates = stripAttachments(capped);
  // history is newest-first, so trimming the tail sheds the oldest chats.
  while (candidates.length) {
    if (fits(candidates)) return;
    candidates = candidates.slice(0, candidates.length - 1);
  }
  // Never addStatusLine() here: it appends a message, which persists, which
  // lands back in this function.
  console.warn("robonix: browser storage is full; conversation history was not saved");
}

/// Record which conversation is on screen so a reload can return to it.
/// Without this every refresh landed in a brand-new empty session and the
/// work looked lost, even though it was still in the sidebar.
function rememberLastSession(sessionId) {
  if (sessionId) localStorage.setItem("robonix.lastSessionId", sessionId);
  else localStorage.removeItem("robonix.lastSessionId");
}

/// Reopen the conversation that was last on screen. Only restores one whose
/// transcript actually survived, so a stale id cannot strand the user in an
/// empty session that no longer exists.
function restoreLastSession() {
  const lastId = localStorage.getItem("robonix.lastSessionId") || "";
  if (!lastId) return false;
  const conversation = state.history.find((item) => item.id === lastId);
  if (!conversation) return false;
  state.sessionId = conversation.id;
  state.sessionTitle = conversation.title || "";
  state.messages = (conversation.messages || []).map((item) => ({ ...item }));
  state.timeline = (conversation.timeline || []).map((item) => ({ ...item }));
  state.plan = conversation.plan || null;
  state.planRecords = conversation.planRecords || [];
  state.batches = conversation.batches || [];
  state.nodeStates = conversation.nodeStates || {};
  return true;
}

async function init() {
  const [defaults, persistedResult] = await Promise.all([
    fetch("/api/defaults").then((r) => r.json()).catch(() => ({})),
    fetch("/api/settings").then((r) => r.json()).catch(() => ({ settings: {} })),
  ]);
  const stored = loadStoredSettings();
  const persisted = persistedResult.ok ? persistedResult.settings || {} : {};
  const atlas = parseAtlasEndpoint(defaults.atlasEndpoint || "");
  state.settings = {
    robotHost: defaults.robotHost || atlas.host || "",
    atlasPort: defaults.atlasPort || atlas.port || DEFAULT_ATLAS_PORT,
    liaisonEndpoint: "",
    userId: "",
    sessionTitle: "",
    recordSeconds: 30,
    language: "",
    micNodeId: "",
    micDeviceId: "",
    speakerNodeId: "",
    speakerDeviceId: "",
    ttsNodeId: "",
    enrollUserId: "",
    enrollUserName: "",
    ...defaults,
    ...stored,
    ...persisted,
  };
  // CLI/environment values are launch defaults, not immutable policy. Stored
  // browser settings must win so changing robot host or audio routing survives
  // a refresh even when the client was initially launched with --robot-host.
  // An explicitly launched session id wins; otherwise come back to whatever
  // conversation was open before the reload instead of a fresh empty one.
  if (defaults.sessionId) state.sessionId = defaults.sessionId;
  else restoreLastSession();
  if (defaults.sessionTitle) state.sessionTitle = defaults.sessionTitle;
  rememberLastSession(state.sessionId);
  bindSettings();
  bindEvents();
  bindSceneLayers();
  bindSceneView();
  bindPerceptionControls();
  bindCameraSnapshot();
  bindDepthColormap();
  bindDepthHover();
  renderAudioBars();
  renderHistory();
  renderMessages();
  renderTimeline();
  renderPlan();
  renderSceneAssets();
  refreshSystem();
  refreshActivePlans();
  refreshAudioRoute();
  refreshVoiceFinishSupport();
  // The speaking aura is visible on every page, so its physical output-level
  // stream must be connected at startup rather than only after opening Audio.
  checkAudioServer();
  setInterval(refreshSystem, 7000);
  setInterval(refreshActivePlans, 2000);
  setInterval(refreshHandsfree, 2500);
  setInterval(refreshVoiceFinishSupport, 7000);
}

function bindSettings() {
  if (maybe("robotHost")) $("robotHost").value = state.settings.robotHost || "";
  if (maybe("robotHostSettings")) $("robotHostSettings").value = state.settings.robotHost || "";
  if (maybe("atlasPort")) $("atlasPort").value = state.settings.atlasPort || DEFAULT_ATLAS_PORT;
  if (maybe("atlasPortSettings")) $("atlasPortSettings").value = state.settings.atlasPort || DEFAULT_ATLAS_PORT;
  if (maybe("liaisonEndpoint")) $("liaisonEndpoint").value = state.settings.liaisonEndpoint || "";
  if (maybe("userId")) $("userId").value = state.settings.userId || "";
  if (maybe("settingsUserId")) $("settingsUserId").value = state.settings.userId || "";
  if (maybe("recordSeconds")) $("recordSeconds").value = state.settings.recordSeconds || 30;
  if (maybe("settingsRecordSeconds")) $("settingsRecordSeconds").value = state.settings.recordSeconds || 30;
  if (maybe("language")) $("language").value = state.settings.language || "";
  if (maybe("micNodeId")) $("micNodeId").value = state.settings.micNodeId || "";
  if (maybe("micDeviceId")) $("micDeviceId").value = state.settings.micDeviceId || "";
  if (maybe("speakerNodeId")) $("speakerNodeId").value = state.settings.speakerNodeId || "";
  if (maybe("speakerDeviceId")) $("speakerDeviceId").value = state.settings.speakerDeviceId || "";
  if (maybe("enrollUserId")) $("enrollUserId").value = state.settings.enrollUserId || "";
  if (maybe("enrollUserName")) $("enrollUserName").value = state.settings.enrollUserName || "";
  if (state.sessionTitle && maybe("promptTitle")) $("promptTitle").textContent = state.sessionTitle;
  const endpointEl = maybe("atlasEndpointDisplay");
  if (endpointEl) endpointEl.textContent = `${state.settings.robotHost || "127.0.0.1"}:${state.settings.atlasPort || DEFAULT_ATLAS_PORT}`;
  const userEl = maybe("userDisplay");
  if (userEl) userEl.textContent = state.settings.userId || "voice:client";
  renderSessionChip();

  [
    "robotHost",
    "robotHostSettings",
    "atlasPort",
    "atlasPortSettings",
    "liaisonEndpoint",
    "userId",
    "settingsUserId",
    "recordSeconds",
    "settingsRecordSeconds",
    "language",
    "micNodeId",
    "micDeviceId",
    "speakerNodeId",
    "speakerDeviceId",
    "enrollUserId",
    "enrollUserName",
  ].forEach((id) => maybe(id)?.addEventListener("change", syncConnectionSettings));
  ["settingsUserId", "settingsRecordSeconds"].forEach((id) => {
    maybe(id)?.addEventListener("change", () => syncConnectionSettings(true));
  });
  maybe("saveClientSettings")?.addEventListener("click", () => syncConnectionSettings(true, true));
}

async function syncConnectionSettings(fromSettings = false, persist = false) {
  const hostSource = (fromSettings || document.activeElement?.id === "robotHostSettings") && maybe("robotHostSettings") ? "robotHostSettings" : "robotHost";
  const portSource = (fromSettings || document.activeElement?.id === "atlasPortSettings") && maybe("atlasPortSettings") ? "atlasPortSettings" : "atlasPort";
  const host = maybe(hostSource) ? normalizeRobotHost($(hostSource).value) : "";
  const port = maybe(portSource) ? normalizeAtlasPort($(portSource).value) : DEFAULT_ATLAS_PORT;
  if (maybe("robotHost")) $("robotHost").value = host;
  if (maybe("robotHostSettings")) $("robotHostSettings").value = host;
  if (maybe("atlasPort")) $("atlasPort").value = port;
  if (maybe("atlasPortSettings")) $("atlasPortSettings").value = port;
  const userSource = (fromSettings || document.activeElement?.id === "settingsUserId") && maybe("settingsUserId") ? "settingsUserId" : "userId";
  const secondsSource = (fromSettings || document.activeElement?.id === "settingsRecordSeconds") && maybe("settingsRecordSeconds") ? "settingsRecordSeconds" : "recordSeconds";
  if (maybe("userId") && maybe(userSource)) $("userId").value = $(userSource).value.trim();
  if (maybe("settingsUserId") && maybe(userSource)) $("settingsUserId").value = $(userSource).value.trim();
  if (maybe("recordSeconds") && maybe(secondsSource)) $("recordSeconds").value = $(secondsSource).value;
  if (maybe("settingsRecordSeconds") && maybe(secondsSource)) $("settingsRecordSeconds").value = $(secondsSource).value;
  const syncEndpoint = maybe("atlasEndpointDisplay");
  if (syncEndpoint) syncEndpoint.textContent = `${host || "127.0.0.1"}:${port || DEFAULT_ATLAS_PORT}`;
  const syncUser = maybe("userDisplay");
  if (syncUser) syncUser.textContent = (maybe(userSource) ? $(userSource).value.trim() : "") || "voice:client";
  state.settings = collectSettings();
  saveSettings();
  window.dispatchEvent(new CustomEvent("robonix:settings"));
  if (!persist) {
    setText("settingsStatus", t("Changed locally. Select Save to persist."));
    return;
  }
  setText("settingsStatus", t("Saving..."));
  try {
    const result = await persistSettings();
    setText("settingsStatus", t("Saved to {path}.", { path: result.path }));
  } catch (error) {
    setText("settingsStatus", t("Save failed: {error}", { error }));
  }
}

function collectSettings() {
  return {
    robotHost: normalizeRobotHost(maybe("robotHost")?.value || state.settings.robotHost || ""),
    atlasPort: normalizeAtlasPort(maybe("atlasPort")?.value || state.settings.atlasPort || DEFAULT_ATLAS_PORT),
    atlasEndpoint: buildAtlasEndpoint(
      maybe("robotHost")?.value || state.settings.robotHost || "",
      maybe("atlasPort")?.value || state.settings.atlasPort || DEFAULT_ATLAS_PORT,
    ),
    liaisonEndpoint: maybe("liaisonEndpoint")?.value.trim() || state.settings.liaisonEndpoint || "",
    userId: maybe("userId")?.value.trim() || state.settings.userId || "",
    sessionId: state.sessionId,
    recordSeconds: Number(maybe("recordSeconds")?.value || state.settings.recordSeconds || 30),
    language: maybe("language")?.value.trim() || state.settings.language || "",
    micNodeId: maybe("micNodeId")?.value.trim() || state.settings.micNodeId || "",
    micDeviceId: maybe("micDeviceId")?.value.trim() || state.settings.micDeviceId || "",
    speakerNodeId: maybe("speakerNodeId")?.value.trim() || state.settings.speakerNodeId || "",
    speakerDeviceId: maybe("speakerDeviceId")?.value.trim() || state.settings.speakerDeviceId || "",
    ttsNodeId: state.settings.ttsNodeId || "",
    enrollUserId: maybe("enrollUserId")?.value.trim() || state.settings.enrollUserId || "",
    enrollUserName: maybe("enrollUserName")?.value.trim() || state.settings.enrollUserName || "",
  };
}

function interactionSettings(useActiveTurn = false) {
  const settings = collectSettings();
  if (useActiveTurn && state.activePilotSessionId) {
    settings.sessionId = state.activePilotSessionId;
  }
  return settings;
}

function bindEvents() {
  $("composer").addEventListener("submit", (event) => {
    event.preventDefault();
    sendTask();
  });
  $("taskInput").addEventListener("input", autoGrowInput);
  $("taskInput").addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || event.shiftKey || event.isComposing) return;
    event.preventDefault();
    $("composer").requestSubmit();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key !== "F2") return;
    event.preventDefault();
    if (state.voiceRecording) {
      if (state.voiceFinishSupported) finishVoiceCapture();
      else addStatusLine(t("This robot cannot stop a recording on request; it ends on silence or at the record-seconds limit."));
      return;
    }
    if (state.voiceActive) return;
    startVoice();
  });
  $("stopButton").addEventListener("click", stopCurrentTask);
  maybe("finishVoiceButton")?.addEventListener("click", finishVoiceCapture);
  maybe("voiceButton")?.addEventListener("click", startVoice);
  $("refreshSystem").addEventListener("click", refreshSystem);
  maybe("handsfreeToggle")?.addEventListener("click", toggleHandsfree);
  // The command bar's name field renames the open session as you type it;
  // the button beside it starts a new one under whatever name it holds.
  const sessionTitleInput = maybe("sessionTitleInput");
  if (sessionTitleInput) {
    sessionTitleInput.addEventListener("change", commitSessionTitle);
    sessionTitleInput.addEventListener("blur", commitSessionTitle);
    sessionTitleInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        sessionTitleInput.blur();
      }
    });
    // Clears a capture left behind by a click that never completed.
    sessionTitleInput.addEventListener("focus", () => {
      pendingNewSessionTitle = null;
    });
  }
  const newSessionAction = maybe("newSessionAction");
  if (newSessionAction) {
    // mousedown lands before the field's blur, which is the only moment the
    // typed name is still known to be meant for the session about to open.
    newSessionAction.addEventListener("mousedown", () => {
      pendingNewSessionTitle = maybe("sessionTitleInput")?.value.trim() || "";
    });
    newSessionAction.addEventListener("click", newSession);
  }
  $("renameSession").addEventListener("click", () => renameConversation(state.sessionId));
  $("clearHistory").addEventListener("click", clearHistory);
  maybe("connectNow")?.addEventListener("click", async () => {
    state.settings = collectSettings();
    await persistSettings().catch((error) => addTimeline("error", t("settings save failed: {error}", { error })));
    addTimeline("system", t("connecting to {endpoint}", { endpoint: `${state.settings.robotHost}:${state.settings.atlasPort}` }));
    refreshSystem();
  });
  maybe("startAudioServer")?.addEventListener("click", startAudioServer);
  maybe("checkAudioServer")?.addEventListener("click", checkAudioServer);
  maybe("refreshAudioDevices")?.addEventListener("click", loadAudioDevices);
  maybe("refreshAudioRoute")?.addEventListener("click", refreshAudioRoute);
  maybe("applyAudioRoute")?.addEventListener("click", applyAudioRoute);
  maybe("micNodeId")?.addEventListener("change", () => loadAudioRouteDevices("mic"));
  maybe("speakerNodeId")?.addEventListener("change", () => loadAudioRouteDevices("speaker"));
  maybe("enrollVoice")?.addEventListener("click", enrollVoice);
  maybe("testMicrophone")?.addEventListener("click", testMicrophone);
  maybe("testSpeaker")?.addEventListener("click", testSpeaker);
  document.querySelectorAll("[data-page]").forEach((button) => {
    button.addEventListener("click", () => activatePage(button.dataset.page));
  });
  document.querySelectorAll("[data-page-link]").forEach((button) => {
    button.addEventListener("click", () => activatePage(button.dataset.pageLink));
  });
  document.querySelectorAll("[data-page-action='voice-start']").forEach((button) => {
    button.addEventListener("click", startVoice);
  });
  maybe("openRtdlHistory")?.addEventListener("click", openRtdlHistory);
  maybe("closeRtdlHistory")?.addEventListener("click", closeRtdlHistory);
  maybe("openActiveRtdl")?.addEventListener("click", openActiveRtdl);
  maybe("closeActiveRtdl")?.addEventListener("click", closeActiveRtdl);
  maybe("activeRtdlModal")?.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) closeActiveRtdl();
  });
  maybe("rtdlHistoryModal")?.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) closeRtdlHistory();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !maybe("activeRtdlModal")?.hidden) closeActiveRtdl();
    if (event.key === "Escape" && !maybe("rtdlHistoryModal")?.hidden) closeRtdlHistory();
  });
}

function openActiveRtdl() {
  const modal = maybe("activeRtdlModal");
  if (!modal) return;
  modal.hidden = false;
  refreshActivePlans();
  maybe("closeActiveRtdl")?.focus();
}

function closeActiveRtdl() {
  const modal = maybe("activeRtdlModal");
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  maybe("openActiveRtdl")?.focus();
}

function openRtdlHistory() {
  const modal = maybe("rtdlHistoryModal");
  if (!modal) return;
  modal.hidden = false;
  maybe("closeRtdlHistory")?.focus();
}

function closeRtdlHistory() {
  const modal = maybe("rtdlHistoryModal");
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  maybe("openRtdlHistory")?.focus();
}

async function configureReverseAudio(providerId) {
  if (!providerId) return { ok: false, skipped: true };
  const result = await fetch("/api/audio-reverse/connect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ settings: collectSettings(), providerId }),
  }).then((r) => r.json()).catch((error) => ({ ok: false, error: String(error) }));
  appendAudioLog(result.ok
    ? t("reverse audio target {target}", { target: result.target })
    : t("reverse audio error: {error}", { error: result.error || "unknown" }));
}

async function refreshHandsfree() {
  const button = maybe("handsfreeToggle");
  if (!button || state.handsfree.busy || !collectSettings().atlasEndpoint) return;
  const result = await fetch("/api/handsfree/status", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ settings: collectSettings() }),
  }).then((r) => r.json()).catch((error) => ({ available: false, state: "unavailable", error: String(error) }));
  state.handsfree = { ...state.handsfree, ...result };
  renderHandsfree();
  syncHandsfreeEventStream();
}

async function toggleHandsfree() {
  if (state.voiceActive) {
    addStatusLine(t("Stop the active F2 voice session before changing hands-free mode."));
    return;
  }
  if (state.handsfree.busy) return;
  state.handsfree.busy = true;
  renderHandsfree();
  const enabled = !state.handsfree.enabled;
  const result = await fetch("/api/handsfree/set", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ settings: collectSettings(), enabled }),
  }).then((r) => r.json()).catch((error) => ({ available: false, ok: false, state: "unavailable", error: String(error) }));
  state.handsfree = { ...state.handsfree, ...result, busy: false };
  renderHandsfree();
  syncHandsfreeEventStream();
  addTimeline(result.ok ? "voice" : "error", result.ok
    ? t(enabled ? "robot hands-free enabled" : "robot hands-free disabled")
    : t("hands-free: {error}", { error: result.error || result.detail || t("unavailable") }));
}

function renderHandsfree() {
  const button = maybe("handsfreeToggle");
  const label = maybe("handsfreeState");
  if (!button || !label) return;
  const status = state.handsfree.state || "unavailable";
  const active = state.handsfree.enabled && ["starting", "listening", "triggered", "acknowledging", "in_voice"].includes(status);
  button.classList.toggle("offline", !active);
  button.classList.toggle("listening", status === "listening");
  button.classList.toggle("busy", state.handsfree.busy || ["triggered", "acknowledging", "in_voice"].includes(status));
  button.classList.toggle("error", status === "error" || status === "unavailable");
  label.textContent = state.handsfree.busy
    ? t("Hands-free...")
    : status === "listening"
      ? t("Listening")
      : status === "acknowledging"
        ? t("Acknowledging")
      : status === "in_voice"
        ? t("Hands-free active")
        : status === "suspended"
          ? t("Recording")
        : state.handsfree.enabled
          ? t("Hands-free {status}", { status: t(status) })
          : t("Hands-free off");
  button.title = state.handsfree.lastError || state.handsfree.error || (state.handsfree.keyword
    ? t("Last wake phrase: {phrase}", { phrase: state.handsfree.keyword })
    : t("Robot-local wake phrase configured by Speech"));
  syncVoiceControls();
}

function handsfreeOwnsMicrophone() {
  return Boolean(state.handsfree.enabled && [
    "starting", "listening", "triggered", "acknowledging", "in_voice",
  ].includes(state.handsfree.state));
}

function syncVoiceControls() {
  const recordingBlocked = state.voiceActive && !state.ttsPlaying;
  const disabled = recordingBlocked;
  // While capture runs, the start control has nothing left to do and its
  // twin ("Stop recording") is what F2 now triggers. Leaving both on screen
  // showed two conflicting voice buttons at once, so hide this one outright
  // rather than only disabling it.
  const hideStart = state.voiceRecording && state.voiceFinishSupported;
  const title = state.ttsPlaying
      ? t("Interrupt speech and start a new voice turn (F2)")
      : state.voiceActive
        ? t("Voice recording is already active")
        : state.busy
          ? t("Record a spoken instruction for the running task (F2)")
          : t("Start voice recording (F2)");
  maybe("voiceButton")?.toggleAttribute("disabled", disabled);
  if (maybe("voiceButton")) $("voiceButton").title = title;
  document.querySelectorAll("[data-page-action='voice-start']").forEach((button) => {
    button.toggleAttribute("disabled", disabled);
    button.hidden = hideStart;
    button.title = title;
  });
  const micTest = maybe("testMicrophone");
  if (micTest) {
    const micBlocked = handsfreeOwnsMicrophone() || state.voiceActive;
    micTest.toggleAttribute("disabled", micBlocked);
    micTest.title = state.voiceActive
      ? t("An F2 voice session owns this microphone. Stop it before testing the route.")
      : handsfreeOwnsMicrophone()
        ? t("Hands-free owns this microphone. Turn it off before running an exclusive microphone test.")
        : t("Capture one second through the selected Robonix microphone route.");
  }
  const handsfree = maybe("handsfreeToggle");
  if (handsfree) handsfree.toggleAttribute("disabled", state.voiceActive || state.handsfree.busy);
  const finishButton = maybe("finishVoiceButton");
  if (finishButton) {
    const show = state.voiceRecording && state.voiceFinishSupported;
    finishButton.hidden = !show;
    if (show && !state.finishInFlight) {
      finishButton.disabled = false;
      setButtonLabel(finishButton, t("Stop recording"));
    }
    finishButton.title = state.voiceFinishSupported
      ? t("Stop recording and send what you have said so far (F2). Does not cancel the task.")
      : t("This robot does not advertise robonix/system/liaison/voice/finish, so recordings can only end on their own.");
  }
}

function stopHandsfreeEventStream() {
  if (state.handsfreeReconnect) {
    clearTimeout(state.handsfreeReconnect);
    state.handsfreeReconnect = null;
  }
  if (state.handsfreeSocket) {
    const socket = state.handsfreeSocket;
    state.handsfreeSocket = null;
    socket.close(1000, "hands-free disabled");
  }
}

function syncHandsfreeEventStream() {
  if (!state.handsfree.enabled || !collectSettings().atlasEndpoint) {
    stopHandsfreeEventStream();
    return;
  }
  const current = state.handsfreeSocket;
  if (current && [WebSocket.CONNECTING, WebSocket.OPEN].includes(current.readyState)) return;
  if (state.handsfreeReconnect) return;

  const socket = new WebSocket(wsUrl("/ws/handsfree-events"));
  state.handsfreeSocket = socket;
  socket.onopen = () => {
    socket.send(JSON.stringify({ settings: collectSettings() }));
    addStatusLine(t("Watching robot hands-free interaction."));
  };
  socket.onmessage = (message) => {
    const payload = JSON.parse(message.data);
    if (payload.type === "voice_event") handleVoiceEvent(payload.event);
    if (payload.type === "accepted") addTimeline("voice", t("hands-free event stream connected"));
    if (payload.type === "error") addMessage("error", payload.error || t("hands-free event stream failed"));
  };
  socket.onclose = () => {
    if (state.handsfreeSocket === socket) state.handsfreeSocket = null;
    if (!state.handsfree.enabled) return;
    state.handsfreeReconnect = setTimeout(() => {
      state.handsfreeReconnect = null;
      syncHandsfreeEventStream();
    }, 1500);
  };
}

function autoGrowInput() {
  const input = $("taskInput");
  input.style.height = "auto";
  input.style.height = `${Math.min(input.scrollHeight, 160)}px`;
}

async function handleFiles(event) {
  const files = Array.from(event.target.files || []);
  for (const file of files) {
    if (!file.type.startsWith("image/")) continue;
    state.attachments.push(await readFile(file));
  }
  event.target.value = "";
  renderAttachments();
  renderSceneAssets();
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        name: file.name,
        mediaType: file.type,
        size: file.size,
        dataUrl: reader.result,
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function renderAttachments() {
  const strip = $("attachmentStrip");
  if (!strip) return;
  clear(strip);
  state.attachments.forEach((item, index) => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = "attachment-pill";
    pill.title = t("Remove attachment");
    pill.textContent = item.name;
    pill.addEventListener("click", () => {
      state.attachments.splice(index, 1);
      renderAttachments();
    });
    strip.appendChild(pill);
  });
}

function activatePage(name) {
  document.querySelectorAll("[data-page]").forEach((button) => button.classList.toggle("active", button.dataset.page === name));
  document.querySelectorAll("[data-page-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.pagePanel === name));
  window.dispatchEvent(new CustomEvent("robonix:page", { detail: { name } }));
  if (name === "audio") {
    checkAudioServer();
  }
}

/// Drop every pointer into the Pilot turn of the conversation being left.
///
/// interactionSettings() overrides the outgoing session id with
/// activePilotSessionId so a steer reaches the turn it belongs to. Any code
/// path that switches which conversation is on screen must clear these, or
/// the next message is delivered into the previous conversation's history
/// and the planner answers from turns the user never spoke there.
function forgetActiveTurn() {
  state.activeTurnId = "";
  state.activePilotSessionId = "";
  state.taskState = null;
  state.taskRunning = false;
}

function newSession() {
  if (state.busy) {
    pendingNewSessionTitle = null;
    addStatusLine(t("Abort the running task before starting a new session."));
    return;
  }
  // Captured at mousedown, before the field blurred. An untouched field still
  // shows the CURRENT session's name, and naming the new session after it
  // would clone the name on every click, so only text the user actually
  // changed counts as a name for the session about to open.
  const typedTitle = pendingNewSessionTitle ?? (maybe("sessionTitleInput")?.value.trim() || "");
  pendingNewSessionTitle = null;
  const requestedTitle = typedTitle && typedTitle !== state.sessionTitle ? typedTitle : "";
  persistCurrentConversation();
  state.sessionId = getSessionId();
  rememberLastSession(state.sessionId);
  forgetActiveTurn();
  state.sessionTitle = "";
  state.messages = [];
  state.timeline = [];
  state.plan = null;
  state.planRecords = [];
  state.batches = [];
  state.nodeStates = {};
  state.activeAgentId = null;
  state.sessionTitle = uniqueConversationTitle(requestedTitle || t("Untitled chat"), state.sessionId);
  $("promptTitle").textContent = state.sessionTitle;
  renderSessionChip();
  // force: an empty transcript would otherwise fail the has-content check and
  // the new session would not appear in the sidebar until its first message.
  persistCurrentConversation("", true);
  // Pilot keys conversation history by session id, so a fresh id is what
  // actually drops the old turns from the next prompt. Say so -- against an
  // already-empty transcript the reset is otherwise invisible.
  addStatusLine(t("New session started; the planner's history for this conversation is cleared."));
  addTimeline("status", t("new session {id}", { id: state.sessionId.slice(0, 8) }));
  renderMessages();
  renderTimeline();
  renderPlan();
  renderSceneAssets();
  renderHistory();
}

/// Keep the command bar's session chip showing the live conversation title.
/// It was static markup before, so a reset left the previous name on screen
/// and made the button look inert.
function renderSessionChip() {
  const field = maybe("sessionTitleInput");
  // Never clobber what the user is in the middle of typing.
  if (field && document.activeElement !== field) field.value = state.sessionTitle || "";
}

/// Apply the name field to the open session. Runs on change/blur rather than
/// on every keystroke so a half-typed name is not written to the sidebar.
/// An emptied field means "no explicit name", which leaves the conversation
/// on its message-derived title instead of naming it the empty string.
function commitSessionTitle() {
  const field = maybe("sessionTitleInput");
  if (!field) return;
  // A New session click is mid-flight and owns this text; renaming the
  // session being left with it is what produced two chats per click.
  if (pendingNewSessionTitle !== null) {
    renderSessionChip();
    return;
  }
  const typed = field.value.trim();
  if (!typed || typed === state.sessionTitle) {
    renderSessionChip();
    return;
  }
  const title = uniqueConversationTitle(typed, state.sessionId);
  state.sessionTitle = title;
  if (maybe("promptTitle")) $("promptTitle").textContent = title;
  persistCurrentConversation("", true);
  renderSessionChip();
}

async function sendTask() {
  const text = $("taskInput").value.trim();
  const attachments = state.attachments.slice();
  if (!text && attachments.length === 0) return;

  // A still-closing WebSocket or TTS tail is not an active Pilot turn. Only
  // mark input as steer while Pilot has task state that can actually accept it.
  const wasBusy = hasActiveTurn();
  state.activeVoiceMode = "voice";
  const display = text || attachments.map((item) => item.name).join(", ");
  addMessage("user", display, wasBusy ? t("added to running task") : (attachments.length ? t("{count} image", { count: attachments.length }) : ""), attachments);
  addStatusLine(wasBusy ? t("Sent to the running task; waiting for Pilot to react.") : t("Submitted task; waiting for Pilot stream."));
  addTimeline("task", wasBusy ? t("added: {text}", { text: display }) : t("task: {text}", { text: display }));
  persistCurrentConversation(display);
  $("taskInput").value = "";
  autoGrowInput();
  state.attachments = [];
  renderAttachments();
  renderSceneAssets();

  const socket = new WebSocket(wsUrl("/ws/task"));
  beginStream(socket);
  socket.onopen = () => {
    socket.send(JSON.stringify({
      text,
      attachments,
      settings: interactionSettings(wasBusy),
      steer: wasBusy,
      interactionMode: wasBusy ? "steer" : "task",
      expectedTurnId: wasBusy ? state.activeTurnId : "",
    }));
  };
  wireStream(socket, () => endStream(socket));
}

function stopCurrentTask() {
  if (!state.busy || state.stopInFlight) return;
  state.stopInFlight = true;
  const button = $("stopButton");
  button.disabled = true;
  setButtonLabel(button, t("Aborting"));
  addStatusLine(t("Abort requested; canceling every running task and any robot motion."));
  addTimeline("cancel", state.activeTurnId
    ? t("abort requested for {turn}", { turn: state.activeTurnId })
    : t("abort requested"));

  stopActiveVoiceSession();

  const socket = new WebSocket(wsUrl("/ws/abort"));
  socket.onopen = () => socket.send(JSON.stringify({
    settings: interactionSettings(true),
    expectedTurnId: state.activeTurnId,
  }));
  wireStream(socket, () => (socket.robonixDone ? completeStopState() : resetStopState()));
  socket.addEventListener("message", (event) => {
    const payload = JSON.parse(event.data);
    if (payload.type === "error") resetStopState();
  });
  socket.addEventListener("error", resetStopState);
}

function resetStopState() {
  state.stopInFlight = false;
  $("stopButton").disabled = false;
  setButtonLabel($("stopButton"), t("Abort all tasks"));
}

function completeStopState() {
  state.taskRunning = false;
  state.activeTurnId = "";
  state.activePilotSessionId = "";
  state.taskState = state.taskState ? { ...state.taskState, status: "canceled" } : null;
  const sockets = [...state.interactionSockets];
  state.interactionSockets.clear();
  state.activeStreams = 0;
  sockets.forEach((socket) => {
    if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) socket.close();
  });
  setBusy(false);
  refreshActivePlans();
  renderPlan();
  persistCurrentConversation();
}

function stopActiveVoiceSession() {
  const socket = state.activeVoiceSocket;
  if (!state.voiceActive || !socket) return;
  const sendStop = () => {
    if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify({ type: "stop" }));
  };
  if (socket.readyState === WebSocket.CONNECTING) socket.addEventListener("open", sendStop, { once: true });
  else sendStop();
}

function finishVoiceCapture() {
  // Distinct from stopActiveVoiceSession(): this submits what's been said
  // so far instead of discarding the turn, for when background noise keeps
  // the ASR backend's own silence detection from ever firing.
  const socket = state.activeVoiceSocket;
  if (!state.voiceRecording || !socket || state.finishInFlight) return;
  state.finishInFlight = true;
  const button = maybe("finishVoiceButton");
  if (button) {
    button.disabled = true;
    setButtonLabel(button, t("Stopping"));
  }
  addStatusLine(t("Stopping recording; submitting what has been recognized so far."));
  const send = () => {
    if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify({ type: "finish" }));
  };
  if (socket.readyState === WebSocket.CONNECTING) socket.addEventListener("open", send, { once: true });
  else send();
}

function startVoice() {
  if (state.voiceActive) {
    addStatusLine(t("Voice recording is already active."));
    return;
  }
  const wasBusy = hasActiveTurn();
  state.voiceActive = true;
  maybe("voiceButton")?.classList.add("active");
  document.querySelectorAll("[data-page-action='voice-start']").forEach((button) => button.classList.add("active"));
  if (maybe("voiceState")) $("voiceState").textContent = t("recording");
  syncVoiceControls();
  addStatusLine(t("Listening for voice input."));
  addTimeline("voice", wasBusy ? t("voice input for running task") : t("voice session requested"));
  const socket = new WebSocket(wsUrl("/ws/voice"));
  beginStream(socket);
  socket.robonixVoiceMode = "voice";
  state.activeVoiceSocket = socket;
  socket.onopen = () => socket.send(JSON.stringify({
    settings: interactionSettings(wasBusy),
    steer: wasBusy,
    interactionMode: wasBusy ? "steer" : "voice",
    expectedTurnId: wasBusy ? state.activeTurnId : "",
  }));
  wireStream(socket, () => {
    const ownsCapture = state.activeVoiceSocket === socket;
    if (ownsCapture) {
      state.activeVoiceSocket = null;
      state.voiceActive = false;
      state.finishInFlight = false;
      // A socket that dies mid-capture never delivers recording_done, so the
      // flag has to be cleared here too or the control outlives the session.
      state.voiceRecording = false;
    }
    endStream(socket);
    if (ownsCapture) finishVoiceCaptureUi();
    syncVoiceControls();
  }, socket);
  syncVoiceControls();
}

function wireStream(socket, done, voiceSocket = null) {
  socket.onmessage = (event) => {
    let payload;
    try {
      payload = JSON.parse(event.data);
    } catch (err) {
      console.warn("robonix: malformed websocket payload", err);
      return;
    }
    if (payload.type === "pilot_event") handlePilotEvent(payload.event);
    if (payload.type === "voice_event") handleVoiceEvent(payload.event, voiceSocket);
    if (payload.type === "accepted") addStatusLine(t("Connected; waiting for Robonix events."));
    if (payload.type === "status") addTimeline("status", payload.message || t("status"));
    if (payload.type === "finish_requested") {
      addTimeline(payload.ok ? "voice" : "error", payload.detail || (payload.ok ? t("recording stop requested") : t("could not stop recording")));
      // A rejected request leaves the turn recording, so hand the control back
      // rather than stranding the user with a dead "Stopping" button.
      if (!payload.ok) {
        state.finishInFlight = false;
        syncVoiceControls();
      }
    }
    if (payload.type === "error") addMessage("error", payload.error);
    if (payload.type === "done") {
      socket.robonixDone = true;
      socket.close();
    }
  };
  socket.onerror = () => addMessage("error", t("stream failed"));
  socket.onclose = done;
}

function handlePilotEvent(event) {
  if (event.kind === "text_chunk" && event.textChunk) {
    appendAgent(event.textChunk);
  } else if (event.kind === "final_text" && event.finalText) {
    finalizeAgent(t(event.finalText));
  } else if (event.kind === "plan" && event.plan) {
    state.plan = event.plan;
    upsertPlanRecord(event.plan);
    announcePlan(event.plan);
    addTimeline("plan", t("live round {round}: {count} call(s)", { round: event.plan.round, count: planCalls(event.plan).length }));
    renderPlan();
    persistCurrentConversation();
    refreshActivePlans();
  } else if (event.kind === "batch_result" && event.batchResult) {
    state.batches.unshift(event.batchResult);
    (event.batchResult.results || []).forEach((result) => {
      if (Number.isFinite(Number(result.nodeIndex))) state.nodeStates[String(result.nodeIndex)] = result;
    });
    updatePlanRecordResult(event.batchResult.planId, (record) => {
      record.batches.unshift(event.batchResult);
      (event.batchResult.results || []).forEach((result) => {
        if (Number.isFinite(Number(result.nodeIndex))) record.nodeStates[String(result.nodeIndex)] = result;
      });
    });
    addTimeline(event.batchResult.anyFailed ? "error" : "result", t("round {round} result", { round: event.batchResult.round }));
    renderPlan();
    persistCurrentConversation();
  } else if (event.kind === "node_state" && event.nodeState) {
    state.nodeStates[String(event.nodeState.nodeIndex)] = event.nodeState;
    updatePlanRecordResult(event.nodeState.planId, (record) => {
      record.nodeStates[String(event.nodeState.nodeIndex)] = event.nodeState;
    });
    addTimeline(event.nodeState.state === "FAILED" ? "error" : "status", `${event.nodeState.opId || t("node {index}", { index: event.nodeState.nodeIndex })} ${t(event.nodeState.state)}`);
    renderPlan();
    persistCurrentConversation();
  } else if (event.kind === "task_state" && event.taskState) {
    state.taskState = event.taskState;
    const taskStatus = String(event.taskState.status || "").trim().toLowerCase();
    if (["in_progress", "running", "planning", "executing"].includes(taskStatus)) {
      state.taskRunning = true;
      state.activePilotSessionId = String(event.sessionId || state.activePilotSessionId || "");
    } else if (["done", "completed", "failed", "cancelled", "canceled", "aborted"].includes(taskStatus)) {
      state.taskRunning = false;
    }
    setBusy(state.activeStreams > 0 || state.taskRunning);
    addTimeline("status", t(event.taskState.status || event.taskState.goal || "task update"));
    addStatusLine(t(event.taskState.status || event.taskState.goal || "Task state updated."));
    renderPlan();
    persistCurrentConversation();
  } else if (event.kind === "status" && event.status) {
    const turnMatch = String(event.status.message || "").match(/^turn_id=(.+)$/);
    if (turnMatch) {
      state.activeTurnId = turnMatch[1];
      state.activePilotSessionId = String(event.status.sessionId || event.sessionId || "");
      return;
    }
    if ([1, 2].includes(Number(event.status.state))) {
      state.activeTurnId = "";
      state.activePilotSessionId = "";
      state.taskRunning = false;
      setBusy(state.activeStreams > 0);
    }
    addTimeline(
      "status",
      event.status.message ? t(event.status.message) : t("state {state}", { state: event.status.state }),
    );
    if (event.status.message) addStatusLine(t(event.status.message));
  }
}

function planRecordKey(plan) {
  const planId = String(plan?.planId || "").trim();
  return planId ? `${planId}:${Number(plan?.round || 0)}` : `round:${Number(plan?.round || 0)}`;
}

function upsertPlanRecord(plan) {
  const key = planRecordKey(plan);
  const existing = state.planRecords.find((record) => record.key === key);
  if (existing) {
    existing.plan = plan;
    existing.updatedAt = Date.now();
  } else {
    state.planRecords.unshift({ key, plan, nodeStates: {}, batches: [], updatedAt: Date.now() });
    state.planRecords = state.planRecords.slice(0, 80);
  }
}

function updatePlanRecordResult(planId, update) {
  const id = String(planId || "").trim();
  let record = state.planRecords.find((item) => String(item.plan?.planId || "") === id);
  if (!record && state.plan) {
    upsertPlanRecord(state.plan);
    record = state.planRecords.find((item) => item.key === planRecordKey(state.plan));
  }
  if (!record) return;
  update(record);
  record.updatedAt = Date.now();
}

function handleVoiceEvent(event, sourceSocket = null) {
  const label = event.statusMessage || event.text || event.error || event.kind;
  // Liaison reports the microphone's own lifecycle, so drive the finish
  // control off these rather than off the socket, which stays open through
  // Pilot and TTS long after capture has ended.
  if (event.kind === "recording_started") setVoiceRecording(true);
  else if (["recording_done", "asr_final", "session_done", "error"].includes(event.kind)) {
    setVoiceRecording(false);
  }
  if (event.kind === "asr_final") {
    const mode = sourceSocket?.robonixVoiceMode || "voice";
    addMessage("user", event.text, mode);
    if (sourceSocket && state.activeVoiceSocket === sourceSocket) {
      state.activeVoiceSocket = null;
      state.voiceActive = false;
      state.finishInFlight = false;
      finishVoiceCaptureUi();
      syncVoiceControls();
    }
  } else if (event.kind === "pilot" && event.pilot) {
    handlePilotEvent(event.pilot);
  } else if (event.kind === "tts_started") {
    setTtsAura(true);
    addMessage("status", label || t("TTS playback started"));
    addTimeline("voice", label || t("TTS playback started"));
  } else if (event.kind === "tts_done") {
    setTtsAura(false);
    const skipped = String(label || "").toLowerCase().includes("skipped");
    addMessage(skipped ? "error" : "status", label || t("TTS playback done"));
    addTimeline(skipped ? "error" : "voice", label || t("TTS playback done"));
  } else if (event.kind === "error") {
    addMessage("error", event.error || t("voice error"));
  } else {
    addTimeline("voice", label);
  }
}

/// Flip the mic-capture flag and re-sync the controls bound to it. Clearing
/// it also clears any in-flight finish request, since a capture that has
/// ended cannot still be finishing.
function setVoiceRecording(active) {
  if (state.voiceRecording === active) return;
  state.voiceRecording = active;
  if (!active) state.finishInFlight = false;
  syncVoiceControls();
}

function finishVoiceCaptureUi() {
  maybe("voiceButton")?.classList.remove("active");
  document.querySelectorAll("[data-page-action='voice-start']").forEach((button) => button.classList.remove("active"));
  if (maybe("voiceState")) $("voiceState").textContent = t("ready");
}

function hasActiveTurn() {
  if (state.activeTurnId) return true;
  // `state.taskState` outlives a turn: Completed/Failed clear `taskRunning` but
  // leave the last snapshot behind, so re-reading its status here kept every
  // later message labelled as a steer into a turn that had already ended.
  return state.taskRunning;
}

function addMessage(role, text, meta = "", attachments = []) {
  const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  state.messages.push({ id, role, text, meta, attachments });
  if (role !== "agent") state.activeAgentId = null;
  renderMessages();
  renderSceneAssets();
  persistCurrentConversation(role === "user" ? text : "");
  return id;
}

function addStatusLine(text) {
  const clean = String(text || "").trim();
  if (!clean) return null;
  const last = state.messages[state.messages.length - 1];
  if (last?.role === "status" && last.text === clean) return last.id;
  return addMessage("status", clean, "status");
}

function announcePlan(plan) {
  const round = Number(plan?.round ?? 0);
  if (!round) return;
  const last = state.messages[state.messages.length - 1];
  if (last?.role === "status" && last.planRound === round) return;
  const calls = planCalls(plan);
  const names = calls.map((node) => capabilityLabel(node)).filter(Boolean);
  const preview = names.slice(0, 3).join(", ");
  const suffix = names.length > 3 ? ` +${names.length - 3} more` : "";
  const id = addMessage(
    "status",
    names.length ? `Calling ${preview}${suffix}` : `RTDL plan round ${round}`,
    "RTDL",
  );
  const msg = state.messages.find((item) => item.id === id);
  if (msg) msg.planRound = round;
}

// Streamed chunks are persisted on a short delay: writing localStorage on every
// chunk is wasteful, but never writing it loses the reply already on screen
// when the socket drops or the page is reloaded mid-stream.
let agentPersistTimer = 0;
const AGENT_PERSIST_DELAY_MS = 500;

function scheduleAgentPersist() {
  if (agentPersistTimer) window.clearTimeout(agentPersistTimer);
  agentPersistTimer = window.setTimeout(() => {
    agentPersistTimer = 0;
    persistCurrentConversation();
  }, AGENT_PERSIST_DELAY_MS);
}

function appendAgent(text) {
  if (!state.activeAgentId) {
    state.activeAgentId = addMessage("agent", "", "Robonix");
  }
  const msg = state.messages.find((item) => item.id === state.activeAgentId);
  if (msg) msg.text += text;
  scheduleAgentPersist();

  const root = $("messages");
  if (!root) return;
  const existingEl = root.querySelector(`[data-message-id="${state.activeAgentId}"]`);
  if (!existingEl) {
    renderMessages();
    return;
  }
  let body = existingEl.querySelector(".agent-markdown-body");
  if (!body) {
    renderMessages();
    return;
  }
  const isNearBottom = root.scrollHeight - root.scrollTop - root.clientHeight < 80;
  clear(body);
  appendAgentMarkdown(body, msg);
  if (isNearBottom) {
    root.scrollTop = root.scrollHeight;
  }
}

function finalizeAgent(text) {
  if (!text) {
    state.activeAgentId = null;
    return;
  }
  // Status lines interleaved mid-turn clear `activeAgentId` (addMessage drops it
  // for every non-agent role), so a FinalText arriving right after a status such
  // as "Plan control accepted" would open a second bubble for text that was
  // already streamed. Skip trailing status lines and merge into this turn's last
  // agent bubble instead; any other role in between (a user message starts a new
  // turn) means this is genuinely a fresh bubble.
  let targetId = state.activeAgentId;
  if (!targetId) {
    for (let i = state.messages.length - 1; i >= 0; i -= 1) {
      const message = state.messages[i];
      if (message.role === "status") continue;
      if (message.role === "agent") targetId = message.id;
      break;
    }
  }
  const msg = targetId
    ? state.messages.find((item) => item.id === targetId)
    : null;
  if (msg) {
    const current = msg.text || "";
    msg.text = mergeFinalText(current, text);
  } else {
    addMessage("agent", text, "Robonix");
  }
  state.activeAgentId = null;
  renderMessages();
  persistCurrentConversation();
}

function mergeFinalText(current, finalText) {
  const currentText = String(current || "");
  const final = String(finalText || "");
  if (!currentText) return final;
  if (!final) return currentText;
  if (final.includes(currentText)) return final;
  if (currentText.includes(final)) return currentText;
  return `${currentText}${currentText.endsWith("\n") ? "" : "\n"}${final}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Minimal Markdown rendering for agent replies.
//
// The planner answers in Markdown (`**bold**`, numbered lists, code spans) but
// the bubble used to draw that source literally because it appended a text node.
// This renders the subset the model actually emits into DOM nodes built with
// createElement/textContent only — never innerHTML — so model output can never
// inject markup or scripts. Only agent bubbles go through here; status/user/RTDL
// messages stay plain text. Deliberately not supported: tables, nested lists,
// and `_`/`__` emphasis (they would mangle snake_case identifiers and tool ids).
// ─────────────────────────────────────────────────────────────────────────────

const MD_HEADING = /^(#{1,6})\s+(.*)$/;
const MD_ULIST = /^\s*[-*+]\s+(.*)$/;
const MD_OLIST = /^\s*(\d+)[.)]\s+(.*)$/;
const MD_RULE = /^\s*(-{3,}|\*{3,}|_{3,})\s*$/;
const MD_FENCE = /^\s*```\s*([\w+-]*)\s*$/;
const MD_QUOTE = /^\s*>\s?(.*)$/;
const MD_LINK = /^(https?:\/\/|mailto:)/i;

/// Cache the parsed nodes per message so a long stream does not re-parse every
/// bubble on every chunk. Keyed by the message object, so nothing is stored on
/// the message itself (it is persisted to disk as JSON).
const markdownCache = new WeakMap();

function appendAgentMarkdown(el, message) {
  const source = String(message.text || "");
  let cached = markdownCache.get(message);
  if (!cached || cached.source !== source) {
    cached = { source, nodes: markdownNodes(source) };
    markdownCache.set(message, cached);
  }
  // renderMessages clears the container first, so the cached nodes are detached
  // and safe to re-append.
  cached.nodes.forEach((node) => el.appendChild(node));
}

function markdownNodes(text) {
  const lines = String(text || "").replace(/\r\n?/g, "\n").split("\n");
  const nodes = [];
  const paragraph = [];
  const flushParagraph = () => {
    if (!paragraph.length) return;
    const el = document.createElement("p");
    appendInline(el, paragraph.join("\n"));
    nodes.push(el);
    paragraph.length = 0;
  };
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const fence = line.match(MD_FENCE);
    if (fence) {
      flushParagraph();
      const body = [];
      i += 1;
      while (i < lines.length && !MD_FENCE.test(lines[i])) {
        body.push(lines[i]);
        i += 1;
      }
      if (i < lines.length) i += 1; // consume the closing fence when present
      const pre = document.createElement("pre");
      const code = document.createElement("code");
      if (fence[1]) code.className = `language-${fence[1]}`;
      code.textContent = body.join("\n");
      pre.appendChild(code);
      nodes.push(pre);
      continue;
    }
    if (!line.trim()) {
      flushParagraph();
      i += 1;
      continue;
    }
    const heading = line.match(MD_HEADING);
    if (heading) {
      flushParagraph();
      // Keep model headings below the page's own h1/h2 rather than letting a
      // leading `#` outrank the surrounding panel titles.
      const el = document.createElement(`h${Math.min(heading[1].length + 2, 6)}`);
      appendInline(el, heading[2].trim());
      nodes.push(el);
      i += 1;
      continue;
    }
    if (MD_RULE.test(line)) {
      flushParagraph();
      nodes.push(document.createElement("hr"));
      i += 1;
      continue;
    }
    if (MD_QUOTE.test(line)) {
      flushParagraph();
      const quote = document.createElement("blockquote");
      const body = [];
      while (i < lines.length && MD_QUOTE.test(lines[i])) {
        body.push(lines[i].match(MD_QUOTE)[1]);
        i += 1;
      }
      appendInline(quote, body.join("\n"));
      nodes.push(quote);
      continue;
    }
    const ordered = line.match(MD_OLIST);
    if (ordered || MD_ULIST.test(line)) {
      flushParagraph();
      const list = document.createElement(ordered ? "ol" : "ul");
      if (ordered && Number(ordered[1]) > 1) list.start = Number(ordered[1]);
      while (i < lines.length) {
        const item = lines[i].match(ordered ? MD_OLIST : MD_ULIST);
        if (!item) break;
        const li = document.createElement("li");
        appendInline(li, ordered ? item[2] : item[1]);
        list.appendChild(li);
        i += 1;
      }
      nodes.push(list);
      continue;
    }
    paragraph.push(line.trim());
    i += 1;
  }
  flushParagraph();
  return nodes;
}

function appendInline(parent, text) {
  // A fresh regex per call: the recursive calls below would otherwise share one
  // global lastIndex, which a nested scan resets to 0 and the outer loop then
  // rescans from the start forever.
  const pattern =
    /(`+)([\s\S]*?)\1|\*\*([\s\S]+?)\*\*|\*([\s\S]+?)\*|\[([^\]]+)\]\(([^)\s]+)\)|\n/g;
  let last = 0;
  let match;
  while ((match = pattern.exec(text))) {
    if (match.index > last) {
      parent.appendChild(document.createTextNode(text.slice(last, match.index)));
    }
    last = pattern.lastIndex;
    if (match[2] !== undefined) {
      const code = document.createElement("code");
      code.textContent = match[2].trim();
      parent.appendChild(code);
    } else if (match[3] !== undefined) {
      const strong = document.createElement("strong");
      appendInline(strong, match[3]);
      parent.appendChild(strong);
    } else if (match[4] !== undefined) {
      const em = document.createElement("em");
      appendInline(em, match[4]);
      parent.appendChild(em);
    } else if (match[5] !== undefined) {
      const href = match[6];
      if (MD_LINK.test(href)) {
        const link = document.createElement("a");
        link.href = href;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        appendInline(link, match[5]);
        parent.appendChild(link);
      } else {
        parent.appendChild(document.createTextNode(match[5]));
      }
    } else {
      parent.appendChild(document.createElement("br"));
    }
  }
  if (last < text.length) {
    parent.appendChild(document.createTextNode(text.slice(last)));
  }
}

function renderMessages() {
  const root = $("messages");
  clear(root);
  if (state.messages.length === 0) {
    const empty = document.createElement("div");
    empty.className = "message status";
    empty.textContent = t("Ready");
    root.appendChild(empty);
  }
  state.messages.forEach((message) => {
    const el = document.createElement("div");
    el.className = `message ${message.role}`;
    el.dataset.messageId = message.id;
    if (message.meta) {
      const meta = document.createElement("span");
      meta.className = "meta";
      meta.textContent = message.meta;
      el.appendChild(meta);
    }
    if (message.role === "agent") {
      const body = document.createElement("div");
      body.className = "agent-markdown-body";
      appendAgentMarkdown(body, message);
      el.appendChild(body);
    } else {
      el.appendChild(document.createTextNode(message.text));
    }
    if (message.planRound) {
      const action = document.createElement("button");
      action.type = "button";
      action.className = "message-link";
      action.textContent = t("Show RTDL");
      action.addEventListener("click", () => {
        openRtdlHistory();
      });
      el.appendChild(action);
    }
    if (Array.isArray(message.attachments) && message.attachments.length) {
      const images = document.createElement("div");
      images.className = "message-images";
      message.attachments.forEach((item) => {
        const img = document.createElement("img");
        img.src = item.dataUrl;
        img.alt = item.name || t("attachment");
        images.appendChild(img);
      });
      el.appendChild(images);
    }
    root.appendChild(el);
  });
  root.scrollTop = root.scrollHeight;
}

function addTimeline(kind, text) {
  state.timeline.unshift({ kind, text, at: new Date().toLocaleTimeString() });
  state.timeline = state.timeline.slice(0, 80);
  renderTimeline();
  persistCurrentConversation();
}

function renderTimeline() {
  setTextAll("[data-event-summary]", String(state.timeline.length));
  setTextAll("[data-current-task-label]", t("Current Task: {task}", { task: currentTaskLabel() }));
  const rows = state.timeline;
  document.querySelectorAll("[data-event-list]").forEach((root) => {
    clear(root);
    if (!rows.length) {
      const empty = document.createElement("div");
      empty.className = "event-empty";
      empty.textContent = t("No task events yet.");
      root.appendChild(empty);
      return;
    }
    rows.forEach((item) => {
      const row = document.createElement("div");
      row.className = "event-row";
      row.textContent = `[${item.at}] ${String(item.kind || t("event")).toUpperCase()} ${item.text || ""}`;
      root.appendChild(row);
    });
  });
}

function renderPlan() {
  const roots = document.querySelectorAll("[data-plan-tree]");
  roots.forEach((root) => clear(root));
  const records = normalizedPlanRecords();
  const activeRecords = records.filter((record) => recordIsActive(record));
  const latestRecord = activeRecords[0] || null;
  const historyRecords = records.filter((record) => !activeRecords.includes(record));
  const latestCalls = planCalls(latestRecord?.plan).length;
  setTextAll("[data-plan-summary]", latestRecord
    ? t("{active} active · plan {plan} · round {round} · {calls} call(s)", {
      active: activeRecords.length,
      plan: latestRecord.plan.planId || "-",
      round: latestRecord.plan.round,
      calls: latestCalls,
    })
    : t("No RTDL tree is currently executing"));
  if (maybe("rtdlHistoryCount")) $("rtdlHistoryCount").textContent = String(historyRecords.length);
  renderGoalPanel();
  renderSceneAssets();
  if (!latestRecord) {
    roots.forEach((root) => {
      const empty = document.createElement("div");
      empty.className = "plan-empty";
      empty.textContent = t("No RTDL plan in this session yet.");
      root.appendChild(empty);
    });
  } else {
    roots.forEach((root) => renderPlanRecord(root, latestRecord));
  }
  renderPlanHistory(historyRecords);
  const newest = latestRecord;
  if (!newest) return renderExecutionDetail(null, "PENDING");
  const maps = buildResultMaps(newest);
  const runningIndex = pickRunningIndex(newest.plan, maps.byIndex);
  const activeNode = newest.plan.nodes.find((node) => Number(node.index) === Number(runningIndex))
    || newest.plan.nodes.find((node) => node.call) || newest.plan.nodes[0];
  renderExecutionDetail(activeNode, aggregateNodeStatus(activeNode, newest.plan, maps, runningIndex), resultForNode(activeNode, maps));
}

function normalizedPlanRecords() {
  if (state.planRecords.length) return state.planRecords;
  if (!state.plan) return [];
  return [{ key: planRecordKey(state.plan), plan: state.plan, nodeStates: state.nodeStates || {}, batches: state.batches || [] }];
}

function renderPlanRecord(root, record, onSelect = renderExecutionDetail) {
  const wrapper = document.createElement("section");
  wrapper.className = "plan-record";
  const label = document.createElement("div");
  label.className = "plan-record-label";
  label.textContent = t("Plan {id} · round {round}", { id: record.plan.planId || "-", round: record.plan.round });
  wrapper.appendChild(label);
  const maps = buildResultMaps(record);
  const runningIndex = recordIsActive(record)
    ? pickRunningIndex(record.plan, maps.byIndex)
    : null;
  renderBehaviorTree(wrapper, record.plan, maps, runningIndex, onSelect);
  root.appendChild(wrapper);
}

function renderPlanHistory(records) {
  const root = maybe("rtdlHistoryTrees");
  if (!root) return;
  clear(root);
  records.forEach((record) => renderPlanRecord(root, record, renderHistoryExecutionDetail));
  if (!records.length) {
    const empty = document.createElement("div");
    empty.className = "plan-empty";
    empty.textContent = t("No completed RTDL trees yet.");
    root.appendChild(empty);
  }
}

function renderBehaviorTree(root, plan, resultMaps, runningIndex, onSelect = renderExecutionDetail) {
  const nodes = plan?.nodes || [];
  const nodeStateByIndex = resultMaps.byIndex;
  const byIndex = new Map(nodes.map((node) => [Number(node.index), node]));
  const childSet = new Set();
  nodes.forEach((node) => (node.children || []).forEach((child) => childSet.add(Number(child))));
  const treeRoots = [];
  if (plan.rootIndex !== undefined && byIndex.has(Number(plan.rootIndex))) {
    treeRoots.push(byIndex.get(Number(plan.rootIndex)));
  }
  nodes.forEach((node) => {
    if (!childSet.has(Number(node.index)) && !treeRoots.includes(node)) treeRoots.push(node);
  });
  if (!treeRoots.length && nodes.length) treeRoots.push(nodes[0]);

  treeRoots.forEach((treeRoot, treeIndex) => {
    const status = aggregateNodeStatus(treeRoot, plan, resultMaps, runningIndex);
    const card = document.createElement("div");
    card.className = "bt-tree-card";
    const header = document.createElement("div");
    header.className = "bt-tree-header";
    const title = document.createElement("strong");
    title.textContent = treeRoots.length > 1
      ? t("Tree {n}: {label}", { n: treeIndex + 1, label: nodeLabel(treeRoot) })
      : nodeLabel(treeRoot);
    const pill = document.createElement("span");
    pill.className = `status ${statusKey(status)}`;
    pill.textContent = displayStatus(status);
    header.append(title, pill);
    const viewport = document.createElement("div");
    viewport.className = "bt-tree-viewport";
    viewport.appendChild(makeBehaviorTreeSvg(treeRoot, plan, resultMaps, runningIndex, onSelect));
    card.append(header, viewport);
    root.appendChild(card);
  });
}

function makeBehaviorTreeSvg(treeRoot, plan, resultMaps, runningIndex, onSelect = renderExecutionDetail) {
  const nodes = plan?.nodes || [];
  const byIndex = new Map(nodes.map((node) => [Number(node.index), node]));
  const nodeStateByIndex = resultMaps.byIndex;
  const nodeW = 104;
  const nodeH = 38;
  const leafGap = 22;
  const levelGap = 72;
  const topPad = 18;
  const sidePad = 18;
  const laid = [];
  let cursor = sidePad;

  const layout = (node, depth) => {
    const children = (node.children || []).map((child) => byIndex.get(Number(child))).filter(Boolean);
    if (!children.length) {
      const pos = { node, depth, x: cursor + nodeW / 2, y: topPad + depth * levelGap };
      cursor += nodeW + leafGap;
      laid.push(pos);
      return pos;
    }
    const childPos = children.map((child) => layout(child, depth + 1));
    const x = (childPos[0].x + childPos[childPos.length - 1].x) / 2;
    const pos = { node, depth, x, y: topPad + depth * levelGap };
    laid.push(pos);
    return pos;
  };

  layout(treeRoot, 0);
  const maxDepth = laid.reduce((m, item) => Math.max(m, item.depth), 0);
  const width = Math.max(220, cursor + sidePad);
  const height = Math.max(88, topPad * 2 + nodeH + maxDepth * levelGap);
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("class", "bt-svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("width", String(width));
  svg.setAttribute("height", String(height));

  const posByIndex = new Map(laid.map((item) => [Number(item.node.index), item]));
  laid.forEach(({ node, x, y }) => {
    const childPositions = (node.children || [])
      .map((child) => posByIndex.get(Number(child)))
      .filter(Boolean);
    if (!childPositions.length) return;
    const y1 = y + nodeH;
    const y2 = childPositions[0].y;
    const branchY = y1 + (y2 - y1) / 2;
    const minX = Math.min(...childPositions.map((child) => child.x));
    const maxX = Math.max(...childPositions.map((child) => child.x));
    const path = document.createElementNS(ns, "path");
    const segments = [`M ${x} ${y1} V ${branchY}`];
    if (childPositions.length > 1) segments.push(`M ${minX} ${branchY} H ${maxX}`);
    childPositions.forEach((child) => segments.push(`M ${child.x} ${branchY} V ${child.y}`));
    path.setAttribute("class", "bt-edge");
    path.setAttribute("d", segments.join(" "));
    svg.appendChild(path);
  });

  const rootPos = posByIndex.get(Number(treeRoot?.index));
  if (rootPos) {
    const entry = document.createElementNS(ns, "circle");
    entry.setAttribute("class", "bt-entry");
    entry.setAttribute("cx", String(rootPos.x));
    entry.setAttribute("cy", "8");
    entry.setAttribute("r", "3");
    svg.appendChild(entry);
    const line = document.createElementNS(ns, "path");
    line.setAttribute("class", "bt-edge");
    line.setAttribute("d", `M ${rootPos.x} 11 L ${rootPos.x} ${rootPos.y}`);
    svg.appendChild(line);
  }

  laid.forEach(({ node, x, y }) => {
    const status = aggregateNodeStatus(node, plan, resultMaps, runningIndex);
    const key = statusKey(status);
    const g = document.createElementNS(ns, "g");
    g.setAttribute("class", `bt-node status-${key}${isRunningNode(node, runningIndex) ? " active" : ""}`);
    g.setAttribute("transform", `translate(${x - nodeW / 2}, ${y})`);
    g.setAttribute("role", "button");
    g.style.cursor = "pointer";
    const title = document.createElementNS(ns, "title");
    title.textContent = `${nodeLabel(node)} · ${capabilityLabel(node)} · ${displayStatus(status)}`;
    const rect = document.createElementNS(ns, "rect");
    rect.setAttribute("width", String(nodeW));
    rect.setAttribute("height", String(nodeH));
    rect.setAttribute("rx", "5");
    const accent = document.createElementNS(ns, "rect");
    accent.setAttribute("class", "bt-node-accent");
    accent.setAttribute("x", "0");
    accent.setAttribute("y", "4");
    accent.setAttribute("width", "2.5");
    accent.setAttribute("height", String(nodeH - 8));
    accent.setAttribute("rx", "1.25");
    const text = document.createElementNS(ns, "text");
    text.setAttribute("x", String(nodeW / 2));
    text.setAttribute("y", "16");
    text.setAttribute("text-anchor", "middle");
    text.textContent = ellipsize(nodeLabel(node), 15);
    const meta = document.createElementNS(ns, "text");
    meta.setAttribute("class", "bt-node-meta");
    meta.setAttribute("x", String(nodeW / 2));
    meta.setAttribute("y", "30");
    meta.setAttribute("text-anchor", "middle");
    meta.textContent = node.call ? ellipsize(compactProvider(node.call), 17) : displayStatus(status);
    g.append(title, rect, accent, text, meta);
    g.addEventListener("click", () => onSelect(node, status, resultForNode(node, resultMaps)));
    svg.appendChild(g);
  });

  return svg;
}

function makePlanRow(node, status, depth, runningIndex) {
  const row = document.createElement("div");
  const key = statusKey(status);
  row.className = `plan-row status-${key}${node.index === runningIndex ? " active" : ""}`;
  row.style.setProperty("--depth", String(Math.min(depth || 0, 6)));
  const rail = document.createElement("span");
  rail.className = "node-rail";
  const body = document.createElement("div");
  body.className = "node-body";
  const top = document.createElement("div");
  top.className = "node-topline";
  const name = document.createElement("strong");
  name.className = "node-name";
  name.textContent = nodeLabel(node);
  const statusEl = document.createElement("span");
  statusEl.className = `status ${key}`;
  statusEl.textContent = displayStatus(status);
  top.append(name, statusEl);
  const meta = document.createElement("div");
  meta.className = "node-meta";
  const type = document.createElement("span");
  type.textContent = `#${node.index} · ${node.kind || "op"}`;
  const provider = document.createElement("span");
  provider.textContent = capabilityLabel(node);
  meta.append(type, provider);
  body.append(top, meta);
  row.append(rail, body);
  row.addEventListener("click", () => renderExecutionDetail(node, status));
  return row;
}

function nodeLabel(node) {
  if (node.call?.name) return node.call.name;
  if (node.opId) return node.opId;
  if (node.description) return node.description;
  const kind = String(node.kind || (node.children?.length ? "sequence" : "leaf"));
  return kind.charAt(0).toUpperCase() + kind.slice(1);
}

function capabilityLabel(node) {
  const call = node?.call || {};
  return call.providerId || call.contractId || call.name || "pilot";
}

function compactProvider(call) {
  const provider = String(call?.providerId || "");
  const contract = String(call?.contractId || "");
  const tail = contract ? contract.split("/").pop() : "";
  if (provider && tail) return `${provider}.${tail}`;
  return provider || tail || "call";
}

function formatArgs(value) {
  if (typeof value === "string") return value;
  return JSON.stringify(value || {}, null, 2);
}

function computeNodeDepths(plan) {
  const depths = new Map();
  const visit = (index, depth) => {
    if (depths.has(index) && depths.get(index) <= depth) return;
    depths.set(index, depth);
    const node = plan.nodes.find((item) => item.index === index);
    (node?.children || []).forEach((child) => visit(child, depth + 1));
  };
  visit(Number(plan.rootIndex || 0), 0);
  plan.nodes.forEach((node) => {
    if (!depths.has(node.index)) depths.set(node.index, 0);
  });
  return depths;
}

function planForestNodes(plan) {
  const byIndex = new Map((plan?.nodes || []).map((node) => [Number(node.index), node]));
  const seen = new Set();
  const out = [];
  const emit = (index, depth) => {
    const idx = Number(index);
    const node = byIndex.get(idx);
    if (!node || seen.has(idx)) return;
    seen.add(idx);
    out.push({ node, depth });
    (node.children || []).forEach((child) => emit(child, depth + 1));
  };
  if (plan && plan.rootIndex !== undefined) emit(plan.rootIndex, 0);
  (plan?.nodes || []).forEach((node) => emit(node.index, 0));
  return out;
}

function aggregateNodeStatus(node, plan, resultMaps, runningIndex) {
  const own = resultForNode(node, resultMaps);
  if (own?.state) {
    if (String(own.state).toUpperCase() === "RUNNING" && runningIndex === null) return "ENDED";
    return own.state;
  }
  if (isRunningNode(node, runningIndex)) return "RUNNING";
  const children = (node?.children || [])
    .map((idx) => (plan?.nodes || []).find((item) => Number(item.index) === Number(idx)))
    .filter(Boolean);
  if (!children.length) return "PENDING";
  const childStatuses = children.map((child) => statusKey(aggregateNodeStatus(child, plan, resultMaps, runningIndex)));
  if (childStatuses.includes("failed")) return "FAILED";
  if (childStatuses.includes("running")) return "RUNNING";
  if (childStatuses.length && childStatuses.every((s) => s === "success")) return "SUCCEEDED";
  return "PENDING";
}

function ellipsize(text, max) {
  const value = String(text || "");
  return value.length <= max ? value : `${value.slice(0, Math.max(1, max - 1))}…`;
}

function pickRunningIndex(plan, nodeStateByIndex) {
  const callable = plan.nodes.filter((node) => node.call);
  const explicitRunning = plan.nodes.find((node) => nodeStateByIndex.get(node.index)?.state === "RUNNING");
  if (explicitRunning) return explicitRunning.index;
  const firstPending = callable.find((node) => !nodeStateByIndex.has(node.index));
  return firstPending?.index ?? callable.at(-1)?.index ?? plan.rootIndex ?? 0;
}

function isRunningNode(node, runningIndex) {
  return runningIndex !== null
    && runningIndex !== undefined
    && Number(node?.index) === Number(runningIndex);
}

function nodeStatus(node, nodeStateByIndex, runningIndex) {
  const result = nodeStateByIndex.get(node?.index);
  if (result?.state) return result.state;
  if (node.index === runningIndex) return "RUNNING";
  if (!node.call && (node.children || []).length) {
    if (node.children.some((child) => child === runningIndex)) return "RUNNING";
    return "PENDING";
  }
  return "PENDING";
}

function durationForNode(node, status) {
  const result = nodeResult(node);
  const value = result?.durationMs ?? result?.duration_ms ?? result?.elapsedMs ?? result?.elapsed_ms;
  if (Number.isFinite(Number(value))) return `${(Number(value) / 1000).toFixed(2)}s`;
  const key = statusKey(status);
  if (key === "pending") return "-";
  if (key === "running") return t("running");
  return t("done");
}

function startedForNode(node, status) {
  const result = nodeResult(node);
  const value = result?.startedAt || result?.started_at || result?.startTime || result?.start_time;
  if (!value) return statusKey(status) === "pending" ? "-" : "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function statusKey(status) {
  const raw = String(status || "pending").toLowerCase();
  if (raw === "succeeded" || raw === "success" || raw === "done" || raw === "completed") return "success";
  if (["failed", "failure", "error", "canceled", "cancelled", "timeout", "aborted"].includes(raw)) return "failed";
  if (["running", "in_progress", "active", "verifying", "paused"].includes(raw)) return "running";
  if (raw === "ended" || raw === "inactive") return "ended";
  return "pending";
}

function recordHasTerminalBatch(record) {
  return Array.isArray(record?.batches) && record.batches.length > 0;
}

function recordIsActive(record) {
  if (!record?.plan || recordHasTerminalBatch(record)) return false;
  if (!state.executorPlansReady) return record === normalizedPlanRecords()[0];
  const planId = String(record.plan.planId || "");
  if (state.executorPlanIds.has(planId)) return true;
  return Number(state.executorMissingPolls.get(planId) || 0) < 2;
}

async function refreshActivePlans() {
  const atlas = buildAtlasEndpoint(maybe("robotHost")?.value, maybe("atlasPort")?.value);
  if (!atlas) {
    state.executorPlansReady = false;
    state.executorPlans = [];
    state.executorPlanIds = new Set();
    renderActivePlans(t("Set Robot Host first."));
    return;
  }
  const settings = { ...collectSettings(), atlasEndpoint: atlas };
  const result = await fetch("/api/executor/active-plans", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ settings }),
  }).then((response) => response.json()).catch((error) => ({
    available: false,
    count: 0,
    plans: [],
    error: String(error),
  }));
  if (!result.available) {
    renderActivePlans(result.error || t("Executor query unavailable."));
    return;
  }
  state.executorPlansReady = true;
  state.executorPlans = Array.isArray(result.plans) ? result.plans : [];
  state.executorPlanIds = new Set(state.executorPlans.map((plan) => String(plan.planId || "")));
  normalizedPlanRecords().forEach((record) => {
    const planId = String(record.plan?.planId || "");
    if (!planId || state.executorPlanIds.has(planId) || recordHasTerminalBatch(record)) {
      state.executorMissingPolls.set(planId, 0);
      return;
    }
    state.executorMissingPolls.set(planId, Number(state.executorMissingPolls.get(planId) || 0) + 1);
  });
  renderActivePlans();
  renderPlan();
}

function renderActivePlans(error = "") {
  state.activePlansError = error;
  const root = maybe("activeRtdlList");
  const count = maybe("activeRtdlCount");
  const summary = maybe("activeRtdlSummary");
  const modalSummary = maybe("activeRtdlModalSummary");
  if (!root || !count) return;
  clear(root);
  if (error) {
    count.textContent = t("unavailable");
    if (summary) summary.textContent = t("Executor state unavailable");
    if (modalSummary) modalSummary.textContent = t("Live Executor query failed");
    const row = document.createElement("div");
    row.className = "active-rtdl-empty error";
    row.textContent = error;
    root.appendChild(row);
    return;
  }
  const planCount = state.executorPlans.length;
  count.textContent = String(planCount);
  if (summary) summary.textContent = planCount ? t("{count} running · open live workspace", { count: planCount }) : t("No plans running");
  if (modalSummary) modalSummary.textContent = t(
    planCount === 1 ? "{count} live plan reported by Executor" : "{count} live plans reported by Executor",
    { count: planCount },
  );
  if (!state.executorPlans.length) {
    const row = document.createElement("div");
    row.className = "active-rtdl-empty";
    row.textContent = t("Executor reports no active RTDL plans.");
    root.appendChild(row);
    return;
  }
  state.executorPlans.forEach((plan) => {
    const card = document.createElement("article");
    card.className = `active-rtdl-card${plan.cancelled ? " canceling" : ""}`;
    const header = document.createElement("header");
    header.className = "active-rtdl-card-header";
    const body = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = plan.description || t("Plan {id}", { id: plan.planId });
    const meta = document.createElement("span");
    const runningOps = (plan.ops || []).filter((op) => op.state === "running").length;
    meta.textContent = t("plan {id} · {running}/{total} running", { id: plan.planId, running: runningOps, total: plan.opCount });
    body.append(title, meta);
    const statePill = document.createElement("span");
    statePill.className = `status ${plan.cancelled ? "ended" : "running"}`;
    statePill.textContent = plan.cancelled ? t("CANCELING") : t("RUNNING");
    header.append(body, statePill);
    card.appendChild(header);

    const ops = document.createElement("div");
    ops.className = "active-rtdl-ops";
    const planOps = Array.isArray(plan.ops) ? plan.ops : [];
    if (!planOps.length) {
      const empty = document.createElement("span");
      empty.className = "active-rtdl-empty";
      empty.textContent = t("No operation details reported.");
      ops.appendChild(empty);
    } else {
      planOps.forEach((op) => {
        const opRow = document.createElement("div");
        opRow.className = "active-rtdl-op";
        const opMain = document.createElement("div");
        opMain.className = "active-rtdl-op-main";
        const opTitle = document.createElement("strong");
        opTitle.textContent = op.description || t("Operation {id}", { id: op.op_id || "-" });
        const opMeta = document.createElement("span");
        opMeta.textContent = t("op {id} · {kind}", { id: op.op_id || "-", kind: op.kind || "do" });
        opMain.append(opTitle, opMeta);
        const target = document.createElement("div");
        target.className = "active-rtdl-op-target";
        target.textContent = op.provider_id || op.contract_id
          ? `${op.provider_id || "?"} · ${op.contract_id || t("operator")}`
          : t("operator node");
        const opState = document.createElement("span");
        const stateName = String(op.state || "pending").toLowerCase();
        opState.className = `status ${stateName}`;
        opState.textContent = t(stateName.toUpperCase());
        opRow.append(opMain, target, opState);
        ops.appendChild(opRow);
      });
    }
    card.appendChild(ops);
    root.appendChild(card);
  });
}

function displayStatus(status) {
  return t(statusKey(status).toUpperCase());
}

function renderExecutionDetail(node, status, nodeState = null) {
  if (!maybe("activeProvider")) return;
  if (maybe("executionDetailTitle")) $("executionDetailTitle").textContent = node ? t("Node detail") : t("Node detail");
  if (!node) {
    $("activeProvider").textContent = "-";
    $("activeStarted").textContent = "-";
    $("activeDuration").textContent = "-";
    $("activeArgs").textContent = t("Select an RTDL node to inspect its arguments and result.");
    return;
  }
  $("activeProvider").textContent = detailProvider(node);
  $("activeStarted").textContent = node ? startedForNode(node, status) : "-";
  $("activeDuration").textContent = node ? durationForNode(node, status) : "-";
  $("activeArgs").textContent = formatArgs(detailPayload(node, status, nodeState));
}

function renderHistoryExecutionDetail(node, status, nodeState = null) {
  if (!maybe("historyActiveProvider")) return;
  if (maybe("historyExecutionDetailTitle")) {
    $("historyExecutionDetailTitle").textContent = node ? nodeLabel(node) : t("Node detail");
  }
  if (!node) {
    $("historyActiveProvider").textContent = "-";
    $("historyActiveStarted").textContent = "-";
    $("historyActiveDuration").textContent = "-";
    $("historyActiveArgs").textContent = t("Select an RTDL node to inspect its arguments and result.");
    return;
  }
  $("historyActiveProvider").textContent = detailProvider(node);
  $("historyActiveStarted").textContent = startedForNode(node, status);
  $("historyActiveDuration").textContent = durationForNode(node, status);
  $("historyActiveArgs").textContent = formatArgs(detailPayload(node, status, nodeState));
}

function buildResultMaps(record = null) {
  const byIndex = new Map();
  const byCallId = new Map();
  const add = (result) => {
    if (!result) return;
    const idx = Number(result.nodeIndex);
    if (Number.isFinite(idx)) byIndex.set(idx, result);
    const callId = result.leafResult?.callId || result.callId;
    if (callId) byCallId.set(String(callId), result);
  };
  Object.values(record?.nodeStates || state.nodeStates || {}).forEach(add);
  (record?.batches || state.batches).forEach((batch) => (batch.results || []).forEach(add));
  return { byIndex, byCallId };
}

function resultForNode(node, maps = buildResultMaps()) {
  if (!node) return null;
  const callId = node.call?.callId ? String(node.call.callId) : "";
  if (callId && maps.byCallId?.has(callId)) return maps.byCallId.get(callId);
  const indexed = maps.byIndex?.get(Number(node.index)) || null;
  if (!indexed) return null;
  if (!node.call) return indexed.leafResult ? { ...indexed, leafResult: null } : indexed;
  const resultCallId = indexed.leafResult?.callId || indexed.callId || "";
  return !resultCallId || String(resultCallId) === callId ? indexed : null;
}

function nodeResult(node) {
  return resultForNode(node);
}

function detailProvider(node) {
  if (!node) return "-";
  if (!node.call) return `${node.kind || "op"}${node.opId ? ` / ${node.opId}` : ""}`;
  return node.call.providerId || node.call.contractId || node.call.name || "call";
}

function detailPayload(node, status, nodeState) {
  if (!node) return {};
  if (!node.call) {
    return {
      kind: node.kind || "op",
      opId: node.opId || "",
      description: node.description || "",
      status: displayStatus(status),
      children: node.children || [],
    };
  }
  return {
    call: {
      callId: node.call.callId || "",
      providerId: node.call.providerId || "",
      contractId: node.call.contractId || "",
      name: node.call.name || "",
      args: node.call.args || {},
    },
    result: nodeState?.leafResult || null,
    state: nodeState?.state || displayStatus(status),
  };
}

function planCalls(plan) {
  return (plan?.nodes || []).filter((node) => node.call);
}

function activePlanNode() {
  const record = normalizedPlanRecords().find((item) => recordIsActive(item));
  if (!record) return null;
  const maps = buildResultMaps(record);
  const runningIndex = pickRunningIndex(record.plan, maps.byIndex);
  return record.plan.nodes.find((node) => node.index === runningIndex)
    || record.plan.nodes.find((node) => node.call)
    || null;
}

function currentExecutionContext() {
  if (state.executorPlansReady) {
    for (const plan of state.executorPlans) {
      const runningOp = (plan.ops || []).find((op) => String(op.state || "").toLowerCase() === "running") || null;
      const record = normalizedPlanRecords().find(
        (item) => String(item.plan?.planId || "") === String(plan.planId || ""),
      );
      const node = runningOp && record
        ? record.plan.nodes.find((item) => String(item.opId || "") === String(runningOp.op_id || runningOp.opId || "")) || null
        : null;
      return {
        source: runningOp ? "Executor verified" : "Executor plan verified",
        plan,
        op: runningOp,
        node: node || (record ? activeNodeForRecord(record) : null),
      };
    }
    return null;
  }
  const node = activePlanNode();
  return node ? { source: "Pilot stream estimate", plan: null, op: null, node } : null;
}

function activeNodeForRecord(record) {
  const maps = buildResultMaps(record);
  const runningIndex = pickRunningIndex(record.plan, maps.byIndex);
  return record.plan.nodes.find((node) => Number(node.index) === Number(runningIndex))
    || record.plan.nodes.find((node) => node.call)
    || null;
}

function appendGoalField(root, label, value) {
  const row = document.createElement("div");
  const key = document.createElement("span");
  const content = document.createElement("strong");
  key.textContent = label;
  content.textContent = value || "-";
  row.append(key, content);
  root.appendChild(row);
}

function renderGoalPanel() {
  const task = state.taskState || {};
  const context = currentExecutionContext();
  const active = context?.node || null;
  const taskText = task.goal || task.task || firstUserMessage() || t("waiting for task");
  const status = task.status || (context ? "executing" : "idle");
  if (maybe("goalLine")) $("goalLine").textContent = t("{status}: {task}", { status: t(status), task: taskText });
  document.querySelectorAll("[data-goal-preview]").forEach((goal) => {
    clear(goal);
    const card = document.createElement("div");
    card.className = "goal-card";
    const source = document.createElement("span");
    source.className = `goal-source${context?.source === "Executor verified" ? " verified" : ""}`;
    source.textContent = context?.source
      ? t(context.source)
      : (state.executorPlansReady ? t("Executor verified") : t("Executor unavailable"));
    const title = document.createElement("strong");
    title.textContent = active?.call?.name
      || context?.op?.description
      || context?.plan?.description
      || t("No active Executor call");
    card.append(source, title);
    if (context) {
      const fields = document.createElement("div");
      fields.className = "goal-call-grid";
      const providerId = active?.call?.providerId || context.op?.provider_id || context.op?.providerId || "-";
      const contractId = active?.call?.contractId || context.op?.contract_id || context.op?.contractId || "-";
      appendGoalField(fields, t("Provider"), providerId);
      appendGoalField(fields, t("Contract"), contractId);
      appendGoalField(
        fields,
        t("Operation"),
        active?.call?.name || (contractId !== "-" ? contractId.split("/").pop() : "") || context.op?.description || nodeLabel(active || {}),
      );
      appendGoalField(
        fields,
        t("Plan / node"),
        `${context.plan?.planId || "-"} / ${context.op?.op_id || context.op?.opId || active?.opId || active?.index || "-"}`,
      );
      card.appendChild(fields);
    } else {
      const empty = document.createElement("span");
      empty.textContent = state.executorPlansReady
        ? t("Executor reports no running RTDL plan.")
        : t("Connect to Executor to read the authoritative running call.");
      card.appendChild(empty);
    }
    const target = goalSummary(active);
    if (target) {
      const detail = document.createElement("pre");
      detail.className = "goal-json";
      detail.textContent = target;
      card.appendChild(detail);
    }
    goal.appendChild(card);
  });
}

function goalSummary(node) {
  const args = node?.call?.args;
  if (!args || typeof args !== "object") return "";
  const keys = ["goal", "object_id", "map_id", "target", "query", "text"];
  const out = {};
  keys.forEach((key) => {
    if (args[key] !== undefined) out[key] = args[key];
  });
  return Object.keys(out).length ? formatArgs(out) : "";
}

function currentTaskLabel() {
  const text = firstUserMessage();
  if (!text) return t("idle");
  return text.length > 40 ? `${text.slice(0, 37)}...` : text;
}

async function refreshVoiceFinishSupport() {
  // Older liaisons never registered robonix/system/liaison/voice/finish, so
  // absence just means "not upgraded yet" -- keep the button hidden rather
  // than let a click fail with a raw gRPC UNIMPLEMENTED error.
  const result = await fetch("/api/voice/finish-supported", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ settings: collectSettings() }),
  }).then((r) => r.json()).catch(() => ({ supported: false }));
  state.voiceFinishSupported = Boolean(result.supported);
  syncVoiceControls();
}

async function refreshSystem() {
  const atlas = buildAtlasEndpoint($("robotHost").value, $("atlasPort").value);
  if (!atlas) {
    renderSystem({ error: t("Set Robot Host and Atlas Port first."), summary: { state: "offline" }, requiredContracts: [], providers: [] });
    return;
  }
  const data = await fetch(`/api/system?atlas=${encodeURIComponent(atlas)}`).then((r) => r.json()).catch((error) => ({ error: String(error) }));
  renderSystem(data);
}

function renderSystem(data) {
  state.lastSystemData = data;
  const summary = data.summary || {};
  const stateLabel = data.error ? "offline" : summary.state || "unknown";
  const online = !data.error;
  $("connectionState").textContent = t(stateLabel);
  $("refreshSystem").classList.toggle("offline", !online);
  $("refreshSystem").classList.toggle("online", online);
  if (maybe("connectNow")) {
    $("connectNow").textContent = online ? t("Connected") : t("Connect");
    $("connectNow").classList.toggle("connected", online);
    $("connectNow").title = online ? t("Atlas is reachable") : t("Check Atlas connection");
  }
  if (maybe("metricState")) $("metricState").textContent = t(stateLabel);
  if (maybe("metricActive")) $("metricActive").textContent = String(summary.active || 0);
  if (maybe("metricErrors")) $("metricErrors").textContent = String(summary.errors || 0);
  renderRobotState(data);

  const contractRoot = maybe("contractList");
  if (!contractRoot) return;
  clear(contractRoot);
  (data.requiredContracts || []).forEach((item) => {
    const row = document.createElement("div");
    row.className = "contract-row";
    const label = document.createElement("strong");
    label.textContent = item.label;
    const status = document.createElement("span");
    status.className = item.available ? "ok" : "warn";
    status.textContent = item.available ? item.providers.join(", ") : t("missing");
    row.append(label, status);
    contractRoot.appendChild(row);
  });

  const providerRoot = maybe("providerList");
  if (!providerRoot) return;
  clear(providerRoot);
  if (data.error) {
    const row = document.createElement("div");
    row.className = "provider-row";
    row.textContent = data.error;
    providerRoot.appendChild(row);
    return;
  }
  (data.providers || []).forEach((provider) => {
    const row = document.createElement("div");
    row.className = "provider-row";
    const title = document.createElement("strong");
    title.textContent = provider.id;
    const meta = document.createElement("span");
    meta.textContent = `${provider.kind}  ${provider.state}  ${provider.capabilities.length} ${t("cap(s)")}`;
    row.append(title, meta);
    providerRoot.appendChild(row);
  });
}

function renderRobotState(data) {
  if (!document.querySelector("[data-robot-state-list]")) return;
  const contracts = data.requiredContracts || [];
  const summary = data.summary || {};
  const recording = Boolean(state.voiceRecording);
  const audioReady = contractAvailable(contracts, "Speaker") || contractAvailable(contracts, "TTS");
  const rows = [
    { label: t("Base"), icon: "B", ok: contractAvailable(contracts, "Executor") || contractAvailable(contracts, "Liaison submit"), status: t("OK"), value: "0.00 m/s", source: "mock" },
    { label: t("Arm"), icon: "A", ok: summary.errors === 0, status: t("OK"), value: t("Idle"), source: "mock" },
    { label: t("Head / Camera"), icon: "C", ok: true, status: t("OK"), value: t("Tracking"), source: "mock" },
    { label: t("Battery"), icon: "P", ok: true, status: "86%", value: "2h 14m", source: "mock", battery: 86 },
    { label: t("Localization"), icon: "L", ok: !data.error, status: t("OK"), value: "0.04 m", source: "mock", separated: true },
    { label: t("Navigation"), icon: "N", ok: contractAvailable(contracts, "Executor"), status: state.busy ? t("Moving") : t("Ready"), value: state.busy ? "0.32 m" : "0.00 m", source: "derived", warn: state.busy },
    { label: t("Audio Input"), icon: "M", ok: contractAvailable(contracts, "Mic") || contractAvailable(contracts, "ASR"), status: recording ? t("Listening") : t("Standby"), value: "", source: "real", wave: recording },
    { label: t("Audio Output"), icon: "S", ok: audioReady, status: state.ttsPlaying ? t("Speaking") : t("Ready"), value: "", source: "real", wave: state.ttsPlaying },
    { label: t("Connection"), icon: "O", ok: !data.error, status: data.error ? t("Offline") : t("Online"), value: "", source: "real", separated: true },
    { label: t("Safety"), icon: "!", ok: summary.errors === 0, status: summary.errors ? t("{count} error(s)", { count: summary.errors }) : t("OK"), value: "", source: "derived", danger: summary.errors > 0 },
  ];
  setTextAll("[data-robot-mode]", data.error ? t("Offline") : state.busy ? t("Executing") : t("Ready"));
  document.querySelectorAll("[data-robot-state-list]").forEach((root) => {
    clear(root);
    rows.forEach((item) => {
      const row = document.createElement("div");
      row.className = `robot-state-row${item.separated ? " separated" : ""}`;
      row.title = t("source: {source}", { source: item.source });
      const icon = document.createElement("span");
      icon.className = `state-icon ${item.danger ? "danger" : item.ok ? "ok" : "warn"}`;
      icon.textContent = item.icon;
      const label = document.createElement("strong");
      label.textContent = item.label;
      const stateEl = document.createElement("span");
      stateEl.className = item.danger ? "bad" : item.warn ? "warn" : item.ok ? "ok" : "warn";
      stateEl.textContent = item.status;
      const value = document.createElement("span");
      value.textContent = item.value;
      row.append(icon, label, stateEl, value);
      root.appendChild(row);
      if (item.battery) {
        const bar = document.createElement("div");
        bar.className = "battery-meter";
        const fill = document.createElement("span");
        fill.style.width = `${item.battery}%`;
        bar.appendChild(fill);
        root.appendChild(bar);
      }
      if (item.wave) {
        const wave = document.createElement("span");
        wave.className = "audio-wave";
        value.appendChild(wave);
      }
    });
  });
}

function contractAvailable(contracts, label) {
  const found = contracts.find((item) => item.label === label);
  return Boolean(found?.available);
}

function renderSceneAssets() {
  renderObjectTable();
}

function latestNavigationGoal() {
  const nodes = state.plan?.nodes || [];
  for (let i = nodes.length - 1; i >= 0; i -= 1) {
    const call = nodes[i].call;
    if (!call) continue;
    const contract = String(call.contractId || "");
    const name = String(call.name || "");
    if (!contract.includes("navigation/navigate") && !name.includes("navigate")) continue;
    const goal = call.args?.goal;
    const pose = goal?.pose;
    const position = pose?.position;
    const orientation = pose?.orientation;
    if (!position) continue;
    const yaw = yawFromQuaternion(orientation);
    return {
      x: Number(position.x),
      y: Number(position.y),
      yaw: Number.isFinite(yaw) ? yaw : 0,
    };
  }
  return null;
}

function yawFromQuaternion(q) {
  if (!q) return 0;
  const z = Number(q.z || 0);
  const w = Number(q.w || 1);
  return 2 * Math.atan2(z, w);
}

function formatMeters(value) {
  const n = Number(value);
  return Number.isFinite(n) ? `${n.toFixed(2)} m` : "-";
}

function formatRadians(value) {
  const n = Number(value);
  return Number.isFinite(n) ? `${n.toFixed(2)} rad` : "-";
}

function renderObjectTable() {
  document.querySelectorAll("[data-object-table]").forEach((root) => {
    clear(root);
  });
}

function latestImageAttachment() {
  if (state.attachments.length) return state.attachments[state.attachments.length - 1];
  for (let index = state.messages.length - 1; index >= 0; index -= 1) {
    const attachments = state.messages[index].attachments || [];
    const image = attachments.find((item) => String(item.mediaType || "").startsWith("image/"));
    if (image) return image;
  }
  return null;
}

/// Make `base` unique among the other conversations by appending a counter,
/// so a sidebar of identically-named chats stays tellable apart. Only the
/// conversation being written is renamed; existing titles are left alone.
///
/// An existing " (n)" is stripped before counting, so deriving a name from an
/// already-numbered one yields "123 (3)" rather than compounding it into
/// "123 (2) (2)".
function uniqueConversationTitle(base, selfId) {
  const stem = String(base).replace(/\s*\(\d+\)$/, "").trim() || t("Untitled chat");
  const taken = new Set(
    state.history.filter((item) => item.id !== selfId).map((item) => item.title)
  );
  if (!taken.has(stem)) return stem;
  for (let suffix = 2; ; suffix += 1) {
    const candidate = `${stem} (${suffix})`;
    if (!taken.has(candidate)) return candidate;
  }
}

function persistCurrentConversation(titleHint = "", force = false) {
  const hasContent = state.sessionTitle || state.messages.length || state.timeline.length || state.plan || state.planRecords.length || state.batches.length || Object.keys(state.nodeStates || {}).length;
  if (!hasContent && !force) return;
  const existingIndex = state.history.findIndex((item) => item.id === state.sessionId);
  const existing = existingIndex >= 0 ? state.history[existingIndex] : null;
  const baseTitle = state.sessionTitle || existing?.title || titleHint || firstUserMessage() || t("Untitled chat");
  const title = uniqueConversationTitle(baseTitle, state.sessionId);
  state.sessionTitle = title;
  const conversation = {
    id: state.sessionId,
    title,
    updatedAt: Date.now(),
    messages: state.messages.map((item) => ({ ...item })),
    timeline: state.timeline.map((item) => ({ ...item })),
    plan: state.plan,
    planRecords: state.planRecords,
    batches: state.batches,
    nodeStates: state.nodeStates,
  };
  // Update in place. Hoisting the current conversation to the front on every
  // save re-sorted the sidebar just from visiting a chat, so rows moved out
  // from under the pointer mid-click. New conversations still go on top.
  if (existingIndex >= 0) state.history[existingIndex] = conversation;
  else state.history = [conversation, ...state.history].slice(0, 30);
  saveConversations();
  renderHistory();
}

function renderHistory() {
  const root = $("historyList");
  if (!root) return;
  clear(root);
  if (!state.history.length) {
    const empty = document.createElement("div");
    empty.className = "history-empty";
    empty.textContent = t("No saved conversations yet.");
    root.appendChild(empty);
    return;
  }
  state.history.forEach((item) => {
    const row = document.createElement("div");
    row.className = `history-item${item.id === state.sessionId ? " active" : ""}`;
    const open = document.createElement("button");
    open.type = "button";
    open.className = "history-open";
    open.title = item.title;
    const title = document.createElement("strong");
    title.textContent = item.title || t("Untitled chat");
    const meta = document.createElement("span");
    meta.textContent = formatConversationTime(item.updatedAt);
    open.append(title, meta);
    open.addEventListener("click", () => openConversation(item.id));
    const rename = document.createElement("button");
    rename.type = "button";
    rename.className = "history-rename";
    rename.title = t("Rename conversation");
    rename.setAttribute("aria-label", t("Rename {name}", { name: item.title || t("conversation") }));
    rename.textContent = t("Rename");
    rename.addEventListener("click", (event) => {
      event.stopPropagation();
      renameConversation(item.id);
    });
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "history-delete";
    remove.title = t("Delete conversation");
    remove.setAttribute("aria-label", t("Delete {name}", { name: item.title || t("conversation") }));
    remove.textContent = t("Delete");
    remove.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteConversation(item.id);
    });
    row.append(open, rename, remove);
    root.appendChild(row);
  });
}

function renameConversation(sessionId) {
  // window.prompt blocks the event loop, which would stall a live event
  // stream, so renaming waits. Say so rather than ignoring the click.
  if (state.busy) {
    addStatusLine(t("Renaming is unavailable while a task is running."));
    return;
  }
  if (sessionId === state.sessionId) persistCurrentConversation("", true);
  const conversation = state.history.find((item) => item.id === sessionId);
  const currentTitle = conversation?.title || state.sessionTitle || firstUserMessage() || t("Untitled chat");
  const nextTitle = window.prompt(t("Rename session"), currentTitle);
  if (nextTitle === null) return;
  const trimmed = nextTitle.trim();
  if (!trimmed) return;
  const title = uniqueConversationTitle(trimmed, sessionId);
  if (sessionId === state.sessionId) {
    state.sessionTitle = title;
    $("promptTitle").textContent = title;
    renderSessionChip();
  }
  if (conversation) {
    // Renaming must not reorder the list either -- see persistCurrentConversation.
    conversation.title = title;
    conversation.updatedAt = Date.now();
  } else if (sessionId === state.sessionId) {
    persistCurrentConversation(title, true);
  }
  saveConversations();
  renderHistory();
}

function deleteConversation(sessionId) {
  state.history = state.history.filter((item) => item.id !== sessionId);
  saveConversations();
  if (sessionId === state.sessionId) {
    state.sessionId = getSessionId();
    rememberLastSession(state.sessionId);
    forgetActiveTurn();
    state.sessionTitle = "";
    state.messages = [];
    state.timeline = [];
    state.plan = null;
    state.planRecords = [];
    state.batches = [];
    state.nodeStates = {};
    state.activeAgentId = null;
    $("promptTitle").textContent = t("What should Robonix do?");
    renderSessionChip();
    renderMessages();
    renderTimeline();
    renderPlan();
    renderSceneAssets();
  }
  renderHistory();
}

function clearHistory() {
  state.history = [];
  saveConversations();
  state.sessionId = getSessionId();
  rememberLastSession(state.sessionId);
  forgetActiveTurn();
  state.sessionTitle = "";
  state.messages = [];
  state.timeline = [];
  state.plan = null;
  state.planRecords = [];
  state.batches = [];
  state.nodeStates = {};
  state.activeAgentId = null;
  $("promptTitle").textContent = t("What should Robonix do?");
  renderMessages();
  renderTimeline();
  renderPlan();
  renderSceneAssets();
  renderHistory();
}

function openConversation(sessionId) {
  if (sessionId === state.sessionId) return;
  // A running turn streams its events into whatever conversation is on
  // screen, so switching mid-flight would file another session's replies
  // here. Refuse, but say why -- returning silently reads as a dead list.
  if (state.busy) {
    addStatusLine(t("A task is still running in this session. Abort it before switching conversations."));
    return;
  }
  persistCurrentConversation();
  const conversation = state.history.find((item) => item.id === sessionId);
  if (!conversation) return;
  state.sessionId = conversation.id;
  rememberLastSession(conversation.id);
  state.sessionTitle = conversation.title || "";
  forgetActiveTurn();
  state.messages = (conversation.messages || []).map((item) => ({ ...item }));
  state.timeline = (conversation.timeline || []).map((item) => ({ ...item }));
  state.plan = conversation.plan || null;
  state.planRecords = conversation.planRecords || [];
  state.batches = conversation.batches || [];
  state.nodeStates = conversation.nodeStates || {};
  state.activeAgentId = null;
  $("promptTitle").textContent = conversation.title || t("What should Robonix do?");
  renderSessionChip();
  $("taskInput").value = "";
  autoGrowInput();
  renderMessages();
  renderTimeline();
  renderPlan();
  renderSceneAssets();
  renderHistory();
}

function firstUserMessage() {
  const user = state.messages.find((item) => item.role === "user" && item.text);
  return user ? user.text : "";
}

function formatConversationTime(ms) {
  if (!ms) return "";
  const date = new Date(ms);
  return date.toLocaleString([], { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
}

function routeOption(select, value, label) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = label;
  select.appendChild(option);
}

function renderAudioRouteProviders(route) {
  const mic = maybe("micNodeId");
  const speaker = maybe("speakerNodeId");
  if (!mic || !speaker) return;
  const savedMic = state.settings.micNodeId || "";
  const savedSpeaker = state.settings.speakerNodeId || "";
  clear(mic);
  clear(speaker);
  routeOption(mic, "", t("Select input primitive"));
  routeOption(speaker, "", t("Select output primitive"));
  (route.micProviders || []).forEach((provider) => {
    routeOption(mic, provider.id, provider.namespace ? `${provider.id} (${provider.namespace})` : provider.id);
  });
  (route.speakerProviders || []).forEach((provider) => {
    routeOption(speaker, provider.id, provider.namespace ? `${provider.id} (${provider.namespace})` : provider.id);
  });
  const micAvailable = (route.micProviders || []).some((provider) => provider.id === savedMic);
  const speakerAvailable = (route.speakerProviders || []).some((provider) => provider.id === savedSpeaker);
  if (savedMic && !micAvailable) routeOption(mic, savedMic, t("{name} (unavailable)", { name: savedMic }));
  if (savedSpeaker && !speakerAvailable) routeOption(speaker, savedSpeaker, t("{name} (unavailable)", { name: savedSpeaker }));
  mic.value = savedMic || "";
  speaker.value = savedSpeaker || "";
}

function renderAudioRouteDevices(side, result) {
  const select = maybe(side === "mic" ? "micDeviceId" : "speakerDeviceId");
  if (!select) return;
  const saved = side === "mic" ? state.settings.micDeviceId || "" : state.settings.speakerDeviceId || "";
  const current = side === "mic" ? result.currentInputId : result.currentOutputId;
  const wantedKind = side === "mic" ? "input" : "output";
  clear(select);
  routeOption(select, "", t("OS default"));
  (result.devices || [])
    .filter((device) => device.kind === wantedKind || device.kind === "duplex")
    .forEach((device) => {
      const suffix = [device.channels ? t("{channels} ch", { channels: device.channels }) : "", device.note || ""].filter(Boolean).join(", ");
      routeOption(select, device.id, suffix ? `${device.name} (${suffix})` : device.name || device.id);
    });
  const devices = result.devices || [];
  const target = devices.some((device) => device.id === saved) ? saved : (current || "");
  select.value = target;
  renderBridgeDeviceReadout(side, result, target);
}

function renderBridgeDeviceReadout(side, result, selectedId) {
  const provider = maybe(side === "mic" ? "micNodeId" : "speakerNodeId")?.value || "";
  const target = maybe(side === "mic" ? "bridgeInputDevice" : "bridgeOutputDevice");
  if (!target) return;
  if (provider !== "audio_client_bridge") {
    target.textContent = t("Not using client bridge");
    return;
  }
  const device = (result.devices || []).find((entry) => entry.id === selectedId);
  target.textContent = device
    ? `${device.name}${device.channels ? ` (${t("{channels} ch", { channels: device.channels })})` : ""}`
    : t("OS default");
}

async function refreshAudioRoute() {
  const settings = collectSettings();
  if (!settings.atlasEndpoint) return;
  setText("audioRouteStatus", t("Discovering audio primitives from Atlas..."));
  const route = await fetch("/api/audio-route/providers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ settings }),
  }).then((response) => response.json()).catch((error) => ({ error: String(error) }));
  if (route.error) {
    setText("audioRouteStatus", t("Audio route unavailable: {error}", { error: route.error }));
    return;
  }
  state.audio.route = { ...state.audio.route, ...route };
  renderAudioRouteProviders(route);
  await Promise.all([loadAudioRouteDevices("mic"), loadAudioRouteDevices("speaker")]);
  state.settings = collectSettings();
  saveSettings();
  setText("audioRouteStatus", t("Route loaded. Apply to select devices in their providers."));
}

async function loadAudioRouteDevices(side) {
  const provider = maybe(side === "mic" ? "micNodeId" : "speakerNodeId")?.value || "";
  const select = maybe(side === "mic" ? "micDeviceId" : "speakerDeviceId");
  if (!provider) {
    if (select) {
      clear(select);
      routeOption(select, "", t("OS default"));
    }
    return;
  }
  const isReverseBridge = (state.audio.route.bridgeProviders || [])
    .some((candidate) => candidate.id === provider);
  if (isReverseBridge) await configureReverseAudio(provider);
  const result = await fetch("/api/audio-route/devices", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ settings: collectSettings(), providerId: provider }),
  }).then((response) => response.json()).catch((error) => ({ error: String(error) }));
  if (result.error) {
    if (select) {
      clear(select);
      routeOption(select, "", t("Unavailable: {error}", { error: result.error }));
      select.disabled = true;
    }
    setText("audioRouteStatus", t("{provider}: {error}", { provider, error: result.error }));
    return;
  }
  if (select) select.disabled = false;
  if (!(result.devices || []).length) {
    if (select) {
      clear(select);
      routeOption(select, "", t("No devices reported by provider"));
      select.disabled = true;
    }
    setText("audioRouteStatus", t("{provider}: provider reported no devices", { provider }));
    return;
  }
  if (side === "mic") state.audio.route.micDevices = result.devices || [];
  else state.audio.route.speakerDevices = result.devices || [];
  renderAudioRouteDevices(side, result);
}

async function applyAudioRoute() {
  state.settings = collectSettings();
  await persistSettings().catch((error) => {
    setText("audioRouteStatus", t("Settings save failed: {error}", { error }));
  });
  setText("audioRouteStatus", t("Applying selected devices..."));
  const result = await fetch("/api/audio-route/apply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ settings: state.settings }),
  }).then((response) => response.json()).catch((error) => ({ error: String(error) }));
  if (!result.ok) {
    setText("audioRouteStatus", t("Route apply failed: {error}", { error: result.error || t("unknown error") }));
    return;
  }
  const count = Array.isArray(result.selected) ? result.selected.length : 0;
  setText("audioRouteStatus", t(count === 1 ? "Route applied to {count} selected device." : "Route applied to {count} selected devices.", { count }));
  addTimeline("audio", t("audio route applied"));
}

async function startAudioServer() {
  appendAudioLog(t("starting client audio device server"));
  const result = await fetch("/api/audio-server/start", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  }).then((r) => r.json());
  renderAudioServer(result);
  await checkAudioServer();
  startAudioServerStreams();
  loadAudioDevices();
}

async function checkAudioServer() {
  const status = await fetch("/api/audio-server/status").then((r) => r.json()).catch((error) => ({ error: String(error) }));
  renderAudioServer(status);
  if (!status.wsUrl) return;
  const target = new URL(status.wsUrl);
  const result = await fetch(`/api/audio-server/health?host=${encodeURIComponent(target.hostname)}&port=${encodeURIComponent(target.port)}`)
    .then((r) => r.json())
    .catch((error) => ({ error: String(error) }));
  renderAudioServer({ ...status, ...result, wsUrl: status.wsUrl, uiUrl: status.uiUrl, logPath: status.logPath });
  if (result.reachable || result.ok) {
    startAudioServerStreams();
    loadAudioDevices();
  }
}

function audioServerOnce(path, body = null) {
  return new Promise((resolve) => {
    const url = audioServerWsUrl(path);
    if (!url) {
      resolve({ ok: false, error: t("client audio device server is not discovered; start or check it first") });
      return;
    }
    const socket = new WebSocket(url);
    let settled = false;
    const done = (payload) => {
      if (settled) return;
      settled = true;
      try {
        socket.close();
      } catch (_) {
        // no-op
      }
      resolve(payload);
    };
    socket.onopen = () => {
      if (body !== null) socket.send(JSON.stringify(body));
    };
    socket.onmessage = (event) => {
      try {
        done(JSON.parse(event.data));
      } catch (_) {
        done({ ok: false, error: String(event.data || t("invalid bridge response")) });
      }
    };
    socket.onerror = () => done({ ok: false, error: t("cannot connect {url}", { url }) });
    socket.onclose = () => done({ ok: false, error: t("closed {url}", { url }) });
  });
}

async function loadAudioDevices() {
  const result = await audioServerOnce("/devices");
  if (!result || result.ok === false) {
    appendAudioLog(t("device refresh failed: {error}", { error: result?.error || t("unknown error") }));
    return;
  }
  state.audio.devices = Array.isArray(result.devices) ? result.devices : [];
  state.audio.inputCurrent = result.input_current ?? result.input_default ?? null;
  state.audio.outputCurrent = result.output_current ?? result.output_default ?? null;
  renderAudioDevices(result);
  appendAudioLog(t("loaded {count} audio devices", { count: state.audio.devices.length }));
}

function renderAudioDevices(result = {}) {
  const input = maybe("audioInputDevice");
  const output = maybe("audioOutputDevice");
  if (!input || !output) return;
  clear(input);
  clear(output);
  const inputCurrent = result.input_current ?? result.input_default ?? state.audio.inputCurrent;
  const outputCurrent = result.output_current ?? result.output_default ?? state.audio.outputCurrent;
  const makeOption = (device, kind) => {
    const opt = document.createElement("option");
    opt.value = String(device.id);
    const channels = kind === "input" ? device.max_input_channels : device.max_output_channels;
    opt.textContent = `#${device.id} ${device.name} (${t("{channels} ch", { channels })})`;
    return opt;
  };
  state.audio.devices
    .filter((device) => Number(device.max_input_channels || 0) > 0)
    .forEach((device) => input.appendChild(makeOption(device, "input")));
  state.audio.devices
    .filter((device) => Number(device.max_output_channels || 0) > 0)
    .forEach((device) => output.appendChild(makeOption(device, "output")));
  input.value = inputCurrent !== null && inputCurrent !== undefined ? String(inputCurrent) : "";
  output.value = outputCurrent !== null && outputCurrent !== undefined ? String(outputCurrent) : "";
}

async function applyAudioDevices() {
  const input = maybe("audioInputDevice")?.value;
  const output = maybe("audioOutputDevice")?.value;
  const body = {};
  if (input !== undefined && input !== "") body.input = Number(input);
  if (output !== undefined && output !== "") body.output = Number(output);
  appendAudioLog(t("applying devices {payload}", { payload: JSON.stringify(body) }));
  const result = await audioServerOnce("/set_device", body);
  appendAudioLog(result.ok ? t("device selection applied") : t("device selection failed: {error}", { error: result.error || t("unknown error") }));
  await loadAudioDevices();
}

function startAudioServerStreams() {
  if (!state.audio.wsUrl) return;
  startAudioVuStream();
  startAudioLogStream();
}

function startAudioVuStream() {
  if (state.audio.vuSocket && state.audio.vuSocket.readyState <= WebSocket.OPEN) return;
  const url = audioServerWsUrl("/vu");
  if (!url) return;
  const socket = new WebSocket(url);
  state.audio.vuSocket = socket;
  socket.onopen = () => {
    state.audio.vuState = "live";
    setText("audioLevelState", t("live"));
    appendAudioLog(t("VU connected"));
  };
  socket.onmessage = (event) => {
    try {
      const payload = JSON.parse(event.data);
      renderAudioLevel(
        Number(payload.input_level ?? payload.level ?? 0),
        Number(payload.output_level ?? 0),
      );
    } catch (_) {
      renderAudioLevel(0, 0);
    }
  };
  socket.onerror = () => {
    state.audio.vuState = "offline";
    setText("audioLevelState", t("offline"));
  };
  socket.onclose = () => {
    state.audio.vuState = "offline";
    setText("audioLevelState", t("offline"));
    state.audio.vuSocket = null;
  };
}

function startAudioLogStream() {
  if (state.audio.logSocket && state.audio.logSocket.readyState <= WebSocket.OPEN) return;
  const url = audioServerWsUrl("/log");
  if (!url) return;
  const socket = new WebSocket(url);
  state.audio.logSocket = socket;
  socket.onopen = () => appendAudioLog(t("log stream connected"));
  socket.onmessage = (event) => appendAudioLog(event.data);
  socket.onerror = () => appendAudioLog(t("log stream error"));
  socket.onclose = () => {
    state.audio.logSocket = null;
  };
}

function renderAudioLevel(level, outputLevel = 0) {
  const raw = Math.max(0, Math.min(1, Number.isFinite(level) ? level : 0));
  const display = Math.max(0, Math.min(1, Math.sqrt(raw) * 2.8));
  const outputRaw = Math.max(0, Math.min(1, Number.isFinite(outputLevel) ? outputLevel : 0));
  state.audio.outputLevelTarget = Math.max(0, Math.min(1, Math.pow(outputRaw, 0.4) * 1.5));
  if (state.ttsPlaying || state.audio.outputLevelTarget > 0.002 || state.audio.auraLevel > 0.002) {
    document.body.classList.add("tts-speaking");
    startTtsAuraAnimation();
  }
  state.audio.levelHistory.push(display);
  state.audio.levelHistory = state.audio.levelHistory.slice(-28);
  if (maybe("audioLevelBar")) $("audioLevelBar").style.width = `${Math.round(display * 100)}%`;
  const label = `${Math.round(display * 100)}%`;
  setText("audioLevelText", label);
  if (maybe("audioLevelText")) $("audioLevelText").title = t("raw RMS {value}", { value: raw.toFixed(4) });
  renderAudioBars();
}

function startTtsAuraAnimation() {
  if (state.audio.auraFrame) return;
  state.audio.auraFrame = requestAnimationFrame(updateTtsAuraFrame);
}

function updateTtsAuraFrame() {
  state.audio.auraFrame = 0;
  const outputActive = state.audio.outputLevelTarget > 0.002;
  const target = outputActive
    ? state.audio.outputLevelTarget
    : (state.ttsPlaying ? 0.10 : 0);
  const response = target > state.audio.auraLevel ? 0.32 : 0.14;
  state.audio.auraLevel += (target - state.audio.auraLevel) * response;
  if (Math.abs(target - state.audio.auraLevel) < 0.002) {
    state.audio.auraLevel = target;
  }
  const opacity = state.audio.auraLevel > 0
    ? Math.min(1, 0.34 + state.audio.auraLevel * 0.66)
    : 0;
  document.documentElement.style.setProperty("--voice-level", state.audio.auraLevel.toFixed(4));
  document.documentElement.style.setProperty("--voice-opacity", opacity.toFixed(4));
  if (state.ttsPlaying || outputActive || state.audio.auraLevel > 0.002) {
    state.audio.auraFrame = requestAnimationFrame(updateTtsAuraFrame);
  } else {
    document.body.classList.remove("tts-speaking");
  }
}

function setTtsAura(active) {
  state.ttsPlaying = Boolean(active);
  if (state.ttsPlaying || state.audio.outputLevelTarget > 0.002) {
    document.body.classList.add("tts-speaking");
  }
  startTtsAuraAnimation();
  syncVoiceControls();
}

function renderAudioBars() {
  const root = maybe("audioBars");
  if (!root) return;
  clear(root);
  state.audio.levelHistory.forEach((level) => {
    const bar = document.createElement("span");
    bar.style.height = `${Math.max(8, Math.round(level * 100))}%`;
    root.appendChild(bar);
  });
}

function appendAudioLog(line) {
  const root = maybe("audioLog");
  if (!root) return;
  const text = normalizeAudioLogLine(line);
  if (!text) return;
  const stamp = new Date().toLocaleTimeString();
  const lines = state.audio.logLines || [];
  const last = lines[lines.length - 1];
  if (last && last.text === text) {
    last.count = (last.count || 1) + 1;
    last.stamp = stamp;
  } else {
    lines.push({ stamp, text, count: 1 });
  }
  state.audio.logLines = lines.slice(-AUDIO_LOG_MAX_LINES);
  root.textContent = `${state.audio.logLines.map((item) => {
    const suffix = item.count > 1 ? ` x${item.count}` : "";
    return `[${item.stamp}] ${item.text}${suffix}`;
  }).join("\n")}\n`;
  root.scrollTop = root.scrollHeight;
  setText("audioLogSummary", t("Audio device log."));
}

function normalizeAudioLogLine(line) {
  const text = String(line ?? "")
    .replace(/\r/g, "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .join(" ");
  if (!text) return "";
  if (/^connection open$/i.test(text)) return "";
  if (/^[<>]\s+(TEXT|BINARY|PING|PONG|CLOSE)\b/.test(text)) return "";
  if (/^[=%]\s+/.test(text) && /(connection|keepalive|opcode|frame|close|open)/i.test(text)) return "";
  if (/websockets\.(client|server|protocol|connection)/i.test(text)) return "";
  if (/opening handshake failed/i.test(text)) return "";
  if (/(^|\s)[<>]\s+TEXT\b/.test(text)) return "";
  if (text.length <= AUDIO_LOG_MAX_CHARS) return text;
  return `${text.slice(0, AUDIO_LOG_MAX_CHARS)} ... [${text.length} chars]`;
}

async function enrollVoice() {
  const userId = $("enrollUserId").value.trim() || $("userId").value.trim();
  const userName = $("enrollUserName").value.trim() || userId;
  const seconds = Number($("recordSeconds").value || 6);
  if (!userId) {
    renderEnroll({ ok: false, error: t("Voice ID is required") });
    return;
  }
  $("enrollState").textContent = t("recording {seconds}s", { seconds });
  $("enrollVoice").classList.add("busy");
  addTimeline("voiceprint", t("recording {seconds}s for {userId}", { seconds, userId }));
  const result = await fetch("/api/voiceprint/enroll", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      settings: collectSettings(),
      userId,
      userName,
      seconds,
    }),
  }).then((r) => r.json()).catch((error) => ({ ok: false, error: String(error) }));
  $("enrollVoice").classList.remove("busy");
  renderEnroll(result);
}

async function testSpeaker() {
  $("testSpeaker").classList.add("busy");
  addTimeline("audio", t("speaker test requested"));
  const result = await fetch("/api/audio/play-test", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      settings: collectSettings(),
      text: "Robonix speaker test. 如果你听到这句话，语音播放链路正常。",
    }),
  }).then((r) => r.json()).catch((error) => ({ ok: false, error: String(error) }));
  $("testSpeaker").classList.remove("busy");
  const text = result.ok
    ? t("speaker ok: played {bytes} bytes via {endpoint}", { bytes: result.bytes, endpoint: result.speakerEndpoint })
    : t("speaker failed: {error}", { error: result.error });
  const status = $("audioTestStatus");
  status.textContent = text;
  status.classList.toggle("is-error", !result.ok);
  status.classList.toggle("is-success", Boolean(result.ok));
  addMessage(result.ok ? "status" : "error", text);
  addTimeline(result.ok ? "audio" : "error", text);
  renderAudioServer({
    ok: result.ok,
    error: result.error || "",
    url: result.ok ? t("tts {tts} / speaker {speaker}", { tts: result.ttsEndpoint, speaker: result.speakerEndpoint }) : "",
  });
}

async function testMicrophone() {
  const button = $("testMicrophone");
  button.classList.add("busy");
  addTimeline("audio", t("microphone test requested"));
  const result = await fetch("/api/audio/mic-test", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ settings: collectSettings(), seconds: 1.0 }),
  }).then((r) => r.json()).catch((error) => ({ ok: false, error: String(error) }));
  button.classList.remove("busy");
  const text = result.ok
    ? t("microphone ok: {bytes} bytes in {ms} ms, RMS {rms}", { bytes: result.bytes, ms: result.captureMs, rms: result.rms })
    : t("microphone failed: {error}", { error: result.error });
  const status = $("audioTestStatus");
  status.textContent = text;
  status.classList.toggle("is-error", !result.ok);
  status.classList.toggle("is-success", Boolean(result.ok));
  addMessage(result.ok ? "status" : "error", text);
  addTimeline(result.ok ? "audio" : "error", text);
  setText("audioRouteStatus", text);
}

function renderEnroll(result) {
  $("enrollState").textContent = result.ok ? t("enrolled") : t("failed");
  if (result.ok && result.userId) {
    applyVoiceUser(result.userId);
  }
  const text = result.ok
    ? t(`${result.alreadyEnrolled ? "using existing" : "enrolled"} voice:{userId} ({bytes} bytes)`, { userId: result.userId, bytes: result.bytes })
    : t("enroll failed: {error}", { error: result.error });
  addTimeline("voiceprint", text);
  const root = $("audioServerStatus");
  clear(root);
  const div = document.createElement("div");
  div.className = result.ok ? "ok" : "bad";
  div.textContent = text;
  root.appendChild(div);
  if (result.ok && result.message) {
    const note = document.createElement("div");
    note.className = "small";
    note.textContent = result.message;
    root.appendChild(note);
  }
}

function applyVoiceUser(rawUserId) {
  const id = normalizeVoiceId(rawUserId);
  if (!id) return;
  $("userId").value = `voice:${id}`;
  state.settings.userId = `voice:${id}`;
  saveSettings();
  // Enrolment changes the operator outside of the settings form, so refresh the
  // header badge here or it keeps showing the previous user.
  const userEl = maybe("userDisplay");
  if (userEl) userEl.textContent = state.settings.userId;
}

function normalizeVoiceId(rawUserId) {
  const value = String(rawUserId || "").trim();
  if (!value) return "";
  if (value.startsWith("voice:")) return value.slice("voice:".length).trim();
  if (value.startsWith("local:")) return value.slice("local:".length).trim();
  return value;
}

function renderAudioServer(result) {
  const root = maybe("audioServerStatus");
  if (!root) return;
  clear(root);
  if (result.wsUrl) state.audio.wsUrl = result.wsUrl;
  const online = Boolean(result.ok || result.reachable);
  setText("audioServerState", online ? t("online") : t("offline"));
  setText("audioServerSummary", online ? (result.url || result.wsUrl || t("Audio device server reachable.")) : (result.error || t("Client audio device server is offline.")));
  const lines = [
    online ? t("ok") : t("not reachable"),
    result.error || "",
    result.wsUrl || "",
    result.uiUrl || result.url || "",
    result.logPath || "",
  ].filter(Boolean);
  lines.forEach((line) => {
    const div = document.createElement("div");
    div.className = online ? "ok" : "warn";
    div.textContent = line;
    root.appendChild(div);
  });
  appendAudioLog(lines.join(" | "));
}

function setText(id, text) {
  const node = maybe(id);
  if (node) node.textContent = text;
}

/// Retarget a composer button's caption without discarding its icon span.
function setButtonLabel(node, text) {
  if (!node) return;
  const label = node.querySelector(".btn-label");
  if (label) label.textContent = text;
  else node.textContent = text;
}

function setBusy(value) {
  state.busy = value;
  const sendBtn = maybe("sendButton");
  if (sendBtn) {
    sendBtn.classList.toggle("busy", value);
    sendBtn.classList.toggle("steer-mode", value);
    const sendIcon = sendBtn.querySelector(".send-icon");
    const steerIcon = sendBtn.querySelector(".steer-icon");
    if (sendIcon) sendIcon.style.display = value ? "none" : "";
    if (steerIcon) steerIcon.style.display = value ? "" : "none";
    setButtonLabel(sendBtn, value ? t("Steer") : t("Send"));
    sendBtn.title = value ? t("Send to the running task (Enter)") : t("Send task (Enter)");
  }
  if (maybe("stopButton")) $("stopButton").hidden = !value;
  // Left enabled while busy on purpose: a disabled button swallows the click
  // and the "abort the running task first" guard never gets to explain
  // itself, which reads as the control being broken.
  if (maybe("newSessionAction")) $("newSessionAction").disabled = false;
  if (!value) resetStopState();
  maybe("voiceButton")?.classList.toggle("busy", value);
  document.querySelectorAll("[data-page-action='voice-start']").forEach((button) => {
    button.classList.toggle("busy", value);
    // Same button either way: it starts a recording. Whether that recording
    // opens a new task or adds to the running one is context, not a separate
    // control, so the label stays put and only the tooltip explains it.
    setButtonLabel(button, t("Start recording"));
  });
  // syncVoiceControls owns the tooltip and the hidden state for this button.
  syncVoiceControls();
}

function beginStream(socket = null) {
  if (socket) state.interactionSockets.add(socket);
  state.activeStreams += 1;
  setBusy(true);
}

function endStream(socket = null) {
  if (socket) state.interactionSockets.delete(socket);
  state.activeStreams = Math.max(0, state.activeStreams - 1);
  setBusy(state.activeStreams > 0 || state.taskRunning);
}

function setTextAll(selector, text) {
  document.querySelectorAll(selector).forEach((node) => {
    node.textContent = text;
  });
}

function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

// ─────────────────────────────────────────────────────────────────────────────
// Perception page — adaptive sensor / spatial visualisation driven by Atlas.
//
// Each tile is gated on whether the connected deployment exposes the matching
// MCP contract (camera/lidar/scene snapshots).  Tiles whose data is only
// published on ROS 2 (transport=2) are not reachable from the host-side
// client, so the availability probe simply reports them offline and the UI
// hides them instead of rendering a broken tile.
// ─────────────────────────────────────────────────────────────────────────────

const PERCEPTION_INTERVAL_MS = 1000;

const perception = {
  polling: false,
  paused: false,
  layoutMode: "split",
  focusedTile: null,
  depthColormap: true,
  lastDepthData: null,
  timers: new Set(),
  tiles: { camera: false, depth: false, scene: false },
  resources: {},
  sceneLayers: { map: true, regions: true, objects: true, lidar: true, robot: true },
  lastMap: null,
  lastLidarScan: null,
  lastScene: null,
  mapAvailable: false,
  mapImage: null,
  // Scene map viewport, in the map frame: px-per-metre plus the world point at
  // the canvas centre. ``auto`` stays true until the operator pans or zooms,
  // after which the view is theirs and nothing rescales it behind their back.
  // ``fittedKey`` records what the current fit was computed from so the view can
  // re-fit once when the occupancy grid turns up, and never again.
  sceneView: { scale: null, center: null, auto: true, fittedKey: null, follow: false },
  sceneHit: [],
  sceneHover: -1,
  scenePan: null,
};

// Tile ids the Perception page lays out, mirroring PERCEPTION_TILES in
// perception.py. Kept in one place so the layout loops and the telemetry
// badge denominator never drift apart.
const PERCEPTION_TILE_IDS = ["camera", "depth", "scene"];

// Precomputed 256-entry Turbo/Spectral palette for pseudo-color depth heatmap
const DEPTH_COLORMAP = (() => {
  const stops = [
    { p: 0.0, r: 24, g: 30, b: 90 },     // Close: deep indigo
    { p: 0.2, r: 40, g: 110, b: 230 },   // Mid-close: vibrant blue
    { p: 0.4, r: 45, g: 210, b: 200 },   // Mid: turquoise/cyan
    { p: 0.6, r: 50, g: 220, b: 100 },   // Mid-far: bright green
    { p: 0.8, r: 250, g: 200, b: 40 },   // Far: warm amber
    { p: 1.0, r: 240, g: 60, b: 60 },    // Out of range: coral red
  ];
  const table = new Uint8ClampedArray(256 * 3);
  for (let i = 0; i < 256; i++) {
    const t = i / 255;
    let s0 = stops[0], s1 = stops[stops.length - 1];
    for (let j = 0; j < stops.length - 1; j++) {
      if (t >= stops[j].p && t <= stops[j + 1].p) {
        s0 = stops[j];
        s1 = stops[j + 1];
        break;
      }
    }
    const span = s1.p - s0.p || 1;
    const ratio = Math.max(0, Math.min(1, (t - s0.p) / span));
    table[i * 3] = Math.round(s0.r + (s1.r - s0.r) * ratio);
    table[i * 3 + 1] = Math.round(s0.g + (s1.g - s0.g) * ratio);
    table[i * 3 + 2] = Math.round(s0.b + (s1.b - s0.b) * ratio);
  }
  return table;
})();

function renderDepthHeatmap(img) {
  const canvas = document.querySelector("[data-depth-canvas]");
  if (!canvas) return;
  const w = img.naturalWidth || img.width;
  const h = img.naturalHeight || img.height;
  if (!w || !h) return;

  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(img, 0, 0, w, h);
  try {
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;
    if (!perception.lastDepthData || perception.lastDepthData.width !== w || perception.lastDepthData.height !== h) {
      perception.lastDepthData = { width: w, height: h, raw: new Uint8Array(w * h) };
    }
    const raw = perception.lastDepthData.raw;
    for (let i = 0, p = 0; i < data.length; i += 4, p += 1) {
      const gray = (data[i] * 299 + data[i + 1] * 587 + data[i + 2] * 114) / 1000 | 0;
      raw[p] = gray;
      const cIdx = gray * 3;
      data[i] = DEPTH_COLORMAP[cIdx];
      data[i + 1] = DEPTH_COLORMAP[cIdx + 1];
      data[i + 2] = DEPTH_COLORMAP[cIdx + 2];
      data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
  } catch (_) {}
}

function perceptionAtlas() {
  const s = collectSettings();
  if (s.atlasEndpoint) return s.atlasEndpoint;
  const host = s.robotHost || "127.0.0.1";
  const port = s.atlasPort || DEFAULT_ATLAS_PORT;
  return `${host}:${port}`;
}

async function perceptionFetch(path) {
  const atlas = encodeURIComponent(perceptionAtlas());
  const resp = await fetch(`/api/perception/${path}?atlas=${atlas}`);
  return resp.json();
}

function perceptionTile(id) {
  return document.querySelector(`.perception-tile[data-tile="${id}"]`);
}

function perceptionMeta(id, text) {
  const meta = perceptionTile(id)?.querySelector("[data-tile-meta]");
  if (meta) meta.textContent = text;
}

function perceptionSetAvailable(id, available) {
  perception.tiles[id] = !!available;
  const tile = perceptionTile(id);
  if (tile) tile.hidden = !available;
}

function fitCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const parent = canvas.parentElement;
  let w = canvas.clientWidth;
  let h = canvas.clientHeight;

  // If canvas dimensions are not computed yet (layout not ready), use parent dimensions
  if (!w || !h) {
    if (parent) {
      w = parent.clientWidth || 480;
      h = parent.clientHeight || 480;
    } else {
      w = 480;
      h = 480;
    }
  }

  w = Math.max(1, w);
  h = Math.max(1, h);
  const pw = Math.round(w * dpr);
  const ph = Math.round(h * dpr);
  if (canvas.width !== pw || canvas.height !== ph) {
    canvas.width = pw;
    canvas.height = ph;
  }
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h };
}

function applyPerceptionLayout() {
  const grid = document.getElementById("perceptionGrid");
  if (!grid) return;

  // Sync focus buttons on tile headers
  const focusBtns = document.querySelectorAll('.perception-tile button[data-action="focus"]');
  focusBtns.forEach((b) => {
    const tile = b.closest(".perception-tile");
    const tileId = tile ? tile.dataset.tile : null;
    const isThisFocused = perception.focusedTile === tileId;
    b.classList.toggle("active", isThisFocused);
    b.setAttribute("title", isThisFocused ? t("Restore Layout") : t("Focus / Maximize"));
  });

  // Reset tile inline grid assignments
  for (const id of PERCEPTION_TILE_IDS) {
    const tile = perceptionTile(id);
    if (tile) {
      tile.style.gridColumn = "";
      tile.style.gridRow = "";
      tile.classList.toggle("is-focused", perception.focusedTile === id);
    }
  }

  grid.classList.remove("layout-focus");

  if (perception.focusedTile) {
    grid.classList.add("layout-focus");
    grid.style.gridTemplateColumns = "";
    grid.style.gridTemplateRows = "";
    return;
  }

  // On narrow screens let the CSS media query own the single-column layout;
  // inline grid templates would otherwise override it.
  if (window.matchMedia && window.matchMedia("(max-width: 720px)").matches) {
    grid.style.gridTemplateColumns = "";
    grid.style.gridTemplateRows = "";
    return;
  }

  // Default: layout-split (Large scene on left, stacked sensors on right)
  grid.classList.add("layout-split");
  const sensors = ["camera", "depth"].filter((id) => perception.tiles[id]);
  if (perception.tiles.scene) {
    grid.style.gridTemplateColumns = "minmax(0, 3.2fr) minmax(0, 2fr)";
    grid.style.gridTemplateRows = `repeat(${Math.max(1, sensors.length)}, minmax(0, 1fr))`;
    const scene = perceptionTile("scene");
    if (scene) {
      scene.style.gridColumn = "1";
      scene.style.gridRow = "1 / -1";
    }
    sensors.forEach((id, i) => {
      const tile = perceptionTile(id);
      if (tile) {
        tile.style.gridColumn = "2";
        tile.style.gridRow = `${i + 1}`;
      }
    });
  } else {
    const cols = Math.max(1, sensors.length);
    grid.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
    grid.style.gridTemplateRows = "minmax(0, 1fr)";
    sensors.forEach((id, i) => {
      const tile = perceptionTile(id);
      if (tile) {
        tile.style.gridColumn = `${i + 1}`;
        tile.style.gridRow = "1";
      }
    });
  }
}

async function perceptionPollImage(id, endpoint) {
  const img = document.querySelector(`[data-${id}-img]`);
  const placeholder = document.querySelector(`[data-tile-placeholder="${id}"]`);
  if (!img) return;
  const started = performance.now();
  try {
    const data = await perceptionFetch(endpoint);
    if (!data.ok || !data.image || !data.image.data) {
      perceptionMeta(id, data.error || t("No image data"));
      img.classList.remove("loaded");
      if (placeholder) {
        placeholder.classList.remove("has-feed");
        placeholder.hidden = false;
      }
      return;
    }
    const src = `data:image/${data.image.encoding || "jpeg"};base64,${data.image.data}`;
    if (img.getAttribute("src") !== src) img.setAttribute("src", src);
    img.classList.add("loaded");
    if (placeholder) {
      placeholder.classList.add("has-feed");
      placeholder.hidden = true;
    }
    const ms = Math.round(performance.now() - started);
    perceptionMeta(id, `${data.image.width}×${data.image.height} · ${ms}ms`);

    if (id === "depth") {
      const canvas = document.querySelector("[data-depth-canvas]");
      if (perception.depthColormap) {
        if (canvas) canvas.style.display = "block";
        img.style.display = "none";
        const doRender = () => {
          if (perception.depthColormap) renderDepthHeatmap(img);
        };
        if (img.complete && img.naturalWidth > 0) {
          doRender();
        } else {
          img.onload = doRender;
        }
      } else {
        if (canvas) canvas.style.display = "none";
        img.style.display = "block";
      }
    }
  } catch (_) {
    perceptionMeta(id, t("Offline"));
    img.classList.remove("loaded");
    if (placeholder) {
      placeholder.classList.remove("has-feed");
      placeholder.hidden = false;
    }
  }
}

function scenePoint(x, y) {
  const nx = Number(x);
  const ny = Number(y);
  if (!Number.isFinite(nx) || !Number.isFinite(ny)) return null;
  return { x: nx, y: ny };
}

function regionPolygons(regions) {
  // ``points_xy`` is a flat [x0, y0, x1, y1, ...] vertex list.
  const list = (regions && regions.regions) || [];
  const out = [];
  for (const r of list) {
    const pts = r.points_xy || [];
    if (!Array.isArray(pts) || pts.length < 6) continue;
    const poly = [];
    let ok = true;
    for (let i = 0; i + 1 < pts.length; i += 2) {
      const p = scenePoint(pts[i], pts[i + 1]);
      if (!p) { ok = false; break; }
      poly.push(p);
    }
    if (ok && poly.length >= 3) {
      out.push({ name: r.name || r.id || "room", kind: r.kind || "room", poly });
    }
  }
  return out;
}

function regionColor(index) {
  const palette = [
    { fill: "rgba(91,141,239,0.10)", stroke: "#5b8def" },
    { fill: "rgba(53,224,160,0.10)", stroke: "#35e0a0" },
    { fill: "rgba(197,139,242,0.10)", stroke: "#c58bf2" },
    { fill: "rgba(90,209,230,0.10)", stroke: "#5ad1e6" },
    { fill: "rgba(242,114,111,0.10)", stroke: "#f2726f" },
  ];
  return palette[index % palette.length];
}

function mapImageFor(occupancy) {
  // Decode the occupancy PNG once and reuse it across polls.
  // Double-buffer: keep serving the currently-decoded image while a new payload
  // decodes in the background, so drawScene never flashes a blank frame without a map.
  const src = occupancy && occupancy.png_b64 ? occupancy.png_b64 : "";
  if (!src) return null;

  if (!perception.mapImage) {
    const img = new Image();
    img.onload = () => {
      perception.mapImage = { src, img };
      redrawScene();
    };
    img.src = `data:image/png;base64,${src}`;
    return null;
  }

  if (perception.mapImage.src !== src && perception.mapPendingSrc !== src) {
    perception.mapPendingSrc = src;
    const nextImg = new Image();
    nextImg.onload = () => {
      perception.mapImage = { src, img: nextImg };
      perception.mapPendingSrc = null;
      redrawScene();
    };
    nextImg.src = `data:image/png;base64,${src}`;
  }

  const cached = perception.mapImage;
  return cached && cached.img && cached.img.complete && cached.img.naturalWidth ? cached.img : null;
}

function boundsFrom(minX, minY, maxX, maxY) {
  return {
    cx: (minX + maxX) / 2,
    cy: (minY + maxY) / 2,
    spanX: Math.max(0.6, maxX - minX),
    spanY: Math.max(0.6, maxY - minY),
  };
}

function sceneBounds(points) {
  if (!points.length) return null;
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  return boundsFrom(Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys));
}

// Extent of the occupancy grid in the map frame, or null when it is unusable.
function sceneMapRect(baseMap) {
  if (!baseMap) return null;
  const mx = Number(baseMap.origin_x);
  const my = Number(baseMap.origin_y);
  const mw = Number(baseMap.width) * Number(baseMap.resolution);
  const mh = Number(baseMap.height) * Number(baseMap.resolution);
  if (![mx, my, mw, mh].every(Number.isFinite) || mw <= 0 || mh <= 0) return null;
  return { ...boundsFrom(mx, my, mx + mw, my + mh), minX: mx, minY: my, maxX: mx + mw, maxY: my + mh };
}

function sceneFitTo(view, w, h, bounds) {
  view.scale = Math.min((w - 56) / bounds.spanX, (h - 56) / bounds.spanY);
  view.center = { x: bounds.cx, y: bounds.cy };
}

function drawScaleBar(ctx, w, h, scale) {
  // Longest round number of metres that still fits in ~15% of the width.
  const target = (w * 0.15) / scale;
  const decade = Math.pow(10, Math.floor(Math.log10(target)));
  const metres = [1, 2, 5, 10].map((m) => m * decade).find((v) => v >= target) || decade * 10;
  const px = metres * scale;
  const x0 = 12;
  const y0 = h - 12;
  ctx.strokeStyle = "rgba(223,230,245,0.7)";
  ctx.fillStyle = "rgba(223,230,245,0.7)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x0, y0 - 4);
  ctx.lineTo(x0, y0 + 4);
  ctx.moveTo(x0, y0);
  ctx.lineTo(x0 + px, y0);
  ctx.moveTo(x0 + px, y0 - 4);
  ctx.lineTo(x0 + px, y0 + 4);
  ctx.stroke();
  ctx.font = "11px system-ui";
  ctx.textAlign = "left";
  ctx.fillText(`${metres} m`, x0, y0 - 8);
}

// Object labels, largest box first, skipping any that would land on a label
// already placed. A dense scene then reads as a map instead of a wall of text;
// whatever gets skipped is still reachable by hovering it (which always wins).
function drawObjectLabels(ctx, candidates) {
  ctx.font = "11px system-ui";
  ctx.textAlign = "center";
  const placed = [];
  const visible = new Array(candidates.length).fill(false);
  const order = candidates.map((_c, i) => i).sort((a, b) => {
    const ca = candidates[a];
    const cb = candidates[b];
    if (ca.force !== cb.force) return ca.force ? -1 : 1;
    return cb.area - ca.area;
  });
  // Zooming out makes every box small; without a cap a crowded floor plan still
  // ends up wall-to-wall text. The biggest few carry the scene at that zoom.
  let budget = 12;
  for (const i of order) {
    const c = candidates[i];
    if (!c.force) {
      if (c.minExtent < 26) continue;
      if (budget <= 0) continue;
    }
    const half = ctx.measureText(c.text).width / 2 + 2;
    const box = { x0: c.x - half, x1: c.x + half, y0: c.y - 10, y1: c.y + 3 };
    if (!c.force && placed.some((p) => box.x0 < p.x1 && box.x1 > p.x0 && box.y0 < p.y1 && box.y1 > p.y0)) {
      continue;
    }
    placed.push(box);
    visible[i] = true;
    if (!c.force) budget -= 1;
  }
  candidates.forEach((c, i) => {
    if (!visible[i]) return;
    ctx.fillStyle = c.force ? "#ffffff" : "#dfe6f5";
    ctx.fillText(c.text, c.x, c.y);
  });
}

function redrawScene() {
  const canvas = document.querySelector("[data-scene-canvas]");
  if (canvas) {
    if (perception.lastScene) drawScene(canvas, perception.lastScene);
    else drawSceneStandby(canvas);
  }
}

function drawSceneStandby(canvas) {
  const { ctx, w, h } = fitCanvas(canvas);
  const cx = w / 2;
  const cy = h / 2;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#0b1618";
  ctx.fillRect(0, 0, w, h);

  // Subtle coordinate grid
  const gridSize = 40;
  ctx.strokeStyle = "rgba(95, 205, 216, 0.05)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  const startX = cx % gridSize;
  for (let x = startX; x < w; x += gridSize) {
    ctx.moveTo(x, 0); ctx.lineTo(x, h);
  }
  const startY = cy % gridSize;
  for (let y = startY; y < h; y += gridSize) {
    ctx.moveTo(0, y); ctx.lineTo(w, y);
  }
  ctx.stroke();

  // Origin coordinate axes (+X red/orange, +Y cyan)
  const axisLen = 32;
  ctx.strokeStyle = "rgba(240, 103, 88, 0.85)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy); ctx.lineTo(cx + axisLen, cy);
  ctx.stroke();
  ctx.fillStyle = "rgba(240, 103, 88, 0.85)";
  ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("+X", cx + axisLen + 4, cy);

  ctx.strokeStyle = "rgba(95, 205, 216, 0.85)";
  ctx.beginPath();
  ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - axisLen);
  ctx.stroke();
  ctx.fillStyle = "rgba(95, 205, 216, 0.85)";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText("+Y", cx, cy - axisLen - 3);

  // Origin point
  ctx.fillStyle = "#eef4f3";
  ctx.beginPath();
  ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
  ctx.fill();

  // Watermark text
  ctx.fillStyle = "rgba(154, 169, 173, 0.4)";
  ctx.font = "12px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(t("Spatial context inactive"), cx, cy + 34);
}

function drawScene(canvas, scene) {
  const { ctx, w, h } = fitCanvas(canvas);
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#0b1618";
  ctx.fillRect(0, 0, w, h);

  const objects = (scene.objects && scene.objects.objects) || [];
  const robot = scene.robot || {};
  const polys = regionPolygons(scene.regions);
  const layers = perception.sceneLayers || {};
  const baseMap = layers.map !== false ? perception.lastMap : null;
  const mapRect = sceneMapRect(baseMap);

  const pts = [];
  for (const o of objects) {
    const p = scenePoint(o.x, o.y);
    if (p) pts.push(p);
  }
  const rp = scenePoint(robot.x, robot.y);
  if (rp) pts.push(rp);
  for (const poly of polys) pts.push(...poly.poly);

  const view = perception.sceneView;
  perception.sceneHit = [];
  // Fit target: the occupancy grid when there is one, because unlike the object
  // cloud its extent never moves. Deployments without a map service fall back to
  // the bounds of whatever data they do have.
  const fitKey = mapRect ? "map" : "data";
  const fitBase = mapRect || sceneBounds(pts);
  if (!fitBase) {
    ctx.fillStyle = "rgba(154, 169, 173, 0.4)";
    ctx.font = "12px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(t("Spatial context inactive"), w / 2, h / 2);
    return;
  }

  // Fit once, and once more only if the grid turns up after the first scene poll
  // (it is a better basis than the object cloud). The fit never downgrades, so
  // unchecking the map layer cannot rescale the view -- and from then on the
  // basis is fixed, so a new object or a driving robot cannot either.
  const needsFit = view.fittedKey === null || (fitKey === "map" && view.fittedKey !== "map");
  if (view.auto && needsFit) {
    sceneFitTo(view, w, h, fitBase);
    view.fittedKey = fitKey;
  }
  if (view.scale == null || view.center == null) sceneFitTo(view, w, h, fitBase);
  if (view.follow && rp) view.center = { x: rp.x, y: rp.y };

  const scale = view.scale;
  const center = view.center;
  const toX = (x) => w / 2 + (x - center.x) * scale;
  const toY = (y) => h / 2 - (y - center.y) * scale;

  // Base map: draw the occupancy PNG under every overlay, aligned to the same
  // "map" frame via origin/resolution. The image's row 0 is the highest y, so
  // its canvas top edge is toY(origin_y + height * resolution).
  if (baseMap && mapRect) {
    const img = mapImageFor(baseMap);
    if (img) {
      ctx.drawImage(
        img,
        toX(mapRect.minX),
        toY(mapRect.maxY),
        (mapRect.maxX - mapRect.minX) * scale,
        (mapRect.maxY - mapRect.minY) * scale,
      );
    }
  }

  ctx.strokeStyle = "rgba(120,140,180,0.12)";
  ctx.lineWidth = 1;
  for (let gx = 0; gx <= w; gx += 40) {
    ctx.beginPath();
    ctx.moveTo(gx, 0);
    ctx.lineTo(gx, h);
    ctx.stroke();
  }
  for (let gy = 0; gy <= h; gy += 40) {
    ctx.beginPath();
    ctx.moveTo(0, gy);
    ctx.lineTo(w, gy);
    ctx.stroke();
  }

  if (layers.regions !== false) {
    polys.forEach((r, i) => {
      const color = regionColor(i);
      ctx.beginPath();
      r.poly.forEach((p, j) => {
        const x = toX(p.x);
        const y = toY(p.y);
        if (j === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = color.fill;
      ctx.fill();
      ctx.strokeStyle = color.stroke;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      const cx = r.poly.reduce((s, p) => s + p.x, 0) / r.poly.length;
      const cy = r.poly.reduce((s, p) => s + p.y, 0) / r.poly.length;
      ctx.fillStyle = color.stroke;
      ctx.font = "11px system-ui";
      ctx.textAlign = "center";
      ctx.fillText(r.name, toX(cx), toY(cy));
    });
  }

  if (layers.objects !== false) {
    const palette = ["#5b8def", "#35e0a0", "#ffd166", "#f2726f", "#c58bf2", "#5ad1e6"];
    const labels = [];
    objects.forEach((o, i) => {
      if ((o.label || "") === "robot") return;
      const p = scenePoint(o.x, o.y);
      if (!p) return;
      const x = toX(p.x);
      const y = toY(p.y);
      const yaw = Number(o.yaw) || 0;
      const ow = Math.max(7, (Number(o.size_x) || 0.3) * scale);
      const oh = Math.max(7, (Number(o.size_y) || 0.3) * scale);
      // Screen-space extent of the rotated box, for hit-testing and for judging
      // whether a label has anywhere to go.
      const absCos = Math.abs(Math.cos(yaw));
      const absSin = Math.abs(Math.sin(yaw));
      const bw = ow * absCos + oh * absSin;
      const bh = ow * absSin + oh * absCos;
      const hitIndex = perception.sceneHit.length;
      perception.sceneHit.push({ x, y, w: bw, h: bh, label: o.label || "object" });
      const hovered = hitIndex === perception.sceneHover;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-yaw);
      ctx.fillStyle = palette[i % palette.length];
      ctx.globalAlpha = hovered ? 1 : 0.85;
      ctx.fillRect(-ow / 2, -oh / 2, ow, oh);
      ctx.globalAlpha = 1;
      ctx.strokeStyle = hovered ? "#ffffff" : "rgba(255,255,255,0.35)";
      ctx.lineWidth = hovered ? 2 : 1;
      ctx.strokeRect(-ow / 2, -oh / 2, ow, oh);
      ctx.restore();
      labels.push({
        x,
        y: y + oh / 2 + 12,
        text: o.label || "object",
        area: bw * bh,
        minExtent: Math.min(bw, bh),
        force: hovered,
      });
    });
    drawObjectLabels(ctx, labels);
  }
  if (perception.sceneHover >= perception.sceneHit.length) perception.sceneHover = -1;

  // Project real-time LiDAR hits onto Scene Map
  if (layers.lidar !== false && perception.lastLidarScan && rp) {
    const scan = perception.lastLidarScan;
    const ranges = scan.ranges || [];
    const angleMin = Number(scan.angle_min) || -Math.PI / 2;
    const angleInc = Number(scan.angle_increment) || 0.01;
    const rMin = Number(scan.range_min) || 0.01;
    const rMax = Number(scan.range_max) || 6.0;
    const robotYaw = Number(robot.yaw) || 0;

    const hitPoints = [];
    for (let i = 0; i < ranges.length; i += 1) {
      const r = Number(ranges[i]);
      if (!Number.isFinite(r) || r < rMin || r > rMax) continue;
      const angle = robotYaw + angleMin + i * angleInc;
      const wx = rp.x + r * Math.cos(angle);
      const wy = rp.y + r * Math.sin(angle);
      hitPoints.push({ x: toX(wx), y: toY(wy), r });
    }

    if (hitPoints.length > 0) {
      ctx.strokeStyle = "rgba(53, 224, 160, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      let connected = false;
      for (let i = 0; i < hitPoints.length; i += 1) {
        const hp = hitPoints[i];
        const prev = i > 0 ? hitPoints[i - 1] : null;
        if (prev && Math.hypot(hp.x - prev.x, hp.y - prev.y) < 25) {
          if (!connected) {
            ctx.moveTo(prev.x, prev.y);
            connected = true;
          }
          ctx.lineTo(hp.x, hp.y);
        } else {
          connected = false;
        }
      }
      ctx.stroke();

      for (const hp of hitPoints) {
        ctx.fillStyle = hp.r < 0.6 ? "#f2726f" : (hp.r < 1.2 ? "#ffd166" : "#35e0a0");
        ctx.beginPath();
        ctx.arc(hp.x, hp.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  if (layers.robot !== false && rp) {
    const x = toX(rp.x);
    const y = toY(rp.y);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-(Number(robot.yaw) || 0));
    ctx.fillStyle = "#ffd166";
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(-6, -6);
    ctx.lineTo(-6, 6);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    ctx.fillStyle = "#ffd166";
    ctx.font = "11px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("robot", x, y + 18);
  }

  // Update HUD compass needle if available
  const compassNeedle = document.getElementById("sceneCompassNeedle");
  if (compassNeedle && robot && robot.yaw != null) {
    const deg = Math.round(((Number(robot.yaw) || 0) * 180) / Math.PI);
    compassNeedle.style.transform = `rotate(${-deg}deg)`;
  }

  // Zoom makes the scale a live variable, so state it rather than leaving the
  // operator to infer distances from the grid.
  drawScaleBar(ctx, w, h, scale);
}

async function perceptionPollScene() {
  const canvas = document.querySelector("[data-scene-canvas]");
  if (!canvas) return;
  let data;
  try {
    data = await perceptionFetch("scene");
  } catch (_) {
    perceptionMeta("scene", t("Offline"));
    perception.lastScene = null;
    drawSceneStandby(canvas);
    return;
  }
  if (!data.ok || !data.scene) {
    perceptionMeta("scene", data.error || t("Map data unavailable"));
    perception.lastScene = null;
    drawSceneStandby(canvas);
    return;
  }
  perception.lastScene = data.scene;

  // The base map is fetched if available. Never wipe lastMap on transient poll failures!
  if (perception.mapAvailable && perception.sceneLayers.map !== false) {
    try {
      const mapData = await perceptionFetch("map");
      if (mapData && mapData.ok && mapData.occupancy) {
        perception.lastMap = mapData.occupancy;
      }
    } catch (_) {
      // Retain last known valid map to prevent flashing/flickering
    }
  }

  // Fetch lidar scan for the 2D scene map laser overlay if layer is active
  if (perception.sceneLayers.lidar !== false) {
    try {
      const lidarData = await perceptionFetch("lidar");
      if (lidarData && lidarData.ok && lidarData.scan) {
        perception.lastLidarScan = lidarData.scan;
      }
    } catch (_) {
      // Retain last known valid scan on map
    }
  }

  // Draw once with all updated scene & map data ready
  drawScene(canvas, data.scene);

  const objects = (data.scene.objects && data.scene.objects.objects) || [];
  const regions = (data.scene.regions && data.scene.regions.regions) || [];
  const room = (data.scene.robot && data.scene.robot.room_name) || "";
  const parts = [`${objects.length} objects`];
  if (regions.length) parts.push(`${regions.length} regions`);
  if (room) parts.push(room);
  perceptionMeta("scene", parts.join(" · "));
}

// One round of tile fetches. The four run concurrently; the round settles only
// after all of them have, including when the render path throws, so no single
// failing tile can take the loop down with it.
function perceptionRound() {
  const round = [];
  if (perception.tiles.camera) round.push(perceptionPollImage("camera", "camera"));
  if (perception.tiles.depth) round.push(perceptionPollImage("depth", "depth"));
  if (perception.tiles.scene) round.push(perceptionPollScene());
  return Promise.allSettled(round);
}

// Poll on a self-rescheduling timer rather than setInterval. Every tile awaits
// its fetch, and a slow robot -- an MCP handshake alone is two round-trips --
// outlasts the interval, so setInterval used to stack rounds on top of each
// other without bound. Here the next round is armed only once this one is done,
// padded so a robot that keeps up still settles into the nominal cadence.
async function perceptionTick() {
  const started = performance.now();
  if (!perception.paused) {
    try {
      await perceptionRound();
    } catch (_) {
      // allSettled makes this unreachable today; keep loop alive
    }
  }
  if (!perception.polling) return;
  perceptionArm(Math.max(0, PERCEPTION_INTERVAL_MS - (performance.now() - started)));
}

function perceptionArm(delay) {
  if (!perception.polling) return;
  const timer = setTimeout(perceptionTick, delay);
  // Only one tick is ever pending; drop the spent id so the set does not grow.
  perception.timers.clear();
  perception.timers.add(timer);
}

const PERCEPTION_LABELS = {
  camera: () => t("Camera"),
  depth: () => t("Depth Camera"),
  scene: () => t("Scene Map"),
};

function renderPerceptionStrip(tiles) {
  const strip = document.getElementById("perceptionSourceStrip");
  if (!strip) return;
  strip.textContent = "";
  for (const id of PERCEPTION_TILE_IDS) {
    const chip = document.createElement("span");
    chip.className = `perception-source-chip ${tiles[id] ? "online" : "offline"}`;
    chip.textContent = PERCEPTION_LABELS[id] ? PERCEPTION_LABELS[id]() : id;
    strip.appendChild(chip);
  }
}

function updatePerceptionEmptyDiagnostics(tiles) {
  const ep = document.getElementById("perceptionEmptyEndpoint");
  if (ep) ep.textContent = perceptionAtlas();
  for (const id of PERCEPTION_TILE_IDS) {
    const card = document.querySelector(`.perception-channel-card[data-channel="${id}"]`);
    if (card) {
      const isOnline = !!tiles[id];
      const dot = card.querySelector(".channel-dot");
      if (dot) {
        dot.classList.toggle("online", isOnline);
        dot.classList.toggle("offline", !isOnline);
      }
      const st = card.querySelector(".channel-status");
      if (st) {
        st.classList.toggle("online", isOnline);
        st.textContent = isOnline ? t("Connected") : t("Offline");
      }
    }
  }
}

function bindPerceptionRetry() {
  const btn = document.getElementById("perceptionRetryBtn");
  if (!btn || btn.dataset.retryBound) return;
  btn.dataset.retryBound = "1";
  btn.addEventListener("click", async () => {
    btn.classList.add("loading");
    btn.disabled = true;
    const label = btn.querySelector("span");
    if (label) label.textContent = t("Probing...");
    try {
      await perceptionRefresh();
      if (perception.polling) await perceptionRound();
    } finally {
      btn.classList.remove("loading");
      btn.disabled = false;
      if (label) label.textContent = t("Retry Probe");
    }
  });
}

async function perceptionRefresh() {
  bindPerceptionRetry();
  try {
    const data = await perceptionFetch("status");
    const tiles = (data && data.tiles) || {};
    perception.resources = (data && data.resources) || {};
    let any = false;
    for (const [id, available] of Object.entries(tiles)) {
      perceptionSetAvailable(id, !!available);
      any = any || !!available;
    }
    // The occupancy base map is only offered when the robot-local map service
    // is actually reachable; otherwise hide its toggle rather than show a
    // layer that can never draw anything.
    perception.mapAvailable = !!(perception.resources.scene && perception.resources.scene.map);
    const mapLayer = document.querySelector('[data-scene-layer="map"]');
    const layerPill = mapLayer?.closest(".perception-layer-pill") || mapLayer?.closest(".perception-layer") || mapLayer?.parentElement;
    if (layerPill) layerPill.hidden = !perception.mapAvailable;
    applyPerceptionLayout();
    renderPerceptionStrip(tiles);
    updatePerceptionEmptyDiagnostics(tiles);

    const activeCount = Object.values(tiles).filter(Boolean).length;
    const totalCount = Object.keys(tiles).length || PERCEPTION_TILE_IDS.length;
    const healthBadge = document.getElementById("perceptionHealthBadge");
    const healthText = document.getElementById("perceptionHealthText");
    if (healthBadge) {
      healthBadge.classList.toggle("online", activeCount > 0);
      healthBadge.classList.toggle("offline", activeCount === 0);
    }
    if (healthText) {
      if (activeCount === totalCount && totalCount > 0) {
        healthText.textContent = t("All Streams Active");
      } else if (activeCount > 0) {
        healthText.textContent = `${activeCount}/${totalCount} ${t("Telemetry Active")}`;
      } else {
        healthText.textContent = t("Sensor Array Standby");
      }
    }

    const grid = document.getElementById("perceptionGrid");
    if (grid) grid.hidden = !any;
    const empty = document.getElementById("perceptionEmpty");
    if (empty) empty.hidden = any;
  } catch (_) {
    renderPerceptionStrip({});
    updatePerceptionEmptyDiagnostics({});
    const healthBadge = document.getElementById("perceptionHealthBadge");
    const healthText = document.getElementById("perceptionHealthText");
    if (healthBadge) {
      healthBadge.classList.remove("online");
      healthBadge.classList.add("offline");
    }
    if (healthText) {
      healthText.textContent = `0/${PERCEPTION_TILE_IDS.length} ${t("Offline")}`;
    }
    const grid = document.getElementById("perceptionGrid");
    if (grid) grid.hidden = true;
    const empty = document.getElementById("perceptionEmpty");
    if (empty) empty.hidden = false;
  }
}

function bindSceneLayers() {
  const root = document.querySelector('.perception-tile[data-tile="scene"]');
  if (!root || root.dataset.layersBound) return;
  root.dataset.layersBound = "1";
  root.querySelectorAll("[data-scene-layer]").forEach((input) => {
    const key = input.dataset.sceneLayer;
    input.addEventListener("change", () => {
      perception.sceneLayers[key] = input.checked;
      redrawScene();
    });
  });
}

function sceneCanvasPoint(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  return { px: event.clientX - rect.left, py: event.clientY - rect.top };
}

// Topmost hit wins: sceneHit is in draw order, so scan it backwards.
function sceneHoverAt(px, py) {
  const hit = perception.sceneHit;
  for (let i = hit.length - 1; i >= 0; i -= 1) {
    const b = hit[i];
    if (Math.abs(px - b.x) <= b.w / 2 && Math.abs(py - b.y) <= b.h / 2) return i;
  }
  return -1;
}

function bindSceneView() {
  const root = document.querySelector('.perception-tile[data-tile="scene"]');
  const canvas = document.querySelector("[data-scene-canvas]");
  if (!root || !canvas || canvas.dataset.viewBound) return;
  canvas.dataset.viewBound = "1";
  const view = perception.sceneView;

  canvas.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    // Touching the map hands the viewport to the operator: no more auto-fit.
    view.auto = false;
    perception.scenePan = { id: event.pointerId, x: event.clientX, y: event.clientY };
    canvas.setPointerCapture(event.pointerId);
    canvas.style.cursor = "grabbing";
  });

  canvas.addEventListener("pointermove", (event) => {
    const pan = perception.scenePan;
    if (pan && pan.id === event.pointerId) {
      if (view.center && view.scale) {
        view.center = {
          x: view.center.x - (event.clientX - pan.x) / view.scale,
          y: view.center.y + (event.clientY - pan.y) / view.scale,
        };
      }
      pan.x = event.clientX;
      pan.y = event.clientY;
      redrawScene();
      return;
    }
    const { px, py } = sceneCanvasPoint(canvas, event);
    const found = sceneHoverAt(px, py);
    if (found === perception.sceneHover) return;
    perception.sceneHover = found;
    canvas.style.cursor = found >= 0 ? "pointer" : "";
    redrawScene();
  });

  const endPan = (event) => {
    const pan = perception.scenePan;
    if (!pan || pan.id !== event.pointerId) return;
    perception.scenePan = null;
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    canvas.style.cursor = "";
  };
  canvas.addEventListener("pointerup", endPan);
  canvas.addEventListener("pointercancel", endPan);

  canvas.addEventListener("pointerleave", () => {
    if (perception.scenePan || perception.sceneHover === -1) return;
    perception.sceneHover = -1;
    canvas.style.cursor = "";
    redrawScene();
  });

  // Zoom about the pointer, so the world point under it stays put.
  canvas.addEventListener("wheel", (event) => {
    if (!view.scale || !view.center) return;
    event.preventDefault();
    const { px, py } = sceneCanvasPoint(canvas, event);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const wx = view.center.x + (px - w / 2) / view.scale;
    const wy = view.center.y - (py - h / 2) / view.scale;
    view.scale = Math.min(400, Math.max(2, view.scale * Math.exp(-event.deltaY * 0.0015)));
    view.center = {
      x: wx - (px - w / 2) / view.scale,
      y: wy + (py - h / 2) / view.scale,
    };
    view.auto = false;
    redrawScene();
  }, { passive: false });

  const fit = root.querySelector('[data-scene-view="fit"]');
  if (fit) {
    fit.addEventListener("click", () => {
      view.auto = true;
      view.fittedKey = null;
      redrawScene();
    });
  }
  const follow = root.querySelector('[data-scene-view="follow"]');
  if (follow) {
    follow.addEventListener("change", () => {
      view.follow = follow.checked;
      redrawScene();
    });
  }
}

function bindPerceptionControls() {
  const pauseBtn = document.getElementById("perceptionPauseBtn");
  if (pauseBtn && !pauseBtn.dataset.pauseBound) {
    pauseBtn.dataset.pauseBound = "1";
    pauseBtn.addEventListener("click", () => {
      perception.paused = !perception.paused;
      pauseBtn.classList.toggle("paused", perception.paused);
      const label = pauseBtn.querySelector("span");
      if (label) label.textContent = perception.paused ? t("Paused") : t("Live");
      if (!perception.paused) perceptionTick();
    });
  }



  // Focus buttons on tile headers
  const focusBtns = document.querySelectorAll('.perception-tile button[data-action="focus"]');
  focusBtns.forEach((btn) => {
    if (btn.dataset.focusBound) return;
    btn.dataset.focusBound = "1";
    btn.addEventListener("click", () => {
      const tile = btn.closest(".perception-tile");
      const tileId = tile ? tile.dataset.tile : null;
      if (!tileId) return;
      if (perception.focusedTile === tileId) {
        perception.focusedTile = null;
      } else {
        perception.focusedTile = tileId;
      }
      applyPerceptionLayout();
      setTimeout(redrawPerceptionCanvases, 40);
    });
  });
}

function bindCameraSnapshot() {
  const btns = document.querySelectorAll('.perception-tile button[data-action="snapshot"]');
  btns.forEach((btn) => {
    if (btn.dataset.snapshotBound) return;
    btn.dataset.snapshotBound = "1";
    btn.addEventListener("click", () => {
      const tile = btn.closest(".perception-tile");
      const tileId = tile ? tile.dataset.tile : null;
      if (!tileId) return;
      let url = "";
      if (tileId === "camera") {
        const img = document.querySelector("[data-camera-img]");
        if (img && img.classList.contains("loaded")) url = img.getAttribute("src") || img.src;
      } else if (tileId === "depth") {
        if (perception.depthColormap) {
          const canvas = document.querySelector("[data-depth-canvas]");
          if (canvas) url = canvas.toDataURL("image/png");
        } else {
          const img = document.querySelector("[data-depth-img]");
          if (img && img.classList.contains("loaded")) url = img.getAttribute("src") || img.src;
        }
      } else if (tileId === "scene") {
        const canvas = document.querySelector("[data-scene-canvas]");
        if (canvas) url = canvas.toDataURL("image/png");
      }
      if (!url) return;
      const a = document.createElement("a");
      a.download = `robonix-${tileId}-${Date.now()}.png`;
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      perceptionMeta(tileId, t("Snapshot saved"));
    });
  });
}

function bindDepthColormap() {
  const btn = document.getElementById("depthColormapBtn");
  if (!btn || btn.dataset.colormapBound) return;
  btn.dataset.colormapBound = "1";
  btn.classList.toggle("active", perception.depthColormap);
  btn.addEventListener("click", () => {
    perception.depthColormap = !perception.depthColormap;
    btn.classList.toggle("active", perception.depthColormap);
    const canvas = document.querySelector("[data-depth-canvas]");
    const img = document.querySelector("[data-depth-img]");
    if (perception.depthColormap) {
      if (canvas) canvas.style.display = "block";
      if (img) img.style.display = "none";
      if (img && img.complete) renderDepthHeatmap(img);
    } else {
      if (canvas) canvas.style.display = "none";
      if (img) img.style.display = "block";
    }
  });
}

function bindDepthHover() {
  const body = document.querySelector('.perception-tile[data-tile="depth"] .perception-tile-body');
  const tooltip = document.getElementById("depthHoverTooltip");
  if (!body || !tooltip || body.dataset.hoverBound) return;
  body.dataset.hoverBound = "1";

  body.addEventListener("pointermove", (e) => {
    if (!perception.depthColormap) {
      tooltip.hidden = true;
      return;
    }
    const depthData = perception.lastDepthData;
    if (!depthData) {
      tooltip.hidden = true;
      return;
    }
    const rect = body.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    const imgW = depthData.width;
    const imgH = depthData.height;
    if (!imgW || !imgH || !rect.width || !rect.height) {
      tooltip.hidden = true;
      return;
    }
    const containerAr = rect.width / rect.height;
    const imgAr = imgW / imgH;

    let renderW, renderH, offsetX, offsetY;
    if (containerAr > imgAr) {
      renderH = rect.height;
      renderW = rect.height * imgAr;
      offsetX = (rect.width - renderW) / 2;
      offsetY = 0;
    } else {
      renderW = rect.width;
      renderH = rect.width / imgAr;
      offsetX = 0;
      offsetY = (rect.height - renderH) / 2;
    }

    if (cx < offsetX || cx > offsetX + renderW || cy < offsetY || cy > offsetY + renderH) {
      tooltip.hidden = true;
      return;
    }

    const ix = Math.max(0, Math.min(imgW - 1, Math.floor(((cx - offsetX) / renderW) * imgW)));
    const iy = Math.max(0, Math.min(imgH - 1, Math.floor(((cy - offsetY) / renderH) * imgH)));
    const val = depthData.raw[iy * imgW + ix];
    const distM = ((val / 255) * 5.0).toFixed(2);
    tooltip.textContent = `${t("Depth")}: ${distM}m (${ix}, ${iy})`;
    tooltip.style.left = `${cx}px`;
    tooltip.style.top = `${cy}px`;
    tooltip.hidden = false;
  });

  body.addEventListener("pointerleave", () => {
    tooltip.hidden = true;
  });
}

function startPerception() {
  bindPerceptionRetry();
  bindPerceptionControls();
  bindCameraSnapshot();
  bindDepthColormap();
  bindDepthHover();
  bindSceneLayers();
  bindSceneView();
  redrawPerceptionCanvases();
  if (perception.polling) return;
  perception.polling = true;
  perceptionRefresh();
  perceptionArm(0);
}

function stopPerception() {
  perception.polling = false;
  for (const timer of perception.timers) clearTimeout(timer);
  perception.timers.clear();
}

function redrawPerceptionCanvases() {
  const sceneCanvas = document.querySelector("[data-scene-canvas]");

  if (sceneCanvas) {
    if (perception.lastScene) drawScene(sceneCanvas, perception.lastScene);
    else drawSceneStandby(sceneCanvas);
  }
}

window.addEventListener("robonix:page", (event) => {
  const name = event.detail && event.detail.name;
  if (name === "perception") {
    startPerception();
  } else {
    stopPerception();
  }
});

// Redraw canvases when window is resized
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (perception.polling) {
      redrawPerceptionCanvases();
    }
  }, 150);
});

/// Re-render every dynamic region after a language switch. Static markup is
/// handled by i18n.js walking data-i18n; this covers everything app.js writes
/// from state. promptTitle is excluded from data-i18n for the same reason:
/// it shows the live session title once one exists.
function handleI18nChange() {
  if (maybe("promptTitle")) {
    $("promptTitle").textContent = state.sessionTitle || t("What should Robonix do?");
  }
  renderSessionChip();
  renderMessages();
  renderTimeline();
  renderPlan();
  renderActivePlans(state.activePlansError);
  renderHistory();
  renderHandsfree();
  syncVoiceControls();
  setText("voiceState", state.voiceRecording ? t("recording") : t("ready"));
  setText("audioLevelState", t(state.audio.vuState));
  if (state.lastSystemData) renderSystem(state.lastSystemData);
  setBusy(state.busy);
  updatePerceptionEmptyDiagnostics((perception && perception.tiles) || {});
  redrawPerceptionCanvases();
}

window.addEventListener("robonix:i18n", handleI18nChange);

init();
