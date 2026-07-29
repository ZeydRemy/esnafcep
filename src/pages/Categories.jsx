import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';
import '../assets/css/categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterDistrict, setFilterDistrict] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true);
        const data = await getCategories();
        setCategories(data || []);
      } catch (err) {
        console.error('Kategoriler çekilirken hata:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  const filterItem = (item) => {
    const matchSearch = 
      !search || 
      item.title.toLowerCase().includes(search.toLowerCase()) || 
      (item.tags && item.tags.toLowerCase().includes(search.toLowerCase()));
    
    const matchType = 
      filterType === 'all' || 
      item.type === filterType || 
      item.slug === filterType;
    
    const matchDistrict = 
      filterDistrict === 'all' || 
      (item.districts && item.districts.toLowerCase().includes(filterDistrict.toLowerCase()));

    return matchSearch && matchType && matchDistrict;
  };

  const filteredUrgent = categories.filter(item => item.type === 'urgent').filter(filterItem);
  const filteredCatalog = categories.filter(item => item.type === 'catalog').filter(filterItem);
  const noResults = filteredUrgent.length === 0 && filteredCatalog.length === 0;

  return (
    <>
      <section className="cats-hero">
        <div className="container hero-content-center">
          <h1 className="cats-title">Siirt Esnaf <span className="gradient-text">Kategorileri</span></h1>
          <p className="cats-subtitle">Arama ve filtreleme araçları ile ihtiyacınız olan sektörü ve esnafı saniyeler içinde bulun.</p>

          <div className="filter-search-box">
            <div className="fsb-top">
              <input
                type="text"
                id="catSearchInput"
                placeholder="Kategori veya esnaf adı arayın (Örn: Tesisatçı, Taksi...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="fsb-bottom">
              <select id="filterType" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">Tüm Hizmet Tipleri</option>
                <option value="urgent">🚨 Acil Hizmetler Sadece</option>
                <option value="catalog">🛍️ Katalog Hizmetleri Sadece</option>
              </select>
              <select id="filterDistrict" value={filterDistrict} onChange={(e) => setFilterDistrict(e.target.value)}>
                <option value="all">Siirt (Tüm İlçeler)</option>
                <option value="merkez">Merkez</option>
                <option value="kurtalan">Kurtalan</option>
                <option value="eruh">Eruh</option>
                <option value="baykan">Baykan</option>
                <option value="pervari">Pervari</option>
                <option value="sirvan">Şirvan</option>
              </select>
              <button className="btn-search-reset" onClick={() => { setSearch(''); setFilterType('all'); setFilterDistrict('all'); }}>Temizle</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {filteredUrgent.length > 0 && (
            <>
              <div className="cat-group-header">
                <h2 className="cgh-title">⚡ Acil Hizmetler (URGENT)</h2>
                <span className="cgh-info">Hızlı arama ve sanal numara yönlendirmesi</span>
              </div>
              <div className="grid grid-4">
                {filteredUrgent.map((cat) => (
                  <Link key={cat.slug} to={`/hizmet/${cat.slug}`} className="cat-card-new urgent">
                    <div className="ccn-icon">{cat.icon}</div>
                    <div className="ccn-body">
                      <h3>{cat.title}</h3>
                      <p>{cat.count}</p>
                    </div>
                    <div className="ccn-arrow">→</div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {filteredCatalog.length > 0 && (
            <>
              <div className="cat-group-header" style={{ marginTop: '4rem' }}>
                <h2 className="cgh-title"><img src="/icon.png" className="badge-icon" alt="icon" /> Vitrin & Katalog Hizmetleri</h2>
                <span className="cgh-info">Ürün inceleme, dijital mağaza ve fiyat alma</span>
              </div>
              <div className="grid grid-4">
                {filteredCatalog.map((cat) => (
                  <Link key={cat.slug} to={`/hizmet/${cat.slug}`} className="cat-card-new catalog">
                    <div className="ccn-icon">{cat.icon}</div>
                    <div className="ccn-body">
                      <h3>{cat.title}</h3>
                      <p>{cat.count}</p>
                    </div>
                    <div className="ccn-arrow">→</div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {noResults && (
            <div className="no-results-msg">
              <span>🔍 Aradığınız kriterlere uygun kategori bulunamadı. Lütfen filtreleri sıfırlamayı deneyin.</span>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Categories;
