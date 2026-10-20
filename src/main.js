import './style.css';
import { PORTFOLIO_CONFIG } from './config.js';
import { GalaxyScene } from './galaxy.js';
import { ModalManager } from './modals.js';
import { CosmicAudio } from './audio.js';

class PortfolioApp {
  constructor() {
    this.audio = new CosmicAudio();
    this.modalManager = new ModalManager(this.audio);
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

    // 3. Initialize 3D Galaxy & Floating Tech Polyhedrons
    const canvasContainer = document.getElementById('webgl-canvas-container');
    this.galaxyScene = new GalaxyScene(canvasContainer, (skill) => {
      this.modalManager.showSkillDetail(skill);
    });

    // 4. Bind UI Event Handlers
    this.bindEvents();
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

  bindEvents() {
    // 1. View Projects Button
    const btnProjects = document.getElementById('btn-view-projects');
    if (btnProjects) {
      btnProjects.addEventListener('click', () => {
        this.modalManager.showProjects();
      });
    }

    // 2. About Button
    const btnAbout = document.getElementById('btn-about');
    if (btnAbout) {
      btnAbout.addEventListener('click', () => {
        this.modalManager.showAbout();
      });
    }

    // 3. Contact Button
    const btnContact = document.getElementById('btn-contact');
    if (btnContact) {
      btnContact.addEventListener('click', () => {
        this.modalManager.showContact();
      });
    }

    // 4. Resume Button
    const btnResume = document.getElementById('btn-resume');
    if (btnResume) {
      btnResume.addEventListener('click', () => {
        this.modalManager.showResume();
      });
    }

    // 5. Bottom Right Control Pill (Ahz CTRL) -> Toggles AHZ SYSTEM CORE Panel
    const ctrlPill = document.getElementById('bottom-control-pill');
    const systemPanel = document.getElementById('ahz-system-panel');
    const closePanelBtn = document.getElementById('ahz-close-btn');

    if (ctrlPill && systemPanel) {
      ctrlPill.addEventListener('click', (e) => {
        e.stopPropagation();
        systemPanel.classList.toggle('active');
        if (this.audio) this.audio.playChime(750);
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

    // 6. Ambient Music Player inside System Core Panel
    const playBtn = document.getElementById('ahz-music-play-btn');
    const playText = document.getElementById('ahz-play-text');
    const musicStatus = document.getElementById('ahz-music-status');

    if (playBtn) {
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isPlaying = this.audio.toggle();
        if (isPlaying) {
          playBtn.classList.add('playing');
          if (playText) playText.textContent = '❚❚ Pause';
          if (musicStatus) musicStatus.textContent = 'Playing...';
        } else {
          playBtn.classList.remove('playing');
          if (playText) playText.textContent = '▷ Play';
          if (musicStatus) musicStatus.textContent = 'Paused';
        }
      });
    }

    // 7. Galaxy Particles Theme Switcher
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
        if (this.audio) this.audio.playChime(950);
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
        if (this.audio) this.audio.playChime(speed > 1 ? 1400 : 700);
      });
    });

    // Play subtle chime sound on button hovers
    document.querySelectorAll('button, .social-circle-btn, .bottom-control-pill').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        if (this.audio && this.audio.isPlaying) {
          this.audio.playChime(1200);
        }
      });
    });

    // Strict touch containment: prevent any viewport scroll bouncing or pulling on mobile
    document.addEventListener('touchmove', (e) => {
      if (!e.target.closest('.modal-card') && !e.target.closest('.ahz-system-panel') && !e.target.closest('.filter-bar')) {
        e.preventDefault();
      }
    }, { passive: false });
  }
}

// Launch App when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});
