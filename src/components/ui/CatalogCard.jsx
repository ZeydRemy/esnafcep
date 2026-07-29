import React from 'react';
import { Link } from 'react-router-dom';

const CatalogCard = ({ title, icon, count, link }) => {
  return (
    <Link to={link} className="catalog-card">
      <div className="cc-icon">{icon}</div>
      <div className="cc-body">
        <h3 className="cc-title">{title}</h3>
        <p className="cc-count">{count} esnaf</p>
      </div>
      <span className="cc-arrow">→</span>
    </Link>
  );
};

export default CatalogCard;
