import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMerchants } from '../services/api';
import MerchantCard from '../components/ui/MerchantCard';

const Merchants = () => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDistrict, setFilterDistrict] = useState('all');
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMerchants() {
      try {
        setLoading(true);
        const data = await getMerchants({ search, category: filterCategory, district: filterDistrict });
        setMerchants(data || []);
      } catch (err) {
        console.error('Esnaflar çekilirken hata:', err);
      } finally {
        setLoading(false);
      }
    }
    loadMerchants();
  }, [search, filterCategory, filterDistrict]);

  return (
    <>
      {/* ── Sayfa Başlığı ── */}
      <header className="page-header">
        <div className="container">
          <span className="hs-badge" style={{ marginBottom: '0.6rem' }}>Kayıtlı İşletmeler</span>
          <h1 className="ph-title">Tüm Esnaflarımız</h1>
          <p className="ph-desc">Platforma kayıtlı yerel işletmeleri inceleyin, ihtiyacınız olan ustayı hemen bulun.</p>
        </div>
      </header>

      <section className="home-section">
        <div className="container">

          {/* ── Filtre Barı ── */}
          <div className="mpage-filters">
            <div className="mpage-search-wrap">
              <span className="mpage-search-icon">🔍</span>
              <input
                type="text"
                className="mpage-search-input"
                placeholder="Esnaf adı, marka veya hizmet ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="mpage-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">Tüm Kategoriler</option>
              <option value="cekici">Çekici & Kurtarma</option>
              <option value="mobilya">Mobilya</option>
              <option value="cilingir">Çilingir</option>
              <option value="elektrik">Elektrikçi</option>
              <option value="tesisat">Su Tesisatçısı</option>
              <option value="galeri">Oto Galeri</option>
              <option value="kirtasiye">Kırtasiye</option>
            </select>
            <select
              className="mpage-select"
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
            >
              <option value="all">Tüm İlçeler</option>
              <option value="merkez">Merkez</option>
              <option value="kurtalan">Kurtalan</option>
              <option value="baykan">Baykan</option>
              <option value="pervari">Pervari</option>
              <option value="eruh">Eruh</option>
              <option value="sirvan">Şirvan</option>
            </select>
            <button
              className="btn-outline btn-sm"
              onClick={() => { setSearch(''); setFilterCategory('all'); setFilterDistrict('all'); }}
            >
              ✕ Temizle
            </button>
          </div>

          {/* ── Sonuç Sayısı ── */}
          {!loading && (
            <p className="mpage-result-count">
              {merchants.length > 0
                ? `${merchants.length} esnaf listeleniyor`
                : ''}
            </p>
          )}

          {/* ── Esnaf Kartları ── */}
          {loading ? (
            <div className="mpage-loading">
              <div className="mpage-spinner"></div>
              <span>Esnaflar yükleniyor…</span>
            </div>
          ) : merchants.length > 0 ? (
            <div className="grid grid-3">
              {merchants.map((merchant, idx) => (
                <MerchantCard
                  key={merchant.id || idx}
                  avatar={merchant.avatar || '🏬'}
                  name={merchant.name}
                  category={merchant.category_slug}
                  isVerified={merchant.is_verified}
                  rating={merchant.rating || 0}
                  reviewCount={merchant.review_count || 0}
                  tags={merchant.tags || ['Siirt Merkez']}
                  phone={merchant.phone}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-icon">🔍</span>
              <h3>Esnaf Bulunamadı</h3>
              <p>Aradığınız kriterlerde kayıtlı esnaf bulunmamaktadır.</p>
              <button
                className="btn-primary btn-sm"
                style={{ marginTop: '1rem' }}
                onClick={() => { setSearch(''); setFilterCategory('all'); setFilterDistrict('all'); }}
              >
                Filtreleri Temizle
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Merchants;
