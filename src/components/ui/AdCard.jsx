import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAdFavorite, toggleFavoriteAd } from '../../utils/favorites';

const AdCard = ({ id, price, image, title, location, date, merchantAvatar, merchantName, merchantType, isVerified }) => {
  const adObj = { id: id || title, price, image, title, location, date, merchantAvatar, merchantName, merchantType, isVerified };
  const [fav, setFav] = useState(() => isAdFavorite(id || title));

  const handleFavToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = toggleFavoriteAd(adObj);
    setFav(nextState);
  };

  return (
    <div className="adc-card" style={{ position: 'relative' }}>
      <button 
        onClick={handleFavToggle}
        title={fav ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
        style={{
          position: 'absolute',
          top: '0.65rem',
          right: '0.65rem',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '1rem',
          zIndex: 3,
          boxShadow: 'var(--sh-card)'
        }}
      >
        {fav ? '❤️' : '🤍'}
      </button>

      <div className="adc-image-wrap">
        <img src={image} alt={title} className="adc-img" />
        {price && (
          <span className="adc-price-badge">
            {Number(price).toLocaleString('tr-TR')} ₺
          </span>
        )}
        <span className="adc-new-badge">Yeni</span>
      </div>

      <div className="adc-body">
        <h3 className="adc-title">{title}</h3>

        <div className="adc-meta">
          <span className="adc-meta-item">📍 {location}</span>
          <span className="adc-meta-item">📅 {date}</span>
        </div>

        <div className="adc-footer">
          <div className="adc-merchant">
            <span className="adc-m-avatar">{merchantAvatar}</span>
            <div>
              <div className="adc-m-name">
                {merchantName}
                {isVerified && <span className="adc-verified"> ✓</span>}
              </div>
              <div className="adc-m-type">{merchantType}</div>
            </div>
          </div>
          <Link to="/esnaf-profil" className="btn-primary btn-sm">İncele</Link>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
