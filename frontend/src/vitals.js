import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import URDFLoader from "urdf-loader";
import {
  AudioLines,
  Battery,
  Bot,
  Box,
  Camera,
  CircleGauge,
  Cpu,
  Disc3,
  Radio,
  RefreshCw,
  ScanLine,
  createElement as createIconElement,
} from "lucide";

const HEALTH_SEVERITY = { unknown: 0, ok: 1, stale: 2, warn: 3, error: 4 };
const HEALTH_COLORS = {
  unknown: new THREE.Color(0x000000),
  ok: new THREE.Color(0x2f8a55),
  stale: new THREE.Color(0x657177),
  warn: new THREE.Color(0xd89b31),
  error: new THREE.Color(0xd94b42),
};
const SOURCE_LABELS = {
  soma: "Soma",
  hardware: "Hardware",
  modules: "Modules",
  atlas: "Atlas",
  client: "Client",
};

const byId = (id) => document.getElementById(id);

function clear(node) {
  if (node) node.replaceChildren();
}

function safeHealth(value) {
  return Object.hasOwn(HEALTH_SEVERITY, value) ? value : "unknown";
}

function highestHealth(values) {
  return values.reduce(
    (highest, value) => HEALTH_SEVERITY[safeHealth(value)] > HEALTH_SEVERITY[highest] ? safeHealth(value) : highest,
    "unknown",
  );
}

function setHealthLabel(node, health) {
  if (!node) return;
  const normalized = safeHealth(health);
  node.className = `health-label ${normalized}`;
  node.textContent = normalized;
}

function icon(iconNode, size = 16) {
  return createIconElement(iconNode, {
    width: String(size),
    height: String(size),
    "stroke-width": "1.8",
    "aria-hidden": "true",
  });
}

function componentIcon(type) {
  const value = String(type || "").toLowerCase();
  if (value.includes("battery") || value.includes("power")) return Battery;
  if (value.includes("camera") || value.includes("vision")) return Camera;
  if (value.includes("lidar") || value.includes("laser")) return ScanLine;
  if (value.includes("audio") || value.includes("speaker") || value.includes("mic")) return AudioLines;
  if (value.includes("wheel") || value.includes("drive")) return Disc3;
  if (value.includes("base") || value.includes("chassis")) return CircleGauge;
  if (value.includes("sensor") || value.includes("radio")) return Radio;
  if (value.includes("robot") || value.includes("body")) return Bot;
  if (value.includes("compute") || value.includes("controller")) return Cpu;
  return Box;
}

function formatAge(timestampMs) {
  if (!timestampMs) return "--";
  const seconds = Math.max(0, Math.floor((Date.now() - timestampMs) / 1000));
  if (seconds < 2) return "now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ago`;
}

function healthSummary(summary, noun) {
  const total = Number(summary?.total || 0);
  if (!total) return `0 ${noun}`;
  const attention = Number(summary.error || 0) + Number(summary.warn || 0) + Number(summary.stale || 0);
  if (attention) return `${attention} attention / ${total}`;
  const unknown = Number(summary.unknown || 0);
  return unknown ? `${unknown} unknown / ${total}` : `${total} healthy`;
}

function createMaterial(color, metalness = 0.28, roughness = 0.5) {
  return new THREE.MeshStandardMaterial({ color, metalness, roughness });
}

function clampDimension(value, fallback, minimum, maximum) {
  const number = Number(value);
  return Math.min(maximum, Math.max(minimum, Number.isFinite(number) ? number : fallback));
}

class RobotViewport {
  constructor(container, onSelect) {
    this.container = container;
    this.onSelect = onSelect;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x081115);
    this.scene.fog = new THREE.Fog(0x081115, 5.5, 12);
    this.camera = new THREE.PerspectiveCamera(38, 1, 0.02, 100);
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.domElement.tabIndex = 0;
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.enablePan = false;
    this.controls.minDistance = 0.7;
    this.controls.maxDistance = 10;
    this.controls.maxPolarAngle = Math.PI * 0.49;
    this.controls.addEventListener("change", () => this.renderOnce());

    this.scene.add(new THREE.HemisphereLight(0xd8e5e3, 0x172328, 2.2));
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.3);
    keyLight.position.set(3.5, 5.5, 4.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 0.1;
    keyLight.shadow.camera.far = 16;
    this.scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0x67c7d0, 1.8);
    rimLight.position.set(-4, 2.4, -3);
    this.scene.add(rimLight);

    this.floor = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 8),
      new THREE.MeshStandardMaterial({ color: 0x0b1518, roughness: 0.9, metalness: 0.05 }),
    );
    this.floor.rotation.x = -Math.PI / 2;
    this.floor.receiveShadow = true;
    this.scene.add(this.floor);
    this.grid = new THREE.GridHelper(8, 32, 0x31525a, 0x183039);
    this.grid.position.y = 0.003;
    this.grid.material.transparent = true;
    this.grid.material.opacity = 0.36;
    this.scene.add(this.grid);

    this.robotRoot = new THREE.Group();
    this.scene.add(this.robotRoot);
    this.componentObjects = new Map();
    this.componentHealth = new Map();
    this.selectedComponentId = "body";
    this.selectionHelper = null;
    this.modelToken = 0;
    this.active = false;
    this.frame = 0;
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.renderer.domElement.addEventListener("pointerup", (event) => this.pick(event));

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.container);
    this.resize();
  }

  setActive(active) {
    this.active = Boolean(active);
    if (this.active && !this.frame) this.animate();
    if (!this.active && this.frame) {
      cancelAnimationFrame(this.frame);
      this.frame = 0;
    }
    if (this.active) this.resize();
  }

  animate() {
    if (!this.active) {
      this.frame = 0;
      return;
    }
    this.controls.update();
    if (this.selectionHelper) {
      const objects = this.componentObjects.get(this.selectedComponentId) || [];
      if (objects.at(-1)) this.selectionHelper.box.setFromObject(objects.at(-1));
    }
    this.renderer.render(this.scene, this.camera);
    this.frame = requestAnimationFrame(() => this.animate());
  }

  renderOnce() {
    if (!this.container.clientWidth || !this.container.clientHeight) return;
    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    const width = Math.max(1, this.container.clientWidth);
    const height = Math.max(1, this.container.clientHeight);
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderOnce();
  }

  clearRobot() {
    if (this.selectionHelper) {
      this.scene.remove(this.selectionHelper);
      this.selectionHelper.geometry.dispose();
      this.selectionHelper.material.dispose();
      this.selectionHelper = null;
    }
    while (this.robotRoot.children.length) {
      const child = this.robotRoot.children.at(-1);
      this.robotRoot.remove(child);
      child.traverse((object) => {
        object.geometry?.dispose?.();
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
        else object.material?.dispose?.();
      });
    }
    this.componentObjects.clear();
  }

  registerComponent(componentId, object) {
    if (!componentId || !object) return;
    const objects = this.componentObjects.get(componentId) || [];
    if (!objects.includes(object)) objects.push(object);
    this.componentObjects.set(componentId, objects);
    object.traverse((child) => {
      if (!child.isMesh) return;
      const existingId = String(child.userData.componentId || "");
      const existingDepth = existingId ? existingId.split("/").length : 0;
      const nextDepth = componentId.split("/").length;
      if (nextDepth >= existingDepth) child.userData.componentId = componentId;
    });
  }

  prepareMaterials(object) {
    object.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = true;
      child.receiveShadow = true;
      if (Array.isArray(child.material)) child.material = child.material.map((material) => material.clone());
      else if (child.material) child.material = child.material.clone();
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.filter(Boolean).forEach((material) => {
        material.userData.vitalsBaseEmissive = material.emissive?.clone?.() || new THREE.Color(0x000000);
        material.userData.vitalsBaseIntensity = Number(material.emissiveIntensity || 0);
      });
    });
  }

  async loadDescription(description) {
    const token = ++this.modelToken;
    this.clearRobot();
    let model = null;
    let mode = "procedural";
    const render = description?.render || {};

    if (render.modelUrl) {
      try {
        const gltf = await new GLTFLoader().loadAsync(render.modelUrl);
        if (token !== this.modelToken) return "superseded";
        model = gltf.scene;
        mode = "asset";
        this.registerComponent("body", model);
      } catch (_) {
        model = null;
      }
    }

    if (!model && description?.urdfXml && render.mode === "urdf") {
      try {
        const loader = new URDFLoader();
        loader.loadMeshCb = (_path, _manager, _material, onComplete) => {
          onComplete(null, new Error("URDF mesh assets are not browser-addressable"));
        };
        const urdfRobot = loader.parse(description.urdfXml);
        urdfRobot.rotation.x = -Math.PI / 2;
        urdfRobot.updateMatrixWorld(true);
        const meshCount = urdfRobot.getObjectsByProperty("isMesh", true).length;
        if (meshCount > 0) {
          model = urdfRobot;
          mode = "urdf";
          this.registerComponent("body", model);
          (description.components || []).forEach((component) => {
            const target = urdfRobot.links?.[component.urdfLink] || urdfRobot.joints?.[component.urdfJoint];
            if (target) this.registerComponent(component.id, target);
          });
        }
      } catch (_) {
        model = null;
      }
    }

    if (!model) {
      model = this.buildProcedural(description || {});
      mode = "procedural";
    }
    if (token !== this.modelToken) return "superseded";

    this.prepareMaterials(model);
    this.robotRoot.add(model);
    this.placeOnFloor(model);
    this.fitCamera(model);
    this.setComponentHealth(this.componentHealth);
    this.selectComponent(this.selectedComponentId);
    this.renderOnce();
    return mode;
  }

  placeOnFloor(model) {
    model.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(model);
    if (!bounds.isEmpty()) model.position.y -= bounds.min.y;
    model.updateMatrixWorld(true);
  }

  fitCamera(model) {
    const bounds = new THREE.Box3().setFromObject(model);
    if (bounds.isEmpty()) return;
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const radius = Math.max(size.x, size.y, size.z, 0.6);
    this.camera.position.set(
      center.x + radius * 1.55,
      center.y + radius * 0.85,
      center.z + radius * 1.85,
    );
    this.camera.near = Math.max(0.01, radius / 100);
    this.camera.far = Math.max(30, radius * 30);
    this.camera.updateProjectionMatrix();
    this.controls.target.set(center.x, center.y + size.y * 0.04, center.z);
    this.controls.minDistance = radius * 0.65;
    this.controls.maxDistance = radius * 8;
    this.controls.update();
  }

  buildProcedural(description) {
    const components = description.components || [];
    const types = components.map((component) => String(component.type || "").toLowerCase());
    const family = String(description.family || "").toLowerCase();
    if (family.includes("humanoid")) return this.buildHumanoid(description);
    if (family.includes("arm") || family.includes("manipulator") || types.some((type) => type.includes("gripper") || type.includes("arm"))) {
      return this.buildArm(description);
    }
    if (family.includes("mobile") || types.some((type) => type.includes("wheel") || type.includes("mobile_base"))) {
      return this.buildMobileRobot(description);
    }
    return this.buildGenericRobot(description);
  }

  component(description, predicate, fallback = "body") {
    return (description.components || []).find(predicate)?.id || fallback;
  }

  makeMesh(geometry, material, componentId) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    if (componentId) this.registerComponent(componentId, mesh);
    return mesh;
  }

  buildMobileRobot(description) {
    const dimensions = description.dimensions || {};
    const width = clampDimension(dimensions.widthM, 0.58, 0.35, 2.2);
    const length = clampDimension(dimensions.lengthM, 0.68, 0.35, 2.8);
    const height = clampDimension(dimensions.heightM, 1.0, 0.45, 3.2);
    const body = new THREE.Group();
    const base = new THREE.Group();
    const rootId = "body";
    const baseId = this.component(description, (component) => String(component.type).includes("base"));
    const leftWheelId = this.component(description, (component) => String(component.localId).includes("left_wheel"), baseId);
    const rightWheelId = this.component(description, (component) => String(component.localId).includes("right_wheel"), baseId);
    const batteryId = this.component(description, (component) => String(component.type).includes("battery"), baseId);
    const cameraId = this.component(description, (component) => String(component.type).includes("camera"), rootId);
    const lidarId = this.component(description, (component) => String(component.type).includes("lidar"), rootId);
    const audioId = this.component(description, (component) => String(component.type).includes("audio"), rootId);
    const silver = createMaterial(0xb8c3c5, 0.62, 0.3);
    const graphite = createMaterial(0x263238, 0.42, 0.44);
    const dark = createMaterial(0x121a1e, 0.25, 0.58);
    const accent = createMaterial(0x3a98a3, 0.34, 0.38);

    const chassis = this.makeMesh(
      new THREE.CylinderGeometry(Math.max(width, length) * 0.46, Math.max(width, length) * 0.5, height * 0.23, 48),
      silver,
      baseId,
    );
    chassis.position.y = height * 0.19;
    base.add(chassis);
    const bumper = this.makeMesh(
      new THREE.TorusGeometry(Math.max(width, length) * 0.47, Math.max(width, length) * 0.025, 12, 48),
      graphite,
      baseId,
    );
    bumper.rotation.x = Math.PI / 2;
    bumper.position.y = height * 0.13;
    base.add(bumper);

    const wheelRadius = Math.max(0.09, Math.min(height * 0.14, length * 0.21));
    const wheelWidth = Math.max(0.055, width * 0.12);
    const leftWheel = this.makeMesh(new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelWidth, 28), dark.clone(), leftWheelId);
    leftWheel.rotation.z = Math.PI / 2;
    leftWheel.position.set(-width * 0.49, wheelRadius, 0);
    base.add(leftWheel);
    const rightWheel = this.makeMesh(new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelWidth, 28), dark.clone(), rightWheelId);
    rightWheel.rotation.z = Math.PI / 2;
    rightWheel.position.set(width * 0.49, wheelRadius, 0);
    base.add(rightWheel);

    const battery = this.makeMesh(
      new THREE.BoxGeometry(width * 0.42, height * 0.07, length * 0.3),
      createMaterial(0x487f54, 0.18, 0.55),
      batteryId,
    );
    battery.position.set(0, height * 0.31, -length * 0.12);
    base.add(battery);
    body.add(base);

    const mastHeight = Math.max(height * 0.46, 0.24);
    const mast = this.makeMesh(new THREE.CylinderGeometry(width * 0.11, width * 0.15, mastHeight, 32), graphite.clone(), baseId);
    mast.position.y = height * 0.34 + mastHeight / 2;
    body.add(mast);
    const shoulder = this.makeMesh(new THREE.SphereGeometry(width * 0.18, 30, 20), silver.clone(), rootId);
    shoulder.scale.y = 0.7;
    shoulder.position.y = height * 0.34 + mastHeight;
    body.add(shoulder);

    const head = new THREE.Group();
    const headShell = this.makeMesh(new THREE.BoxGeometry(width * 0.42, height * 0.17, length * 0.26), silver.clone(), cameraId);
    headShell.geometry.translate(0, 0, 0);
    head.add(headShell);
    const lens = this.makeMesh(new THREE.CylinderGeometry(width * 0.055, width * 0.055, length * 0.03, 24), accent.clone(), cameraId);
    lens.rotation.x = Math.PI / 2;
    lens.position.set(0, 0, length * 0.145);
    head.add(lens);
    head.position.y = height * 0.88;
    body.add(head);

    const lidar = this.makeMesh(new THREE.CylinderGeometry(width * 0.13, width * 0.13, height * 0.055, 32), dark.clone(), lidarId);
    lidar.position.y = height * 0.985;
    body.add(lidar);
    const lidarBand = this.makeMesh(new THREE.CylinderGeometry(width * 0.135, width * 0.135, height * 0.018, 32), accent.clone(), lidarId);
    lidarBand.position.y = height * 0.99;
    body.add(lidarBand);

    [-1, 1].forEach((side) => {
      const speaker = this.makeMesh(new THREE.CylinderGeometry(width * 0.045, width * 0.045, width * 0.018, 20), dark.clone(), audioId);
      speaker.rotation.z = Math.PI / 2;
      speaker.position.set(side * width * 0.23, height * 0.8, 0);
      body.add(speaker);
    });

    this.registerComponent(rootId, body);
    this.registerComponent(baseId, base);
    return body;
  }

  buildArm(description) {
    const dimensions = description.dimensions || {};
    const width = clampDimension(dimensions.widthM, 0.5, 0.25, 1.8);
    const height = clampDimension(dimensions.heightM, 1.1, 0.6, 3.2);
    const body = new THREE.Group();
    const components = (description.components || []).filter((component) => component.id !== "body");
    const silver = createMaterial(0xbcc7c8, 0.58, 0.32);
    const graphite = createMaterial(0x273238, 0.42, 0.43);
    const accent = createMaterial(0x3e9da5, 0.32, 0.4);
    const baseId = components[0]?.id || "body";
    const base = this.makeMesh(new THREE.CylinderGeometry(width * 0.42, width * 0.48, height * 0.18, 40), graphite, baseId);
    base.position.y = height * 0.09;
    body.add(base);

    const jointIds = components.slice(1).map((component) => component.id);
    const segmentLengths = [height * 0.29, height * 0.27, height * 0.2];
    let parent = body;
    let y = height * 0.18;
    segmentLengths.forEach((length, index) => {
      const componentId = jointIds[index] || baseId;
      const joint = new THREE.Group();
      const bearing = this.makeMesh(new THREE.SphereGeometry(width * 0.13, 28, 18), accent.clone(), componentId);
      joint.add(bearing);
      const link = this.makeMesh(new THREE.BoxGeometry(width * 0.18, length, width * 0.18), silver.clone(), componentId);
      link.position.y = length / 2;
      joint.add(link);
      joint.position.set(index === 1 ? width * 0.12 : 0, y, index === 2 ? width * 0.08 : 0);
      joint.rotation.z = index === 1 ? -0.42 : index === 2 ? 0.58 : 0.1;
      parent.add(joint);
      parent = joint;
      y = length;
    });
    const gripperId = this.component(description, (component) => String(component.type).includes("gripper"), jointIds.at(-1) || baseId);
    const wrist = this.makeMesh(new THREE.CylinderGeometry(width * 0.09, width * 0.09, width * 0.2, 24), graphite.clone(), gripperId);
    wrist.rotation.z = Math.PI / 2;
    wrist.position.y = segmentLengths.at(-1);
    parent.add(wrist);
    [-1, 1].forEach((side) => {
      const finger = this.makeMesh(new THREE.BoxGeometry(width * 0.045, width * 0.2, width * 0.06), silver.clone(), gripperId);
      finger.position.set(side * width * 0.09, segmentLengths.at(-1) + width * 0.13, 0);
      parent.add(finger);
    });
    this.registerComponent("body", body);
    return body;
  }

  buildHumanoid(description) {
    const height = clampDimension(description.dimensions?.heightM, 1.6, 0.8, 3.2);
    const body = new THREE.Group();
    const torsoId = this.component(description, (component) => String(component.type).includes("torso"));
    const headId = this.component(description, (component) => String(component.type).includes("head") || String(component.type).includes("camera"));
    const shell = createMaterial(0xbcc7c8, 0.52, 0.34);
    const graphite = createMaterial(0x263238, 0.4, 0.46);
    const accent = createMaterial(0x419ba4, 0.3, 0.4);
    const torso = this.makeMesh(new THREE.BoxGeometry(height * 0.28, height * 0.34, height * 0.16), shell, torsoId);
    torso.position.y = height * 0.58;
    body.add(torso);
    const head = this.makeMesh(new THREE.SphereGeometry(height * 0.12, 32, 22), shell.clone(), headId);
    head.scale.z = 0.82;
    head.position.y = height * 0.84;
    body.add(head);
    const visor = this.makeMesh(new THREE.BoxGeometry(height * 0.14, height * 0.035, height * 0.025), accent, headId);
    visor.position.set(0, height * 0.85, height * 0.095);
    body.add(visor);
    [[-1, "left"], [1, "right"]].forEach(([side, name]) => {
      const armId = this.component(description, (component) => String(component.localId).includes(`${name}_arm`), torsoId);
      const arm = this.makeMesh(new THREE.CapsuleGeometry(height * 0.045, height * 0.3, 8, 16), graphite.clone(), armId);
      arm.position.set(side * height * 0.2, height * 0.54, 0);
      arm.rotation.z = side * -0.12;
      body.add(arm);
      const legId = this.component(description, (component) => String(component.localId).includes(`${name}_leg`), torsoId);
      const leg = this.makeMesh(new THREE.CapsuleGeometry(height * 0.055, height * 0.38, 8, 16), graphite.clone(), legId);
      leg.position.set(side * height * 0.085, height * 0.23, 0);
      body.add(leg);
    });
    this.registerComponent("body", body);
    return body;
  }

  buildGenericRobot(description) {
    const dimensions = description.dimensions || {};
    const width = clampDimension(dimensions.widthM, 0.6, 0.3, 2.4);
    const length = clampDimension(dimensions.lengthM, 0.7, 0.3, 2.8);
    const height = clampDimension(dimensions.heightM, 1.0, 0.4, 3.2);
    const body = new THREE.Group();
    const shell = this.makeMesh(
      new THREE.BoxGeometry(width * 0.72, height * 0.66, length * 0.62),
      createMaterial(0xb8c4c5, 0.56, 0.34),
      "body",
    );
    shell.position.y = height * 0.38;
    body.add(shell);
    const components = (description.components || []).filter((component) => component.id !== "body");
    const radius = Math.max(width, length) * 0.46;
    components.slice(0, 10).forEach((component, index) => {
      const angle = (index / Math.max(components.length, 1)) * Math.PI * 2;
      const pod = this.makeMesh(
        new THREE.CylinderGeometry(width * 0.07, width * 0.07, height * 0.09, 20),
        createMaterial(index % 2 ? 0x2b373c : 0x3e98a0, 0.35, 0.44),
        component.id,
      );
      pod.position.set(Math.cos(angle) * radius, height * (0.25 + (index % 3) * 0.17), Math.sin(angle) * radius);
      body.add(pod);
    });
    this.registerComponent("body", body);
    return body;
  }

  setComponentHealth(healthMap) {
    this.componentHealth = healthMap instanceof Map ? healthMap : new Map(Object.entries(healthMap || {}));
    const entries = [...this.componentHealth.entries()].sort(([left], [right]) => left.split("/").length - right.split("/").length);
    entries.forEach(([componentId, health]) => {
      const normalized = safeHealth(health);
      const objects = this.componentObjects.get(componentId) || [];
      objects.forEach((object) => object.traverse((child) => {
        if (!child.isMesh) return;
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.filter(Boolean).forEach((material) => {
          if (!material.emissive) return;
          material.emissive.copy(material.userData.vitalsBaseEmissive || new THREE.Color(0x000000));
          material.emissiveIntensity = material.userData.vitalsBaseIntensity || 0;
          if (normalized !== "unknown") {
            material.emissive.lerp(HEALTH_COLORS[normalized], normalized === "ok" ? 0.42 : 0.82);
            material.emissiveIntensity = normalized === "ok" ? 0.16 : normalized === "stale" ? 0.26 : 0.52;
          }
        });
      }));
    });
    if (this.selectionHelper) {
      const selectedHealth = safeHealth(this.componentHealth.get(this.selectedComponentId));
      this.selectionHelper.material.color.copy(
        selectedHealth === "unknown" ? new THREE.Color(0x5fcdd8) : HEALTH_COLORS[selectedHealth],
      );
    }
    this.renderOnce();
  }

  selectComponent(componentId) {
    this.selectedComponentId = componentId || "body";
    if (this.selectionHelper) {
      this.scene.remove(this.selectionHelper);
      this.selectionHelper.geometry.dispose();
      this.selectionHelper.material.dispose();
      this.selectionHelper = null;
    }
    const object = (this.componentObjects.get(this.selectedComponentId) || []).at(-1);
    if (!object) return;
    const box = new THREE.Box3().setFromObject(object);
    const health = safeHealth(this.componentHealth.get(this.selectedComponentId));
    const color = health === "unknown" ? 0x5fcdd8 : HEALTH_COLORS[health];
    this.selectionHelper = new THREE.Box3Helper(box, color);
    this.selectionHelper.material.transparent = true;
    this.selectionHelper.material.opacity = 0.72;
    this.scene.add(this.selectionHelper);
    this.renderOnce();
  }

  pick(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hit = this.raycaster.intersectObject(this.robotRoot, true).find((item) => item.object.userData.componentId);
    if (hit) this.onSelect(hit.object.userData.componentId);
  }

  canvasStats() {
    this.resize();
    this.renderer.render(this.scene, this.camera);
    const gl = this.renderer.getContext();
    const width = this.renderer.domElement.width;
    const height = this.renderer.domElement.height;
    const pixel = new Uint8Array(4);
    const colors = new Set();
    let foregroundSamples = 0;
    let samples = 0;
    for (let row = 1; row <= 12; row += 1) {
      for (let column = 1; column <= 12; column += 1) {
        const x = Math.min(width - 1, Math.floor((column / 13) * width));
        const y = Math.min(height - 1, Math.floor((row / 13) * height));
        gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
        const color = `${pixel[0]}:${pixel[1]}:${pixel[2]}:${pixel[3]}`;
        colors.add(color);
        if (Math.abs(pixel[0] - 8) + Math.abs(pixel[1] - 17) + Math.abs(pixel[2] - 21) > 24) foregroundSamples += 1;
        samples += 1;
      }
    }
    return { width, height, samples, foregroundSamples, distinctColors: colors.size };
  }
}

class VitalsDashboard {
  constructor(root) {
    this.root = root;
    this.description = null;
    this.hardware = null;
    this.modules = null;
    this.providers = null;
    this.sources = new Map([
      ["soma", { state: "connecting", error: "" }],
      ["hardware", { state: "connecting", error: "" }],
      ["modules", { state: "connecting", error: "" }],
      ["atlas", { state: "connecting", error: "" }],
    ]);
    this.selectedComponentId = "body";
    this.softwareMode = "modules";
    this.socket = null;
    this.reconnectTimer = 0;
    this.active = false;
    this.everActivated = false;
    this.renderMode = "procedural";
    this.viewport = null;

    const refreshIcon = byId("vitalsReconnectIcon");
    if (refreshIcon) refreshIcon.appendChild(icon(RefreshCw, 17));
    try {
      this.viewport = new RobotViewport(byId("vitalsCanvas"), (componentId) => this.selectComponent(componentId));
    } catch (error) {
      const fallback = document.createElement("div");
      fallback.className = "vitals-empty vitals-canvas-fallback";
      fallback.textContent = `3D renderer unavailable: ${error}`;
      byId("vitalsCanvas")?.appendChild(fallback);
      this.sources.set("client", { state: "error", error: String(error) });
    }

    byId("vitalsReconnect")?.addEventListener("click", () => this.connect(true));
    byId("vitalsModulesTab")?.addEventListener("click", () => this.setSoftwareMode("modules"));
    byId("vitalsProvidersTab")?.addEventListener("click", () => this.setSoftwareMode("providers"));
    window.addEventListener("robonix:page", (event) => this.setActive(event.detail?.name === "vitals"));
    window.addEventListener("robonix:settings", () => {
      if (this.active) this.connect(true);
    });
    document.addEventListener("visibilitychange", () => {
      this.viewport?.setActive(this.active && !document.hidden);
    });
    window.addEventListener("beforeunload", () => this.disconnect());
    this.ageTimer = window.setInterval(() => this.renderUpdatedAt(), 1000);
    this.renderAll();
    this.setActive(document.querySelector("[data-page-panel='vitals']")?.classList.contains("active"));
  }

  settings() {
    if (typeof window.collectSettings === "function") return window.collectSettings();
    const host = byId("robotHost")?.value?.trim() || "";
    const atlasPort = Number.parseInt(byId("atlasPort")?.value || "50051", 10) || 50051;
    return { robotHost: host, atlasPort, atlasEndpoint: host ? `${host}:${atlasPort}` : "" };
  }

  setActive(active) {
    this.active = Boolean(active);
    this.viewport?.setActive(this.active && !document.hidden);
    if (!this.active) return;
    this.everActivated = true;
    if (!this.socket || this.socket.readyState > WebSocket.OPEN) this.connect();
  }

  disconnect() {
    if (this.reconnectTimer) window.clearTimeout(this.reconnectTimer);
    this.reconnectTimer = 0;
    const socket = this.socket;
    this.socket = null;
    socket?.close(1000, "Vitals page closed");
  }

  connect(force = false) {
    if (!this.everActivated && !force) return;
    if (this.reconnectTimer) window.clearTimeout(this.reconnectTimer);
    this.reconnectTimer = 0;
    const oldSocket = this.socket;
    this.socket = null;
    oldSocket?.close(1000, "Vitals reconnect");
    this.sources.forEach((_value, key) => this.sources.set(key, { state: "connecting", error: "" }));
    byId("vitalsReconnect")?.classList.add("busy");
    this.renderSources();

    const socket = new WebSocket(this.websocketUrl("/ws/vitals"));
    this.socket = socket;
    socket.onopen = () => socket.send(JSON.stringify({ settings: this.settings() }));
    socket.onmessage = (message) => {
      try {
        this.handleEvent(JSON.parse(message.data));
      } catch (error) {
        this.sources.set("client", { state: "error", error: String(error) });
        this.renderSources();
      }
    };
    socket.onerror = () => {
      this.sources.set("client", { state: "error", error: "Vitals WebSocket failed" });
      this.renderSources();
    };
    socket.onclose = () => {
      if (this.socket !== socket) return;
      this.socket = null;
      byId("vitalsReconnect")?.classList.remove("busy");
      if (!this.active) return;
      this.reconnectTimer = window.setTimeout(() => {
        this.reconnectTimer = 0;
        this.connect();
      }, 1800);
    };
  }

  websocketUrl(path) {
    const protocol = location.protocol === "https:" ? "wss:" : "ws:";
    return `${protocol}//${location.host}${path}`;
  }

  handleEvent(event) {
    if (!event || typeof event !== "object") return;
    if (event.type === "accepted") {
      byId("vitalsReconnect")?.classList.remove("busy");
      return;
    }
    if (event.type === "description") {
      this.description = event.data;
      if (!this.selectedComponent()) this.selectedComponentId = "body";
      this.viewport?.loadDescription(this.description).then((mode) => {
        if (mode && mode !== "superseded") {
          this.renderMode = mode;
          this.renderStage();
          this.viewport?.setComponentHealth(this.componentHealthMap());
          this.viewport?.selectComponent(this.selectedComponentId);
        }
      });
      this.renderDescription();
      return;
    }
    if (event.type === "hardware") {
      this.hardware = event.data;
      this.viewport?.setComponentHealth(this.componentHealthMap());
      this.renderHardware();
      return;
    }
    if (event.type === "modules") {
      this.modules = event.data;
      this.renderOverview();
      this.renderSoftware();
      return;
    }
    if (event.type === "providers") {
      this.providers = event.data;
      this.renderOverview();
      this.renderSoftware();
      return;
    }
    if (event.type === "source") {
      this.sources.set(event.source, { state: event.state, error: event.error || "" });
      this.renderSources();
      return;
    }
    if (event.type === "error") {
      this.sources.set("client", { state: "error", error: event.error || "Vitals stream error" });
      this.renderSources();
    }
  }

  componentHealthMap() {
    return new Map((this.hardware?.componentHealth || []).map((row) => [row.componentId, safeHealth(row.health)]));
  }

  selectedComponent() {
    return (this.description?.components || []).find((component) => component.id === this.selectedComponentId) || null;
  }

  selectedHealth() {
    return (this.hardware?.componentHealth || []).find((row) => row.componentId === this.selectedComponentId) || null;
  }

  selectComponent(componentId) {
    if (!(this.description?.components || []).some((component) => component.id === componentId)) return;
    this.selectedComponentId = componentId;
    this.viewport?.selectComponent(componentId);
    this.renderComponents();
    this.renderInspector();
  }

  setSoftwareMode(mode) {
    this.softwareMode = mode === "providers" ? "providers" : "modules";
    const modulesTab = byId("vitalsModulesTab");
    const providersTab = byId("vitalsProvidersTab");
    modulesTab?.classList.toggle("active", this.softwareMode === "modules");
    providersTab?.classList.toggle("active", this.softwareMode === "providers");
    modulesTab?.setAttribute("aria-selected", String(this.softwareMode === "modules"));
    providersTab?.setAttribute("aria-selected", String(this.softwareMode === "providers"));
    this.renderSoftware();
  }

  renderAll() {
    this.renderDescription();
    this.renderHardware();
    this.renderSoftware();
    this.renderSources();
  }

  renderDescription() {
    const description = this.description;
    if (byId("vitalsRobotName")) byId("vitalsRobotName").textContent = description?.displayName || "Robot";
    if (byId("vitalsRobotMeta")) {
      byId("vitalsRobotMeta").textContent = description ? `${description.id} · ${description.family || "generic"}` : "Waiting for Soma";
    }
    if (byId("vitalsStageName")) byId("vitalsStageName").textContent = description?.displayName || "Robot";
    const dimensions = description?.dimensions;
    if (byId("vitalsStageDimensions")) {
      byId("vitalsStageDimensions").textContent = dimensions
        ? `${Number(dimensions.lengthM).toFixed(2)} × ${Number(dimensions.widthM).toFixed(2)} × ${Number(dimensions.heightM).toFixed(2)} m`
        : "--";
    }
    const count = description?.components?.length || 0;
    if (byId("vitalsComponentCount")) byId("vitalsComponentCount").textContent = `${count} components`;
    this.renderComponents();
    this.renderInspector();
    this.renderStage();
    this.renderOverview();
  }

  renderHardware() {
    this.renderComponents();
    this.renderInspector();
    this.renderOverview();
  }

  renderOverview() {
    const hardwareHealth = safeHealth(this.hardware?.summary?.overall);
    const moduleHealth = safeHealth(this.modules?.summary?.overall);
    const providerHealth = safeHealth(this.providers?.summary?.overall);
    const overall = highestHealth([hardwareHealth, moduleHealth, providerHealth]);
    setHealthLabel(byId("vitalsOverallHealth"), overall);
    setHealthLabel(byId("vitalsInspectorHealth"), this.selectedHealth()?.health || "unknown");
    if (byId("vitalsHardwareSummary")) byId("vitalsHardwareSummary").textContent = healthSummary(this.hardware?.summary, "components");
    if (byId("vitalsSoftwareSummary")) byId("vitalsSoftwareSummary").textContent = healthSummary(this.modules?.summary, "modules");
    const power = this.hardware?.power;
    if (byId("vitalsBatterySummary")) {
      byId("vitalsBatterySummary").textContent = power
        ? `${Math.round(power.socPercent)}% · ${Number(power.voltage).toFixed(1)} V${power.charging ? " · charging" : ""}`
        : "--";
    }
    this.renderUpdatedAt();
  }

  renderUpdatedAt() {
    const latest = Math.max(
      Number(this.hardware?.updatedAtMs || 0),
      Number(this.modules?.updatedAtMs || 0),
      Number(this.providers?.updatedAtMs || 0),
    );
    if (byId("vitalsUpdatedAt")) byId("vitalsUpdatedAt").textContent = formatAge(latest);
  }

  renderSources() {
    const root = byId("vitalsSourceStrip");
    clear(root);
    this.sources.forEach((source, key) => {
      const node = document.createElement("span");
      node.className = `vitals-source ${source.state || "connecting"}`;
      node.textContent = SOURCE_LABELS[key] || key;
      if (source.error) node.title = source.error;
      root?.appendChild(node);
    });
  }

  renderStage() {
    if (byId("vitalsRenderMode")) byId("vitalsRenderMode").textContent = `${this.renderMode} model`;
  }

  renderComponents() {
    const root = byId("vitalsComponentList");
    clear(root);
    const healthMap = this.componentHealthMap();
    const components = this.description?.components || [];
    if (!components.length) {
      const empty = document.createElement("div");
      empty.className = "vitals-empty";
      empty.textContent = "Waiting for robot description";
      root?.appendChild(empty);
      return;
    }
    components.forEach((component) => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = "vitals-component-row";
      row.classList.toggle("active", component.id === this.selectedComponentId);
      row.style.setProperty("--component-depth", String(Math.max(0, component.id.split("/").length - 1)));
      row.title = component.id;
      const iconRoot = document.createElement("span");
      iconRoot.className = "vitals-component-icon";
      iconRoot.appendChild(icon(componentIcon(component.type), 15));
      const copy = document.createElement("span");
      copy.className = "vitals-component-copy";
      const label = document.createElement("strong");
      label.textContent = component.label || component.localId || component.id;
      const type = document.createElement("span");
      type.textContent = component.type || "component";
      copy.append(label, type);
      const status = document.createElement("span");
      status.className = `vitals-status-dot ${safeHealth(healthMap.get(component.id))}`;
      status.title = safeHealth(healthMap.get(component.id));
      row.append(iconRoot, copy, status);
      row.addEventListener("click", () => this.selectComponent(component.id));
      root?.appendChild(row);
    });
  }

  detailRow(label, value) {
    const row = document.createElement("div");
    row.className = "vitals-detail-row";
    const key = document.createElement("span");
    key.textContent = label;
    const result = document.createElement("strong");
    result.textContent = value || "--";
    row.append(key, result);
    return row;
  }

  inspectorSection(title) {
    const section = document.createElement("section");
    section.className = "vitals-inspector-section";
    const heading = document.createElement("h4");
    heading.textContent = title;
    section.appendChild(heading);
    return section;
  }

  renderInspector() {
    const component = this.selectedComponent();
    const health = this.selectedHealth();
    const root = byId("vitalsInspectorBody");
    clear(root);
    if (byId("vitalsInspectorTitle")) byId("vitalsInspectorTitle").textContent = component?.label || "Robot";
    if (byId("vitalsInspectorPath")) byId("vitalsInspectorPath").textContent = component?.id || "body";
    setHealthLabel(byId("vitalsInspectorHealth"), health?.health || "unknown");
    if (!component) {
      const empty = document.createElement("div");
      empty.className = "vitals-empty";
      empty.textContent = "Waiting for component data";
      root?.appendChild(empty);
      return;
    }

    const identity = this.inspectorSection("Identity");
    identity.append(
      this.detailRow("Type", component.type),
      this.detailRow("Parent", component.parentId || "root"),
      this.detailRow("Providers", (component.providers || []).join(", ")),
      this.detailRow("URDF link", component.urdfLink),
      this.detailRow("URDF joint", component.urdfJoint),
    );
    root?.appendChild(identity);

    const status = this.inspectorSection("Status");
    status.append(
      this.detailRow("Aggregate", health?.health || "unknown"),
      this.detailRow("Direct", health?.directHealth || "unknown"),
      this.detailRow("Signals", String(health?.signalCount || 0)),
      this.detailRow("Source", health?.sourceComponentId || component.id),
    );
    if (health?.detail) status.appendChild(this.detailRow("Detail", health.detail));
    root?.appendChild(status);

    const signalSection = this.inspectorSection("Signals");
    const signalKeys = new Set(health?.signalKeys || []);
    const signals = (this.hardware?.signals || []).filter((signal) => signalKeys.has(signal.key));
    if (!signals.length) {
      const empty = document.createElement("div");
      empty.className = "vitals-empty";
      empty.textContent = "No direct health signals";
      signalSection.appendChild(empty);
    } else {
      signals.forEach((signal) => {
        const row = document.createElement("div");
        row.className = "vitals-signal-row";
        const dot = document.createElement("span");
        dot.className = `vitals-status-dot ${safeHealth(signal.health)}`;
        const copy = document.createElement("span");
        copy.className = "vitals-signal-copy";
        const key = document.createElement("strong");
        key.textContent = signal.key;
        const detail = document.createElement("span");
        detail.textContent = signal.detail || `${signal.observedValue} / ${signal.referenceValue}`;
        copy.append(key, detail);
        row.append(dot, copy);
        signalSection.appendChild(row);
      });
    }
    root?.appendChild(signalSection);
  }

  renderSoftware() {
    const root = byId("vitalsSoftwareList");
    clear(root);
    const modules = this.modules?.modules || [];
    const providers = this.providers?.providers || [];
    const isModules = this.softwareMode === "modules";
    const rows = isModules ? modules : providers;
    const summary = isModules ? this.modules?.summary : this.providers?.summary;
    if (byId("vitalsSoftwareDetail")) {
      byId("vitalsSoftwareDetail").textContent = healthSummary(summary, isModules ? "modules" : "providers");
    }
    const headings = isModules
      ? ["Module", "Health", "State / reason", "Source", "TTL"]
      : ["Provider", "Health", "State", "Namespace", "Capabilities"];
    const head = document.createElement("div");
    head.className = "vitals-software-head";
    headings.forEach((heading) => {
      const cell = document.createElement("span");
      cell.textContent = heading;
      head.appendChild(cell);
    });
    root?.appendChild(head);

    if (!rows.length) {
      const empty = document.createElement("div");
      empty.className = "vitals-empty";
      empty.style.padding = "14px 12px";
      empty.textContent = isModules ? "No module health reports" : "No Atlas providers";
      root?.appendChild(empty);
      return;
    }
    rows.forEach((item) => {
      const row = document.createElement("div");
      row.className = "vitals-software-row";
      const name = document.createElement("strong");
      name.textContent = isModules ? item.moduleId || item.moduleKey : item.id;
      name.title = name.textContent;
      const health = document.createElement("span");
      health.className = "vitals-software-state";
      const dot = document.createElement("span");
      dot.className = `vitals-status-dot ${safeHealth(item.health)}`;
      const healthText = document.createElement("span");
      healthText.textContent = safeHealth(item.health);
      health.append(dot, healthText);
      const state = document.createElement("span");
      state.textContent = isModules ? [item.state, item.reasonCode].filter(Boolean).join(" · ") : item.state || "unknown";
      state.title = isModules ? item.detail || state.textContent : item.stateDetail || state.textContent;
      const source = document.createElement("span");
      source.textContent = isModules ? item.source || item.providerId || "--" : item.namespace || "--";
      source.title = source.textContent;
      const tail = document.createElement("span");
      tail.textContent = isModules ? `${item.ttlMs || 0} ms` : String(item.capabilities?.length || 0);
      row.append(name, health, state, source, tail);
      root?.appendChild(row);
    });
  }
}

const root = byId("vitalsRoot");
if (root) {
  const dashboard = new VitalsDashboard(root);
  window.__robonixVitalsDebug = {
    canvasStats: () => dashboard.viewport?.canvasStats() || null,
    state: () => ({
      active: dashboard.active,
      robotId: dashboard.description?.id || "",
      components: dashboard.description?.components?.length || 0,
      hardwareSignals: dashboard.hardware?.signals?.length || 0,
      modules: dashboard.modules?.modules?.length || 0,
      providers: dashboard.providers?.providers?.length || 0,
      renderMode: dashboard.renderMode,
    }),
  };
}
