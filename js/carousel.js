/**
 * Hero Carousel & Tabs Controller
 */
class HeroCarousel {
  constructor(data) {
    this.projects = data.featuredProjects;
    this.currentIndex = 0;
    this.currentTab = 'detalhes';

    // DOM Elements
    this.mediaBoxEl = document.querySelector('.hero-media-box');
    this.imgEl = document.getElementById('heroImg');
    this.badgeTimerEl = document.getElementById('heroTimer');
    this.badgeTopLeftEl = document.getElementById('heroBadgeText');
    this.zoomBadgeTextEl = document.getElementById('heroZoomBadgeText');
    this.titleEl = document.getElementById('heroTitle');
    this.descEl = document.getElementById('heroDesc');
    this.dateEl = document.getElementById('heroDate');
    this.liveBadgeEl = document.getElementById('heroLiveBadge');
    this.liveBadgeTextEl = document.getElementById('heroLiveBadgeText');
    this.stackValEl = document.getElementById('heroStackVal');
    this.githubBtn = document.getElementById('heroGithubBtn');
    this.prevBtn = document.getElementById('heroPrev');
    this.nextBtn = document.getElementById('heroNext');
    this.ctaBtn = document.getElementById('heroCta');
    this.tabButtons = document.querySelectorAll('.hero-tab-btn');

    this.init();
  }

  init() {
    if (!this.projects || this.projects.length === 0) return;

    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());

    // Click on media box / image to open full gallery lightbox
    this.mediaBoxEl?.addEventListener('click', (e) => {
      if (e.target.closest('#heroCta') || e.target.closest('a') || e.target.closest('button')) {
        return;
      }
      const proj = this.projects[this.currentIndex];
      if (proj && typeof Modal !== 'undefined') {
        Modal.openGallery(proj, 0);
      }
    });

    this.tabButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentTab = btn.getAttribute('data-tab');
        this.updateTabContent();
      });
    });

    this.ctaBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const proj = this.projects[this.currentIndex];
      if (proj && proj.liveUrl) {
        window.open(proj.liveUrl, '_blank');
      }
    });

    // Render initial project data from data.js
    this.render();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
    this.render();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.projects.length;
    this.render();
  }

  updateTabContent() {
    const proj = this.projects[this.currentIndex];
    if (!proj || !proj.tabs || !proj.tabs[this.currentTab]) return;

    if (this.currentTab === 'tecnologias') {
      const techData = proj.tabs.tecnologias;
      if (Array.isArray(techData)) {
        this.descEl.innerHTML = `
          <div class="hero-tech-grid">
            ${techData.map(t => `
              <div class="hero-tech-pill">
                <img src="${t.icon}" alt="${t.name}" class="hero-tech-icon" />
                <span>${t.name}</span>
              </div>
            `).join('')}
          </div>
        `;
        return;
      }

      if (typeof techData === 'string') {
        const iconMap = {
          'python': 'assets/icons/python.svg',
          'flask': 'assets/icons/flask.svg',
          'javascript': 'assets/icons/javascript.svg',
          'js': 'assets/icons/javascript.svg',
          'html': 'assets/icons/html5.svg',
          'html5': 'assets/icons/html5.svg',
          'css': 'assets/icons/css3.svg',
          'css3': 'assets/icons/css3.svg',
          'sql': 'assets/icons/sqlite.svg',
          'sqlite': 'assets/icons/sqlite.svg',
          'postgresql': 'assets/icons/postgresql.svg',
          'postgres': 'assets/icons/postgresql.svg',
          'mysql': 'assets/icons/mysql.svg',
          'react': 'assets/icons/react.svg',
          'node': 'assets/icons/nodejs.svg',
          'nodejs': 'assets/icons/nodejs.svg',
          'docker': 'assets/icons/docker.svg',
          'git': 'assets/icons/git.svg'
        };

        const list = techData.split(/[,•\n]+/).map(s => s.trim().replace(/^e\s+/i, '')).filter(Boolean);
        this.descEl.innerHTML = `
          <div class="hero-tech-grid">
            ${list.map(name => {
              const clean = name.toLowerCase().replace(/[^a-z0-9]/g, '');
              let iconPath = 'assets/icons/python.svg';
              for (const [key, path] of Object.entries(iconMap)) {
                if (clean.includes(key) || key.includes(clean)) {
                  iconPath = path;
                  break;
                }
              }
              return `
                <div class="hero-tech-pill">
                  <img src="${iconPath}" alt="${name}" class="hero-tech-icon" />
                  <span>${name}</span>
                </div>
              `;
            }).join('')}
          </div>
        `;
        return;
      }
    }

    if (this.currentTab === 'resultados') {
      const resData = proj.tabs.resultados;
      if (Array.isArray(resData)) {
        this.descEl.innerHTML = `
          <div class="hero-results-grid">
            ${resData.map(r => `
              <div class="hero-result-card">
                <div class="hero-result-icon-box">${r.icon}</div>
                <div class="hero-result-content">
                  <span class="hero-result-title">${r.title}</span>
                  <span class="hero-result-desc">${r.desc}</span>
                </div>
              </div>
            `).join('')}
          </div>
        `;
        return;
      }
    }

    this.descEl.textContent = proj.tabs[this.currentTab];
  }

  render() {
    const proj = this.projects[this.currentIndex];
    if (!proj) return;

    if (this.imgEl) {
      this.imgEl.style.opacity = '0.4';
      setTimeout(() => {
        this.imgEl.src = proj.image;
        this.imgEl.style.opacity = '1';
      }, 150);
    }

    if (this.titleEl) this.titleEl.textContent = proj.title;
    if (this.dateEl) this.dateEl.textContent = proj.date;
    if (this.badgeTopLeftEl) this.badgeTopLeftEl.textContent = proj.badge;
    if (this.stackValEl) this.stackValEl.textContent = proj.stackHighlight;

    if (this.zoomBadgeTextEl) {
      const count = (proj.gallery && proj.gallery.length) || 1;
      this.zoomBadgeTextEl.textContent = `Ver Galeria de Telas (${count})`;
    }

    if (this.liveBadgeEl) {
      if (proj.liveStatus) {
        this.liveBadgeEl.style.display = 'inline-flex';
        if (this.liveBadgeTextEl) this.liveBadgeTextEl.textContent = proj.liveStatus;
        if (proj.liveUrl) this.liveBadgeEl.href = proj.liveUrl;
      } else {
        this.liveBadgeEl.style.display = 'none';
      }
    }

    if (this.githubBtn && proj.codeUrl) {
      this.githubBtn.href = proj.codeUrl;
    }

    this.updateTabContent();
  }
}
