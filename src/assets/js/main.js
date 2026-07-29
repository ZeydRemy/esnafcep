// ======================================================
//  SiirtEsnafCep — Main JavaScript
// ======================================================

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
}

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  // Close on link click (only if it's not the dropdown toggle)
  navLinks.querySelectorAll('a:not(.dropdown-toggle)').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

/* ===== DROPDOWN MENU MOBILE TOGGLE ===== */
const dropdownToggle = document.getElementById('navDropdownToggle');
if (dropdownToggle) {
  dropdownToggle.addEventListener('click', (e) => {
    e.preventDefault();
    const parentLi = dropdownToggle.parentElement;
    parentLi.classList.toggle('active');
  });
}

/* ===== SEARCH ===== */
const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');

const suggestions = [
  { icon: '🚗', text: 'Çekici & Oto Kurtarma', href: 'hizmet-cekici.html' },
  { icon: '🚕', text: 'Taksi & Özel Ulaşım', href: 'hizmet-taksi.html' },
  { icon: '🔑', text: 'Çilingir & Anahtarcı', href: 'hizmet-cilingir.html' },
  { icon: '🪑', text: 'Mobilya & Koltuk Takımları', href: 'hizmet-mobilya.html' },
  { icon: '📱', text: 'Telefon Tamir & Aksesuar', href: 'hizmet-telefon.html' },
  { icon: '🏠', text: 'Emlak & Gayrimenkul', href: 'hizmet-emlak.html' },
  { icon: '🚘', text: 'Oto Galeri & 2. El Araç', href: 'hizmet-galeri.html' },
  { icon: '🔌', text: 'Elektrik Tesisat Ustası', href: 'hizmet-elektrik.html' },
  { icon: '💧', text: 'Sıhhi Tesisat & Su Tamircisi', href: 'hizmet-tesisat.html' },
  { icon: '🪚', text: 'Marangoz & Özel Mobilya İmalatı', href: 'hizmet-marangoz.html' },
  { icon: '❄️', text: 'Beyaz Eşya & Spot Mağazaları', href: 'hizmet-beyaz-esya.html' },
  { icon: '🪟', text: 'Halı & Perde Dünyası', href: 'hizmet-hali-perde.html' },
  { icon: '🎁', text: 'Çeyiz & Ev Tekstili', href: 'hizmet-ceyiz.html' },
  { icon: '👗', text: 'Gelinlik & Abiye Mağazaları', href: 'hizmet-gelinlik.html' },
  { icon: '🍯', text: 'Yöresel Ürünler & Siirt Battaniyesi', href: 'hizmet-yoresel.html' },
  { icon: '🧱', text: 'Nalbur & Yapı Market Malzemeleri', href: 'hizmet-nalbur.html' },
  { icon: '🖌️', text: 'Boya, Badana & Alçı Ustası', href: 'hizmet-boya.html' },
  { icon: '💐', text: 'Çiçekçi & Hediye Mağazaları', href: 'hizmet-cicekci.html' },
  { icon: '🎉', text: 'Düğün & Nişan Organizasyonu', href: 'hizmet-dugun.html' },
  { icon: '💻', text: 'Bilgisayar & Konsol Teknik Servisi', href: 'hizmet-bilgisayar.html' },
  { icon: '🔥', text: 'Kombi & Klima Tamir Servisi', href: 'hizmet-kombi.html' },
  { icon: '🚚', text: 'Evden Eve Nakliyat & Taşımacılık', href: 'hizmet-nakliyat.html' },
  { icon: '✨', text: 'Ev ve Ofis Temizlik Şirketleri', href: 'hizmet-temizlik.html' },
  { icon: '✂️', text: 'Terzi & Kıyafet Tadilatı', href: 'hizmet-terzi.html' },
  { icon: '👞', text: 'Ayakkabı & Çanta Mağazaları', href: 'hizmet-ayakkabi.html' },
  { icon: '💍', text: 'Kuyumcu & Gümüşçü', href: 'hizmet-kuyumcu.html' },
  { icon: '⌚', text: 'Saat & Optik Mağazaları', href: 'hizmet-saat.html' },
  { icon: '📚', text: 'Kırtasiye & Kitabevleri', href: 'hizmet-kirtasiye.html' },
  { icon: '🖨️', text: 'Matbaa & Dijital Baskı Merkezi', href: 'hizmet-matbaa.html' },
  { icon: '🪧', text: 'Reklam & Tabela Üretimi', href: 'hizmet-reklam.html' },
  { icon: '🧽', text: 'Oto Yıkama & Kuaför', href: 'hizmet-oto-yikama.html' },
  { icon: '🛞', text: 'Oto Lastik Satış & Tamir', href: 'hizmet-oto-lastik.html' },
  { icon: '🏗️', text: 'Alçıpan & Asma Tavan Ustası', href: 'hizmet-alcipan.html' },
  { icon: '🪟', text: 'Camcı & Pimapen İmalatı', href: 'hizmet-camci.html' },
  { icon: '☀️', text: 'Güneş Enerjisi Sistemleri', href: 'hizmet-gunes-enerjisi.html' },
  { icon: '⛓️', text: 'Demir Doğrama & Kaynak Ustası', href: 'hizmet-demir-dograma.html' },
  { icon: '🧼', text: 'Halı Yıkama Fabrikaları', href: 'hizmet-hali-yikama.html' },
  { icon: '👔', text: 'Kuru Temizleme & Ütü Evi', href: 'hizmet-kuru-temizleme.html' },
  { icon: '🐾', text: 'Petshop & Evcil Hayvan Malzemeleri', href: 'hizmet-petshop.html' },
  { icon: '🍽️', text: 'Züccaciye & Ev Gereçleri', href: 'hizmet-zuccaciye.html' },
];

function handleSearch() {
  const val = searchInput ? searchInput.value.trim() : '';
  if (!val) return;
  const match = suggestions.find(s => s.text.toLowerCase().includes(val.toLowerCase()));
  if (match) {
    window.location.href = match.href;
  } else {
    alert(`"${val}" için sonuç bulunamadı. Diğer kategorilere bakabilirsiniz.`);
  }
}

if (searchInput && searchSuggestions) {
  searchInput.addEventListener('input', () => {
    const val = searchInput.value.toLowerCase().trim();
    if (!val) {
      searchSuggestions.classList.remove('open');
      searchSuggestions.innerHTML = '';
      return;
    }
    const filtered = suggestions.filter(s => s.text.toLowerCase().includes(val));
    if (filtered.length === 0) {
      searchSuggestions.classList.remove('open');
      return;
    }
    searchSuggestions.innerHTML = filtered.map(s =>
      `<div class="sug-item" onclick="window.location.href='${s.href}'">
        <span>${s.icon}</span>
        <span>${s.text}</span>
       </div>`
    ).join('');
    searchSuggestions.classList.add('open');
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSearch();
    if (e.key === 'Escape') {
      searchSuggestions.classList.remove('open');
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box')) {
      searchSuggestions.classList.remove('open');
    }
  });
}

// Make handleSearch global
window.handleSearch = handleSearch;

/* ===== AOS (Animate On Scroll) — Custom Lightweight ===== */
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, parseInt(delay));
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ===== STAT COUNTER ===== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const target = parseInt(entry.target.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          entry.target.textContent = Math.floor(current).toLocaleString('tr-TR');
          if (current >= target) {
            clearInterval(timer);
            // Add + suffix for some
            if (target >= 100) {
              entry.target.textContent = Math.floor(target).toLocaleString('tr-TR') + '+';
            } else if (target === 98) {
              entry.target.textContent = '98%';
            }
          }
        }, 16);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ===== SMOOTH ANCHOR SCROLL ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ===== MOCKUP BAR ANIMATION ===== */
function initMockupBar() {
  const bar = document.querySelector('.mockup-bar-fill');
  if (!bar) return;
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      bar.style.width = bar.style.width || '0%';
      setTimeout(() => { bar.style.width = '87%'; }, 300);
    }
  }, { threshold: 0.5 });
  observer.observe(bar.parentElement);
}

/* ===== CARD TILT EFFECT ===== */
function initTilt() {
  const cards = document.querySelectorAll('.urgent-card, .merchant-card.featured');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
      card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initCounters();
  initSmoothScroll();
  initMockupBar();
  initTilt();
});
