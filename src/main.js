import './style.css';
import { PORTFOLIO_CONFIG } from './config.js';
import { GalaxyScene } from './galaxy.js';
import { ModalManager } from './modals.js';
import { MotionEffects } from './motion.js';

class PortfolioApp {
  constructor() {
    this.modalManager = new ModalManager();
    this.galaxyScene = null;

    // Typewriter state
    this.roleIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.typewriterTimeout = null;

    this.init();
  }

  init() {
    // 1. Render initial config data into DOM
    this.applyConfigToDOM();

    // 2. Start Typewriter Effect
    this.startTypewriter();

    // 3. Initialize 3D Galaxy & Interactive Portfolio Navigation Nodes
    const canvasContainer = document.getElementById('webgl-canvas-container');
    this.galaxyScene = new GalaxyScene(canvasContainer, (node) => {
      this.handleNavNodeClick(node);
    });

    // 4. Initialize Client-Side URL Hash Router for Dedicated Pages
    this.initRouter();

    // 5. Bind UI Event Handlers
    this.bindEvents();

    // 6. Trigger Framer Motion Hero Entrance Animations
    MotionEffects.animateHeroEntrance();
  }

  applyConfigToDOM() {
    const p = PORTFOLIO_CONFIG.personal;
    const soc = PORTFOLIO_CONFIG.socials;

    // Hero Greeting & Name
    const greetingEl = document.getElementById('hero-greeting');
    if (greetingEl) greetingEl.textContent = p.greeting;

    const nameEl = document.getElementById('hero-name');
    if (nameEl) nameEl.textContent = p.name;

    // Document Title
    document.title = `${p.name} | ${p.roles[0] || 'Full Stack Developer'}`;

    // Social Links
    const githubEl = document.getElementById('social-github');
    if (githubEl) githubEl.href = soc.github;

    const linkedinEl = document.getElementById('social-linkedin');
    if (linkedinEl) linkedinEl.href = soc.linkedin;

    const emailEl = document.getElementById('social-email');
    if (emailEl) emailEl.href = soc.email.startsWith('mailto:') ? soc.email : `mailto:${soc.email}`;

    // Bottom Status Pill
    const pillTitle = document.getElementById('pill-title');
    if (pillTitle && p.statusPill) {
      const parts = p.statusPill.split(' ');
      pillTitle.textContent = parts[0] || 'Ahz';
    }

    // Stars Navigation Hint Message
    const starsHintEl = document.getElementById('hint-msg-text');
    if (starsHintEl && p.starsHint) {
      starsHintEl.textContent = p.starsHint;
    }
  }

  startTypewriter() {
    if (this.typewriterTimeout) clearTimeout(this.typewriterTimeout);

    const roles = PORTFOLIO_CONFIG.personal.roles;
    if (!roles || roles.length === 0) return;

    const currentRole = roles[this.roleIndex % roles.length];
    const textEl = document.getElementById('typewriter-text');
    if (!textEl) return;

    if (this.isDeleting) {
      this.charIndex--;
      textEl.textContent = currentRole.substring(0, this.charIndex);
    } else {
      this.charIndex++;
      textEl.textContent = currentRole.substring(0, this.charIndex);
    }

    let typeSpeed = this.isDeleting ? 40 : 85;

    // Finished typing current role
    if (!this.isDeleting && this.charIndex === currentRole.length) {
      typeSpeed = 2200; // Hold full text
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex++;
      typeSpeed = 450; // Pause before typing next
    }

    this.typewriterTimeout = setTimeout(() => this.startTypewriter(), typeSpeed);
  }

  initRouter() {
    window.addEventListener('hashchange', () => {
      this.handleRoute();
    });

    // Check hash on initial startup
    this.handleRoute();
  }

  handleRoute() {
    const rawHash = window.location.hash || '';
    const route = rawHash.replace(/^#\/?/, '').toLowerCase().trim();

    const p = PORTFOLIO_CONFIG.personal;
    const defaultTitle = `${p.name} | ${p.roles[0] || 'Full Stack Developer'}`;

    if (!route || route === '' || route === '/') {
      this.modalManager.closePage();
      if (this.galaxyScene) this.galaxyScene.resetWarpState();
      this.isTransitioning = false;
      document.title = defaultTitle;
      return;
    }

    if (route === 'projects') {
      this.modalManager.showProjects();
      document.title = `Projects | ${p.name}`;
      return;
    }

    if (route === 'about') {
      this.modalManager.showAbout();
      document.title = `About | ${p.name}`;
      return;
    }

    if (route === 'contact') {
      this.modalManager.showContact();
      document.title = `Contact | ${p.name}`;
      return;
    }

    if (route === 'resume') {
      this.modalManager.showResume();
      document.title = `Resume | ${p.name}`;
      return;
    }

    if (route === 'photos') {
      this.modalManager.showPhotos();
      document.title = `Visual Gallery | ${p.name}`;
      return;
    }

    // Default fallback
    this.modalManager.closePage();
    document.title = defaultTitle;
  }

  // Hyperspace Warp Transition: Spins galaxy fast, expands into pure white, fades in target page
  triggerGalaxyWarpTransition(targetId) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    // 1. Start screen transition to solid brilliant white
    const whiteOverlay = document.getElementById('warp-white-overlay');
    if (whiteOverlay) {
      whiteOverlay.classList.remove('fade-out');
      whiteOverlay.classList.add('flash-in');
    }

    // 2. Trigger 3D Galaxy spin fast and expand large into the screen
    if (this.galaxyScene) {
      this.galaxyScene.triggerWarpJump(
        // Midpoint callback: Screen is completely white
        () => {
          // Mount the target page behind the white overlay
          window.location.hash = '#/' + targetId;

          // Brief tick for DOM to paint behind white overlay, then smoothly fade out white
          setTimeout(() => {
            if (whiteOverlay) {
              whiteOverlay.classList.remove('flash-in');
              whiteOverlay.classList.add('fade-out');
            }
            this.isTransitioning = false;
          }, 120);
        },
        // Complete callback: Clean up classes
        () => {
          setTimeout(() => {
            if (whiteOverlay) {
              whiteOverlay.classList.remove('fade-out');
            }
          }, 950);
        }
      );
    } else {
      window.location.hash = '#/' + targetId;
      if (whiteOverlay) {
        whiteOverlay.classList.remove('flash-in');
      }
      this.isTransitioning = false;
    }
  }

  handleNavNodeClick(node) {
    if (!node) return;

    const targetId = (node.target || node.id || '').toLowerCase();
    const internalSections = ['projects', 'about', 'contact', 'resume', 'photos'];

    // 1. Internal Portfolio Navigation Nodes: Trigger Hyperspace Galaxy Warp Jump
    if (internalSections.includes(targetId)) {
      if (this.galaxyScene && !this.modalManager.activePage) {
        this.triggerGalaxyWarpTransition(targetId);
        return;
      } else {
        window.location.hash = '#/' + targetId;
        return;
      }
    }

    // 2. External Social Profiles (Safe new browser tab)
    if (targetId === 'github' || node.icon === 'github') {
      const url = node.url || PORTFOLIO_CONFIG.socials.github;
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }

    if (targetId === 'linkedin' || node.icon === 'linkedin') {
      const url = node.url || PORTFOLIO_CONFIG.socials.linkedin;
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }

    if (targetId === 'instagram' || node.icon === 'instagram') {
      const url = node.url || PORTFOLIO_CONFIG.socials.instagram || 'https://instagram.com/adars_hz';
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }

    // Fallback for any other external URL
    if (node.type === 'external' && node.url) {
      window.open(node.url, '_blank', 'noopener,noreferrer');
    }
  }

  bindEvents() {
    // 0. Click the stars hint interaction -> highlights all galaxy stars
    const starsHintBadge = document.getElementById('hero-stars-hint');
    if (starsHintBadge) {
      starsHintBadge.addEventListener('click', () => {
        if (this.galaxyScene) {
          this.galaxyScene.pulseAllNodes();
        }
      });
      starsHintBadge.addEventListener('mouseenter', () => {
        if (this.galaxyScene) {
          this.galaxyScene.pulseAllNodes();
        }
      });
    }

    // 1. Bottom Right Control Pill (Ahz CTRL) -> Toggles AHZ SYSTEM CORE Panel
    const ctrlPill = document.getElementById('bottom-control-pill');
    const systemPanel = document.getElementById('ahz-system-panel');
    const closePanelBtn = document.getElementById('ahz-close-btn');

    if (ctrlPill && systemPanel) {
      ctrlPill.addEventListener('click', (e) => {
        e.stopPropagation();
        systemPanel.classList.toggle('active');
      });
    }

    if (closePanelBtn && systemPanel) {
      closePanelBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        systemPanel.classList.remove('active');
      });
    }

    // Close panel on outside click or ESC key
    document.addEventListener('click', (e) => {
      if (systemPanel && systemPanel.classList.contains('active')) {
        if (!systemPanel.contains(e.target) && !ctrlPill.contains(e.target)) {
          systemPanel.classList.remove('active');
        }
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && systemPanel && systemPanel.classList.contains('active')) {
        systemPanel.classList.remove('active');
      }
    });

    // 6. Galaxy Particles Theme Switcher
    const themeButtons = document.querySelectorAll('.ahz-theme-btn');
    themeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const theme = btn.getAttribute('data-theme');
        if (this.galaxyScene) {
          this.galaxyScene.setTheme(theme);
        }
      });
    });

    // 8. 3D Rotation Speed Control (Standard 1x / Hyperdrive 3x)
    const speedButtons = document.querySelectorAll('.ahz-speed-btn');
    speedButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        speedButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const speed = parseFloat(btn.getAttribute('data-speed'));
        if (this.galaxyScene) {
          this.galaxyScene.setRotationSpeed(speed);
        }
      });
    });
  }
}

// Launch App when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});
