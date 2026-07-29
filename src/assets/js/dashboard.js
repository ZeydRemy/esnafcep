// ======================================================
//  SiirtEsnafCep — Dashboard JavaScript
// ======================================================

/* ===== SIDEBAR TOGGLE (Mobile) ===== */
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebarToggle');
  const closeBtn = document.getElementById('sidebarClose');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
  }
  if (closeBtn && sidebar) {
    closeBtn.addEventListener('click', () => sidebar.classList.remove('open'));
  }
}

/* ===== PANEL SWITCHING ===== */
function initPanels() {
  const navItems = document.querySelectorAll('.snav-item[data-panel]');
  const panels = document.querySelectorAll('.dash-panel');
  const titleEl = document.getElementById('panelTitle');

  const titles = {
    overview: 'Genel Bakış',
    calls: 'Çağrı Takibi',
    products: 'Ürün / İlan Yönetimi',
    reviews: 'Değerlendirmeler',
    settings: 'Profil Ayarları'
  };

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const panelId = item.dataset.panel;

      // Update sidebar active
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      // Switch panel
      panels.forEach(p => p.classList.remove('active'));
      const target = document.getElementById('panel-' + panelId);
      if (target) {
        target.classList.add('active');
        // Re-trigger AOS
        target.querySelectorAll('[data-aos]').forEach(el => {
          el.classList.remove('aos-animate');
          setTimeout(() => el.classList.add('aos-animate'), 50);
        });
      }

      // Update title
      if (titleEl && titles[panelId]) {
        titleEl.textContent = titles[panelId];
      }

      // Close sidebar on mobile
      const sidebar = document.getElementById('sidebar');
      if (sidebar && window.innerWidth <= 768) {
        sidebar.classList.remove('open');
      }
    });
  });

  // Panel link (e.g., "Tümünü Gör" links)
  document.querySelectorAll('[data-panel-link]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const panelId = link.dataset.panelLink;
      const navItem = document.querySelector(`.snav-item[data-panel="${panelId}"]`);
      if (navItem) navItem.click();
    });
  });
}

/* ===== BAR CHART ANIMATION ===== */
function initBarChart() {
  const bars = document.querySelectorAll('.bar-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const height = target.style.height;
        target.style.height = '0%';
        setTimeout(() => { target.style.height = height; }, 100);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initPanels();
  initBarChart();
});
