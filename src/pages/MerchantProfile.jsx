import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MerchantProfile = () => {
  const [activeTab, setActiveTab] = useState('hizmetler');
  const [reviewRating, setReviewRating] = useState('5');
  const [reviewText, setReviewText] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  
  const [reviews, setReviews] = useState([
    {
      avatar: 'M',
      name: 'Mehmet K.',
      date: '12 Haziran 2026',
      rating: 5,
      text: 'Gece 2\'de araç arızalandı, 12 dakika içinde geldiler. Profesyonel ve güler yüzlü. Kesinlikle tavsiye ederim!',
      verified: true
    },
    {
      avatar: 'A',
      avatarBg: 'linear-gradient(135deg,#8b5cf6,#6d28d9)',
      name: 'Ayşe T.',
      date: '5 Temmuz 2026',
      rating: 5,
      text: 'Kaza yapınca ilk aklıma SiirtEsnafCep geldi. Ahmet usta çok ilgilendi, araç hiç zarar görmeden servise götürüldü.',
      verified: true
    },
    {
      avatar: 'H',
      avatarBg: 'linear-gradient(135deg,#10b981,#059669)',
      name: 'Hasan Y.',
      date: '1 Temmuz 2026',
      rating: 4,
      text: 'Fiyat biraz yüksekti ama hizmet kaliteliydi. Lastik değişimini hızlı yaptı, sorun yaşamadım.',
      verified: true
    }
  ]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      avatar: guestName ? guestName.charAt(0).toUpperCase() : 'G',
      name: guestName || 'Misafir Kullanıcı',
      date: 'Şimdi',
      rating: parseInt(reviewRating),
      text: reviewText,
      verified: false
    };
    setReviews([newReview, ...reviews]);
    setReviewText('');
    setGuestName('');
    setGuestEmail('');
  };

  return (
    <>
      <section className="profile-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Ana Sayfa</Link>
            <span>&nbsp;›&nbsp;</span>
            <Link to="/hizmet/cekici">Çekici Hizmeti</Link>
            <span>&nbsp;›&nbsp;</span>
            <span className="bc-current">Ahmet Çekici Hizmeti</span>
          </div>

          <div className="profile-header-card">
            <div className="profile-avatar tow-bg">🚗</div>
            <div>
              <div className="profile-badges" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                <span className="mlc-tag verified" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>✅ Onaylı Esnaf</span>
                <span className="mlc-tag urgent-tag" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>⚡ Çekici</span>
                <span className="mlc-tag" style={{ background: 'var(--clr-surface-2)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>🕐 7/24</span>
                <span className="mlc-tag" style={{ background: 'var(--clr-surface-2)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>📍 Siirt Merkez</span>
              </div>
              <h1 className="profile-name">Ahmet Çekici Hizmeti</h1>
              <p className="profile-desc">10 yıllık deneyim. Her türlü araç — binek, SUV, minibüs, kamyonet. Araç hasarsız taşıma garantisi. Siirt ili ve tüm ilçelerine hizmet vermekteyiz. Kaza, arıza, lastik ve akü sorunlarında 7/24 yanınızdayız.</p>
              <div className="profile-info-grid">
                <div className="profile-info-item"><span>📍</span> Merkez Mahallesi, Siirt</div>
                <div className="profile-info-item"><span>🕐</span> 7/24 Açık</div>
                <div className="profile-info-item"><span>🚗</span> Her Araç Tipi</div>
                <div className="profile-info-item"><span>📅</span> 2014'ten beri hizmet</div>
                <div className="profile-info-item"><span>🛡️</span> Sigortalı Taşıma</div>
                <div className="profile-info-item"><span>⚡</span> Ortalama 12 dk ulaşım</div>
              </div>
            </div>
            <div className="profile-cta-side">
              <div className="profile-rating-big">
                <div className="prb-val">4.9</div>
                <div className="prb-stars" style={{ color: 'var(--clr-orange)' }}>★★★★★</div>
                <div className="prb-count">127 değerlendirme</div>
              </div>
              <a href="tel:08501234501" className="btn-call-hero" style={{ textAlign: 'center', justifyContent: 'center' }}>
                📞 Hemen Ara
              </a>
              <span className="service-note" style={{ textAlign: 'center', display: 'block', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--clr-text-2)' }}>Sanal numara korumalı</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="profile-tabs" style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--clr-border)', marginBottom: '2rem' }}>
            <button className={`ptab ${activeTab === 'hizmetler' ? 'active' : ''}`} onClick={() => setActiveTab('hizmetler')} style={{ background: 'none', border: 'none', padding: '1rem', color: '#fff', cursor: 'pointer', borderBottom: activeTab === 'hizmetler' ? '2px solid var(--clr-orange)' : 'none' }}>Hizmetler</button>
            <button className={`ptab ${activeTab === 'yorumlar' ? 'active' : ''}`} onClick={() => setActiveTab('yorumlar')} style={{ background: 'none', border: 'none', padding: '1rem', color: '#fff', cursor: 'pointer', borderBottom: activeTab === 'yorumlar' ? '2px solid var(--clr-orange)' : 'none' }}>Yorumlar ({reviews.length})</button>
            <button className={`ptab ${activeTab === 'fiyatlar' ? 'active' : ''}`} onClick={() => setActiveTab('fiyatlar')} style={{ background: 'none', border: 'none', padding: '1rem', color: '#fff', cursor: 'pointer', borderBottom: activeTab === 'fiyatlar' ? '2px solid var(--clr-orange)' : 'none' }}>Fiyat Listesi</button>
          </div>

          {activeTab === 'hizmetler' && (
            <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div className="service-item-card" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderRadius: '12px', padding: '1.5rem' }}>
                <div className="sic-icon" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚗</div>
                <h3 className="sic-title" style={{ marginBottom: '0.5rem' }}>Arıza Çekimi</h3>
                <p className="sic-desc" style={{ color: 'var(--clr-text-2)', fontSize: '0.9rem' }}>Motor arızası, şanzıman sorunu veya her türlü mekanik arızada güvenli taşıma.</p>
              </div>
              <div className="service-item-card" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderRadius: '12px', padding: '1.5rem' }}>
                <div className="sic-icon" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💥</div>
                <h3 className="sic-title" style={{ marginBottom: '0.5rem' }}>Kaza Kurtarma</h3>
                <p className="sic-desc" style={{ color: 'var(--clr-text-2)', fontSize: '0.9rem' }}>Trafik kazası sonrası araçları güvenle taşıma ve bölgeden uzaklaştırma.</p>
              </div>
              <div className="service-item-card" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderRadius: '12px', padding: '1.5rem' }}>
                <div className="sic-icon" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔧</div>
                <h3 className="sic-title" style={{ marginBottom: '0.5rem' }}>Lastik Değişimi</h3>
                <p className="sic-desc" style={{ color: 'var(--clr-text-2)', fontSize: '0.9rem' }}>Yolda kalan lastik sorunu için yerinde yedek lastik montajı.</p>
              </div>
              <div className="service-item-card" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderRadius: '12px', padding: '1.5rem' }}>
                <div className="sic-icon" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔋</div>
                <h3 className="sic-title" style={{ marginBottom: '0.5rem' }}>Akü Takviye</h3>
                <p className="sic-desc" style={{ color: 'var(--clr-text-2)', fontSize: '0.9rem' }}>Boşalan akü için anında takviye ve gerekirse akü değiştirme hizmeti.</p>
              </div>
            </div>
          )}

          {activeTab === 'yorumlar' && (
            <div>
              <div className="dash-card" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-orange)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', color: '#fff' }}>Esnafı Değerlendir</h3>
                <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  
                  <div style={{ background: 'rgba(249, 115, 22, 0.1)', borderLeft: '4px solid var(--clr-orange)', padding: '1rem', borderRadius: '4px', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.2rem' }}>ℹ️</span>
                    <div>
                      <strong style={{ color: '#fff', fontSize: '0.9rem', display: 'block', marginBottom: '0.2rem' }}>Üye Girişi Yapmadınız</strong>
                      <p style={{ color: 'var(--clr-text-2)', fontSize: '0.85rem', lineHeight: '1.4' }}>Ziyaretçi olarak yorum yapıyorsunuz. Yorumunuz spam kontrolünden sonra yayına alınacaktır. Hızlı onay için <Link to="/uye-giris" style={{ color: 'var(--clr-orange)' }}>Giriş Yapın</Link>.</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1', minWidth: '200px' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Ad Soyad</label>
                      <input type="text" className="form-control" placeholder="Örn: Ahmet Yılmaz" value={guestName} onChange={(e) => setGuestName(e.target.value)} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--clr-border)', color: '#fff', borderRadius: '6px' }} />
                    </div>
                    <div style={{ flex: '1', minWidth: '200px' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>E-Posta Adresi</label>
                      <input type="email" className="form-control" placeholder="Örn: ahmet@email.com" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--clr-border)', color: '#fff', borderRadius: '6px' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Puanınız</label>
                    <select value={reviewRating} onChange={(e) => setReviewRating(e.target.value)} style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--clr-border)', color: '#fff', borderRadius: '6px', maxWidth: '250px', width: '100%' }}>
                      <option value="5">★★★★★ (5/5) - Mükemmel</option>
                      <option value="4">★★★★☆ (4/5) - Çok İyi</option>
                      <option value="3">★★★☆☆ (3/5) - Ortalama</option>
                      <option value="2">★★☆☆☆ (2/5) - Kötü</option>
                      <option value="1">★☆☆☆☆ (1/5) - Berbat</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Yorumunuz</label>
                    <textarea rows="4" placeholder="Hizmetten memnun kaldınız mı? Diğer kullanıcılara bilgi verin..." required value={reviewText} onChange={(e) => setReviewText(e.target.value)} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--clr-border)', color: '#fff', borderRadius: '6px' }}></textarea>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <button type="submit" className="btn-primary" style={{ padding: '0.8rem 2rem' }}>Yorumu Gönder</button>
                  </div>
                </form>
              </div>

              <h3 style={{ marginBottom: '1.5rem', color: '#fff' }}>Son Yorumlar</h3>
              <div className="reviews-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {reviews.map((rev, idx) => (
                  <div key={idx} className="review-card" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderRadius: '12px', padding: '1.5rem' }}>
                    <div className="rc-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <div className="rc-avatar" style={{ background: rev.avatarBg || 'var(--clr-surface-2)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{rev.avatar}</div>
                      <div style={{ flex: 1 }}>
                        <div className="rc-name" style={{ fontWeight: 'bold' }}>{rev.name}</div>
                        <div className="rc-date" style={{ fontSize: '0.8rem', color: 'var(--clr-text-2)' }}>{rev.date}</div>
                      </div>
                      <div className="rc-stars" style={{ color: 'var(--clr-orange)' }}>{'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}</div>
                    </div>
                    <p className="rc-text" style={{ color: '#fff', fontSize: '0.95rem', lineHeight: '1.5' }}>{rev.text}</p>
                    {rev.verified && <div className="rc-verified-note" style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '0.5rem' }}>✅ Doğrulanmış Kullanıcı · SiirtEsnafCep aracılığıyla hizmet alındı</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'fiyatlar' && (
            <div className="price-table-wrap" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderRadius: '12px', padding: '1.5rem' }}>
              <table className="price-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--clr-border)' }}>
                    <th style={{ padding: '1rem' }}>Hizmet</th>
                    <th style={{ padding: '1rem' }}>Mesafe</th>
                    <th style={{ padding: '1rem' }}>Fiyat (Başlangıç)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--clr-border)' }}><td style={{ padding: '1rem' }}>Şehir İçi Çekici</td><td style={{ padding: '1rem' }}>0–15 km</td><td className="pt-price" style={{ color: 'var(--clr-orange)', fontWeight: 'bold', padding: '1rem' }}>750 TL</td></tr>
                  <tr style={{ borderBottom: '1px solid var(--clr-border)' }}><td style={{ padding: '1rem' }}>Şehir İçi Çekici</td><td style={{ padding: '1rem' }}>15–30 km</td><td className="pt-price" style={{ color: 'var(--clr-orange)', fontWeight: 'bold', padding: '1rem' }}>1.200 TL</td></tr>
                  <tr style={{ borderBottom: '1px solid var(--clr-border)' }}><td style={{ padding: '1rem' }}>Lastik Değişimi</td><td style={{ padding: '1rem' }}>—</td><td className="pt-price" style={{ color: 'var(--clr-orange)', fontWeight: 'bold', padding: '1rem' }}>300 TL</td></tr>
                  <tr style={{ borderBottom: '1px solid var(--clr-border)' }}><td style={{ padding: '1rem' }}>Akü Takviye</td><td style={{ padding: '1rem' }}>—</td><td className="pt-price" style={{ color: 'var(--clr-orange)', fontWeight: 'bold', padding: '1rem' }}>200 TL</td></tr>
                </tbody>
              </table>
              <p className="price-note" style={{ fontSize: '0.8rem', color: 'var(--clr-text-2)', marginTop: '1rem' }}>* Fiyatlar başlangıç fiyatlarıdır. Araç tipi, mesafe ve koşullara göre değişebilir. Kesin fiyat için arayın.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section" style={{ padding: '3rem 0' }}>
        <div className="container">
          <div className="cta-bottom-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderRadius: '12px', padding: '2rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <h2 className="cta-bottom-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Acil mi? Hemen Arayın!</h2>
              <p className="cta-bottom-sub" style={{ color: 'var(--clr-text-2)' }}>Ahmet Çekici Hizmeti 7/24 hizmetinizde. Tüm aramalar SiirtEsnafCep güvencesiyle.</p>
            </div>
            <a href="tel:08501234501" className="btn-call-hero" style={{ whiteSpace: 'nowrap', padding: '1rem 2rem', background: 'var(--clr-orange)', color: '#fff', borderRadius: '8px', fontWeight: 'bold' }}>📞 0850 123 45 01</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default MerchantProfile;
