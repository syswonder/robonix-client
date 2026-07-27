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
  planRecords: [],
  taskState: null,
  batches: [],
  nodeStates: {},
  executorPlans: [],
  executorPlansReady: false,
  executorPlanIds: new Set(),
  executorMissingPolls: new Map(),
  selectedActivePlanKey: "",
  selectedHistoryPlanKey: "",
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
  voiceprintCaptureActive: false,
  account: loadAccountSession(),
  robotConnected: false,
  workspacePollersStarted: false,
  conversationDialogId: "",
  confirmAction: null,
  activeVoiceSocket: null,
  activeVoiceMode: "voice",
  ttsPlaying: false,
  handsfree: { available: false, enabled: false, state: "unavailable", busy: false },
  handsfreeSocket: null,
  handsfreeReconnect: null,
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
    testBusy: "",
    outputLevelTarget: 0,
    auraLevel: 0,
    auraFrame: 0,
    reverseConnectProvider: "",
    reverseConnectPromise: null,
    route: { micProviders: [], speakerProviders: [], micDevices: [], speakerDevices: [] },
  },
  voiceprintPreviewUrl: "",
  voiceprintPreviewRequestFor: "",
};

const DEFAULT_ATLAS_PORT = 50051;
const AUDIO_LOG_MAX_LINES = 120;
const AUDIO_LOG_MAX_CHARS = 260;
const PAGE_ROUTES = {
  dashboard: "/chat",
  executions: "/executions",
  logs: "/logs",
  vitals: "/vitals",
  audio: "/audio",
  settings: "/settings",
  profile: "/profile",
  admin: "/admin",
};
const PAGE_TITLES = {
  dashboard: "Tasks",
  executions: "Executions",
  logs: "Logs",
  vitals: "Vitals",
  audio: "Audio",
  settings: "Settings",
  profile: "Profile",
  admin: "Admin Console",
};
const ROUTE_PAGES = Object.fromEntries(
  Object.entries(PAGE_ROUTES).map(([page, route]) => [route, page]),
);
const THEME_STORAGE_KEY = "robonix.theme";
const ACTIVE_CONVERSATION_STORAGE_KEY = "robonix.activeConversationId";
const THEME_PREFERENCES = new Set(["auto", "dark", "light"]);
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

function currentThemePreference() {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  return THEME_PREFERENCES.has(saved) ? saved : "auto";
}

function resolveTheme(preference) {
  return preference === "auto" ? (systemTheme.matches ? "dark" : "light") : preference;
}

function applyTheme(preference, persist = false) {
  const next = THEME_PREFERENCES.has(preference) ? preference : "auto";
  const resolved = resolveTheme(next);
  document.documentElement.dataset.themePreference = next;
  document.documentElement.dataset.theme = resolved;
  document.documentElement.style.colorScheme = resolved;
  if (persist) localStorage.setItem(THEME_STORAGE_KEY, next);
  if (maybe("themePreference")) $("themePreference").value = next;
}

function bindThemeControls() {
  applyTheme(currentThemePreference());
  maybe("themePreference")?.addEventListener("change", (event) => {
    applyTheme(event.currentTarget.value, true);
  });
  systemTheme.addEventListener("change", () => {
    if (currentThemePreference() === "auto") applyTheme("auto");
  });
}

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
  const { authToken, ...settings } = collectSettings();
  localStorage.setItem("robonix.settings", JSON.stringify(settings));
}

function loadAccountSession() {
  try {
    return JSON.parse(sessionStorage.getItem("robonix.account") || "null");
  } catch (_) {
    return null;
  }
}

function saveAccountSession(account) {
  if (account) sessionStorage.setItem("robonix.account", JSON.stringify(account));
  else sessionStorage.removeItem("robonix.account");
}

function resetAccountTransientUi() {
  [
    "profileStatus",
    "passwordStatus",
    "voiceprintStatus",
    "adminStatus",
  ].forEach((id) => setText(id, ""));
  if (state.voiceprintPreviewUrl) URL.revokeObjectURL(state.voiceprintPreviewUrl);
  state.voiceprintPreviewUrl = "";
  state.voiceprintPreviewRequestFor = "";
  const preview = maybe("voiceprintPreview");
  const audio = maybe("voiceprintPreviewAudio");
  const canvas = maybe("voiceprintWaveform");
  if (preview) preview.hidden = true;
  if (audio) {
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
  }
  if (canvas) canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
  setText("voiceprintPreviewMeta", "");
  setText("playVoiceprintPreview", "Play recording");
}

function clearSecretFields() {
  ["loginPassword", "signupPassword", "currentPassword", "newPassword"]
    .forEach((id) => {
      if (maybe(id)) $(id).value = "";
    });
}

async function persistSettings() {
  const settings = collectSettings();
  saveSettings();
  const result = await fetch("/api/settings", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ settings }),
  }).then((response) => response.json()).catch((error) => ({ ok: false, error: String(error) }));
  if (!result.ok) throw new Error(result.error || "settings write failed");
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

function saveActiveConversationId() {
  localStorage.setItem(ACTIVE_CONVERSATION_STORAGE_KEY, state.sessionId);
}

function restoreActiveConversation() {
  const activeId = localStorage.getItem(ACTIVE_CONVERSATION_STORAGE_KEY);
  const conversation = state.history.find((item) => item.id === activeId);
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
  bindThemeControls();
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
    ...persisted,
    ...stored,
  };
  // CLI/environment values are launch defaults, not immutable policy. Stored
  // browser settings must win so changing robot host or audio routing survives
  // a refresh even when the client was initially launched with --robot-host.
  if (defaults.sessionId) state.sessionId = defaults.sessionId;
  if (defaults.sessionTitle) state.sessionTitle = defaults.sessionTitle;
  if (!restoreActiveConversation()) saveActiveConversationId();
  bindSettings();
  bindAuthEvents();
  bindEvents();
  renderAudioBars();
  renderHistory();
  renderMessages();
  renderTimeline();
  renderPlan();
  renderSceneAssets();
  showConnectionStep();
  if (state.account?.sessionToken && state.settings.robotHost) {
    const connected = await connectRobot(true);
    if (connected) {
      const authenticated = await restoreAccount();
      if (authenticated) startWorkspaceMonitoring();
    }
  }
}

function startWorkspaceMonitoring() {
  if (state.workspacePollersStarted) return;
  state.workspacePollersStarted = true;
  refreshSystem();
  refreshActivePlans();
  refreshAudioRoute();
  // The speaking aura is visible on every page, so its physical output-level
  // stream must be connected at startup rather than only after opening Audio.
  checkAudioServer();
  setInterval(() => state.account && refreshSystem(), 7000);
  setInterval(() => state.account && refreshActivePlans(), 2000);
  setInterval(() => state.account && refreshHandsfree(), 2500);
}

function bindSettings() {
  renderConnectionSettings();
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
  if (maybe("authRobotHost")) $("authRobotHost").value = state.settings.robotHost || "";

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

function renderConnectionSettings() {
  if (maybe("robotHost")) $("robotHost").value = state.settings.robotHost || "";
  if (maybe("robotHostSettings")) $("robotHostSettings").value = state.settings.robotHost || "";
  if (maybe("atlasPort")) $("atlasPort").value = state.settings.atlasPort || DEFAULT_ATLAS_PORT;
  if (maybe("atlasPortSettings")) $("atlasPortSettings").value = state.settings.atlasPort || DEFAULT_ATLAS_PORT;
  if (maybe("liaisonEndpoint")) $("liaisonEndpoint").value = state.settings.liaisonEndpoint || "";
  if (maybe("authRobotHost")) $("authRobotHost").value = state.settings.robotHost || "";
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
  state.settings = collectSettings();
  saveSettings();
  if (!persist) {
    setText("settingsStatus", "Changed locally. Select Save to persist.");
    return;
  }
  setText("settingsStatus", "Saving...");
  try {
    const result = await persistSettings();
    setText("settingsStatus", `Saved to ${result.path}.`);
  } catch (error) {
    setText("settingsStatus", `Save failed: ${error}`);
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
    authToken: state.account?.sessionToken || "",
  };
}

function authConnectionSettings() {
  const host = normalizeRobotHost(maybe("authRobotHost")?.value || state.settings.robotHost || "");
  const port = DEFAULT_ATLAS_PORT;
  return {
    ...collectSettings(),
    robotHost: host,
    atlasPort: port,
    atlasEndpoint: buildAtlasEndpoint(host, port),
    liaisonEndpoint: "",
    authToken: state.account?.sessionToken || "",
  };
}

function bindAuthEvents() {
  maybe("connectRobotAction")?.addEventListener("click", () => connectRobot(false));
  maybe("authRobotHost")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      connectRobot(false);
    }
  });
  maybe("changeRobotAction")?.addEventListener("click", () => {
    resetAccountTransientUi();
    state.account = null;
    state.robotConnected = false;
    saveAccountSession(null);
    clearSecretFields();
    showConnectionStep();
  });
  document.querySelectorAll("[data-auth-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-auth-tab]").forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-selected", active ? "true" : "false");
        item.setAttribute("tabindex", active ? "0" : "-1");
      });
      document.querySelectorAll("[data-auth-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.authPanel === button.dataset.authTab));
      setText("authError", "");
    });
  });
  maybe("loginForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    loginAccount();
  });
  maybe("adminLoginAction")?.addEventListener("click", () => loginAccount("admin", true));
  maybe("signupForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    signupAccount();
  });
  maybe("logoutButton")?.addEventListener("click", logoutAccount);
  maybe("profileForm")?.addEventListener("submit", updateOwnProfile);
  maybe("passwordForm")?.addEventListener("submit", changeOwnPassword);
  maybe("replaceVoiceprint")?.addEventListener("click", replaceOwnVoiceprint);
  maybe("removeVoiceprint")?.addEventListener("click", removeOwnVoiceprint);
  maybe("playVoiceprintPreview")?.addEventListener("click", playVoiceprintPreview);
  maybe("refreshAdminUsers")?.addEventListener("click", loadAdminUsers);
}

async function accountFetch(path, payload, method = "POST") {
  const response = await fetch(path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  if (!result.ok) throw new Error(result.error || "Account request failed");
  return result;
}

async function restoreAccount() {
  if (!state.robotConnected) {
    showConnectionStep();
    return false;
  }
  if (!state.account?.sessionToken) {
    showAccountStep();
    return false;
  }
  try {
    const result = await accountFetch("/api/account/profile", {
      settings: { ...authConnectionSettings(), authToken: state.account.sessionToken },
    });
    state.account.user = result.user;
    saveAccountSession(state.account);
    enterAccount();
    return true;
  } catch (_) {
    resetAccountTransientUi();
    state.account = null;
    saveAccountSession(null);
    showAccountStep();
    return false;
  }
}

function showAuth() {
  maybe("authShell")?.classList.remove("auth-hidden");
  maybe("appShell")?.classList.add("auth-hidden");
  if (state.robotConnected) showAccountStep();
  else showConnectionStep();
}

function showConnectionStep() {
  maybe("authShell")?.classList.remove("auth-hidden");
  maybe("appShell")?.classList.add("auth-hidden");
  maybe("robotConnectionStep")?.classList.remove("auth-hidden");
  maybe("accountAccessStep")?.classList.add("auth-hidden");
  setText("authError", "");
  setText("robotConnectionStatus", "");
}

function showAccountStep() {
  maybe("authShell")?.classList.remove("auth-hidden");
  maybe("appShell")?.classList.add("auth-hidden");
  maybe("robotConnectionStep")?.classList.add("auth-hidden");
  maybe("accountAccessStep")?.classList.remove("auth-hidden");
  setText("connectedRobotLabel", `Connected to ${state.settings.robotHost}`);
  setText("authError", "");
}

async function connectRobot(silent = false) {
  const host = normalizeRobotHost(maybe("authRobotHost")?.value || state.settings.robotHost || "");
  if (!host) {
    setText("robotConnectionStatus", "Enter the robot IP address or hostname.");
    return false;
  }
  const button = maybe("connectRobotAction");
  if (button) {
    button.disabled = true;
    button.textContent = "Connecting...";
  }
  if (!silent) setText("robotConnectionStatus", `Connecting to ${host}...`);
  setText("authError", "");
  try {
    const settings = authConnectionSettings();
    const result = await accountFetch("/api/auth/connect", { settings });
    state.settings = {
      ...state.settings,
      robotHost: host,
      atlasPort: DEFAULT_ATLAS_PORT,
      atlasEndpoint: buildAtlasEndpoint(host, DEFAULT_ATLAS_PORT),
    };
    state.robotConnected = true;
    renderConnectionSettings();
    saveSettings();
    setText("robotConnectionStatus", `Connected to ${result.robotHost || host}.`);
    showAccountStep();
    return true;
  } catch (error) {
    state.robotConnected = false;
    setText("robotConnectionStatus", `Connection failed: ${String(error.message || error)}`);
    return false;
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = "Connect";
    }
  }
}

function enterAccount(preferredPage = "") {
  const user = state.account?.user;
  if (!user) return showAuth();
  state.settings = {
    ...state.settings,
    ...authConnectionSettings(),
    authToken: state.account.sessionToken,
    userId: user.userId,
  };
  renderConnectionSettings();
  saveSettings();
  if (maybe("userId")) $("userId").value = user.displayName || user.username;
  if (maybe("settingsUserId")) $("settingsUserId").value = user.userId;
  setText("accountDockName", user.displayName || user.username);
  setText("accountDockRole", user.roles.includes("admin") ? "administrator" : "user");
  document.querySelectorAll(".admin-only").forEach((element) => {
    element.hidden = !user.roles.includes("admin");
  });
  maybe("authShell")?.classList.add("auth-hidden");
  maybe("appShell")?.classList.remove("auth-hidden");
  renderOwnProfile();
  const page = preferredPage || pageFromLocation();
  activatePage(page, { historyMode: "replace" });
  if (page === "admin") loadAdminUsers();
  startWorkspaceMonitoring();
}

async function loginAccount(preferredPage = "", requireAdmin = false) {
  if (!state.robotConnected) {
    showConnectionStep();
    return;
  }
  const usernameId = "loginUsername";
  const passwordId = "loginPassword";
  setText("authError", "");
  try {
    const result = await accountFetch("/api/auth/login", {
      settings: authConnectionSettings(),
      username: $(usernameId).value.trim(),
      password: $(passwordId).value,
    });
    if (requireAdmin && !result.user.roles.includes("admin")) {
      throw new Error("This account does not have administrator access.");
    }
    resetAccountTransientUi();
    state.account = {
      sessionToken: result.sessionToken,
      expiresAtMs: result.expiresAtMs,
      user: result.user,
    };
    clearSecretFields();
    saveAccountSession(state.account);
    enterAccount(preferredPage);
  } catch (error) {
    setText("authError", String(error.message || error));
  }
}

async function signupAccount() {
  if (!state.robotConnected) {
    showConnectionStep();
    return;
  }
  setText("authError", "");
  try {
    const result = await accountFetch("/api/auth/signup", {
      settings: authConnectionSettings(),
      username: $("signupUsername").value.trim(),
      displayName: $("signupDisplayName").value.trim(),
      email: $("signupEmail").value.trim(),
      password: $("signupPassword").value,
    });
    resetAccountTransientUi();
    state.account = {
      sessionToken: result.sessionToken,
      expiresAtMs: result.expiresAtMs,
      user: result.user,
    };
    clearSecretFields();
    maybe("signupForm")?.reset();
    saveAccountSession(state.account);
    enterAccount("profile");
  } catch (error) {
    setText("authError", String(error.message || error));
  }
}

async function logoutAccount() {
  if (state.account?.sessionToken) {
    await accountFetch("/api/auth/logout", {
      settings: { ...collectSettings(), authToken: state.account.sessionToken },
    }).catch(() => null);
  }
  resetAccountTransientUi();
  state.account = null;
  state.robotConnected = true;
  clearSecretFields();
  saveAccountSession(null);
  showAccountStep();
}

function renderOwnProfile() {
  const user = state.account?.user;
  if (!user) return;
  setText("profileHeading", user.displayName || user.username);
  setText("profileUsername", `@${user.username}`);
  setText("profileAvatar", (user.displayName || user.username || "R").slice(0, 1).toUpperCase());
  if (maybe("profileDisplayName")) $("profileDisplayName").value = user.displayName || "";
  if (maybe("profileEmail")) $("profileEmail").value = user.email || "";
  if (maybe("passwordUsername")) $("passwordUsername").value = user.username || "";
  if (maybe("profileBadges")) {
    $("profileBadges").replaceChildren(...[
      ...user.roles.map((role) => badge(role)),
      badge(user.enabled ? "active" : "disabled"),
      badge(user.voiceGuardEnabled ? "voice guard on" : "voice guard off"),
    ]);
  }
  setText(
    "voiceprintSummary",
    user.voiceprintEnrolled
      ? `Voiceprint enrolled. ${user.voiceGuardEnabled ? "Every voice turn must match it." : "Voice guard is currently off."}`
      : `No voiceprint enrolled. ${user.voiceGuardEnabled ? "Voice turns will be rejected until you enroll one." : ""}`,
  );
  if (maybe("removeVoiceprint")) $("removeVoiceprint").disabled = !user.voiceprintEnrolled;
  renderVoiceprintPreview(user.voiceprintEnrolled);
  if (user.voiceprintEnrolled) void refreshVoiceprintPreview(user);
}

function badge(text) {
  const element = document.createElement("span");
  element.className = "profile-badge";
  element.textContent = text;
  return element;
}

async function updateOwnProfile(event) {
  event.preventDefault();
  setText("profileStatus", "Saving...");
  try {
    const result = await accountFetch("/api/account/profile", {
      settings: collectSettings(),
      displayName: $("profileDisplayName").value.trim(),
      email: $("profileEmail").value.trim(),
    }, "PUT");
    state.account.user = result.user;
    saveAccountSession(state.account);
    saveVoiceprintPreview(result);
    renderOwnProfile();
    setText("profileStatus", "Profile saved.");
  } catch (error) {
    setText("profileStatus", String(error.message || error));
  }
}

async function changeOwnPassword(event) {
  event.preventDefault();
  const form = event.currentTarget;
  setText("passwordStatus", "Changing password...");
  try {
    await accountFetch("/api/account/password", {
      settings: collectSettings(),
      currentPassword: $("currentPassword").value,
      newPassword: $("newPassword").value,
    }, "PUT");
    form.reset();
    setText("passwordStatus", "Password changed. Other sessions were signed out.");
  } catch (error) {
    setText("passwordStatus", String(error.message || error));
  }
}

async function replaceOwnVoiceprint() {
  if (state.voiceprintCaptureActive) return;
  if (state.voiceActive || handsfreeOwnsMicrophone()) {
    setText("voiceprintStatus", "Stop the active voice session before recording a voiceprint.");
    return;
  }
  const seconds = Math.min(30, Math.max(2, Number(maybe("profileVoiceSeconds")?.value || 6)));
  const recordButton = maybe("replaceVoiceprint");
  const removeButton = maybe("removeVoiceprint");
  const originalLabel = recordButton?.textContent || "Record / replace";
  state.voiceprintCaptureActive = true;
  if (recordButton) {
    recordButton.disabled = true;
    recordButton.textContent = "Recording...";
  }
  if (removeButton) removeButton.disabled = true;
  const startedAt = Date.now();
  const updateProgress = () => {
    const remaining = Math.max(0, Math.ceil(seconds - (Date.now() - startedAt) / 1000));
    setText("voiceprintStatus", remaining > 0
      ? `Recording voice sample · ${remaining}s remaining`
      : "Saving voiceprint...");
  };
  updateProgress();
  const progressTimer = window.setInterval(updateProgress, 250);
  try {
    const result = await accountFetch("/api/account/voiceprint", {
      settings: collectSettings(),
      seconds,
    });
    state.account.user = result.user;
    saveAccountSession(state.account);
    saveVoiceprintPreview(result);
    renderOwnProfile();
    setText("voiceprintStatus", `Voiceprint saved from ${result.bytes} bytes of audio.`);
  } catch (error) {
    setText("voiceprintStatus", String(error.message || error));
  } finally {
    window.clearInterval(progressTimer);
    state.voiceprintCaptureActive = false;
    if (recordButton) {
      recordButton.disabled = false;
      recordButton.textContent = originalLabel;
    }
    if (removeButton) removeButton.disabled = !state.account?.user?.voiceprintEnrolled;
  }
}

function voiceprintPreviewKey() {
  const userId = state.account?.user?.userId || "";
  return userId ? `robonix.voiceprint-preview.${userId}` : "";
}

function saveVoiceprintPreview(result) {
  const key = voiceprintPreviewKey();
  if (!key || !result.audioPcmBase64) return;
  localStorage.setItem(key, JSON.stringify({
    audioPcmBase64: result.audioPcmBase64,
    sampleRateHz: Number(result.sampleRateHz || 16000),
    seconds: Number(result.seconds || 0),
    bytes: Number(result.bytes || 0),
    savedAt: Number(result.updatedAtMs || result.savedAt || Date.now()),
    peak: Number(result.peak || 0),
    rms: Number(result.rms || 0),
    nonzeroRatio: Number(result.nonzeroRatio || 0),
  }));
}

async function refreshVoiceprintPreview(user) {
  const requestFor = `${user.userId || ""}:${user.updatedAtMs || 0}`;
  if (!user.userId || state.voiceprintPreviewRequestFor === requestFor) return;
  state.voiceprintPreviewRequestFor = requestFor;
  try {
    const result = await accountFetch("/api/account/voiceprint-preview", {
      settings: collectSettings(),
    });
    if (state.account?.user?.userId !== user.userId) return;
    if (result.available && result.audioPcmBase64) {
      saveVoiceprintPreview(result);
      renderVoiceprintPreview(true);
    }
  } catch (_) {
    // Older Keystone deployments may not expose preview audio. Keep the
    // browser-local sample when one exists instead of breaking Profile.
  }
}

function loadVoiceprintPreview() {
  const key = voiceprintPreviewKey();
  if (!key) return null;
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch (_) {
    return null;
  }
}

function clearVoiceprintPreview() {
  const key = voiceprintPreviewKey();
  if (key) localStorage.removeItem(key);
  if (state.voiceprintPreviewUrl) URL.revokeObjectURL(state.voiceprintPreviewUrl);
  state.voiceprintPreviewUrl = "";
  state.voiceprintPreviewRequestFor = "";
}

function decodePcm16(base64) {
  const binary = atob(base64 || "");
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return new Int16Array(bytes.buffer);
}

function pcm16WavBlob(samples, sampleRate) {
  const buffer = new ArrayBuffer(44 + samples.byteLength);
  const view = new DataView(buffer);
  const write = (offset, text) => {
    for (let index = 0; index < text.length; index += 1) view.setUint8(offset + index, text.charCodeAt(index));
  };
  write(0, "RIFF");
  view.setUint32(4, 36 + samples.byteLength, true);
  write(8, "WAVE");
  write(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  write(36, "data");
  view.setUint32(40, samples.byteLength, true);
  new Uint8Array(buffer, 44).set(new Uint8Array(samples.buffer, samples.byteOffset, samples.byteLength));
  return new Blob([buffer], { type: "audio/wav" });
}

function renderVoiceprintPreview(enrolled) {
  const root = maybe("voiceprintPreview");
  const canvas = maybe("voiceprintWaveform");
  const audio = maybe("voiceprintPreviewAudio");
  if (!root || !canvas || !audio) return;
  const preview = enrolled ? loadVoiceprintPreview() : null;
  root.hidden = !preview?.audioPcmBase64;
  if (!preview?.audioPcmBase64) return;
  const samples = decodePcm16(preview.audioPcmBase64);
  const sampleRate = Number(preview.sampleRateHz || 16000);
  if (state.voiceprintPreviewUrl) URL.revokeObjectURL(state.voiceprintPreviewUrl);
  state.voiceprintPreviewUrl = URL.createObjectURL(pcm16WavBlob(samples, sampleRate));
  audio.src = state.voiceprintPreviewUrl;
  setText(
    "voiceprintPreviewMeta",
    [
      `${Number(preview.seconds || samples.length / sampleRate).toFixed(1)} s`,
      `peak ${(Number(preview.peak || 0) / 32768 * 100).toFixed(1)}%`,
      `saved ${new Date(preview.savedAt).toLocaleString()}`,
    ].join(" · "),
  );
  requestAnimationFrame(() => drawVoiceprintWaveform(canvas, samples));
}

function drawVoiceprintWaveform(canvas, samples) {
  const width = Math.max(320, Math.floor(canvas.clientWidth || 640));
  const height = Math.max(72, Math.floor(canvas.clientHeight || 88));
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  const context = canvas.getContext("2d");
  context.scale(ratio, ratio);
  context.clearRect(0, 0, width, height);
  context.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--cyan").trim();
  context.lineWidth = 1.5;
  context.beginPath();
  const columns = Math.max(1, width);
  const stride = Math.max(1, Math.floor(samples.length / columns));
  const peaks = new Float32Array(columns);
  let recordingPeak = 0;
  for (let x = 0; x < columns; x += 1) {
    let peak = 0;
    const start = x * stride;
    const end = Math.min(samples.length, start + stride);
    for (let index = start; index < end; index += 1) peak = Math.max(peak, Math.abs(samples[index]) / 32768);
    peaks[x] = peak;
    recordingPeak = Math.max(recordingPeak, peak);
  }
  const displayGain = recordingPeak > 0 ? 0.86 / recordingPeak : 1;
  for (let x = 0; x < columns; x += 1) {
    const extent = Math.max(1, peaks[x] * displayGain * (height / 2 - 3));
    context.moveTo(x + 0.5, height / 2 - extent);
    context.lineTo(x + 0.5, height / 2 + extent);
  }
  context.stroke();
}

async function playVoiceprintPreview() {
  const audio = maybe("voiceprintPreviewAudio");
  if (!audio?.src) return;
  if (!audio.paused) {
    audio.pause();
    audio.currentTime = 0;
    setText("playVoiceprintPreview", "Play recording");
    return;
  }
  await audio.play();
  setText("playVoiceprintPreview", "Stop");
  audio.onended = () => setText("playVoiceprintPreview", "Play recording");
}

async function removeOwnVoiceprint() {
  openConfirmAction({
    title: "Remove voiceprint?",
    message: "Your saved voice identity will be removed from this robot.",
    confirmLabel: "Remove voiceprint",
    danger: true,
    onConfirm: performRemoveOwnVoiceprint,
  });
}

async function performRemoveOwnVoiceprint() {
  setText("voiceprintStatus", "Removing voiceprint...");
  try {
    const result = await accountFetch("/api/account/voiceprint", {
      settings: collectSettings(),
    }, "DELETE");
    state.account.user = result.user;
    saveAccountSession(state.account);
    renderOwnProfile();
    setText("voiceprintStatus", "Voiceprint removed.");
  } catch (error) {
    setText("voiceprintStatus", String(error.message || error));
  }
}

async function loadAdminUsers() {
  if (!state.account?.user?.roles.includes("admin")) return;
  setText("adminStatus", "Loading users...");
  try {
    const result = await accountFetch("/api/admin/users", { settings: collectSettings() });
    renderAdminUsers(result.users);
    setText("adminStatus", "");
  } catch (error) {
    setText("adminStatus", String(error.message || error));
  }
}

function renderAdminUsers(users) {
  setText("adminSummary", `${users.length} account${users.length === 1 ? "" : "s"} · ${users.filter((user) => user.enabled).length} enabled · ${users.filter((user) => user.roles.includes("admin")).length} administrators`);
  const list = maybe("adminUserList");
  if (!list) return;
  list.replaceChildren(...users.map((user) => adminUserCard(user)));
}

function adminUserCard(user) {
  const card = document.createElement("article");
  card.className = "admin-user-card";
  const identity = document.createElement("div");
  identity.className = "admin-user-identity";
  const avatar = document.createElement("span");
  avatar.textContent = (user.displayName || user.username).slice(0, 1).toUpperCase();
  const copy = document.createElement("div");
  const name = document.createElement("strong");
  name.textContent = user.displayName || user.username;
  const meta = document.createElement("small");
  meta.textContent = `@${user.username}${user.email ? ` · ${user.email}` : ""}`;
  copy.append(name, meta);
  identity.append(avatar, copy);

  const controls = document.createElement("div");
  controls.className = "admin-user-controls";
  const enabled = adminToggle("Enabled", user.enabled);
  const admin = adminToggle("Administrator", user.roles.includes("admin"));
  const voiceGuard = adminToggle("Voice guard", user.voiceGuardEnabled);
  const save = button("Save", "button");
  save.addEventListener("click", async () => {
    setText("adminStatus", `Saving ${user.username}...`);
    try {
      await accountFetch("/api/admin/users", {
        settings: collectSettings(),
        targetUserId: user.userId,
        enabled: enabled.input.checked,
        roles: admin.input.checked ? ["user", "admin"] : ["user"],
        voiceGuardEnabled: voiceGuard.input.checked,
      }, "PUT");
      await loadAdminUsers();
    } catch (error) {
      setText("adminStatus", String(error.message || error));
    }
  });
  const resetVoice = button("Reset voiceprint", "ghost-button");
  resetVoice.disabled = !user.voiceprintEnrolled;
  resetVoice.addEventListener("click", () => adminResetVoiceprint(user));
  const remove = button("Delete", "ghost-button danger-text");
  remove.disabled = user.userId === state.account.user.userId;
  remove.addEventListener("click", () => adminDeleteUser(user));
  controls.append(enabled.label, admin.label, voiceGuard.label, save, resetVoice, remove);
  card.append(identity, controls);
  return card;
}

function adminToggle(labelText, checked) {
  const label = document.createElement("label");
  label.className = "admin-toggle";
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = Boolean(checked);
  input.setAttribute("aria-label", labelText);
  const text = document.createElement("span");
  text.textContent = labelText;
  label.append(input, text);
  return { label, input };
}

function button(label, className) {
  const element = document.createElement("button");
  element.type = "button";
  element.className = className;
  element.textContent = label;
  return element;
}

function openConfirmAction({
  title,
  message,
  confirmLabel = "Confirm",
  danger = false,
  onConfirm,
}) {
  const dialog = maybe("confirmActionDialog");
  const accept = maybe("acceptConfirmAction");
  if (!dialog || !accept) return;
  state.confirmAction = typeof onConfirm === "function" ? onConfirm : null;
  setText("confirmActionTitle", title || "Confirm action");
  setText("confirmActionMessage", message || "");
  accept.textContent = confirmLabel;
  accept.classList.toggle("danger-action", Boolean(danger));
  accept.disabled = false;
  dialog.showModal();
  requestAnimationFrame(() => accept.focus());
}

function closeConfirmAction() {
  const dialog = maybe("confirmActionDialog");
  state.confirmAction = null;
  if (dialog?.open) dialog.close();
}

async function acceptConfirmAction() {
  const action = state.confirmAction;
  const dialog = maybe("confirmActionDialog");
  const accept = maybe("acceptConfirmAction");
  if (!action || !dialog || !accept) return closeConfirmAction();
  state.confirmAction = null;
  accept.disabled = true;
  try {
    await action();
    dialog.close();
  } finally {
    accept.disabled = false;
  }
}

async function adminResetVoiceprint(user) {
  openConfirmAction({
    title: "Reset voiceprint?",
    message: `${user.displayName || user.username}'s saved voice identity will be removed.`,
    confirmLabel: "Reset voiceprint",
    danger: true,
    onConfirm: () => performAdminResetVoiceprint(user),
  });
}

async function performAdminResetVoiceprint(user) {
  try {
    await accountFetch("/api/admin/users/reset-voiceprint", {
      settings: collectSettings(),
      targetUserId: user.userId,
    });
    await loadAdminUsers();
  } catch (error) {
    setText("adminStatus", String(error.message || error));
  }
}

async function adminDeleteUser(user) {
  openConfirmAction({
    title: "Delete account?",
    message: `@${user.username} and its saved credentials will be permanently removed.`,
    confirmLabel: "Delete account",
    danger: true,
    onConfirm: () => performAdminDeleteUser(user),
  });
}

async function performAdminDeleteUser(user) {
  try {
    await accountFetch("/api/admin/users/delete", {
      settings: collectSettings(),
      targetUserId: user.userId,
    });
    await loadAdminUsers();
  } catch (error) {
    setText("adminStatus", String(error.message || error));
  }
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
    startVoice();
  });
  $("stopButton").addEventListener("click", stopCurrentTask);
  $("refreshSystem").addEventListener("click", refreshSystem);
  maybe("handsfreeToggle")?.addEventListener("click", toggleHandsfree);
  document.querySelectorAll("[data-new-session]").forEach((button) => {
    button.addEventListener("click", newSession);
  });
  $("renameSession").addEventListener("click", () => renameConversation(state.sessionId));
  maybe("cancelRenameConversation")?.addEventListener("click", () => maybe("renameConversationDialog")?.close());
  maybe("confirmRenameConversation")?.addEventListener("click", confirmConversationRename);
  maybe("cancelDeleteConversation")?.addEventListener("click", () => maybe("deleteConversationDialog")?.close());
  maybe("confirmDeleteConversation")?.addEventListener("click", confirmConversationDelete);
  maybe("cancelConfirmAction")?.addEventListener("click", closeConfirmAction);
  maybe("acceptConfirmAction")?.addEventListener("click", acceptConfirmAction);
  $("clearHistory").addEventListener("click", clearHistory);
  document.addEventListener("click", (event) => {
    if (event.target.closest(".history-menu, .history-menu-trigger")) return;
    document.querySelectorAll(".history-menu.open").forEach((menu) => menu.classList.remove("open"));
    document.querySelectorAll(".history-menu-trigger[aria-expanded='true']").forEach((trigger) => {
      trigger.setAttribute("aria-expanded", "false");
    });
  });
  maybe("eventLogFilter")?.addEventListener("input", renderTimeline);
  maybe("clearEventLogFilter")?.addEventListener("click", () => {
    if (maybe("eventLogFilter")) $("eventLogFilter").value = "";
    renderTimeline();
    maybe("eventLogFilter")?.focus();
  });
  maybe("rtdlHistorySearch")?.addEventListener("input", filterExecutionWorkspaces);
  maybe("activeRtdlSearch")?.addEventListener("input", filterExecutionWorkspaces);
  document.querySelectorAll("[data-execution-tab]").forEach((tab) => {
    tab.addEventListener("click", () => activateExecutionPanel(tab.dataset.executionTab));
  });
  maybe("startAudioServer")?.addEventListener("click", startAudioServer);
  maybe("checkAudioServer")?.addEventListener("click", checkAudioServer);
  maybe("refreshAudioDevices")?.addEventListener("click", loadAudioDevices);
  maybe("refreshAudioRoute")?.addEventListener("click", refreshAudioRoute);
  maybe("applyAudioRoute")?.addEventListener("click", applyAudioRoute);
  maybe("micNodeId")?.addEventListener("change", () => loadAudioRouteDevices("mic"));
  maybe("speakerNodeId")?.addEventListener("change", () => loadAudioRouteDevices("speaker"));
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
  maybe("openActiveRtdl")?.addEventListener("click", openActiveRtdl);
  window.addEventListener("popstate", () => {
    if (state.account) activatePage(pageFromLocation(), { historyMode: "none" });
  });
}

function openActiveRtdl() {
  activatePage("executions");
  activateExecutionPanel("active");
  refreshActivePlans();
}

function openRtdlHistory() {
  activatePage("executions");
  activateExecutionPanel("history");
}

function activateExecutionPanel(requestedName) {
  const name = requestedName === "history" ? "history" : "active";
  document.querySelectorAll("[data-execution-tab]").forEach((tab) => {
    const active = tab.dataset.executionTab === name;
    tab.setAttribute("aria-selected", active ? "true" : "false");
    tab.setAttribute("tabindex", active ? "0" : "-1");
    tab.classList.toggle("active", active);
  });
  document.querySelectorAll("[data-execution-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.executionPanel === name);
  });
}

async function configureReverseAudio(providerId) {
  if (!providerId) return { ok: false, skipped: true };
  if (
    state.audio.reverseConnectPromise
    && state.audio.reverseConnectProvider === providerId
  ) {
    return state.audio.reverseConnectPromise;
  }
  state.audio.reverseConnectProvider = providerId;
  state.audio.reverseConnectPromise = fetch("/api/audio-reverse/connect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ settings: collectSettings(), providerId }),
  }).then((r) => r.json()).catch((error) => ({ ok: false, error: String(error) }));
  const result = await state.audio.reverseConnectPromise;
  state.audio.reverseConnectPromise = null;
  appendAudioLog(result.ok ? `reverse audio target ${result.target}` : `reverse audio error: ${result.error || "unknown"}`);
  if (result.errorCode === "audio_client_conflict") {
    addMessage("error", result.error, "Audio");
  }
  return result;
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
    addStatusLine("Stop the active F2 voice session before changing hands-free mode.");
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
        : status === "suspended"
          ? "Voice steer recording"
        : state.handsfree.enabled
          ? `Hands-free ${status}`
          : "Hands-free off";
  button.title = state.handsfree.lastError || state.handsfree.error || (state.handsfree.keyword
    ? `Last wake phrase: ${state.handsfree.keyword}`
    : "Robot-local wake phrase configured by Speech");
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
  const title = state.ttsPlaying
      ? "Interrupt speech and start a new voice turn"
      : state.voiceActive
        ? "Voice recording is already active"
        : "Start voice session";
  document.querySelectorAll("[data-page-action='voice-start']").forEach((button) => {
    button.toggleAttribute("disabled", disabled);
    button.title = title;
  });
  syncAudioTestControls();
  const handsfree = maybe("handsfreeToggle");
  if (handsfree) handsfree.toggleAttribute("disabled", state.voiceActive || state.handsfree.busy);
}

function syncAudioTestControls() {
  const micTest = maybe("testMicrophone");
  const speakerTest = maybe("testSpeaker");
  if (!micTest || !speakerTest) return;
  const busy = Boolean(state.audio.testBusy);
  const micInUse = handsfreeOwnsMicrophone() || state.voiceActive;
  micTest.toggleAttribute("disabled", busy);
  speakerTest.toggleAttribute("disabled", busy);
  micTest.textContent = state.audio.testBusy === "microphone"
    ? "Testing..."
    : micInUse
      ? "Check live input"
      : "Test microphone";
  speakerTest.textContent = state.audio.testBusy === "speaker"
    ? "Playing..."
    : "Test speaker";
  micTest.title = busy
    ? "Wait for the current audio test to finish."
    : micInUse
      ? "The microphone is already live. Check its current input level without interrupting voice interaction."
      : "Capture one second through the selected Robonix microphone route.";
  speakerTest.title = busy
    ? "Wait for the current audio test to finish."
    : "Play a test phrase through the selected Robonix speaker route.";
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
    addStatusLine("Watching robot hands-free interaction.");
  };
  socket.onmessage = (message) => {
    const payload = JSON.parse(message.data);
    if (payload.type === "voice_event") handleVoiceEvent(payload.event);
    if (payload.type === "accepted") addTimeline("voice", "hands-free event stream connected");
    if (payload.type === "error") addMessage("error", payload.error || "hands-free event stream failed");
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
  // The composer reserves a stable row and lets the field scroll internally
  // instead of resizing the whole page and pushing actions below the viewport.
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
    pill.title = "Remove attachment";
    pill.textContent = item.name;
    pill.addEventListener("click", () => {
      state.attachments.splice(index, 1);
      renderAttachments();
    });
    strip.appendChild(pill);
  });
}

function pageFromLocation() {
  const path = location.pathname.length > 1
    ? location.pathname.replace(/\/+$/, "")
    : location.pathname;
  return ROUTE_PAGES[path] || "dashboard";
}

function activatePage(requestedName, { historyMode = "push" } = {}) {
  const isAdmin = Boolean(state.account?.user?.roles?.includes("admin"));
  const name = PAGE_ROUTES[requestedName] && (requestedName !== "admin" || isAdmin)
    ? requestedName
    : "dashboard";
  let activePageButton = null;
  document.querySelectorAll("[data-page]").forEach((button) => {
    const isActive = button.dataset.page === name;
    button.classList.toggle("active", isActive);
    if (isActive) activePageButton = button;
  });
  document.querySelectorAll("[data-page-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.pagePanel === name));
  setText("topPageTitle", PAGE_TITLES[name] || "Robonix Client");
  if (activePageButton && matchMedia("(max-width: 980px)").matches) {
    requestAnimationFrame(() => activePageButton.scrollIntoView({ block: "nearest", inline: "nearest" }));
  }
  const route = PAGE_ROUTES[name];
  if (historyMode !== "none" && location.pathname !== route) {
    const method = historyMode === "replace" ? "replaceState" : "pushState";
    history[method]({ page: name }, "", route);
  }
  if (name === "audio") {
    checkAudioServer();
  } else if (name === "executions") {
    activateExecutionPanel(
      document.querySelector("[data-execution-tab].active")?.dataset.executionTab || "active",
    );
    refreshActivePlans();
  } else if (name === "profile") {
    renderOwnProfile();
  } else if (name === "admin") {
    loadAdminUsers();
  }
}

function newSession() {
  if (state.busy) {
    addStatusLine("Stop the current task before starting a new session.");
    return;
  }
  persistCurrentConversation();
  state.sessionId = getSessionId();
  state.activeTurnId = "";
  state.activePilotSessionId = "";
  state.sessionTitle = "";
  state.messages = [];
  state.timeline = [];
  state.plan = null;
  state.planRecords = [];
  state.selectedActivePlanKey = "";
  state.selectedHistoryPlanKey = "";
  state.batches = [];
  state.nodeStates = {};
  state.activeAgentId = null;
  state.sessionTitle = "Untitled chat";
  $("promptTitle").textContent = "What should Robonix do?";
  renderMessages();
  renderTimeline();
  renderPlan();
  renderSceneAssets();
  persistCurrentConversation("Untitled chat", true);
  renderHistory();
}

async function sendTask() {
  const text = $("taskInput").value.trim();
  const attachments = state.attachments.slice();
  if (!text && attachments.length === 0) return;

  // A still-closing WebSocket or TTS tail is not an active Pilot turn. Only
  // mark input as steer while Pilot has task state that can actually accept it.
  const wasBusy = hasActiveTurn();
  state.activeVoiceMode = wasBusy ? "voice steer" : "voice";
  const display = text || attachments.map((item) => item.name).join(", ");
  addMessage("user", display, wasBusy ? "steer" : (attachments.length ? `${attachments.length} image` : ""), attachments);
  addStatusLine(wasBusy ? "Queued steer input; waiting for Pilot to react." : "Submitted task; waiting for Pilot stream.");
  addTimeline(wasBusy ? "steer" : "task", wasBusy ? `steer: ${display}` : `task: ${display}`);
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
  button.textContent = "Stopping";
  addStatusLine("Stop requested; canceling the current task and any running action.");
  addTimeline("cancel", `abort requested${state.activeTurnId ? ` for ${state.activeTurnId}` : ""}`);

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
  $("stopButton").textContent = "Stop";
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

function startVoice() {
  if (state.voiceActive) {
    addStatusLine("Voice recording is already active.");
    return;
  }
  const wasBusy = hasActiveTurn();
  state.voiceActive = true;
  document.querySelectorAll("[data-page-action='voice-start']").forEach((button) => button.classList.add("active"));
  if (maybe("voiceState")) $("voiceState").textContent = "recording";
  addStatusLine(wasBusy ? "Listening for voice steer input." : "Listening for voice input.");
  addTimeline(wasBusy ? "voice steer" : "voice", wasBusy ? "voice steer requested" : "voice session requested");
  const socket = new WebSocket(wsUrl("/ws/voice"));
  beginStream(socket);
  socket.robonixVoiceMode = wasBusy ? "voice steer" : "voice";
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
    }
    endStream(socket);
    if (ownsCapture) finishVoiceCaptureUi();
    syncVoiceControls();
  }, socket);
  syncVoiceControls();
}

function wireStream(socket, done, voiceSocket = null) {
  socket.onmessage = (event) => {
    const payload = JSON.parse(event.data);
    if (payload.type === "pilot_event") handlePilotEvent(payload.event);
    if (payload.type === "voice_event") handleVoiceEvent(payload.event, voiceSocket);
    if (payload.type === "accepted") addStatusLine("Connected; waiting for Robonix events.");
    if (payload.type === "status") addTimeline("status", payload.message || "status");
    if (payload.type === "error") addMessage("error", payload.error);
    if (payload.type === "done") {
      socket.robonixDone = true;
      socket.close();
    }
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
    upsertPlanRecord(event.plan);
    announcePlan(event.plan);
    addTimeline("plan", `live round ${event.plan.round}: ${planCalls(event.plan).length} call(s)`);
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
    addTimeline(event.batchResult.anyFailed ? "error" : "result", `round ${event.batchResult.round} result`);
    renderPlan();
    persistCurrentConversation();
  } else if (event.kind === "node_state" && event.nodeState) {
    state.nodeStates[String(event.nodeState.nodeIndex)] = event.nodeState;
    updatePlanRecordResult(event.nodeState.planId, (record) => {
      record.nodeStates[String(event.nodeState.nodeIndex)] = event.nodeState;
    });
    addTimeline(event.nodeState.state === "FAILED" ? "error" : "status", `${event.nodeState.opId || `node ${event.nodeState.nodeIndex}`} ${event.nodeState.state}`);
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
    addTimeline("status", event.taskState.status || event.taskState.goal || "task update");
    addStatusLine(event.taskState.status || event.taskState.goal || "Task state updated.");
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
    addTimeline("status", event.status.message || `state ${event.status.state}`);
    if (event.status.message) addStatusLine(event.status.message);
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
  if (event.kind === "asr_final") {
    const mode = sourceSocket?.robonixVoiceMode || (hasActiveTurn() ? "voice steer" : "voice");
    addMessage("user", event.text, mode);
    if (sourceSocket && state.activeVoiceSocket === sourceSocket) {
      state.activeVoiceSocket = null;
      state.voiceActive = false;
      finishVoiceCaptureUi();
      syncVoiceControls();
    }
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
    if (sourceSocket && state.activeVoiceSocket === sourceSocket) {
      state.activeVoiceSocket = null;
      state.voiceActive = false;
      finishVoiceCaptureUi();
      syncVoiceControls();
      if (sourceSocket.readyState === WebSocket.OPEN) {
        sourceSocket.close(1000, "voice request failed");
      }
    }
  } else {
    addTimeline("voice", label);
  }
}

function finishVoiceCaptureUi() {
  document.querySelectorAll("[data-page-action='voice-start']").forEach((button) => button.classList.remove("active"));
  if (maybe("voiceState")) $("voiceState").textContent = "ready";
}

function hasActiveTurn() {
  if (state.activeTurnId) return true;
  const status = String(state.taskState?.status || "").trim().toLowerCase();
  return state.taskRunning || ["in_progress", "running", "planning", "executing"].includes(status);
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
      action.className = "ghost-button message-link";
      action.textContent = "Show RTDL";
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
  const query = String(maybe("eventLogFilter")?.value || "").trim().toLocaleLowerCase();
  const rows = query
    ? state.timeline.filter((item) => (
      `${item.kind || ""} ${item.text || ""} ${item.at || ""}`
        .toLocaleLowerCase()
        .includes(query)
    ))
    : state.timeline;
  document.querySelectorAll("[data-event-list]").forEach((root) => {
    clear(root);
    if (!rows.length) {
      const empty = document.createElement("div");
      empty.className = "event-empty";
      empty.textContent = query ? "No events match this filter." : "No task events yet.";
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
  const roots = document.querySelectorAll("[data-plan-tree]");
  roots.forEach((root) => clear(root));
  const records = normalizedPlanRecords();
  const activeRecords = records.filter((record) => recordIsActive(record));
  const selectedActiveRecord = activeRecords.find(
    (record) => record.key === state.selectedActivePlanKey,
  );
  const latestRecord = selectedActiveRecord || activeRecords[0] || null;
  state.selectedActivePlanKey = latestRecord?.key || "";
  const historyRecords = records.filter((record) => !activeRecords.includes(record));
  const latestCalls = planCalls(latestRecord?.plan).length;
  setTextAll("[data-plan-summary]", latestRecord
    ? `${activeRecords.length} active · plan ${latestRecord.plan.planId || "-"} · round ${latestRecord.plan.round} · ${latestCalls} call(s)`
    : "No RTDL tree is currently executing");
  if (maybe("rtdlHistoryCount")) $("rtdlHistoryCount").textContent = String(historyRecords.length);
  renderGoalPanel();
  renderSceneAssets();
  if (!latestRecord) {
    roots.forEach((root) => {
      const empty = document.createElement("div");
      empty.className = "plan-empty";
      empty.textContent = "No RTDL plan in this session yet.";
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
  label.textContent = `Plan ${record.plan.planId || "-"} · round ${record.plan.round}`;
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
  const selected = records.find((record) => record.key === state.selectedHistoryPlanKey)
    || records[0]
    || null;
  state.selectedHistoryPlanKey = selected?.key || "";
  records.forEach((record) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = `history-plan-option${record.key === state.selectedHistoryPlanKey ? " active" : ""}`;
    const title = document.createElement("strong");
    title.textContent = record.plan.description || `Plan ${record.plan.planId || "-"}`;
    const meta = document.createElement("span");
    const callCount = planCalls(record.plan).length;
    meta.textContent = `round ${record.plan.round || 0} · ${callCount} call${callCount === 1 ? "" : "s"}`;
    option.append(title, meta);
    option.addEventListener("click", () => {
      state.selectedHistoryPlanKey = record.key;
      renderPlanHistory(records);
    });
    root.appendChild(option);
  });
  if (!records.length) {
    const empty = document.createElement("div");
    empty.className = "plan-empty";
    empty.textContent = "No completed RTDL trees yet.";
    root.appendChild(empty);
  }
  renderSelectedHistoryPlan(selected);
  filterExecutionWorkspaces();
}

function renderSelectedHistoryPlan(record) {
  const root = maybe("historyGraphTree");
  if (!root) return;
  const workspace = root.closest(".execution-workspace");
  workspace?.classList.toggle("history-empty", !record);
  clear(root);
  if (!record) {
    setText("historyGraphSummary", "No execution history yet");
    const empty = document.createElement("div");
    empty.className = "history-empty-state";
    const heading = document.createElement("h2");
    heading.textContent = "No execution history yet";
    const copy = document.createElement("p");
    copy.textContent = "Completed RTDL plans will appear here automatically.";
    empty.append(heading, copy);
    root.appendChild(empty);
    renderHistoryExecutionDetail(null, "PENDING");
    return;
  }
  const callCount = planCalls(record.plan).length;
  setText(
    "historyGraphSummary",
    `Plan ${record.plan.planId || "-"} · round ${record.plan.round || 0} · ${callCount} call${callCount === 1 ? "" : "s"}`,
  );
  renderPlanRecord(root, record, renderHistoryExecutionDetail);
  const maps = buildResultMaps(record);
  const firstNode = record.plan.nodes.find((node) => node.call) || record.plan.nodes[0] || null;
  if (firstNode) {
    renderHistoryExecutionDetail(
      firstNode,
      aggregateNodeStatus(firstNode, record.plan, maps, null),
      resultForNode(firstNode, maps),
    );
  } else {
    renderHistoryExecutionDetail(null, "PENDING");
  }
}

function filterExecutionWorkspaces() {
  const historyQuery = String(maybe("rtdlHistorySearch")?.value || "")
    .trim()
    .toLocaleLowerCase();
  document.querySelectorAll("#rtdlHistoryTrees .history-plan-option").forEach((record) => {
    record.hidden = Boolean(historyQuery)
      && !record.textContent.toLocaleLowerCase().includes(historyQuery);
  });

  const activeQuery = String(maybe("activeRtdlSearch")?.value || "")
    .trim()
    .toLocaleLowerCase();
  document.querySelectorAll("#activeRtdlList .active-rtdl-card").forEach((record) => {
    record.hidden = Boolean(activeQuery)
      && !record.textContent.toLocaleLowerCase().includes(activeQuery);
  });
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
    title.textContent = treeRoots.length > 1 ? `Tree ${treeIndex + 1}: ${nodeLabel(treeRoot)}` : nodeLabel(treeRoot);
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
  if (["failed", "failure", "error", "canceled", "cancelled", "timeout", "aborted"].includes(raw)) return "failed";
  if (raw === "running" || raw === "in_progress" || raw === "active") return "running";
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
    renderActivePlans("Set Robot Host first.");
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
    renderActivePlans(result.error || "Executor query unavailable.");
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
  const root = maybe("activeRtdlList");
  const count = maybe("activeRtdlCount");
  const summary = maybe("activeRtdlSummary");
  const modalSummary = maybe("activeRtdlModalSummary");
  if (!root || !count) return;
  clear(root);
  if (error) {
    count.textContent = "unavailable";
    if (summary) summary.textContent = "Executor state unavailable";
    if (modalSummary) modalSummary.textContent = "Live Executor query failed";
    const row = document.createElement("div");
    row.className = "active-rtdl-empty error";
    row.textContent = error;
    root.appendChild(row);
    return;
  }
  const planCount = state.executorPlans.length;
  count.textContent = String(planCount);
  if (summary) summary.textContent = planCount ? `${planCount} running · open live workspace` : "No plans running";
  if (modalSummary) modalSummary.textContent = `${planCount} live plan${planCount === 1 ? "" : "s"} reported by Executor`;
  if (!state.executorPlans.length) {
    const row = document.createElement("div");
    row.className = "active-rtdl-empty";
    row.textContent = "Executor reports no active RTDL plans.";
    root.appendChild(row);
    return;
  }
  const activeRecords = normalizedPlanRecords().filter((record) => recordIsActive(record));
  if (!activeRecords.some((record) => record.key === state.selectedActivePlanKey)) {
    state.selectedActivePlanKey = activeRecords[0]?.key || "";
  }
  state.executorPlans.forEach((plan) => {
    const card = document.createElement("article");
    card.className = `active-rtdl-card${plan.cancelled ? " canceling" : ""}`;
    const matchingRecord = normalizedPlanRecords().find(
      (record) => String(record.plan?.planId || "") === String(plan.planId || ""),
    );
    if (matchingRecord) {
      card.classList.add("selectable");
      card.classList.toggle("selected", matchingRecord.key === state.selectedActivePlanKey);
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      const selectPlan = () => {
        state.selectedActivePlanKey = matchingRecord.key;
        renderActivePlans();
        renderPlan();
      };
      card.addEventListener("click", selectPlan);
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectPlan();
        }
      });
    }
    const header = document.createElement("header");
    header.className = "active-rtdl-card-header";
    const body = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = plan.description || `Plan ${plan.planId}`;
    const meta = document.createElement("span");
    const runningOps = (plan.ops || []).filter((op) => op.state === "running").length;
    meta.textContent = `plan ${plan.planId} · ${runningOps}/${plan.opCount} running`;
    body.append(title, meta);
    const statePill = document.createElement("span");
    statePill.className = `status ${plan.cancelled ? "ended" : "running"}`;
    statePill.textContent = plan.cancelled ? "CANCELING" : "RUNNING";
    header.append(body, statePill);
    card.appendChild(header);

    const ops = document.createElement("div");
    ops.className = "active-rtdl-ops";
    const planOps = Array.isArray(plan.ops) ? plan.ops : [];
    if (!planOps.length) {
      const empty = document.createElement("span");
      empty.className = "active-rtdl-empty";
      empty.textContent = "No operation details reported.";
      ops.appendChild(empty);
    } else {
      planOps.forEach((op) => {
        const opRow = document.createElement("div");
        opRow.className = "active-rtdl-op";
        const opMain = document.createElement("div");
        opMain.className = "active-rtdl-op-main";
        const opTitle = document.createElement("strong");
        opTitle.textContent = op.description || `Operation ${op.op_id || "-"}`;
        const opMeta = document.createElement("span");
        opMeta.textContent = `op ${op.op_id || "-"} · ${op.kind || "do"}`;
        opMain.append(opTitle, opMeta);
        const target = document.createElement("div");
        target.className = "active-rtdl-op-target";
        target.textContent = op.provider_id || op.contract_id
          ? `${op.provider_id || "?"} · ${op.contract_id || "operator"}`
          : "operator node";
        target.title = target.textContent;
        const opState = document.createElement("span");
        const stateName = String(op.state || "pending").toLowerCase();
        opState.className = `status ${stateName}`;
        opState.textContent = stateName.toUpperCase();
        opRow.append(opMain, target, opState);
        ops.appendChild(opRow);
      });
    }
    card.appendChild(ops);
    root.appendChild(card);
  });
  filterExecutionWorkspaces();
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

function renderHistoryExecutionDetail(node, status, nodeState = null) {
  if (!maybe("historyActiveProvider")) return;
  if (maybe("historyExecutionDetailTitle")) {
    $("historyExecutionDetailTitle").textContent = node ? nodeLabel(node) : "Node detail";
  }
  if (!node) {
    if (maybe("historyExecutionDetailTitle")) {
      $("historyExecutionDetailTitle").textContent = "No execution details";
    }
    setText("historyExecutionDetailSummary", "No completed plan is available.");
    $("historyActiveProvider").textContent = "-";
    $("historyActiveStarted").textContent = "-";
    $("historyActiveDuration").textContent = "-";
    $("historyActiveArgs").textContent = "No node arguments are available.";
    setText("historyActiveResult", "No node result is available.");
    setText("historyActiveRecord", "No execution record is available.");
    return;
  }
  setText("historyExecutionDetailSummary", "Selected node from the completed execution");
  $("historyActiveProvider").textContent = detailProvider(node);
  $("historyActiveStarted").textContent = startedForNode(node, status);
  $("historyActiveDuration").textContent = durationForNode(node, status);
  $("historyActiveArgs").textContent = formatArgs(node.call?.args || {});
  setText(
    "historyActiveResult",
    formatArgs(nodeState?.leafResult ?? nodeState?.result ?? null),
  );
  setText(
    "historyActiveRecord",
    formatArgs({
      nodeIndex: node.index,
      opId: node.opId || "",
      kind: node.kind || (node.call ? "call" : "operator"),
      status: displayStatus(status),
      callId: node.call?.callId || "",
      providerId: node.call?.providerId || "",
      contractId: node.call?.contractId || "",
      state: nodeState?.state || displayStatus(status),
    }),
  );
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
  const taskText = task.goal || task.task || firstUserMessage() || "waiting for task";
  const status = task.status || (context ? "executing" : "idle");
  if (maybe("goalLine")) $("goalLine").textContent = `${status}: ${taskText}`;
  document.querySelectorAll("[data-goal-preview]").forEach((goal) => {
    clear(goal);
    const card = document.createElement("div");
    card.className = "goal-card";
    const source = document.createElement("span");
    source.className = `goal-source${context?.source === "Executor verified" ? " verified" : ""}`;
    source.textContent = context?.source || (state.executorPlansReady ? "Executor verified" : "Executor unavailable");
    const title = document.createElement("strong");
    title.textContent = active?.call?.name
      || context?.op?.description
      || context?.plan?.description
      || "No active Executor call";
    card.append(source, title);
    if (context) {
      const fields = document.createElement("div");
      fields.className = "goal-call-grid";
      const providerId = active?.call?.providerId || context.op?.provider_id || context.op?.providerId || "-";
      const contractId = active?.call?.contractId || context.op?.contract_id || context.op?.contractId || "-";
      appendGoalField(fields, "Provider", providerId);
      appendGoalField(fields, "Contract", contractId);
      appendGoalField(
        fields,
        "Operation",
        active?.call?.name || (contractId !== "-" ? contractId.split("/").pop() : "") || context.op?.description || nodeLabel(active || {}),
      );
      appendGoalField(
        fields,
        "Plan / node",
        `${context.plan?.planId || "-"} / ${context.op?.op_id || context.op?.opId || active?.opId || active?.index || "-"}`,
      );
      card.appendChild(fields);
    } else {
      const empty = document.createElement("span");
      empty.textContent = state.executorPlansReady
        ? "Executor reports no running RTDL plan."
        : "Connect to Executor to read the authoritative running call.";
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
    { label: "Audio Output", icon: "S", ok: audioReady, status: state.ttsPlaying ? "Speaking" : "Ready", value: "", source: "real", wave: state.ttsPlaying },
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
  const hasContent = state.sessionTitle || state.messages.length || state.timeline.length || state.plan || state.planRecords.length || state.batches.length || Object.keys(state.nodeStates || {}).length;
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
    planRecords: state.planRecords,
    batches: state.batches,
    nodeStates: state.nodeStates,
  };
  state.history = [conversation, ...state.history.filter((item) => item.id !== state.sessionId)].slice(0, 30);
  saveActiveConversationId();
  saveConversations();
  renderHistory();
}

function renderHistory() {
  const root = $("historyList");
  if (!root) return;
  document.querySelectorAll("body > .history-menu").forEach((menu) => menu.remove());
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

    const actions = document.createElement("div");
    actions.className = "history-actions";
    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "history-menu-trigger";
    trigger.title = "Conversation actions";
    trigger.setAttribute("aria-label", `Actions for ${item.title || "conversation"}`);
    trigger.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="5" r="1.6"></circle>
        <circle cx="12" cy="12" r="1.6"></circle>
        <circle cx="12" cy="19" r="1.6"></circle>
      </svg>
    `;
    const menu = document.createElement("div");
    menu.className = "history-menu";
    const rename = document.createElement("button");
    rename.type = "button";
    rename.textContent = "Rename";
    rename.addEventListener("click", () => renameConversation(item.id));
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Delete";
    remove.className = "history-menu-delete";
    remove.addEventListener("click", () => requestConversationDelete(item.id));
    menu.append(rename, remove);
    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const opening = !menu.classList.contains("open");
      document.querySelectorAll(".history-menu.open").forEach((other) => {
        if (other !== menu) other.classList.remove("open");
      });
      document.querySelectorAll(".history-menu-trigger[aria-expanded='true']").forEach((other) => {
        if (other !== trigger) other.setAttribute("aria-expanded", "false");
      });
      menu.classList.toggle("open", opening);
      trigger.setAttribute("aria-expanded", opening ? "true" : "false");
      if (opening) {
        const rect = trigger.getBoundingClientRect();
        const menuWidth = Math.max(112, menu.offsetWidth || 112);
        const left = Math.min(window.innerWidth - menuWidth - 8, Math.max(8, rect.right - menuWidth));
        menu.style.left = `${left}px`;
        menu.style.top = `${Math.min(window.innerHeight - 82, rect.bottom + 4)}px`;
      }
    });
    menu.addEventListener("click", () => {
      menu.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
    });
    actions.append(trigger);
    document.body.appendChild(menu);
    row.append(open, actions);
    root.appendChild(row);
  });
}

function renameConversation(sessionId) {
  if (state.busy) return;
  if (sessionId === state.sessionId) persistCurrentConversation("", true);
  const conversation = state.history.find((item) => item.id === sessionId);
  const currentTitle = conversation?.title || state.sessionTitle || firstUserMessage() || "Untitled chat";
  state.conversationDialogId = sessionId;
  $("renameConversationInput").value = currentTitle;
  $("renameConversationDialog").showModal();
  requestAnimationFrame(() => $("renameConversationInput").focus());
}

function confirmConversationRename() {
  const sessionId = state.conversationDialogId;
  const title = String($("renameConversationInput").value || "").trim();
  const conversation = state.history.find((item) => item.id === sessionId);
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
  $("renameConversationDialog").close();
  state.conversationDialogId = "";
}

function requestConversationDelete(sessionId) {
  const conversation = state.history.find((item) => item.id === sessionId);
  state.conversationDialogId = sessionId;
  setText(
    "deleteConversationMessage",
    `“${conversation?.title || "Untitled chat"}” will be removed from this browser.`,
  );
  $("deleteConversationDialog").showModal();
}

function confirmConversationDelete() {
  const sessionId = state.conversationDialogId;
  if (!sessionId) return;
  deleteConversation(sessionId);
  $("deleteConversationDialog").close();
  state.conversationDialogId = "";
}

function deleteConversation(sessionId) {
  state.history = state.history.filter((item) => item.id !== sessionId);
  saveConversations();
  if (sessionId === state.sessionId) {
    state.sessionId = getSessionId();
    saveActiveConversationId();
    state.sessionTitle = "";
    state.messages = [];
    state.timeline = [];
    state.plan = null;
    state.planRecords = [];
    state.selectedActivePlanKey = "";
    state.selectedHistoryPlanKey = "";
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
  saveActiveConversationId();
  state.sessionTitle = "";
  state.messages = [];
  state.timeline = [];
  state.plan = null;
  state.planRecords = [];
  state.selectedActivePlanKey = "";
  state.selectedHistoryPlanKey = "";
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
  saveActiveConversationId();
  state.sessionTitle = conversation.title || "";
  state.messages = (conversation.messages || []).map((item) => ({ ...item }));
  state.timeline = (conversation.timeline || []).map((item) => ({ ...item }));
  state.plan = conversation.plan || null;
  state.planRecords = conversation.planRecords || [];
  state.selectedActivePlanKey = "";
  state.selectedHistoryPlanKey = "";
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
  const defaultMic = (route.micProviders || []).find((provider) => provider.id === "audio_client_bridge")?.id
    || (route.micProviders || [])[0]?.id
    || "";
  const defaultSpeaker = (route.speakerProviders || []).find((provider) => provider.id === "audio_client_bridge")?.id
    || (route.speakerProviders || [])[0]?.id
    || "";
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
  mic.value = savedMic || defaultMic;
  speaker.value = savedSpeaker || defaultSpeaker;
  state.settings.micNodeId = mic.value;
  state.settings.speakerNodeId = speaker.value;
}

function renderAudioRouteDevices(side, result) {
  const select = maybe(side === "mic" ? "micDeviceId" : "speakerDeviceId");
  if (!select) return;
  const saved = side === "mic" ? state.settings.micDeviceId || "" : state.settings.speakerDeviceId || "";
  const current = side === "mic" ? result.currentInputId : result.currentOutputId;
  const wantedKind = side === "mic" ? "input" : "output";
  const compatibleDevices = (result.devices || [])
    .filter((device) => device.kind === wantedKind || device.kind === "duplex");
  clear(select);
  routeOption(select, "", "OS default");
  compatibleDevices.forEach((device) => {
    const suffix = [device.channels ? `${device.channels} ch` : "", device.note || ""].filter(Boolean).join(", ");
    routeOption(select, device.id, suffix ? `${device.name} (${suffix})` : device.name || device.id);
  });
  const target = compatibleDevices.some((device) => device.id === saved)
    ? saved
    : compatibleDevices.some((device) => device.id === current)
      ? current
      : "";
  select.value = target;
  renderBridgeDeviceReadout(side, compatibleDevices, target);
}

function renderBridgeDeviceReadout(side, compatibleDevices, selectedId) {
  const provider = maybe(side === "mic" ? "micNodeId" : "speakerNodeId")?.value || "";
  const target = maybe(side === "mic" ? "bridgeInputDevice" : "bridgeOutputDevice");
  if (!target) return;
  if (provider !== "audio_client_bridge") {
    target.textContent = "Not using client bridge";
    return;
  }
  const device = compatibleDevices.find((entry) => entry.id === selectedId);
  target.textContent = device
    ? `${device.name}${device.channels ? ` (${device.channels} ch)` : ""}`
    : "OS default";
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
  let result = {};
  for (let attempt = 0; attempt < (isReverseBridge ? 4 : 1); attempt += 1) {
    result = await fetch("/api/audio-route/devices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings: collectSettings(), providerId: provider }),
    }).then((response) => response.json()).catch((error) => ({ error: String(error) }));
    if (!result.error || !String(result.error).toLowerCase().includes("session disconnected")) break;
    await new Promise((resolve) => window.setTimeout(resolve, 250 * (attempt + 1)));
  }
  if (result.error) {
    if (select) {
      clear(select);
      routeOption(select, "", `Unavailable: ${result.error}`);
      select.disabled = true;
    }
    setText("audioRouteStatus", `${provider}: ${result.error}`);
    return;
  }
  if (select) select.disabled = false;
  if (!(result.devices || []).length) {
    if (select) {
      clear(select);
      routeOption(select, "", "No devices reported by provider");
      select.disabled = true;
    }
    setText("audioRouteStatus", `${provider}: provider reported no devices`);
    return;
  }
  if (side === "mic") state.audio.route.micDevices = result.devices || [];
  else state.audio.route.speakerDevices = result.devices || [];
  renderAudioRouteDevices(side, result);
}

async function applyAudioRoute() {
  state.settings = collectSettings();
  await persistSettings().catch((error) => {
    setText("audioRouteStatus", `Settings save failed: ${error}`);
  });
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
  appendAudioLog(`loaded ${state.audio.devices.length} audio devices`);
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
      renderAudioLevel(
        Number(payload.input_level ?? payload.level ?? 0),
        Number(payload.output_level ?? 0),
      );
    } catch (_) {
      renderAudioLevel(0, 0);
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
  if (maybe("audioLevelBar")) $("audioLevelBar").value = display;
  const label = `${Math.round(display * 100)}%`;
  setText("audioLevelText", label);
  if (maybe("audioLevelText")) $("audioLevelText").title = `raw RMS ${raw.toFixed(4)}`;
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

async function testSpeaker() {
  if (state.audio.testBusy) return;
  state.audio.testBusy = "speaker";
  syncAudioTestControls();
  $("testSpeaker").classList.add("busy");
  addTimeline("audio", "speaker test requested");
  let result;
  try {
    result = await fetch("/api/audio/play-test", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        settings: collectSettings(),
        text: "Robonix speaker test. 如果你听到这句话，语音播放链路正常。",
      }),
    }).then((r) => r.json()).catch((error) => ({ ok: false, error: String(error) }));
  } finally {
    $("testSpeaker").classList.remove("busy");
    state.audio.testBusy = "";
    syncAudioTestControls();
  }
  const text = result.ok
    ? `speaker ok: played ${result.bytes} bytes via ${result.speakerEndpoint}`
    : `speaker failed: ${result.error}`;
  const status = $("audioTestStatus");
  status.textContent = text;
  status.classList.toggle("is-error", !result.ok);
  status.classList.toggle("is-success", Boolean(result.ok));
  addMessage(result.ok ? "status" : "error", text);
  addTimeline(result.ok ? "audio" : "error", text);
  renderAudioServer({
    ok: result.ok,
    error: result.error || "",
    url: result.ok ? `tts ${result.ttsEndpoint} / speaker ${result.speakerEndpoint}` : "",
  });
}

async function testMicrophone() {
  const button = $("testMicrophone");
  if (state.audio.testBusy) return;
  state.audio.testBusy = "microphone";
  syncAudioTestControls();
  button.classList.add("busy");
  if (handsfreeOwnsMicrophone() || state.voiceActive) {
    await new Promise((resolve) => window.setTimeout(resolve, 1000));
    const live = Boolean(
      state.audio.vuSocket
      && state.audio.vuSocket.readyState === WebSocket.OPEN
    );
    const peak = Math.max(0, ...state.audio.levelHistory);
    const owner = state.voiceActive ? "the active voice turn" : "Hands-free";
    const text = live
      ? `Microphone is live and currently used by ${owner}. Input level ${Math.round(peak * 100)}%.`
      : `Microphone is currently used by ${owner}, but the live input meter is unavailable.`;
    const status = $("audioTestStatus");
    status.textContent = text;
    status.classList.toggle("is-error", !live);
    status.classList.toggle("is-success", live);
    addTimeline(live ? "audio" : "error", text);
    button.classList.remove("busy");
    state.audio.testBusy = "";
    syncAudioTestControls();
    return;
  }
  addTimeline("audio", "microphone test requested");
  let result;
  try {
    result = await fetch("/api/audio/mic-test", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ settings: collectSettings(), seconds: 1.0 }),
    }).then((r) => r.json()).catch((error) => ({ ok: false, error: String(error) }));
  } finally {
    button.classList.remove("busy");
    state.audio.testBusy = "";
    syncAudioTestControls();
  }
  const text = result.ok
    ? `microphone ok: ${result.bytes} bytes in ${result.captureMs} ms, RMS ${result.rms}`
    : `microphone failed: ${result.error}`;
  const status = $("audioTestStatus");
  status.textContent = text;
  status.classList.toggle("is-error", !result.ok);
  status.classList.toggle("is-success", Boolean(result.ok));
  addMessage(result.ok ? "status" : "error", text);
  addTimeline(result.ok ? "audio" : "error", text);
  setText("audioRouteStatus", text);
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
  $("stopButton").hidden = !value;
  $("newSession").disabled = value;
  if (!value) resetStopState();
  document.querySelectorAll("[data-page-action='voice-start']").forEach((button) => {
    button.classList.toggle("busy", value);
    button.textContent = value ? "Voice steer" : "Voice";
    button.title = value ? "Send a voice steer to the current task" : "Start voice session";
  });
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

init();
