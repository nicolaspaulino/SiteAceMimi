import { Link } from 'react-router-dom';
import { Scale, Mail, Phone, MapPin, Linkedin, Instagram, ArrowUp } from 'lucide-react';

const areas = [
  { label: 'Direito Civil', path: '/direito-civil' },
  { label: 'Direito Penal', path: '/direito-penal' },
  { label: 'Direito Trabalhista', path: '/direito-trabalhista' },
  { label: 'Direito Imobiliário', path: '/direito-imobiliario' },
  { label: 'Direito Digital & LGPD', path: '/direito-digital' },
  { label: 'Direito Empresarial', path: '/direito-empresarial' },
  { label: 'Direito Tributário', path: '/direito-tributario' },
];

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-ink-300">
      <div className="container-page pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-600 text-white">
                <Scale className="w-5 h-5" strokeWidth={1.5} />
              </span>
              <span className="font-serif text-2xl font-semibold text-white">
                Ace<span className="text-brand-400">Mimi</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-ink-400 max-w-xs">
              Escritório de advocacia comprometido com a excelência, ética e
              resultados. Defendemos seus direitos com dedicação e estratégia.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-ink-800 hover:bg-brand-600 transition-colors duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-ink-800 hover:bg-brand-600 transition-colors duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Areas */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-5 font-sans">
              Áreas de Atuação
            </h4>
            <ul className="space-y-2.5">
              {areas.map((a) => (
                <li key={a.path}>
                  <Link
                    to={a.path}
                    className="text-sm text-ink-400 hover:text-brand-400 transition-colors duration-200"
                  >
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-5 font-sans">
              Navegação
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-sm text-ink-400 hover:text-brand-400 transition-colors duration-200">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/quem-somos" className="text-sm text-ink-400 hover:text-brand-400 transition-colors duration-200">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-ink-400 hover:text-brand-400 transition-colors duration-200">
                  Blog & Artigos
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-sm text-ink-400 hover:text-brand-400 transition-colors duration-200">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-sm text-ink-400 hover:text-brand-400 transition-colors duration-200">
                  Agendar Consulta
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-5 font-sans">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-ink-400">
                <MapPin className="w-4 h-4 mt-0.5 text-brand-400 shrink-0" />
                <span>Av. Paulista, 1000 — Sala 1201<br />São Paulo, SP — 01310-100</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-ink-400">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <span>+55 (11) 4000-1234</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-ink-400">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <span>contato@acemimi.adv.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ink-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} AceMimi Advocacia. Todos os direitos reservados. OAB/SP 123.456
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-xs text-ink-400 hover:text-brand-400 transition-colors"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
