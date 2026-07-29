import React from 'react';
import { Link } from 'react-router-dom';

const AdCard = ({ price, image, title, location, date, merchantAvatar, merchantName, merchantType, isVerified, delay }) => {
  return (
    <div className="ad-card" data-aos="fade-up" data-aos-delay={delay || 0}>
      <div className="adc-price">{price} ₺</div>
      <img src={image} alt={title} className="adc-img" />
      <div className="adc-body">
        <h3 className="adc-title">{title}</h3>
        <div className="adc-meta">
          <span>📍 {location}</span>
          <span>📅 {date}</span>
        </div>
        <div className="adc-merchant">
          <div className="adc-m-avatar">{merchantAvatar}</div>
          <div className="adc-m-info">
            <div className="adc-m-name">{merchantName} {isVerified && <span style={{color:'#10b981'}}>✅</span>}</div>
            <div className="adc-m-type">{merchantType}</div>
          </div>
        </div>
      </div>
      <Link to="/esnaf-profil" style={{position: 'absolute', inset: 0, zIndex: 1}}></Link>
    </div>
  );
};

export default AdCard;
