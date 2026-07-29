import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [role, setRole] = useState(null);
  const [userName, setUserName] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setRole(localStorage.getItem('user_role'));
    setUserName(localStorage.getItem('user_name') || '');
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
    setUserName('');
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const getDashboardLink = () => {
    if (role === 'admin') return '/admin-paneli';
    if (role === 'merchant') return '/esnaf-paneli';
    return '/uye-paneli';
  };

  const getRoleName = () => {
    if (role === 'admin') return 'Yönetici';
    if (role === 'merchant') return 'Esnaf Paneli';
    return 'Hesabım';
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
          <img src="/icon.png" alt="SiirtEsnafCep Logo" className="logo-img" />
          <span className="logo-text">SiirtEsnafCep</span>
        </Link>
        
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`} id="navLinks">
          <li>
            <Link to="/kategoriler" onClick={() => setIsMenuOpen(false)}>Kategoriler</Link>
          </li>
          <li>
            <Link to="/esnaflar" onClick={() => setIsMenuOpen(false)}>Esnaflar</Link>
          </li>
          <li>
            <Link to="/ilanlar" onClick={() => setIsMenuOpen(false)}>İlanlar</Link>
          </li>
          <li>
            <a href="/#nasil-calisir" onClick={() => setIsMenuOpen(false)}>Nasıl Çalışır?</a>
          </li>

          {role ? (
            <li className={`dropdown ${isDropdownOpen ? 'active' : ''}`}>
              <a 
                href="#" 
                className="dropdown-toggle" 
                onClick={(e) => {
                  e.preventDefault();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
              >
                👤 {userName || getRoleName()} <span style={{ fontSize: '0.8em' }}>▼</span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to={getDashboardLink()} onClick={() => { setIsMenuOpen(false); setIsDropdownOpen(false); }}>
                    Paneli Aç
                  </Link>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                    Çıkış Yap
                  </a>
                </li>
              </ul>
            </li>
          ) : (
            <li className={`dropdown ${isDropdownOpen ? 'active' : ''}`}>
              <a 
                href="#" 
                className="dropdown-toggle" 
                id="navDropdownToggle"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
              >
                Giriş Yap <span style={{ fontSize: '0.8em' }}>▼</span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/uye-giris" onClick={() => { setIsMenuOpen(false); setIsDropdownOpen(false); }}>Üye Girişi</Link>
                </li>
                <li>
                  <Link to="/esnaf-giris" onClick={() => { setIsMenuOpen(false); setIsDropdownOpen(false); }}>Esnaf Girişi</Link>
                </li>
              </ul>
            </li>
          )}
        </ul>

        <div className="nav-right">
          <a href="tel:08501234567" className="btn-call-nav">
            <span>📞</span> 0850 123 45 67
          </a>
          <button 
            className={`hamburger ${isMenuOpen ? 'open active' : ''}`} 
            id="hamburger" 
            aria-label="Menüyü aç"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
