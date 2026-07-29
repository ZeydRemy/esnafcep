import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isMerchantFavorite, toggleFavoriteMerchant } from '../../utils/favorites';

const MerchantCard = ({ id, avatar, name, category, isVerified, rating, reviewCount, tags, link, phone }) => {
  const ratingNum = parseFloat(rating) || 0;
  const fullStars = Math.round(ratingNum);
  const merchantObj = { id: id || name, avatar, name, category, isVerified, rating, reviewCount, tags, link, phone };

  const [fav, setFav] = useState(() => isMerchantFavorite(id || name));

  const handleFavToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = toggleFavoriteMerchant(merchantObj);
    setFav(nextState);
  };

  return (
    <div className="merchant-card" style={{ position: 'relative' }}>
      <button 
        onClick={handleFavToggle}
        title={fav ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
        style={{
          position: 'absolute',
          top: '0.8rem',
          right: '0.8rem',
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '1rem',
          transition: 'transform 0.15s ease',
          zIndex: 2
        }}
      >
        {fav ? '❤️' : '🤍'}
      </button>

      <div className="mc-top">
        <div className="mc-avatar">{avatar}</div>
        <div style={{ flex: 1, paddingRight: '2rem' }}>
          <h3 className="mc-name">{name}</h3>
          <p className="mc-category-tag">
            {isVerified && <span style={{ color: 'var(--clr-green)', marginRight: '0.4rem' }}>✓ Onaylı</span>}
            {category}
          </p>
        </div>
      </div>

      <div className="mc-stars">
        <span>{'★'.repeat(fullStars)}{'☆'.repeat(Math.max(0, 5 - fullStars))}</span>
        <span className="mc-rating">{ratingNum > 0 ? ratingNum : '—'}</span>
        <span className="mc-reviews">({reviewCount} değerlendirme)</span>
      </div>

      <div className="mc-tags">
        {(tags || []).map((tag, i) => (
          <span key={i} className="mc-tag">{tag}</span>
        ))}
      </div>

      <div className="mc-actions">
        <Link to={link || '/esnaf-profil'} className="btn-outline btn-sm">Profil</Link>
        <a href={`tel:${phone}`} className="btn-primary btn-sm">📞 Ara</a>
      </div>
    </div>
  );
};

export default MerchantCard;
