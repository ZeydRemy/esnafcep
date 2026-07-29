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

  // Gerçek Veri Durumları (API / Supabase)
  const [stats, setStats] = useState({ merchantCount: 0, completedServices: 0, satisfactionRate: 0, categoryCount: 0 });
  const [featuredMerchants, setFeaturedMerchants] = useState([]);
  const [recentAds, setRecentAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchContainerRef = useRef(null);
  const mockupRef = useRef(null);
  const navigate = useNavigate();

  // API'den gerçek canlı verileri yükleme
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

  // Arama önerileri filtreleme
  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }
    const filtered = categoriesData.filter(cat => 
      cat.title.toLowerCase().includes(search.toLowerCase()) ||
      cat.tags.toLowerCase().includes(search.toLowerCase())
    );
    setSuggestions(filtered);
  }, [search]);

  // Arama kutusu dışına tıklandığında önerileri gizleme
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Esnaf Paneli Mockup Bar Animasyonu (Scroll tetiklemeli)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          setMockupBarFill('87%');
        }, 300);
      }
    }, { threshold: 0.5 });

    if (mockupRef.current) {
      observer.observe(mockupRef.current);
    }

    return () => {
      if (mockupRef.current) {
        observer.unobserve(mockupRef.current);
      }
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    
    const match = categoriesData.find(cat => 
      cat.title.toLowerCase().includes(search.toLowerCase())
    );
    
    if (match) {
      navigate(`/hizmet/${match.slug}`);
    } else {
      navigate(`/kategoriler?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero" id="anasayfa">
        <div className="hero-bg-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        <div className="container hero-content">
          <div className="hero-badge animate-fade-up">
            <img src="/icon.png" alt="" className="badge-icon" /> <span>Siirt'in Dijital Çarşısı</span>
          </div>
          <h1 className="hero-title animate-fade-up delay-1">
            Şehrin Esnafı,<br />
            <span className="gradient-text">Siirtlinin Cebinde!</span>
          </h1>
          <p className="hero-subtitle animate-fade-up delay-2">
            Çekiciden mobilyaya, ihtiyacınız olan tüm hizmetler<br />
            tek tıkla yanınızda. Anında bağlan, güvenle hizmet al.
          </p>

          {/* Dinamik Arama Motoru */}
          <div 
            className="search-box animate-fade-up delay-3" 
            ref={searchContainerRef}
            style={{ position: 'relative' }}
          >
            <form onSubmit={handleSearchSubmit} className="search-inner">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Çekici, Usta, Taksi... Ne arıyorsunuz?" 
                autoComplete="off" 
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
              />
              <button type="submit" className="btn-search">Ara</button>
            </form>
            
            {showSuggestions && suggestions.length > 0 && (
              <div 
                className="search-suggestions open" 
                style={{ 
                  position: 'absolute', 
                  top: '100%', 
                  left: 0, 
                  width: '100%', 
                  background: 'var(--clr-surface)', 
                  border: '1px solid var(--clr-border)',
                  borderRadius: '12px',
                  marginTop: '0.5rem',
                  zIndex: 10,
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}
              >
                {suggestions.map((sug) => (
                  <div 
                    key={sug.slug} 
                    className="sug-item" 
                    onClick={() => {
                      navigate(`/hizmet/${sug.slug}`);
                      setShowSuggestions(false);
                    }}
                    style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                  >
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
            <Link to="/hizmet/mobilya" className="quick-cat catalog">🪑 Mobilya</Link>
            <Link to="/hizmet/emlak" className="quick-cat catalog">🏠 Emlak</Link>
            <Link to="/hizmet/telefon" className="quick-cat catalog">📱 Telefon Tamir</Link>
          </div>
        </div>
      </section>

      {/* ===== ACİL KATEGORİLER ===== */}
      <section className="section urgent-section" id="kategoriler">
        <div className="container">
          <div className="section-header">
            <span className="section-badge urgent-badge">⚡ ACİL HİZMETLER</span>
            <h2 className="section-title">Tek Tıkla Anında Bağlan</h2>
            <p className="section-sub">Acil durumlarda sanal numara üzerinden esnafı direkt aramanızı sağlıyoruz. Gizlilik korumalı, kayıt altında.</p>
          </div>
          <div className="grid grid-3">
            <UrgentCard title="Çekici Hizmeti" icon="🚗" desc="Araç arızası, kaza, lastik patlaması — anında kapınızda." rating="0.0" count="0" time="—" link="/hizmet/cekici" phone="08501234567" iconClass="tow" />
            <UrgentCard title="Taksi Hizmeti" icon="🚕" desc="Siirt içi ve şehirlerarası güvenli ulaşım. 7/24 hizmet vermekteyiz." rating="0.0" count="0" time="—" link="/hizmet/taksi" phone="08501234568" iconClass="taxi" />
            <UrgentCard title="Çilingir Hizmeti" icon="🔑" desc="Kapı açma, kilit değiştirme, kasa açma — profesyonel çilingirler." rating="0.0" count="0" time="—" link="/hizmet/cilingir" phone="08501234569" iconClass="lock" />
          </div>
        </div>
      </section>

      {/* ===== VİTRİN KATEGORİLER ===== */}
      <section className="section catalog-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge catalog-badge">VİTRİN & KATALOG</span>
            <h2 className="section-title">Dijital Pazar Yeriniz</h2>
            <p className="section-sub">Ürünleri inceleyin, karşılaştırın, en iyi teklifi alın.</p>
          </div>
          <div className="grid grid-4">
            <CatalogCard title="Mobilya & Koltuk" icon="🪑" count="0" link="/hizmet/mobilya" delay="0" />
            <CatalogCard title="Telefon Tamir" icon="📱" count="0" link="/hizmet/telefon" delay="50" />
            <CatalogCard title="Emlak" icon="🏠" count="0" link="/hizmet/emlak" delay="100" />
            <CatalogCard title="Oto Galeri" icon="🚘" count="0" link="/hizmet/galeri" delay="150" />
            <CatalogCard title="Beyaz Eşya" icon="❄️" count="0" link="/hizmet/beyaz-esya" delay="0" />
            <CatalogCard title="Halı & Perde" icon="🪟" count="0" link="/hizmet/hali-perde" delay="50" />
            <CatalogCard title="Çeyiz & Ev Tekstili" icon="🎁" count="0" link="/hizmet/ceyiz" delay="100" />
            <CatalogCard title="Gelinlik & Abiye" icon="👗" count="0" link="/hizmet/gelinlik" delay="150" />
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/kategoriler" className="btn-outline btn-lg">Tüm Kategorileri ({categoriesData.length}+) İncele</Link>
          </div>
        </div>
      </section>

      {/* ===== SON İLANLAR (CANLI VERİTABANI) ===== */}
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-badge" style={{ background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.2)', color: 'var(--clr-orange)', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, display: 'inline-block', marginBottom: '1rem' }}>🔥 YENİ EKLENENLER</span>
            <h2 className="section-title">Vitrin İlanları</h2>
            <p className="section-desc">Esnaflarımız tarafından son eklenen fırsat ürünleri ve ilanlar.</p>
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
            <div style={{ textAlign: 'center', padding: '3rem 2rem', background: 'var(--clr-surface)', borderRadius: '12px', border: '1px dashed var(--clr-border)' }}>
              <span style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'block' }}>🏷️</span>
              <h3 style={{ marginBottom: '0.5rem' }}>Henüz Aktif İlan Bulunmamaktadır</h3>
              <p style={{ color: 'var(--clr-text-2)' }}>Veritabanına yeni bir ilan eklendiğinde doğrudan burada görüntülenecektir.</p>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/ilanlar" className="btn-outline btn-lg" style={{ borderColor: 'var(--clr-orange)', color: 'var(--clr-orange)' }}>Tüm İlanları İncele →</Link>
          </div>
        </div>
      </section>

      {/* ===== ESNAFLAR (CANLI VERİTABANI) ===== */}
      <section className="section featured-section" id="esnaflar">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">⭐ ÖNCÜ ESNAFLAR</span>
            <h2 className="section-title">Güvenilir & Onaylı Esnaflar</h2>
            <p className="section-sub">Platform tarafından doğrulanan, müşteri puanlaması yüksek esnaflar.</p>
          </div>

          {featuredMerchants.length > 0 ? (
            <div className="grid grid-3">
              {featuredMerchants.map((merchant, idx) => (
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
                  phone={merchant.phone || '08501234567'} 
                  delay={idx * 100} 
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 2rem', background: 'var(--clr-surface)', borderRadius: '12px', border: '1px dashed var(--clr-border)' }}>
              <span style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'block' }}>🏪</span>
              <h3 style={{ marginBottom: '0.5rem' }}>Henüz Kayıtlı Esnaf Bulunmamaktadır</h3>
              <p style={{ color: 'var(--clr-text-2)' }}>İşletmenizi platforma eklemek için hemen kaydolun.</p>
            </div>
          )}

          <div className="section-cta">
            <Link to="/esnaflar" className="btn-primary btn-lg">Tüm Esnafları Gör →</Link>
          </div>
        </div>
      </section>

      {/* ===== NASIL ÇALIŞIR ===== */}
      <section className="section how-section" id="nasil-calisir">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">🚀 NASIL ÇALIŞIR?</span>
            <h2 className="section-title">3 Adımda Hizmet Al</h2>
          </div>
          <div className="how-grid">
            <div className="how-step" data-aos="fade-right">
              <div className="step-num">01</div>
              <div className="step-icon">🔍</div>
              <h3 className="step-title">Ara veya Kategori Seç</h3>
              <p className="step-desc">İhtiyacınız olan hizmeti arama kutusuna yazın ya da kategoriler arasından seçin.</p>
              <div className="step-connector"></div>
            </div>
            <div className="how-step" data-aos="fade-up">
              <div className="step-num">02</div>
              <div className="step-icon">📋</div>
              <h3 className="step-title">Esnafı İncele</h3>
              <p className="step-desc">Puanları, yorumları ve ürün kataloglarını inceleyerek size en uygun esnafı seçin.</p>
              <div className="step-connector"></div>
            </div>
            <div className="how-step" data-aos="fade-left">
              <div className="step-num">03</div>
              <div className="step-icon">📞</div>
              <h3 className="step-title">Hemen Bağlan</h3>
              <p className="step-desc">"Hemen Ara" butonuyla sanal numara üzerinden güvenle esnafla bağlanın.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CANLI İSTATİSTİK SAYAÇLARI (VERİTABANI VERİLERİ) ===== */}
      <section className="section stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item" data-aos="zoom-in">
              <div className="stat-number">
                <AnimatedCounter target={stats.merchantCount} suffix={stats.merchantCount > 0 ? '+' : ''} />
              </div>
              <div className="stat-label">Kayıtlı Esnaf</div>
            </div>
            <div className="stat-item" data-aos="zoom-in" data-aos-delay="100">
              <div className="stat-number">
                <AnimatedCounter target={stats.completedServices} suffix={stats.completedServices > 0 ? '+' : ''} />
              </div>
              <div className="stat-label">Aktif İlan / Hizmet</div>
            </div>
            <div className="stat-item" data-aos="zoom-in" data-aos-delay="200">
              <div className="stat-number">
                <AnimatedCounter target={stats.satisfactionRate} suffix="%" />
              </div>
              <div className="stat-label">Memnuniyet Oranı</div>
            </div>
            <div className="stat-item" data-aos="zoom-in" data-aos-delay="300">
              <div className="stat-number">
                <AnimatedCounter target={stats.categoryCount} />
              </div>
              <div className="stat-label">Resmi Kategori</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ESNAF OL ===== */}
      <section className="section join-section" id="esnaf-ol">
        <div className="container">
          <div className="join-card" data-aos="fade-up">
            <div className="join-left">
              <span className="section-badge">💼 ESNAF MİSİN?</span>
              <h2 className="join-title">Platformumuza Katıl, Müşterilerini Artır</h2>
              <ul className="join-features">
                <li>✅ Aylık sabit listeleme ücreti</li>
                <li>✅ Garantili minimum çağrı/görüntülenme</li>
                <li>✅ Dijital katalog ve ilan yönetim paneli</li>
                <li>✅ Çağrı takip ve CRM raporlaması</li>
              </ul>
              <Link to="/esnaf-giris" className="btn-primary btn-lg">Ücretsiz Başvur →</Link>
            </div>
            
            <div className="join-right" ref={mockupRef}>
              <div className="join-mockup">
                <div className="mockup-card" style={{ background: 'var(--clr-surface-2)', border: '1px solid var(--clr-border)', borderRadius: '12px', padding: '1.5rem' }}>
                  <div className="mockup-header" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--clr-border)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                    <div className="mockup-dots" style={{ display: 'flex', gap: '4px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'red' }}></span>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'yellow' }}></span>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'green' }}></span>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--clr-text-2)' }}>Esnaf Paneli</span>
                  </div>
                  <div className="mockup-stat" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span className="ms-label">Bu Ay Çağrı</span>
                    <span className="ms-val orange" style={{ color: 'var(--clr-orange)', fontWeight: 'bold' }}>0</span>
                  </div>
                  <div className="mockup-stat" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span className="ms-label">Görüntülenme</span>
                    <span className="ms-val" style={{ fontWeight: 'bold' }}>0</span>
                  </div>
                  <div className="mockup-stat" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span className="ms-label">Puan</span>
                    <span className="ms-val orange" style={{ color: 'var(--clr-orange)', fontWeight: 'bold' }}>0.0 ⭐</span>
                  </div>
                  <div className="mockup-bar" style={{ background: 'rgba(255,255,255,0.05)', height: '8px', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                    <div className="mockup-bar-fill" style={{ width: mockupBarFill, background: 'var(--clr-orange)', height: '100%', transition: 'width 1s cubic-bezier(0.1, 0.8, 0.3, 1)' }}></div>
                  </div>
                  <span className="mockup-bar-label" style={{ fontSize: '0.8rem', color: 'var(--clr-text-2)' }}>Aylık Hedef: %87</span>
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
