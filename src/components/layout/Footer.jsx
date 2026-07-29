import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer" id="iletisim">
      <div className="container">
        <div className="footer-grid">
          {/* Marka */}
          <div>
            <div className="footer-logo-row">
              <img src="/icon.png" alt="SiirtEsnafCep" className="footer-logo-img" />
              <span className="footer-brand-text">SiirtEsnafCep</span>
            </div>
            <p className="footer-desc">
              Siirt'in en kapsamlı yerel esnaf ve hizmet platformu. Güvenli, hızlı ve şeffaf bir şekilde ihtiyacınız olan ustayı bulun.
            </p>
            <div className="footer-contact">
              <a href="tel:08501234567">📞 0850 123 45 67</a>
              <a href="mailto:info@siirtesnafcep.com">✉ info@siirtesnafcep.com</a>
              <a href="#">📍 Siirt Merkez, Türkiye</a>
            </div>
          </div>

          {/* Hizmetler */}
          <div>
            <h4 className="footer-col-title">Popüler Hizmetler</h4>
            <div className="footer-links">
              <Link to="/hizmet/cekici">Çekici Hizmeti</Link>
              <Link to="/hizmet/taksi">Taksi</Link>
              <Link to="/hizmet/cilingir">Çilingir</Link>
              <Link to="/hizmet/elektrik">Elektrikçi</Link>
              <Link to="/hizmet/tesisat">Su Tesisatçısı</Link>
              <Link to="/hizmet/mobilya">Mobilya</Link>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="footer-col-title">Platform</h4>
            <div className="footer-links">
              <Link to="/kategoriler">Tüm Kategoriler</Link>
              <Link to="/esnaflar">Esnaflar</Link>
              <Link to="/ilanlar">İlanlar</Link>
              <Link to="/esnaf-giris">Esnaf Girişi</Link>
              <Link to="/uye-giris">Üye Girişi</Link>
            </div>
          </div>

          {/* Kurumsal */}
          <div>
            <h4 className="footer-col-title">Kurumsal</h4>
            <div className="footer-links">
              <a href="#">Hakkımızda</a>
              <Link to="/gizlilik-politikasi">Gizlilik Politikası</Link>
              <Link to="/kullanici-sozlesmesi">Kullanıcı Sözleşmesi</Link>
              <a href="#">İletişim</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 SiirtEsnafCep. Tüm hakları saklıdır.</span>
          <span>Siirt'in Yerel Esnaf Platformu</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
