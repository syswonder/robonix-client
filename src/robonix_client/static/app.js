const $ = (id) => document.getElementById(id);
const maybe = (id) => document.getElementById(id);

const state = {
  settings: {},
  sessionId: getSessionId(),
  sessionTitle: "",
  attachments: [],
  messages: [],
  timeline: [],
  plan: null,
  taskState: null,
  batches: [],
  nodeStates: {},
  activeAgentId: null,
  history: loadConversations(),
  busy: false,
  activeStreams: 0,
  voiceActive: false,
  ttsPlaying: false,
  handsfree: { available: false, enabled: false, state: "unavailable", busy: false },
  audio: {
    port: 60000,
    wsUrl: "",
    devices: [],
    inputCurrent: null,
    outputCurrent: null,
    vuSocket: null,
    logSocket: null,
    logLines: [],
    levelHistory: Array(28).fill(0),
    route: { micProviders: [], speakerProviders: [], micDevices: [], speakerDevices: [] },
  },
};

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
      title: item.text || "Untitled chat",
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

function saveConversations() {
  localStorage.setItem("robonix.conversations", JSON.stringify(state.history.slice(0, 30)));
}

async function init() {
  const defaults = await fetch("/api/defaults").then((r) => r.json()).catch(() => ({}));
  const stored = loadStoredSettings();
  const atlas = parseAtlasEndpoint(defaults.atlasEndpoint || "");
  state.settings = {
    robotHost: defaults.robotHost || atlas.host || "",
    atlasPort: defaults.atlasPort || atlas.port || DEFAULT_ATLAS_PORT,
    liaisonEndpoint: "",
    userId: "",
    sessionTitle: "",
    recordSeconds: 30,
    language: "",
    ttsEnabled: true,
    micNodeId: "",
    micDeviceId: "",
    speakerNodeId: "",
    speakerDeviceId: "",
    ttsNodeId: "",
    enrollUserId: "",
    enrollUserName: "",
    ...defaults,
    ...stored,
  };
  const launchFieldMap = {
    ROBONIX_ROBOT_HOST: "robotHost",
    ROBONIX_ATLAS_PORT: "atlasPort",
    ROBONIX_CLIENT_USER_ID: "userId",
    ROBONIX_CLIENT_SESSION_ID: "sessionId",
    ROBONIX_CLIENT_SESSION_TITLE: "sessionTitle",
    ROBONIX_CLIENT_MIC_NODE_ID: "micNodeId",
    ROBONIX_CLIENT_MIC_DEVICE_ID: "micDeviceId",
    ROBONIX_CLIENT_SPEAKER_NODE_ID: "speakerNodeId",
    ROBONIX_CLIENT_SPEAKER_DEVICE_ID: "speakerDeviceId",
    ROBONIX_CLIENT_TTS_NODE_ID: "ttsNodeId",
  };
  (defaults.launchOverrides || []).forEach((key) => {
    const field = launchFieldMap[key];
    if (field) state.settings[field] = defaults[field];
  });
  if (defaults.sessionId) state.sessionId = defaults.sessionId;
  if (defaults.sessionTitle) state.sessionTitle = defaults.sessionTitle;
  bindSettings();
  bindEvents();
  renderAudioBars();
  renderHistory();
  renderMessages();
  renderTimeline();
  renderPlan();
  renderSceneAssets();
  refreshSystem();
  refreshAudioRoute();
  setInterval(refreshSystem, 7000);
  setInterval(refreshHandsfree, 2500);
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
  if (maybe("ttsEnabled")) $("ttsEnabled").checked = state.settings.ttsEnabled !== false;
  if (maybe("settingsTtsEnabled")) $("settingsTtsEnabled").checked = state.settings.ttsEnabled !== false;
  if (maybe("micNodeId")) $("micNodeId").value = state.settings.micNodeId || "";
  if (maybe("micDeviceId")) $("micDeviceId").value = state.settings.micDeviceId || "";
  if (maybe("speakerNodeId")) $("speakerNodeId").value = state.settings.speakerNodeId || "";
  if (maybe("speakerDeviceId")) $("speakerDeviceId").value = state.settings.speakerDeviceId || "";
  if (maybe("enrollUserId")) $("enrollUserId").value = state.settings.enrollUserId || "";
  if (maybe("enrollUserName")) $("enrollUserName").value = state.settings.enrollUserName || "";
  if (maybe("clientUserId")) $("clientUserId").textContent = state.settings.userId || "local";
  if (state.sessionTitle && maybe("promptTitle")) $("promptTitle").textContent = state.sessionTitle;

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
    "ttsEnabled",
    "settingsTtsEnabled",
    "micNodeId",
    "micDeviceId",
    "speakerNodeId",
    "speakerDeviceId",
    "enrollUserId",
    "enrollUserName",
  ].forEach((id) => maybe(id)?.addEventListener("change", syncConnectionSettings));
  ["settingsUserId", "settingsRecordSeconds", "settingsTtsEnabled"].forEach((id) => {
    maybe(id)?.addEventListener("change", () => syncConnectionSettings(true));
  });
  maybe("saveClientSettings")?.addEventListener("click", () => syncConnectionSettings(true));
  maybe("userId")?.addEventListener("input", () => {
    if (maybe("clientUserId")) $("clientUserId").textContent = $("userId").value.trim() || "local";
  });
}

function syncConnectionSettings(fromSettings = false) {
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
  const ttsSource = (fromSettings || document.activeElement?.id === "settingsTtsEnabled") && maybe("settingsTtsEnabled") ? "settingsTtsEnabled" : "ttsEnabled";
  if (maybe("userId") && maybe(userSource)) $("userId").value = $(userSource).value.trim();
  if (maybe("settingsUserId") && maybe(userSource)) $("settingsUserId").value = $(userSource).value.trim();
  if (maybe("recordSeconds") && maybe(secondsSource)) $("recordSeconds").value = $(secondsSource).value;
  if (maybe("settingsRecordSeconds") && maybe(secondsSource)) $("settingsRecordSeconds").value = $(secondsSource).value;
  if (maybe("ttsEnabled") && maybe(ttsSource)) $("ttsEnabled").checked = $(ttsSource).checked;
  if (maybe("settingsTtsEnabled") && maybe(ttsSource)) $("settingsTtsEnabled").checked = $(ttsSource).checked;
  state.settings = collectSettings();
  saveSettings();
  if (maybe("clientUserId")) $("clientUserId").textContent = state.settings.userId || "local";
  setText("settingsStatus", "Saved in this browser.");
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
    ttsEnabled: maybe("ttsEnabled") ? $("ttsEnabled").checked : state.settings.ttsEnabled !== false,
    micNodeId: maybe("micNodeId")?.value.trim() || state.settings.micNodeId || "",
    micDeviceId: maybe("micDeviceId")?.value.trim() || state.settings.micDeviceId || "",
    speakerNodeId: maybe("speakerNodeId")?.value.trim() || state.settings.speakerNodeId || "",
    speakerDeviceId: maybe("speakerDeviceId")?.value.trim() || state.settings.speakerDeviceId || "",
    ttsNodeId: state.settings.ttsNodeId || "",
    enrollUserId: maybe("enrollUserId")?.value.trim() || state.settings.enrollUserId || "",
    enrollUserName: maybe("enrollUserName")?.value.trim() || state.settings.enrollUserName || "",
  };
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
    startVoice();
  });
  $("attachButton").addEventListener("click", () => $("imageInput").click());
  $("imageInput").addEventListener("change", handleFiles);
  maybe("voiceButton")?.addEventListener("click", startVoice);
  $("refreshSystem").addEventListener("click", refreshSystem);
  maybe("handsfreeToggle")?.addEventListener("click", toggleHandsfree);
  $("newSession").addEventListener("click", newSession);
  $("endSession").addEventListener("click", endSession);
  $("renameSession").addEventListener("click", () => renameConversation(state.sessionId));
  $("clearHistory").addEventListener("click", clearHistory);
  maybe("connectNow")?.addEventListener("click", () => {
    state.settings = collectSettings();
    saveSettings();
    addTimeline("system", `connecting to ${state.settings.robotHost}:${state.settings.atlasPort}`);
    refreshSystem();
  });
  maybe("startAudioServer")?.addEventListener("click", startAudioServer);
  maybe("checkAudioServer")?.addEventListener("click", checkAudioServer);
  maybe("refreshAudioDevices")?.addEventListener("click", loadAudioDevices);
  maybe("applyAudioDevices")?.addEventListener("click", applyAudioDevices);
  maybe("refreshAudioRoute")?.addEventListener("click", refreshAudioRoute);
  maybe("applyAudioRoute")?.addEventListener("click", applyAudioRoute);
  maybe("micNodeId")?.addEventListener("change", () => loadAudioRouteDevices("mic"));
  maybe("speakerNodeId")?.addEventListener("change", () => loadAudioRouteDevices("speaker"));
  maybe("enrollVoice")?.addEventListener("click", enrollVoice);
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
}

async function configureReverseAudio(providerId) {
  if (!providerId) return { ok: false, skipped: true };
  const result = await fetch("/api/audio-reverse/connect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ settings: collectSettings(), providerId }),
  }).then((r) => r.json()).catch((error) => ({ ok: false, error: String(error) }));
  appendAudioLog(result.ok ? `reverse audio target ${result.target}` : `reverse audio error: ${result.error || "unknown"}`);
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
}

async function toggleHandsfree() {
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
  addTimeline(result.ok ? "voice" : "error", result.ok ? `robot hands-free ${enabled ? "enabled" : "disabled"}` : `hands-free: ${result.error || result.detail || "unavailable"}`);
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
    ? "Hands-free..."
    : status === "listening"
      ? "Listening"
      : status === "acknowledging"
        ? "Acknowledging"
      : status === "in_voice"
        ? "Hands-free active"
        : state.handsfree.enabled
          ? `Hands-free ${status}`
          : "Hands-free off";
  button.title = state.handsfree.lastError || state.handsfree.error || (state.handsfree.keyword
    ? `Last wake phrase: ${state.handsfree.keyword}`
    : "Robot-local wake phrase configured by Speech");
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
  clear(strip);
  state.attachments.forEach((item, index) => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = "attachment-pill";
    pill.title = "Remove attachment";
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
  if (name === "audio") {
    checkAudioServer();
  }
}

function newSession() {
  persistCurrentConversation();
  state.sessionId = getSessionId();
  state.sessionTitle = "";
  state.messages = [];
  state.timeline = [];
  state.plan = null;
  state.batches = [];
  state.nodeStates = {};
  state.activeAgentId = null;
  $("promptTitle").textContent = "What should Robonix do?";
  renderMessages();
  renderTimeline();
  renderPlan();
  renderSceneAssets();
  renderHistory();
}

function endSession() {
  const socket = new WebSocket(wsUrl("/ws/session-end"));
  socket.onopen = () => socket.send(JSON.stringify({ settings: collectSettings() }));
  addTimeline("session", "session_end sent");
}

async function sendTask() {
  const text = $("taskInput").value.trim();
  const attachments = state.attachments.slice();
  if (!text && attachments.length === 0) return;

  const wasBusy = state.busy;
  const display = text || attachments.map((item) => item.name).join(", ");
  addMessage("user", display, wasBusy ? "steer" : (attachments.length ? `${attachments.length} image` : ""), attachments);
  addStatusLine(wasBusy ? "Queued steer input; waiting for Pilot to react." : "Submitted task; waiting for Pilot stream.");
  addTimeline(wasBusy ? "steer" : "task", wasBusy ? `steer: ${display}` : `task: ${display}`);
  beginStream();
  persistCurrentConversation(display);
  $("taskInput").value = "";
  autoGrowInput();
  state.attachments = [];
  renderAttachments();
  renderSceneAssets();

  const socket = new WebSocket(wsUrl("/ws/task"));
  socket.onopen = () => {
    socket.send(JSON.stringify({
      text,
      attachments,
      settings: collectSettings(),
      steer: wasBusy,
      interactionMode: wasBusy ? "steer" : "task",
    }));
  };
  wireStream(socket, endStream);
}

function startVoice() {
  if (state.voiceActive) return;
  const wasBusy = state.busy;
  state.voiceActive = true;
  beginStream();
  maybe("voiceButton")?.classList.add("active");
  document.querySelectorAll("[data-page-action='voice-start']").forEach((button) => button.classList.add("active"));
  if (maybe("voiceState")) $("voiceState").textContent = "recording";
  addStatusLine(wasBusy ? "Listening for voice steer input." : "Listening for voice input.");
  addTimeline(wasBusy ? "voice steer" : "voice", wasBusy ? "voice steer requested" : "voice session requested");
  const socket = new WebSocket(wsUrl("/ws/voice"));
  socket.onopen = () => socket.send(JSON.stringify({
    settings: collectSettings(),
    steer: wasBusy,
    interactionMode: wasBusy ? "steer" : "voice",
  }));
  wireStream(socket, () => {
    state.voiceActive = false;
    endStream();
    maybe("voiceButton")?.classList.remove("active");
    document.querySelectorAll("[data-page-action='voice-start']").forEach((button) => button.classList.remove("active"));
    if (maybe("voiceState")) $("voiceState").textContent = "ready";
  });
}

function wireStream(socket, done) {
  socket.onmessage = (event) => {
    const payload = JSON.parse(event.data);
    if (payload.type === "pilot_event") handlePilotEvent(payload.event);
    if (payload.type === "voice_event") handleVoiceEvent(payload.event);
    if (payload.type === "accepted") addStatusLine("Connected; waiting for Robonix events.");
    if (payload.type === "status") addTimeline("status", payload.message || "status");
    if (payload.type === "error") addMessage("error", payload.error);
    if (payload.type === "done") socket.close();
  };
  socket.onerror = () => addMessage("error", "stream failed");
  socket.onclose = done;
}

function handlePilotEvent(event) {
  if (event.kind === "text_chunk" && event.textChunk) {
    appendAgent(event.textChunk);
  } else if (event.kind === "final_text" && event.finalText) {
    finalizeAgent(event.finalText);
  } else if (event.kind === "plan" && event.plan) {
    state.plan = event.plan;
    announcePlan(event.plan);
    addTimeline("plan", `live round ${event.plan.round}: ${planCalls(event.plan).length} call(s)`);
    renderPlan();
    persistCurrentConversation();
  } else if (event.kind === "batch_result" && event.batchResult) {
    state.batches.unshift(event.batchResult);
    (event.batchResult.results || []).forEach((result) => {
      if (Number.isFinite(Number(result.nodeIndex))) state.nodeStates[String(result.nodeIndex)] = result;
    });
    addTimeline(event.batchResult.anyFailed ? "error" : "result", `round ${event.batchResult.round} result`);
    renderPlan();
    persistCurrentConversation();
  } else if (event.kind === "node_state" && event.nodeState) {
    state.nodeStates[String(event.nodeState.nodeIndex)] = event.nodeState;
    addTimeline(event.nodeState.state === "FAILED" ? "error" : "status", `${event.nodeState.opId || `node ${event.nodeState.nodeIndex}`} ${event.nodeState.state}`);
    renderPlan();
    persistCurrentConversation();
  } else if (event.kind === "task_state" && event.taskState) {
    state.taskState = event.taskState;
    addTimeline("status", event.taskState.status || event.taskState.goal || "task update");
    addStatusLine(event.taskState.status || event.taskState.goal || "Task state updated.");
    renderPlan();
    persistCurrentConversation();
  } else if (event.kind === "status" && event.status) {
    addTimeline("status", event.status.message || `state ${event.status.state}`);
    if (event.status.message) addStatusLine(event.status.message);
  }
}

function handleVoiceEvent(event) {
  const label = event.statusMessage || event.text || event.error || event.kind;
  if (event.kind === "asr_final") {
    addMessage("user", event.text, "voice");
  } else if (event.kind === "pilot" && event.pilot) {
    handlePilotEvent(event.pilot);
  } else if (event.kind === "tts_started") {
    setTtsAura(true);
    addMessage("status", label || "TTS playback started");
    addTimeline("voice", label || "TTS playback started");
  } else if (event.kind === "tts_done") {
    setTtsAura(false);
    const skipped = String(label || "").toLowerCase().includes("skipped");
    addMessage(skipped ? "error" : "status", label || "TTS playback done");
    addTimeline(skipped ? "error" : "voice", label || "TTS playback done");
  } else if (event.kind === "error") {
    addMessage("error", event.error || "voice error");
  } else {
    addTimeline("voice", label);
  }
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

function appendAgent(text) {
  if (!state.activeAgentId) {
    state.activeAgentId = addMessage("agent", "", "Robonix");
  }
  const msg = state.messages.find((item) => item.id === state.activeAgentId);
  if (msg) msg.text += text;
  renderMessages();
  persistCurrentConversation();
}

function finalizeAgent(text) {
  if (!text) {
    state.activeAgentId = null;
    return;
  }
  if (!state.activeAgentId) {
    addMessage("agent", text, "Robonix");
    return;
  }
  const msg = state.messages.find((item) => item.id === state.activeAgentId);
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

function renderMessages() {
  const root = $("messages");
  clear(root);
  if (state.messages.length === 0) {
    const empty = document.createElement("div");
    empty.className = "message status";
    empty.textContent = "Ready";
    root.appendChild(empty);
  }
  state.messages.forEach((message) => {
    const el = document.createElement("div");
    el.className = `message ${message.role}`;
    if (message.meta) {
      const meta = document.createElement("span");
      meta.className = "meta";
      meta.textContent = message.meta;
      el.appendChild(meta);
    }
    el.appendChild(document.createTextNode(message.text));
    if (message.planRound) {
      const action = document.createElement("button");
      action.type = "button";
      action.className = "message-link";
      action.textContent = "Show RTDL";
      action.addEventListener("click", () => {
        const sidebar = maybe("dashboardSidebar");
        const execution = document.querySelector(".execution-panel");
        execution?.scrollIntoView({ block: "start", behavior: "smooth" });
        execution?.classList.add("attention");
        sidebar?.classList.add("attention");
        setTimeout(() => {
          execution?.classList.remove("attention");
          sidebar?.classList.remove("attention");
        }, 900);
      });
      el.appendChild(action);
    }
    if (Array.isArray(message.attachments) && message.attachments.length) {
      const images = document.createElement("div");
      images.className = "message-images";
      message.attachments.forEach((item) => {
        const img = document.createElement("img");
        img.src = item.dataUrl;
        img.alt = item.name || "attachment";
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
  setTextAll("[data-current-task-label]", `Current Task: ${currentTaskLabel()}`);
  const rows = state.timeline;
  document.querySelectorAll("[data-event-list]").forEach((root) => {
    clear(root);
    if (!rows.length) {
      const empty = document.createElement("div");
      empty.className = "event-empty";
      empty.textContent = "No task events yet.";
      root.appendChild(empty);
      return;
    }
    rows.forEach((item) => {
      const row = document.createElement("div");
      row.className = "event-row";
      row.textContent = `[${item.at}] ${String(item.kind || "event").toUpperCase()} ${item.text || ""}`;
      root.appendChild(row);
    });
  });
}

function renderPlan() {
  const plan = state.plan;
  const roots = document.querySelectorAll("[data-plan-tree]");
  roots.forEach((root) => clear(root));
  const calls = planCalls(plan);
  setTextAll("[data-plan-summary]", plan ? `round ${plan.round} · ${calls.length} call(s)` : "waiting for real plan");
  renderGoalPanel();
  renderSceneAssets();
  if (!plan) {
    roots.forEach((root) => {
      const empty = document.createElement("div");
      empty.className = "plan-empty";
      empty.textContent = "No RTDL plan in this session yet.";
      root.appendChild(empty);
    });
    renderExecutionDetail(null, "PENDING");
    return;
  }
  const resultMaps = buildResultMaps();
  const nodeStateByIndex = resultMaps.byIndex;
  const runningIndex = pickRunningIndex(plan, nodeStateByIndex);
  const rows = planForestNodes(plan).map(({ node, depth }) => ({
    node,
    depth,
    status: aggregateNodeStatus(node, plan, resultMaps, runningIndex),
  }));
  roots.forEach((root) => {
    renderBehaviorTree(root, plan, resultMaps, runningIndex);
  });
  const activeNode = plan.nodes.find((node) => node.index === runningIndex) || plan.nodes.find((node) => node.call) || plan.nodes[0];
  renderExecutionDetail(activeNode, aggregateNodeStatus(activeNode, plan, resultMaps, runningIndex), resultForNode(activeNode, resultMaps));
}

function renderBehaviorTree(root, plan, resultMaps, runningIndex) {
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
    title.textContent = treeRoots.length > 1 ? `Tree ${treeIndex + 1}: ${nodeLabel(treeRoot)}` : nodeLabel(treeRoot);
    const pill = document.createElement("span");
    pill.className = `status ${statusKey(status)}`;
    pill.textContent = displayStatus(status);
    header.append(title, pill);
    const viewport = document.createElement("div");
    viewport.className = "bt-tree-viewport";
    viewport.appendChild(makeBehaviorTreeSvg(treeRoot, plan, resultMaps, runningIndex));
    card.append(header, viewport);
    root.appendChild(card);
  });
}

function makeBehaviorTreeSvg(treeRoot, plan, resultMaps, runningIndex) {
  const nodes = plan?.nodes || [];
  const byIndex = new Map(nodes.map((node) => [Number(node.index), node]));
  const nodeStateByIndex = resultMaps.byIndex;
  const nodeW = 62;
  const nodeH = 21;
  const leafGap = 9;
  const levelGap = 34;
  const topPad = 13;
  const sidePad = 10;
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
    (node.children || []).forEach((child) => {
      const cp = posByIndex.get(Number(child));
      if (!cp) return;
      const line = document.createElementNS(ns, "path");
      const y1 = y + nodeH;
      const y2 = cp.y;
      line.setAttribute("class", "bt-edge");
      line.setAttribute("d", `M ${x} ${y1} C ${x} ${y1 + 12}, ${cp.x} ${y2 - 12}, ${cp.x} ${y2}`);
      svg.appendChild(line);
    });
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
    g.setAttribute("class", `bt-node status-${key}${Number(node.index) === Number(runningIndex) ? " active" : ""}`);
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
    text.setAttribute("y", "9.8");
    text.setAttribute("text-anchor", "middle");
    text.textContent = ellipsize(nodeLabel(node), 10);
    const meta = document.createElementNS(ns, "text");
    meta.setAttribute("class", "bt-node-meta");
    meta.setAttribute("x", String(nodeW / 2));
    meta.setAttribute("y", "17.5");
    meta.setAttribute("text-anchor", "middle");
    meta.textContent = node.call ? ellipsize(compactProvider(node.call), 12) : displayStatus(status);
    g.append(title, rect, accent, text, meta);
    g.addEventListener("click", () => renderExecutionDetail(node, status, resultForNode(node, resultMaps)));
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
  if (own?.state) return own.state;
  if (Number(node?.index) === Number(runningIndex)) return "RUNNING";
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
  if (key === "running") return "running";
  return "done";
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
  if (raw === "failed" || raw === "failure" || raw === "error") return "failed";
  if (raw === "running" || raw === "in_progress" || raw === "active") return "running";
  return "pending";
}

function displayStatus(status) {
  return statusKey(status).toUpperCase();
}

function renderExecutionDetail(node, status, nodeState = null) {
  if (!maybe("activeProvider")) return;
  if (maybe("executionDetailTitle")) $("executionDetailTitle").textContent = node ? "Node detail" : "Node detail";
  if (!node) {
    $("activeProvider").textContent = "-";
    $("activeStarted").textContent = "-";
    $("activeDuration").textContent = "-";
    $("activeArgs").textContent = "Select an RTDL node to inspect its arguments and result.";
    return;
  }
  $("activeProvider").textContent = detailProvider(node);
  $("activeStarted").textContent = node ? startedForNode(node, status) : "-";
  $("activeDuration").textContent = node ? durationForNode(node, status) : "-";
  $("activeArgs").textContent = formatArgs(detailPayload(node, status, nodeState));
}

function buildResultMaps() {
  const byIndex = new Map();
  const byCallId = new Map();
  const add = (result) => {
    if (!result) return;
    const idx = Number(result.nodeIndex);
    if (Number.isFinite(idx)) byIndex.set(idx, result);
    const callId = result.leafResult?.callId || result.callId;
    if (callId) byCallId.set(String(callId), result);
  };
  Object.values(state.nodeStates || {}).forEach(add);
  state.batches.forEach((batch) => (batch.results || []).forEach(add));
  return { byIndex, byCallId };
}

function resultForNode(node, maps = buildResultMaps()) {
  if (!node) return null;
  const callId = node.call?.callId ? String(node.call.callId) : "";
  if (callId && maps.byCallId?.has(callId)) return maps.byCallId.get(callId);
  const indexed = maps.byIndex?.get(Number(node.index)) || state.nodeStates?.[String(node.index)] || null;
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
  const plan = state.plan;
  if (!plan) return null;
  const nodeStateByIndex = new Map();
  Object.entries(state.nodeStates || {}).forEach(([index, result]) => nodeStateByIndex.set(Number(index), result));
  state.batches.forEach((batch) => {
    (batch.results || []).forEach((result) => nodeStateByIndex.set(Number(result.nodeIndex), result));
  });
  const runningIndex = pickRunningIndex(plan, nodeStateByIndex);
  return plan.nodes.find((node) => node.index === runningIndex) || plan.nodes.find((node) => node.call) || null;
}

function renderGoalPanel() {
  const task = state.taskState || {};
  const active = activePlanNode();
  const taskText = task.goal || task.task || firstUserMessage() || "waiting for task";
  const status = task.status || (active ? "executing" : "idle");
  if (maybe("goalLine")) $("goalLine").textContent = `${status}: ${taskText}`;
  document.querySelectorAll("[data-goal-preview]").forEach((goal) => {
    clear(goal);
    const card = document.createElement("div");
    card.className = "goal-card";
    const title = document.createElement("strong");
    title.textContent = active ? nodeLabel(active) : "No active RTDL node";
    const provider = document.createElement("span");
    provider.textContent = active ? capabilityLabel(active) : "Submit a task to start a plan.";
    card.append(title, provider);
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
  if (!text) return "idle";
  return text.length > 40 ? `${text.slice(0, 37)}...` : text;
}

async function refreshSystem() {
  const atlas = buildAtlasEndpoint($("robotHost").value, $("atlasPort").value);
  if (!atlas) {
    renderSystem({ error: "Set Robot Host and Atlas Port first.", summary: { state: "offline" }, requiredContracts: [], providers: [] });
    return;
  }
  const data = await fetch(`/api/system?atlas=${encodeURIComponent(atlas)}`).then((r) => r.json()).catch((error) => ({ error: String(error) }));
  renderSystem(data);
}

function renderSystem(data) {
  const summary = data.summary || {};
  const stateLabel = data.error ? "offline" : summary.state || "unknown";
  const online = !data.error;
  $("connectionState").textContent = stateLabel;
  $("refreshSystem").classList.toggle("offline", !online);
  $("refreshSystem").classList.toggle("online", online);
  if (maybe("connectNow")) {
    $("connectNow").textContent = online ? "Connected" : "Connect";
    $("connectNow").classList.toggle("connected", online);
    $("connectNow").title = online ? "Atlas is reachable" : "Check Atlas connection";
  }
  if (maybe("metricState")) $("metricState").textContent = stateLabel;
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
    status.textContent = item.available ? item.providers.join(", ") : "missing";
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
    meta.textContent = `${provider.kind}  ${provider.state}  ${provider.capabilities.length} cap(s)`;
    row.append(title, meta);
    providerRoot.appendChild(row);
  });
}

function renderRobotState(data) {
  if (!document.querySelector("[data-robot-state-list]")) return;
  const contracts = data.requiredContracts || [];
  const summary = data.summary || {};
  const recording = maybe("voiceState") ? $("voiceState").textContent === "recording" : false;
  const audioReady = contractAvailable(contracts, "Speaker") || contractAvailable(contracts, "TTS");
  const rows = [
    { label: "Base", icon: "B", ok: contractAvailable(contracts, "Executor") || contractAvailable(contracts, "Liaison submit"), status: "OK", value: "0.00 m/s", source: "mock" },
    { label: "Arm", icon: "A", ok: summary.errors === 0, status: "OK", value: "Idle", source: "mock" },
    { label: "Head / Camera", icon: "C", ok: true, status: "OK", value: "Tracking", source: "mock" },
    { label: "Battery", icon: "P", ok: true, status: "86%", value: "2h 14m", source: "mock", battery: 86 },
    { label: "Localization", icon: "L", ok: !data.error, status: "OK", value: "0.04 m", source: "mock", separated: true },
    { label: "Navigation", icon: "N", ok: contractAvailable(contracts, "Executor"), status: state.busy ? "Moving" : "Ready", value: state.busy ? "0.32 m" : "0.00 m", source: "derived", warn: state.busy },
    { label: "Audio Input", icon: "M", ok: contractAvailable(contracts, "Mic") || contractAvailable(contracts, "ASR"), status: recording ? "Listening" : "Standby", value: "", source: "real", wave: recording },
    { label: "Audio Output", icon: "S", ok: audioReady, status: maybe("ttsEnabled") && $("ttsEnabled").checked ? "Speaking" : "Muted", value: "", source: "real", wave: maybe("ttsEnabled") && $("ttsEnabled").checked },
    { label: "Connection", icon: "O", ok: !data.error, status: data.error ? "Offline" : "Online", value: "", source: "real", separated: true },
    { label: "Safety", icon: "!", ok: summary.errors === 0, status: summary.errors ? `${summary.errors} error(s)` : "OK", value: "", source: "derived", danger: summary.errors > 0 },
  ];
  setTextAll("[data-robot-mode]", data.error ? "Offline" : state.busy ? "Executing" : "Ready");
  document.querySelectorAll("[data-robot-state-list]").forEach((root) => {
    clear(root);
    rows.forEach((item) => {
      const row = document.createElement("div");
      row.className = `robot-state-row${item.separated ? " separated" : ""}`;
      row.title = `source: ${item.source}`;
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

function persistCurrentConversation(titleHint = "", force = false) {
  const hasContent = state.sessionTitle || state.messages.length || state.timeline.length || state.plan || state.batches.length || Object.keys(state.nodeStates || {}).length;
  if (!hasContent && !force) return;
  const existing = state.history.find((item) => item.id === state.sessionId);
  const title = state.sessionTitle || existing?.title || titleHint || firstUserMessage() || "Untitled chat";
  state.sessionTitle = title;
  const conversation = {
    id: state.sessionId,
    title,
    updatedAt: Date.now(),
    messages: state.messages.map((item) => ({ ...item })),
    timeline: state.timeline.map((item) => ({ ...item })),
    plan: state.plan,
    batches: state.batches,
    nodeStates: state.nodeStates,
  };
  state.history = [conversation, ...state.history.filter((item) => item.id !== state.sessionId)].slice(0, 30);
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
    empty.textContent = "No saved conversations yet.";
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
    title.textContent = item.title || "Untitled chat";
    const meta = document.createElement("span");
    meta.textContent = formatConversationTime(item.updatedAt);
    open.append(title, meta);
    open.addEventListener("click", () => openConversation(item.id));
    const rename = document.createElement("button");
    rename.type = "button";
    rename.className = "history-rename";
    rename.title = "Rename conversation";
    rename.setAttribute("aria-label", `Rename ${item.title || "conversation"}`);
    rename.textContent = "Rename";
    rename.addEventListener("click", (event) => {
      event.stopPropagation();
      renameConversation(item.id);
    });
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "history-delete";
    remove.title = "Delete conversation";
    remove.setAttribute("aria-label", `Delete ${item.title || "conversation"}`);
    remove.textContent = "Delete";
    remove.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteConversation(item.id);
    });
    row.append(open, rename, remove);
    root.appendChild(row);
  });
}

function renameConversation(sessionId) {
  if (state.busy) return;
  if (sessionId === state.sessionId) persistCurrentConversation("", true);
  const conversation = state.history.find((item) => item.id === sessionId);
  const currentTitle = conversation?.title || state.sessionTitle || firstUserMessage() || "Untitled chat";
  const nextTitle = window.prompt("Rename session", currentTitle);
  if (nextTitle === null) return;
  const title = nextTitle.trim();
  if (!title) return;
  if (sessionId === state.sessionId) {
    state.sessionTitle = title;
    $("promptTitle").textContent = title;
  }
  if (conversation) {
    conversation.title = title;
    conversation.updatedAt = Date.now();
    state.history = [conversation, ...state.history.filter((item) => item.id !== sessionId)].slice(0, 30);
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
    state.sessionTitle = "";
    state.messages = [];
    state.timeline = [];
    state.plan = null;
    state.batches = [];
    state.nodeStates = {};
    state.activeAgentId = null;
    $("promptTitle").textContent = "What should Robonix do?";
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
  state.sessionTitle = "";
  state.messages = [];
  state.timeline = [];
  state.plan = null;
  state.batches = [];
  state.nodeStates = {};
  state.activeAgentId = null;
  $("promptTitle").textContent = "What should Robonix do?";
  renderMessages();
  renderTimeline();
  renderPlan();
  renderSceneAssets();
  renderHistory();
}

function openConversation(sessionId) {
  if (state.busy || sessionId === state.sessionId) return;
  persistCurrentConversation();
  const conversation = state.history.find((item) => item.id === sessionId);
  if (!conversation) return;
  state.sessionId = conversation.id;
  state.sessionTitle = conversation.title || "";
  state.messages = (conversation.messages || []).map((item) => ({ ...item }));
  state.timeline = (conversation.timeline || []).map((item) => ({ ...item }));
  state.plan = conversation.plan || null;
  state.batches = conversation.batches || [];
  state.nodeStates = conversation.nodeStates || {};
  state.activeAgentId = null;
  $("promptTitle").textContent = conversation.title || "What should Robonix do?";
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
  routeOption(mic, "", "Select input primitive");
  routeOption(speaker, "", "Select output primitive");
  (route.micProviders || []).forEach((provider) => {
    routeOption(mic, provider.id, provider.namespace ? `${provider.id} (${provider.namespace})` : provider.id);
  });
  (route.speakerProviders || []).forEach((provider) => {
    routeOption(speaker, provider.id, provider.namespace ? `${provider.id} (${provider.namespace})` : provider.id);
  });
  const micAvailable = (route.micProviders || []).some((provider) => provider.id === savedMic);
  const speakerAvailable = (route.speakerProviders || []).some((provider) => provider.id === savedSpeaker);
  if (savedMic && !micAvailable) routeOption(mic, savedMic, `${savedMic} (unavailable)`);
  if (savedSpeaker && !speakerAvailable) routeOption(speaker, savedSpeaker, `${savedSpeaker} (unavailable)`);
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
  routeOption(select, "", "OS default");
  (result.devices || [])
    .filter((device) => device.kind === wantedKind || device.kind === "duplex")
    .forEach((device) => {
      const suffix = [device.channels ? `${device.channels} ch` : "", device.note || ""].filter(Boolean).join(", ");
      routeOption(select, device.id, suffix ? `${device.name} (${suffix})` : device.name || device.id);
    });
  const devices = result.devices || [];
  const target = devices.some((device) => device.id === saved) ? saved : (current || "");
  select.value = target;
}

async function refreshAudioRoute() {
  const settings = collectSettings();
  if (!settings.atlasEndpoint) return;
  setText("audioRouteStatus", "Discovering audio primitives from Atlas...");
  const route = await fetch("/api/audio-route/providers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ settings }),
  }).then((response) => response.json()).catch((error) => ({ error: String(error) }));
  if (route.error) {
    setText("audioRouteStatus", `Audio route unavailable: ${route.error}`);
    return;
  }
  state.audio.route = { ...state.audio.route, ...route };
  renderAudioRouteProviders(route);
  await Promise.all([loadAudioRouteDevices("mic"), loadAudioRouteDevices("speaker")]);
  state.settings = collectSettings();
  saveSettings();
  setText("audioRouteStatus", "Route loaded. Apply to select devices in their providers.");
}

async function loadAudioRouteDevices(side) {
  const provider = maybe(side === "mic" ? "micNodeId" : "speakerNodeId")?.value || "";
  const select = maybe(side === "mic" ? "micDeviceId" : "speakerDeviceId");
  if (!provider) {
    if (select) {
      clear(select);
      routeOption(select, "", "OS default");
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
    setText("audioRouteStatus", `${provider}: ${result.error}`);
    return;
  }
  if (side === "mic") state.audio.route.micDevices = result.devices || [];
  else state.audio.route.speakerDevices = result.devices || [];
  renderAudioRouteDevices(side, result);
}

async function applyAudioRoute() {
  state.settings = collectSettings();
  saveSettings();
  setText("audioRouteStatus", "Applying selected devices...");
  const result = await fetch("/api/audio-route/apply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ settings: state.settings }),
  }).then((response) => response.json()).catch((error) => ({ error: String(error) }));
  if (!result.ok) {
    setText("audioRouteStatus", `Route apply failed: ${result.error || "unknown error"}`);
    return;
  }
  const count = Array.isArray(result.selected) ? result.selected.length : 0;
  setText("audioRouteStatus", `Route applied to ${count} selected device${count === 1 ? "" : "s"}.`);
  addTimeline("audio", "audio route applied");
}

async function startAudioServer() {
  appendAudioLog("starting client audio device server");
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
      resolve({ ok: false, error: "client audio device server is not discovered; start or check it first" });
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
        done({ ok: false, error: String(event.data || "invalid bridge response") });
      }
    };
    socket.onerror = () => done({ ok: false, error: `cannot connect ${url}` });
    socket.onclose = () => done({ ok: false, error: `closed ${url}` });
  });
}

async function loadAudioDevices() {
  const result = await audioServerOnce("/devices");
  if (!result || result.ok === false) {
    appendAudioLog(`device refresh failed: ${result?.error || "unknown error"}`);
    return;
  }
  state.audio.devices = Array.isArray(result.devices) ? result.devices : [];
  state.audio.inputCurrent = result.input_current ?? result.input_default ?? null;
  state.audio.outputCurrent = result.output_current ?? result.output_default ?? null;
  renderAudioDevices(result);
  appendAudioLog(`loaded ${state.audio.devices.length} audio devices`);
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
    opt.textContent = `#${device.id} ${device.name} (${channels} ch)`;
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
  appendAudioLog(`applying devices ${JSON.stringify(body)}`);
  const result = await audioServerOnce("/set_device", body);
  appendAudioLog(result.ok ? "device selection applied" : `device selection failed: ${result.error || "unknown error"}`);
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
    setText("audioLevelState", "live");
    appendAudioLog("VU connected");
  };
  socket.onmessage = (event) => {
    try {
      const payload = JSON.parse(event.data);
      renderAudioLevel(Number(payload.level || 0));
    } catch (_) {
      renderAudioLevel(0);
    }
  };
  socket.onerror = () => setText("audioLevelState", "offline");
  socket.onclose = () => {
    setText("audioLevelState", "offline");
    state.audio.vuSocket = null;
  };
}

function startAudioLogStream() {
  if (state.audio.logSocket && state.audio.logSocket.readyState <= WebSocket.OPEN) return;
  const url = audioServerWsUrl("/log");
  if (!url) return;
  const socket = new WebSocket(url);
  state.audio.logSocket = socket;
  socket.onopen = () => appendAudioLog("log stream connected");
  socket.onmessage = (event) => appendAudioLog(event.data);
  socket.onerror = () => appendAudioLog("log stream error");
  socket.onclose = () => {
    state.audio.logSocket = null;
  };
}

function renderAudioLevel(level) {
  const raw = Math.max(0, Math.min(1, Number.isFinite(level) ? level : 0));
  const display = Math.max(0, Math.min(1, Math.sqrt(raw) * 2.8));
  if (state.ttsPlaying) {
    document.documentElement.style.setProperty("--voice-level", String(Math.max(0.16, Math.min(0.86, display))));
  }
  state.audio.levelHistory.push(display);
  state.audio.levelHistory = state.audio.levelHistory.slice(-28);
  if (maybe("audioLevelBar")) $("audioLevelBar").style.width = `${Math.round(display * 100)}%`;
  const label = `${Math.round(display * 100)}%`;
  setText("audioLevelText", label);
  if (maybe("audioLevelText")) $("audioLevelText").title = `raw RMS ${raw.toFixed(4)}`;
  renderAudioBars();
}

function setTtsAura(active) {
  state.ttsPlaying = Boolean(active);
  document.body.classList.toggle("tts-speaking", state.ttsPlaying);
  document.documentElement.style.setProperty("--voice-level", state.ttsPlaying ? "0.28" : "0");
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
  setText("audioLogSummary", "Audio device log.");
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
    renderEnroll({ ok: false, error: "Voice ID is required" });
    return;
  }
  $("enrollState").textContent = `recording ${seconds}s`;
  $("enrollVoice").classList.add("busy");
  addTimeline("voiceprint", `recording ${seconds}s for ${userId}`);
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
  addTimeline("audio", "speaker test requested");
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
    ? `speaker ok: played ${result.bytes} bytes via ${result.speakerEndpoint}`
    : `speaker failed: ${result.error}`;
  addMessage(result.ok ? "status" : "error", text);
  addTimeline(result.ok ? "audio" : "error", text);
  renderAudioServer({
    ok: result.ok,
    error: result.error || "",
    url: result.ok ? `tts ${result.ttsEndpoint} / speaker ${result.speakerEndpoint}` : "",
  });
}

function renderEnroll(result) {
  $("enrollState").textContent = result.ok ? "enrolled" : "failed";
  if (result.ok && result.userId) {
    applyVoiceUser(result.userId);
  }
  const text = result.ok
    ? `${result.alreadyEnrolled ? "using existing" : "enrolled"} voice:${result.userId} (${result.bytes} bytes)`
    : `enroll failed: ${result.error}`;
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
  setText("audioServerState", online ? "online" : "offline");
  setText("audioServerSummary", online ? (result.url || result.wsUrl || "Audio device server reachable.") : (result.error || "Client audio device server is offline."));
  const lines = [
    online ? "ok" : "not reachable",
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

function setBusy(value) {
  state.busy = value;
  $("sendButton").classList.toggle("busy", value);
  $("sendButton").textContent = value ? "Steer" : "Send";
  $("sendButton").title = value ? "Steer current task" : "Send task";
  maybe("voiceButton")?.classList.toggle("busy", value);
  document.querySelectorAll("[data-page-action='voice-start']").forEach((button) => {
    button.classList.toggle("busy", value);
    button.textContent = value ? "Voice steer" : "Voice";
    button.title = value ? "Send a voice steer to the current task" : "Start voice session";
  });
}

function beginStream() {
  state.activeStreams += 1;
  setBusy(true);
}

function endStream() {
  state.activeStreams = Math.max(0, state.activeStreams - 1);
  setBusy(state.activeStreams > 0);
}

function setTextAll(selector, text) {
  document.querySelectorAll(selector).forEach((node) => {
    node.textContent = text;
  });
}

function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

init();
