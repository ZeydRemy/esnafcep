import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const MerchantDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [merchant, setMerchant] = useState({
    name: '', business_name: '', category_slug: 'mobilya', district: 'merkez',
    address: '', phone: '', description: '', tags: [], delivery_time: 'Aynı Gün', is_247: false
  });
  const [ads, setAds] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);

  // New Ad State
  const [newAdTitle, setNewAdTitle] = useState('');
  const [newAdPrice, setNewAdPrice] = useState('');
  const [newAdImage, setNewAdImage] = useState('');

  const merchantId = localStorage.getItem('merchant_id');

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    if (!role || role !== 'merchant') {
      navigate('/esnaf-giris');
      return;
    }

    async function loadDashboardData() {
      setLoading(true);

      if (!isSupabaseConfigured || !merchantId) {
        // Simulation mode
        setMerchant({
          name: 'Ahmet Yılmaz',
          business_name: 'Yılmaz Oto Tamir',
          category_slug: 'cekici',
          district: 'merkez',
          address: 'Siirt Sanayi Sitesi A Blok No: 12',
          phone: '05551234567',
          description: '7/24 oto kurtarma, çekici ve yol yardım hizmetleri sunmaktayız.',
          tags: ['çekici', 'yol yardım', 'oto kurtarma'],
          delivery_time: '~15 dk',
          is_247: true
        });
        setAds([
          { id: 1, title: 'Gece Yol Yardım Hizmeti', price: 1500, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=300&q=80' }
        ]);
        setReviews([
          { id: 1, user_name: 'Fatma Kaya', rating: 5, comment: 'Lastiğim patlamıştı, hemen gelip hallettiler.' }
        ]);
        setLoading(false);
        return;
      }

      try {
        // 1. Fetch Merchant Profile
        const { data: profile, error: pError } = await supabase
          .from('merchants')
          .select('*')
          .eq('id', merchantId)
          .single();

        if (pError) throw pError;
        if (profile) setMerchant(profile);

        // 2. Fetch Merchant Ads
        const { data: merchantAds, error: aError } = await supabase
          .from('ads')
          .select('*')
          .eq('merchant_id', merchantId);

        if (aError) throw aError;
        setAds(merchantAds || []);

        // 3. Fetch Reviews
        const { data: merchantReviews, error: rError } = await supabase
          .from('reviews')
          .select('*')
          .eq('merchant_id', merchantId);

        if (rError) throw rError;
        setReviews(merchantReviews || []);

      } catch (err) {
        console.error('Veri yüklenirken hata:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [navigate, merchantId]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaveLoading(true);

    if (!isSupabaseConfigured || !merchantId) {
      alert('Profil güncellendi (Simülasyon)');
      setSaveLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('merchants')
        .update(merchant)
        .eq('id', merchantId);

      if (error) throw error;
      alert('Profiliniz başarıyla güncellendi!');
    } catch (err) {
      alert('Güncelleme hatası: ' + err.message);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCreateAd = async (e) => {
    e.preventDefault();
    if (!newAdTitle || !newAdPrice) return;

    if (!isSupabaseConfigured || !merchantId) {
      const newAd = {
        id: Date.now(),
        title: newAdTitle,
        price: parseFloat(newAdPrice),
        image: newAdImage || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=300&q=80'
      };
      setAds([...ads, newAd]);
      setNewAdTitle(''); setNewAdPrice(''); setNewAdImage('');
      alert('İlan oluşturuldu (Simülasyon)');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('ads')
        .insert({
          merchant_id: merchantId,
          title: newAdTitle,
          price: parseFloat(newAdPrice),
          image: newAdImage || null,
          category_slug: merchant.category_slug,
          district: merchant.district
        })
        .select()
        .single();

      if (error) throw error;
      setAds([...ads, data]);
      setNewAdTitle(''); setNewAdPrice(''); setNewAdImage('');
      alert('İlanınız başarıyla yayına alındı!');
    } catch (err) {
      alert('İlan oluşturulamadı: ' + err.message);
    }
  };

  const handleDeleteAd = async (id) => {
    if (!window.confirm('Bu ilanı silmek istediğinize emin misiniz?')) return;

    if (!isSupabaseConfigured || !merchantId) {
      setAds(ads.filter(ad => ad.id !== id));
      return;
    }

    try {
      const { error } = await supabase.from('ads').delete().eq('id', id);
      if (error) throw error;
      setAds(ads.filter(ad => ad.id !== id));
    } catch (err) {
      alert('İlan silinemedi: ' + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <header className="page-header" style={{ padding: '6rem 0 3.5rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="hs-badge">Esnaf Paneli</span>
            <h1 className="ph-title">{merchant.business_name || 'İşletme Adı'}</h1>
            <p className="ph-desc" style={{ color: 'rgba(255,255,255,0.7)' }}>{merchant.name} · {merchant.phone}</p>
          </div>
          <button className="btn-danger btn-sm" onClick={handleLogout}>🚪 Çıkış Yap</button>
        </div>
      </header>

      <section className="home-section">
        <div className="container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          
          {/* Sol Panel Menüsü */}
          <aside className="ads-sidebar-panel" style={{ width: '220px' }}>
            <h3 className="ads-sidebar-title">Menü</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button className={`btn-primary ${activeTab === 'profile' ? 'btn-accent' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'flex-start', padding: '0.65rem 1rem' }} onClick={() => setActiveTab('profile')}>
                👤 Profil Bilgileri
              </button>
              <button className={`btn-primary ${activeTab === 'ads' ? 'btn-accent' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'flex-start', padding: '0.65rem 1rem' }} onClick={() => setActiveTab('ads')}>
                📢 İlan Yönetimi
              </button>
              <button className={`btn-primary ${activeTab === 'reviews' ? 'btn-accent' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'flex-start', padding: '0.65rem 1rem' }} onClick={() => setActiveTab('reviews')}>
                💬 Yorumlar ({reviews.length})
              </button>
            </div>
          </aside>

          {/* Sağ İçerik Alanı */}
          <main className="ads-main-panel">
            {loading ? (
              <div className="mpage-loading">
                <div className="mpage-spinner"></div>
                <span>Esnaf verileri yükleniyor...</span>
              </div>
            ) : (
              <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--r-md)', boxShadow: 'var(--sh-card)' }}>
                
                {/* ── PROFİL FORMU ── */}
                {activeTab === 'profile' && (
                  <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <h2 className="hs-title" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '0.5rem' }}>
                      Esnaf Profil Bilgileri
                    </h2>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label>Esnaf / Yetkili Adı</label>
                        <input type="text" className="form-control" value={merchant.name || ''} onChange={(e) => setMerchant({...merchant, name: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label>İşletme / Tabela Adı</label>
                        <input type="text" className="form-control" value={merchant.business_name || ''} onChange={(e) => setMerchant({...merchant, business_name: e.target.value})} required />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label>Telefon Numarası</label>
                        <input type="tel" className="form-control" value={merchant.phone || ''} onChange={(e) => setMerchant({...merchant, phone: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label>Kategori (Slug)</label>
                        <select className="form-control" value={merchant.category_slug || ''} onChange={(e) => setMerchant({...merchant, category_slug: e.target.value})}>
                          <option value="cekici">Çekici & Kurtarma</option>
                          <option value="taksi">Taksi</option>
                          <option value="cilingir">Çilingir</option>
                          <option value="mobilya">Mobilya</option>
                          <option value="telefon">Telefon Tamir</option>
                          <option value="emlak">Emlak & Gayrimenkul</option>
                          <option value="galeri">Oto Galeri</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label>Bulunduğu İlçe</label>
                        <select className="form-control" value={merchant.district || ''} onChange={(e) => setMerchant({...merchant, district: e.target.value})}>
                          <option value="merkez">Merkez</option>
                          <option value="kurtalan">Kurtalan</option>
                          <option value="baykan">Baykan</option>
                          <option value="pervari">Pervari</option>
                          <option value="eruh">Eruh</option>
                          <option value="sirvan">Şirvan</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Ortalama Servis/Teslimat Süresi</label>
                        <input type="text" className="form-control" placeholder="Örn: 15 Dk, Aynı Gün" value={merchant.delivery_time || ''} onChange={(e) => setMerchant({...merchant, delivery_time: e.target.value})} />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>7/24 Hizmet Veriyor mu?</label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', textTransform: 'none', fontWeight: 'normal' }}>
                        <input type="checkbox" checked={merchant.is_247 || false} onChange={(e) => setMerchant({...merchant, is_247: e.target.checked})} style={{ width: '18px', height: '18px' }} />
                        Evet, 7/24 kesintisiz hizmet vermekteyiz.
                      </label>
                    </div>

                    <div className="form-group">
                      <label>İşletme Tanıtım Yazısı</label>
                      <textarea className="form-control" rows="4" placeholder="İşletmeniz ve sunduğunuz hizmetler hakkında detaylı bilgi verin..." value={merchant.description || ''} onChange={(e) => setMerchant({...merchant, description: e.target.value})} style={{ resize: 'vertical' }}></textarea>
                    </div>

                    <div className="form-group">
                      <label>Adres Tarifi</label>
                      <input type="text" className="form-control" placeholder="Açık adres veya tarifi..." value={merchant.address || ''} onChange={(e) => setMerchant({...merchant, address: e.target.value})} />
                    </div>

                    <button type="submit" className="btn-accent btn-lg" style={{ alignSelf: 'flex-start' }} disabled={saveLoading}>
                      {saveLoading ? 'Güncelleniyor...' : 'Profil Bilgilerini Kaydet'}
                    </button>
                  </form>
                )}

                {/* ── İLAN YÖNETİMİ ── */}
                {activeTab === 'ads' && (
                  <div>
                    <h2 className="hs-title" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
                      Vitrin İlanlarım
                    </h2>

                    {/* İlan Ekleme Formu */}
                    <form onSubmit={handleCreateAd} style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: '1.25rem', borderRadius: 'var(--r-sm)', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--txt)' }}>🆕 Yeni İlan / Ürün Ekle</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                          <label>İlan / Ürün Başlığı</label>
                          <input type="text" className="form-control" placeholder="Örn: 2018 Model Dizel Manuel Egea" value={newAdTitle} onChange={(e) => setNewAdTitle(e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <label>Fiyat (TL)</label>
                          <input type="number" className="form-control" placeholder="Örn: 650000" value={newAdPrice} onChange={(e) => setNewAdPrice(e.target.value)} required />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Görsel Bağlantısı (URL - Boş bırakılırsa varsayılan görsel atanır)</label>
                        <input type="url" className="form-control" placeholder="https://unsplash.com/...jpg" value={newAdImage} onChange={(e) => setNewAdImage(e.target.value)} />
                      </div>
                      <button type="submit" className="btn-primary btn-sm" style={{ alignSelf: 'flex-start' }}>イ İlanı Yayına Al</button>
                    </form>

                    {/* Aktif İlanlar Tablosu */}
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--txt)', marginBottom: '0.75rem' }}>Aktif İlanlarınız</h3>
                    {ads.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {ads.map(ad => (
                          <div key={ad.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', background: 'var(--surface-2)', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: 0 }}>
                              <img src={ad.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=150&q=80'} alt="" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: 'var(--r-xs)' }} />
                              <div style={{ minWidth: 0 }}>
                                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--txt)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ad.title}</h4>
                                <span style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 700 }}>{Number(ad.price).toLocaleString('tr-TR')} ₺</span>
                              </div>
                            </div>
                            <button className="btn-outline btn-sm" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={() => handleDeleteAd(ad.id)}>
                              Sil
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-state" style={{ padding: '2rem 1rem' }}>
                        <span className="empty-icon">🏷️</span>
                        <h3>Henüz İlan Oluşturmadınız</h3>
                        <p>Yukarıdaki formu kullanarak ilk vitrin ürününüzü veya hizmet ilânınızı oluşturabilirsiniz.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* ── YORUMLAR ── */}
                {activeTab === 'reviews' && (
                  <div>
                    <h2 className="hs-title" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
                      Müşteri Yorumları & Değerlendirmeler
                    </h2>
                    {reviews.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {reviews.map(review => (
                          <div key={review.id} style={{ border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', padding: '1rem 1.25rem', background: 'var(--surface-2)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <strong style={{ fontSize: '0.9rem', color: 'var(--txt)' }}>{review.user_name}</strong>
                              <span style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>
                                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                              </span>
                            </div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--txt-2)', lineHeight: 1.6 }}>"{review.comment}"</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-state" style={{ padding: '3rem 1rem' }}>
                        <span className="empty-icon">💬</span>
                        <h3>Henüz Yorum Yapılmadı</h3>
                        <p>Müşterileriniz yorum yaptığında değerlendirmeleriniz burada görüntülenecektir.</p>
                      </div>
                    )}
                  </div>
                )}

              </div>
            )}
          </main>

        </div>
      </section>
    </>
  );
};

export default MerchantDashboard;
