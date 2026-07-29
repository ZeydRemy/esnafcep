import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileNav = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="mobile-nav">
      <div className="mn-inner">
        <Link to="/" className={`mn-item ${isActive('/')}`}>
          <span className="mn-icon">🏠</span>
          <span>Ana Sayfa</span>
        </Link>
        <Link to="/kategoriler" className={`mn-item ${isActive('/kategoriler')}`}>
          <span className="mn-icon">🔍</span>
          <span>Keşfet</span>
        </Link>
        <Link to="/ilanlar" className={`mn-item ${isActive('/ilanlar')}`}>
          <span className="mn-icon">🏷️</span>
          <span>İlanlar</span>
        </Link>
        <Link to="/uye-giris" className={`mn-item ${isActive('/uye-giris')}`}>
          <span className="mn-icon">👤</span>
          <span>Hesabım</span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNav;
