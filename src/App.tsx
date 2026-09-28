import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Blog from '@/pages/Blog';
import {
  CivilPage,
  PenalPage,
  TrabalhistaPage,
  ImobiliarioPage,
  DigitalPage,
  EmpresarialPage,
  TributarioPage,
} from '@/pages/AreaPages';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quem-somos" element={<About />} />
            <Route path="/direito-civil" element={<CivilPage />} />
            <Route path="/direito-penal" element={<PenalPage />} />
            <Route path="/direito-trabalhista" element={<TrabalhistaPage />} />
            <Route path="/direito-imobiliario" element={<ImobiliarioPage />} />
            <Route path="/direito-digital" element={<DigitalPage />} />
            <Route path="/direito-empresarial" element={<EmpresarialPage />} />
            <Route path="/direito-tributario" element={<TributarioPage />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
