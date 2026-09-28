import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight, Check } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero
        title="Fale Conosco"
        subtitle="Agende uma consulta inicial ou tire suas dúvidas. Nossa equipe está pronta para atender você com sigilo e profissionalismo."
        crumbs={[{ label: 'Contato' }]}
      />

      <section className="py-20">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <span className="section-label">Informações de Contato</span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-4 text-ink-900 mb-8">
              Estamos à sua disposição
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-5">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-50 text-brand-700 shrink-0">
                  <MapPin className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink-900">Endereço</h3>
                  <p className="text-ink-600 mt-1">
                    Av. Paulista, 1000 — Sala 1201<br />
                    Bela Vista, São Paulo — SP<br />
                    CEP 01310-100
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-50 text-brand-700 shrink-0">
                  <Phone className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink-900">Telefone</h3>
                  <p className="text-ink-600 mt-1">+55 (11) 4000-1234<br />+55 (11) 99999-1234</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-50 text-brand-700 shrink-0">
                  <Mail className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink-900">E-mail</h3>
                  <p className="text-ink-600 mt-1">contato@acemimi.adv.br<br />imprensa@acemimi.adv.br</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-50 text-brand-700 shrink-0">
                  <Clock className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink-900">Horário de Atendimento</h3>
                  <p className="text-ink-600 mt-1">
                    Segunda a Sexta: 9h às 18h<br />
                    Sábado: 9h às 13h<br />
                    Domingo: Fechado
                  </p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-8 rounded-2xl overflow-hidden border border-ink-100 aspect-[16/9] bg-gradient-to-br from-ink-100 to-brand-50 flex items-center justify-center relative">
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <div className="relative z-10 text-center">
                <MapPin className="w-12 h-12 text-brand-600 mx-auto mb-3" strokeWidth={1} />
                <p className="text-ink-700 font-medium">Av. Paulista, 1000</p>
                <p className="text-ink-500 text-sm">São Paulo, SP</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="bg-white rounded-3xl shadow-xl border border-ink-100 p-8 md:p-10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 text-green-600 mb-6">
                    <Check className="w-10 h-10" strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-semibold text-ink-900 mb-3">
                    Mensagem enviada!
                  </h3>
                  <p className="text-ink-600 max-w-sm mx-auto">
                    Obrigado pelo contato. Nossa equipe responderá em até 24
                    horas.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-outline mt-8"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-semibold text-ink-900 mb-2">
                    Agende sua consulta
                  </h3>
                  <p className="text-ink-500 mb-8 text-sm">
                    Preencha o formulário abaixo e entraremos em contato.
                  </p>
                  <form
                    className="space-y-5"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-ink-700 mb-2">Nome completo</label>
                        <input type="text" required placeholder="Seu nome" className="input-field" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink-700 mb-2">Telefone</label>
                        <input type="tel" required placeholder="(11) 99999-9999" className="input-field" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink-700 mb-2">E-mail</label>
                      <input type="email" required placeholder="seu@email.com" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink-700 mb-2">Área de interesse</label>
                      <select required className="input-field" defaultValue="">
                        <option value="" disabled>Selecione uma área</option>
                        <option>Direito Civil</option>
                        <option>Direito Penal</option>
                        <option>Direito Trabalhista</option>
                        <option>Direito Imobiliário</option>
                        <option>Direito Digital & LGPD</option>
                        <option>Direito Empresarial</option>
                        <option>Direito Tributário</option>
                        <option>Outro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink-700 mb-2">Mensagem</label>
                      <textarea
                        rows={5}
                        required
                        placeholder="Descreva brevemente sua situação..."
                        className="input-field resize-none"
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full">
                      Enviar Mensagem
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-xs text-ink-400 text-center">
                      Suas informações são confidenciais e protegidas pela LGPD.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
