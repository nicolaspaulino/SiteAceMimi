import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900 px-8 py-16 md:px-16 md:py-20">
          {/* Decorative */}
          <div className="absolute -top-20 -right-10 w-[300px] h-[300px] bg-white/10 rounded-full blur-[80px]" />
          <div className="absolute -bottom-20 -left-10 w-[250px] h-[250px] bg-brand-500/30 rounded-full blur-[80px]" />

          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-white leading-tight text-balance">
              Pronto para defender seus direitos?
            </h2>
            <p className="mt-4 text-lg text-brand-100 leading-relaxed">
              Agende uma consulta inicial com nossa equipe. Avaliamos seu caso
              com sigilo absoluto e construímos a melhor estratégia para você.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/contato"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-brand-800 font-medium text-sm tracking-wide transition-all duration-300 hover:bg-brand-50 hover:-translate-y-0.5"
              >
                Agendar Consulta
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+551140001234"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/30 text-white font-medium text-sm tracking-wide transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                +55 (11) 4000-1234
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
