import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileNav = () => {
  const location = useLocation();
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem('user_role'));
  }, [location.pathname]);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const getAccountLink = () => {
    if (role === 'admin') return '/admin-paneli';
    if (role === 'merchant') return '/esnaf-paneli';
    if (role === 'user') return '/uye-paneli';
    return '/uye-giris';
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
        <Link to={getAccountLink()} className={`mn-item ${isActive('/uye-giris') || isActive('/uye-paneli') || isActive('/esnaf-paneli') || isActive('/admin-paneli')}`}>
          <span className="mn-icon">👤</span>
          <span>{role ? 'Hesabım' : 'Giriş'}</span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNav;
