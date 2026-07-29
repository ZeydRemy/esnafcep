import React from 'react';

const UserAgreement = () => {
  return (
    <section className="legal-content" style={{ padding: '8rem 1rem 4rem', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8', color: 'var(--clr-text-2)' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Kullanıcı Sözleşmesi ve Şartlar</h1>
      <p><em>Son Güncelleme Tarihi: 12 Temmuz 2026</em></p>

      <p>Lütfen <strong>SiirtEsnafCep</strong> (bundan böyle "Platform" veya "Site" olarak anılacaktır) web sitesini ve mobil uygulamalarını kullanmadan önce bu Kullanıcı Sözleşmesi\'ni (bundan böyle "Sözleşme" olarak anılacaktır) dikkatlice okuyunuz. Sitemizi ziyaret ederek, esnaf kaydı oluşturarak veya hizmet alarak bu sözleşmedeki şartları peşinen kabul etmiş sayılırsınız.</p>

      <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2.5rem', marginBottom: '1rem' }}>1. Taraflar</h2>
      <p>İşbu Sözleşme; SiirtEsnafCep platformunu yöneten şirket (bundan böyle "Şirket" olarak anılacaktır) ile Platform\'u kullanarak hizmet almak isteyen son kullanıcı ("Müşteri") ve Platform\'da işletme profili oluşturarak hizmet sunan işletme ("Esnaf") arasında elektronik ortamda akdedilmiştir.</p>

      <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2.5rem', marginBottom: '1rem' }}>2. Platformun Amacı ve Kapsamı</h2>
      <p>SiirtEsnafCep, Siirt ilindeki yerel işletmeleri (Esnaf) ve hizmet arayan tüketicileri (Müşteri) dijital ortamda bir araya getiren bir pazar yereri rehberi ve aracı hizmet sağlayıcısıdır. Platform üzerinden Müşteriler, Esnafların kataloglarını inceleyebilir, yorum bırakabilir ve doğrudan esnafla iletişime geçebilir.</p>
      <p><strong>Önemli Not:</strong> SiirtEsnafCep, sadece alıcı ile satıcıyı/hizmet vereni bir araya getiren bir aracı platformdur. Platform, satılan ürünlerin veya verilen hizmetlerin kalitesinden, teslimatından, garanti koşullarından veya ayıplı maldan sorumlu tutulamaz.</p>

      <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '2.5rem', marginBottom: '1rem' }}>3. Fikri Mülkiyet Hakları</h2>
      <p>Platform\'da yer alan tasarım, yazılım, veri tabanı, metinler, logolar, grafikler ve arayüzlerin (Esnaflar tarafından yüklenen içerikler hariç) tüm mali ve manevi hakları Şirket\'e aittir. İzin alınmaksızın kopyalanması, çoğaltılması veya tersine mühendislik (reverse engineering) yapılması kesinlikle yasaktır.</p>
    </section>
  );
};

export default UserAgreement;
