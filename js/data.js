/**
 * Portfolio Data Configuration
 * Edite este arquivo facilmente para personalizar seu portfólio!
 */
const PORTFOLIO_DATA = {
  profile: {
    name: "Lucas Sales",
    role: "Full Stack Developer",
    bio: "Estudante de Análise e Desenvolvimento de Sistemas e Técnico em Administração, com experiência prática no desenvolvimento de projetos web. Combino conhecimentos de tecnologia, visão de processos e facilidade para resolver problemas. Busco uma oportunidade de estágio em TI para aplicar meus conhecimentos e evoluir profissionalmente.",
    status: "Disponível para oportunidades",
    location: "São Paulo, SP",
    yearsExperience: "Em formação prática",
    availability: "Aberto a Propostas",
    avatar: "perfil.jpg",
    email: "ssales.luca@gmail.com",
    github: "https://github.com/luca-ssales",
    githubUser: "luca-ssales",
    linkedin: "https://www.linkedin.com/in/lucas-sales-236a67375/",
    instagram: "https://www.instagram.com/devl.ucas/",
    tiktok: "https://www.tiktok.com/@devl.ucas",
    whatsapp: "https://wa.me/5511914931921",
    whatsappDisplay: "+55 (11) 91493-1921",
    stats: {
      completedProjects: "8+",
      yearsExperience: "Em formação",
      codeQuality: "99.4%",
      commitsThisYear: "1.420"
    }
  },

  // Projetos que aparecem no Card Principal (Hero Carousel)
  featuredProjects: [
    {
      id: "featured-1",
      title: "AstroControl",
      category: "Full Stack",
      date: "Jun 31, 2026",
      badge: "⭐ Projeto em Destaque",
      status: "Em Produção",
      liveStatus: "Live no Render",
      image: "img_project/astrocontrol/capa.png",
      gallery: [
        "img_project/astrocontrol/capa.png",
        "img_project/astrocontrol/1.png",
        "img_project/astrocontrol/2.png",
        "img_project/astrocontrol/3.png",
        "img_project/astrocontrol/4.png",
        "img_project/astrocontrol/5.png",
        "img_project/astrocontrol/6.png",
        "img_project/astrocontrol/7.png",
        "img_project/astrocontrol/8.png",
        "img_project/astrocontrol/9.png",
        "img_project/astrocontrol/10.png"
      ],
      stackHighlight: "AstroControl",
      tabs: {
        detalhes: "Sistema de gerenciamento e controle integrado desenvolvido para otimizar processos, autenticação segura e interface intuitiva.",
        tecnologias: [
          { name: "Python", icon: "assets/icons/python.svg" },
          { name: "Flask", icon: "assets/icons/flask.svg" },
          { name: "JavaScript", icon: "assets/icons/javascript.svg" },
          { name: "HTML5", icon: "assets/icons/html5.svg" },
          { name: "CSS3", icon: "assets/icons/css3.svg" },
          { name: "SQL", icon: "assets/icons/sqlite.svg" }
        ],
        resultados: [
          {
            icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
            title: "Sistema online",
            desc: "Deploy no Render"
          },
          {
            icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
            title: "CRUD completo",
            desc: "Dados integrados"
          },
          {
            icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
            title: "Autenticação",
            desc: "Login de usuários"
          },
          {
            icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
            title: "Gestão",
            desc: "Estoque e vendas"
          }
        ]
      },
      liveUrl: "https://astrocontrol-1.onrender.com/",
      codeUrl: "https://github.com/luca-ssales/AstroControl"
    }
  ],

  // Galeria de Projetos (Grid)
  projects: [
    {
      id: "proj-1",
      title: "Gerador de Ticket",
      category: "Acadêmico",
      tags: "React 19 • TypeScript • Vite • Tailwind CSS 4 • Node.js • Express • API REST • Arquivos JSON • Lucide React • Motion",
      metric: "Live on Render",
      image: "img_project/gerador_ticket/4.png",
      gallery: [
        "img_project/gerador_ticket/4.png",
        "img_project/gerador_ticket/1.png",
        "img_project/gerador_ticket/2.png",
        "img_project/gerador_ticket/3.png",
        "img_project/gerador_ticket/capa.png"
      ],
      likes: 142,
      liked: false,
      desc: "Aplicação Full Stack para emissão e gestão de chamados em tempo real, desenvolvida com React 19, TypeScript, Vite, Tailwind CSS 4, backend em Node.js com Express e persistência via arquivos JSON.",
      liveUrl: "https://gerador-ticket-4kxn.onrender.com/",
      githubUrl: "https://github.com/luca-ssales/Gerador_Ticket"
    },
    {
      id: "proj-2",
      title: "B3 Vision",
      category: "Acadêmico",
      tags: "HTML5 • CSS3 • JavaScript • API REST",
      metric: "Live no Firebase",
      image: "img_project/b3vision/capa.png",
      gallery: [
        "img_project/b3vision/capa.png",
        "img_project/b3vision/1.png",
        "img_project/b3vision/2.png",
        "img_project/b3vision/3.png"
      ],
      likes: 186,
      liked: false,
      desc: "Um dashboard que utiliza uma API para consultar dados de ações da B3, permitindo acompanhar cotações, analisar o desempenho e simular uma carteira de investimentos.",
      liveUrl: "https://b3-vision.web.app/",
      githubUrl: "https://github.com/luca-ssales/B3_Vision"
    },
    {
      id: "proj-3",
      title: "Previsão do Tempo",
      category: "API",
      tags: "HTML5 • CSS3 • JavaScript • API REST",
      metric: "Live no GitHub Pages",
      image: "img_project/clima/capa.png",
      gallery: [
        "img_project/clima/capa.png",
        "img_project/clima/1.png",
        "img_project/clima/2.png",
        "img_project/clima/3.png"
      ],
      likes: 165,
      liked: false,
      desc: "Aplicação web interativa para consulta de clima e previsão meteorológica em tempo real, integrando API de dados climáticos com busca inteligente de cidades.",
      liveUrl: "https://luca-ssales.github.io/Previsao/",
      githubUrl: "https://github.com/luca-ssales/Previsao"
    },
    {
      id: "proj-4",
      title: "Robo-QR Premium",
      category: "Front-end",
      tags: "HTML5 • CSS3 • JavaScript • QRCode API",
      metric: "Live no GitHub Pages",
      image: "img_project/qrcode/capa.png",
      gallery: [
        "img_project/qrcode/capa.png",
        "img_project/qrcode/1.png",
        "img_project/qrcode/2.png",
        "img_project/qrcode/3.png"
      ],
      likes: 138,
      liked: false,
      desc: "Gerador e customizador dinâmico de QR Code com motor de renderização vetorial e Canvas, personalização de cores e download em tempo real.",
      liveUrl: "https://luca-ssales.github.io/Robo-QR/",
      githubUrl: "https://github.com/luca-ssales/Robo-QR"
    },
    {
      id: "proj-5",
      title: "Calculadora Streamlit",
      category: "Acadêmico",
      tags: "Python • Streamlit",
      metric: "Live no Streamlit",
      image: "img_project/cal-stramlit/capa.png",
      gallery: [
        "img_project/cal-stramlit/capa.png"
      ],
      likes: 112,
      liked: false,
      desc: "Calculadora interativa desenvolvida em Python e hospedada na nuvem com Streamlit, com suporte a operações matemáticas e interface ágil.",
      liveUrl: "https://meu-projetinho.streamlit.app/",
      githubUrl: "https://github.com/luca-ssales/Meu-projeto-em-prod"
    },
    {
      id: "proj-6",
      title: "Sensor de Luz Ambiente com LCD",
      category: "IoT",
      tags: "C++ • Arduino • IoT • Sensor LDR • Display LCD I2C",
      metric: "Tinkercad & Arduino",
      image: "img_project/arduino/luz-ambiente/capa.png",
      gallery: [
        "img_project/arduino/luz-ambiente/capa.png",
        "img_project/arduino/luz-ambiente/{5AC32A3B-6F9B-4DDE-9EE0-90E63DB10C61}.png"
      ],
      likes: 154,
      liked: false,
      desc: "Circuito IoT e automação com Arduino Uno integrando sensor fotoresistor LDR, sinalização LED e display LCD 16x2 via comunicação I2C para monitoramento de luminosidade ambiente e exibição de mensagens dinâmicas ('Boa noite' / 'Bom dia').",
      liveUrl: "https://www.tinkercad.com/things/6MfaBpXCZCc-monitor-de-luz-ambiente-com-alerta-visual",
      githubUrl: "https://github.com/luca-ssales/Arduino/tree/main/Arduino-faculdade/luz-ambiente"
    },
    {
      id: "proj-7",
      title: "Monitor de Umidade do Solo com LCD",
      category: "IoT",
      tags: "C++ • Arduino • IoT • Sensor de Umidade • Display LCD I2C • Buzzer",
      metric: "Tinkercad & Arduino",
      image: "img_project/arduino/solo/image.png",
      gallery: [
        "img_project/arduino/solo/image.png"
      ],
      likes: 147,
      liked: false,
      desc: "Sistema IoT e automação com Arduino Uno para monitoramento inteligente da umidade do solo. Integra sensor higrômetro para medição em tempo real, display LCD 16x2 via comunicação I2C para exibição de status, além de alarme sonoro (buzzer) e sinalização LED para aviso de solo seco e acionamento de irrigação.",
      liveUrl: "https://www.tinkercad.com/",
      githubUrl: "https://github.com/luca-ssales/Arduino"
    },
    {
      id: "proj-8",
      title: "KanbanFlow",
      category: "Full Stack",
      tags: "JavaScript • HTML5 • CSS3 • Node.js • LocalStorage • Kanban • Drag & Drop",
      metric: "Live no GitHub Pages",
      image: "img_project/kanban/capa.png",
      gallery: [
        "img_project/kanban/capa.png",
        "img_project/kanban/1.png",
        "img_project/kanban/2.png",
        "img_project/kanban/3.png",
        "img_project/kanban/4.png",
        "img_project/kanban/5.png"
      ],
      likes: 194,
      liked: false,
      desc: "Gerenciador ágil de tarefas e fluxo de trabalho no estilo Kanban. Possui quadro interativo com criação e personalização de colunas e cards com prazos e prioridades, suporte a drag & drop, persistência de dados com LocalStorage e exportação/importação JSON, dashboard com métricas de desempenho e personalizador completo de temas e cores.",
      liveUrl: "https://luca-ssales.github.io/Kanban/",
      githubUrl: "https://github.com/luca-ssales/Kanban"
    }
  ],

  // Habilidades e Tecnologias que Domino
  skills: [
    {
      id: "html",
      name: "HTML5",
      category: "languages",
      categoryLabel: "Linguagem & Estrutura",
      icon: "assets/icons/html5.svg",
      level: "Avançado",
      highlight: "Semântica moderna, acessibilidade (a11y), SEO e estrutura limpa de páginas",
      projectsCount: 8,
      color: "#E34F26"
    },
    {
      id: "css",
      name: "CSS3",
      category: "languages",
      categoryLabel: "Estilos & Design",
      icon: "assets/icons/css3.svg",
      level: "Avançado",
      highlight: "Flexbox, Grid, Animações, Glassmorphism, Layouts fluidos e Responsividade moderna",
      projectsCount: 8,
      color: "#1572B6"
    },
    {
      id: "js",
      name: "JavaScript",
      category: "languages",
      categoryLabel: "Linguagem",
      icon: "assets/icons/javascript.svg",
      level: "Avançado",
      highlight: "ES6+, manipulação dinâmica do DOM, Fetch/Async, Promessas e interatividade",
      projectsCount: 7,
      color: "#F7DF1E"
    },
    {
      id: "python",
      name: "Python",
      category: "languages",
      categoryLabel: "Linguagem",
      icon: "assets/icons/python.svg",
      level: "Intermediário+",
      highlight: "Back-end, automação de scripts, manipulação de dados e integração com web",
      projectsCount: 3,
      color: "#3776AB"
    },
    {
      id: "streamlit",
      name: "Streamlit",
      category: "frameworks",
      categoryLabel: "Framework Python",
      icon: "assets/icons/streamlit.svg",
      level: "Prático",
      highlight: "Construção ágil de dashboards interativos, visualização de dados e interfaces web com Python",
      projectsCount: 1,
      color: "#FF4B4B"
    },
    {
      id: "flask",
      name: "Flask",
      category: "frameworks",
      categoryLabel: "Microframework Back-end",
      icon: "assets/icons/flask.svg",
      level: "Intermediário+",
      highlight: "Desenvolvimento de APIs RESTful, rotas dinâmicas, templates Jinja e autenticação de usuários",
      projectsCount: 2,
      color: "#000000"
    },
    {
      id: "sqlite",
      name: "SQLite",
      category: "databases",
      categoryLabel: "Banco de Dados",
      icon: "assets/icons/sqlite.svg",
      level: "Intermediário+",
      highlight: "Persistência relacional, consultas SQL, modelagem de tabelas e operações CRUD completas",
      projectsCount: 4,
      color: "#003B57"
    },
    {
      id: "iot",
      name: "IoT & Automação",
      category: "iot",
      categoryLabel: "Hardware & IoT",
      icon: "assets/icons/iot.svg",
      level: "Prático",
      highlight: "Sistemas com microcontroladores (Arduino), sensores de umidade de solo e display LCD 16x2",
      projectsCount: 2,
      color: "#06B6D4"
    },
    {
      id: "git",
      name: "Git & GitHub",
      category: "tools",
      categoryLabel: "Versionamento & Git",
      icon: "assets/icons/git.svg",
      level: "Avançado",
      highlight: "Controle de versão, commits atômicos, branches, pull requests, merges e GitHub Pages",
      projectsCount: 8,
      color: "#F05032"
    }
  ],

  // Histórico Profissional / Experiências
  history: [
    { role: "Desenvolvedor Full Stack Sênior", company: "Tech Innovations", year: "2024 - Atual" },
    { role: "Engenheiro Front-end Pleno", company: "Digital Studio Inc", year: "2022 - 2024" },
    { role: "Desenvolvedor Web & UI Designer", company: "Creative Labs", year: "2020 - 2022" }
  ]
};
