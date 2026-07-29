import React from 'react';
import { Link } from 'react-router-dom';

const AdCard = ({ price, image, title, location, date, merchantAvatar, merchantName, merchantType, isVerified }) => {
  return (
    <div className="adc-card">
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
