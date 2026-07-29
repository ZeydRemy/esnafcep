import React from 'react';
import { Link } from 'react-router-dom';

const UrgentCard = ({ title, icon, desc, rating, count, time, link, phone }) => {
  return (
    <div className="urgent-card">
      <div className="urgent-card-top">
        <div className="uc-icon-wrap">{icon}</div>
        <span className="uc-badge">ACİL</span>
      </div>
      <h3 className="uc-title">{title}</h3>
      <p className="uc-desc">{desc}</p>
      <div className="uc-meta">
        <span className="uc-meta-item">⭐ {rating}</span>
        <span className="uc-meta-item">👤 {count} Esnaf</span>
        <span className="uc-meta-item">⏱ {time}</span>
      </div>
      <div className="uc-actions">
        <Link to={link} className="btn-outline btn-sm">İncele</Link>
        <a href={`tel:${phone}`} className="btn-danger btn-sm">📞 Ara</a>
      </div>
    </div>
  );
};

export default UrgentCard;
