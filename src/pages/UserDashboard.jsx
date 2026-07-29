import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    const name = localStorage.getItem('user_name');
    const email = localStorage.getItem('user_email');

    if (!role || role !== 'user') {
      navigate('/uye-giris');
      return;
    }

    setUserName(name || 'Değerli Üye');
    setUserEmail(email || '');

    // Fetch user reviews
    async function fetchReviews() {
      if (!isSupabaseConfigured) {
        // Offline simulated reviews
        setReviews([
          { id: 1, merchants: { name: 'Yılmaz Oto Tamir' }, rating: 5, comment: 'Hızlı ve temiz işçilik, Siirtte tek.', created_at: '2026-07-28T12:00:00Z' },
          { id: 2, merchants: { name: 'Emin Çilingir' }, rating: 4, comment: 'Kapıyı 10 dakikada açtı, teşekkürler.', created_at: '2026-07-25T14:30:00Z' }
        ]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('reviews')
          .select('*, merchants(name)')
          .eq('user_email', email);

        if (error) throw error;
        setReviews(data || []);
      } catch (err) {
        console.error('Yorumlar yüklenirken hata:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [navigate, userEmail]);

  const handleLogout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    localStorage.clear();
    navigate('/');
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

  return (
    <>
      <header className="page-header" style={{ padding: '6rem 0 3.5rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="hs-badge">Kullanıcı Paneli</span>
            <h1 className="ph-title">{userName}</h1>
            <p className="ph-desc" style={{ color: 'rgba(255,255,255,0.7)' }}>{userEmail}</p>
          </div>
          <button className="btn-danger btn-sm" onClick={handleLogout}>
            🚪 Güvenli Çıkış
          </button>
        </div>
      </header>

      <section className="home-section">
        <div className="container">
          <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--r-md)', boxShadow: 'var(--sh-card)' }}>
            <h2 className="hs-title" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
              📝 Yorumlarım ve Değerlendirmelerim
            </h2>

            {loading ? (
              <div className="mpage-loading">
                <div className="mpage-spinner"></div>
                <span>Yorumlarınız yükleniyor...</span>
              </div>
            ) : reviews.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {reviews.map(review => (
                  <div key={review.id} style={{ border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', background: 'var(--surface-2)' }}>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--txt)', marginBottom: '0.25rem' }}>
                        {review.merchants?.name || 'Esnaf'}
                      </h3>
                      <div style={{ color: 'var(--accent)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--txt-2)' }}>"{review.comment}"</p>
                      <small style={{ color: 'var(--txt-3)', display: 'block', marginTop: '0.5rem' }}>
                        Tarih: {new Date(review.created_at).toLocaleDateString('tr-TR')}
                      </small>
                    </div>
                    <button className="btn-outline btn-sm" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }} onClick={() => handleDeleteReview(review.id)}>
                      Sil
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state" style={{ padding: '3rem 1rem' }}>
                <span className="empty-icon">💬</span>
                <h3>Henüz Yorum Yapmadınız</h3>
                <p>Hizmet aldığınız esnafları değerlendirerek diğer üyelere yardımcı olabilirsiniz.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default UserDashboard;
