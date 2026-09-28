import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import { Target, Eye, Heart, Award, Users, Scale, Briefcase, GraduationCap } from 'lucide-react';

const team = [
  { name: 'Dr. Antonio Mimi', role: 'Sócio Fundador — Direito Civil e Empresarial', initials: 'AM' },
  { name: 'Dra. Carla Acevedo', role: 'Sócia — Direito Penal e Tributário', initials: 'CA' },
  { name: 'Dr. Roberto Silva', role: 'Advogado — Direito Trabalhista', initials: 'RS' },
  { name: 'Dra. Marina Costa', role: 'Advogada — Direito Digital & LGPD', initials: 'MC' },
];

const milestones = [
  { year: '2010', title: 'Fundação', desc: 'AceMimi Advocacia é fundada em São Paulo.' },
  { year: '2015', title: 'Expansão', desc: 'Ampliação das áreas de atuação e equipe.' },
  { year: '2020', title: 'Digital', desc: 'Inauguração do núcleo de Direito Digital e LGPD.' },
  { year: '2025', title: 'Reconhecimento', desc: 'Mais de 2.500 casos atendidos com 98% de satisfação.' },
];

export default function About() {
  return (
    <>
      <PageHero
        title="Quem Somos"
        subtitle="Conheça a história, valores e equipe por trás da AceMimi Advocacia — um escritório construído sobre ética, técnica e resultados."
        crumbs={[{ label: 'Quem Somos' }]}
      />

      {/* Story */}
      <section className="py-20">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-label">Nossa História</span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-4 text-ink-900 mb-6">
              Uma trajetória de confiança
            </h2>
            <div className="space-y-4 text-ink-600 leading-relaxed">
              <p>
                A AceMimi Advocacia nasceu em 2010, da visão de seus sócios
                fundadores de criar um escritório que combinasse excelência
                técnica jurídica com atendimento verdadeiramente humano. Desde
                então, crescemos para atender milhares de clientes em sete áreas
                do direito.
              </p>
              <p>
                Acreditamos que cada caso é único e merece atenção individual.
                Por isso, mantemos uma estrutura enxuta e ágil, onde cada
                cliente tem acesso direto ao advogado responsável por seu caso —
                sem intermediários, sem burocracia.
              </p>
              <p>
                Nossa missão é simples: proteger seus direitos com estratégia,
                ética e dedicação, comunicando de forma clara e transparente em
                cada etapa.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-brand-700 to-ink-950 p-12 flex items-center justify-center relative overflow-hidden">
              <div className="absolute -top-20 -right-10 w-[300px] h-[300px] bg-white/10 rounded-full blur-[80px]" />
              <Scale className="w-40 h-40 text-white/20 relative z-10" strokeWidth={0.5} />
              <div className="absolute bottom-8 left-8 right-8 z-10">
                <div className="text-white font-serif text-3xl font-semibold">
                  AceMimi
                </div>
                <div className="text-brand-300 text-sm mt-1">Advocacia & Consultoria</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-20 bg-ink-50">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Missão', desc: 'Prover soluções jurídicas de excelência, com ética e dedicação, garantindo aos clientes segurança e tranquilidade.' },
              { icon: Eye, title: 'Visão', desc: 'Ser referência em advocacia multidisciplinar, reconhecida pela qualidade técnica e pelo atendimento humano.' },
              { icon: Heart, title: 'Valores', desc: 'Ética, transparência, compromisso com o cliente, atualização constante e respeito à justiça.' },
            ].map((item, i) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-8 border border-ink-100 shadow-sm animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-50 text-brand-700 mb-5">
                  <item.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-ink-900 mb-3">{item.title}</h3>
                <p className="text-ink-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-label">Nossa Trajetória</span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-4 text-ink-900">
              Marcos da AceMimi
            </h2>
          </div>
          <div className="relative">
            {/* Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-ink-200 md:-translate-x-1/2" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex items-start gap-8 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-brand-600 ring-4 ring-white md:-translate-x-1/2 mt-2" />
                  {/* Content */}
                  <div className={`pl-12 md:pl-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-white rounded-2xl p-6 border border-ink-100 shadow-sm">
                      <div className="text-2xl font-serif font-semibold text-brand-700">{m.year}</div>
                      <h3 className="text-lg font-semibold text-ink-900 mt-2">{m.title}</h3>
                      <p className="text-sm text-ink-600 mt-2">{m.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-ink-50">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-label">Nossa Equipe</span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-4 text-ink-900">
              Profissionais dedicados ao seu caso
            </h2>
            <p className="mt-4 text-ink-600 leading-relaxed">
              Cada membro do nosso time é especialista em sua área, com
              formação sólida e paixão pela advocacia.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl border border-ink-100 shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-ink-900/5 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="aspect-square bg-gradient-to-br from-brand-100 to-brand-50 flex items-center justify-center relative overflow-hidden">
                  <span className="text-5xl font-serif font-semibold text-brand-300 group-hover:scale-110 transition-transform duration-500">
                    {member.initials}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-ink-900">{member.name}</h3>
                  <p className="text-sm text-ink-500 mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Award, value: '15+', label: 'Anos de atuação' },
              { icon: Users, value: '2.500+', label: 'Clientes atendidos' },
              { icon: Briefcase, value: '7', label: 'Áreas de atuação' },
              { icon: GraduationCap, value: '100%', label: 'Advogados pós-graduados' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-50 text-brand-700 mb-4">
                  <stat.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <div className="text-3xl font-serif font-semibold text-ink-900">{stat.value}</div>
                <div className="text-sm text-ink-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
