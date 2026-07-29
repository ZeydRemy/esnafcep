// ======================================================
//  SiirtEsnafCep — Service Page JavaScript
// ======================================================

/* ===== FILTER CHIPS ===== */
function initFilters() {
  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.merchant-list-card[data-filter]');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.filter.includes(filter)) {
          card.style.display = '';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = ''; }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateX(-10px)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', initFilters);
