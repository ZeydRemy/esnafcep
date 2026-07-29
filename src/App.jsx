import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Merchants from './pages/Merchants';
import Ads from './pages/Ads';
import ServiceCategory from './pages/ServiceCategory';
import MerchantProfile from './pages/MerchantProfile';
import MerchantLogin from './pages/MerchantLogin';
import UserLogin from './pages/UserLogin';
import PrivacyPolicy from './pages/PrivacyPolicy';
import UserAgreement from './pages/UserAgreement';

// Dashboard imports
import UserDashboard from './pages/UserDashboard';
import MerchantDashboard from './pages/MerchantDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="kategoriler" element={<Categories />} />
          <Route path="esnaflar" element={<Merchants />} />
          <Route path="ilanlar" element={<Ads />} />
          <Route path="hizmet/:slug" element={<ServiceCategory />} />
          <Route path="esnaf-profil" element={<MerchantProfile />} />
          <Route path="esnaf-giris" element={<MerchantLogin />} />
          <Route path="uye-giris" element={<UserLogin />} />
          
          {/* Dashboard routes */}
          <Route path="uye-paneli" element={<UserDashboard />} />
          <Route path="esnaf-paneli" element={<MerchantDashboard />} />
          <Route path="admin-paneli" element={<AdminDashboard />} />

          <Route path="gizlilik-politikasi" element={<PrivacyPolicy />} />
          <Route path="kullanici-sozlesmesi" element={<UserAgreement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
