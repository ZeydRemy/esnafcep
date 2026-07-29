import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer" id="iletisim">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <img src="/icon.png" alt="SiirtEsnafCep" className="footer-logo-img" /> SiirtEsnafCep
            </div>
            <p className="footer-desc">Siirt'in en kapsamlı yerel esnaf ve hizmet platformu. Güvenli, hızlı ve şeffaf.</p>
            <div className="footer-socials">
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Facebook">👥</a>
              <a href="#" aria-label="Twitter/X">🐦</a>
              <a href="#" aria-label="WhatsApp">💬</a>
            </div>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Kategoriler</h4>
            <ul>
              <li><Link to="/hizmet/cekici">Çekici Hizmeti</Link></li>
              <li><Link to="/hizmet/taksi">Taksi</Link></li>
              <li><Link to="/hizmet/cilingir">Çilingir</Link></li>
              <li><Link to="/hizmet/mobilya">Mobilya</Link></li>
              <li><Link to="/hizmet/emlak">Emlak</Link></li>
              <li><Link to="/hizmet/telefon">Telefon Tamir</Link></li>
              <li><Link to="/hizmet/galeri">Galerici</Link></li>
              <li><Link to="/hizmet/oto">Oto Yol Yardım</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Kurumsal</h4>
            <ul>
              <li><a href="#">Hakkımızda</a></li>
              <li><Link to="/gizlilik-politikasi">Gizlilik Politikası</Link></li>
              <li><Link to="/kullanici-sozlesmesi">Kullanıcı Sözleşmesi</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">İletişim</h4>
            <ul className="contact-list">
              <li>📞 <a href="tel:08501234567">0850 123 45 67</a></li>
              <li>📧 <a href="mailto:info@siirtesnafcep.com">info@siirtesnafcep.com</a></li>
              <li>📍 Siirt Merkez, Türkiye</li>
              <li>🕐 7/24 Acil Hat</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 SiirtEsnafCep. Tüm hakları saklıdır. | Siirt'in Dijital Çarşısı</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
