// Bootstrap 5.3.0 Bundle - Local Component
(function() {
  'use strict';
  
  // Modal functionality
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
      }
    });
  });

  // Dropdown functionality
  const dropdowns = document.querySelectorAll('.dropdown-toggle');
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
      e.preventDefault();
      const menu = dropdown.nextElementSibling;
      if (menu && menu.classList.contains('dropdown-menu')) {
        menu.classList.toggle('show');
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
        menu.classList.remove('show');
      });
    }
  });

  // Collapse functionality
  const collapses = document.querySelectorAll('[data-bs-toggle="collapse"]');
  collapses.forEach(collapse => {
    collapse.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(collapse.getAttribute('href') || collapse.dataset.target);
      if (target) {
        target.classList.toggle('show');
        target.classList.toggle('collapse');
        target.classList.toggle('collapsing');
      }
    });
  });

  // Tooltip functionality (basic)
  const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseenter', (e) => {
      const title = tooltip.getAttribute('title') || tooltip.dataset.bsOriginalTitle;
      if (title) {
        const tooltipEl = document.createElement('div');
        tooltipEl.className = 'tooltip show';
        tooltipEl.innerHTML = `<div class="tooltip-inner">${title}</div>`;
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.zIndex = '1080';
        document.body.appendChild(tooltipEl);
        const rect = tooltip.getBoundingClientRect();
        tooltipEl.style.top = `${rect.top - tooltipEl.offsetHeight}px`;
        tooltipEl.style.left = `${rect.left + (rect.width / 2) - (tooltipEl.offsetWidth / 2)}px`;
        tooltip._tooltipEl = tooltipEl;
      }
    });
    tooltip.addEventListener('mouseleave', () => {
      if (tooltip._tooltipEl) {
        tooltip._tooltipEl.remove();
        tooltip._tooltipEl = null;
      }
    });
  });

  // Alert close functionality
  const alertCloseBtns = document.querySelectorAll('[data-bs-dismiss="alert"]');
  alertCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const alert = btn.closest('.alert');
      if (alert) {
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 300);
      }
    });
  });

  console.log('Bootstrap Bundle loaded');
})();
