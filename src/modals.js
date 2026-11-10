import { PORTFOLIO_CONFIG } from './config.js';
import { MotionEffects } from './motion.js';

// Dedicated page navigation flow
const PAGE_ORDER = [
  { id: 'projects', name: 'Projects' },
  { id: 'about', name: 'About' },
  { id: 'photos', name: 'Photos' },
  { id: 'resume', name: 'Resume' },
  { id: 'contact', name: 'Contact' }
];

function getNextPage(currentPageId) {
  const currentIndex = PAGE_ORDER.findIndex(p => p.id === currentPageId);
  if (currentIndex >= 0) {
    const nextIndex = (currentIndex + 1) % PAGE_ORDER.length;
    return PAGE_ORDER[nextIndex];
  }
  return PAGE_ORDER[0];
}

export class PageManager {
  constructor() {
    this.activePage = null;
    this.container = document.getElementById('page-overlay-container') || document.getElementById('modal-overlay-container');
    this.setupGlobalEvents();
  }

  setupGlobalEvents() {
    // ESC key returns to the 3D Galaxy Hub, Right Arrow navigates forward
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activePage) {
        // If a photo lightbox is open inside the photos page, close lightbox first
        const lightbox = document.getElementById('photo-lightbox');
        if (lightbox && lightbox.classList.contains('active')) {
          lightbox.classList.remove('active');
          lightbox.setAttribute('aria-hidden', 'true');
          return;
        }

        window.location.hash = '#/';
        return;
      }

      if (e.key === 'ArrowRight' && this.activePage) {
        const tag = (document.activeElement && document.activeElement.tagName) || '';
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
          const nextBtn = document.getElementById('btn-page-next');
          if (nextBtn) nextBtn.click();
        }
      }
    });
  }

  openPage(contentHtml, pageClass = '', activePageName = '') {
    this.activePage = activePageName;

    const p = PORTFOLIO_CONFIG.personal;
    const soc = PORTFOLIO_CONFIG.socials;
    const nextPage = getNextPage(activePageName);

    this.container.innerHTML = `
      <div class="site-page-wrapper">
        <!-- Minimalist Top Navigation Bar: Back on Left, Next on Right (Borderless) -->
        <div class="page-top-nav-bar page-top-back-bar">
          <a href="#/" class="btn-page-nav btn-page-back" id="btn-page-back" title="Back to 3D Galaxy (Esc)">
            <span class="nav-arrow-icon back-arrow-icon" aria-hidden="true">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </span>
            <span class="nav-btn-text back-btn-text">Back</span>
          </a>

          <a href="#/${nextPage.id}" class="btn-page-nav btn-page-next" id="btn-page-next" title="Next: ${nextPage.name}">
            <span class="nav-btn-text next-btn-text">Next</span>
            <span class="nav-arrow-icon next-arrow-icon" aria-hidden="true">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </a>
        </div>

        <!-- Dedicated Page Main Content -->
        <main class="site-page-main">
          <div class="site-page-container ${pageClass}">
            ${contentHtml}
          </div>
        </main>

        <!-- Clean Bottom Bar: Socials in Left Corner, Copyright in Right Corner -->
        <div class="page-bottom-bar">
          <div class="bottom-bar-left">
            <div class="bottom-social-links">
              <a href="${soc.github}" target="_blank" rel="noopener noreferrer" class="bottom-social-btn" title="GitHub">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="${soc.linkedin}" target="_blank" rel="noopener noreferrer" class="bottom-social-btn" title="LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="${soc.instagram || 'https://instagram.com/adars_hz'}" target="_blank" rel="noopener noreferrer" class="bottom-social-btn" title="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="${soc.email.startsWith('mailto:') ? soc.email : `mailto:${soc.email}`}" class="bottom-social-btn" title="Send Email">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </a>
            </div>
          </div>

          <div class="bottom-bar-right">
            <span class="bottom-copyright-text">© 2026 ${p.name}. All rights reserved.</span>
          </div>
        </div>
      </div>
    `;

    this.container.classList.add('active');
    // Smoothly scroll back to top of page on navigation
    this.container.scrollTop = 0;

    // Trigger Framer Motion staggered entrance animations for all elements
    MotionEffects.animatePageContent(this.container);
  }

  // Alias for backward compatibility
  openModal(contentHtml, modalClass = '', activePage = '') {
    this.openPage(contentHtml, modalClass, activePage);
  }

  closePage() {
    if (!this.activePage && !this.container.classList.contains('active')) return;
    this.container.classList.remove('active');
    this.activePage = null;
    setTimeout(() => {
      if (!this.activePage) {
        this.container.innerHTML = '';
      }
    }, 320);
  }

  // Alias for backward compatibility
  closeModal() {
    this.closePage();
    if (window.location.hash && window.location.hash !== '#/' && window.location.hash !== '#') {
      window.location.hash = '#/';
    }
  }

  // 1. Dedicated Projects Page
  showProjects() {
    const projects = PORTFOLIO_CONFIG.projects;
    const categories = ['All', 'Full Stack', 'AI & Machine Learning', 'Backend'];

    const renderProjects = (filter = 'All') => {
      const filtered = filter === 'All'
        ? projects
        : projects.filter(p => {
            const cat = (p.category || '').toLowerCase();
            const tags = (p.tags || []).map(t => t.toLowerCase());
            const q = filter.toLowerCase();
            if (q.includes('ai') || q.includes('machine learning')) {
              return cat.includes('ai') || cat.includes('machine') || tags.includes('ai/ml') || tags.includes('machine learning');
            }
            if (q.includes('full stack')) {
              return cat.includes('full stack') || tags.includes('mern') || tags.includes('react.js');
            }
            if (q.includes('backend')) {
              return cat.includes('backend') || tags.includes('fastapi') || tags.includes('flask') || tags.includes('python');
            }
            return cat.includes(q);
          });

      return filtered.map(p => `
        <article class="project-card">
          <div class="project-banner" style="background: ${p.image};">
            <span class="project-category-badge">${p.category}</span>
          </div>
          <div class="project-content">
            <h3 class="project-title">${p.title}</h3>
            <p class="project-tagline">${p.tagline}</p>
            <p class="project-description">${p.description}</p>
            <div class="project-tags">
              ${p.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
            </div>
            <div class="project-links">
              <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-project btn-live">
                <span>View Details</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
              <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-project btn-code">
                <span>Source Code</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            </div>
          </div>
        </article>
      `).join('');
    };

    const html = `
      <div class="projects-page-wrap">
        <header class="page-intro-header">
          <span class="page-sub-badge">// FEATURED WORK</span>
          <h1 class="page-main-title">Engineering Projects & Architecture</h1>
          <p class="page-main-desc">Explore hand-crafted software architectures, AI computer vision systems, and interactive full-stack platforms developed by Adarsh M S.</p>
        </header>

        <div class="filter-bar">
          ${categories.map(c => `
            <button type="button" class="filter-btn ${c === 'All' ? 'active' : ''}" data-category="${c}">${c}</button>
          `).join('')}
        </div>

        <div class="projects-grid" id="projects-grid-list">
          ${renderProjects('All')}
        </div>
      </div>
    `;

    this.openPage(html, 'page-wide-container', 'projects');

    // Filter bar interaction
    const filterButtons = this.container.querySelectorAll('.filter-btn');
    const grid = document.getElementById('projects-grid-list');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-category');
        if (grid) {
          grid.innerHTML = renderProjects(cat);
          MotionEffects.animateFilterTransition(grid.querySelectorAll('.project-card'));
        }
      });
    });
  }

  // 2. Dedicated About Page
  showAbout() {
    const a = PORTFOLIO_CONFIG.about;
    const skills = PORTFOLIO_CONFIG.skills;

    const html = `
      <div class="about-page-wrap">
        <header class="page-intro-header">
          <span class="page-sub-badge">&gt;_ // BIOGRAPHY</span>
          <h1 class="page-main-title">${a.title}</h1>
          <p class="page-main-desc">${a.subtitle}</p>
        </header>

        <!-- Metric Summary Cards -->
        <div class="stats-row">
          ${a.stats.map(s => `
            <div class="stat-box">
              <span class="stat-number">${s.value}</span>
              <span class="stat-label">${s.label}</span>
            </div>
          `).join('')}
        </div>

        <div class="about-grid">
          <div class="about-col">
            <h3 class="section-h3">Career Objective</h3>
            ${a.bio.map(p => `<p class="bio-para">${p}</p>`).join('')}

            <h3 class="section-h3" style="margin-top: 2.5rem;">Academic Education</h3>
            <div class="timeline-list">
              ${a.education.map(e => `
                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-title">${e.degree}</div>
                  <div class="timeline-inst">${e.institution} • ${e.year}</div>
                  <div class="timeline-desc">${e.score}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="about-col">
            <h3 class="section-h3">Internship & Experience</h3>
            <div class="timeline-list">
              ${a.experience.map(exp => `
                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-title">${exp.role} <span class="company-badge">@ ${exp.company}</span></div>
                  <div class="timeline-inst">${exp.period}</div>
                  <div class="timeline-desc">${exp.details}</div>
                </div>
              `).join('')}
            </div>

            <h3 class="section-h3" style="margin-top: 2.5rem;">Technical Arsenal</h3>
            <div class="skills-pill-group">
              ${skills.map(s => `
                <span class="tech-arsenal-pill">
                  <span class="pill-dot" style="background: ${s.color || '#38bdf8'};"></span>
                  <span class="pill-name">${s.name}</span>
                  <span class="pill-level">(${s.level})</span>
                </span>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    this.openPage(html, 'page-wide-container', 'about');
  }

  // 3. Dedicated Contact Page
  showContact() {
    const c = PORTFOLIO_CONFIG.contact;
    const soc = PORTFOLIO_CONFIG.socials;

    const html = `
      <div class="contact-page-wrap">
        <header class="page-intro-header">
          <span class="page-sub-badge">// GET IN TOUCH</span>
          <h1 class="page-main-title">${c.heading}</h1>
          <p class="page-main-desc">${c.subheading}</p>
        </header>

        <div class="contact-grid">
          <div class="contact-info-panel">
            <div class="info-card">
              <span class="info-label">Direct Email</span>
              <div class="copy-email-row">
                <span class="email-text" id="email-address-text">${c.email}</span>
                <button type="button" class="btn-copy" id="btn-copy-email" title="Copy to clipboard">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  <span id="copy-btn-text">Copy</span>
                </button>
              </div>
            </div>

            <div class="info-card">
              <span class="info-label">Location</span>
              <p class="info-val">${c.location}</p>
            </div>

            <div class="info-card">
              <span class="info-label">Availability Status</span>
              <p class="info-val"><span class="status-online-dot"></span> ${c.status || "Available for Software Development Roles"}</p>
            </div>

            <div class="info-card">
              <span class="info-label">Direct Social Profiles</span>
              <div class="contact-social-icons">
                <a href="${soc.github}" target="_blank" rel="noopener noreferrer" class="social-circle-link" title="GitHub">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a href="${soc.linkedin}" target="_blank" rel="noopener noreferrer" class="social-circle-link" title="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="${soc.instagram || 'https://instagram.com/adars_hz'}" target="_blank" rel="noopener noreferrer" class="social-circle-link" title="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>
            </div>
          </div>

          <div class="contact-form-panel">
            <form class="contact-form" id="contact-form" onsubmit="return false;">
              <h3 class="section-h3" style="margin-bottom: 1.25rem;">Send a Direct Message</h3>
              <div class="form-group">
                <label for="contact-name">Your Name</label>
                <input type="text" id="contact-name" placeholder="e.g. Alex Johnson" required />
              </div>

              <div class="form-group">
                <label for="contact-email">Your Email</label>
                <input type="email" id="contact-email" placeholder="e.g. alex@company.com" required />
              </div>

              <div class="form-group">
                <label for="contact-msg">Message</label>
                <textarea id="contact-msg" rows="5" placeholder="Hi Adarsh, I saw your portfolio and would like to discuss..." required></textarea>
              </div>

              <button type="submit" class="btn-submit-contact" id="btn-send-message">
                <span>Send Message</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
              <div id="contact-form-feedback" class="form-feedback"></div>
            </form>
          </div>
        </div>
      </div>
    `;

    this.openPage(html, 'page-contact-layout', 'contact');

    // Copy Email button
    const copyBtn = document.getElementById('btn-copy-email');
    const copyText = document.getElementById('copy-btn-text');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(c.email).then(() => {
          if (copyText) copyText.textContent = 'Copied!';
          setTimeout(() => { if (copyText) copyText.textContent = 'Copy'; }, 2000);
        });
      });
    }

    // Form submit simulate
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('contact-form-feedback');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (feedback) {
          feedback.innerHTML = `
            <div class="success-msg">
              ✓ Message received! I will review your note and get back to you within 24 hours.
            </div>
          `;
        }
        form.reset();
      });
    }
  }

  // 4. Dedicated Resume Page
  showResume() {
    const res = PORTFOLIO_CONFIG.resume;
    const personal = PORTFOLIO_CONFIG.personal;

    const html = `
      <div class="resume-page-wrap">
        <header class="page-intro-header">
          <span class="page-sub-badge">// CURRICULUM VITAE</span>
          <h1 class="page-main-title">${personal.name} - Resume</h1>
          <p class="page-main-desc">MCA Candidate • Full Stack & Python Developer • Kannur, Kerala, India</p>
        </header>

        <div class="resume-actions-row" style="margin-bottom: 2rem;">
          <button type="button" class="btn-download-resume" id="btn-download-mock-resume">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span>Download PDF Resume</span>
          </button>
          <a href="#/contact" class="btn-secondary" id="btn-open-email-inq">
            <span>Hire / Interview Inquiries ↵</span>
          </a>
        </div>

        <div class="resume-preview-box">
          <div class="resume-header-bar">
            <div class="resume-candidate-meta">
              <h2 class="resume-candidate-name">${personal.name}</h2>
              <p class="resume-candidate-subtitle">${personal.roles[0] || 'Full Stack Developer'} • ${personal.location}</p>
              <p class="resume-candidate-links">GitHub: adars-hz • LinkedIn: adarshz001 • Kannur, Kerala</p>
            </div>
            <a href="mailto:${PORTFOLIO_CONFIG.contact.email}" class="resume-contact-badge">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <span>${PORTFOLIO_CONFIG.contact.email}</span>
            </a>
          </div>

          <div class="resume-snippet">
            <h4>Verified Engineering Highlights</h4>
            <ul>
              <li><strong>Education:</strong> Master of Computer Applications (MCA) at AJ Institute of Engineering & Technology, Mangaluru (Nov 2026 – Present) | Bachelor of Computer Applications (BCA) at Gurudev Arts & Science College, Payyannur (Jul 2022 – Mar 2025).</li>
              <li><strong>Internship:</strong> Full Stack Development Intern at ICT Academy of Kerala (Dec 2024 – Jan 2025) using full MERN stack (MongoDB, Express.js, React.js, Node.js).</li>
              <li><strong>AI & ML Systems:</strong> NeuroFace attendance marking engine (MTCNN multi-face detection, ArcFace embeddings, duplicate rejection) & Smart Study Planner (Decision Tree Regression).</li>
              <li><strong>Full Stack Platform:</strong> Life Connect Registry (3-role responsive organ donation web platform with secure authentication).</li>
              <li><strong>Core Arsenal:</strong> Python, JavaScript, Java, React.js, Node.js, Express.js, FastAPI, Django, MongoDB, SQLite, Git, Postman.</li>
            </ul>
          </div>
        </div>
      </div>
    `;

    this.openPage(html, 'page-resume-layout', 'resume');

    const downloadBtn = document.getElementById('btn-download-mock-resume');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        if (res && res.downloadUrl && res.downloadUrl !== '#' && res.downloadUrl !== '') {
          window.open(res.downloadUrl, '_blank', 'noopener,noreferrer');
        } else {
          window.print();
        }
      });
    }
  }

  // 5. Dedicated Photos & Visual Gallery Page
  showPhotos() {
    const photos = PORTFOLIO_CONFIG.photos || [];
    const categories = ['All', 'Profile', 'AI / ML', 'Full Stack', 'Three.js / 3D'];

    const renderPhotos = (filter = 'All') => {
      const filtered = filter === 'All'
        ? photos
        : photos.filter(p => p.category === filter || (p.category && p.category.includes(filter)));

      return filtered.map(p => `
        <article class="photo-card" data-photo-id="${p.id}">
          <div class="photo-media-wrapper" style="${p.gradient ? `background: ${p.gradient};` : ''}">
            ${p.image ? `
              <img src="${p.image}" alt="${p.title}" class="gallery-photo-img" loading="lazy" />
            ` : `
              <div class="photo-arch-placeholder">
                <span class="photo-arch-icon">⚡</span>
                <span class="photo-arch-tag">${p.badge || p.category}</span>
              </div>
            `}
            <span class="photo-category-pill">${p.category}</span>
          </div>
          <div class="photo-content">
            <h3 class="photo-title">${p.title}</h3>
            <p class="photo-subtitle">${p.subtitle || ''}</p>
            <p class="photo-caption">${p.caption || ''}</p>
            <div class="photo-footer">
              <button type="button" class="btn-inspect-photo" data-inspect="${p.id}" aria-label="Inspect ${p.title}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
                <span>Preview Details</span>
              </button>
            </div>
          </div>
        </article>
      `).join('');
    };

    const html = `
      <div class="photos-page-wrap">
        <header class="page-intro-header">
          <span class="page-sub-badge">// VISUAL ARCHIVE</span>
          <h1 class="page-main-title">Photos & Visual Gallery</h1>
          <p class="page-main-desc">Explore developer portraits, system architecture blueprints, and interactive graphics representing Adarsh's engineering journey.</p>
        </header>

        <div class="filter-bar photo-filter-bar">
          ${categories.map(c => `
            <button type="button" class="filter-btn ${c === 'All' ? 'active' : ''}" data-photo-category="${c}">${c}</button>
          `).join('')}
        </div>

        <div class="photos-grid" id="photos-grid-list">
          ${renderPhotos('All')}
        </div>

        <!-- Lightbox Overlay Dialog -->
        <div class="photo-lightbox" id="photo-lightbox" aria-hidden="true">
          <div class="lightbox-dialog" role="dialog" aria-modal="true" aria-label="Photo Preview Dialog">
            <button type="button" class="lightbox-close" id="lightbox-close-btn" title="Close Preview (Esc)">×</button>
            <div class="lightbox-content" id="lightbox-content"></div>
          </div>
        </div>
      </div>
    `;

    this.openPage(html, 'page-wide-container', 'photos');

    // Filter functionality
    const filterButtons = this.container.querySelectorAll('[data-photo-category]');
    const grid = document.getElementById('photos-grid-list');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-photo-category');
        if (grid) {
          grid.innerHTML = renderPhotos(cat);
          bindInspectButtons();
          MotionEffects.animateFilterTransition(grid.querySelectorAll('.photo-card'));
        }
      });
    });

    // Lightbox functionality
    const lightbox = document.getElementById('photo-lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    const lightboxClose = document.getElementById('lightbox-close-btn');

    const openLightbox = (photoId) => {
      const item = photos.find(p => p.id === photoId);
      if (!item) return;

      lightboxContent.innerHTML = `
        <div class="lightbox-hero" style="${item.gradient ? `background: ${item.gradient};` : ''}">
          ${item.image ? `<img src="${item.image}" alt="${item.title}" class="lightbox-img" />` : `<div class="lightbox-arch-view">⚡ ${item.badge || item.category}</div>`}
        </div>
        <div class="lightbox-info">
          <span class="modal-sub">// ${item.category.toUpperCase()}</span>
          <h3 class="lightbox-title">${item.title}</h3>
          <p class="lightbox-subtitle">${item.subtitle || ''}</p>
          <p class="lightbox-desc">${item.caption || ''}</p>
        </div>
      `;
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
    };

    const bindInspectButtons = () => {
      this.container.querySelectorAll('.btn-inspect-photo, .photo-media-wrapper').forEach(el => {
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          const card = el.closest('.photo-card');
          const id = el.getAttribute('data-inspect') || (card && card.getAttribute('data-photo-id'));
          if (id) openLightbox(id);
        });
      });
    };

    bindInspectButtons();

    if (lightboxClose) {
      lightboxClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
      });
    }

    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          closeLightbox();
        }
      });
    }
  }

  // 6. Skill Click Detail Modal
  showSkillDetail(skill) {
    const relatedProjects = PORTFOLIO_CONFIG.projects.filter(p =>
      p.tags.some(t => t.toLowerCase().includes(skill.name.toLowerCase()))
    );

    const html = `
      <div class="skill-detail-wrap">
        <header class="page-intro-header">
          <span class="page-sub-badge">&lt;&gt; // TECH NODE</span>
          <div class="skill-title-row">
            <span class="skill-color-indicator"></span>
            <h2 class="page-main-title">${skill.name}</h2>
          </div>
          <p class="page-main-desc">${skill.category} • Experience: ${skill.experience}</p>
        </header>

        <div class="skill-level-card">
          <div class="skill-level-header">
            <span>Proficiency</span>
            <strong>${skill.level}</strong>
          </div>
          <div class="skill-progress-bar">
            <div class="skill-progress-fill" style="width: ${skill.level};"></div>
          </div>
        </div>

        ${relatedProjects.length > 0 ? `
          <h4 class="rel-proj-head">Related Featured Work</h4>
          <div class="rel-projects-list">
            ${relatedProjects.map(p => `
              <div class="rel-proj-item">
                <h5>${p.title}</h5>
                <p>${p.tagline}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <div class="skill-action-row" style="margin-top: 2rem;">
          <a href="#/projects" class="btn-project btn-live" id="skill-explore-all">View All Projects</a>
        </div>
      </div>
    `;

    this.openPage(html, 'page-narrow-container', 'skills');
  }

  // 7. Live Customizer / Easy Edit Drawer
  showLiveEditor(galaxyScene, onDataUpdated) {
    const p = PORTFOLIO_CONFIG.personal;
    const soc = PORTFOLIO_CONFIG.socials;

    const html = `
      <div class="editor-drawer-wrap">
        <header class="page-intro-header">
          <span class="page-sub-badge">// EASY EDIT SYSTEM</span>
          <h2 class="page-main-title">Live Portfolio Customizer</h2>
          <p class="page-main-desc">Edit your name, titles, or settings here to test live, or edit <code>src/config.js</code> directly!</p>
        </header>

        <div class="editor-fields">
          <div class="form-group">
            <label>Greeting Subtitle</label>
            <input type="text" id="edit-greeting" value="${p.greeting}" />
          </div>

          <div class="form-group">
            <label>Your Full Name</label>
            <input type="text" id="edit-name" value="${p.name}" />
          </div>

          <div class="form-group">
            <label>Rotating Roles (comma separated)</label>
            <input type="text" id="edit-roles" value="${p.roles.join(', ')}" />
          </div>

          <div class="form-group">
            <label>GitHub Profile URL</label>
            <input type="text" id="edit-github" value="${soc.github}" />
          </div>

          <div class="form-group">
            <label>LinkedIn Profile URL</label>
            <input type="text" id="edit-linkedin" value="${soc.linkedin}" />
          </div>

          <div class="form-group">
            <label>Contact Email</label>
            <input type="text" id="edit-email" value="${PORTFOLIO_CONFIG.contact.email}" />
          </div>
        </div>

        <div class="editor-actions">
          <button class="btn-project btn-live" id="btn-apply-editor">
            <span>Apply Live Changes</span>
          </button>
          <button class="btn-project btn-code" id="btn-copy-config">
            <span id="copy-cfg-label">Copy Updated Config Code</span>
          </button>
        </div>
      </div>
    `;

    this.openPage(html, 'page-narrow-container', 'customizer');

    const applyBtn = document.getElementById('btn-apply-editor');
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        p.greeting = document.getElementById('edit-greeting').value;
        p.name = document.getElementById('edit-name').value;
        const rolesInput = document.getElementById('edit-roles').value;
        p.roles = rolesInput.split(',').map(r => r.trim()).filter(Boolean);
        soc.github = document.getElementById('edit-github').value;
        soc.linkedin = document.getElementById('edit-linkedin').value;
        PORTFOLIO_CONFIG.contact.email = document.getElementById('edit-email').value;

        if (onDataUpdated) onDataUpdated();
        this.closePage();
      });
    }

    const copyBtn = document.getElementById('btn-copy-config');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const jsonStr = `export const PORTFOLIO_CONFIG = ` + JSON.stringify(PORTFOLIO_CONFIG, null, 2) + ';';
        navigator.clipboard.writeText(jsonStr).then(() => {
          document.getElementById('copy-cfg-label').textContent = '✓ Copied to Clipboard!';
          setTimeout(() => {
            const el = document.getElementById('copy-cfg-label');
            if (el) el.textContent = 'Copy Updated Config Code';
          }, 2500);
        });
      });
    }
  }
}

// Export ModalManager alias for backwards compatibility
export { PageManager as ModalManager };
