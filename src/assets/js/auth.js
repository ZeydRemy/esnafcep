// ======================================================
//  SiirtEsnafCep — Auth JavaScript
// ======================================================

document.addEventListener('DOMContentLoaded', () => {
  const tabLogin = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  const formLogin = document.getElementById('formLogin');
  const formRegister = document.getElementById('formRegister');

  // Tab Switching
  tabLogin.addEventListener('click', () => {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    formLogin.classList.add('active');
    formRegister.classList.remove('active');
  });

  tabRegister.addEventListener('click', () => {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    formRegister.classList.add('active');
    formLogin.classList.remove('active');
  });

  // Mock Form Submissions
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = formLogin.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Giriş Yapılıyor...';
    btn.style.opacity = '0.8';

    setTimeout(() => {
      // Fake redirect to merchant dashboard
      window.location.href = 'merchant-dashboard.html';
    }, 1000);
  });

  formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const pass = document.getElementById('regPass').value;
    const passConfirm = document.getElementById('regPassConfirm').value;
    const passError = document.getElementById('regPassError');
    
    if (pass !== passConfirm) {
      passError.style.display = 'block';
      return;
    }
    passError.style.display = 'none';

    const btn = formRegister.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Hesap Oluşturuluyor...';
    btn.style.opacity = '0.8';

    setTimeout(() => {
      alert('Kayıt başarılı! Esnaf paneline yönlendiriliyorsunuz.');
      window.location.href = 'merchant-dashboard.html';
    }, 1500);
  });
});
