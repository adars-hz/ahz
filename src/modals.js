import { PORTFOLIO_CONFIG } from './config.js';

export class ModalManager {
  constructor(audio) {
    this.audio = audio;
    this.activeModal = null;
    this.container = document.getElementById('modal-overlay-container');
    this.setupGlobalEvents();
  }

  setupGlobalEvents() {
    // ESC key closes any open modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeModal) {
        this.closeModal();
      }
    });

    // Click outside modal content closes it
    this.container.addEventListener('click', (e) => {
      if (e.target === this.container) {
        this.closeModal();
      }
    });
  }

  openModal(contentHtml, modalClass = '') {
    if (this.audio) this.audio.playChime(640);
    this.container.innerHTML = `
      <div class="modal-card ${modalClass}">
        <button class="modal-close-btn" id="modal-close-btn" title="Close (Esc)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="modal-body">
          ${contentHtml}
        </div>
      </div>
    `;

    this.container.classList.add('active');
    this.activeModal = true;

    // Attach close listener
    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }
  }

  closeModal() {
    this.container.classList.remove('active');
    this.activeModal = false;
    setTimeout(() => {
      if (!this.activeModal) {
        this.container.innerHTML = '';
      }
    }, 300);
  }

  // 1. Projects Modal
  showProjects() {
    const projects = PORTFOLIO_CONFIG.projects;
    const categories = ['All', 'Full Stack', 'Backend', 'Frontend / 3D'];

    const renderProjects = (filter = 'All') => {
      const filtered = filter === 'All' ? projects : projects.filter(p => p.category.includes(filter) || filter.includes(p.category));
      return filtered.map(p => `
        <div class="project-card">
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
              <a href="${p.liveUrl}" target="_blank" rel="noopener" class="btn-project btn-live">
                <span>Live Demo</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
              <a href="${p.githubUrl}" target="_blank" rel="noopener" class="btn-project btn-code">
                <span>Code</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            </div>
          </div>
        </div>
      `).join('');
    };

    const html = `
      <div class="projects-modal-wrap">
        <div class="modal-header">
          <span class="modal-sub">FEATURED WORK</span>
          <h2 class="modal-title">Featured Projects</h2>
          <p class="modal-desc">Explore hand-crafted software architectures, web platforms, and interactive experiences.</p>
        </div>

        <div class="filter-bar">
          ${categories.map(c => `
            <button class="filter-btn ${c === 'All' ? 'active' : ''}" data-category="${c}">${c}</button>
          `).join('')}
        </div>

        <div class="projects-grid" id="projects-grid-list">
          ${renderProjects('All')}
        </div>
      </div>
    `;

    this.openModal(html, 'modal-wide');

    // Filter bar interaction
    const filterButtons = document.querySelectorAll('.filter-btn');
    const grid = document.getElementById('projects-grid-list');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-category');
        grid.innerHTML = renderProjects(cat);
      });
    });
  }

  // 2. About Modal
  showAbout() {
    const a = PORTFOLIO_CONFIG.about;
    const skills = PORTFOLIO_CONFIG.skills;

    const html = `
      <div class="about-modal-wrap">
        <div class="modal-header">
          <span class="modal-sub">BIOGRAPHY</span>
          <h2 class="modal-title">${a.title}</h2>
          <p class="modal-desc">${a.subtitle}</p>
        </div>

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

            <h3 class="section-h3" style="margin-top: 2rem;">Education</h3>
            ${a.education.map(e => `
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-title">${e.degree}</div>
                <div class="timeline-inst">${e.institution} • ${e.year}</div>
                <div class="timeline-desc">${e.score}</div>
              </div>
            `).join('')}
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

            <h3 class="section-h3" style="margin-top: 2rem;">Technical Arsenal</h3>
            <div class="skills-pill-group">
              ${skills.map(s => `
                <span class="tech-arsenal-pill">
                  <span class="pill-dot" style="background:${s.color}"></span>
                  ${s.name} <small>(${s.level})</small>
                </span>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    this.openModal(html, 'modal-wide');
  }

  // 3. Contact Modal
  showContact() {
    const c = PORTFOLIO_CONFIG.contact;
    const soc = PORTFOLIO_CONFIG.socials;

    const html = `
      <div class="contact-modal-wrap">
        <div class="modal-header">
          <span class="modal-sub">GET IN TOUCH</span>
          <h2 class="modal-title">${c.heading}</h2>
          <p class="modal-desc">${c.subheading}</p>
        </div>

        <div class="contact-grid">
          <div class="contact-info-panel">
            <div class="info-card">
              <span class="info-label">Direct Email</span>
              <div class="copy-email-row">
                <span class="email-text" id="email-address-text">${c.email}</span>
                <button class="btn-copy" id="btn-copy-email" title="Copy to clipboard">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  <span id="copy-btn-text">Copy</span>
                </button>
              </div>
            </div>

            <div class="info-card">
              <span class="info-label">Location</span>
              <p class="info-val">${c.location}</p>
            </div>

            <div class="info-card">
              <span class="info-label">Status</span>
              <p class="info-val"><span class="status-online-dot"></span> ${c.status || "Available for Opportunities"}</p>
            </div>

            <div class="info-card">
              <span class="info-label">Direct Profiles</span>
              <div class="contact-social-icons">
                <a href="${soc.github}" target="_blank" rel="noopener" class="social-circle-link" title="GitHub">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a href="${soc.linkedin}" target="_blank" rel="noopener" class="social-circle-link" title="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </div>
          </div>

          <form class="contact-form" id="contact-form" onsubmit="return false;">
            <div class="form-group">
              <label for="contact-name">Your Name</label>
              <input type="text" id="contact-name" placeholder="John Doe" required />
            </div>

            <div class="form-group">
              <label for="contact-email">Your Email</label>
              <input type="email" id="contact-email" placeholder="john@example.com" required />
            </div>

            <div class="form-group">
              <label for="contact-msg">Message</label>
              <textarea id="contact-msg" rows="4" placeholder="Hi Adarsh, let's build something great..." required></textarea>
            </div>

            <button type="submit" class="btn-submit-contact" id="btn-send-message">
              <span>Send Message</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
            <div id="contact-form-feedback" class="form-feedback"></div>
          </form>
        </div>
      </div>
    `;

    this.openModal(html);

    // Copy Email button
    const copyBtn = document.getElementById('btn-copy-email');
    const copyText = document.getElementById('copy-btn-text');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(c.email).then(() => {
          copyText.textContent = 'Copied!';
          setTimeout(() => { copyText.textContent = 'Copy'; }, 2000);
        });
      });
    }

    // Form submit simulate
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('contact-form-feedback');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        feedback.innerHTML = `
          <div class="success-msg">
            ✓ Message received! I will get back to you within 24 hours.
          </div>
        `;
        form.reset();
      });
    }
  }

  // 4. Resume Modal
  showResume() {
    const res = PORTFOLIO_CONFIG.resume;
    const personal = PORTFOLIO_CONFIG.personal;

    const html = `
      <div class="resume-modal-wrap">
        <div class="modal-header">
          <span class="modal-sub">CURRICULUM VITAE</span>
          <h2 class="modal-title">${personal.name} - Resume</h2>
          <p class="modal-desc">MCA Candidate • Full Stack & Python Developer • Kannur, Kerala, India</p>
        </div>

        <div class="resume-preview-box">
          <div class="resume-header-bar">
            <div>
              <h3>${personal.name}</h3>
              <p>${personal.roles[0]} • ${personal.location}</p>
              <p style="font-size: 12px; color: #94a3b8; margin-top: 3px;">GitHub: adars-hz • LinkedIn: adarshz001</p>
            </div>
            <a href="mailto:${PORTFOLIO_CONFIG.contact.email}" class="resume-contact-badge">${PORTFOLIO_CONFIG.contact.email}</a>
          </div>

          <div class="resume-snippet">
            <h4>Verified Resume Highlights</h4>
            <ul>
              <li><strong>Education:</strong> MCA at AJ Institute of Engineering & Technology (Nov 2026 – Present) | BCA at Gurudev Arts & Science College, Payyannur (Jul 2022 – Mar 2025).</li>
              <li><strong>Internship:</strong> Full Stack Development Intern at ICT Academy of Kerala (Dec 2024 – Jan 2025) using full MERN stack (MongoDB, Express.js, React.js, Node.js).</li>
              <li><strong>AI & ML Projects:</strong> NeuroFace attendance system (MTCNN multi-face detection, ArcFace embeddings) & Smart Study Planner (Decision Tree Regression).</li>
              <li><strong>Full Stack Platform:</strong> Life Connect Registry (3-role responsive organ donation web platform with secure authentication).</li>
              <li><strong>Core Arsenal:</strong> Python, JavaScript, Java, React.js, Node.js, Express.js, FastAPI, Django, MongoDB, SQLite, Git, Postman.</li>
            </ul>
          </div>
        </div>

        <div class="resume-actions-row">
          <button class="btn-download-resume" id="btn-download-mock-resume">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span>Download PDF Resume</span>
          </button>
          <button class="btn-secondary" id="btn-open-email-inq">
            <span>Hire / Interview</span>
          </button>
        </div>
      </div>
    `;

    this.openModal(html);

    const downloadBtn = document.getElementById('btn-download-mock-resume');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        // Trigger browser print or download
        window.print();
      });
    }

    const hireBtn = document.getElementById('btn-open-email-inq');
    if (hireBtn) {
      hireBtn.addEventListener('click', () => {
        this.showContact();
      });
    }
  }

  // 5. Skill Click Detail Modal
  showSkillDetail(skill) {
    const relatedProjects = PORTFOLIO_CONFIG.projects.filter(p =>
      p.tags.some(t => t.toLowerCase().includes(skill.name.toLowerCase()))
    );

    const html = `
      <div class="skill-detail-wrap">
        <div class="modal-header">
          <span class="modal-sub">TECH NODE</span>
          <div class="skill-title-row">
            <span class="skill-color-indicator" style="background: ${skill.color}"></span>
            <h2 class="modal-title">${skill.name}</h2>
          </div>
          <p class="modal-desc">${skill.category} • Experience: ${skill.experience}</p>
        </div>

        <div class="skill-level-card">
          <div class="skill-level-header">
            <span>Proficiency</span>
            <strong>${skill.level}</strong>
          </div>
          <div class="skill-progress-bar">
            <div class="skill-progress-fill" style="width: ${skill.level}; background: ${skill.color};"></div>
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

        <div class="skill-action-row">
          <button class="btn-project btn-live" id="skill-explore-all">View All Projects</button>
        </div>
      </div>
    `;

    this.openModal(html);

    const exploreBtn = document.getElementById('skill-explore-all');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', () => {
        this.showProjects();
      });
    }
  }

  // 6. Live Customizer / Easy Edit Drawer
  showLiveEditor(galaxyScene, onDataUpdated) {
    const p = PORTFOLIO_CONFIG.personal;
    const soc = PORTFOLIO_CONFIG.socials;

    const html = `
      <div class="editor-drawer-wrap">
        <div class="modal-header">
          <span class="modal-sub">EASY EDIT SYSTEM</span>
          <h2 class="modal-title">Live Portfolio Customizer</h2>
          <p class="modal-desc">Edit your name, titles, or settings here to test live, or edit <code>src/config.js</code> directly!</p>
        </div>

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

    this.openModal(html);

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
        this.closeModal();
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
