import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategories, getMerchants } from '../services/api';
import '../assets/css/service.css';

const ServiceCategory = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [merchants, setMerchants] = useState([]);
  const [filterMode, setFilterMode] = useState('all');
  const [sortMode, setSortMode] = useState('rating');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategoryData() {
      try {
        setLoading(true);
        const categories = await getCategories();
        const foundCategory = categories.find(cat => cat.slug === slug);
        setCategory(foundCategory || null);

        const categoryMerchants = await getMerchants({ category: slug });
        setMerchants(categoryMerchants || []);
      } catch (err) {
        console.error('Kategori detayı çekilirken hata:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCategoryData();
  }, [slug]);

  if (!category && !loading) {
    return (
      <div className="container" style={{ padding: '10rem 2rem', textAlign: 'center' }}>
        <h2>Kategori Bulunamadı</h2>
        <p>Aradığınız hizmet kategorisi platformumuzda bulunmuyor.</p>
        <Link to="/kategoriler" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>Tüm Kategorilere Göz At</Link>
      </div>
    );
  }

  // Filtreleme
  const filteredMerchants = merchants.filter(merchant => {
    if (filterMode === 'verified') return merchant.is_verified;
    if (filterMode === '247') return merchant.is_247;
    return true;
  });

  return (
    <>
      <section className="service-hero">
        <div className="service-hero-bg">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
        </div>
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Ana Sayfa</Link>
            <span>&nbsp;›&nbsp;</span>
            <Link to="/kategoriler">Kategoriler</Link>
            <span>&nbsp;›&nbsp;</span>
            <span className="bc-current">{category?.title || 'Yükleniyor...'}</span>
          </div>
          <div className="service-hero-inner">
            <div 
              className="service-hero-icon-wrap" 
              style={{ 
                background: 'linear-gradient(135deg, #3d2a00, #1a1000)', 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justify: 'center' 
              }}
            >
              <span className="service-hero-icon" style={{ fontSize: '2.5rem' }}>{category?.icon || '📁'}</span>
            </div>
            <div className="service-hero-info">
              <div className={`service-type-tag ${category?.type === 'urgent' ? 'urgent-tag-lg' : 'catalog-badge'}`}>
                {category?.type === 'urgent' ? '⚡ ACİL HİZMET' : '🛍️ KATALOG / VİTRİN'}
              </div>
              <h1 className="service-hero-title">Siirt {category?.title || ''} Durağı & Hizmeti</h1>
              <p className="service-hero-desc">
                Siirt ve ilçelerinde en iyi {(category?.title || '').toLowerCase()} hizmetini sunan yerel esnaflarımız.
              </p>
              <div className="service-hero-meta" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                <div className="shm-item">
                  <span className="shm-icon">⭐</span>
                  <span className="shm-val">0.0</span>
                  <span className="shm-label">Ortalama Puan</span>
                </div>
                <div className="shm-item">
                  <span className="shm-icon">{category?.icon || '📁'}</span>
                  <span className="shm-val">{merchants.length}</span>
                  <span className="shm-label">Aktif Esnaf</span>
                </div>
                <div className="shm-item">
                  <span className="shm-icon">⏱️</span>
                  <span className="shm-val">{category?.type === 'urgent' ? '~15 dk' : 'Aynı Gün'}</span>
                  <span className="shm-label">Ortalama Süre</span>
                </div>
                <div className="shm-item">
                  <span className="shm-icon">✅</span>
                  <span className="shm-val">Onaylı</span>
                  <span className="shm-label">Güvenli Esnaf</span>
                </div>
              </div>
              <div className="service-hero-actions" style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <a href={`tel:08501234567`} className="btn-call-hero" style={{ background: 'var(--clr-orange)', color: '#fff', padding: '1rem 2rem', borderRadius: '8px', fontWeight: 'bold' }}>📞 Hemen Ara — 0850 123 45 67</a>
                <span className="service-note" style={{ color: 'var(--clr-text-2)', fontSize: '0.85rem' }}>Sanal numara korumalı · Kayıt altında</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section service-list-section">
        <div className="container">
          <div className="filter-bar" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--clr-border)', paddingBottom: '1rem', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div className="filter-left" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="filter-label">{filteredMerchants.length} esnaf bulundu</span>
              <div className="filter-chips" style={{ display: 'flex', gap: '0.5rem' }}>
                <button className={`filter-chip ${filterMode === 'all' ? 'active' : ''}`} onClick={() => setFilterMode('all')} style={{ background: filterMode === 'all' ? 'var(--clr-orange)' : 'var(--clr-surface)', border: '1px solid var(--clr-border)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer' }}>Tümü</button>
                <button className={`filter-chip ${filterMode === 'verified' ? 'active' : ''}`} onClick={() => setFilterMode('verified')} style={{ background: filterMode === 'verified' ? 'var(--clr-orange)' : 'var(--clr-surface)', border: '1px solid var(--clr-border)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer' }}>✅ Onaylı</button>
                <button className={`filter-chip ${filterMode === '247' ? 'active' : ''}`} onClick={() => setFilterMode('247')} style={{ background: filterMode === '247' ? 'var(--clr-orange)' : 'var(--clr-surface)', border: '1px solid var(--clr-border)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer' }}>🕐 7/24</button>
              </div>
            </div>
            <div className="filter-right" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label className="filter-sort-label" style={{ fontSize: '0.9rem' }}>Sırala:</label>
              <select className="filter-sort" value={sortMode} onChange={(e) => setSortMode(e.target.value)} style={{ padding: '0.5rem', background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', color: '#fff', borderRadius: '6px' }}>
                <option value="rating">En Yüksek Puan</option>
                <option value="fast">En Hızlı</option>
              </select>
            </div>
          </div>

          <div className="merchant-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {filteredMerchants.map(merchant => (
              <div key={merchant.id} className="merchant-list-card" style={{ display: 'flex', background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderRadius: '12px', padding: '1.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div className="mlc-left" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="mlc-avatar taxi-bg" style={{ fontSize: '2rem', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--clr-surface-2)', borderRadius: '50%' }}>{category?.icon || '🏬'}</div>
                </div>
                <div className="mlc-body" style={{ flex: 1, minWidth: '250px' }}>
                  <div className="mlc-top" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h2 className="mlc-name" style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{merchant.name}</h2>
                      <div className="mlc-tags-row" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {merchant.is_verified && <span className="mlc-tag verified" style={{ color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>✅ Onaylı Esnaf</span>}
                        {merchant.is_247 && <span className="mlc-tag" style={{ background: 'var(--clr-surface-2)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>🕐 7/24</span>}
                        <span className="mlc-tag" style={{ background: 'var(--clr-surface-2)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>⏱️ {merchant.delivery_time || 'Aynı Gün'}</span>
                      </div>
                    </div>
                    <div className="mlc-rating-block" style={{ textAlign: 'right' }}>
                      <div className="mlc-stars" style={{ color: 'var(--clr-orange)' }}>★★★★★</div>
                      <div className="mlc-rating-val" style={{ fontWeight: 'bold' }}>{merchant.rating || 0}</div>
                      <div className="mlc-reviews" style={{ fontSize: '0.8rem', color: 'var(--clr-text-2)' }}>{merchant.review_count || 0} değerlendirme</div>
                    </div>
                  </div>
                  <p className="mlc-desc" style={{ color: 'var(--clr-text-2)', fontSize: '0.95rem', margin: '1rem 0' }}>{merchant.description || 'Yerel Siirt işletmesi.'}</p>
                  <div className="mlc-services" style={{ display: 'flex', gap: '0.5rem' }}>
                    {(merchant.tags || ['Siirt']).map((tag, i) => (
                      <span key={i} className="svc-tag" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--clr-border)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem' }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="mlc-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'center' }}>
                  <Link to="/esnaf-profil" className="btn-outline btn-sm" style={{ padding: '0.5rem 1rem', border: '1px solid var(--clr-border)', borderRadius: '6px', color: '#fff', textAlign: 'center' }}>Profil</Link>
                  <a href={`tel:${merchant.phone || '08501234567'}`} className="btn-call-hero-sm" style={{ padding: '0.5rem 1rem', background: 'var(--clr-orange)', borderRadius: '6px', color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>📞 Ara</a>
                </div>
              </div>
            ))}
          </div>
          
          {filteredMerchants.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--clr-surface)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--clr-border)' }}>
              <span style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}>🔍</span>
              <h3>Esnaf Bulunamadı</h3>
              <p style={{ color: 'var(--clr-text-2)' }}>Bu kategoride henüz kayıtlı aktif esnaf bulunmamaktadır.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ServiceCategory;
