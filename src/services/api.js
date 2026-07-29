import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { categoriesData } from '../data/categories';

// Yerel (Supabase yokken) veritabanı simülasyonu
let localMerchants = [];
let localAds = [];
let localReviews = [];

/**
 * 1. GERÇEK İSTATİSTİK SAYILARI (GET)
 * Veritabanından (veya yerel hafızadan) gerçek esnaf, hizmet ve kategori sayılarını hesaplar.
 */
export const getStats = async () => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { count: merchantCount } = await supabase.from('merchants').select('*', { count: 'exact', head: true });
      const { count: adCount } = await supabase.from('ads').select('*', { count: 'exact', head: true });
      const { count: categoryCount } = await supabase.from('categories').select('*', { count: 'exact', head: true });

      return {
        merchantCount: merchantCount || 0,
        completedServices: adCount || 0,
        satisfactionRate: merchantCount > 0 ? 98 : 0,
        categoryCount: categoryCount || categoriesData.length,
      };
    } catch (err) {
      console.error('Supabase getStats error:', err);
    }
  }

  return {
    merchantCount: localMerchants.length,
    completedServices: localAds.length,
    satisfactionRate: localMerchants.length > 0 ? 98 : 0,
    categoryCount: categoriesData.length,
  };
};

/**
 * 2. KATEGORİLER VE İÇERİKLERİ (GET)
 * Her bir kategoride kaç gerçek esnaf ve kaç ilçe olduğunu canlı hesaplar.
 */
export const getCategories = async () => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data: dbCategories, error } = await supabase.from('categories').select('*');
      const { data: dbMerchants } = await supabase.from('merchants').select('category_slug, district');
      
      if (!error && dbCategories && dbCategories.length > 0) {
        return dbCategories.map(cat => {
          const categoryMerchants = (dbMerchants || []).filter(m => m.category_slug === cat.slug);
          const count = categoryMerchants.length;
          const districts = [...new Set(categoryMerchants.map(m => m.district))].length;
          return {
            ...cat,
            count: `${count} Esnaf | ${districts} İlçe`,
            realCount: count
          };
        });
      }
    } catch (err) {
      console.error('Supabase getCategories error:', err);
    }
  }

  // Yerel veri hesaplaması
  return categoriesData.map(cat => {
    const categoryMerchants = localMerchants.filter(m => m.category_slug === cat.slug);
    const count = categoryMerchants.length;
    const districts = [...new Set(categoryMerchants.map(m => m.district))].length;
    return {
      ...cat,
      count: `${count} Esnaf | ${districts > 0 ? districts : 0} İlçe`,
      realCount: count
    };
  });
};

/**
 * 3. ESNAFLAR LİSTESİ VE FİLTRELEME (GET)
 */
export const getMerchants = async (filters = {}) => {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('merchants').select('*');
      if (filters.category && filters.category !== 'all') {
        query = query.eq('category_slug', filters.category);
      }
      if (filters.district && filters.district !== 'all') {
        query = query.eq('district', filters.district);
      }
      if (filters.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }
      const { data, error } = await query;
      if (!error) return data || [];
    } catch (err) {
      console.error('Supabase getMerchants error:', err);
    }
  }

  return localMerchants.filter(m => {
    const matchSearch = !filters.search || m.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchCat = !filters.category || filters.category === 'all' || m.category_slug === filters.category;
    const matchDist = !filters.district || filters.district === 'all' || m.district === filters.district;
    return matchSearch && matchCat && matchDist;
  });
};

/**
 * 4. İLANLAR LİSTESİ VE FİLTRELEME (GET)
 */
export const getAds = async (filters = {}) => {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('ads').select('*, merchants(name, avatar, is_verified)');
      if (filters.category && filters.category !== 'all') {
        query = query.eq('category_slug', filters.category);
      }
      if (filters.district && filters.district !== 'all') {
        query = query.eq('district', filters.district);
      }
      if (filters.search) {
        query = query.ilike('title', `%${filters.search}%`);
      }
      const { data, error } = await query;
      if (!error) return data || [];
    } catch (err) {
      console.error('Supabase getAds error:', err);
    }
  }

  return localAds.filter(ad => {
    const matchSearch = !filters.search || ad.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchCat = !filters.category || filters.category === 'all' || ad.category_slug === filters.category;
    const matchDist = !filters.district || filters.district === 'all' || ad.district === filters.district;
    return matchSearch && matchCat && matchDist;
  });
};

/**
 * 5. YENİ ESNAF KAYDI (POST)
 */
export const createMerchant = async (merchantData) => {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('merchants').insert([merchantData]).select();
    if (error) throw error;
    return data[0];
  }
  
  const newMerchant = {
    id: Date.now(),
    ...merchantData,
    created_at: new Date().toISOString()
  };
  localMerchants.push(newMerchant);
  return newMerchant;
};

/**
 * 6. YENİ İLAN EKLEME (POST)
 */
export const createAd = async (adData) => {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('ads').insert([adData]).select();
    if (error) throw error;
    return data[0];
  }

  const newAd = {
    id: Date.now(),
    ...adData,
    created_at: new Date().toISOString()
  };
  localAds.push(newAd);
  return newAd;
};
