import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const areas = [
  { label: 'Direito Civil', path: '/direito-civil' },
  { label: 'Direito Penal', path: '/direito-penal' },
  { label: 'Direito Trabalhista', path: '/direito-trabalhista' },
  { label: 'Direito Imobiliário', path: '/direito-imobiliario' },
  { label: 'Direito Digital & LGPD', path: '/direito-digital' },
  { label: 'Direito Empresarial', path: '/direito-empresarial' },
  { label: 'Direito Tributário', path: '/direito-tributario' },
];

export default function AreaLinks({ current }: { current?: string }) {
  return (
    <section className="py-20 bg-ink-50">
      <div className="container-page">
        <div className="text-center mb-12">
          <span className="section-label">Nossas Especialidades</span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-3 text-ink-900">
            Conheça todas as áreas de atuação
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {areas.map((area) => {
            const isActive = current === area.path;
            return (
              <Link
                key={area.path}
                to={area.path}
                className={`group flex items-center justify-between px-6 py-5 rounded-2xl border transition-all duration-300 ${
                  isActive
                    ? 'bg-brand-700 border-brand-700 text-white shadow-lg shadow-brand-700/20'
                    : 'bg-white border-ink-100 text-ink-800 hover:border-brand-300 hover:shadow-lg hover:shadow-ink-900/5 hover:-translate-y-0.5'
                }`}
              >
                <span className="text-sm font-medium">{area.label}</span>
                <ArrowRight
                  className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${
                    isActive ? 'text-white' : 'text-brand-600'
                  }`}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
