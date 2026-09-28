import PageHero from '@/components/PageHero';
import AreaLinks from '@/components/AreaLinks';
import CTASection from '@/components/CTASection';
import { Check } from 'lucide-react';

export interface AreaData {
  title: string;
  subtitle: string;
  crumb: string;
  description: string;
  services: string[];
  faqs: { q: string; a: string }[];
}

export default function AreaPage({
  data,
  currentPath,
}: {
  data: AreaData;
  currentPath: string;
}) {
  return (
    <>
      <PageHero
        title={data.title}
        subtitle={data.subtitle}
        crumbs={[{ label: 'Áreas de Atuação' }, { label: data.crumb }]}
      />

      {/* Description */}
      <section className="py-20">
        <div className="container-page grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <span className="section-label">Sobre a Área</span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-3 mb-6 text-ink-900">
              Atuação especializada e estratégica
            </h2>
            <p className="text-lg text-ink-600 leading-relaxed">
              {data.description}
            </p>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-brand-50 rounded-2xl p-8 border border-brand-100">
              <h3 className="text-lg font-semibold text-ink-900 mb-4 font-sans">
                Serviços nesta área
              </h3>
              <ul className="space-y-3">
                {data.services.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-600 text-white shrink-0 mt-0.5">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-ink-700">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-ink-50">
        <div className="container-page max-w-3xl">
          <div className="text-center mb-12">
            <span className="section-label">Perguntas Frequentes</span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-3 text-ink-900">
              Dúvidas comuns
            </h2>
          </div>
          <div className="space-y-4">
            {data.faqs.map((faq) => (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-ink-100 p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-ink-900 mb-2 font-sans">
                  {faq.q}
                </h3>
                <p className="text-ink-600 leading-relaxed text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AreaLinks current={currentPath} />
      <CTASection />
    </>
  );
}
