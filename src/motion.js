import { animate, stagger } from 'motion';

/**
 * Framer Motion Animation Controller
 * Provides staggered entrances, spring physics, and dynamic micro-interactions.
 */
export class MotionEffects {
  /**
   * Staggered entrance animation for page elements
   */
  static animatePageContent(container) {
    if (!container) return;

    // Check prefers-reduced-motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // 1. Back and Next Navigation Buttons entrance
    const backBtn = container.querySelector('#btn-page-back');
    if (backBtn) {
      animate(backBtn, { opacity: [0, 1], x: [-16, 0] }, {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      });
    }

    const nextBtn = container.querySelector('#btn-page-next');
    if (nextBtn) {
      animate(nextBtn, { opacity: [0, 1], x: [16, 0] }, {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      });
    }

    // 2. Page Intro Header
    const introHeader = container.querySelector('.page-intro-header');
    if (introHeader) {
      const badge = introHeader.querySelector('.page-sub-badge');
      const title = introHeader.querySelector('.page-main-title');
      const desc = introHeader.querySelector('.page-main-desc');

      if (badge) {
        animate(badge, { opacity: [0, 1], y: [-12, 0] }, { duration: 0.4, ease: [0.16, 1, 0.3, 1] });
      }
      if (title) {
        animate(title, { opacity: [0, 1], y: [20, 0] }, { duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] });
      }
      if (desc) {
        animate(desc, { opacity: [0, 1], y: [16, 0] }, { duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] });
      }
    }

    // 3. Filter Buttons Stagger
    const filterBtns = container.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
      animate(filterBtns, { opacity: [0, 1], y: [12, 0], scale: [0.9, 1] }, {
        delay: stagger(0.04, { start: 0.12 }),
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1]
      });
    }

    // 4. Project Cards Stagger
    const projectCards = container.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
      animate(projectCards, { opacity: [0, 1], y: [35, 0], scale: [0.95, 1] }, {
        delay: stagger(0.08, { start: 0.16 }),
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1]
      });
      this.bindTiltEffect(projectCards);
    }

    // 5. About Page Elements Stagger
    const statBoxes = container.querySelectorAll('.stat-box');
    if (statBoxes.length > 0) {
      animate(statBoxes, { opacity: [0, 1], y: [24, 0], scale: [0.93, 1] }, {
        delay: stagger(0.06, { start: 0.12 }),
        duration: 0.48,
        ease: [0.16, 1, 0.3, 1]
      });
      this.bindTiltEffect(statBoxes);
    }

    const timelineItems = container.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
      animate(timelineItems, { opacity: [0, 1], x: [-18, 0] }, {
        delay: stagger(0.07, { start: 0.2 }),
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      });
    }

    const techPills = container.querySelectorAll('.tech-arsenal-pill');
    if (techPills.length > 0) {
      animate(techPills, { opacity: [0, 1], scale: [0.75, 1] }, {
        delay: stagger(0.025, { start: 0.25 }),
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1]
      });
    }

    // 6. Contact Page Elements Stagger
    const infoCards = container.querySelectorAll('.info-card');
    if (infoCards.length > 0) {
      animate(infoCards, { opacity: [0, 1], x: [-22, 0] }, {
        delay: stagger(0.07, { start: 0.14 }),
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      });
      this.bindTiltEffect(infoCards);
    }

    const formGroups = container.querySelectorAll('.form-group, .btn-submit-contact');
    if (formGroups.length > 0) {
      animate(formGroups, { opacity: [0, 1], y: [18, 0] }, {
        delay: stagger(0.06, { start: 0.18 }),
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      });
    }

    // 7. Resume Page Elements
    const resumeActions = container.querySelectorAll('.resume-actions-row > *');
    if (resumeActions.length > 0) {
      animate(resumeActions, { opacity: [0, 1], scale: [0.92, 1] }, {
        delay: stagger(0.08, { start: 0.1 }),
        duration: 0.45,
        ease: [0.34, 1.56, 0.64, 1]
      });
    }

    const resumeBox = container.querySelector('.resume-preview-box');
    if (resumeBox) {
      animate(resumeBox, { opacity: [0, 1], y: [28, 0] }, {
        delay: 0.16,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      });
    }

    // 8. Photo Cards Stagger
    const photoCards = container.querySelectorAll('.photo-card');
    if (photoCards.length > 0) {
      animate(photoCards, { opacity: [0, 1], y: [35, 0], scale: [0.95, 1] }, {
        delay: stagger(0.08, { start: 0.16 }),
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1]
      });
      this.bindTiltEffect(photoCards);
    }

    // 9. Bottom Bar Stagger
    const bottomBar = container.querySelector('.page-bottom-bar');
    if (bottomBar) {
      animate(bottomBar, { opacity: [0, 1], y: [15, 0] }, { delay: 0.25, duration: 0.55 });
    }
  }

  /**
   * Filter switch animation (e.g. switching between All, Full Stack, Backend)
   */
  static animateFilterTransition(items) {
    if (!items || items.length === 0) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    animate(items, { opacity: [0, 1], y: [24, 0], scale: [0.96, 1] }, {
      delay: stagger(0.05),
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1]
    });
    this.bindTiltEffect(items);
  }

  /**
   * Initial Hero Entrance Animation on Galaxy Home
   */
  static animateHeroEntrance() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const greeting = document.getElementById('hero-greeting');
    const name = document.getElementById('hero-name');
    const roleWrapper = document.querySelector('.hero-role-wrapper');
    const socials = document.querySelectorAll('.hero-socials .social-circle-btn');
    const hint = document.getElementById('hero-stars-hint');
    const ctrlPill = document.getElementById('bottom-control-pill');

    if (greeting) {
      animate(greeting, { opacity: [0, 1], y: [-15, 0] }, { duration: 0.6, ease: [0.16, 1, 0.3, 1] });
    }
    if (name) {
      animate(name, { opacity: [0, 1], scale: [0.9, 1], y: [15, 0] }, { delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] });
    }
    if (roleWrapper) {
      animate(roleWrapper, { opacity: [0, 1] }, { delay: 0.3, duration: 0.6 });
    }
    if (socials.length > 0) {
      animate(socials, { opacity: [0, 1], scale: [0, 1], y: [12, 0] }, {
        delay: stagger(0.08, { start: 0.4 }),
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1]
      });
    }
    if (hint) {
      animate(hint, { opacity: [0, 1], y: [14, 0] }, { delay: 0.65, duration: 0.6, ease: [0.16, 1, 0.3, 1] });
    }
    if (ctrlPill) {
      animate(ctrlPill, { opacity: [0, 1], x: [20, 0] }, { delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] });
    }
  }

  /**
   * Framer-style 3D interactive tilt & dynamic mouse highlight physics
   */
  static bindTiltEffect(cards) {
    if (window.innerWidth < 1024) return; // Disable heavy 3D tilt on mobile/touch devices

    cards.forEach(card => {
      if (card.dataset.tiltBound) return;
      card.dataset.tiltBound = 'true';

      card.style.transformStyle = 'preserve-3d';
      card.style.transition = 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease';

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6.5; // Max 6.5 deg tilt
        const rotateY = ((x - centerX) / centerX) * 6.5;

        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }
}

