import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X, Scale } from 'lucide-react';

const navLinks = [
  { label: 'Início', path: '/' },
  { label: 'Quem Somos', path: '/quem-somos' },
  { label: 'Blog', path: '/blog' },
  {
    label: 'Áreas de Atuação',
    children: [
      { label: 'Direito Civil', path: '/direito-civil' },
      { label: 'Direito Penal', path: '/direito-penal' },
      { label: 'Direito Trabalhista', path: '/direito-trabalhista' },
      { label: 'Direito Imobiliário', path: '/direito-imobiliario' },
      { label: 'Direito Digital & LGPD', path: '/direito-digital' },
      { label: 'Direito Empresarial', path: '/direito-empresarial' },
      { label: 'Direito Tributário', path: '/direito-tributario' },
    ],
  },
  { label: 'Contato', path: '/contato' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setAreasOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm shadow-ink-900/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-page flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-700 text-white transition-transform duration-300 group-hover:scale-105">
            <Scale className="w-5 h-5" strokeWidth={1.5} />
          </span>
          <span className="font-serif text-2xl font-semibold tracking-tight text-ink-900">
            Ace<span className="text-brand-700">Mimi</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => setAreasOpen(true)}
                onMouseLeave={() => setAreasOpen(false)}
              >
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                    areasOpen
                      ? 'text-brand-700 bg-brand-50'
                      : 'text-ink-700 hover:text-brand-700 hover:bg-brand-50/60'
                  }`}
                >
                  {link.label}
                </button>
                {areasOpen && (
                  <div className="absolute top-full left-0 pt-2 w-64 animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-xl shadow-ink-900/10 border border-ink-100 p-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`block px-4 py-2.5 rounded-xl text-sm transition-colors duration-200 ${
                            location.pathname === child.path
                              ? 'text-brand-700 bg-brand-50 font-medium'
                              : 'text-ink-700 hover:text-brand-700 hover:bg-brand-50/60'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'text-brand-700 bg-brand-50'
                      : 'text-ink-700 hover:text-brand-700 hover:bg-brand-50/60'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="hidden lg:block">
          <Link to="/contato" className="btn-primary">
            Agendar Consulta
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-ink-800"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-ink-100 max-h-[calc(100vh-5rem)] overflow-y-auto animate-fade-in">
          <div className="container-page py-6 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    onClick={() => setAreasOpen(!areasOpen)}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-ink-700 rounded-xl hover:bg-brand-50"
                  >
                    {link.label}
                  </button>
                  {areasOpen && (
                    <div className="pl-4 space-y-1 mt-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`block px-4 py-2.5 rounded-xl text-sm ${
                            location.pathname === child.path
                              ? 'text-brand-700 bg-brand-50 font-medium'
                              : 'text-ink-600 hover:bg-brand-50/60'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 text-sm font-medium rounded-xl ${
                    location.pathname === link.path
                      ? 'text-brand-700 bg-brand-50'
                      : 'text-ink-700 hover:bg-brand-50/60'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-4">
              <Link to="/contato" className="btn-primary w-full">
                Agendar Consulta
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
