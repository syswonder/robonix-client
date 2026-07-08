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
  batches: [],
  nodeStates: {},
  activeAgentId: null,
  history: loadConversations(),
  busy: false,
  audio: {
    port: 60000,
    devices: [],
    inputCurrent: null,
    outputCurrent: null,
    vuSocket: null,
    logSocket: null,
    levelHistory: Array(28).fill(0),
  },
};

const DEFAULT_ATLAS_PORT = 50051;
const AUDIO_LOG_MAX_LINES = 120;
const AUDIO_LOG_MAX_CHARS = 260;

const mockObjects = [
  { id: 1, label: "table", distance: "2.35", position: "(2.10, -1.24, 0.00)", confidence: "0.96" },
  { id: 2, label: "chair", distance: "1.87", position: "(1.72, -0.85, 0.00)", confidence: "0.91" },
  { id: 3, label: "sofa", distance: "3.12", position: "(3.05, 0.42, 0.00)", confidence: "0.88" },
  { id: 4, label: "plant", distance: "2.78", position: "(2.45, 1.15, 0.00)", confidence: "0.86" },
  { id: 5, label: "cabinet", distance: "4.33", position: "(4.12, -2.01, 0.00)", confidence: "0.84" },
];

const mockPlan = {
  round: 1,
  rootIndex: 0,
  nodes: [
    { index: 0, kind: "sequence", children: [1, 2, 3, 4, 5] },
    { index: 1, kind: "sequence", children: [6, 7, 8, 9] },
    { index: 2, kind: "sequence", children: [10, 11] },
    { index: 3, kind: "do", children: [], call: { name: "compute_approach_pose", contractId: "robonix/service/scene", providerId: "service/scene", args: { object: "table" } } },
    { index: 4, kind: "sequence", children: [12, 13, 14] },
    { index: 5, kind: "do", children: [], call: { name: "report_result", contractId: "robonix/service/liaison", providerId: "service/liaison", args: {} } },
    { index: 6, kind: "do", children: [], call: { name: "start_explore", contractId: "robonix/skill/explore", providerId: "skill/explore", args: {} } },
    { index: 7, kind: "do", children: [], call: { name: "wait_until_stable", contractId: "robonix/skill/explore", providerId: "skill/explore", args: {} } },
    { index: 8, kind: "do", children: [], call: { name: "stop_explore", contractId: "robonix/skill/explore", providerId: "skill/explore", args: {} } },
    { index: 9, kind: "do", children: [], call: { name: "get_map", contractId: "robonix/service/map", providerId: "service/map", args: {} } },
    { index: 10, kind: "do", children: [], call: { name: "list_objects", contractId: "robonix/service/scene", providerId: "service/scene", args: {} } },
    { index: 11, kind: "do", children: [], call: { name: "select_table", contractId: "robonix/service/scene", providerId: "service/scene", args: { label: "table" } } },
    { index: 12, kind: "do", children: [], call: { name: "navigate_goal", contractId: "robonix/service/nav", providerId: "service/nav", args: { goal_id: "nav_1747963365" } } },
    { index: 13, kind: "do", children: [], call: { name: "wait_result", contractId: "robonix/service/nav", providerId: "service/nav", args: { timeout_s: 120, wait_for: "succeeded" } } },
    { index: 14, kind: "do", children: [], call: { name: "check_goal_near", contractId: "robonix/service/scene", providerId: "service/scene", args: { max_distance_m: 0.4 } } },
  ],
};

function getSessionId() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function wsUrl(path) {
  const proto = location.protocol === "https:" ? "wss:" : "ws:";
  return `${proto}//${location.host}${path}`;
}

function bridgeWsUrl(path) {
  return `ws://127.0.0.1:${state.audio.port}${path}`;
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
    speakerNodeId: "",
    enrollUserId: "",
    enrollUserName: "",
    ...stored,
    ...defaults,
  };
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
  setInterval(refreshSystem, 7000);
}

function bindSettings() {
  if (maybe("robotHost")) $("robotHost").value = state.settings.robotHost || "";
  if (maybe("robotHostSettings")) $("robotHostSettings").value = state.settings.robotHost || "";
  if (maybe("atlasPort")) $("atlasPort").value = state.settings.atlasPort || DEFAULT_ATLAS_PORT;
  if (maybe("atlasPortSettings")) $("atlasPortSettings").value = state.settings.atlasPort || DEFAULT_ATLAS_PORT;
  if (maybe("liaisonEndpoint")) $("liaisonEndpoint").value = state.settings.liaisonEndpoint || "";
  if (maybe("userId")) $("userId").value = state.settings.userId || "";
  if (maybe("recordSeconds")) $("recordSeconds").value = state.settings.recordSeconds || 30;
  if (maybe("language")) $("language").value = state.settings.language || "";
  if (maybe("ttsEnabled")) $("ttsEnabled").checked = state.settings.ttsEnabled !== false;
  if (maybe("micNodeId")) $("micNodeId").value = state.settings.micNodeId || "";
  if (maybe("speakerNodeId")) $("speakerNodeId").value = state.settings.speakerNodeId || "";
  if (maybe("enrollUserId")) $("enrollUserId").value = state.settings.enrollUserId || "";
  if (maybe("enrollUserName")) $("enrollUserName").value = state.settings.enrollUserName || "";
  if (maybe("operatorId")) $("operatorId").textContent = state.settings.userId || "local";
  if (state.sessionTitle && maybe("promptTitle")) $("promptTitle").textContent = state.sessionTitle;

  [
    "robotHost",
    "robotHostSettings",
    "atlasPort",
    "atlasPortSettings",
    "liaisonEndpoint",
    "userId",
    "recordSeconds",
    "language",
    "ttsEnabled",
    "micNodeId",
    "speakerNodeId",
    "enrollUserId",
    "enrollUserName",
  ].forEach((id) => maybe(id)?.addEventListener("change", syncConnectionSettings));
  maybe("userId")?.addEventListener("input", () => {
    if (maybe("operatorId")) $("operatorId").textContent = $("userId").value.trim() || "local";
  });
}

function syncConnectionSettings() {
  const hostSource = document.activeElement?.id === "robotHostSettings" && maybe("robotHostSettings") ? "robotHostSettings" : "robotHost";
  const portSource = document.activeElement?.id === "atlasPortSettings" && maybe("atlasPortSettings") ? "atlasPortSettings" : "atlasPort";
  const host = maybe(hostSource) ? normalizeRobotHost($(hostSource).value) : "";
  const port = maybe(portSource) ? normalizeAtlasPort($(portSource).value) : DEFAULT_ATLAS_PORT;
  if (maybe("robotHost")) $("robotHost").value = host;
  if (maybe("robotHostSettings")) $("robotHostSettings").value = host;
  if (maybe("atlasPort")) $("atlasPort").value = port;
  if (maybe("atlasPortSettings")) $("atlasPortSettings").value = port;
  saveSettings();
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
    speakerNodeId: maybe("speakerNodeId")?.value.trim() || state.settings.speakerNodeId || "",
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
  $("attachButton").addEventListener("click", () => $("imageInput").click());
  $("imageInput").addEventListener("change", handleFiles);
  $("voiceButton").addEventListener("click", startVoice);
  $("refreshSystem").addEventListener("click", refreshSystem);
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
  maybe("startBridge")?.addEventListener("click", startBridge);
  maybe("checkBridge")?.addEventListener("click", checkBridge);
  maybe("refreshAudioDevices")?.addEventListener("click", loadAudioDevices);
  maybe("applyAudioDevices")?.addEventListener("click", applyAudioDevices);
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
    checkBridge();
    startAudioBridgeStreams();
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
  if (state.busy) return;

  setBusy(true);
  const display = text || attachments.map((item) => item.name).join(", ");
  addMessage("user", display, attachments.length ? `${attachments.length} image` : "", attachments);
  persistCurrentConversation(display);
  $("taskInput").value = "";
  autoGrowInput();
  state.attachments = [];
  renderAttachments();
  renderSceneAssets();

  const socket = new WebSocket(wsUrl("/ws/task"));
  socket.onopen = () => {
    socket.send(JSON.stringify({ text, attachments, settings: collectSettings() }));
  };
  wireStream(socket, () => setBusy(false));
}

function startVoice() {
  if (state.busy) return;
  setBusy(true);
  $("voiceButton").classList.add("active");
  document.querySelectorAll("[data-page-action='voice-start']").forEach((button) => button.classList.add("active"));
  if (maybe("voiceState")) $("voiceState").textContent = "recording";
  addTimeline("voice", "voice session requested");
  const socket = new WebSocket(wsUrl("/ws/voice"));
  socket.onopen = () => socket.send(JSON.stringify({ settings: collectSettings() }));
  wireStream(socket, () => {
    setBusy(false);
    $("voiceButton").classList.remove("active");
    document.querySelectorAll("[data-page-action='voice-start']").forEach((button) => button.classList.remove("active"));
    if (maybe("voiceState")) $("voiceState").textContent = "ready";
  });
}

function wireStream(socket, done) {
  socket.onmessage = (event) => {
    const payload = JSON.parse(event.data);
    if (payload.type === "pilot_event") handlePilotEvent(payload.event);
    if (payload.type === "voice_event") handleVoiceEvent(payload.event);
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
    addTimeline("plan", `live round ${event.plan.round}: ${(event.plan.calls || []).length} call(s)`);
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
    addTimeline("status", event.taskState.status || event.taskState.goal || "task update");
    persistCurrentConversation();
  } else if (event.kind === "status" && event.status) {
    addTimeline("status", event.status.message || `state ${event.status.state}`);
  }
}

function handleVoiceEvent(event) {
  const label = event.statusMessage || event.text || event.error || event.kind;
  if (event.kind === "asr_final") {
    addMessage("user", event.text, "voice");
  } else if (event.kind === "pilot" && event.pilot) {
    handlePilotEvent(event.pilot);
  } else if (event.kind === "tts_started") {
    addMessage("status", label || "TTS playback started");
    addTimeline("voice", label || "TTS playback started");
  } else if (event.kind === "tts_done") {
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
    msg.text = text.length >= current.length ? text : current;
  } else {
    addMessage("agent", text, "Robonix");
  }
  state.activeAgentId = null;
  renderMessages();
  persistCurrentConversation();
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
  const rows = state.timeline.length
    ? state.timeline
    : [
        { kind: "Understand Task", text: "Waiting for operator instruction.", at: "Pending" },
        { kind: "Decompose Task", text: "Plan will appear from PilotEvent.", at: "-" },
        { kind: "Execute Plan", text: "Waiting for real Pilot/Voice stream events.", at: "-" },
        { kind: "Verify Result", text: "Verification depends on future scene/navigation APIs.", at: "-" },
      ];
  document.querySelectorAll("[data-event-list]").forEach((root) => {
    clear(root);
    rows.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = `event-row${state.timeline.length ? "" : " placeholder"}`;
      const title = document.createElement("strong");
      title.textContent = item.kind;
      const body = document.createElement("span");
      body.textContent = item.text;
      const time = document.createElement("span");
      time.textContent = item.at;
      if (!state.timeline.length && index === 2) title.className = "warn";
      row.append(title, body, time);
      root.appendChild(row);
    });
  });
}

function renderPlan() {
  const plan = state.plan;
  const roots = document.querySelectorAll("[data-plan-tree]");
  roots.forEach((root) => clear(root));
  setTextAll("[data-plan-summary]", plan ? `live round ${plan.round}` : "waiting for real plan");
  if (maybe("goalLine")) $("goalLine").textContent = `Goal: ${firstUserMessage() || "waiting for a task."}`;
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
  const nodeStateByIndex = new Map();
  Object.entries(state.nodeStates || {}).forEach(([index, result]) => nodeStateByIndex.set(Number(index), result));
  state.batches.forEach((batch) => {
    (batch.results || []).forEach((result) => nodeStateByIndex.set(Number(result.nodeIndex), result));
  });
  const depths = computeNodeDepths(plan);
  const runningIndex = pickRunningIndex(plan, nodeStateByIndex);
  const rows = plan.nodes.map((node) => ({ node, status: nodeStatus(node, nodeStateByIndex, runningIndex) }));
  roots.forEach((root) => {
    const compact = root.dataset.planTree === "compact";
    rows.slice(0, compact ? 8 : rows.length).forEach(({ node, status }) => {
      const row = makePlanRow(node, status, depths, runningIndex);
      root.appendChild(row);
    });
    if (compact && rows.length > 8) {
      const more = document.createElement("button");
      more.type = "button";
      more.className = "snapshot-more";
      more.textContent = `Open RTDL for ${rows.length - 8} more node(s)`;
      more.addEventListener("click", () => activatePage("rtdl"));
      root.appendChild(more);
    }
  });
  const activeNode = plan.nodes.find((node) => node.index === runningIndex) || plan.nodes.find((node) => node.call) || plan.nodes[0];
  renderExecutionDetail(activeNode, nodeStatus(activeNode, nodeStateByIndex, runningIndex), nodeStateByIndex.get(activeNode?.index));
}

function makePlanRow(node, status, depths, runningIndex) {
  const row = document.createElement("div");
  row.className = `plan-row${node.index === runningIndex ? " active" : ""}`;
  const name = document.createElement("span");
  name.className = `node-name depth-${Math.min(depths.get(node.index) || 0, 3)}`;
  name.textContent = `${node.children?.length ? "v" : "-"} ${node.index}. ${node.call?.name || node.kind}`;
  const type = document.createElement("span");
  type.textContent = node.kind || "op";
  const statusEl = document.createElement("span");
  statusEl.className = `status ${status.toLowerCase()}`;
  statusEl.textContent = status;
  const provider = document.createElement("span");
  provider.textContent = node.call?.providerId || node.call?.contractId || "pilot";
  const duration = document.createElement("span");
  duration.textContent = durationForNode(node, status);
  const started = document.createElement("span");
  started.textContent = startedForNode(node, status);
  row.append(name, type, statusEl, provider, duration, started);
  row.addEventListener("click", () => renderExecutionDetail(node, status));
  return row;
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
  if (status === "PENDING") return "-";
  if (status === "RUNNING") return "00:50";
  return "done";
}

function startedForNode(node, status) {
  if (status === "PENDING") return "-";
  const date = new Date();
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function renderExecutionDetail(node, status, nodeState = null) {
  if (!maybe("activeProvider")) return;
  $("activeProvider").textContent = node?.call?.providerId || node?.call?.contractId || "pilot";
  $("activeStarted").textContent = node ? startedForNode(node, status) : "-";
  $("activeDuration").textContent = node ? durationForNode(node, status) : "-";
  $("activeArgs").textContent = formatArgs(nodeState?.leafResult || node?.call?.args || { state: status, source: state.plan ? "pilot" : "waiting" });
}

function currentTaskLabel() {
  const text = firstUserMessage();
  if (!text) return "idle";
  return text.length > 40 ? `${text.slice(0, 37)}...` : text;
}

async function refreshSystem() {
  const atlas = buildAtlasEndpoint($("robotHost").value, $("atlasPort").value) || "127.0.0.1:50051";
  const data = await fetch(`/api/system?atlas=${encodeURIComponent(atlas)}`).then((r) => r.json()).catch((error) => ({ error: String(error) }));
  renderSystem(data);
}

function renderSystem(data) {
  const summary = data.summary || {};
  const stateLabel = data.error ? "offline" : summary.state || "unknown";
  $("connectionState").textContent = stateLabel;
  $("refreshSystem").classList.toggle("offline", stateLabel === "offline");
  if (maybe("systemStateLabel")) $("systemStateLabel").textContent = stateLabel;
  if (maybe("vitalsSummary")) $("vitalsSummary").textContent = `${summary.active || 0} active, ${summary.errors || 0} error(s)`;
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
  const latest = latestImageAttachment();
  const navGoal = latestNavigationGoal();
  document.querySelectorAll("[data-camera-feed]").forEach((camera) => {
    clear(camera);
    if (latest) {
      const img = document.createElement("img");
      img.src = latest.dataUrl;
      img.alt = latest.name || "camera attachment";
      camera.appendChild(img);
    }
  });
  document.querySelectorAll("[data-goal-preview]").forEach((goal) => {
    clear(goal);
    const goalCard = document.createElement("div");
    goalCard.className = "goal-card";
    if (latest) {
      const img = document.createElement("img");
      img.src = latest.dataUrl;
      img.alt = latest.name || "target attachment";
      goal.appendChild(img);
    }
    const title = document.createElement("strong");
    const pose = document.createElement("span");
    if (navGoal) {
      title.textContent = "Navigation target";
      pose.textContent = `Goal pose x: ${formatMeters(navGoal.x)}, y: ${formatMeters(navGoal.y)}, theta: ${formatRadians(navGoal.yaw)}`;
    } else {
      title.textContent = "No active navigation goal";
      pose.textContent = "A target will appear when Pilot emits a navigation RTDL call.";
    }
    goalCard.append(title, pose);
    goal.appendChild(goalCard);
  });
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
    const head = document.createElement("div");
    head.className = "object-head";
    ["ID", "Label", "Distance", "Position (m)", "Confidence"].forEach((item) => {
      const cell = document.createElement("span");
      cell.textContent = item;
      head.appendChild(cell);
    });
    root.appendChild(head);
    mockObjects.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = `object-row${index === 0 ? " active" : ""}`;
      [item.id, item.label, item.distance, item.position, item.confidence].forEach((value) => {
        const cell = document.createElement("span");
        cell.textContent = String(value);
        row.appendChild(cell);
      });
      root.appendChild(row);
    });
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

async function startBridge() {
  appendAudioLog("starting local audio bridge");
  const result = await fetch("/api/audio-bridge/start", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ host: "0.0.0.0", port: 60000, uiHost: "127.0.0.1" }),
  }).then((r) => r.json());
  renderBridge(result);
  await checkBridge();
  startAudioBridgeStreams();
  loadAudioDevices();
}

async function checkBridge() {
  const result = await fetch("/api/audio-bridge/health").then((r) => r.json());
  renderBridge(result);
  if (result.reachable || result.ok) {
    startAudioBridgeStreams();
    loadAudioDevices();
  }
}

function bridgeOnce(path, body = null) {
  return new Promise((resolve) => {
    const socket = new WebSocket(bridgeWsUrl(path));
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
    socket.onerror = () => done({ ok: false, error: `cannot connect ${bridgeWsUrl(path)}` });
    socket.onclose = () => done({ ok: false, error: `closed ${bridgeWsUrl(path)}` });
  });
}

async function loadAudioDevices() {
  const result = await bridgeOnce("/devices");
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
  const result = await bridgeOnce("/set_device", body);
  appendAudioLog(result.ok ? "device selection applied" : `device selection failed: ${result.error || "unknown error"}`);
  await loadAudioDevices();
}

function startAudioBridgeStreams() {
  startAudioVuStream();
  startAudioLogStream();
}

function startAudioVuStream() {
  if (state.audio.vuSocket && state.audio.vuSocket.readyState <= WebSocket.OPEN) return;
  const socket = new WebSocket(bridgeWsUrl("/vu"));
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
  const socket = new WebSocket(bridgeWsUrl("/log"));
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
  state.audio.levelHistory.push(display);
  state.audio.levelHistory = state.audio.levelHistory.slice(-28);
  if (maybe("audioLevelBar")) $("audioLevelBar").style.width = `${Math.round(display * 100)}%`;
  const label = `${Math.round(display * 100)}%`;
  setText("audioLevelText", label);
  if (maybe("audioLevelText")) $("audioLevelText").title = `raw RMS ${raw.toFixed(4)}`;
  renderAudioBars();
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
  const lines = root.textContent.trimEnd() ? root.textContent.trimEnd().split("\n") : [];
  const next = `[${stamp}] ${text}`;
  if (lines[lines.length - 1] === next) return;
  lines.push(next);
  root.textContent = `${lines.slice(-AUDIO_LOG_MAX_LINES).join("\n")}\n`;
  root.scrollTop = root.scrollHeight;
  setText("audioLogSummary", "Bridge connection log.");
}

function normalizeAudioLogLine(line) {
  const text = String(line ?? "")
    .replace(/\r/g, "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .join(" ");
  if (!text) return "";
  if (/^[<>]\s+(TEXT|BINARY|PING|PONG|CLOSE)\b/.test(text)) return "";
  if (/^[=%]\s+/.test(text) && /(connection|keepalive|opcode|frame|close|open)/i.test(text)) return "";
  if (/websockets\.(client|server|protocol|connection)/i.test(text)) return "";
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
  renderBridge({
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
  const root = $("bridgeStatus");
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

function renderBridge(result) {
  const root = maybe("bridgeStatus");
  if (!root) return;
  clear(root);
  const online = Boolean(result.ok || result.reachable);
  setText("audioBridgeState", online ? "online" : "offline");
  setText("audioBridgeSummary", online ? (result.url || result.wsUrl || "Bridge reachable.") : (result.error || "Bridge is offline."));
  const lines = [
    online ? "ok" : "not reachable",
    result.error || "",
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
  $("voiceButton").classList.toggle("busy", value);
  document.querySelectorAll("[data-page-action='voice-start']").forEach((button) => button.classList.toggle("busy", value));
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
