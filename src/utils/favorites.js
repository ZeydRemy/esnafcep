// Favori Esnaf ve İlan Yönetim Yardımcısı (LocalStorage Depolama)

export const getFavoriteMerchants = () => {
  try {
    return JSON.parse(localStorage.getItem('fav_merchants') || '[]');
  } catch {
    return [];
  }
};

export const isMerchantFavorite = (id) => {
  const list = getFavoriteMerchants();
  return list.some(m => String(m.id) === String(id));
};

export const toggleFavoriteMerchant = (merchant) => {
  const current = getFavoriteMerchants();
  const exists = current.some(m => String(m.id) === String(merchant.id));
  let updated;
  if (exists) {
    updated = current.filter(m => String(m.id) !== String(merchant.id));
  } else {
    updated = [...current, merchant];
  }
  localStorage.setItem('fav_merchants', JSON.stringify(updated));
  return !exists;
};

export const getFavoriteAds = () => {
  try {
    return JSON.parse(localStorage.getItem('fav_ads') || '[]');
  } catch {
    return [];
  }
};

export const isAdFavorite = (id) => {
  const list = getFavoriteAds();
  return list.some(a => String(a.id) === String(id));
};

export const toggleFavoriteAd = (ad) => {
  const current = getFavoriteAds();
  const exists = current.some(a => String(a.id) === String(ad.id));
  let updated;
  if (exists) {
    updated = current.filter(a => String(a.id) !== String(ad.id));
  } else {
    updated = [...current, ad];
  }
  localStorage.setItem('fav_ads', JSON.stringify(updated));
  return !exists;
};
