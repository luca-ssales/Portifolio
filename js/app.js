/**
 * Main Application Orchestrator
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Profile Information & Interactions
  const { profile, projects, skills, history } = typeof PORTFOLIO_DATA !== 'undefined' ? PORTFOLIO_DATA : { profile: {}, projects: [], skills: [], history: [] };

  // Helper para obter dados dinamicamente a partir do que está no HTML
  const getProfileData = () => ({
    name: document.getElementById('profileBannerName')?.textContent.replace(/^Olá, sou\s*/i, '').trim() || profile?.name || 'Desenvolvedor',
    email: profile?.email || 'ssales.luca@gmail.com',
    linkedin: document.getElementById('linkProfileLinkedin')?.href || profile?.linkedin || 'https://www.linkedin.com/in/lucas-sales-236a67375/',
    github: document.getElementById('linkProfileGithub')?.href || profile?.github || 'https://github.com/luca-ssales',
    whatsapp: profile?.whatsapp || 'https://wa.me/5511914931921'
  });

  const btnProfileContact = document.getElementById('btnProfileContact');
  btnProfileContact?.addEventListener('click', () => {
    Modal.openContact(getProfileData());
  });

  // 2. Initialize Modals
  Modal.init();

  // 3. Initialize Hero Carousel
  const heroCarousel = new HeroCarousel(PORTFOLIO_DATA);

  // 4. Function to Render Projects Grid
  const projectsGrid = document.getElementById('projectsGrid');
  const projectCounter = document.getElementById('projectCounter');

  const techIconMap = {
    'react19': { name: 'React 19', icon: 'assets/icons/react.svg' },
    'react': { name: 'React', icon: 'assets/icons/react.svg' },
    'typescript': { name: 'TypeScript', icon: 'assets/icons/typescript.svg' },
    'ts': { name: 'TypeScript', icon: 'assets/icons/typescript.svg' },
    'vite': { name: 'Vite', icon: 'assets/icons/vite.svg' },
    'tailwind4': { name: 'Tailwind CSS 4', icon: 'assets/icons/tailwind.svg' },
    'tailwindcss4': { name: 'Tailwind CSS 4', icon: 'assets/icons/tailwind.svg' },
    'tailwind': { name: 'Tailwind CSS', icon: 'assets/icons/tailwind.svg' },
    'tailwindcss': { name: 'Tailwind CSS', icon: 'assets/icons/tailwind.svg' },
    'node': { name: 'Node.js', icon: 'assets/icons/nodejs.svg' },
    'nodejs': { name: 'Node.js', icon: 'assets/icons/nodejs.svg' },
    'express': { name: 'Express', icon: 'assets/icons/express.svg' },
    'apirest': { name: 'API REST', icon: 'assets/icons/api.svg' },
    'api': { name: 'API REST', icon: 'assets/icons/api.svg' },
    'rest': { name: 'API REST', icon: 'assets/icons/api.svg' },
    'json': { name: 'Arquivos JSON', icon: 'assets/icons/json.svg' },
    'arquivosjson': { name: 'Arquivos JSON', icon: 'assets/icons/json.svg' },
    'lucidereact': { name: 'Lucide React', icon: 'assets/icons/lucide.svg' },
    'lucide': { name: 'Lucide React', icon: 'assets/icons/lucide.svg' },
    'motion': { name: 'Motion', icon: 'assets/icons/motion.svg' },
    'framermotion': { name: 'Motion', icon: 'assets/icons/motion.svg' },
    'python': { name: 'Python', icon: 'assets/icons/python.svg' },
    'flask': { name: 'Flask', icon: 'assets/icons/flask.svg' },
    'javascript': { name: 'JavaScript', icon: 'assets/icons/javascript.svg' },
    'js': { name: 'JavaScript', icon: 'assets/icons/javascript.svg' },
    'html': { name: 'HTML5', icon: 'assets/icons/html5.svg' },
    'html5': { name: 'HTML5', icon: 'assets/icons/html5.svg' },
    'css': { name: 'CSS3', icon: 'assets/icons/css3.svg' },
    'css3': { name: 'CSS3', icon: 'assets/icons/css3.svg' },
    'sql': { name: 'SQL', icon: 'assets/icons/sqlite.svg' },
    'sqlite': { name: 'SQLite', icon: 'assets/icons/sqlite.svg' },
    'postgresql': { name: 'PostgreSQL', icon: 'assets/icons/postgresql.svg' },
    'postgres': { name: 'PostgreSQL', icon: 'assets/icons/postgresql.svg' },
    'mysql': { name: 'MySQL', icon: 'assets/icons/mysql.svg' },
    'docker': { name: 'Docker', icon: 'assets/icons/docker.svg' },
    'git': { name: 'Git', icon: 'assets/icons/git.svg' },
    'threejs': { name: 'Three.js', icon: 'assets/icons/javascript.svg' },
    'figma': { name: 'Figma', icon: 'assets/icons/react.svg' },
    'qrcode': { name: 'QRCode API', icon: 'assets/icons/qrcode.svg' },
    'canvas': { name: 'Canvas API', icon: 'assets/icons/qrcode.svg' },
    'streamlit': { name: 'Streamlit', icon: 'assets/icons/streamlit.svg' },
    'arduino': { name: 'Arduino', icon: 'assets/icons/arduino.svg' },
    'iot': { name: 'IoT', icon: 'assets/icons/iot.svg' },
    'esp32': { name: 'ESP32', icon: 'assets/icons/iot.svg' },
    'c++': { name: 'C++', icon: 'assets/icons/cpp.svg' },
    'cpp': { name: 'C++', icon: 'assets/icons/cpp.svg' },
    'cplusplus': { name: 'C++', icon: 'assets/icons/cpp.svg' },
    'sensorldr': { name: 'Sensor LDR', icon: 'assets/icons/iot.svg' },
    'ldr': { name: 'Sensor LDR', icon: 'assets/icons/iot.svg' },
    'sensor': { name: 'Sensores', icon: 'assets/icons/iot.svg' },
    'displaylcdi2c': { name: 'Display LCD I2C', icon: 'assets/icons/arduino.svg' },
    'displaylcd': { name: 'Display LCD', icon: 'assets/icons/arduino.svg' },
    'lcd': { name: 'Display LCD', icon: 'assets/icons/arduino.svg' },
    'i2c': { name: 'I2C', icon: 'assets/icons/arduino.svg' },
    'eletronica': { name: 'Eletrônica', icon: 'assets/icons/iot.svg' },
    'tinkercad': { name: 'Tinkercad', icon: 'assets/icons/arduino.svg' },
    'automacao': { name: 'Automação', icon: 'assets/icons/iot.svg' },
    'sensordeumidade': { name: 'Sensor de Umidade', icon: 'assets/icons/iot.svg' },
    'umidadedosolo': { name: 'Sensor de Solo', icon: 'assets/icons/iot.svg' },
    'umidade': { name: 'Sensor de Umidade', icon: 'assets/icons/iot.svg' },
    'buzzer': { name: 'Buzzer', icon: 'assets/icons/iot.svg' },
    'solo': { name: 'Sensor de Solo', icon: 'assets/icons/iot.svg' },
    'kanban': { name: 'Kanban', icon: 'assets/icons/javascript.svg' },
    'kanbanflow': { name: 'KanbanFlow', icon: 'assets/icons/javascript.svg' },
    'localstorage': { name: 'LocalStorage', icon: 'assets/icons/json.svg' },
    'draganddrop': { name: 'Drag & Drop', icon: 'assets/icons/motion.svg' }
  };

  function getTechBadgesHTML(tags, maxCount = 0) {
    if (!tags) return '';
    const items = tags.split(/[,•\n]+/).map(s => s.trim().replace(/^e\s+/i, '')).filter(Boolean);
    const sortedKeys = Object.keys(techIconMap).sort((a, b) => b.length - a.length);

    const displayItems = (maxCount > 0 && items.length > maxCount) ? items.slice(0, maxCount) : items;
    const remainingCount = (maxCount > 0 && items.length > maxCount) ? items.length - maxCount : 0;
    const remainingNames = remainingCount > 0 ? items.slice(maxCount).join(', ') : '';

    const badgesHTML = displayItems.map(tag => {
      const cleanWithSymbols = tag.toLowerCase().replace(/[^a-z0-9+#]/g, '').trim();
      const cleanAlphaOnly = tag.toLowerCase().replace(/[^a-z0-9]/g, '').trim();

      let match = techIconMap[cleanWithSymbols] || techIconMap[cleanAlphaOnly] || null;

      if (!match) {
        for (const k of sortedKeys) {
          if (cleanWithSymbols === k || cleanAlphaOnly === k) {
            match = techIconMap[k];
            break;
          }
        }
      }

      if (!match) {
        for (const k of sortedKeys) {
          if (cleanAlphaOnly.length >= 3 && k.length >= 3 && (cleanAlphaOnly.includes(k) || k.includes(cleanAlphaOnly))) {
            match = techIconMap[k];
            break;
          }
        }
      }

      const iconSrc = match ? match.icon : 'assets/icons/html5.svg';
      const label = match ? match.name : tag;
      return `
        <span class="card-tech-pill" title="${label}">
          <img src="${iconSrc}" alt="${label}" class="card-tech-icon" />
          <span>${label}</span>
        </span>
      `;
    }).join('');

    if (remainingCount > 0) {
      return badgesHTML + `
        <span class="card-tech-pill card-tech-more" title="Outras tecnologias: ${remainingNames}">
          +${remainingCount}
        </span>
      `;
    }

    return badgesHTML;
  }

  window.getTechBadgesHTML = getTechBadgesHTML;

  function renderProjects(list) {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = '';

    if (projectCounter) {
      projectCounter.textContent = `(${list.length} itens)`;
    }

    if (list.length === 0) {
      projectsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px; color: var(--text-muted);">
          <p style="font-size: 16px; font-weight: 600;">Nenhum projeto encontrado nesta categoria ou busca.</p>
        </div>
      `;
      return;
    }

    list.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.setAttribute('data-category', item.category);

      card.innerHTML = `
        <div class="card-thumb-wrapper">
          <img src="${item.image}" alt="${item.title}" class="card-thumb" loading="lazy" />
          <img src="${profile.avatar}" alt="${profile.name}" class="card-author-badge" />
        </div>

        <div class="card-content">
          <div class="card-title-row">
            <div class="card-title-header">
              <h3 class="card-project-name">${item.title}</h3>
              <span class="card-category-badge">${item.category}</span>
            </div>
          </div>

          <div class="card-tech-row">
            ${getTechBadgesHTML(item.tags, 5)}
          </div>

          <p class="card-desc-summary" title="${item.desc}">${item.desc}</p>

          <div class="card-actions-row">
            <button class="btn-card-details" data-detail-id="${item.id}">Detalhes</button>
            <button class="btn-card-demo" data-demo-url="${item.liveUrl}">Demo</button>
          </div>
        </div>
      `;

      // Event: Thumbnail Click -> Modal / Gallery
      const thumbWrapper = card.querySelector('.card-thumb-wrapper');
      thumbWrapper?.addEventListener('click', () => {
        if (item.gallery && item.gallery.length > 0) {
          Modal.openGallery(item, 0);
        } else {
          Modal.openProject(item);
        }
      });
      if (thumbWrapper) thumbWrapper.style.cursor = 'pointer';

      // Event: Details Modal
      const detailBtn = card.querySelector(`[data-detail-id="${item.id}"]`);
      detailBtn?.addEventListener('click', () => {
        Modal.openProject(item);
      });

      // Event: Live Demo
      const demoBtn = card.querySelector(`[data-demo-url="${item.liveUrl}"]`);
      demoBtn?.addEventListener('click', () => {
        window.open(item.liveUrl, '_blank');
      });

      projectsGrid.appendChild(card);
    });
  }

  // Initial render (renderiza via JS se o HTML não tiver cards definidos)
  if (projectsGrid && projectsGrid.children.length === 0) {
    renderProjects(projects);
  }

  // 5. Initialize Filter & Search
  const filterController = new ProjectFilter(projects, (filtered) => {
    renderProjects(filtered);
  });

  // 6. Render Skills Widget (apenas se estiver vazio no HTML)
  const skillsContainer = document.getElementById('skillsContainer');
  if (skillsContainer && skills && skillsContainer.children.length === 0) {
    skillsContainer.innerHTML = skills.map(s => `
      <div class="skill-mini-card">
        <div class="skill-mini-avatar">
          <img src="${s.icon}" alt="${s.name}" />
        </div>
        <div class="skill-mini-name">${s.name}</div>
        <div class="skill-mini-tag">${s.tag}</div>
      </div>
    `).join('');
  }

  // 7. Render History Widget (apenas se estiver vazio no HTML)
  const historyContainer = document.getElementById('historyContainer');
  if (historyContainer && history && historyContainer.children.length === 0) {
    historyContainer.innerHTML = history.map(h => `
      <div class="history-item">
        <div class="history-left">
          <div class="history-icon-circle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
          </div>
          <div class="history-info">
            <span class="history-role">${h.role}</span>
            <span class="history-company">${h.company}</span>
          </div>
        </div>
        <span class="history-year">${h.year}</span>
      </div>
    `).join('');
  }

  // 8. Contact Action Buttons
  const contactBtn = document.getElementById('btnContact');
  contactBtn?.addEventListener('click', () => {
    Modal.openContact(getProfileData());
  });

  const downloadCvBtn = document.getElementById('btnDownloadCv');
  downloadCvBtn?.addEventListener('click', () => {
    const currentName = getProfileData().name;
    alert(`Iniciando download do currículo de ${currentName}!`);
  });

  // 9. Navigation & View Switcher (Home Dashboard vs. Exclusive Projects View)
  const appContainer = document.querySelector('.app-container');
  const mainWrapper = document.querySelector('.main-wrapper');
  const dockItems = document.querySelectorAll('.dock-item');
  const btnReturnHome = document.getElementById('btnReturnHome');
  const dockLogo = document.querySelector('.dock-logo');
  const dockAvatarWrapper = document.querySelector('.dock-avatar-wrapper');

  // 10. Skills & Technologies Showcase Controller (Modal with Background Blur on Projects)
  const skillsModal = {
    backdrop: document.getElementById('skillsModalBackdrop'),
    closeBtn: document.getElementById('skillsModalCloseBtn'),
    gridContainer: document.getElementById('skillsGridContainer'),
    searchInput: document.getElementById('skillsSearchInput'),
    filterPills: document.querySelectorAll('.skills-pill-btn'),
    btnGoProjects: document.getElementById('btnSkillsGoProjects'),
    btnContact: document.getElementById('btnSkillsContact'),
    isOpen: false,
    activeCategory: 'all',
    searchQuery: '',
    previousView: 'home',
    skills: [],

    init(skillsList = []) {
      this.skills = skillsList.length ? skillsList : (PORTFOLIO_DATA.skills || []);

      // Atualiza o contador de tecnologias no botão "Todas"
      const countAllEl = document.getElementById('skillsCountAll');
      if (countAllEl) countAllEl.textContent = this.skills.length;

      const footerTextEl = document.getElementById('skillsFooterText');
      if (footerTextEl) footerTextEl.textContent = `${this.skills.length} tecnologias e linguagens dominadas em projetos reais`;

      // Eventos de Fechamento
      this.closeBtn?.addEventListener('click', () => this.close());
      this.backdrop?.addEventListener('click', (e) => {
        if (e.target === this.backdrop) this.close();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) this.close();
      });

      // Filtros por Categoria de Habilidades
      this.filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
          this.filterPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          this.activeCategory = pill.getAttribute('data-skill-category') || 'all';
          this.render();
        });
      });

      // Busca dinâmica em tempo real
      this.searchInput?.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.render();
      });

      // Botão para ir aos projetos a partir do modal
      this.btnGoProjects?.addEventListener('click', () => {
        this.close();
        switchView('projects');
      });

      // Botão de contato a partir do modal
      this.btnContact?.addEventListener('click', () => {
        this.close();
        Modal.openContact(getProfileData());
      });

      this.render();
    },

    open() {
      if (!this.backdrop) return;
      this.isOpen = true;
      this.previousView = appContainer?.classList.contains('view-projects') ? 'projects' : 'home';

      // 1. Aplica o blur intenso nos projetos e dashboard de fundo
      if (mainWrapper) {
        mainWrapper.classList.add('blurred-for-skills');
      }

      // 2. Destaca o ícone de habilidades no dock lateral
      dockItems.forEach(item => {
        if (item.getAttribute('href') === '#skills') {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      // 3. Exibe o modal com animação suave
      this.backdrop.classList.add('open');
      this.backdrop.setAttribute('aria-hidden', 'false');

      setTimeout(() => {
        this.searchInput?.focus();
      }, 250);
    },

    close() {
      if (!this.backdrop || !this.isOpen) return;
      this.isOpen = false;

      // 1. Remove o blur dos projetos
      if (mainWrapper) {
        mainWrapper.classList.remove('blurred-for-skills');
      }

      // 2. Oculta o modal
      this.backdrop.classList.remove('open');
      this.backdrop.setAttribute('aria-hidden', 'true');

      // 3. Restaura o ícone ativo anterior no dock
      dockItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === (this.previousView === 'projects' ? '#projects' : '#home')) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    },

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    render() {
      if (!this.gridContainer) return;

      const filtered = this.skills.filter(skill => {
        const matchesCategory = this.activeCategory === 'all' || skill.category === this.activeCategory;

        const matchesQuery = !this.searchQuery ||
          skill.name.toLowerCase().includes(this.searchQuery) ||
          (skill.highlight && skill.highlight.toLowerCase().includes(this.searchQuery)) ||
          (skill.categoryLabel && skill.categoryLabel.toLowerCase().includes(this.searchQuery)) ||
          (skill.level && skill.level.toLowerCase().includes(this.searchQuery));

        return matchesCategory && matchesQuery;
      });

      if (filtered.length === 0) {
        this.gridContainer.innerHTML = `
          <div class="skills-empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 6px;">Nenhuma tecnologia encontrada</h3>
            <p style="font-size: 13px;">Tente buscar por outro termo ou selecione a categoria "Todas".</p>
          </div>
        `;
        return;
      }

      this.gridContainer.innerHTML = filtered.map(skill => {
        const lvl = (skill.level || '').toLowerCase();
        const levelClass = lvl.includes('avan') 
          ? 'skill-level-advanced' 
          : lvl.includes('inter') 
            ? 'skill-level-intermediate' 
            : 'skill-level-practical';

        const glowColor = skill.color ? skill.color + '26' : 'rgba(37,99,235,0.12)';

        return `
          <div class="skill-card" data-skill-id="${skill.id}">
            <div class="skill-card-top">
              <div class="skill-icon-wrap" style="box-shadow: 0 4px 14px ${glowColor};">
                <img src="${skill.icon}" alt="${skill.name}" class="skill-icon-img" loading="lazy" />
              </div>
              <span class="skill-level-badge ${levelClass}">
                ● ${skill.level}
              </span>
            </div>

            <div class="skill-card-info">
              <div class="skill-card-title-row">
                <h3 class="skill-card-name">${skill.name}</h3>
                <span class="skill-card-category">${skill.categoryLabel}</span>
              </div>
              <p class="skill-card-highlight">${skill.highlight}</p>
            </div>

            <div class="skill-card-footer">
              <span class="skill-projects-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="7" height="7" rx="1.5"/>
                  <rect x="14" y="3" width="7" height="7" rx="1.5"/>
                  <rect x="14" y="14" width="7" height="7" rx="1.5"/>
                  <rect x="3" y="14" width="7" height="7" rx="1.5"/>
                </svg>
                ${skill.projectsCount} ${skill.projectsCount === 1 ? 'projeto' : 'projetos'}
              </span>
              <button type="button" class="skill-action-link" data-filter-name="${skill.name}" title="Ver projetos feitos com ${skill.name}">
                Ver projetos &gt;
              </button>
            </div>
          </div>
        `;
      }).join('');

      // Ação de clique no link "Ver projetos >" de cada card
      this.gridContainer.querySelectorAll('.skill-action-link').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const techName = btn.getAttribute('data-filter-name');
          this.close();
          switchView('projects');
          const searchInput = document.getElementById('searchInput');
          if (searchInput && techName) {
            searchInput.value = techName;
            searchInput.dispatchEvent(new Event('input'));
          }
        });
      });
    }
  };

  // 11. Bio Profile Card Modal Controller (Lucas Sales - Links, Redes & Dados)
  const bioModal = {
    backdrop: document.getElementById('bioModalBackdrop'),
    card: document.getElementById('bioModalCard'),
    closeBtn: document.getElementById('bioModalCloseBtn'),
    btnBioCv: document.getElementById('btnBioCv'),
    btnCopyLink: document.getElementById('btnBioCopyLink'),
    dockAvatar: document.querySelector('.dock-avatar-wrapper'),
    bannerAvatar: document.querySelector('.profile-banner-avatar-wrap'),
    isOpen: false,

    init(portfolioData = {}) {
      const p = portfolioData.profile || PORTFOLIO_DATA.profile || {};

      // Sincroniza links do perfil com os dados de PORTFOLIO_DATA
      if (p.github) {
        const gh = document.getElementById('bioLinkGithub');
        if (gh) gh.href = p.github;
      }
      if (p.linkedin) {
        const li = document.getElementById('bioLinkLinkedin');
        if (li) li.href = p.linkedin;
      }
      if (p.instagram) {
        const ig = document.getElementById('bioLinkInstagram');
        if (ig) ig.href = p.instagram;
      }
      if (p.tiktok) {
        const tt = document.getElementById('bioLinkTiktok');
        if (tt) tt.href = p.tiktok;
      }
      if (p.whatsapp) {
        const wa = document.getElementById('bioLinkWhatsapp');
        if (wa) wa.href = p.whatsapp;
      }
      if (p.email) {
        const em = document.getElementById('bioLinkEmail');
        if (em) em.href = `mailto:${p.email}`;
      }

      // Eventos de Abertura ao Clicar na Foto (Dock Lateral e Banner Principal)
      this.dockAvatar?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.open();
      });

      this.bannerAvatar?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.open();
      });

      // Eventos de Fechamento
      this.closeBtn?.addEventListener('click', () => this.close());
      this.backdrop?.addEventListener('click', (e) => {
        if (e.target === this.backdrop) this.close();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) this.close();
      });

      // Ação de Baixar Currículo pelo Modal de Bio
      this.btnBioCv?.addEventListener('click', () => {
        const currentName = getProfileData().name;
        alert(`Iniciando download do currículo de ${currentName}!`);
      });

      // Ação de Copiar Link do Portfólio com Feedback Visual
      this.btnCopyLink?.addEventListener('click', () => {
        const currentUrl = window.location.href.split('#')[0];
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(currentUrl).then(() => {
            this.showCopyFeedback();
          }).catch(() => {
            this.fallbackCopyText(currentUrl);
          });
        } else {
          this.fallbackCopyText(currentUrl);
        }
      });
    },

    showCopyFeedback() {
      const textEl = document.getElementById('bioCopyText');
      if (textEl) textEl.textContent = 'Link Copiado! ✓';
      this.btnCopyLink?.classList.add('copied');
      setTimeout(() => {
        if (textEl) textEl.textContent = 'Copiar Link do Portfólio';
        this.btnCopyLink?.classList.remove('copied');
      }, 2500);
    },

    fallbackCopyText(text) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        this.showCopyFeedback();
      } catch (err) {
        console.error('Fallback copy error:', err);
      }
      document.body.removeChild(textArea);
    },

    open() {
      if (!this.backdrop) return;
      if (skillsModal.isOpen) {
        skillsModal.close();
      }
      this.isOpen = true;

      // Aplica efeito de blur refinado no portfólio de fundo
      if (mainWrapper) {
        mainWrapper.classList.add('blurred-for-bio');
      }

      this.backdrop.classList.add('open');
      this.backdrop.setAttribute('aria-hidden', 'false');
    },

    close() {
      if (!this.backdrop || !this.isOpen) return;
      this.isOpen = false;

      // Remove blur do portfólio de fundo
      if (mainWrapper) {
        mainWrapper.classList.remove('blurred-for-bio');
      }

      this.backdrop.classList.remove('open');
      this.backdrop.setAttribute('aria-hidden', 'true');
    },

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }
  };

  // Inicializa o modal de habilidades
  skillsModal.init(PORTFOLIO_DATA.skills);

  // Inicializa o modal de bio/perfil
  bioModal.init(PORTFOLIO_DATA);

  function switchView(viewName, updateHash = true) {
    if (skillsModal.isOpen) {
      skillsModal.close();
    }
    if (bioModal.isOpen) {
      bioModal.close();
    }

    if (viewName === 'projects') {
      if (appContainer) appContainer.classList.add('view-projects');
      dockItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === '#projects') {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
      if (updateHash && window.location.hash !== '#projects') {
        history.pushState(null, '', '#projects');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Default: 'home'
      if (appContainer) appContainer.classList.remove('view-projects');
      dockItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === '#home') {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
      if (updateHash && window.location.hash !== '#home' && window.location.hash !== '') {
        history.pushState(null, '', '#home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Click handler for dock items
  dockItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const href = item.getAttribute('href');
      if (href === '#projects') {
        e.preventDefault();
        switchView('projects');
      } else if (href === '#home') {
        e.preventDefault();
        switchView('home');
      } else if (href === '#skills') {
        e.preventDefault();
        skillsModal.toggle();
      } else {
        dockItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      }
    });
  });

  // Return home button in the projects view bar
  btnReturnHome?.addEventListener('click', () => {
    switchView('home');
  });

  // Dock logo click returns to home
  dockLogo?.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('home');
  });

  // Listen to hash changes (browser back/forward navigation)
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#projects') {
      skillsModal.close();
      bioModal.close();
      switchView('projects', false);
    } else if (window.location.hash === '#skills') {
      bioModal.close();
      skillsModal.open();
    } else if (window.location.hash === '#profile' || window.location.hash === '#bio') {
      skillsModal.close();
      bioModal.open();
    } else {
      skillsModal.close();
      bioModal.close();
      switchView('home', false);
    }
  });

  // Check initial hash on page load
  if (window.location.hash === '#projects') {
    switchView('projects', false);
  } else if (window.location.hash === '#skills') {
    skillsModal.open();
  } else if (window.location.hash === '#profile' || window.location.hash === '#bio') {
    bioModal.open();
  }

  // Helper para formatar tempo relativo (ex: "há 2 horas")
  function formatRelativeTime(date) {
    const diffSeconds = Math.floor((new Date() - date) / 1000);
    if (diffSeconds < 60) return 'agora';
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `há ${diffMinutes}m`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `há ${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `há ${diffDays}d`;
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  }

  // 10. Carregar Atividade Real do GitHub via API
  async function loadGitHubActivity() {
    const githubLink = document.getElementById('linkProfileGithub')?.href || profile?.github || '';
    const match = githubLink.match(/github\.com\/([a-zA-Z0-9-_]+)/);
    let username = match && match[1] && match[1].toLowerCase() !== 'github' ? match[1] : (window.GITHUB_USER || profile?.githubUser || 'luca-ssales');

    const profileLinkEl = document.getElementById('githubProfileLink');
    const totalCommitsEl = document.getElementById('githubTotalCommits');
    const heatmapWrapper = document.getElementById('githubHeatmapWrapper');
    const recentCommitsEl = document.getElementById('githubRecentCommits');

    if (!username) {
      if (totalCommitsEl) totalCommitsEl.textContent = 'Aguardando seu usuário do GitHub';
      return;
    }

    if (profileLinkEl) profileLinkEl.href = `https://github.com/${username}`;

    // 1. Puxar Heatmap de Contribuições Reais (Quadradinhos Verdes)
    try {
      const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
      if (res.ok) {
        const data = await res.json();
        const total = data.total?.lastYear || Object.values(data.total || {})[0] || 0;
        if (totalCommitsEl) {
          totalCommitsEl.innerHTML = `<strong>${total.toLocaleString('pt-BR')}</strong> commits no ano`;
        }

        if (heatmapWrapper && data.contributions) {
          // Últimas 18 semanas (~126 dias) para caber perfeitamente no card lateral
          const recentDays = data.contributions.slice(-126);
          heatmapWrapper.innerHTML = `
            <div class="github-squares-grid">
              ${recentDays.map(day => `
                <div class="gh-day-square lvl-${day.level}" 
                     title="${day.date}: ${day.count} contribuição(ões)"></div>
              `).join('')}
            </div>
          `;
        }
      }
    } catch (err) {
      console.warn('Erro ao carregar heatmap do GitHub:', err);
      if (totalCommitsEl) totalCommitsEl.textContent = 'Atividade recente';
    }

    // 2. Puxar Repositórios e Commits Reais via API oficial do GitHub
    try {
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=30`);
      let allCommits = [];

      if (reposRes.ok) {
        const repos = await reposRes.json();
        
        // Sincronizar dados das linguagens com os repositórios reais do GitHub
        if (typeof window.updateMetricsFromGitHub === 'function') {
          window.updateMetricsFromGitHub(repos);
        }

        const activeRepos = Array.isArray(repos) ? repos.filter(r => !r.fork).slice(0, 6) : [];

        // 2.2 Buscar os commits mais recentes de cada repositório em paralelo
        const commitPromises = activeRepos.map(async (repo) => {
          try {
            const cRes = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=5`);
            if (cRes.ok) {
              const commits = await cRes.json();
              if (Array.isArray(commits)) {
                return commits.map(c => ({
                  repoName: repo.name,
                  commitMsg: (c.commit?.message || 'Commit sem mensagem').split('\n')[0].trim(),
                  sha: (c.sha || '').substring(0, 7),
                  date: new Date(c.commit?.author?.date || c.commit?.committer?.date || Date.now()),
                  url: c.html_url || `https://github.com/${username}/${repo.name}/commit/${c.sha}`
                }));
              }
            }
          } catch (e) {
            console.warn(`Erro ao buscar commits de ${repo.name}:`, e);
          }
          return [];
        });

        const repoCommitArrays = await Promise.all(commitPromises);
        allCommits = repoCommitArrays.flat();
      }

      // 2.3 Fallback caso rate limit da API de repositórios ocorra: tentar /events
      if (allCommits.length === 0) {
        const eventsRes = await fetch(`https://api.github.com/users/${username}/events`);
        if (eventsRes.ok) {
          const events = await eventsRes.json();
          for (const evt of events) {
            const repoFullName = evt.repo?.name || '';
            const repoName = repoFullName ? repoFullName.split('/')[1] || repoFullName : 'repositório';
            const evtDate = new Date(evt.created_at);

            if (evt.type === 'PushEvent' && evt.payload?.commits) {
              for (const c of evt.payload.commits) {
                allCommits.push({
                  repoName,
                  commitMsg: (c.message || 'Push no branch').split('\n')[0].trim(),
                  sha: (c.sha || '').substring(0, 7),
                  date: evtDate,
                  url: `https://github.com/${repoFullName}/commit/${c.sha || ''}`
                });
              }
            } else if (evt.type === 'CreateEvent') {
              const refType = evt.payload?.ref_type || 'repositório';
              allCommits.push({
                repoName,
                commitMsg: `Criado ${refType} ${evt.payload?.ref || repoName}`,
                sha: '',
                date: evtDate,
                url: `https://github.com/${repoFullName}`
              });
            }
          }
        }
      }

      // 2.4 Ordenar todos os commits por data decrescente e pegar exatamente até 10
      allCommits.sort((a, b) => b.date - a.date);
      const top10Commits = allCommits.slice(0, 10);

      if (top10Commits.length > 0 && recentCommitsEl) {
        recentCommitsEl.innerHTML = top10Commits.map(item => {
          const timeAgo = formatRelativeTime(item.date);
          return `
            <a href="${item.url}" target="_blank" rel="noopener" class="gh-commit-item" title="${item.commitMsg} (${item.repoName})">
              <div class="gh-commit-left">
                <div class="gh-commit-header-row">
                  <span class="gh-commit-repo">📦 ${item.repoName}</span>
                  ${item.sha ? `<span class="gh-commit-sha">${item.sha}</span>` : ''}
                </div>
                <span class="gh-commit-msg">${item.commitMsg}</span>
              </div>
              <span class="gh-commit-time">${timeAgo}</span>
            </a>
          `;
        }).join('');
      } else if (recentCommitsEl) {
        recentCommitsEl.innerHTML = `<div class="gh-no-commits">Nenhum commit recente encontrado.</div>`;
      }
    } catch (err) {
      console.warn('Erro ao carregar commits do GitHub:', err);
      if (recentCommitsEl) {
        recentCommitsEl.innerHTML = `<div class="gh-no-commits">Não foi possível carregar os commits recentes.</div>`;
      }
    }
  }

  // 11. Widget Interativo de Métricas & Impacto (Troca por Linguagem e Gráfico Dinâmico)
  function initMetricsImpactWidget(profile, projects) {
    const pillsRow = document.getElementById('metricsPillsRow');
    const labelEl = document.getElementById('metricLabel');
    const mainValEl = document.getElementById('metricMainVal');
    const badgeEl = document.getElementById('metricBadgeVal');
    const subtextEl = document.getElementById('metricSubtext');
    const chartStop0 = document.getElementById('chartStop0');
    const chartStop1 = document.getElementById('chartStop1');
    const sparklineArea = document.getElementById('sparklineArea');
    const sparklineLine = document.getElementById('sparklineLine');
    const sparklineCircle = document.getElementById('sparklineCircle');
    const syncStatusEl = document.getElementById('metricsSyncStatus');

    if (!pillsRow) return;

    const allProjectsList = Array.isArray(projects) ? projects : [];

    const getCountFor = (term) => {
      return allProjectsList.filter(p => {
        const str = `${p.tags || ''} ${p.category || ''} ${p.title || ''} ${p.desc || ''}`.toLowerCase();
        return str.includes(term.toLowerCase());
      }).length;
    };

    const countReact = Math.max(getCountFor('react'), 2);
    const countNode = Math.max(getCountFor('node'), 2);
    const countTs = Math.max(getCountFor('typescript'), 2);
    const countJs = Math.max(getCountFor('javascript'), 5);
    const countPy = Math.max(getCountFor('python') + 1, 2);
    const countIot = Math.max(getCountFor('arduino') + getCountFor('iot'), 2);
    const totalCount = allProjectsList.length || 8;

    const metricsMap = {
      react: {
        name: 'React',
        label: 'Projetos em React',
        count: `${countReact} Concluídos`,
        badge: '+99.6% Prod',
        subtext: 'Gerador de Ticket, KanbanFlow • Vite & Tailwind',
        color: '#38BDF8',
        pathLine: 'M0,50 Q40,52 80,36 T140,26 T200,16 T280,10',
        pathArea: 'M0,50 Q40,52 80,36 T140,26 T200,16 T280,10 L280,65 L0,65 Z',
        cx: 200,
        cy: 16
      },
      node: {
        name: 'Node.js',
        label: 'Backend & APIs Node',
        count: `${countNode} Concluídos`,
        badge: '+98.9% API',
        subtext: 'Express REST, endpoints JSON e serviços modulares',
        color: '#EC4899',
        pathLine: 'M0,52 Q45,35 90,40 T150,22 T210,26 T280,12',
        pathArea: 'M0,52 Q45,35 90,40 T150,22 T210,26 T280,12 L280,65 L0,65 Z',
        cx: 210,
        cy: 26
      },
      typescript: {
        name: 'TypeScript',
        label: 'Projetos TypeScript',
        count: `${countTs} Concluídos`,
        badge: '100% Tipado',
        subtext: 'Tipagem estrita, DTOs e arquitetura escalável',
        color: '#3B82F6',
        pathLine: 'M0,56 Q50,52 100,34 T160,24 T215,14 T280,8',
        pathArea: 'M0,56 Q50,52 100,34 T160,24 T215,14 T280,8 L280,65 L0,65 Z',
        cx: 215,
        cy: 14
      },
      javascript: {
        name: 'JavaScript',
        label: 'Projetos JavaScript',
        count: `${countJs} Concluídos`,
        badge: '+99.8% Core',
        subtext: 'KanbanFlow, B3 Vision, Previsão, Robo-QR',
        color: '#EAB308',
        pathLine: 'M0,38 Q40,32 90,26 T150,28 T210,18 T280,12',
        pathArea: 'M0,38 Q40,32 90,26 T150,28 T210,18 T280,12 L280,65 L0,65 Z',
        cx: 210,
        cy: 18
      },
      python: {
        name: 'Python',
        label: 'Aplicações em Python',
        count: `${countPy} Concluídos`,
        badge: 'Flask & Cloud',
        subtext: 'AstroControl (gestão comercial) e Calculadora Cloud',
        color: '#10B981',
        pathLine: 'M0,48 Q40,42 90,30 T150,34 T220,18 T280,14',
        pathArea: 'M0,48 Q40,42 90,30 T150,34 T220,18 T280,14 L280,65 L0,65 Z',
        cx: 220,
        cy: 18
      },
      iot: {
        name: 'IoT & Hardware',
        label: 'Projetos IoT / C++',
        count: `${countIot} Concluídos`,
        badge: 'Arduino Uno',
        subtext: 'Luz Ambiente com LDR e Sensor de Umidade do Solo',
        color: '#06B6D4',
        pathLine: 'M0,54 Q35,58 70,26 T115,48 T165,22 T210,38 T250,16 T280,22',
        pathArea: 'M0,54 Q35,58 70,26 T115,48 T165,22 T210,38 T250,16 T280,22 L280,65 L0,65 Z',
        cx: 250,
        cy: 16
      },
      all: {
        name: 'Todos os Projetos',
        label: 'Total de Projetos',
        count: `${totalCount}+ Concluídos`,
        badge: '+99.4% Taxa',
        subtext: 'Full Stack, APIs, Front-end e Automação IoT',
        color: '#8B5CF6',
        pathLine: 'M0,52 Q40,48 70,30 T140,36 T210,12 T280,20',
        pathArea: 'M0,52 Q40,48 70,30 T140,36 T210,12 T280,20 L280,65 L0,65 Z',
        cx: 210,
        cy: 12
      }
    };

    function applyTech(techKey) {
      const data = metricsMap[techKey] || metricsMap.all;

      // Atualiza pílulas
      const pills = pillsRow.querySelectorAll('.stat-pill');
      pills.forEach(p => {
        if (p.getAttribute('data-tech') === techKey) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });

      // Animação de transição dos textos
      if (mainValEl) mainValEl.classList.add('anim-swap');
      if (badgeEl) badgeEl.classList.add('anim-swap');
      if (subtextEl) subtextEl.classList.add('anim-swap');

      setTimeout(() => {
        if (labelEl) labelEl.textContent = data.label;
        if (mainValEl) mainValEl.textContent = data.count;
        if (badgeEl) {
          badgeEl.textContent = data.badge;
          badgeEl.style.color = data.color;
          badgeEl.style.backgroundColor = `${data.color}1f`;
          badgeEl.style.borderColor = `${data.color}40`;
        }
        if (subtextEl) subtextEl.textContent = data.subtext;

        if (mainValEl) mainValEl.classList.remove('anim-swap');
        if (badgeEl) badgeEl.classList.remove('anim-swap');
        if (subtextEl) subtextEl.classList.remove('anim-swap');
      }, 120);

      // Animação e Morfismo da Curva SVG
      if (chartStop0) {
        chartStop0.setAttribute('stop-color', data.color);
      }
      if (chartStop1) {
        chartStop1.setAttribute('stop-color', data.color);
      }
      if (sparklineArea) {
        sparklineArea.setAttribute('d', data.pathArea);
      }
      if (sparklineLine) {
        sparklineLine.setAttribute('stroke', data.color);
        sparklineLine.setAttribute('d', data.pathLine);
      }
      if (sparklineCircle) {
        sparklineCircle.setAttribute('stroke', data.color);
        sparklineCircle.setAttribute('cx', data.cx);
        sparklineCircle.setAttribute('cy', data.cy);
      }
    }

    // Eventos de clique nas pílulas
    pillsRow.addEventListener('click', (e) => {
      const pill = e.target.closest('.stat-pill');
      if (!pill) return;
      const tech = pill.getAttribute('data-tech');
      if (tech) {
        applyTech(tech);
      }
    });

    // Função de sincronização com dados reais do GitHub
    window.updateMetricsFromGitHub = function(repos) {
      if (!Array.isArray(repos) || repos.length === 0) return;
      if (syncStatusEl) {
        syncStatusEl.textContent = '● GitHub Conectado';
        syncStatusEl.style.color = '#10B981';
      }

      const ghLangs = {};
      repos.forEach(r => {
        const lang = (r.language || '').toLowerCase();
        if (lang) {
          ghLangs[lang] = (ghLangs[lang] || 0) + 1;
        }
      });

      if (ghLangs.javascript && metricsMap.javascript) {
        metricsMap.javascript.count = `${Math.max(ghLangs.javascript, countJs)} Repositórios`;
        metricsMap.javascript.subtext = `${ghLangs.javascript} repositórios públicos com JavaScript no GitHub`;
      }
      if (ghLangs.typescript && metricsMap.typescript) {
        metricsMap.typescript.count = `${Math.max(ghLangs.typescript, countTs)} Repositórios`;
        metricsMap.typescript.subtext = `${ghLangs.typescript} repositórios públicos com TypeScript no GitHub`;
      }
      if (ghLangs.python && metricsMap.python) {
        metricsMap.python.count = `${Math.max(ghLangs.python, countPy)} Repositórios`;
        metricsMap.python.subtext = `${ghLangs.python} repositórios públicos com Python no GitHub`;
      }
      if (ghLangs['c++'] && metricsMap.iot) {
        metricsMap.iot.count = `${Math.max(ghLangs['c++'], countIot)} Repositórios`;
        metricsMap.iot.subtext = `${ghLangs['c++']} repositórios com C++ e automação no GitHub`;
      }
      if (metricsMap.all) {
        metricsMap.all.count = `${Math.max(repos.length, totalCount)}+ Repositórios`;
        metricsMap.all.subtext = `${repos.length} repositórios criados • Full Stack, APIs e IoT`;
      }

      // Reaplicar a linguagem ativa com os dados atualizados
      const activePill = pillsRow.querySelector('.stat-pill.active');
      const activeTech = activePill ? activePill.getAttribute('data-tech') : 'all';
      applyTech(activeTech);
    };

    // Inicializa por padrão em Todos os Projetos (visão macro)
    applyTech('all');
  }

  // Inicializar o widget de métricas
  initMetricsImpactWidget(profile, projects);

  loadGitHubActivity();
});
