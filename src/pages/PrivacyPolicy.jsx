import React from 'react';

const PrivacyPolicy = () => {
  return (
    <section className="legal-content" style={{ padding: '8rem 1rem 4rem', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8', color: 'var(--clr-text-2)' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Gizlilik ve Kişisel Verilerin Korunması Politikası</h1>
      <p><em>Son Güncelleme Tarihi: 12 Temmuz 2026</em></p>

      <p>SiirtEsnafCep olarak ("Platform", "Şirket"), Müşterilerimizin ve Esnaflarımızın ("Kullanıcı") gizliliğine ve kişisel verilerinin korunmasına büyük önem veriyoruz. İşbu Gizlilik Politikası, 6698 Sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, Platformumuzu kullanırken hangi verilerin toplandığını, bunların nasıl kullanıldığını ve kimlerle paylaşılabileceğini açıklamaktadır.</p>

      <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2.5rem', marginBottom: '1rem' }}>1. Toplanan Kişisel Veriler</h2>
      <p>Sizlere daha iyi bir hizmet sunabilmek ve platformun güvenliğini sağlamak amacıyla aşağıdaki verileri toplamaktayız:</p>
      <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}><strong>Esnaf Kayıt Verileri:</strong> Ad, Soyad, İşletme Unvanı, T.C. Kimlik / Vergi Numarası, İletişim Numarası, E-posta adresi, İşletme Adresi.</li>
        <li style={{ marginBottom: '0.5rem' }}><strong>Müşteri Verileri:</strong> Esnaflara yorum bırakmanız veya çağrı oluşturmanız halinde (izin verdiğiniz ölçüde) IP adresiniz, tarayıcı bilgileriniz, adınız/soyadınız ve iletişim bilgileriniz.</li>
        <li style={{ marginBottom: '0.5rem' }}><strong>Kullanım (Log) Verileri:</strong> Platform içindeki arama tercihleriniz, ziyaret ettiğiniz esnaf profilleri, sayfada geçirdiğiniz süre ve bağlantı log kayıtları.</li>
      </ul>

      <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2.5rem', marginBottom: '1rem' }}>2. Kişisel Verilerin İşlenme Amaçları</h2>
      <p>Topladığımız veriler aşağıdaki amaçlar doğrultusunda işlenmektedir:</p>
      <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>Müşterilerin aradıkları en doğru ve en yakın esnafa (örn. çekici, çilingir, taksi) saniyeler içinde ulaşmasını sağlayan konum tabanlı algoritmaların çalıştırılması.</li>
        <li style={{ marginBottom: '0.5rem' }}>Esnafın platforma kaydının tamamlanması, kurumsal profilinin oluşturulması ve Müşterilere listelenmesi.</li>
        <li style={{ marginBottom: '0.5rem' }}>Platform güvenliğinin sağlanması, siber saldırıların engellenmesi ve yasal denetim yükümlülüklerinin yerine getirilmesi.</li>
      </ul>

      <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2.5rem', marginBottom: '1rem' }}>3. Veri Güvenliği</h2>
      <p>Kişisel verilerinin yetkisiz erişime, kaybolmaya, değiştirilmeye veya ifşa edilmeye karşı korunması için endüstri standardı şifreleme algoritmaları (SSL/TLS) ve gelişmiş güvenlik duvarları kullanılmaktadır. Şirket çalışanlarının veri erişimi sınırlıdır.</p>
    </section>
  );
};

export default PrivacyPolicy;
