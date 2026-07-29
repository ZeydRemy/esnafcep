// ======================================================
//  SiirtEsnafCep — Profile Page JavaScript
// ======================================================

/* ===== PROFILE TABS ===== */
function initProfileTabs() {
  const tabs = document.querySelectorAll('.ptab');
  const contents = document.querySelectorAll('.ptab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      // Activate clicked
      tab.classList.add('active');
      const target = document.getElementById('tab-' + tab.dataset.tab);
      if (target) {
        target.classList.add('active');
        // Re-trigger AOS for newly visible elements
        target.querySelectorAll('[data-aos]').forEach(el => {
          el.classList.remove('aos-animate');
          setTimeout(() => el.classList.add('aos-animate'), 50);
        });
      }
    });
  });
}

function initReviewForm() {
  const form = document.getElementById('formSubmitReview');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = 'Gönderiliyor...';
      btn.style.opacity = '0.7';
      btn.disabled = true;

      setTimeout(() => {
        alert('Yorumunuz başarıyla gönderildi ve yönetici onayına sunuldu. Teşekkür ederiz!');
        btn.textContent = originalText;
        btn.style.opacity = '1';
        btn.disabled = false;
        form.reset();
      }, 1000);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initProfileTabs();
  initReviewForm();
});
