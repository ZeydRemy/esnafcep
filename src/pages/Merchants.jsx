import React, { useState, useEffect } from 'react';
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
        const data = await getMerchants({
          search,
          category: filterCategory,
          district: filterDistrict
        });
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
      <header className="page-header">
        <div className="hero-bg-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="ph-title">Tüm <span className="gradient-text">Esnaflarımız</span></h1>
          <p className="ph-desc">Platformumuza kayıtlı yerel işletmeleri inceleyin ve ihtiyacınız olan ustayı hemen bulun.</p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="filter-sidebar" style={{ marginBottom: '3rem' }}>
            <div className="fsb-top">
              <input
                type="text"
                placeholder="Esnaf adı, marka veya hizmet ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid var(--clr-border)',
                  padding: '0.75rem 1rem',
                  color: '#fff',
                  borderRadius: '8px',
                  width: '100%',
                  maxWidth: '400px',
                }}
              />
            </div>
            <div className="fsb-bottom" style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                style={{
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid var(--clr-border)',
                  padding: '0.75rem 1rem',
                  color: '#fff',
                  borderRadius: '8px',
                }}
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
                value={filterDistrict}
                onChange={(e) => setFilterDistrict(e.target.value)}
                style={{
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid var(--clr-border)',
                  padding: '0.75rem 1rem',
                  color: '#fff',
                  borderRadius: '8px',
                }}
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
                className="btn-search-reset"
                onClick={() => {
                  setSearch('');
                  setFilterCategory('all');
                  setFilterDistrict('all');
                }}
                style={{
                  background: 'var(--clr-surface-2)',
                  border: '1px solid var(--clr-border)',
                  padding: '0.75rem 1.5rem',
                  color: '#fff',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Temizle
              </button>
            </div>
          </div>

          <div className="grid grid-3">
            {merchants.map((merchant, idx) => (
              <MerchantCard
                key={merchant.id || idx}
                avatar={merchant.avatar || '🏬'}
                avatarBg={merchant.avatar_bg || 'tow-bg'}
                name={merchant.name}
                category={merchant.category_slug}
                catTag="urgent-tag"
                isVerified={merchant.is_verified}
                rating={merchant.rating || 0}
                reviewCount={merchant.review_count || 0}
                tags={merchant.tags || ['Siirt Merkez']}
                phone={merchant.phone}
              />
            ))}
          </div>

          {merchants.length === 0 && !loading && (
            <div
              style={{
                textAlignment: 'center',
                padding: '3rem',
                background: 'var(--clr-surface)',
                border: '1px dashed var(--clr-border)',
                borderRadius: '12px',
                marginTop: '2rem',
                textAlign: 'center'
              }}
            >
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>🔍</span>
              <h3 style={{ marginBottom: '0.5rem' }}>Esnaf Bulunamadı</h3>
              <p style={{ color: 'var(--text-muted)' }}>Aradığınız kriterlerde kayıtlı esnaf bulunmamaktadır.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Merchants;
