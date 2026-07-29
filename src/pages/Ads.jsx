import React, { useState, useEffect } from 'react';
import { getAds } from '../services/api';
import AdCard from '../components/ui/AdCard';

const Ads = () => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDistrict, setFilterDistrict] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAds() {
      try {
        setLoading(true);
        const data = await getAds({
          search,
          category: filterCategory,
          district: filterDistrict
        });
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
    setSearch('');
    setFilterCategory('all');
    setFilterDistrict('all');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <>
      <header className="page-header" style={{ padding: '6rem 0 3rem' }}>
        <div className="hero-bg-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="ph-title">Esnaf <span className="gradient-text">İlanları</span></h1>
          <p className="ph-desc">Platformumuzdaki galerici, emlakçı ve mağazaların yayınladığı güncel ürün ve hizmet ilanlarını keşfedin.</p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: '1rem', paddingBottom: '5rem' }}>
        <div className="container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          
          <aside className="ads-sidebar" style={{ flex: '1', minWidth: '250px', maxWidth: '300px', background: 'var(--clr-surface)', backdropFilter: 'blur(16px)', border: '1px solid var(--clr-border)', borderTop: '1px solid var(--clr-border-highlight)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', position: 'sticky', top: '100px' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', color: '#fff', borderBottom: '1px dashed var(--clr-border)', paddingBottom: '1rem' }}>Gelişmiş Arama</h3>
            
            <div className="filter-group">
              <label>Kelime Arama</label>
              <input
                type="text"
                className="filter-input"
                placeholder="İlan başlığı ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="filter-group" style={{ marginTop: '1rem' }}>
              <label>Kategori Seçin</label>
              <select
                className="filter-input"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--clr-border)', color: '#fff', borderRadius: '6px' }}
              >
                <option value="all">Tüm Kategoriler</option>
                <option value="emlak">Emlak & Gayrimenkul</option>
                <option value="galeri">Oto Galeri & 2. El</option>
                <option value="mobilya">Mobilya</option>
                <option value="beyaz-esya">Beyaz Eşya & Spot</option>
                <option value="telefon">Telefon & Aksesuar</option>
              </select>
            </div>

            <div className="filter-group" style={{ marginTop: '1rem' }}>
              <label>Fiyat Aralığı (TL)</label>
              <div className="price-inputs" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="number"
                  className="filter-input"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  style={{ width: '45%', padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--clr-border)', color: '#fff', borderRadius: '6px' }}
                />
                <span style={{ color: 'var(--clr-text-2)' }}>-</span>
                <input
                  type="number"
                  className="filter-input"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  style={{ width: '45%', padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--clr-border)', color: '#fff', borderRadius: '6px' }}
                />
              </div>
            </div>

            <div className="filter-group" style={{ marginTop: '1rem' }}>
              <label>İlçe</label>
              <select
                className="filter-input"
                value={filterDistrict}
                onChange={(e) => setFilterDistrict(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--clr-border)', color: '#fff', borderRadius: '6px' }}
              >
                <option value="all">Tüm Siirt</option>
                <option value="merkez">Merkez</option>
                <option value="kurtalan">Kurtalan</option>
                <option value="baykan">Baykan</option>
              </select>
            </div>

            <button className="btn-primary" onClick={resetFilters} style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem', padding: '0.75rem', borderRadius: '8px' }}>Filtreleri Temizle</button>
          </aside>

          <main className="ads-main" style={{ flex: '3', minWidth: '300px' }}>
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

            {ads.length === 0 && !loading && (
              <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--clr-surface)', borderRadius: 'var(--radius-lg)', marginTop: '1rem', border: '1px dashed var(--clr-border)' }}>
                <span style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}>🔍</span>
                <h3>İlan Bulunamadı</h3>
                <p style={{ color: 'var(--clr-text-2)' }}>Aktif yayınlanmış ilan bulunmamaktadır.</p>
              </div>
            )}
          </main>

        </div>
      </section>
    </>
  );
};

export default Ads;
