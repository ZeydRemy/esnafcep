import React, { useState, useEffect } from 'react';
import { getAds } from '../services/api';
import AdCard from '../components/ui/AdCard';

const Ads = () => {
  const [search, setSearch]               = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDistrict, setFilterDistrict] = useState('all');
  const [minPrice, setMinPrice]           = useState('');
  const [maxPrice, setMaxPrice]           = useState('');
  const [ads, setAds]                     = useState([]);
  const [loading, setLoading]             = useState(true);

  useEffect(() => {
    async function loadAds() {
      try {
        setLoading(true);
        const data = await getAds({ search, category: filterCategory, district: filterDistrict });
        setAds(data || []);
      } catch (err) {
        console.error('İlanlar çekilirken hata:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAds();
  }, [search, filterCategory, filterDistrict]);

  const resetFilters = () => {
    setSearch(''); setFilterCategory('all');
    setFilterDistrict('all'); setMinPrice(''); setMaxPrice('');
  };

  return (
    <>
      {/* ── Sayfa Başlığı ── */}
      <header className="page-header">
        <div className="container">
          <span className="hs-badge" style={{ marginBottom: '0.6rem' }}>Güncel İlanlar</span>
          <h1 className="ph-title">Esnaf İlanları</h1>
          <p className="ph-desc">Galerici, emlakçı ve mağazaların yayınladığı güncel ürün ve hizmet ilanlarını keşfedin.</p>
        </div>
      </header>

      <section className="home-section">
        <div className="container ads-layout">

          {/* ── Sol Sidebar (Filtreler) ── */}
          <aside className="ads-sidebar-panel">
            <h3 className="ads-sidebar-title">Filtrele</h3>

            <div className="ads-filter-group">
              <label className="ads-filter-label">Kelime Arama</label>
              <div className="ads-input-wrap">
                <span>🔍</span>
                <input
                  type="text"
                  className="ads-filter-input"
                  placeholder="İlan başlığı ara…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="ads-filter-group">
              <label className="ads-filter-label">Kategori</label>
              <select className="ads-filter-select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="all">Tüm Kategoriler</option>
                <option value="emlak">Emlak & Gayrimenkul</option>
                <option value="galeri">Oto Galeri & 2. El</option>
                <option value="mobilya">Mobilya</option>
                <option value="beyaz-esya">Beyaz Eşya & Spot</option>
                <option value="telefon">Telefon & Aksesuar</option>
              </select>
            </div>

            <div className="ads-filter-group">
              <label className="ads-filter-label">Fiyat Aralığı (₺)</label>
              <div className="ads-price-row">
                <input
                  type="number"
                  className="ads-filter-input"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <span className="ads-price-sep">—</span>
                <input
                  type="number"
                  className="ads-filter-input"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="ads-filter-group">
              <label className="ads-filter-label">İlçe</label>
              <select className="ads-filter-select" value={filterDistrict} onChange={(e) => setFilterDistrict(e.target.value)}>
                <option value="all">Tüm Siirt</option>
                <option value="merkez">Merkez</option>
                <option value="kurtalan">Kurtalan</option>
                <option value="baykan">Baykan</option>
                <option value="pervari">Pervari</option>
                <option value="eruh">Eruh</option>
              </select>
            </div>

            <button className="btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }} onClick={resetFilters}>
              ✕ Filtreleri Temizle
            </button>
          </aside>

          {/* ── Sağ Alan (İlanlar) ── */}
          <main className="ads-main-panel">
            {!loading && (
              <p className="mpage-result-count">
                {ads.length > 0 ? `${ads.length} ilan listeleniyor` : ''}
              </p>
            )}

            {loading ? (
              <div className="mpage-loading">
                <div className="mpage-spinner"></div>
                <span>İlanlar yükleniyor…</span>
              </div>
            ) : ads.length > 0 ? (
              <div className="grid grid-3">
                {ads.map((ad, idx) => (
                  <AdCard
                    key={ad.id || idx}
                    price={ad.price}
                    image={ad.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80'}
                    title={ad.title}
                    location={ad.district || 'Siirt Merkez'}
                    date="Yeni"
                    merchantAvatar="🏢"
                    merchantName={ad.merchants?.name || 'Onaylı Mağaza'}
                    merchantType={ad.category_slug}
                    isVerified={ad.merchants?.is_verified ?? true}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-icon">🔍</span>
                <h3>İlan Bulunamadı</h3>
                <p>Aktif yayınlanmış ilan bulunmamaktadır.</p>
                <button className="btn-primary btn-sm" style={{ marginTop: '1rem' }} onClick={resetFilters}>
                  Filtreleri Temizle
                </button>
              </div>
            )}
          </main>

        </div>
      </section>
    </>
  );
};

export default Ads;
