import { Link } from 'react-router-dom';
import {
  Scale,
  Shield,
  Users,
  Award,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Gavel,
  Building2,
  Laptop,
  Receipt,
  Home as HomeIcon,
  Briefcase,
  AlertTriangle,
  HeartHandshake,
} from 'lucide-react';
import CTASection from '@/components/CTASection';

const areaCards = [
  { icon: Users, label: 'Direito Civil', path: '/direito-civil', desc: 'Contratos, sucessões, responsabilidade civil e direitos do consumidor.' },
  { icon: Gavel, label: 'Direito Penal', path: '/direito-penal', desc: 'Defesa criminal em todas as fases, do inquérito ao tribunal do júri.' },
  { icon: Briefcase, label: 'Direito Trabalhista', path: '/direito-trabalhista', desc: 'Defesa de empregados e empregadores em conflitos laborais.' },
  { icon: HomeIcon, label: 'Direito Imobiliário', path: '/direito-imobiliario', desc: 'Contratos, locação, usucapião e regularização de imóveis.' },
  { icon: Laptop, label: 'Direito Digital & LGPD', path: '/direito-digital', desc: 'Proteção de dados, crimes digitais e conformidade com a LGPD.' },
  { icon: Building2, label: 'Direito Empresarial', path: '/direito-empresarial', desc: 'Consultoria e contencioso para empresas e negócios.' },
  { icon: Receipt, label: 'Direito Tributário', path: '/direito-tributario', desc: 'Planejamento tributário, defesa fiscal e recuperação de créditos.' },
];

const values = [
  {
    icon: Shield,
    title: 'Sigilo Absoluto',
    desc: 'Tratamos cada caso com confidencialidade total. Suas informações estão sempre protegidas.',
  },
  {
    icon: Award,
    title: 'Excelência Técnica',
    desc: 'Equipe altamente qualificada, em constante atualização jurídica e comprometida com resultados.',
  },
  {
    icon: HeartHandshake,
    title: 'Atenção Humana',
    desc: 'Cada cliente é único. Ouvimos sua história e construímos a estratégia mais adequada para você.',
  },
];

const stats = [
  { value: '15+', label: 'Anos de experiência' },
  { value: '2.500+', label: 'Casos atendidos' },
  { value: '98%', label: 'Clientes satisfeitos' },
  { value: '7', label: 'Áreas de atuação' },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-ink-950 via-ink-900 to-brand-950">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Glows */}
        <div className="absolute -top-40 -right-20 w-[600px] h-[600px] bg-brand-600/20 rounded-full blur-[130px]" />
        <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] bg-brand-800/20 rounded-full blur-[120px]" />

        <div className="container-page relative z-10 pt-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-brand-200 mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
              Escritório de Advocacia Completo
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] text-balance animate-fade-in-up">
              Seus direitos,
              <br />
              <span className="text-brand-400">nossa missão.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-ink-300 leading-relaxed max-w-2xl animate-fade-in-up animate-delay-200">
              A AceMimi Advocacia une técnica jurídica de excelência com
              atendimento humano. Defendemos seus interesses com estratégia,
              ética e dedicação em todas as áreas do direito.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-300">
              <Link to="/contato" className="btn-primary">
                Agendar Consulta
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/quem-somos"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white font-medium text-sm tracking-wide transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
              >
                Conheça o Escritório
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-ink-950/50 backdrop-blur-sm">
          <div className="container-page py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="text-center md:text-left">
                  <div className="text-3xl md:text-4xl font-serif font-semibold text-white">
                    {s.value}
                  </div>
                  <div className="text-sm text-ink-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-label">Bem-vindo à AceMimi</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mt-4 text-ink-900 leading-tight text-balance">
              Advocacia que une tradição e modernidade
            </h2>
            <p className="mt-6 text-lg text-ink-600 leading-relaxed">
              Há mais de 15 anos, a AceMimi Advocacia constrói uma reputação
              baseada em confiança, resultados e atendimento próximo. Nosso
              time de advogados experientes atua em múltiplas áreas do direito,
              oferecendo soluções jurídicas personalizadas para cada cliente.
            </p>
            <p className="mt-4 text-ink-600 leading-relaxed">
              Acreditamos que o acesso à justiça deve ser claro e transparente.
              Por isso, comunicamos de forma simples, sem jargões, e mantemos
              você informado em cada etapa do processo.
            </p>
            <div className="mt-8">
              <Link to="/quem-somos" className="btn-outline">
                Nossa História
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-brand-100 to-brand-50 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Scale className="w-32 h-32 text-brand-300" strokeWidth={0.5} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-ink-950/80 to-transparent">
                <p className="text-white font-serif text-2xl italic">
                  "A justiça é a constante e perpétua vontade de dar a cada um o
                  que é seu."
                </p>
                <p className="text-brand-300 text-sm mt-2">— Ulpiano</p>
              </div>
            </div>
            {/* Floating card */}
            <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-ink-100 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-50 text-brand-700">
                  <Shield className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink-900">OAB/SP</div>
                  <div className="text-xs text-ink-500">Registro ativo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-24 bg-ink-50">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-label">Áreas de Atuação</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mt-4 text-ink-900">
              Especialidades que cobrem todas as suas necessidades
            </h2>
            <p className="mt-4 text-lg text-ink-600 leading-relaxed">
              Atendemos em sete áreas do direito, com profissionais dedicados e
              especializados em cada uma delas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areaCards.map((area, i) => (
              <Link
                key={area.path}
                to={area.path}
                className="group card p-8 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-50 text-brand-700 mb-5 transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-white">
                  <area.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-ink-900 mb-2">
                  {area.label}
                </h3>
                <p className="text-sm text-ink-600 leading-relaxed">
                  {area.desc}
                </p>
                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-brand-700 transition-all duration-300 group-hover:gap-3">
                  Saiba mais
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
            {/* 8th card - CTA */}
            <div className="group card p-8 bg-gradient-to-br from-brand-700 to-brand-900 border-0 text-white">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 text-white mb-5">
                <AlertTriangle className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Não encontrou sua área?</h3>
              <p className="text-sm text-brand-100 leading-relaxed mb-5">
                Entre em contato. Atendemos casos em diversas outras frentes do
                direito.
              </p>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 text-sm font-medium text-white transition-all duration-300 group-hover:gap-3"
              >
                Fale conosco
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-label">Nossos Valores</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mt-4 text-ink-900">
              O que nos diferencia
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-50 text-brand-700 mb-6">
                  <v.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-ink-900 mb-3">
                  {v.title}
                </h3>
                <p className="text-ink-600 leading-relaxed max-w-xs mx-auto">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact preview */}
      <section className="py-24 bg-ink-50">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label">Fale Conosco</span>
              <h2 className="text-3xl md:text-4xl font-semibold mt-4 text-ink-900 mb-6">
                Estamos prontos para ouvir você
              </h2>
              <p className="text-ink-600 leading-relaxed mb-8">
                Agende uma consulta inicial sem compromisso. Nossa equipe
                entrará em contato em até 24 horas.
              </p>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white text-brand-700 shadow-sm">
                    <Phone className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-sm text-ink-500">Telefone</div>
                    <div className="text-ink-900 font-medium">+55 (11) 4000-1234</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white text-brand-700 shadow-sm">
                    <Mail className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-sm text-ink-500">E-mail</div>
                    <div className="text-ink-900 font-medium">contato@acemimi.adv.br</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white text-brand-700 shadow-sm">
                    <MapPin className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-sm text-ink-500">Endereço</div>
                    <div className="text-ink-900 font-medium">Av. Paulista, 1000 — São Paulo, SP</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-ink-100">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function ContactForm() {
  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="block text-sm font-medium text-ink-700 mb-2">Nome</label>
        <input type="text" placeholder="Seu nome completo" className="input-field" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink-700 mb-2">E-mail</label>
          <input type="email" placeholder="seu@email.com" className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-700 mb-2">Telefone</label>
          <input type="tel" placeholder="(11) 99999-9999" className="input-field" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-ink-700 mb-2">Mensagem</label>
        <textarea
          rows={4}
          placeholder="Conte-nos brevemente sobre seu caso..."
          className="input-field resize-none"
        />
      </div>
      <button type="submit" className="btn-primary w-full">
        Enviar Mensagem
        <ArrowRight className="w-4 h-4" />
      </button>
      <p className="text-xs text-ink-400 text-center">
        Responderemos em até 24 horas. Suas informações são confidenciais.
      </p>
    </form>
  );
}
