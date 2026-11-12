/**
 * Glass logo engine, adapted from the "Premium 3D Glass" template (Three.js r160).
 * The Reality mark is extruded into optical glass with edge dispersion, split into
 * fragments that start scattered and assemble as the visitor scrolls through the section.
 * Pure module: no React, no globals. `createGlassScene` returns a small controller.
 */
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

const V2 = (x = 0, y = 0) => new THREE.Vector2(x, y);
const cross2 = (a: THREE.Vector2, b: THREE.Vector2) => a.x * b.y - a.y * b.x;
const lerp = THREE.MathUtils.lerp;
const clamp = THREE.MathUtils.clamp;

export const smoothRange = (v: number, a: number, b: number) => {
  const t = clamp((v - a) / (b - a), 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
};

// ---- Tunables ---------------------------------------------------------------
const LOGO_HEIGHT = 2.7;
const DEPTH = 0.46;
const BEVEL = { size: 0.045, thickness: 0.055 };
const SEAM = 0.006;
const FRAGMENTS = 4;

/** Scroll timeline inside the section (0..1). */
export const TIMELINE = {
  scatteredUntil: 0.3, // fragments drift apart, labels visible
  assembledAt: 0.62, // fragments home
  bevelDone: 0.7, // seams melt into one prism
};

// ---- glass -----------------------------------------------------------------------
function glassEnvironment(renderer: THREE.WebGLRenderer, scene: THREE.Scene) {
  const studio = new THREE.Scene();
  studio.background = new THREE.Color('#060a14');
  const panels: [number, number, number, number, number, string, number][] = [
    [2.8, 8, -4, 2, 3, '#ffffff', 2.6],
    [0.65, 7, 3, 1, 2, '#dceeff', 4.0],
    [5, 0.7, 0, 5, -1, '#ffffff', 3.5],
    [0.5, 6, -2, 0, -4, '#4d9dff', 3.2],
    [1.0, 5, 3, -1, -3, '#7fe3c4', 2.2],
    [4, 0.35, 0, -3, 3, '#92bbff', 3.0],
    [0.16, 5, -3, 0, 2, '#ffffff', 5.0],
    [0.35, 4, 4, 0, -2, '#ffd08a', 1.6],
  ];
  for (const [w, h, x, y, z, color, intensity] of panels) {
    const panel = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), side: THREE.DoubleSide }),
    );
    panel.position.set(x, y, z);
    panel.lookAt(0, 0, 0);
    studio.add(panel);
  }
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(studio, 0.025, 0.1, 100).texture;
  studio.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) {
      (o as THREE.Mesh).geometry.dispose();
      ((o as THREE.Mesh).material as THREE.Material).dispose();
    }
  });
  pmrem.dispose();
}

function glassMaterial() {
  const glass = new THREE.MeshPhysicalMaterial({
    color: '#f6fbff',
    metalness: 0,
    roughness: 0.025,
    transmission: 1,
    thickness: 0.5,
    ior: 1.46,
    attenuationColor: new THREE.Color('#dcecff'),
    attenuationDistance: 6,
    clearcoat: 0.65,
    clearcoatRoughness: 0.018,
    iridescence: 0.55,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [100, 420],
    envMapIntensity: 1.1,
    side: THREE.DoubleSide,
  });
  // r160 has no dispersion: sample the transmission three times with split IORs.
  glass.onBeforeCompile = (shader) => {
    shader.uniforms.uChromaticSpread = { value: 0.018 };
    shader.fragmentShader = 'uniform float uChromaticSpread;\n' + shader.fragmentShader;
    const transmission = THREE.ShaderChunk.transmission_fragment.replace(
      /vec4 transmitted = getIBLVolumeRefraction\([\s\S]*?\);/,
      `float chromaticSpread = uChromaticSpread * mix(0.35, 1.0, smoothstep(0.15, 0.85, 1.0 - abs(dot(n, v))));
      vec4 transmitted = getIBLVolumeRefraction(n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
        pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness, material.attenuationColor, material.attenuationDistance);
      vec4 transmittedRed = getIBLVolumeRefraction(n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
        pos, modelMatrix, viewMatrix, projectionMatrix, material.ior - chromaticSpread, material.thickness, material.attenuationColor, material.attenuationDistance);
      vec4 transmittedBlue = getIBLVolumeRefraction(n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
        pos, modelMatrix, viewMatrix, projectionMatrix, material.ior + chromaticSpread, material.thickness, material.attenuationColor, material.attenuationDistance);
      transmitted = vec4(transmittedRed.r, transmitted.g, transmittedBlue.b, (transmittedRed.a + transmitted.a + transmittedBlue.a) / 3.0);`,
    );
    shader.fragmentShader = shader.fragmentShader.replace('#include <transmission_fragment>', transmission);
  };
  glass.customProgramCacheKey = () => 'reality-glass-dispersion-v1';
  return glass;
}

// ---- 2D contour helpers (from the template) ----------------------------------
function cleanContour(points: THREE.Vector2[], eps = 1e-4) {
  const c: THREE.Vector2[] = [];
  for (const p of points) if (!c.length || c[c.length - 1].distanceTo(p) > eps) c.push(p.clone());
  while (c.length > 1 && c[0].distanceTo(c[c.length - 1]) <= eps) c.pop();
  const r = c.filter((p, i) => {
    const prev = c[(i - 1 + c.length) % c.length];
    const next = c[(i + 1) % c.length];
    return Math.abs(cross2(p.clone().sub(prev), next.clone().sub(p))) > 1e-7;
  });
  if (THREE.ShapeUtils.isClockWise(r)) r.reverse();
  return r;
}

function clipContour(points: THREE.Vector2[], planes: { origin: THREE.Vector2; normal: THREE.Vector2 }[]) {
  let poly = points.map((p) => p.clone());
  for (const { origin, normal } of planes) {
    const out: THREE.Vector2[] = [];
    for (let i = 0; i < poly.length; i++) {
      const p = poly[i];
      const q = poly[(i + 1) % poly.length];
      const dp = p.clone().sub(origin).dot(normal);
      const dq = q.clone().sub(origin).dot(normal);
      if (dp >= 0) out.push(p);
      if (dp >= 0 !== dq >= 0) out.push(p.clone().lerp(q, dp / (dp - dq)));
    }
    poly = out;
    if (!poly.length) break;
  }
  return cleanContour(poly);
}

function wedge(center: THREE.Vector2, a0: number, a1: number) {
  const dir = (d: number) => V2(Math.cos(THREE.MathUtils.degToRad(d)), Math.sin(THREE.MathUtils.degToRad(d)));
  const a = dir(a0);
  const b = dir(a1);
  return [
    { origin: center, normal: V2(-a.y, a.x) },
    { origin: center, normal: V2(b.y, -b.x) },
  ];
}

function kernelRatio(points: THREE.Vector2[]) {
  const c = points.slice();
  if (THREE.ShapeUtils.isClockWise(c)) c.reverse();
  const span = new THREE.Box2().setFromPoints(c).getSize(V2()).length() * 2 + 1;
  let k = [V2(-span, -span), V2(span, -span), V2(span, span), V2(-span, span)];
  for (let i = 0; i < c.length; i++) {
    const a = c[i];
    const e = c[(i + 1) % c.length].clone().sub(a);
    const out: THREE.Vector2[] = [];
    for (let j = 0; j < k.length; j++) {
      const p = k[j];
      const q = k[(j + 1) % k.length];
      const dp = cross2(e, p.clone().sub(a));
      const dq = cross2(e, q.clone().sub(a));
      if (dp >= -1e-10) out.push(p);
      if (dp >= 0 !== dq >= 0) out.push(p.clone().lerp(q, dp / (dp - dq)));
    }
    k = out;
    if (!k.length) return 0;
  }
  return Math.abs(THREE.ShapeUtils.area(k)) / Math.abs(THREE.ShapeUtils.area(c));
}

function partition(outline: THREE.Vector2[], count: number) {
  if (count <= 1) return [outline];
  const centre = new THREE.Box2().setFromPoints(outline).getCenter(V2());
  const step = 360 / count;
  let best: { worst: number; pieces: THREE.Vector2[][] } | null = null;
  for (let off = 0; off < step - 0.001; off += 5) {
    const pieces: THREE.Vector2[][] = [];
    let worst = Infinity;
    for (let i = 0; i < count; i++) {
      const piece = clipContour(outline, wedge(centre, off + i * step, off + (i + 1) * step));
      if (piece.length < 3) {
        worst = -1;
        break;
      }
      worst = Math.min(worst, kernelRatio(piece));
      pieces.push(piece);
    }
    if (worst >= 0 && (!best || worst > best.worst)) best = { worst, pieces };
  }
  if (!best) throw new Error('Could not split shape');
  return best.pieces;
}

function parseShape(svgText: string) {
  const svg = new SVGLoader().parse(svgText);
  const contours = svg.paths
    .flatMap((path) => path.subPaths.map((sub) => cleanContour(sub.getPoints(8).map((p) => V2(p.x, -p.y)))))
    .filter((c) => c.length >= 3 && Math.abs(THREE.ShapeUtils.area(c)) > 1e-9)
    .sort((a, b) => Math.abs(THREE.ShapeUtils.area(b)) - Math.abs(THREE.ShapeUtils.area(a)));
  const [outline, ...extras] = contours;
  // fit: centre on origin, scale to LOGO_HEIGHT
  const bounds = new THREE.Box2().setFromPoints(contours.flat());
  const centre = bounds.getCenter(V2());
  const size = bounds.getSize(V2());
  const s = LOGO_HEIGHT / Math.max(size.x, size.y);
  const fit = (c: THREE.Vector2[]) => c.map((p) => p.clone().sub(centre).multiplyScalar(s));
  return { outline: fit(outline), extras: extras.map(fit) };
}

function prism(points: THREE.Vector2[], bevelSize: number, bevelThickness: number, holes: THREE.Vector2[][] = []) {
  const shape = new THREE.Shape(points);
  for (const h of holes) shape.holes.push(new THREE.Path(h));
  const g = new THREE.ExtrudeGeometry(shape, {
    depth: DEPTH,
    steps: 1,
    bevelEnabled: true,
    bevelSize,
    bevelThickness,
    bevelSegments: 6,
    curveSegments: 24,
  });
  g.translate(0, 0, -DEPTH / 2);
  return g;
}

function recentre(points: THREE.Vector2[]) {
  const c = new THREE.Box2().setFromPoints(points).getCenter(V2());
  return { contour: points.map((p) => p.clone().sub(c)), home: new THREE.Vector3(c.x, c.y, 0) };
}

// ---- background: deep night with brand-blue folds (camera-attached plane) ------
function background(camera: THREE.PerspectiveCamera, uniforms: Record<string, THREE.IUniform>) {
  const material = new THREE.ShaderMaterial({
    uniforms,
    depthWrite: false,
    depthTest: false,
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      uniform float uTime; uniform vec2 uResolution; uniform vec2 uMouse; uniform float uScroll; uniform float uSide;
      mat2 rot(float a){ return mat2(cos(a),-sin(a),sin(a),cos(a)); }
      float line(float d, float w){ return 1.0 - smoothstep(w, w + 1.5 / uResolution.y, abs(d)); }
      void main(){
        vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
        float s = uScroll; float t = uTime * 0.065;
        vec3 blue = vec3(0.0, 0.48, 1.0);
        vec3 deep = vec3(0.0, 0.24, 0.56);
        vec3 teal = vec3(0.05, 0.65, 0.47);
        vec3 primary = mix(deep, blue, smoothstep(0.1, 0.65, s));
        vec3 secondary = mix(blue, teal, smoothstep(0.45, 1.0, s));
        vec3 color = vec3(0.012, 0.02, 0.045);
        vec2 hu = (uv - vec2(uSide * 0.32, 0.08)) * vec2(1.1, 1.6);
        color += primary * exp(-dot(hu, hu) * 2.6) * 0.16;
        vec2 lu = (uv + vec2(uSide * 0.5, 0.32)) * vec2(1.5, 2.4);
        color += secondary * exp(-dot(lu, lu) * 2.0) * 0.05;
        vec2 p = rot(-0.24 + s * 0.6) * (uv - vec2(uSide * 0.3, -0.06));
        p += uMouse * 0.018;
        p.x += 0.15 * sin(p.y * 2.8 + s * 4.8 + t * 0.3);
        p.y += 0.09 * cos(p.x * 3.1 - s * 3.8 - t * 0.2);
        for (int i = 0; i < 3; i++) {
          float k = float(i);
          float r = length(p * vec2(0.9, 1.22));
          float a = atan(p.y, p.x);
          float c = 0.36 + k * 0.15 + 0.075 * sin(a * 2.0 + s * 5.0 + k * 0.28) + 0.022 * cos(a * 3.0 - t);
          float d = r - c;
          float arc = smoothstep(-0.65, 0.65, sin(a + k * 0.55 + s * 3.5));
          vec3 tint = mix(primary, secondary, k * 0.38);
          color += tint * (exp(-pow(d * 25.0, 2.0)) * 0.1 + exp(-pow((d + 0.018) * 13.0, 2.0)) * 0.025) * arc;
          color += mix(tint, vec3(0.75, 0.86, 1.0), 0.2) * line(d, 0.0008) * arc * 0.16;
        }
        vec2 g = rot(-0.2 + s * 0.18) * uv + vec2(s * 0.08, s * 0.16);
        vec2 cell = abs(fract(g * 10.0) - 0.5);
        float grid = max(line((0.5 - cell.x) / 10.0, 0.0002), line((0.5 - cell.y) / 10.0, 0.0002));
        color += primary * grid * smoothstep(0.28, 0.8, length(uv)) * 0.03;
        color *= mix(0.3, 1.0, 1.0 - smoothstep(0.4, 1.25, length(uv * vec2(0.8, 1.0))));
        gl_FragColor = vec4(color, 1.0);
      }`,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), material);
  mesh.position.set(0, 0, -8);
  mesh.renderOrder = -10;
  camera.add(mesh);
}

// ---- sparks -------------------------------------------------------------------------
function sparks(scene: THREE.Scene) {
  const n = 320;
  const pos = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);
  const data: { vx: number; vy: number; vz: number; sw: number; sr: number; ph: number }[] = [];
  for (let i = 0; i < n; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 6.5;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 5 - 0.5;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 6.5;
    const teal = Math.random() < 0.25;
    col[i * 3] = teal ? 0.5 : 0.8 + Math.random() * 0.2;
    col[i * 3 + 1] = teal ? 1.0 : 0.9 + Math.random() * 0.1;
    col[i * 3 + 2] = teal ? 0.85 : 1.0;
    data.push({
      vx: (Math.random() - 0.5) * 0.4,
      vy: 0.15 + Math.random() * 0.3,
      vz: (Math.random() - 0.5) * 0.4,
      sw: 0.5 + Math.random() * 1.5,
      sr: 0.05 + Math.random() * 0.15,
      ph: Math.random() * Math.PI * 2,
    });
  }
  const c = document.createElement('canvas');
  c.width = c.height = 16;
  const x = c.getContext('2d')!;
  const gr = x.createRadialGradient(8, 8, 0, 8, 8, 8);
  gr.addColorStop(0, 'rgba(255,255,255,1)');
  gr.addColorStop(0.25, 'rgba(255,255,255,0.85)');
  gr.addColorStop(0.6, 'rgba(255,255,255,0.3)');
  gr.addColorStop(1, 'rgba(0,0,0,0)');
  x.fillStyle = gr;
  x.fillRect(0, 0, 16, 16);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const points = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: new THREE.CanvasTexture(c),
    }),
  );
  scene.add(points);
  return (dt: number, time: number, velocity: number) => {
    const a = points.geometry.attributes.position.array as Float32Array;
    const speed = 1 + velocity * 9;
    for (let i = 0; i < n; i++) {
      const d = data[i];
      const k = i * 3;
      a[k] += d.vx * dt * speed + Math.sin(time * d.sw + d.ph) * d.sr * dt;
      a[k + 1] += d.vy * dt * speed;
      a[k + 2] += d.vz * dt * speed + Math.cos(time * d.sw + d.ph) * d.sr * dt;
      if (a[k + 1] > 3 || Math.abs(a[k]) > 3.5 || Math.abs(a[k + 2]) > 3.5) {
        a[k + 1] = -2.5;
        a[k] = (Math.random() - 0.5) * 3;
        a[k + 2] = (Math.random() - 0.5) * 3;
      }
    }
    points.geometry.attributes.position.needsUpdate = true;
  };
}

// ---- the scene ------------------------------------------------------------------------
export type GlassController = {
  /** Render one frame at section progress p (0..1, already smoothed). */
  frame: (p: number, velocity: number, mouse: { x: number; y: number }) => void;
  resize: (w: number, h: number) => void;
  /** Screen positions (CSS px) of each fragment centre, for the DOM labels. */
  fragmentScreen: () => { x: number; y: number }[];
  /** Which side the object sits on: -1 left, 1 right (landscape), 0 portrait. */
  dispose: () => void;
};

export function createGlassScene(canvas: HTMLCanvasElement, svgText: string, rtl: boolean): GlassController {
  const sizes = { w: canvas.clientWidth || innerWidth, h: canvas.clientHeight || innerHeight };
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#03060d');
  const camera = new THREE.PerspectiveCamera(45, sizes.w / sizes.h, 0.1, 100);
  camera.position.set(0, 0.2, 6);
  scene.add(camera);

  const uniforms: Record<string, THREE.IUniform> = {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(sizes.w, sizes.h) },
    uMouse: { value: new THREE.Vector2() },
    uScroll: { value: 0 },
    uSide: { value: rtl ? -1 : 1 },
  };
  background(camera, uniforms);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setSize(sizes.w, sizes.h, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 2.1;

  scene.add(new THREE.AmbientLight('#ffffff', 0.1));
  const key = new THREE.SpotLight('#ffffff', 18);
  key.position.set(4, 6, 3);
  key.angle = Math.PI / 4;
  key.penumbra = 0.9;
  scene.add(key);
  const rim = new THREE.DirectionalLight('#d6e9ff', 10);
  rim.position.set(-5, 3, -4);
  scene.add(rim);
  const fill = new THREE.DirectionalLight('#eaf6ff', 0.8);
  fill.position.set(-2, -4, 2);
  scene.add(fill);

  const stepSparks = sparks(scene);
  glassEnvironment(renderer, scene);
  const glass = glassMaterial();

  const pivot = new THREE.Group();
  scene.add(pivot);
  const logo = new THREE.Group();
  logo.rotation.set(-0.08, 0.28, -0.06);
  pivot.add(logo);

  const shape = parseShape(svgText);
  // Assembled body: one watertight prism per solid, so seams vanish once home.
  const bodyParts = [shape.outline, ...shape.extras].map((c) => {
    const r = recentre(c);
    const mesh = new THREE.Mesh<THREE.BufferGeometry, THREE.Material>(prism(r.contour, SEAM, SEAM), glass);
    mesh.position.copy(r.home);
    mesh.visible = false;
    logo.add(mesh);
    return { mesh, contour: r.contour, cache: new Map<string, THREE.BufferGeometry>(), key: '' };
  });

  const wedges = Math.max(1, FRAGMENTS - shape.extras.length);
  const contours = [...partition(shape.outline, wedges), ...shape.extras];
  const angle = (c: THREE.Vector2[]) => {
    const m = new THREE.Box2().setFromPoints(c).getCenter(V2());
    return (Math.atan2(m.y, m.x) + Math.PI * 2) % (Math.PI * 2);
  };
  contours.sort((a, b) => angle(a) - angle(b));
  const pieces = contours.map((c, i) => {
    const r = recentre(c);
    const mesh = new THREE.Mesh(prism(r.contour, BEVEL.size * 0.6, BEVEL.thickness * 0.6), glass);
    mesh.position.copy(r.home);
    logo.add(mesh);
    const radial = V2(r.home.x, r.home.y);
    if (radial.lengthSq() < 1e-6) radial.set(Math.cos(i), Math.sin(i));
    const offset = new THREE.Vector3(radial.x, radial.y, 0).normalize().multiplyScalar(0.78);
    offset.z = (i % 2 === 0 ? 1 : -1) * 0.45;
    const sx = Math.sign(offset.x) || 1;
    const sy = Math.sign(offset.y) || 1;
    return { mesh, home: r.home, offset, twist: new THREE.Vector3(sy * 0.22, sx * 0.3, -sx * sy * 0.14) };
  });

  const clock = new THREE.Clock();
  let separation = 1;
  let objectX = 0;
  let objectY = 0;
  let spread = 1;

  const layout = () => {
    const aspect = sizes.w / sizes.h;
    const portrait = clamp((1.0 - aspect) / 0.25, 0, 1);
    const side = rtl ? -1 : 1;
    // Landscape: object on the far side from the text column; portrait: upper half.
    // Landscape sits a touch low and further back, so the mark and its scattered pieces
    // clear the fixed nav and never crop on a laptop-height screen.
    objectX = side * 1.95 * (1 - portrait);
    objectY = lerp(-0.18, 1.15, portrait);
    spread = lerp(0.85, 0.6, portrait);
    camera.position.z = lerp(7.6, 9.4, portrait);
  };
  layout();

  const frame: GlassController['frame'] = (p, velocity, mouse) => {
    const dt = Math.min(clock.getDelta(), 0.1);
    const time = clock.getElapsedTime();
    const { scatteredUntil, assembledAt, bevelDone } = TIMELINE;

    // 1 = fully scattered, 0 = home. Slow drift while scattered so it never sits still.
    separation = 1 - smoothRange(p, scatteredUntil, assembledAt);
    const assembled = separation <= 0.0005;
    const breathe = Math.sin(time * 0.6) * 0.04;

    for (const [i, piece] of pieces.entries()) {
      piece.mesh.visible = !assembled;
      const s = separation * spread * (1 + breathe * (i % 2 ? 1 : -1));
      piece.mesh.position.copy(piece.home).addScaledVector(piece.offset, s);
      piece.mesh.rotation.set(
        piece.twist.x * s + Math.sin(time * 0.5 + i) * 0.05 * separation,
        piece.twist.y * s,
        piece.twist.z * s,
      );
    }

    const bevel = Math.round(smoothRange(p, assembledAt, bevelDone) * 24) / 24;
    for (const part of bodyParts) {
      part.mesh.visible = assembled;
      if (!assembled) continue;
      const k = String(bevel);
      if (part.key !== k) {
        let g = part.cache.get(k);
        if (!g) {
          g = prism(part.contour, lerp(SEAM, BEVEL.size, bevel), lerp(SEAM, BEVEL.thickness, bevel));
          part.cache.set(k, g);
        }
        part.mesh.geometry = g;
        part.key = k;
      }
    }

    // pivot: a slow turn over the section, plus pointer tilt
    pivot.position.set(objectX, objectY - 0.1, 0);
    pivot.rotation.y = lerp(-0.55, 0.35, smoothRange(p, 0, 1)) + mouse.x * 0.22;
    pivot.rotation.x = mouse.y * 0.14 + Math.sin(time * 0.4) * 0.03;
    const scale = 1 + (1 - separation) * 0.08;
    pivot.scale.setScalar(scale);

    camera.lookAt(objectX * 0.35, objectY * 0.5, 0);

    uniforms.uTime.value = time;
    uniforms.uScroll.value = p;
    (uniforms.uMouse.value as THREE.Vector2).set(mouse.x, -mouse.y);
    stepSparks(dt, time, velocity);
    renderer.render(scene, camera);
  };

  const tmp = new THREE.Vector3();
  const fragmentScreen = () =>
    pieces.map((piece) => {
      piece.mesh.getWorldPosition(tmp);
      tmp.project(camera);
      return { x: (tmp.x * 0.5 + 0.5) * sizes.w, y: (-tmp.y * 0.5 + 0.5) * sizes.h };
    });

  const resize = (w: number, h: number) => {
    sizes.w = w;
    sizes.h = h;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    (uniforms.uResolution.value as THREE.Vector2).set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
    layout();
  };
  resize(sizes.w, sizes.h);

  const dispose = () => {
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
    });
    bodyParts.forEach((b) => b.cache.forEach((g) => g.dispose()));
    glass.dispose();
    renderer.dispose();
  };

  return { frame, resize, fragmentScreen, dispose };
}
