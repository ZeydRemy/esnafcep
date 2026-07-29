import React from 'react';
import { Link } from 'react-router-dom';

const MobileNav = () => {
  return (
    <nav className="mobile-bottom-nav">
      <Link to="/" className="mbn-item">
        <span className="mbn-icon">🏠</span>
        <span>Ana Sayfa</span>
      </Link>
      <Link to="/kategoriler" className="mbn-item">
        <span className="mbn-icon">🔍</span>
        <span>Keşfet</span>
      </Link>
      <Link to="/ilanlar" className="mbn-item">
        <span className="mbn-icon">🏷️</span>
        <span>İlanlar</span>
      </Link>
      <Link to="/uye-giris" className="mbn-item">
        <span className="mbn-icon">👤</span>
        <span>Hesabım</span>
      </Link>
    </nav>
  );
};

export default MobileNav;
