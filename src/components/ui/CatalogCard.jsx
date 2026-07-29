import React from 'react';
import { Link } from 'react-router-dom';

const CatalogCard = ({ title, icon, count, link, delay }) => {
  return (
    <Link to={link} className="catalog-card" data-aos="fade-up" data-aos-delay={delay}>
      <div className="cc-icon">{icon}</div>
      <h3 className="cc-title">{title}</h3>
      <p className="cc-count">{count} esnaf</p>
      <div className="cc-arrow">→</div>
    </Link>
  );
};

export default CatalogCard;
