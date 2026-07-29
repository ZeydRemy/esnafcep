import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categoriesData } from '../data/categories';
import { getStats, getMerchants, getAds } from '../services/api';
import UrgentCard from '../components/ui/UrgentCard';
import CatalogCard from '../components/ui/CatalogCard';
import AdCard from '../components/ui/AdCard';
import MerchantCard from '../components/ui/MerchantCard';
import AnimatedCounter from '../components/ui/AnimatedCounter';

const Home = () => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mockupBarFill, setMockupBarFill] = useState('0%');

  const [stats, setStats] = useState({ merchantCount: 0, completedServices: 0, satisfactionRate: 0, categoryCount: 0 });
  const [featuredMerchants, setFeaturedMerchants] = useState([]);
  const [recentAds, setRecentAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchContainerRef = useRef(null);
  const mockupRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadLiveData() {
      try {
        setLoading(true);
        const [statsData, merchantsData, adsData] = await Promise.all([
          getStats(),
          getMerchants({ limit: 6 }),
          getAds({ limit: 6 })
        ]);
        if (statsData) setStats(statsData);
        if (merchantsData) setFeaturedMerchants(merchantsData);
        if (adsData) setRecentAds(adsData);
      } catch (err) {
        console.error('Canlı veriler yüklenirken hata:', err);
      } finally {
        setLoading(false);
      }
    }
    loadLiveData();
  }, []);

  useEffect(() => {
    if (!search.trim()) { setSuggestions([]); return; }
    const filtered = categoriesData.filter(cat =>
      cat.title.toLowerCase().includes(search.toLowerCase()) ||
      cat.tags.toLowerCase().includes(search.toLowerCase())
    );
    setSuggestions(filtered);
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setTimeout(() => setMockupBarFill('87%'), 300);
    }, { threshold: 0.5 });
    if (mockupRef.current) observer.observe(mockupRef.current);
    return () => { if (mockupRef.current) observer.unobserve(mockupRef.current); };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    const match = categoriesData.find(cat => cat.title.toLowerCase().includes(search.toLowerCase()));
    if (match) navigate(`/hizmet/${match.slug}`);
    else navigate(`/kategoriler?search=${encodeURIComponent(search)}`);
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero" id="anasayfa">
        <div className="container hero-content">
          <div className="hero-badge animate-fade-up">
            <img src="/icon.png" alt="" className="badge-icon" />
            <span>Siirt'in Dijital Çarşısı</span>
          </div>
          <h1 className="hero-title animate-fade-up delay-1">
            Şehrin Esnafı,<br />
            <span className="gradient-text">Siirtlinin Cebinde!</span>
          </h1>
          <p className="hero-subtitle animate-fade-up delay-2">
            Çekiciden mobilyaya, ihtiyacınız olan tüm hizmetler<br />
            tek tıkla yanınızda. Anında bağlan, güvenle hizmet al.
          </p>

          <div className="search-box animate-fade-up delay-3" ref={searchContainerRef} style={{ position: 'relative' }}>
            <form onSubmit={handleSearchSubmit} className="search-inner">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Çekici, Usta, Taksi... Ne arıyorsunuz?"
                autoComplete="off"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
              />
              <button type="submit" className="btn-search">Ara</button>
            </form>
            {showSuggestions && suggestions.length > 0 && (
              <div className="sug-dropdown">
                {suggestions.map((sug) => (
                  <div key={sug.slug} className="sug-item"
                    onClick={() => { navigate(`/hizmet/${sug.slug}`); setShowSuggestions(false); }}>
                    <span>{sug.icon}</span>
                    <span>{sug.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="quick-cats animate-fade-up delay-4">
            <Link to="/hizmet/cekici" className="quick-cat urgent">🚗 Çekici</Link>
            <Link to="/hizmet/taksi" className="quick-cat urgent">🚕 Taksi</Link>
            <Link to="/hizmet/cilingir" className="quick-cat urgent">🔑 Çilingir</Link>
            <Link to="/hizmet/mobilya" className="quick-cat">🪑 Mobilya</Link>
            <Link to="/hizmet/emlak" className="quick-cat">🏠 Emlak</Link>
            <Link to="/hizmet/telefon" className="quick-cat">📱 Telefon Tamir</Link>
          </div>
        </div>
      </section>

      {/* ── ACİL HİZMETLER ── */}
      <section className="home-section" id="kategoriler">
        <div className="container">
          <div className="home-section-head">
            <div>
              <span className="hs-badge hs-badge--danger">⚡ ACİL HİZMETLER</span>
              <h2 className="hs-title">Tek Tıkla Anında Bağlan</h2>
              <p className="hs-desc">Acil durumlarda esnafı direkt arayın. Gizlilik korumalı, kayıt altında.</p>
            </div>
            <Link to="/kategoriler" className="hs-link">Tüm Kategoriler →</Link>
          </div>
          <div className="grid grid-3">
            <UrgentCard title="Çekici Hizmeti" icon="🚗" desc="Araç arızası, kaza, lastik patlaması — anında kapınızda." rating="0.0" count="0" time="—" link="/hizmet/cekici" phone="08501234567" />
            <UrgentCard title="Taksi Hizmeti" icon="🚕" desc="Siirt içi ve şehirlerarası güvenli ulaşım. 7/24 hizmet." rating="0.0" count="0" time="—" link="/hizmet/taksi" phone="08501234568" />
            <UrgentCard title="Çilingir Hizmeti" icon="🔑" desc="Kapı açma, kilit değiştirme, kasa açma — profesyonel." rating="0.0" count="0" time="—" link="/hizmet/cilingir" phone="08501234569" />
          </div>
        </div>
      </section>

      {/* ── VİTRİN KATEGORİLER ── */}
      <section className="home-section home-section--alt">
        <div className="container">
          <div className="home-section-head">
            <div>
              <span className="hs-badge">VİTRİN & KATALOG</span>
              <h2 className="hs-title">Dijital Pazar Yeriniz</h2>
              <p className="hs-desc">Ürünleri inceleyin, karşılaştırın, en iyi teklifi alın.</p>
            </div>
            <Link to="/kategoriler" className="hs-link">Tümünü Gör ({categoriesData.length}+) →</Link>
          </div>
          <div className="grid grid-4">
            <CatalogCard title="Mobilya & Koltuk"     icon="🪑" count="0" link="/hizmet/mobilya" />
            <CatalogCard title="Telefon Tamir"         icon="📱" count="0" link="/hizmet/telefon" />
            <CatalogCard title="Emlak"                 icon="🏠" count="0" link="/hizmet/emlak" />
            <CatalogCard title="Oto Galeri"            icon="🚘" count="0" link="/hizmet/galeri" />
            <CatalogCard title="Beyaz Eşya"            icon="❄️" count="0" link="/hizmet/beyaz-esya" />
            <CatalogCard title="Halı & Perde"          icon="🪟" count="0" link="/hizmet/hali-perde" />
            <CatalogCard title="Çeyiz & Ev Tekstili"   icon="🎁" count="0" link="/hizmet/ceyiz" />
            <CatalogCard title="Gelinlik & Abiye"      icon="👗" count="0" link="/hizmet/gelinlik" />
          </div>
        </div>
      </section>

      {/* ── SON İLANLAR ── */}
      <section className="home-section">
        <div className="container">
          <div className="home-section-head">
            <div>
              <span className="hs-badge">YENİ EKLENENLER</span>
              <h2 className="hs-title">Vitrin İlanları</h2>
              <p className="hs-desc">Esnaflarımız tarafından son eklenen fırsat ürünleri ve ilanlar.</p>
            </div>
            <Link to="/ilanlar" className="hs-link">Tüm İlanlar →</Link>
          </div>
          {recentAds.length > 0 ? (
            <div className="grid grid-3">
              {recentAds.map((ad, idx) => (
                <AdCard
                  key={ad.id || idx}
                  price={ad.price}
                  image={ad.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80'}
                  title={ad.title}
                  location={ad.district || 'Siirt Merkez'}
                  date="Yeni"
                  merchantAvatar="🏢"
                  merchantName={ad.merchants?.name || 'Onaylı Mağaza'}
                  merchantType={ad.category_slug || 'İlan'}
                  isVerified={ad.merchants?.is_verified ?? true}
                  delay={idx * 50}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-icon">🏷️</span>
              <h3>Henüz Aktif İlan Bulunmamaktadır</h3>
              <p>Veritabanına yeni bir ilan eklendiğinde doğrudan burada görüntülenecektir.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── ESNAFLAR ── */}
      <section className="home-section home-section--alt" id="esnaflar">
        <div className="container">
          <div className="home-section-head">
            <div>
              <span className="hs-badge">⭐ ÖNCÜ ESNAFLAR</span>
              <h2 className="hs-title">Güvenilir & Onaylı Esnaflar</h2>
              <p className="hs-desc">Platform tarafından doğrulanan, müşteri puanlaması yüksek esnaflar.</p>
            </div>
            <Link to="/esnaflar" className="hs-link">Tümünü Gör →</Link>
          </div>
          {featuredMerchants.length > 0 ? (
            <div className="grid grid-3">
              {featuredMerchants.map((merchant, idx) => (
                <MerchantCard
                  key={merchant.id || idx}
                  avatar={merchant.avatar || '🏬'}
                  name={merchant.name}
                  category={merchant.category_slug}
                  isVerified={merchant.is_verified}
                  rating={merchant.rating || 0}
                  reviewCount={merchant.review_count || 0}
                  tags={merchant.tags || ['Siirt Merkez']}
                  phone={merchant.phone || '08501234567'}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-icon">🏪</span>
              <h3>Henüz Kayıtlı Esnaf Bulunmamaktadır</h3>
              <p>İşletmenizi platforma eklemek için hemen kaydolun.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── NASIL ÇALIŞIR ── */}
      <section className="home-section" id="nasil-calisir">
        <div className="container">
          <div className="home-section-head center">
            <div>
              <span className="hs-badge">NASIL ÇALIŞIR?</span>
              <h2 className="hs-title">3 Adımda Hizmet Al</h2>
            </div>
          </div>
          <div className="how-grid">
            <div className="how-step">
              <div className="step-num">01</div>
              <div className="step-icon">🔍</div>
              <h3 className="step-title">Ara veya Kategori Seç</h3>
              <p className="step-desc">İhtiyacınız olan hizmeti arama kutusuna yazın ya da kategoriler arasından seçin.</p>
            </div>
            <div className="how-step">
              <div className="step-num">02</div>
              <div className="step-icon">📋</div>
              <h3 className="step-title">Esnafı İncele</h3>
              <p className="step-desc">Puanları, yorumları ve ürün kataloglarını inceleyerek size en uygun esnafı seçin.</p>
            </div>
            <div className="how-step">
              <div className="step-num">03</div>
              <div className="step-icon">📞</div>
              <h3 className="step-title">Hemen Bağlan</h3>
              <p className="step-desc">"Hemen Ara" butonuyla sanal numara üzerinden güvenle esnafla bağlanın.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── İSTATİSTİKLER ── */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number"><AnimatedCounter target={stats.merchantCount} suffix={stats.merchantCount > 0 ? '+' : ''} /></div>
              <div className="stat-label">Kayıtlı Esnaf</div>
            </div>
            <div className="stat-item">
              <div className="stat-number"><AnimatedCounter target={stats.completedServices} suffix={stats.completedServices > 0 ? '+' : ''} /></div>
              <div className="stat-label">Aktif İlan / Hizmet</div>
            </div>
            <div className="stat-item">
              <div className="stat-number"><AnimatedCounter target={stats.satisfactionRate} suffix="%" /></div>
              <div className="stat-label">Memnuniyet Oranı</div>
            </div>
            <div className="stat-item">
              <div className="stat-number"><AnimatedCounter target={stats.categoryCount} /></div>
              <div className="stat-label">Resmi Kategori</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ESNAF OL ── */}
      <section className="home-section home-section--alt" id="esnaf-ol">
        <div className="container">
          <div className="join-card" ref={mockupRef}>
            <div className="join-left">
              <span className="hs-badge">💼 ESNAF MİSİN?</span>
              <h2 className="join-title">Platforma Katıl,<br />Müşterilerini Artır</h2>
              <ul className="join-features">
                <li>✅ Aylık sabit listeleme ücreti</li>
                <li>✅ Garantili minimum çağrı/görüntülenme</li>
                <li>✅ Dijital katalog ve ilan yönetim paneli</li>
                <li>✅ Çağrı takip ve CRM raporlaması</li>
              </ul>
              <Link to="/esnaf-giris" className="btn-primary btn-lg">Ücretsiz Başvur →</Link>
            </div>
            <div className="join-right">
              <div className="join-mockup">
                <div className="mockup-header">
                  <div className="mockup-dots">
                    <span style={{ background: '#EF4444' }}></span>
                    <span style={{ background: '#F59E0B' }}></span>
                    <span style={{ background: '#22C55E' }}></span>
                  </div>
                  <span>Esnaf Paneli</span>
                </div>
                <div className="mockup-stat">
                  <span className="ms-label">Bu Ay Çağrı</span>
                  <span className="ms-val" style={{ color: 'var(--accent)' }}>0</span>
                </div>
                <div className="mockup-stat">
                  <span className="ms-label">Görüntülenme</span>
                  <span className="ms-val">0</span>
                </div>
                <div className="mockup-stat">
                  <span className="ms-label">Puan</span>
                  <span className="ms-val" style={{ color: 'var(--accent)' }}>0.0 ⭐</span>
                </div>
                <div className="mockup-bar-wrap">
                  <div className="mockup-bar">
                    <div className="mockup-bar-fill" style={{ width: mockupBarFill, transition: 'width 1.2s cubic-bezier(0.1, 0.8, 0.3, 1)' }}></div>
                  </div>
                  <span className="mockup-bar-label">Aylık Hedef: %87</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
