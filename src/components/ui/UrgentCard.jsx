import React from 'react';
import { Link } from 'react-router-dom';

const UrgentCard = ({ title, icon, desc, rating, count, time, link, phone, iconClass }) => {
  return (
    <div className="urgent-card" data-aos="fade-up">
      <div className={`uc-icon-wrap ${iconClass}`}>{icon}</div>
      <div className="uc-body">
        <div className="uc-category-tag">ACİL</div>
        <h3 className="uc-title">{title}</h3>
        <p className="uc-desc">{desc}</p>
        <div className="uc-stats">
          <span>⭐ {rating}</span>
          <span>{count} Aktif Esnaf</span>
          <span>~{time}</span>
        </div>
        <div className="uc-actions">
          <Link to={link} className="btn-primary btn-sm">Listele</Link>
          <a href={`tel:${phone}`} className="btn-call">📞 Hemen Ara</a>
        </div>
      </div>
    </div>
  );
};

export default UrgentCard;
