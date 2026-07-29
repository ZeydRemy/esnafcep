// ======================================================
//  SiirtEsnafCep — Categories Page JavaScript
// ======================================================

function filterCategories() {
  const query = document.getElementById('catSearchInput').value.toLowerCase().trim();
  const typeFilter = document.getElementById('filterType').value;
  const districtFilter = document.getElementById('filterDistrict').value;
  
  const cards = document.querySelectorAll('.cat-card-new');
  let visibleUrgent = 0;
  let visibleCatalog = 0;

  cards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const tags = card.dataset.tags ? card.dataset.tags.toLowerCase() : "";
    const type = card.dataset.type; // urgent or catalog
    const districts = card.dataset.districts ? card.dataset.districts.split(" ") : [];

    // Query match (checks title or tags)
    const matchesQuery = !query || title.includes(query) || tags.includes(query);
    
    // Type match
    let matchesType = false;
    if (typeFilter === 'all') {
      matchesType = true;
    } else if (typeFilter === 'urgent' || typeFilter === 'catalog') {
      matchesType = (type === typeFilter);
    } else {
      const href = card.getAttribute('href') || '';
      matchesType = href.includes(typeFilter);
    }
    
    // District match
    const matchesDistrict = (districtFilter === 'all') || districts.includes(districtFilter);

    if (matchesQuery && matchesType && matchesDistrict) {
      card.style.display = 'flex';
      if (type === 'urgent') visibleUrgent++;
      if (type === 'catalog') visibleCatalog++;
    } else {
      card.style.display = 'none';
    }
  });

  // Group headers visibility
  const urgentHeader = document.getElementById('urgentGroupHeader');
  const catalogHeader = document.getElementById('catalogGroupHeader');

  if (urgentHeader) {
    urgentHeader.style.display = (visibleUrgent > 0) ? 'block' : 'none';
  }
  if (catalogHeader) {
    catalogHeader.style.display = (visibleCatalog > 0) ? 'block' : 'none';
  }

  // No results message
  const noResults = document.getElementById('noResultsMessage');
  if (noResults) {
    noResults.style.display = (visibleUrgent === 0 && visibleCatalog === 0) ? 'block' : 'none';
  }
}

function resetFilters() {
  document.getElementById('catSearchInput').value = '';
  document.getElementById('filterType').value = 'all';
  document.getElementById('filterDistrict').value = 'all';
  filterCategories();
}

// Bind search input typing
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('catSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', filterCategories);
  }
});
