import type { AreaData } from '@/components/AreaPage';

export const areaData: Record<string, AreaData> = {
  civil: {
    title: 'Direito Civil',
    subtitle:
      'Soluções jurídicas completas para questões contratuais, responsabilidade civil, sucessões e direitos do consumidor.',
    crumb: 'Direito Civil',
    description:
      'O Direito Civil é o ramo que mais impacta o dia a dia das pessoas. Na AceMimi, atuamos com profundidade técnica e sensibilidade humana, orientando clientes em questões que vão desde contratos e responsabilidade civil até heranças e disputas familiares. Nossa abordagem prioriza a resolução eficiente, seja por via negociada ou judicial, sempre protegendo seus direitos e interesses.',
    services: [
      'Contratos cíveis em geral',
      'Responsabilidade civil e indenizações',
      'Direito do consumidor',
      'Direito sucessório e inventários',
      'Usucapião e posse',
      'Reparação de danos morais e materiais',
    ],
    faqs: [
      {
        q: 'Quanto tempo tenho para entrar com uma ação de indenização?',
        a: 'O prazo prescricional varia conforme o tipo de dano. Em regra, ações por reparação civil prescrevem em 3 anos, mas casos específicos podem ter pratos diferentes. Consulte-nos o quanto antes para não perder seus direitos.',
      },
      {
        q: 'É possível fazer um inventário sem ir a juízo?',
        a: 'Sim. Inventários extrajudiciais são possíveis quando todos os herdeiros são maiores, capazes e há concordância. É um processo mais rápido e realizado em cartório, com assistência de um advogado.',
      },
      {
        q: 'Como funciona o direito do consumidor em compras online?',
        a: 'O consumidor tem proteção ampla pelo CDC, incluindo direito de arrependimento em 7 dias para compras online, garantia legal e contratual, e inversão do ônus da prova em casos de vulnerabilidade.',
      },
    ],
  },
  penal: {
    title: 'Direito Penal',
    subtitle:
      'Defesa criminal rigorosa com acompanhamento em todas as fases do processo, do inquérito ao tribunal do júri.',
    crumb: 'Direito Penal',
    description:
      'A defesa no Direito Penal exige técnica, estratégia e total compromisso com o cliente. Atuamos desde a fase de inquérito policial, passando por audiências de custódia, processos judiciais e tribunais do júri. Garantimos que todos os direitos constitucionais do acusado sejam respeitados, com uma linha de defesa construída a partir de análise minuciosa do caso e das provas.',
    services: [
      'Defesa em processos criminais',
      'Habeas corpus',
      'Tribunais do júri',
      'Inquéritos policiais',
      'Liberdade provisória',
      'Execução penal e progressão de regime',
    ],
    faqs: [
      {
        q: 'O que fazer se eu for preso em flagrante?',
        a: 'Exija a presença de um advogado imediatamente. Você tem direito a audiência de custódia em até 24h, onde um juiz avaliará a legalidade da prisão. Não assine nada sem orientação jurídica.',
      },
      {
        q: 'O que é habeas corpus e quando pode ser usado?',
        a: 'Habeas corpus é um remédio constitucional para proteger a liberdade de locomoção. Pode ser usado quando alguém sofre ou está ameaçada de sofrer constrangimento ilegal, como prisões irregulares ou excesso de prazo.',
      },
      {
        q: 'É possível recorrer de uma condenação?',
        a: 'Sim. Toda condenação pode ser recorrida. Existem recursos para tribunais superiores (STJ e STF) e revisão criminal em casos de provas novas. O prazo para recurso é curto, por isso a orientação rápida é essencial.',
      },
    ],
  },
  trabalhista: {
    title: 'Direito Trabalhista',
    subtitle:
      'Defesa de empregados e empregadores em conflitos laborais, acordos e compliance trabalhista.',
    crumb: 'Direito Trabalhista',
    description:
      'O Direito Trabalhista regula as relações entre empregados e empregadores. Representamos ambas as partes: trabalhadores que tiveram direitos violados e empresas que precisam de orientação estratégica para evitar passivos trabalhistas. Atuamos em reclamações, acordos, rescisões, assédio moral, horas extras e muito mais, sempre buscando a solução mais eficiente.',
    services: [
      'Reclamações trabalhistas',
      'Acordos e negociações',
      'Verbas rescisórias',
      'Assédio moral e sexual',
      'Horas extras e adicional noturno',
      'Compliance trabalhista para empresas',
    ],
    faqs: [
      {
        q: 'Fui demitido sem justa causa, quais direitos tenho?',
        a: 'Você tem direito a aviso prévio, férias + 1/3, 13º proporcional, saldo de salário, FGTS com multa de 40%, e seguro-desemprego. O pagamento deve ser feito em até 10 dias após a rescisão.',
      },
      {
        q: 'Posso entrar com processo trabalhista depois de demitido?',
        a: 'Sim. O prazo prescricional é de 2 anos após a demissão. Dentro desse período, você pode reclamar direitos dos últimos 5 anos do contrato. Quanto antes buscar um advogado, melhor.',
      },
      {
        q: 'Como evitar processos trabalhistas na minha empresa?',
        a: 'Investir em compliance trabalhista: contratos claros, pagamentos em dia, controles de jornada adequados e políticas internas bem definidas. Oferecemos consultoria preventiva para empresas.',
      },
    ],
  },
  imobiliario: {
    title: 'Direito Imobiliário',
    subtitle:
      'Assessoria completa em contratos, locações, compra e venda, regularização e disputas imobiliárias.',
    crumb: 'Direito Imobiliário',
    description:
      'O Direito Imobiliário envolve questões de grande valor e impacto financeiro. Cuidamos de toda a parte jurídica de contratos de compra e venda, locação, financiamento, regularização de imóveis, usucapião e disputas possessórias. Nossa atuação garante segurança jurídica em cada etapa da transação, protegendo seu patrimônio e evitando prejuízos futuros.',
    services: [
      'Contratos de compra e venda',
      'Locação residencial e comercial',
      'Regularização de imóveis',
      'Usucapião',
      'Distratos e rescisões contratuais',
      'Disputas possessórias e despejo',
    ],
    faqs: [
      {
        q: 'O que é usucapião e como funciona?',
        a: 'Usucapião é o modo de aquisição de propriedade pela posse contínua e sem oposição por um determinado tempo. Pode ser urbano (5 a 15 anos) ou rural. Hoje é possível fazer usucapião extrajudicial em cartório.',
      },
      {
        q: 'Posso quebrar um contrato de aluguel antes do prazo?',
        a: 'Depende do tipo de contrato. Em locações residenciais com prazo determinado, a quebra pode gerar multa. Em casos de denúncia antecipada, há regras específicas. Analisamos seu contrato para orientar a melhor saída.',
      },
      {
        q: 'Quais cuidados devo ter ao comprar um imóvel?',
        a: 'Verificar a matrícula, certidões de ônus, situação fiscal do imóvel, e a regularidade do vendedor. Sempre recomendamos análise jurídica antes da assinatura de qualquer compromisso.',
      },
    ],
  },
  digital: {
    title: 'Direito Digital & LGPD',
    subtitle:
      'Proteção de dados, crimes digitais, contratos de tecnologia e conformidade com a LGPD.',
    crumb: 'Direito Digital & LGPD',
    description:
      'O mundo digital criou novas fronteiras jurídicas. Atuamos em conformidade com a Lei Geral de Proteção de Dados (LGPD), crimes cibernéticos, vazamentos de dados, contratos de tecnologia, e-commerce, direitos da personalidade online e remoção de conteúdo. Ajudamos empresas e indivíduos a navegar com segurança no ambiente digital.',
    services: [
      'Conformidade com a LGPD',
      'Vazamento de dados',
      'Crimes cibernéticos',
      'Contratos de tecnologia e SaaS',
      'Direito ao esquecimento',
      'Remoção de conteúdo e difamação online',
    ],
    faqs: [
      {
        q: 'O que é a LGPD e ela afeta minha empresa?',
        a: 'A LGPD (Lei 13.709/2018) regula o tratamento de dados pessoais. Toda empresa que coleta, armazena ou processa dados precisa estar em conformidade, com políticas claras, consentimento dos titulares e medidas de segurança.',
      },
      {
        q: 'Meus dados foram vazados, o que posso fazer?',
        a: 'Você pode exigir explicações da empresa responsável, solicitar indenização por danos morais, e notificar a ANPD. O vazamento deve ser comunicado pela empresa em prazo razoável. Busque um advogado para orientação.',
      },
      {
        q: 'Como remover conteúdo ofensivo sobre mim na internet?',
        a: 'Existem vias extrajudiciais (notificação às plataformas) e judiciais (ordem de remoção). Em casos de difamação ou exposição indevida, é possível obter remoção rápida e indenização. O direito ao esquecimento também se aplica em certos casos.',
      },
    ],
  },
  empresarial: {
    title: 'Direito Empresarial',
    subtitle:
      'Consultoria e contencioso para empresas: contratos, societário, fusões, recuperação judicial e mais.',
    crumb: 'Direito Empresarial',
    description:
      'O Direito Empresarial é a espinha dorsal jurídica de qualquer negócio. Oferecemos consultoria preventiva e atuação contenciosa em contratos empresariais, direito societário, fusões e aquisições, recuperação judicial, franquias, e disputas comerciais. Nosso objetivo é proteger a operação da sua empresa e permitir seu crescimento com segurança jurídica.',
    services: [
      'Contratos empresariais',
      'Direito societário',
      'Fusões e aquisições (M&A)',
      'Recuperação judicial e extrajudicial',
      'Franquias e representação comercial',
      'Disputas comerciais e arbitragem',
    ],
    faqs: [
      {
        q: 'Qual tipo societário devo escolher para minha empresa?',
        a: 'Depende do porte, número de sócios, ramo de atuação e objetivos. As opções incluem LTDA, S.A., EIRELI e MEI. Cada uma tem implicações em responsabilidade, tributação e governança. Fazemos uma análise personalizada para recomendar a melhor estrutura.',
      },
      {
        q: 'O que é recuperação judicial e quando usá-la?',
        a: 'É um mecanismo legal que permite a empresas em crise financeira reorganizar suas dívidas para continuar operando. É usada quando a empresa é viável, mas enfrenta problemas de liquidez. Requer aprovação judicial e plano de recuperação.',
      },
      {
        q: 'Como proteger minha empresa em contratos comerciais?',
        a: 'Contratos bem redigidos com cláusulas de confidencialidade, não concorrência, foro, multas e condições de rescisão são essenciais. Oferecemos revisão e elaboração de contratos sob medida para cada tipo de operação.',
      },
    ],
  },
  tributario: {
    title: 'Direito Tributário',
    subtitle:
      'Planejamento tributário, defesa em autuações fiscais, recuperação de créditos e contencioso tributário.',
    crumb: 'Direito Tributário',
    description:
      'O Direito Tributário é uma das áreas mais complexas e impactantes para empresas e indivíduos. Atuamos em planejamento tributário, defesa em autuações fiscais, recuperação de créditos tributários, contestação de tributos indevidos e regularização fiscal. Nossa estratégia combina conhecimento técnico profundo com visão prática para reduzir a carga tributária de forma legal e segura.',
    services: [
      'Planejamento tributário',
      'Defesa em autuações fiscais',
      'Recuperação de créditos tributários',
      'Contestação de tributos',
      'Regularização fiscal',
      'Consultoria em ICMS, ISS, IRPJ e PIS/COFINS',
    ],
    faqs: [
      {
        q: 'É possível reduzir legalmente a carga tributária da minha empresa?',
        a: 'Sim. Através de planejamento tributário — escolha do regime adequado, aproveitamento de incentivos fiscais, e interpretação correta da legislação. Tudo dentro da legalidade, com análise técnica e estratégia personalizada.',
      },
      {
        q: 'Recebi uma autuação fiscal, o que fazer?',
        a: 'Não pague imediatamente. Muitas autuações têm erros formais ou de mérito que podem ser contestados. Você tem prazos curtos para defesa (geralmente 30 dias para impugnação administrativa). Busque um advogado tributarista imediatamente.',
      },
      {
        q: 'O que é recuperação de créditos tributários?',
        a: 'São valores pagos indevidamente a título de impostos que podem ser compensados ou restituídos. Incluem tributos pagos a mais, com base em lei posteriormente declarada inconstitucional, ou com erro de cálculo. A análise pode recuperar valores significativos.',
      },
    ],
  },
};
