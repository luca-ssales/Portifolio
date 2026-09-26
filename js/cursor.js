/**
 * High-End Spotlight Aura & Magnetic Glass Cursor
 * Architecture:
 * 1. Glow Spotlight / Ambient Cursor Aura (Spotlight Radial Glow)
 * 2. Custom Magnetic Dot / Glass Ring (Backdrop-filter + Magnetic Physics)
 * 3. Lerp Physics Engine (Damped 60/120 FPS Linear Interpolation)
 */
(function() {
  // Disable on touch devices
  const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
  };

  if (isTouchDevice()) return;

  function initCursorEngine() {
    // 1. Create DOM Elements
    const spotlightEl = document.createElement('div');
    spotlightEl.className = 'cursor-spotlight-aura';
    spotlightEl.setAttribute('aria-hidden', 'true');

    const magneticRingEl = document.createElement('div');
    magneticRingEl.className = 'cursor-magnetic-ring';
    magneticRingEl.setAttribute('aria-hidden', 'true');

    const precisionDotEl = document.createElement('div');
    precisionDotEl.className = 'cursor-precision-dot';
    precisionDotEl.setAttribute('aria-hidden', 'true');

    document.body.appendChild(spotlightEl);
    document.body.appendChild(magneticRingEl);
    document.body.appendChild(precisionDotEl);

    // 2. Physics & Coordinate States
    let mouseX = -500;
    let mouseY = -500;

    // Spotlight coordinates (Liquid ambient trail)
    let spotX = -500;
    let spotY = -500;

    // Ring coordinates (Magnetic & responsive)
    let ringX = -500;
    let ringY = -500;

    // Precision Dot coordinates
    let dotX = -500;
    let dotY = -500;

    // Magnetic target coordinates
    let targetMagneticX = null;
    let targetMagneticY = null;
    let magneticTargetEl = null;

    let isVisible = false;
    let isHovering = false;
    let isClicking = false;

    // 3. Mouse Movement Tracking
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        spotlightEl.classList.add('active');
        magneticRingEl.classList.add('active');
        precisionDotEl.classList.add('active');

        spotX = ringX = dotX = mouseX;
        spotY = ringY = dotY = mouseY;
      }

      // If hovering over magnetic element, calculate magnetic pull
      if (magneticTargetEl) {
        const rect = magneticTargetEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Magnetic attraction pull towards element center
        const pullFactor = 0.35;
        targetMagneticX = mouseX + (centerX - mouseX) * pullFactor;
        targetMagneticY = mouseY + (centerY - mouseY) * pullFactor;
      } else {
        targetMagneticX = null;
        targetMagneticY = null;
      }
    });

    // 4. Mouse Actions (Click & Screen boundary)
    window.addEventListener('mousedown', () => {
      isClicking = true;
      magneticRingEl.classList.add('clicking');
      precisionDotEl.classList.add('clicking');
      spotlightEl.classList.add('clicking');
    });

    window.addEventListener('mouseup', () => {
      isClicking = false;
      magneticRingEl.classList.remove('clicking');
      precisionDotEl.classList.remove('clicking');
      spotlightEl.classList.remove('clicking');
    });

    document.addEventListener('mouseleave', () => {
      isVisible = false;
      spotlightEl.classList.remove('active');
      magneticRingEl.classList.remove('active');
      precisionDotEl.classList.remove('active');
    });

    document.addEventListener('mouseenter', () => {
      isVisible = true;
      spotlightEl.classList.add('active');
      magneticRingEl.classList.add('active');
      precisionDotEl.classList.add('active');
    });

    // 5. Interactive Magnetic Selectors
    const interactiveSelectors = 'a, button, input, textarea, select, label, .project-card, .dock-item, .tech-badge-item, .hero-media-box, .hero-preview-box, .gallery-nav-btn, .gallery-thumb-item, .btn-hero-primary, .btn-secondary-pill, .btn-card-details, .btn-card-demo, .filter-chip, .history-item, .dock-btn-add, .card-icon-circle, .github-card-link, .modal-close-btn, .hero-live-badge';

    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest(interactiveSelectors);
      if (target) {
        isHovering = true;
        magneticTargetEl = target;
        magneticRingEl.classList.add('hovering');
        precisionDotEl.classList.add('hovering');
        spotlightEl.classList.add('hovering');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest(interactiveSelectors);
      if (target) {
        isHovering = false;
        magneticTargetEl = null;
        targetMagneticX = null;
        targetMagneticY = null;
        magneticRingEl.classList.remove('hovering');
        precisionDotEl.classList.remove('hovering');
        spotlightEl.classList.remove('hovering');
      }
    });

    // 6. Lerp Physics Engine (Linear Interpolation with Damping)
    function renderLoop() {
      // Spotlight Physics: smooth, liquid trailing aura (ease: 0.075)
      const spotEase = 0.075;
      spotX += (mouseX - spotX) * spotEase;
      spotY += (mouseY - spotY) * spotEase;
      spotlightEl.style.transform = `translate3d(${spotX}px, ${spotY}px, 0) translate(-50%, -50%)`;

      // Magnetic Ring Physics: smooth responsive follow with magnetic snapping (ease: 0.16)
      const ringDestX = targetMagneticX !== null ? targetMagneticX : mouseX;
      const ringDestY = targetMagneticY !== null ? targetMagneticY : mouseY;
      const ringEase = 0.16;
      ringX += (ringDestX - ringX) * ringEase;
      ringY += (ringDestY - ringY) * ringEase;
      magneticRingEl.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      // Precision Dot Physics: instantaneous high-precision tracking (ease: 0.5)
      const dotEase = 0.5;
      dotX += (mouseX - dotX) * dotEase;
      dotY += (mouseY - dotY) * dotEase;
      precisionDotEl.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

      requestAnimationFrame(renderLoop);
    }

    requestAnimationFrame(renderLoop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCursorEngine);
  } else {
    initCursorEngine();
  }
})();
