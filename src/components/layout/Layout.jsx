import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileNav from './MobileNav';
import WhatsAppSupport from './WhatsAppSupport';

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    // 1. Her sayfa geçişinde sayfayı en yukarı kaydır
    window.scrollTo(0, 0);

    // 2. Custom AOS (Animate on Scroll) tetikleyicisi
    const elements = document.querySelectorAll('[data-aos]');
    
    // Elementleri başlangıç durumuna çek
    elements.forEach(el => el.classList.remove('aos-animate'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.aosDelay || 0;
          setTimeout(() => {
            entry.target.classList.add('aos-animate');
          }, parseInt(delay));
          // Bir kez animasyon gerçekleştikten sonra izlemeyi bırak
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    elements.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]); // Sayfa yolu her değiştiğinde yeniden çalıştır

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
      <WhatsAppSupport />
    </>
  );
};

export default Layout;
