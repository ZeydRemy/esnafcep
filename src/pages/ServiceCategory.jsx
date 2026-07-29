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
      <div className="container" style={{ padding: '8rem 1.5rem', textAlign: 'center' }}>
        <h2>Kategori Bulunamadı</h2>
        <p>Aradığınız hizmet kategorisi platformumuzda bulunmuyor.</p>
        <Link to="/kategoriler" className="btn-primary" style={{ marginTop: '1.25rem' }}>
          Tüm Kategorilere Göz At
        </Link>
      </div>
    );
  }

  // Filtreleme
  const filteredMerchants = merchants.filter(merchant => {
    if (filterMode === 'verified') return merchant.is_verified;
    if (filterMode === '247') return merchant.is_247;
    return true;
  });

  // Sıralama
  const sortedMerchants = [...filteredMerchants].sort((a, b) => {
    if (sortMode === 'rating') return (b.rating || 0) - (a.rating || 0);
    // Hızlı seçeneği için delivery_time varsa sırala yoksa varsayılan
    return 0;
  });

  return (
    <>
      {/* ── Kategori Detay Başlık (Hero) ── */}
      <section className="service-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Ana Sayfa</Link>
            <span>&nbsp;›&nbsp;</span>
            <Link to="/kategoriler">Kategoriler</Link>
            <span>&nbsp;›&nbsp;</span>
            <span className="bc-current">{category?.title || 'Yükleniyor...'}</span>
          </div>

          <div className="service-hero-inner">
            <div className="service-hero-icon-wrap">
              <span className="service-hero-icon">{category?.icon || '📁'}</span>
            </div>

            <div className="service-hero-info">
              <div className="service-type-tag">
                {category?.type === 'urgent' ? (
                  <span className="urgent-tag-lg">⚡ Acil Hizmet</span>
                ) : (
                  <span className="catalog-tag-lg">🛍️ Katalog / Vitrin</span>
                )}
              </div>
              <h1 className="service-hero-title">Siirt {category?.title || ''} Durağı & Hizmeti</h1>
              <p className="service-hero-desc">
                Siirt ve çevre ilçelerinde en güvenilir {(category?.title || '').toLowerCase()} hizmetini sunan yerel esnaflarımız.
              </p>

              <div className="service-hero-meta">
                <div className="shm-item">
                  <span className="shm-icon">⭐</span>
                  <span className="shm-val">{category?.rating || '0.0'}</span>
                  <span className="shm-label">Ortalama Puan</span>
                </div>
                <div className="shm-item">
                  <span className="shm-icon">👤</span>
                  <span className="shm-val">{merchants.length}</span>
                  <span className="shm-label">Aktif Esnaf</span>
                </div>
                <div className="shm-item">
                  <span className="shm-icon">⏱️</span>
                  <span className="shm-val">{category?.type === 'urgent' ? '~15 dk' : 'Aynı Gün'}</span>
                  <span className="shm-label">Ortalama Süre</span>
                </div>
              </div>

              <div className="service-hero-actions">
                <a href={`tel:08501234567`} className="btn-danger btn-lg">
                  📞 Hemen Ara — 0850 123 45 67
                </a>
                <span className="service-note">Sanal numara korumalı · Ücretsiz hat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Esnaf Listesi ── */}
      <section className="service-body">
        <div className="container">

          {/* Filtre Barı */}
          <div className="filter-bar">
            <div className="filter-left">
              <span className="filter-label">{sortedMerchants.length} esnaf listeleniyor</span>
              <div className="filter-chips">
                <button
                  className={`filter-chip ${filterMode === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterMode('all')}
                >
                  Tümü
                </button>
                <button
                  className={`filter-chip ${filterMode === 'verified' ? 'active' : ''}`}
                  onClick={() => setFilterMode('verified')}
                >
                  Onaylı
                </button>
                <button
                  className={`filter-chip ${filterMode === '247' ? 'active' : ''}`}
                  onClick={() => setFilterMode('247')}
                >
                  7/24 Açık
                </button>
              </div>
            </div>
            <div className="filter-right">
              <label className="filter-sort-label">Sırala:</label>
              <select
                className="filter-sort"
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value)}
              >
                <option value="rating">En Yüksek Puan</option>
                <option value="fast">En Hızlı</option>
              </select>
            </div>
          </div>

          {/* Esnaf Kartları */}
          {loading ? (
            <div className="mpage-loading">
              <div className="mpage-spinner"></div>
              <span>Esnaflar yükleniyor…</span>
            </div>
          ) : sortedMerchants.length > 0 ? (
            <div className="merchant-list">
              {sortedMerchants.map(merchant => (
                <div key={merchant.id} className="merchant-list-card">
                  <div className="mlc-left">
                    <div className="mlc-avatar">
                      {category?.icon || '🏬'}
                    </div>
                  </div>
                  <div className="mlc-body">
                    <div className="mlc-top">
                      <div>
                        <h2 className="mlc-name">{merchant.name}</h2>
                        <div className="mlc-tags-row">
                          {merchant.is_verified && (
                            <span className="mlc-tag verified">✓ Onaylı Esnaf</span>
                          )}
                          {merchant.is_247 && <span className="mlc-tag">🕐 7/24</span>}
                          <span className="mlc-tag">⏱️ {merchant.delivery_time || 'Aynı Gün'}</span>
                        </div>
                      </div>
                      <div className="mlc-rating-block">
                        <div className="mlc-stars">
                          {'★'.repeat(Math.round(merchant.rating || 0))}
                          {'☆'.repeat(5 - Math.round(merchant.rating || 0))}
                        </div>
                        <div className="mlc-rating-val">{merchant.rating || 0}</div>
                        <div className="mlc-reviews">{merchant.review_count || 0} değerlendirme</div>
                      </div>
                    </div>
                    <p className="mlc-desc">{merchant.description || 'Yerel Siirt esnafı.'}</p>
                    <div className="mlc-services">
                      {(merchant.tags || ['Siirt']).map((tag, i) => (
                        <span key={i} className="svc-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mlc-actions">
                    <Link to="/esnaf-profil" className="btn-outline btn-sm">Profil</Link>
                    <a href={`tel:${merchant.phone || '08501234567'}`} className="btn-call-hero-sm">
                      📞 Ara
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-icon">🏪</span>
              <h3>Esnaf Bulunamadı</h3>
              <p>Bu kategoride henüz kayıtlı aktif esnaf bulunmamaktadır.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ServiceCategory;
