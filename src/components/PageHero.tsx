import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Crumb {
  label: string;
  path?: string;
}

export default function PageHero({
  title,
  subtitle,
  crumbs,
}: {
  title: string;
  subtitle: string;
  crumbs: Crumb[];
}) {
  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-br from-ink-950 via-ink-900 to-brand-950 overflow-hidden">
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Glow */}
      <div className="absolute -top-40 -right-20 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -left-20 w-[400px] h-[400px] bg-brand-800/20 rounded-full blur-[100px]" />

      <div className="container-page relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-sm text-ink-400 mb-6 animate-fade-in">
          <Link to="/" className="hover:text-brand-400 transition-colors">Início</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-ink-600" />
              {c.path ? (
                <Link to={c.path} className="hover:text-brand-400 transition-colors">{c.label}</Link>
              ) : (
                <span className="text-brand-400">{c.label}</span>
              )}
            </span>
          ))}
        </nav>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] text-balance animate-fade-in-up">
          {title}
        </h1>
        <p className="mt-6 text-lg text-ink-300 max-w-2xl leading-relaxed animate-fade-in-up animate-delay-200">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
