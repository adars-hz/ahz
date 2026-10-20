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

/**
 * Creates and manages the interactive 3D Galaxy & Floating Tech Polyhedrons
 */
export class GalaxyScene {
  constructor(containerElement, onSkillClick) {
    this.container = containerElement;
    this.onSkillClick = onSkillClick;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.galaxyGroup = null;
    this.galaxyPoints = null;
    this.corePoints = null;
    this.starfieldPoints = null;
    this.polyhedronNodes = [];
    this.clock = new THREE.Clock();

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

    // Raycasting for interactive hover
    this.raycaster = new THREE.Raycaster();
    this.mouseVector = new THREE.Vector2(-1000, -1000);

    this.init();
  }

  init() {
    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x020617, 0.045);

    // 2. Camera
    const isMobile = window.innerWidth < 768;
    this.camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.set(0, 0, isMobile ? 14.0 : 11);

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
    this.createFloatingPolyhedrons();

    // 5. Event Listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: true });
    window.addEventListener('click', this.onClick.bind(this));

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
    galaxyGroup.position.set(isMobile ? 0 : 1.4, isMobile ? 3.0 : 0.1, -1.0);
    galaxyGroup.rotation.x = 0.42;
    galaxyGroup.rotation.z = -0.15;
    this.galaxyGroup = galaxyGroup;
    this.scene.add(galaxyGroup);

    // Galaxy parameters (compact, dense, refined)
    const particleCount = this.particleCount;
    const branches = 3;
    const radius = 4.4; // Scaled down from 6.8 for a sleeker look
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
      size: 0.105, // Refined particle point size
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

    // Dense Central Core Bulge (scaled down)
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
      const dist = Math.pow(Math.random(), 2.8) * 0.95; // Compact core
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

    // 3. Update inner dots and facets of polyhedrons
    this.polyhedronNodes.forEach(node => {
      node.centerDot.material.color.set(theme.dotColor);
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

  // Floating Wireframe Polyhedrons: made delicate & compact as requested
  createFloatingPolyhedrons() {
    const skills = PORTFOLIO_CONFIG.skills;
    this.polyhedronNodes = [];

    // Container group for all polyhedrons so they move together with galaxy
    const isMobile = window.innerWidth < 768;
    if (!this.polyhedronGroup) {
      this.polyhedronGroup = new THREE.Group();
      this.scene.add(this.polyhedronGroup);
    } else {
      while (this.polyhedronGroup.children.length > 0) {
        this.polyhedronGroup.remove(this.polyhedronGroup.children[0]);
      }
    }
    this.polyhedronGroup.position.set(isMobile ? 0 : 0, isMobile ? 3.0 : 0, isMobile ? -1.0 : 0);
    this.polyhedronGroup.scale.set(isMobile ? 0.72 : 1, isMobile ? 0.72 : 1, isMobile ? 0.72 : 1);

    // Create a DOM container for the crisp projected labels
    if (!this.labelsContainer) {
      this.labelsContainer = document.createElement('div');
      this.labelsContainer.className = 'galaxy-labels-container';
      this.container.appendChild(this.labelsContainer);
    } else {
      this.labelsContainer.innerHTML = '';
    }

    const theme = GALAXY_THEMES[this.currentTheme];

    skills.forEach((skill, index) => {
      // 1. Choose geometry type: size 0.25 (scaled down from 0.52 for delicate refined look)
      let geom;
      const size = 0.25;
      if (skill.geometry === 'octahedron') {
        geom = new THREE.OctahedronGeometry(size, 0);
      } else {
        geom = new THREE.IcosahedronGeometry(size, 0);
      }

      // 2. Wireframe lines
      const wireframeGeo = new THREE.WireframeGeometry(geom);
      const wireframeMat = new THREE.LineBasicMaterial({
        color: 0xdbeafe,
        transparent: true,
        opacity: 0.85,
        linewidth: 1.5
      });
      const wireframe = new THREE.LineSegments(wireframeGeo, wireframeMat);

      // 3. Inner semi-transparent crystal facets
      const facetMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.08,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(geom, facetMat);

      // 4. Glowing center core dot (size 0.09)
      const dotGeo = new THREE.BufferGeometry();
      dotGeo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3));
      const dotMat = new THREE.PointsMaterial({
        size: 0.09,
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

      const [x, y, z] = skill.position;
      group.position.set(x, y, z);
      this.polyhedronGroup.add(group);

      // 6. DOM Label element (compact & small)
      const label = document.createElement('div');
      label.className = 'skill-label';
      label.setAttribute('data-skill-id', skill.id);
      label.innerHTML = `
        <span class="label-name">${skill.name}</span>
      `;
      this.labelsContainer.appendChild(label);

      // Interactive click on label
      label.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.onSkillClick) this.onSkillClick(skill);
      });

      // Save node data
      this.polyhedronNodes.push({
        skill,
        group,
        wireframe,
        wireframeMat,
        mesh,
        facetMat,
        centerDot,
        label,
        initialPos: new THREE.Vector3(x, y, z),
        rotSpeedX: 0.009 + (index % 3) * 0.004,
        rotSpeedY: 0.013 + (index % 4) * 0.003,
        floatSpeed: 1.2 + (index % 5) * 0.3,
        floatOffset: index * 0.85,
        targetScale: 1,
        currentScale: 1
      });
    });
  }

  onMouseMove(e) {
    this.mouse.targetX = (e.clientX - this.windowHalfX) * 0.0006;
    this.mouse.targetY = (e.clientY - this.windowHalfY) * 0.0006;

    this.mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  onTouchMove(e) {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      this.mouse.targetX = (touch.clientX - this.windowHalfX) * 0.0006;
      this.mouse.targetY = (touch.clientY - this.windowHalfY) * 0.0006;
    }
  }

  onClick(e) {
    this.raycaster.setFromCamera(this.mouseVector, this.camera);
    for (const node of this.polyhedronNodes) {
      const intersects = this.raycaster.intersectObject(node.mesh);
      if (intersects.length > 0) {
        if (this.onSkillClick) this.onSkillClick(node.skill);
        break;
      }
    }
  }

  onWindowResize() {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    const isMobile = window.innerWidth < 768;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.position.z = isMobile ? 14.0 : 11;
    this.camera.updateProjectionMatrix();

    if (this.galaxyGroup) {
      this.galaxyGroup.position.set(isMobile ? 0 : 1.4, isMobile ? 3.0 : 0.1, -1.0);
    }
    if (this.polyhedronGroup) {
      this.polyhedronGroup.position.set(isMobile ? 0 : 0, isMobile ? 3.0 : 0, isMobile ? -1.0 : 0);
      this.polyhedronGroup.scale.set(isMobile ? 0.72 : 1, isMobile ? 0.72 : 1, isMobile ? 0.72 : 1);
    }

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const elapsedTime = this.clock.getElapsedTime();

    // 1. Smooth Camera mouse parallax
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    this.camera.position.x = this.mouse.x * 3.5;
    this.camera.position.y = -this.mouse.y * 3.0;
    this.camera.lookAt(0.6, 0, 0);

    // 2. Galaxy majestic rotation with smooth speed multiplier
    this.speedMultiplier += (this.targetSpeedMultiplier - this.speedMultiplier) * 0.06;

    if (this.galaxyGroup) {
      this.galaxyGroup.rotation.y += 0.0012 * this.speedMultiplier;
      this.galaxyGroup.rotation.x = 0.42 + Math.sin(elapsedTime * 0.15) * 0.02;
    }

    // 3. Twinkle background stars slightly
    if (this.starfieldPoints) {
      this.starfieldPoints.rotation.y = elapsedTime * 0.005;
    }

    // 4. Update Raycaster for Hover detection
    this.raycaster.setFromCamera(this.mouseVector, this.camera);
    let hitNode = null;

    for (const node of this.polyhedronNodes) {
      const intersects = this.raycaster.intersectObject(node.mesh);
      if (intersects.length > 0) {
        hitNode = node;
        break;
      }
    }

    // 5. Update Polyhedron Rotations, Float, Scales & Screen Labels
    const tempVec = new THREE.Vector3();
    const currentThemeData = GALAXY_THEMES[this.currentTheme];

    this.polyhedronNodes.forEach((node) => {
      // Rotation
      node.group.rotation.x += node.rotSpeedX * this.speedMultiplier;
      node.group.rotation.y += node.rotSpeedY * this.speedMultiplier;

      // Floating wave
      const floatY = Math.sin(elapsedTime * node.floatSpeed + node.floatOffset) * 0.12;
      node.group.position.y = node.initialPos.y + floatY;

      // Hover reaction
      const isHovered = (hitNode === node);
      node.targetScale = isHovered ? 1.35 : 1.0;
      node.currentScale += (node.targetScale - node.currentScale) * 0.12;
      node.group.scale.set(node.currentScale, node.currentScale, node.currentScale);

      if (isHovered) {
        node.wireframeMat.color.set(currentThemeData.wireframeHover);
        node.facetMat.opacity = 0.28;
      } else {
        node.wireframeMat.color.set(0xdbeafe);
        node.facetMat.opacity = 0.08;
      }

      // Project 3D position to 2D Screen for Label using world position
      node.group.getWorldPosition(tempVec);
      const isMobile = window.innerWidth < 768;
      tempVec.y -= (isMobile ? 0.24 : 0.34) * node.currentScale;
      tempVec.project(this.camera);

      // Check if within screen bounds and in front of camera
      const isBehind = tempVec.z > 1;
      const screenX = (tempVec.x * 0.5 + 0.5) * window.innerWidth;
      const screenY = (-(tempVec.y * 0.5) + 0.5) * window.innerHeight;

      if (!isBehind) {
        node.label.style.transform = `translate(-50%, -50%) translate3d(${screenX}px, ${screenY}px, 0)`;
        node.label.style.display = 'block';
        if (isHovered) {
          node.label.classList.add('hovered');
        } else {
          node.label.classList.remove('hovered');
        }
      } else {
        node.label.style.display = 'none';
      }
    });

    // 6. Render
    this.renderer.render(this.scene, this.camera);
  }

  // Update skills if edited live
  reloadSkills() {
    this.polyhedronNodes.forEach(node => {
      if (this.polyhedronGroup) this.polyhedronGroup.remove(node.group);
      node.label.remove();
    });
    this.polyhedronNodes = [];
    this.createFloatingPolyhedrons();
  }
}
