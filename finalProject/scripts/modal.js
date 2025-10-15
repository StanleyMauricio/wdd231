
export function setupNavAndAccessibility() {
  const menuBtn = document.getElementById('menuButton');
  const nav = document.getElementById('mainNav');

  menuBtn?.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  // close nav on resize > 700px to restore desktop layout
  window.addEventListener('resize', () => {
    if (window.innerWidth > 700) {
      nav.classList.remove('open');
      menuBtn?.setAttribute('aria-expanded', 'false');
    }
  });

  // keyboard accessibility: close modal or nav with Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      nav.classList.remove('open');
      menuBtn?.setAttribute('aria-expanded', 'false');
    }
  });
}

/* Modal factory accesible sencillo */
export function createModal() {
  let modalOverlay, modalDialog, lastFocused;

  function build() {
    modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog';
    modalDialog.setAttribute('role', 'dialog');
    modalDialog.setAttribute('aria-modal', 'true');
    modalDialog.setAttribute('aria-label', 'Diálogo');
    modalOverlay.appendChild(modalDialog);
    document.body.appendChild(modalOverlay);

    // close when clicking fuera del dialogo
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) close();
    });
  }

  function setContent(html) {
    modalDialog.innerHTML = html;
  }

  function open() {
    lastFocused = document.activeElement;
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    // focus first focusable element
    const focusable = modalDialog.querySelectorAll('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();
    trapFocus();
  }

  function close() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
    // remove overlay
    setTimeout(() => {
      modalOverlay.remove();
    }, 200);
  }

  function trapFocus() {
    modalOverlay.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusable = modalDialog.querySelectorAll('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  // build overlay once
  build();

  return { setContent, open, close };
}
