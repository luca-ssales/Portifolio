/**
 * Modal Controller for Project Details, Gallery & Contact Form
 */
const Modal = {
  backdrop: null,
  card: null,
  currentGallery: null,
  currentGalleryIndex: 0,
  galleryKeyHandler: null,

  init() {
    this.backdrop = document.getElementById('modalBackdrop');
    const closeBtn = document.getElementById('modalCloseBtn');

    closeBtn?.addEventListener('click', () => this.close());
    this.backdrop?.addEventListener('click', (e) => {
      if (e.target === this.backdrop) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  },

  openProject(project) {
    if (!this.backdrop) return;
    const modalCard = this.backdrop.querySelector('.modal-card');
    modalCard?.classList.remove('gallery-mode');

    const hasGallery = project.gallery && project.gallery.length > 0;

    const content = `
      <div class="modal-header-showcase" style="cursor: ${hasGallery ? 'pointer' : 'default'};" id="modalHeaderImgWrap" title="${hasGallery ? 'Clique para ampliar e ver todas as telas' : ''}">
        <div class="modal-header-bg-blur" style="background-image: url('${project.image}');"></div>
        <img src="${project.image}" alt="${project.title}" class="modal-header-img" />
        ${hasGallery ? `
          <div class="modal-gallery-pill-btn">
            🔍 Ver Galeria Completa (${project.gallery.length} fotos)
          </div>
        ` : ''}
      </div>
      <div class="modal-body">
        <div class="modal-badge-row" style="display: flex; flex-wrap: wrap; gap: 6px; align-items: center;">
          <span class="pill-btn active" style="font-size: 11.5px; padding: 4px 12px; margin-right: 4px;">${project.category}</span>
          ${window.getTechBadgesHTML ? window.getTechBadgesHTML(project.tags, 0) : `<span class="pill-btn" style="font-size: 11.5px; padding: 4px 12px; color: var(--primary);">${project.tags}</span>`}
        </div>
        <h2 class="modal-title">${project.title}</h2>
        <p class="modal-desc">${project.desc}</p>
        <div class="modal-actions" style="flex-wrap: wrap;">
          <a href="${project.liveUrl}" target="_blank" class="btn-card-demo" style="text-decoration: none; padding: 10px 20px; flex: 1; text-align: center;">
            Acessar Projeto Online ↗
          </a>
          ${hasGallery ? `
            <button id="btnOpenGalleryModal" class="btn-card-details" style="padding: 10px 16px; font-weight: 700;">
              Galeria (${project.gallery.length})
            </button>
          ` : ''}
          <a href="${project.githubUrl || project.codeUrl}" target="_blank" class="btn-card-details" style="text-decoration: none; padding: 10px 20px;">
            GitHub
          </a>
        </div>
      </div>
    `;

    document.getElementById('modalDynamicContent').innerHTML = content;
    this.backdrop.classList.add('open');

    if (hasGallery) {
      document.getElementById('modalHeaderImgWrap')?.addEventListener('click', () => {
        this.openGallery(project, 0);
      });
      document.getElementById('btnOpenGalleryModal')?.addEventListener('click', () => {
        this.openGallery(project, 0);
      });
    }
  },

  openGallery(project, startIndex = 0) {
    if (!this.backdrop) return;

    const images = (project.gallery && project.gallery.length > 0) 
      ? project.gallery 
      : [project.image || 'assets/images/hero.jpg'];

    this.currentGallery = images;
    this.currentGalleryIndex = Math.min(Math.max(startIndex, 0), images.length - 1);

    const modalCard = this.backdrop.querySelector('.modal-card');
    modalCard?.classList.add('gallery-mode');

    const currentImg = this.currentGallery[this.currentGalleryIndex];
    const total = this.currentGallery.length;
    const currentNum = this.currentGalleryIndex + 1;

    const content = `
      <div class="modal-gallery-wrapper">
        <!-- Top Bar -->
        <div class="gallery-top-bar">
          <div class="gallery-title-info">
            <span class="gallery-project-title">${project.title}</span>
            <span class="gallery-counter-badge" id="galleryCounter">Foto ${currentNum} de ${total}</span>
          </div>
          <div class="gallery-zoom-controls">
            <button class="gallery-zoom-toggle" id="galleryZoomToggle" title="Clique para alternar zoom ou clique direto na foto">
              🔍 <span id="galleryZoomText">Zoom 2x</span>
            </button>
          </div>
        </div>

        <!-- Main Viewing Stage with Interactive Zoom -->
        <div class="gallery-main-stage" id="galleryMainStage" title="Clique para ampliar / arrastar para explorar">
          <div class="gallery-zoom-hint-float" id="galleryZoomHintFloat">🔍 Clique para dar Zoom Dinâmico</div>
          ${total > 1 ? `
            <button class="gallery-nav-btn prev" id="galleryPrevBtn" title="Foto Anterior (←)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          ` : ''}

          <img src="${currentImg}" alt="${project.title} - Foto ${currentNum}" class="gallery-main-img" id="galleryMainImg" />

          ${total > 1 ? `
            <button class="gallery-nav-btn next" id="galleryNextBtn" title="Próxima Foto (→)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          ` : ''}
        </div>

        <!-- Bottom Strip (Thumbs + Actions) -->
        <div class="gallery-bottom-strip">
          <div class="gallery-thumbs-row" id="galleryThumbsRow">
            ${this.currentGallery.map((imgSrc, idx) => `
              <div class="gallery-thumb-item ${idx === this.currentGalleryIndex ? 'active' : ''}" data-thumb-idx="${idx}">
                <img src="${imgSrc}" alt="Thumbnail ${idx + 1}" loading="lazy" />
              </div>
            `).join('')}
          </div>

          <div class="gallery-actions">
            ${project.liveUrl ? `
              <a href="${project.liveUrl}" target="_blank" class="btn-card-demo" style="text-decoration: none; padding: 8px 16px; font-size: 12.5px;">
                Abrir Demo ↗
              </a>
            ` : ''}
            ${(project.codeUrl || project.githubUrl) ? `
              <a href="${project.codeUrl || project.githubUrl}" target="_blank" class="btn-card-details" style="text-decoration: none; padding: 8px 16px; font-size: 12.5px; background: rgba(255,255,255,0.08); color: #fff; border-color: rgba(255,255,255,0.2);">
                GitHub
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    document.getElementById('modalDynamicContent').innerHTML = content;
    this.backdrop.classList.add('open');

    // Pan-Zoom Controller
    let isZoomed = false;
    const stageEl = document.getElementById('galleryMainStage');
    const mainImg = document.getElementById('galleryMainImg');
    const zoomToggleBtn = document.getElementById('galleryZoomToggle');
    const zoomText = document.getElementById('galleryZoomText');
    const zoomHintFloat = document.getElementById('galleryZoomHintFloat');

    const setZoom = (zoomState, x = 50, y = 50) => {
      isZoomed = zoomState;
      stageEl?.classList.toggle('zoomed', isZoomed);
      zoomToggleBtn?.classList.toggle('zoomed', isZoomed);

      if (zoomText) {
        zoomText.textContent = isZoomed ? 'Reduzir 1x' : 'Zoom 2x';
      }

      if (zoomHintFloat) {
        zoomHintFloat.textContent = isZoomed ? '🔍 Arraste o mouse para explorar' : '🔍 Clique para dar Zoom Dinâmico';
      }

      if (mainImg) {
        if (isZoomed) {
          mainImg.style.transformOrigin = `${x}% ${y}%`;
          mainImg.style.transform = 'scale(2.2)';
        } else {
          mainImg.style.transformOrigin = 'center center';
          mainImg.style.transform = 'scale(1)';
        }
      }
    };

    stageEl?.addEventListener('click', (e) => {
      if (e.target.closest('.gallery-nav-btn') || e.target.closest('button')) return;
      if (!isZoomed) {
        const rect = stageEl.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoom(true, x, y);
      } else {
        setZoom(false);
      }
    });

    zoomToggleBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      setZoom(!isZoomed);
    });

    stageEl?.addEventListener('mousemove', (e) => {
      if (!isZoomed || !mainImg) return;
      const rect = stageEl.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      mainImg.style.transformOrigin = `${x}% ${y}%`;
    });

    // Attach navigation event handlers
    const updateImage = (newIndex) => {
      // Reset zoom on slide change
      if (isZoomed) setZoom(false);

      this.currentGalleryIndex = (newIndex + images.length) % images.length;
      const counter = document.getElementById('galleryCounter');
      const thumbs = document.querySelectorAll('.gallery-thumb-item');

      if (mainImg) {
        mainImg.style.opacity = '0.3';
        setTimeout(() => {
          mainImg.src = this.currentGallery[this.currentGalleryIndex];
          mainImg.style.opacity = '1';
          mainImg.style.transformOrigin = 'center center';
          mainImg.style.transform = 'scale(1)';
        }, 100);
      }

      if (counter) {
        counter.textContent = `Foto ${this.currentGalleryIndex + 1} de ${images.length}`;
      }

      thumbs.forEach((t, i) => {
        t.classList.toggle('active', i === this.currentGalleryIndex);
        if (i === this.currentGalleryIndex) {
          t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
    };

    document.getElementById('galleryPrevBtn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      updateImage(this.currentGalleryIndex - 1);
    });

    document.getElementById('galleryNextBtn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      updateImage(this.currentGalleryIndex + 1);
    });

    document.getElementById('galleryThumbsRow')?.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery-thumb-item');
      if (item) {
        const idx = parseInt(item.getAttribute('data-thumb-idx'), 10);
        if (!isNaN(idx)) updateImage(idx);
      }
    });

    // Keyboard navigation (Arrows)
    if (this.galleryKeyHandler) {
      document.removeEventListener('keydown', this.galleryKeyHandler);
    }

    this.galleryKeyHandler = (e) => {
      if (!this.backdrop.classList.contains('open')) return;
      if (e.key === 'ArrowLeft') {
        updateImage(this.currentGalleryIndex - 1);
      } else if (e.key === 'ArrowRight') {
        updateImage(this.currentGalleryIndex + 1);
      }
    };

    document.addEventListener('keydown', this.galleryKeyHandler);
  },

  openContact(profile) {
    if (!this.backdrop) return;
    const modalCard = this.backdrop.querySelector('.modal-card');
    modalCard?.classList.remove('gallery-mode');

    const content = `
      <div class="modal-body" style="padding: 32px;">
        <h2 class="modal-title">Vamos conversar?</h2>
        <p class="modal-desc">Estou disponível para novas oportunidades, projetos freelance e parcerias inovadoras.</p>
        
        <div style="background: var(--bg-card-subtle); padding: 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-light); margin: 12px 0;">
          <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 4px;">E-mail direto:</div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <strong style="color: var(--primary); font-size: 15px;">${profile.email}</strong>
            <button id="btnCopyEmail" class="btn-secondary-pill" style="font-size: 12px; padding: 6px 12px;">
              Copiar
            </button>
          </div>
        </div>

        <div class="modal-actions" style="margin-top: 10px; gap: 8px; flex-wrap: wrap;">
          <a href="${profile.whatsapp || 'https://wa.me/5511914931921'}" target="_blank" class="btn-card-demo" style="text-decoration: none; padding: 10px 16px; flex: 1; text-align: center; background: #10B981; border-color: #10B981; color: #FFFFFF;">
            WhatsApp ↗
          </a>
          <a href="mailto:${profile.email}" class="btn-card-details" style="text-decoration: none; padding: 10px 16px; flex: 1; text-align: center;">
            Enviar Email ✉
          </a>
          <a href="${profile.linkedin}" target="_blank" class="btn-card-details" style="text-decoration: none; padding: 10px 16px; flex: 1; text-align: center;">
            LinkedIn ↗
          </a>
        </div>
      </div>
    `;

    document.getElementById('modalDynamicContent').innerHTML = content;
    this.backdrop.classList.add('open');

    document.getElementById('btnCopyEmail')?.addEventListener('click', (e) => {
      navigator.clipboard.writeText(profile.email);
      e.target.textContent = 'Copiado! ✓';
      setTimeout(() => {
        e.target.textContent = 'Copiar';
      }, 2000);
    });
  },

  close() {
    if (this.backdrop) {
      this.backdrop.classList.remove('open');
      const modalCard = this.backdrop.querySelector('.modal-card');
      modalCard?.classList.remove('gallery-mode');
      if (this.galleryKeyHandler) {
        document.removeEventListener('keydown', this.galleryKeyHandler);
        this.galleryKeyHandler = null;
      }
    }
  }
};
