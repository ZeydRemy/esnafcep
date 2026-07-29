import React from 'react';
import { Link } from 'react-router-dom';

const MerchantCard = ({ avatar, name, category, isVerified, rating, reviewCount, tags, link, phone }) => {
  const ratingNum = parseFloat(rating) || 0;
  const fullStars = Math.round(ratingNum);

  return (
    <div className="merchant-card">
      <div className="mc-top">
        <div className="mc-avatar">{avatar}</div>
        <div style={{ flex: 1 }}>
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
