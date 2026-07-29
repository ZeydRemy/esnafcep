import React from 'react';
import { Link } from 'react-router-dom';

const MerchantCard = ({ avatar, avatarBg, name, category, catTag, isVerified, rating, reviewCount, tags, delay, isFeatured, link, phone }) => {
  return (
    <div className={`merchant-card ${isFeatured ? 'featured' : ''}`} data-aos="fade-up" data-aos-delay={delay || 0}>
      {isFeatured && <div className="mc-featured-badge">🏆 En Çok Aranan</div>}
      <div className="mc-header">
        <div className={`mc-avatar ${avatarBg}`}>{avatar}</div>
        <div className="mc-info">
          <h3 className="mc-name">{name}</h3>
          <span className={`mc-cat ${catTag}`}>{category}</span>
        </div>
        {isVerified && <div className="mc-verified" title="Onaylı Esnaf">✅</div>}
      </div>
      <div className="mc-rating">
        <div className="stars">{'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}</div>
        <span className="rating-val">{rating}</span>
        <span className="rating-count">({reviewCount} değerlendirme)</span>
      </div>
      <div className="mc-tags">
        {tags.map((tag, i) => (
          <span key={i} className="tag">{tag}</span>
        ))}
      </div>
      <div className="mc-actions">
        <Link to={link || '/esnaf-profil'} className="btn-outline btn-sm">Profili Gör</Link>
        <a href={`tel:${phone}`} className="btn-call-primary">📞 Ara</a>
      </div>
    </div>
  );
};

export default MerchantCard;
