import * as THREE from 'three';
import { PORTFOLIO_CONFIG } from './config.js';

export const GALAXY_THEMES = {
  cyan: {
    id: 'cyan',
    name: 'Cyber Cyan',
    inside: new THREE.Color('#ffffff'),
    mid: new THREE.Color('#38bdf8'),
    outside: new THREE.Color('#1e3a8a'),
    coreAccent: new THREE.Color('#a5f3fc'),
    dotColor: 0x67e8f9,
    wireframeHover: 0x38bdf8
  },
  pink: {
    id: 'pink',
    name: 'Cosmic Pink',
    inside: new THREE.Color('#ffffff'),
    mid: new THREE.Color('#ec4899'),
    outside: new THREE.Color('#701a75'),
    coreAccent: new THREE.Color('#fbcfe8'),
    dotColor: 0xf472b6,
    wireframeHover: 0xec4899
  },
  gold: {
    id: 'gold',
    name: 'Solar Gold',
    inside: new THREE.Color('#ffffff'),
    mid: new THREE.Color('#f59e0b'),
    outside: new THREE.Color('#78350f'),
    coreAccent: new THREE.Color('#fde68a'),
    dotColor: 0xfbbf24,
    wireframeHover: 0xf59e0b
  },
  emerald: {
    id: 'emerald',
    name: 'Neon Emerald',
    inside: new THREE.Color('#ffffff'),
    mid: new THREE.Color('#10b981'),
    outside: new THREE.Color('#064e3b'),
    coreAccent: new THREE.Color('#a7f3d0'),
    dotColor: 0x34d399,
    wireframeHover: 0x10b981
  }
};

export const NAV_ICONS = {
  folder: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
  user: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
  envelope: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><polyline points="22,6 12,13 2,6"></polyline></svg>`,
  document: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>`,
  github: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`,
  linkedin: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`,
  instagram: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`,
  photo: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`
};

/**
 * Helper to build LineSegments buffer geometries from pairs of 3D vertices
 */
function makeLineSegmentsGeometry(pairs) {
  const positions = new Float32Array(pairs.flat());
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return geo;
}

// 1. PROJECTS: 3D Folder / Layered Project
function createFolderGeo(s) {
  const pairs = [];
  const addLoop = (pts) => {
    for (let i = 0; i < pts.length; i++) {
      pairs.push(pts[i], pts[(i + 1) % pts.length]);
    }
  };
  // Back plate with tab
  const b = [
    [-0.15 * s, -0.11 * s, -0.02 * s],
    [ 0.15 * s, -0.11 * s, -0.02 * s],
    [ 0.15 * s,  0.10 * s, -0.02 * s],
    [ 0.04 * s,  0.10 * s, -0.02 * s],
    [ 0.01 * s,  0.14 * s, -0.02 * s],
    [-0.11 * s,  0.14 * s, -0.02 * s],
    [-0.14 * s,  0.10 * s, -0.02 * s],
    [-0.15 * s,  0.10 * s, -0.02 * s]
  ];
  addLoop(b);
  // Front plate tilted forward
  const f = [
    [-0.15 * s, -0.11 * s,  0.035 * s],
    [ 0.15 * s, -0.11 * s,  0.035 * s],
    [ 0.15 * s,  0.06 * s,  0.065 * s],
    [-0.15 * s,  0.06 * s,  0.065 * s]
  ];
  addLoop(f);
  // Base connectors
  pairs.push(b[0], f[0], b[1], f[1]);
  // Inner document sheet poking out
  const sh = [
    [-0.11 * s, -0.08 * s, 0.01 * s],
    [ 0.11 * s, -0.08 * s, 0.01 * s],
    [ 0.11 * s,  0.12 * s, 0.01 * s],
    [-0.11 * s,  0.12 * s, 0.01 * s]
  ];
  addLoop(sh);
  return {
    lineGeo: makeLineSegmentsGeometry(pairs),
    meshGeo: new THREE.BoxGeometry(0.30 * s, 0.22 * s, 0.06 * s)
  };
}

// 2. ABOUT: 3D User / Profile Symbol
function createUserGeo(s) {
  const pairs = [];
  const addLoop = (pts) => {
    for (let i = 0; i < pts.length; i++) {
      pairs.push(pts[i], pts[(i + 1) % pts.length]);
    }
  };
  // Head wireframe rings
  const segs = 14;
  const hr = 0.075 * s;
  const hy = 0.09 * s;
  const ringXY = [];
  const ringXZ = [];
  const ringYZ = [];
  for (let i = 0; i < segs; i++) {
    const a = (i / segs) * Math.PI * 2;
    ringXY.push([Math.cos(a) * hr, hy + Math.sin(a) * hr, 0]);
    ringXZ.push([Math.cos(a) * hr, hy, Math.sin(a) * hr]);
    ringYZ.push([0, hy + Math.sin(a) * hr, Math.cos(a) * hr]);
  }
  addLoop(ringXY);
  addLoop(ringXZ);
  addLoop(ringYZ);

  // Torso / shoulders
  const ft = [
    [-0.15 * s, -0.14 * s,  0.025 * s],
    [ 0.15 * s, -0.14 * s,  0.025 * s],
    [ 0.06 * s, -0.02 * s,  0.025 * s],
    [-0.06 * s, -0.02 * s,  0.025 * s]
  ];
  const bt = [
    [-0.15 * s, -0.14 * s, -0.025 * s],
    [ 0.15 * s, -0.14 * s, -0.025 * s],
    [ 0.06 * s, -0.02 * s, -0.025 * s],
    [-0.06 * s, -0.02 * s, -0.025 * s]
  ];
  addLoop(ft);
  addLoop(bt);
  for (let i = 0; i < 4; i++) pairs.push(ft[i], bt[i]);

  return {
    lineGeo: makeLineSegmentsGeometry(pairs),
    meshGeo: new THREE.BoxGeometry(0.24 * s, 0.28 * s, 0.08 * s)
  };
}

// 3. CONTACT: 3D Mail Envelope
function createEnvelopeGeo(s) {
  const pairs = [];
  const w = 0.15 * s;
  const h = 0.10 * s;
  const d = 0.025 * s;
  const fTL = [-w,  h, d], fTR = [ w,  h, d];
  const fBL = [-w, -h, d], fBR = [ w, -h, d];
  const bTL = [-w,  h, -d], bTR = [ w,  h, -d];
  const bBL = [-w, -h, -d], bBR = [ w, -h, -d];

  const addLoop = (pts) => {
    for (let i = 0; i < pts.length; i++) {
      pairs.push(pts[i], pts[(i + 1) % pts.length]);
    }
  };
  addLoop([fTL, fTR, fBR, fBL]);
  addLoop([bTL, bTR, bBR, bBL]);
  pairs.push(fTL, bTL, fTR, bTR, fBL, bBL, fBR, bBR);

  // Flap folds
  const c = [0, 0, d + 0.015 * s];
  pairs.push(fTL, c, fTR, c);
  pairs.push(fBL, c, fBR, c);

  return {
    lineGeo: makeLineSegmentsGeometry(pairs),
    meshGeo: new THREE.BoxGeometry(0.30 * s, 0.20 * s, 0.05 * s)
  };
}

// 4. RESUME: 3D Document / CV Sheet
function createDocumentGeo(s) {
  const pairs = [];
  const w = 0.11 * s;
  const h = 0.15 * s;
  const d = 0.015 * s;
  const fold = 0.055 * s;

  const makeDocLoop = (z) => [
    [-w, -h, z],
    [ w, -h, z],
    [ w,  h - fold, z],
    [ w - fold,  h, z],
    [-w,  h, z]
  ];
  const fLoop = makeDocLoop(d);
  const bLoop = makeDocLoop(-d);
  const addLoop = (pts) => {
    for (let i = 0; i < pts.length; i++) {
      pairs.push(pts[i], pts[(i + 1) % pts.length]);
    }
  };
  addLoop(fLoop);
  addLoop(bLoop);
  for (let i = 0; i < 5; i++) pairs.push(fLoop[i], bLoop[i]);

  // Corner dog-ear fold lines
  pairs.push([w - fold, h, d], [w - fold, h - fold, d + 0.008 * s]);
  pairs.push([w - fold, h - fold, d + 0.008 * s], [w, h - fold, d]);

  // Document etched text lines
  pairs.push([-w * 0.65,  h * 0.4, d], [w * 0.25,  h * 0.4, d]);
  pairs.push([-w * 0.65,  h * 0.1, d], [w * 0.65,  h * 0.1, d]);
  pairs.push([-w * 0.65, -h * 0.2, d], [w * 0.5,  -h * 0.2, d]);
  pairs.push([-w * 0.65, -h * 0.5, d], [w * 0.2,  -h * 0.5, d]);

  return {
    lineGeo: makeLineSegmentsGeometry(pairs),
    meshGeo: new THREE.BoxGeometry(0.22 * s, 0.30 * s, 0.03 * s)
  };
}

// 5. GITHUB: 3D GitHub Mark with Ears & Branch
function createGithubGeo(s) {
  const pairs = [];
  const addLoop = (pts) => {
    for (let i = 0; i < pts.length; i++) {
      pairs.push(pts[i], pts[(i + 1) % pts.length]);
    }
  };
  const count = 24;
  const r = 0.125 * s;
  const d = 0.02 * s;
  const fRing = [];
  const bRing = [];
  for (let i = 0; i < count; i++) {
    const deg = (i / count) * 360;
    let rad = r;
    // Ear 1 around 55-80 deg
    if (deg >= 55 && deg <= 80) rad = r * (1 + Math.sin(((deg - 55) / 25) * Math.PI) * 0.55);
    // Ear 2 around 100-125 deg
    if (deg >= 100 && deg <= 125) rad = r * (1 + Math.sin(((deg - 100) / 25) * Math.PI) * 0.55);

    const a = (deg * Math.PI) / 180;
    fRing.push([Math.cos(a) * rad, Math.sin(a) * rad, d]);
    bRing.push([Math.cos(a) * rad, Math.sin(a) * rad, -d]);
  }
  addLoop(fRing);
  addLoop(bRing);
  for (let i = 0; i < count; i += 3) pairs.push(fRing[i], bRing[i]);

  // Inner git branch mark
  pairs.push([0, -0.065 * s, d], [0, -0.01 * s, d]);
  pairs.push([0, -0.01 * s, d], [-0.045 * s, 0.04 * s, d]);
  pairs.push([0, -0.01 * s, d], [ 0.045 * s, 0.04 * s, d]);
  // Small circle nodes at tips
  pairs.push([-0.055 * s, 0.04 * s, d], [-0.035 * s, 0.04 * s, d]);
  pairs.push([ 0.035 * s, 0.04 * s, d], [ 0.055 * s, 0.04 * s, d]);

  return {
    lineGeo: makeLineSegmentsGeometry(pairs),
    meshGeo: new THREE.CylinderGeometry(0.14 * s, 0.14 * s, 0.04 * s, 16)
  };
}

// 6. LINKEDIN: 3D Rounded Box with 'in'
function createLinkedinGeo(s) {
  const pairs = [];
  const addLoop = (pts) => {
    for (let i = 0; i < pts.length; i++) {
      pairs.push(pts[i], pts[(i + 1) % pts.length]);
    }
  };
  const w = 0.125 * s, h = 0.125 * s, d = 0.02 * s, c = 0.03 * s;
  const loop = (z) => [
    [-w + c,  h, z], [ w - c,  h, z], [ w,  h - c, z], [ w, -h + c, z],
    [ w - c, -h, z], [-w + c, -h, z], [-w, -h + c, z], [-w,  h - c, z]
  ];
  const fL = loop(d);
  const bL = loop(-d);
  addLoop(fL);
  addLoop(bL);
  for (let i = 0; i < 8; i++) pairs.push(fL[i], bL[i]);

  // "in" letters
  // 'i' dot
  pairs.push([-0.055 * s, 0.06 * s, d], [-0.045 * s, 0.06 * s, d]);
  // 'i' stem
  pairs.push([-0.05 * s, 0.025 * s, d], [-0.05 * s, -0.06 * s, d]);
  // 'n'
  pairs.push([-0.01 * s, 0.025 * s, d], [-0.01 * s, -0.06 * s, d]);
  pairs.push([-0.01 * s, 0.025 * s, d], [ 0.02 * s, 0.035 * s, d]);
  pairs.push([ 0.02 * s, 0.035 * s, d], [ 0.05 * s, 0.025 * s, d]);
  pairs.push([ 0.05 * s, 0.025 * s, d], [ 0.05 * s, -0.06 * s, d]);

  return {
    lineGeo: makeLineSegmentsGeometry(pairs),
    meshGeo: new THREE.BoxGeometry(0.25 * s, 0.25 * s, 0.04 * s)
  };
}

// 7. INSTAGRAM: 3D Rounded Camera with Lens & Flash
function createInstagramGeo(s) {
  const pairs = [];
  const addLoop = (pts) => {
    for (let i = 0; i < pts.length; i++) {
      pairs.push(pts[i], pts[(i + 1) % pts.length]);
    }
  };
  const w = 0.125 * s, h = 0.125 * s, d = 0.02 * s, c = 0.035 * s;
  const loop = (z) => [
    [-w + c,  h, z], [ w - c,  h, z], [ w,  h - c, z], [ w, -h + c, z],
    [ w - c, -h, z], [-w + c, -h, z], [-w, -h + c, z], [-w,  h - c, z]
  ];
  const fL = loop(d);
  const bL = loop(-d);
  addLoop(fL);
  addLoop(bL);
  for (let i = 0; i < 8; i++) pairs.push(fL[i], bL[i]);

  // Center lens ring
  const count = 16;
  const lr = 0.055 * s;
  const lens = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    lens.push([Math.cos(a) * lr, Math.sin(a) * lr, d + 0.005 * s]);
  }
  addLoop(lens);

  // Flash dot
  pairs.push([0.06 * s, 0.065 * s, d + 0.005 * s], [0.07 * s, 0.065 * s, d + 0.005 * s]);

  return {
    lineGeo: makeLineSegmentsGeometry(pairs),
    meshGeo: new THREE.BoxGeometry(0.25 * s, 0.25 * s, 0.04 * s)
  };
}

// 8. PHOTOS: 3D Photo Frame with Landscape
function createPhotoFrameGeo(s) {
  const pairs = [];
  const addLoop = (pts) => {
    for (let i = 0; i < pts.length; i++) {
      pairs.push(pts[i], pts[(i + 1) % pts.length]);
    }
  };
  const ow = 0.15 * s, oh = 0.11 * s, od = 0.02 * s;
  const iw = 0.11 * s, ih = 0.075 * s, id = 0.015 * s;

  const outerLoop = (z) => [[-ow, -oh, z], [ow, -oh, z], [ow, oh, z], [-ow, oh, z]];
  const innerLoop = (z) => [[-iw, -ih, z], [iw, -ih, z], [iw, ih, z], [-iw, ih, z]];

  const fOut = outerLoop(od);
  const bOut = outerLoop(-od);
  const fIn = innerLoop(id);
  addLoop(fOut);
  addLoop(bOut);
  addLoop(fIn);
  for (let i = 0; i < 4; i++) {
    pairs.push(fOut[i], bOut[i]);
    pairs.push(fOut[i], fIn[i]);
  }

  // Mountain ridges & sun
  pairs.push([-0.08 * s, -ih, id], [-0.02 * s,  0.02 * s, id]);
  pairs.push([-0.02 * s,  0.02 * s, id], [ 0.04 * s, -ih, id]);
  pairs.push([ 0.01 * s, -ih, id], [ 0.06 * s, -0.01 * s, id]);
  pairs.push([ 0.06 * s, -0.01 * s, id], [ 0.09 * s, -ih, id]);
  // Sun
  pairs.push([0.045 * s, 0.04 * s, id], [0.065 * s, 0.04 * s, id]);

  return {
    lineGeo: makeLineSegmentsGeometry(pairs),
    meshGeo: new THREE.BoxGeometry(0.30 * s, 0.22 * s, 0.04 * s)
  };
}

/**
 * Creates and manages the interactive 3D Galaxy & Floating Navigation System
 */
export class GalaxyScene {
  constructor(containerElement, onNodeClick) {
    this.container = containerElement;
    this.onNodeClick = onNodeClick;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.galaxyGroup = null;
    this.galaxyPoints = null;
    this.corePoints = null;
    this.starfieldPoints = null;
    this.polyhedronGroup = null;
    this.polyhedronNodes = [];
    this.labelsContainer = null;
    this.clock = new THREE.Clock();

    // Hover state tracking
    this.hoveredNode = null;
    this.hoverSource = null;

    // Theme and Speed state
    this.currentTheme = 'cyan';
    this.speedMultiplier = 1.0;
    this.targetSpeedMultiplier = 1.0;

    // Cache particle distribution for dynamic theme switching
    this.particleCount = 22000;
    this.galaxyDistances = null;
    this.coreCount = 3000;
    this.coreRatios = null;

    // Mouse tracking for parallax
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    // Raycasting for interactive hover and click
    this.raycaster = new THREE.Raycaster();
    this.mouseVector = new THREE.Vector2(-1000, -1000);

    // Reduced motion preference
    this.prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Hyperspace / Warp Jump Animation State
    this.isWarping = false;
    this.warpDuration = 0.68; // seconds to reach solid white flash
    this.warpStartTime = 0;
    this.onWarpMidpoint = null;
    this.onWarpComplete = null;
    this.warpMidpointTriggered = false;
    this.initialCameraZ = window.innerWidth < 768 ? 13.5 : 11;
    this.initialGalaxyScale = window.innerWidth < 768 ? 0.75 : 1.0;

    this.init();
  }

  init() {
    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x020617, 0.045);

    // 2. Camera
    const isMobile = window.innerWidth < 768;
    this.wasMobile = isMobile;
    this.camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.set(0, 0, isMobile ? 13.5 : 11);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x02050e, 1);
    this.container.appendChild(this.renderer.domElement);

    // 4. Create Elements
    const starTexture = this.createStarGlowTexture();
    this.createGalaxy(starTexture);
    this.createBackgroundStars(starTexture);
    this.createNavigationNodes();

    // 5. Event Listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: true });
    window.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: true });
    this.renderer.domElement.addEventListener('click', this.onCanvasClick.bind(this));

    // Listen to reduced motion preference changes
    if (window.matchMedia) {
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (motionQuery.addEventListener) {
        motionQuery.addEventListener('change', (e) => {
          this.prefersReducedMotion = e.matches;
        });
      }
    }

    // 6. Animation Loop
    this.animate();
  }

  // Generates smooth radial glow circular texture for star particles
  createStarGlowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(224, 242, 254, 0.85)');
    gradient.addColorStop(0.5, 'rgba(56, 189, 248, 0.35)');
    gradient.addColorStop(0.8, 'rgba(14, 116, 144, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    return texture;
  }

  // The Main Spiral Galaxy: positioned in top half on mobile, right on desktop
  createGalaxy(starTexture) {
    const galaxyGroup = new THREE.Group();
    const isMobile = window.innerWidth < 768;
    const baseTilt = isMobile ? 0.58 : 0.42;
    galaxyGroup.position.set(isMobile ? 0 : 1.4, isMobile ? 3.6 : 0.1, -1.0);
    galaxyGroup.rotation.x = baseTilt;
    galaxyGroup.rotation.z = isMobile ? -0.06 : -0.15;
    if (isMobile) {
      galaxyGroup.scale.set(0.75, 0.75, 0.75);
    } else {
      galaxyGroup.scale.set(1.0, 1.0, 1.0);
    }
    this.galaxyGroup = galaxyGroup;
    this.scene.add(galaxyGroup);

    // Galaxy parameters (compact, dense, refined)
    const particleCount = this.particleCount;
    const branches = 3;
    const radius = 4.4;
    this.galaxyRadius = radius;
    const spin = 1.35;
    const randomness = 0.52;
    const randomnessPower = 3.2;

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    this.galaxyDistances = new Float32Array(particleCount);

    const theme = GALAXY_THEMES[this.currentTheme];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Distance from center with weighted distribution
      const r = Math.pow(Math.random(), 2.2) * radius;
      this.galaxyDistances[i] = r;
      const spinAngle = r * spin;
      const branchAngle = ((i % branches) * 2 * Math.PI) / branches;

      // Random displacement
      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * (randomness * 0.45) * r;
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;

      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      // Color interpolation: Core -> Mid -> Outer
      let mixedColor;
      const progress = r / radius;
      if (progress < 0.25) {
        mixedColor = theme.inside.clone().lerp(theme.mid, progress / 0.25);
      } else {
        mixedColor = theme.mid.clone().lerp(theme.outside, (progress - 0.25) / 0.75);
      }

      mixedColor.r += (Math.random() - 0.5) * 0.08;
      mixedColor.g += (Math.random() - 0.5) * 0.08;
      mixedColor.b += (Math.random() - 0.5) * 0.08;

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.105,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      map: starTexture,
      transparent: true,
      opacity: 0.95
    });

    this.galaxyPoints = new THREE.Points(geometry, material);
    galaxyGroup.add(this.galaxyPoints);

    // Dense Central Core Bulge
    const coreCount = this.coreCount;
    const corePositions = new Float32Array(coreCount * 3);
    const coreColors = new Float32Array(coreCount * 3);
    this.coreRatios = new Float32Array(coreCount);

    for (let i = 0; i < coreCount; i++) {
      const i3 = i * 3;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const dist = Math.pow(Math.random(), 2.8) * 0.95;
      const ratio = Math.random() * 0.7;
      this.coreRatios[i] = ratio;

      corePositions[i3] = dist * Math.sin(phi) * Math.cos(theta);
      corePositions[i3 + 1] = dist * Math.sin(phi) * Math.sin(theta) * 0.6;
      corePositions[i3 + 2] = dist * Math.cos(phi);

      const c = theme.inside.clone().lerp(theme.coreAccent, ratio);
      coreColors[i3] = c.r;
      coreColors[i3 + 1] = c.g;
      coreColors[i3 + 2] = c.b;
    }

    const coreGeo = new THREE.BufferGeometry();
    coreGeo.setAttribute('position', new THREE.BufferAttribute(corePositions, 3));
    coreGeo.setAttribute('color', new THREE.BufferAttribute(coreColors, 3));

    const coreMat = new THREE.PointsMaterial({
      size: 0.13,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      map: starTexture,
      transparent: true,
      opacity: 0.95
    });

    this.corePoints = new THREE.Points(coreGeo, coreMat);
    galaxyGroup.add(this.corePoints);
  }

  // Switch Theme Dynamically (Cyber Cyan, Cosmic Pink, Solar Gold, Neon Emerald)
  setTheme(themeName) {
    const theme = GALAXY_THEMES[themeName];
    if (!theme || !this.galaxyPoints || !this.corePoints) return;
    this.currentTheme = themeName;

    // 1. Update galaxy spiral colors
    const colors = this.galaxyPoints.geometry.attributes.color.array;
    const radius = this.galaxyRadius;

    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      const r = this.galaxyDistances[i];
      const progress = r / radius;

      let mixedColor;
      if (progress < 0.25) {
        mixedColor = theme.inside.clone().lerp(theme.mid, progress / 0.25);
      } else {
        mixedColor = theme.mid.clone().lerp(theme.outside, (progress - 0.25) / 0.75);
      }

      mixedColor.r += (Math.random() - 0.5) * 0.08;
      mixedColor.g += (Math.random() - 0.5) * 0.08;
      mixedColor.b += (Math.random() - 0.5) * 0.08;

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }
    this.galaxyPoints.geometry.attributes.color.needsUpdate = true;

    // 2. Update central core colors
    const coreColors = this.corePoints.geometry.attributes.color.array;
    for (let i = 0; i < this.coreCount; i++) {
      const i3 = i * 3;
      const ratio = this.coreRatios[i];
      const c = theme.inside.clone().lerp(theme.coreAccent, ratio);
      coreColors[i3] = c.r;
      coreColors[i3 + 1] = c.g;
      coreColors[i3 + 2] = c.b;
    }
    this.corePoints.geometry.attributes.color.needsUpdate = true;

    // 3. Update inner dots and facets of navigation nodes
    this.polyhedronNodes.forEach(item => {
      if (item.centerDot && item.centerDot.material) {
        item.centerDot.material.color.set(theme.dotColor);
      }
    });
  }

  // Set rotation speed multiplier (1x standard, 3x hyperdrive)
  setRotationSpeed(speed) {
    this.targetSpeedMultiplier = speed;
  }

  // Distant subtle background stars covering the entire canvas
  createBackgroundStars(starTexture) {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#bae6fd'),
      new THREE.Color('#7dd3fc'),
      new THREE.Color('#c7d2fe')
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 50;
      positions[i3 + 1] = (Math.random() - 0.5) * 35;
      positions[i3 + 2] = (Math.random() - 0.5) * 30 - 5;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.08,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      map: starTexture,
      transparent: true,
      opacity: 0.75
    });

    this.starfieldPoints = new THREE.Points(geo, mat);
    this.scene.add(this.starfieldPoints);
  }

  /**
   * Helper to build 3D symbol geometry based on node definition
   */
  buildSymbolGeometry(symbolType, scale) {
    switch (symbolType) {
      case 'folder':
        return createFolderGeo(scale);
      case 'user':
        return createUserGeo(scale);
      case 'document':
        return createDocumentGeo(scale);
      case 'photo':
        return createPhotoFrameGeo(scale);
      case 'github':
        return createGithubGeo(scale);
      case 'linkedin':
        return createLinkedinGeo(scale);
      case 'instagram':
        return createInstagramGeo(scale);
      case 'envelope':
        return createEnvelopeGeo(scale);
      default: {
        const geom = new THREE.IcosahedronGeometry(0.18 * scale, 0);
        return {
          lineGeo: new THREE.WireframeGeometry(geom),
          meshGeo: geom
        };
      }
    }
  }

  /**
   * Interactive Portfolio Navigation Nodes:
   * Replaces the static tech skills with interactive 3D navigation elements orbiting the galaxy
   */
  createNavigationNodes() {
    const rawNodes = PORTFOLIO_CONFIG.navigationNodes || PORTFOLIO_CONFIG.skills || [];
    this.polyhedronNodes = [];

    const isMobile = window.innerWidth < 768;

    if (!this.polyhedronGroup) {
      this.polyhedronGroup = new THREE.Group();
      this.scene.add(this.polyhedronGroup);
    } else {
      while (this.polyhedronGroup.children.length > 0) {
        this.polyhedronGroup.remove(this.polyhedronGroup.children[0]);
      }
      if (this.polyhedronGroup.parent !== this.scene) {
        this.scene.add(this.polyhedronGroup);
      }
    }

    this.polyhedronGroup.position.set(isMobile ? 0 : 1.4, isMobile ? 3.6 : 0.1, -1.0);
    this.polyhedronGroup.scale.set(1.0, 1.0, 1.0);

    // Create a DOM container for the interactive projected buttons
    if (!this.labelsContainer) {
      this.labelsContainer = document.createElement('div');
      this.labelsContainer.className = 'galaxy-labels-container';
      this.container.appendChild(this.labelsContainer);
    } else {
      this.labelsContainer.innerHTML = '';
    }

    const theme = GALAXY_THEMES[this.currentTheme];
    const totalNodes = rawNodes.length;
    const scaleFactor = isMobile ? 0.82 : 1.0;

    rawNodes.forEach((node, index) => {
      // 1. Build distinct 3D symbol wireframe and translucent facet mesh
      const symbolType = node.symbol3D || node.icon || 'folder';
      const symbolGeom = this.buildSymbolGeometry(symbolType, scaleFactor);

      // 2. Wireframe lines
      const wireframeMat = new THREE.LineBasicMaterial({
        color: 0xdbeafe,
        transparent: true,
        opacity: 0.85,
        linewidth: 1.2
      });
      const wireframe = new THREE.LineSegments(symbolGeom.lineGeo, wireframeMat);

      // 3. Inner semi-transparent crystal facets (and raycast target)
      const facetMat = new THREE.MeshBasicMaterial({
        color: node.color ? new THREE.Color(node.color) : 0x38bdf8,
        transparent: true,
        opacity: 0.08,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(symbolGeom.meshGeo, facetMat);

      // 4. Glowing center core dot
      const dotGeo = new THREE.BufferGeometry();
      dotGeo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3));
      const dotMat = new THREE.PointsMaterial({
        size: isMobile ? 0.055 : 0.08,
        color: theme.dotColor,
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      const centerDot = new THREE.Points(dotGeo, dotMat);

      // 5. Group together
      const group = new THREE.Group();
      group.add(mesh);
      group.add(wireframe);
      group.add(centerDot);

      const baseAngle = (node.angle !== undefined)
        ? node.angle
        : (index / totalNodes) * Math.PI * 2;
      const radiusMult = node.radiusMult || 1.0;

      const rx = isMobile ? 2.5 : 3.8;
      const ry = isMobile ? 1.85 : 2.7;
      const rz = isMobile ? 0.75 : 1.2;

      const initX = Math.cos(baseAngle) * rx * radiusMult;
      const initY = Math.sin(baseAngle) * ry * radiusMult;
      const initZ = Math.sin(baseAngle) * rz * radiusMult;

      group.position.set(initX, initY, initZ);
      this.polyhedronGroup.add(group);

      // 6. Accessible interactive DOM button projected in space
      const label = document.createElement('button');
      label.type = 'button';
      label.className = 'galaxy-nav-node';
      label.setAttribute('data-node-id', node.id);
      label.setAttribute('aria-label', `Navigate to ${node.name}: ${node.description || ''}`);
      label.tabIndex = 0;

      const iconSvg = NAV_ICONS[node.icon] || '';
      const isExt = node.type === 'external';

      label.innerHTML = `
        <span class="nav-node-icon" aria-hidden="true">${iconSvg}</span>
        <span class="nav-node-text">${node.name}</span>
        ${isExt ? '<span class="nav-node-ext" aria-hidden="true">↗</span>' : ''}
      `;
      this.labelsContainer.appendChild(label);

      // Node state object
      const nodeItem = {
        nodeData: node,
        group,
        wireframe,
        wireframeMat,
        mesh,
        facetMat,
        centerDot,
        label,
        baseAngle,
        radiusMult,
        rotSpeedX: 0.009 + (index % 3) * 0.003,
        rotSpeedY: 0.013 + (index % 4) * 0.002,
        floatSpeed: 1.2 + (index % 5) * 0.3,
        floatOffset: index * 0.85,
        targetScale: 1,
        currentScale: 1
      };

      // 7. Event listeners on interactive DOM button
      label.addEventListener('mouseenter', () => {
        this.setHoveredNode(nodeItem, 'dom');
      });
      label.addEventListener('mouseleave', () => {
        if (this.hoveredNode === nodeItem) {
          this.setHoveredNode(null, null);
        }
      });
      label.addEventListener('focus', () => {
        this.setHoveredNode(nodeItem, 'dom');
      });
      label.addEventListener('blur', () => {
        if (this.hoveredNode === nodeItem) {
          this.setHoveredNode(null, null);
        }
      });
      label.addEventListener('click', (e) => {
        e.stopPropagation();
        this.activateNode(nodeItem);
      });
      label.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          this.activateNode(nodeItem);
        }
      });

      this.polyhedronNodes.push(nodeItem);
    });

    // Immediately project initial screen positions so labels never flash at (0, 0)
    this.updateInitialNodePositions();
  }

  // Pre-calculate exact 2D screen positions before initial render frame
  updateInitialNodePositions() {
    if (!this.polyhedronNodes || this.polyhedronNodes.length === 0 || !this.camera) return;
    const isMobile = window.innerWidth < 768;
    const rx = isMobile ? 2.5 : 3.8;
    const ry = isMobile ? 1.85 : 2.7;
    const rz = isMobile ? 0.75 : 1.2;
    const tempVec = new THREE.Vector3();

    this.polyhedronNodes.forEach((node) => {
      const orbitAngle = node.baseAngle + (this.galaxyGroup ? this.galaxyGroup.rotation.y : 0);
      const x = Math.cos(orbitAngle) * rx * node.radiusMult;
      const y = Math.sin(orbitAngle) * ry * node.radiusMult;
      const z = Math.sin(orbitAngle) * rz * node.radiusMult;

      node.group.position.set(x, y, z);
      node.group.getWorldPosition(tempVec);
      const labelYOffset = (isMobile ? 0.38 : 0.44) * Math.max(node.currentScale || 1.0, 1.0);
      tempVec.y -= labelYOffset;
      tempVec.project(this.camera);

      const isBehind = tempVec.z > 1;
      const screenX = (tempVec.x * 0.5 + 0.5) * window.innerWidth;
      const screenY = (-(tempVec.y * 0.5) + 0.5) * window.innerHeight;

      if (!isBehind && node.label) {
        const sc = node.currentScale || 1.0;
        node.label.style.transform = `translate(-50%, -50%) translate3d(${screenX}px, ${screenY}px, 0) scale(${sc})`;
        node.label.style.display = 'inline-flex';
      }
    });
  }

  // Backward compatibility alias
  createFloatingPolyhedrons() {
    this.createNavigationNodes();
  }

  setHoveredNode(nodeItem, source = 'dom') {
    this.hoveredNode = nodeItem;
    this.hoverSource = source;
  }

  activateNode(nodeItem) {
    if (!nodeItem || this.isWarping) return;
    // Momentary spring pulse
    nodeItem.currentScale = 1.45;

    if (this.onNodeClick) {
      this.onNodeClick(nodeItem.nodeData);
    }
  }

  // Momentarily highlight all navigation nodes when hint message is clicked or hovered
  pulseAllNodes() {
    this.polyhedronNodes.forEach((node, i) => {
      setTimeout(() => {
        node.currentScale = 1.35;
        node.wireframeMat.color.set(0x38bdf8);
        node.wireframeMat.opacity = 1.0;
        node.facetMat.opacity = 0.35;
        if (node.label) node.label.classList.add('hovered');

        setTimeout(() => {
          if (this.hoveredNode !== node) {
            node.wireframeMat.color.set(0xdbeafe);
            node.wireframeMat.opacity = 0.85;
            node.facetMat.opacity = 0.08;
            if (node.label) node.label.classList.remove('hovered');
          }
        }, 900);
      }, i * 50);
    });
  }

  // Trigger Hyperspace Warp Jump: Spins fast, expands large into solid white
  triggerWarpJump(onMidpoint, onComplete) {
    if (this.isWarping) return;
    this.isWarping = true;
    this.warpStartTime = performance.now();
    this.onWarpMidpoint = onMidpoint;
    this.onWarpComplete = onComplete;
    this.warpMidpointTriggered = false;

    const isMobile = window.innerWidth < 768;
    this.initialCameraZ = isMobile ? 13.5 : 11;
    this.initialGalaxyScale = isMobile ? 0.75 : 1.0;

    // Smoothly fade labels and hero UI during warp
    if (this.labelsContainer) {
      this.labelsContainer.style.transition = 'opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1)';
      this.labelsContainer.style.opacity = '0';
    }

    const heroOverlay = document.getElementById('hero-overlay');
    if (heroOverlay) {
      heroOverlay.style.transition = 'opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1)';
      heroOverlay.style.opacity = '0';
    }
  }

  // Restore 3D Galaxy transforms quietly once covered by page
  resetWarpState() {
    this.isWarping = false;
    this.warpMidpointTriggered = false;
    const isMobile = window.innerWidth < 768;
    this.initialCameraZ = isMobile ? 13.5 : 11;
    this.initialGalaxyScale = isMobile ? 0.75 : 1.0;

    if (this.camera) {
      this.camera.position.set(0, 0, this.initialCameraZ);
      this.camera.lookAt(isMobile ? 0 : 0.6, isMobile ? 1.3 : 0, 0);
    }

    if (this.galaxyGroup) {
      this.galaxyGroup.scale.set(this.initialGalaxyScale, this.initialGalaxyScale, this.initialGalaxyScale);
    }

    if (this.polyhedronGroup) {
      this.polyhedronGroup.scale.set(1.0, 1.0, 1.0);
    }

    if (this.labelsContainer) {
      this.labelsContainer.style.opacity = '1';
    }

    const heroOverlay = document.getElementById('hero-overlay');
    if (heroOverlay) {
      heroOverlay.style.opacity = '1';
    }
  }

  onMouseMove(e) {
    this.mouse.targetX = (e.clientX - this.windowHalfX) * 0.0006;
    this.mouse.targetY = (e.clientY - this.windowHalfY) * 0.0006;

    this.mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  onTouchStart(e) {
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      this.mouseVector.x = (touch.clientX / window.innerWidth) * 2 - 1;
      this.mouseVector.y = -(touch.clientY / window.innerHeight) * 2 + 1;
    }
  }

  onTouchMove(e) {
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      this.mouse.targetX = (touch.clientX - this.windowHalfX) * 0.0006;
      this.mouse.targetY = (touch.clientY - this.windowHalfY) * 0.0006;
      this.mouseVector.x = (touch.clientX / window.innerWidth) * 2 - 1;
      this.mouseVector.y = -(touch.clientY / window.innerHeight) * 2 + 1;
    }
  }

  onCanvasClick(e) {
    if (e && e.clientX !== undefined && e.clientY !== undefined) {
      this.mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }
    this.raycaster.setFromCamera(this.mouseVector, this.camera);
    for (const item of this.polyhedronNodes) {
      const intersects = this.raycaster.intersectObject(item.mesh);
      if (intersects.length > 0) {
        this.activateNode(item);
        break;
      }
    }
  }

  onWindowResize() {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    const isMobile = window.innerWidth < 768;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.position.set(0, 0, isMobile ? 13.5 : 11);
    this.camera.updateProjectionMatrix();

    const baseTilt = isMobile ? 0.58 : 0.42;

    if (this.galaxyGroup) {
      this.galaxyGroup.position.set(isMobile ? 0 : 1.4, isMobile ? 3.6 : 0.1, -1.0);
      this.galaxyGroup.rotation.x = baseTilt;
      this.galaxyGroup.rotation.z = isMobile ? -0.06 : -0.15;
      if (isMobile) {
        this.galaxyGroup.scale.set(0.75, 0.75, 0.75);
      } else {
        this.galaxyGroup.scale.set(1.0, 1.0, 1.0);
      }
    }

    if (this.polyhedronGroup) {
      this.polyhedronGroup.position.set(isMobile ? 0 : 1.4, isMobile ? 3.6 : 0.1, -1.0);
    }

    if (this.wasMobile !== isMobile) {
      this.wasMobile = isMobile;
      this.reloadNodes();
    }

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const elapsedTime = this.clock.getElapsedTime();
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = this.prefersReducedMotion;

    // 1. Smooth Camera mouse parallax (paused during hyperdrive warp jump)
    if (!prefersReducedMotion && !this.isWarping) {
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;
      this.camera.position.x = this.mouse.x * (isMobile ? 1.0 : 3.5);
      this.camera.position.y = -this.mouse.y * (isMobile ? 1.0 : 3.0);
      this.camera.lookAt(isMobile ? 0 : 0.6, isMobile ? 1.3 : 0, 0);
    }

    // 2. Galaxy majestic rotation with smooth speed multiplier
    this.speedMultiplier += (this.targetSpeedMultiplier - this.speedMultiplier) * 0.06;

    const baseTilt = isMobile ? 0.58 : 0.42;
    if (this.galaxyGroup) {
      let rotDelta = prefersReducedMotion ? 0.0002 : (0.0012 * this.speedMultiplier);

      // Hyperspace Warp Jump: Spins rapidly & expands into whiteout
      if (this.isWarping) {
        const elapsed = (performance.now() - this.warpStartTime) / 1000;
        const progress = Math.min(elapsed / this.warpDuration, 1.0);

        // Exponential acceleration curve
        const easeIn = progress * progress * progress;

        // 1. Galaxy spins intensely fast (up to 160x speed)
        rotDelta = 0.0012 + (easeIn * 0.22);

        // 2. Galaxy expands dramatically (grows 7.5x in scale)
        const scaleMult = 1.0 + (easeIn * 7.5);
        this.galaxyGroup.scale.set(
          this.initialGalaxyScale * scaleMult,
          this.initialGalaxyScale * scaleMult,
          this.initialGalaxyScale * scaleMult
        );

        if (this.polyhedronGroup) {
          this.polyhedronGroup.scale.set(scaleMult, scaleMult, scaleMult);
        }

        // 3. Camera zooms directly into the glowing stellar core
        const targetZ = isMobile ? 2.8 : 2.0;
        this.camera.position.z = this.initialCameraZ - (easeIn * (this.initialCameraZ - targetZ));
        this.camera.position.x += ((isMobile ? 0 : 1.4) - this.camera.position.x) * 0.15;
        this.camera.position.y += ((isMobile ? 3.6 : 0.1) - this.camera.position.y) * 0.15;

        // 4. Trigger midpoint when screen is completely white
        if (progress >= 1.0 && !this.warpMidpointTriggered) {
          this.warpMidpointTriggered = true;
          if (this.onWarpMidpoint) {
            this.onWarpMidpoint();
          }
          this.resetWarpState();
          if (this.onWarpComplete) {
            this.onWarpComplete();
          }
        }
      }

      this.galaxyGroup.rotation.y += rotDelta;
      this.galaxyGroup.rotation.x = baseTilt + (prefersReducedMotion ? 0 : Math.sin(elapsedTime * 0.15) * 0.02);
    }

    // 3. Twinkle background stars slightly
    if (this.starfieldPoints && !prefersReducedMotion) {
      this.starfieldPoints.rotation.y = elapsedTime * 0.005;
    }

    // 4. Raycasting for Canvas Hover detection
    this.raycaster.setFromCamera(this.mouseVector, this.camera);
    let raycastHitNode = null;
    for (const item of this.polyhedronNodes) {
      const intersects = this.raycaster.intersectObject(item.mesh);
      if (intersects.length > 0) {
        raycastHitNode = item;
        break;
      }
    }

    if (raycastHitNode) {
      this.hoveredNode = raycastHitNode;
      this.hoverSource = 'raycast';
    } else if (this.hoverSource === 'raycast') {
      this.hoveredNode = null;
      this.hoverSource = null;
    }

    // Update cursor
    if (this.hoveredNode) {
      this.renderer.domElement.style.cursor = 'pointer';
    } else {
      this.renderer.domElement.style.cursor = 'default';
    }

    // 5. Update Navigation Node Rotations, Float, Scales & Screen Labels
    const tempVec = new THREE.Vector3();
    const currentThemeData = GALAXY_THEMES[this.currentTheme];

    const rx = isMobile ? 2.5 : 3.8;
    const ry = isMobile ? 1.85 : 2.7;
    const rz = isMobile ? 0.75 : 1.2;

    this.polyhedronNodes.forEach((node) => {
      // Orbit around galaxy in sync with galaxy rotation
      const orbitAngle = node.baseAngle + (this.galaxyGroup ? this.galaxyGroup.rotation.y : 0);
      const x = Math.cos(orbitAngle) * rx * node.radiusMult;
      const y = Math.sin(orbitAngle) * ry * node.radiusMult;
      const z = Math.sin(orbitAngle) * rz * node.radiusMult;

      const isHovered = (this.hoveredNode === node);

      // Subtle floating oscillation
      const baseFloat = prefersReducedMotion
        ? 0
        : Math.sin(elapsedTime * node.floatSpeed + node.floatOffset) * (isMobile ? 0.04 : 0.07);
      const hoverFloat = (!prefersReducedMotion && isHovered)
        ? Math.sin(elapsedTime * 3.5) * 0.03
        : 0;

      node.group.position.set(x, y + baseFloat + hoverFloat, z);

      // Rotation: shape spins gently on its own center
      if (!prefersReducedMotion) {
        node.wireframe.rotation.x += node.rotSpeedX * this.speedMultiplier;
        node.wireframe.rotation.y += node.rotSpeedY * this.speedMultiplier;
        node.mesh.rotation.x = node.wireframe.rotation.x;
        node.mesh.rotation.y = node.wireframe.rotation.y;
      }

      // Hover scale and glow transitions
      node.targetScale = isHovered ? (isMobile ? 1.25 : 1.35) : 1.0;
      node.currentScale += (node.targetScale - node.currentScale) * (prefersReducedMotion ? 1.0 : 0.14);
      node.group.scale.set(node.currentScale, node.currentScale, node.currentScale);

      if (isHovered) {
        node.wireframeMat.color.set(currentThemeData.wireframeHover || 0x38bdf8);
        node.wireframeMat.opacity = 1.0;
        node.facetMat.opacity = 0.32;
        node.label.classList.add('hovered');
      } else {
        node.wireframeMat.color.set(0xdbeafe);
        node.wireframeMat.opacity = 0.85;
        node.facetMat.opacity = 0.08;
        node.label.classList.remove('hovered');
      }

      // Project 3D position to 2D Screen for Label using world position
      node.group.getWorldPosition(tempVec);
      const labelYOffset = (isMobile ? 0.38 : 0.44) * Math.max(node.currentScale, 1.0);
      tempVec.y -= labelYOffset;
      tempVec.project(this.camera);

      // Check if within screen bounds and in front of camera
      const isBehind = tempVec.z > 1;
      const screenX = (tempVec.x * 0.5 + 0.5) * window.innerWidth;
      const screenY = (-(tempVec.y * 0.5) + 0.5) * window.innerHeight;

      if (!isBehind) {
        const sc = node.currentScale || 1.0;
        node.label.style.transform = `translate(-50%, -50%) translate3d(${screenX}px, ${screenY}px, 0) scale(${sc})`;
        node.label.style.display = 'inline-flex';
      } else {
        node.label.style.display = 'none';
      }
    });

    // 6. Render Scene
    this.renderer.render(this.scene, this.camera);
  }

  // Reload navigation nodes on resize or config update
  reloadNodes() {
    this.polyhedronNodes.forEach(item => {
      if (this.polyhedronGroup) this.polyhedronGroup.remove(item.group);
      if (item.label && item.label.parentNode) item.label.remove();
    });
    this.polyhedronNodes = [];
    this.createNavigationNodes();
  }

  // Backward compatibility alias
  reloadSkills() {
    this.reloadNodes();
  }
}
