import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('categories');
  const [categories, setCategories] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Category State
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatTitle, setNewCatTitle] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('');
  const [newCatType, setNewCatType] = useState('catalog');

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    if (!role || role !== 'admin') {
      navigate('/uye-giris');
      return;
    }

    async function loadAdminData() {
      setLoading(true);

      if (!isSupabaseConfigured) {
        // Simulation mode fallback data
        setCategories([
          { id: 1, slug: 'cekici', title: 'Çekici & Kurtarma', icon: '🚗', type: 'urgent' },
          { id: 2, slug: 'mobilya', title: 'Mobilya', icon: '🪑', type: 'catalog' }
        ]);
        setMerchants([
          { id: 1, name: 'Ahmet Yılmaz', business_name: 'Yılmaz Oto Tamir', category_slug: 'cekici', phone: '05551234567', is_verified: false },
          { id: 2, name: 'Caner Mobilya', business_name: 'Dilek Koltuk', category_slug: 'mobilya', phone: '05559876543', is_verified: true }
        ]);
        setReviews([
          { id: 1, user_name: 'Elif Kaya', comment: 'Çekici hızlı geldi.', rating: 5, is_approved: true }
        ]);
        setLoading(false);
        return;
      }

      try {
        const [catsRes, mercsRes, revsRes] = await Promise.all([
          supabase.from('categories').select('*').order('title', { ascending: true }),
          supabase.from('merchants').select('*').order('id', { ascending: false }),
          supabase.from('reviews').select('*, merchants(name)').order('id', { ascending: false })
        ]);

        if (catsRes.error) throw catsRes.error;
        if (mercsRes.error) throw mercsRes.error;
        if (revsRes.error) throw revsRes.error;

        setCategories(catsRes.data || []);
        setMerchants(mercsRes.data || []);
        setReviews(revsRes.data || []);
      } catch (err) {
        console.error('Admin yükleme hatası:', err);
      } finally {
        setLoading(false);
      }
    }

    loadAdminData();
  }, [navigate]);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCatSlug || !newCatTitle || !newCatIcon) return;

    if (!isSupabaseConfigured) {
      const newCat = { id: Date.now(), slug: newCatSlug, title: newCatTitle, icon: newCatIcon, type: newCatType };
      setCategories([...categories, newCat]);
      setNewCatSlug(''); setNewCatTitle(''); setNewCatIcon('');
      alert('Kategori eklendi (Simülasyon)');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('categories')
        .insert({
          slug: newCatSlug.toLowerCase().trim(),
          title: newCatTitle.trim(),
          icon: newCatIcon.trim(),
          type: newCatType
        })
        .select()
        .single();

      if (error) throw error;
      setCategories([...categories, data]);
      setNewCatSlug(''); setNewCatTitle(''); setNewCatIcon('');
      alert('Yeni kategori başarıyla oluşturuldu!');
    } catch (err) {
      alert('Kategori oluşturulamadı: ' + err.message);
    }
  };

  const handleToggleVerifyMerchant = async (id, currentStatus) => {
    const nextStatus = !currentStatus;

    if (!isSupabaseConfigured) {
      setMerchants(merchants.map(m => m.id === id ? { ...m, is_verified: nextStatus } : m));
      return;
    }

    try {
      const { error } = await supabase
        .from('merchants')
        .update({ is_verified: nextStatus })
        .eq('id', id);

      if (error) throw error;
      setMerchants(merchants.map(m => m.id === id ? { ...m, is_verified: nextStatus } : m));
    } catch (err) {
      alert('Esnaf onay durumu değiştirilemedi: ' + err.message);
    }
  };

  const handleDeleteMerchant = async (id) => {
    if (!window.confirm('Bu esnafı ve tüm bağlı verilerini silmek istediğinize emin misiniz?')) return;

    if (!isSupabaseConfigured) {
      setMerchants(merchants.filter(m => m.id !== id));
      return;
    }

    try {
      const { error } = await supabase.from('merchants').delete().eq('id', id);
      if (error) throw error;
      setMerchants(merchants.filter(m => m.id !== id));
    } catch (err) {
      alert('Esnaf silinemedi: ' + err.message);
    }
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm('Bu yorumu silmek istediğinize emin misiniz?')) return;

    if (!isSupabaseConfigured) {
      setReviews(reviews.filter(r => r.id !== id));
      return;
    }

    try {
      const { error } = await supabase.from('reviews').delete().eq('id', id);
      if (error) throw error;
      setReviews(reviews.filter(r => r.id !== id));
    } catch (err) {
      alert('Yorum silinemedi: ' + err.message);
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
            <span className="hs-badge">Yönetici Paneli</span>
            <h1 className="ph-title">Sistem Yönetimi</h1>
            <p className="ph-desc" style={{ color: 'rgba(255,255,255,0.7)' }}>Platform genel kontrol ve moderasyon.</p>
          </div>
          <button className="btn-danger btn-sm" onClick={handleLogout}>🚪 Güvenli Çıkış</button>
        </div>
      </header>

      <section className="home-section">
        <div className="container" style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          
          {/* Sol Sidebar */}
          <aside className="ads-sidebar-panel" style={{ width: '220px' }}>
            <h3 className="ads-sidebar-title">Modüller</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button className={`btn-primary ${activeTab === 'categories' ? 'btn-accent' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'flex-start', padding: '0.65rem 1rem' }} onClick={() => setActiveTab('categories')}>
                📂 Kategori Yönetimi
              </button>
              <button className={`btn-primary ${activeTab === 'merchants' ? 'btn-accent' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'flex-start', padding: '0.65rem 1rem' }} onClick={() => setActiveTab('merchants')}>
                🏪 Esnaf Kontrolü ({merchants.length})
              </button>
              <button className={`btn-primary ${activeTab === 'reviews' ? 'btn-accent' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'flex-start', padding: '0.65rem 1rem' }} onClick={() => setActiveTab('reviews')}>
                🛡️ Yorum Moderasyonu ({reviews.length})
              </button>
            </div>
          </aside>

          {/* Sağ Alan */}
          <main className="ads-main-panel">
            {loading ? (
              <div className="mpage-loading">
                <div className="mpage-spinner"></div>
                <span>Sistem verileri yükleniyor...</span>
              </div>
            ) : (
              <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--r-md)', boxShadow: 'var(--sh-card)' }}>
                
                {/* ── KATEGORİ YÖNETİMİ ── */}
                {activeTab === 'categories' && (
                  <div>
                    <h2 className="hs-title" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
                      Kategori Ekle ve Yönet
                    </h2>
                    
                    {/* Kategori Ekleme Formu */}
                    <form onSubmit={handleCreateCategory} style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: '1.25rem', borderRadius: 'var(--r-sm)', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                      <h3 style={{ fontSize: '0.9rem', fontWeight: 700 }}>📂 Yeni Hizmet Kategorisi Oluştur</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                          <label>Kategori İsmi</label>
                          <input type="text" className="form-control" placeholder="Örn: Tesisatçı Ustası" value={newCatTitle} onChange={(e) => setNewCatTitle(e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <label>Slug (Benzersiz Link)</label>
                          <input type="text" className="form-control" placeholder="Örn: tesisatci" value={newCatSlug} onChange={(e) => setNewCatSlug(e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <label>Emoji / İkon</label>
                          <input type="text" className="form-control" placeholder="Örn: 🪠" value={newCatIcon} onChange={(e) => setNewCatIcon(e.target.value)} required />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Hizmet Tipi</label>
                        <select className="form-control" value={newCatType} onChange={(e) => setNewCatType(e.target.value)}>
                          <option value="catalog">Katalog / Vitrin Ürünü (Standart)</option>
                          <option value="urgent">Acil / Hemen Ara (Taksi, Çekici vb.)</option>
                        </select>
                      </div>
                      <button type="submit" className="btn-accent btn-sm" style={{ alignSelf: 'flex-start' }}>Yeni Kategori Ekle</button>
                    </form>

                    {/* Kategori Listesi */}
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>Mevcut Sektörler</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
                      {categories.map(cat => (
                        <div key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', background: 'var(--surface-2)' }}>
                          <span style={{ fontSize: '1.25rem' }}>{cat.icon}</span>
                          <div>
                            <strong style={{ fontSize: '0.845rem', display: 'block' }}>{cat.title}</strong>
                            <small style={{ color: 'var(--txt-3)', fontSize: '0.75rem' }}>slug: {cat.slug}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── ESNAF YÖNETİMİ ── */}
                {activeTab === 'merchants' && (
                  <div>
                    <h2 className="hs-title" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
                      Kayıtlı Esnaf Onay ve Kontrolü
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {merchants.map(m => (
                        <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', background: 'var(--surface-2)', gap: '1rem', flexWrap: 'wrap' }}>
                          <div>
                            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--txt)' }}>{m.business_name || 'İşletme İsmi Belirtilmemiş'}</h3>
                            <p style={{ fontSize: '0.82rem', color: 'var(--txt-2)' }}>Yetkili: {m.name} · Tel: {m.phone}</p>
                            <span className="badge-icon">
                              {m.is_verified ? (
                                <span style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '0.82rem' }}>✓ Sistem Onaylı Esnaf</span>
                              ) : (
                                <span style={{ color: 'var(--danger)', fontWeight: 'bold', fontSize: '0.82rem' }}>⌛ Onay Bekliyor</span>
                              )}
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className={`btn-sm ${m.is_verified ? 'btn-outline' : 'btn-accent'}`} onClick={() => handleToggleVerifyMerchant(m.id, m.is_verified)}>
                              {m.is_verified ? 'Onayı Kaldır' : 'Onayla (Doğrula)'}
                            </button>
                            <button className="btn-danger btn-sm" onClick={() => handleDeleteMerchant(m.id)}>
                              Sil
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── YORUM MODERASYONU ── */}
                {activeTab === 'reviews' && (
                  <div>
                    <h2 className="hs-title" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
                      Müşteri Yorum Denetimi
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {reviews.map(r => (
                        <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', background: 'var(--surface-2)', gap: '1rem', flexWrap: 'wrap' }}>
                          <div style={{ flex: 1, minWidth: '220px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                              <strong style={{ fontSize: '0.875rem' }}>{r.user_name}</strong>
                              <span style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>{'★'.repeat(r.rating)}</span>
                            </div>
                            <p style={{ fontSize: '0.845rem', color: 'var(--txt-2)', marginBottom: '0.5rem' }}>"{r.comment}"</p>
                            <small style={{ color: 'var(--txt-3)' }}>Esnaf: {r.merchants?.name || r.merchant_id}</small>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <button className="btn-outline btn-sm" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={() => handleDeleteReview(r.id)}>
                              Yorumu Sil
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
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

export default AdminDashboard;
