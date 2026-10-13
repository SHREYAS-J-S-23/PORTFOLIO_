// ============================================================
// content.ts — Single source of truth for all portfolio data
// Edit this file to update copy, links, projects, and skills.
// ============================================================

export const siteConfig = {
  name: 'Shreyas J S',
  wordmark: { main: 'SHREYAS', accent: 'J S' },
  tagline: 'Building intelligent experiences at the intersection of AI and code.',
  location: { lat: '12.9716° N', lon: '77.5946° E' },
  email: 'shreyasjs@example.com',
  github: 'https://github.com/shreyasjs',
  linkedin: 'https://linkedin.com/in/shreyasjs',
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || 'https://formspree.io/f/placeholder',
};

export const navLinks = [
  { id: 'about', label: 'ABOUT', index: '01' },
  { id: 'skills', label: 'SKILLS', index: '02' },
  { id: 'projects', label: 'PROJECTS', index: '03' },
  { id: 'experience', label: 'EXPERIENCE', index: '04' },
  { id: 'achievements', label: 'ACHIEVEMENTS', index: '05' },
  { id: 'journey', label: 'JOURNEY', index: '06' },
  { id: 'contact', label: 'CONTACT', index: '07' },
];

export const aboutFeatures = [
  {
    index: '01',
    title: 'Full Stack Engineering',
    icon: '⬡',
    description: 'Building end-to-end products from UI to infrastructure, with React, Node, and modern cloud tooling.',
  },
  {
    index: '02',
    title: 'AI & Intelligent Systems',
    icon: '◈',
    description: 'Designing context-aware AI pipelines using RAG, LangChain, LLMs, and voice workflows.',
  },
  {
    index: '03',
    title: 'Problem Solving & Products',
    icon: '◎',
    description: 'Turning complex problems into intuitive, user-focused software that delivers real impact.',
  },
];

export const skillCategories = [
  {
    id: 'frontend',
    index: '01',
    label: 'Frontend / UI',
    icon: '</>',
    skills: [
      { id: '01', name: 'HTML5' },
      { id: '02', name: 'CSS3' },
      { id: '03', name: 'JavaScript' },
      { id: '04', name: 'TypeScript' },
      { id: '05', name: 'React.js' },
      { id: '06', name: 'Tailwind CSS' },
      { id: '07', name: 'Next.js' },
      { id: '08', name: 'Framer Motion' },
    ],
  },
  {
    id: 'backend',
    index: '02',
    label: 'Backend Systems',
    icon: '{ }',
    skills: [
      { id: '01', name: 'Node.js' },
      { id: '02', name: 'Express.js' },
      { id: '03', name: 'Django REST' },
      { id: '04', name: 'FastAPI' },
      { id: '05', name: 'REST APIs' },
      { id: '06', name: 'Supabase' },
      { id: '07', name: 'PostgreSQL' },
      { id: '08', name: 'Razorpay' },
    ],
  },
  {
    id: 'ai',
    index: '03',
    label: 'AI / Generative',
    icon: '∿∿',
    skills: [
      { id: '01', name: 'RAG' },
      { id: '02', name: 'LangChain' },
      { id: '03', name: 'LangGraph' },
      { id: '04', name: 'LLMs' },
      { id: '05', name: 'AI Agents' },
      { id: '06', name: 'Voice Workflows' },
      { id: '07', name: 'Prompt Eng.' },
      { id: '08', name: 'Embeddings' },
    ],
  },
  {
    id: 'data',
    index: '04',
    label: 'Data / Tools',
    icon: '⊞',
    skills: [
      { id: '01', name: 'SQL' },
      { id: '02', name: 'MongoDB' },
      { id: '03', name: 'Supabase' },
      { id: '04', name: 'Git' },
      { id: '05', name: 'Docker' },
      { id: '06', name: 'Linux' },
      { id: '07', name: 'Postman' },
      { id: '08', name: 'Firebase' },
    ],
  },
];

export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  color: string;
  borderColor: string;
  iconShape: 'asterisk' | 'arrow' | 'diamond' | 'ring';
  description: string;
  tags: string[];
  projectUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    id: 'raitha-mitra',
    index: '01',
    title: 'Raitha Mitra',
    category: 'AI-POWERED SMART FARMING',
    color: '#D5EBB0',
    borderColor: '#b8d98a',
    iconShape: 'asterisk',
    description:
      'A digital agriculture companion that turns complex farm data into practical, farmer-focused guidance — crop recommendations, disease detection, and yield predictions.',
    tags: ['React', 'Tailwind', 'AI / ML', 'APIs'],
    projectUrl: '#',
    liveUrl: '#',
  },
  {
    id: 'ekart',
    index: '02',
    title: 'EKART',
    category: 'E-COMMERCE WEB + MOBILE',
    color: '#C3E0F5',
    borderColor: '#93c5e8',
    iconShape: 'arrow',
    description:
      'Contributed across application workflows, debugging, backend integration, and Razorpay payment functionality during my internship at Preflex Solution.',
    tags: ['Product', 'APIs', 'Payments', 'Debugging'],
    projectUrl: '#',
    liveUrl: '#',
  },
  {
    id: 'crime-record-ms',
    index: '03',
    title: 'Crime Record MS',
    category: 'STRUCTURED DIGITAL SYSTEMS',
    color: '#CDBFFA',
    borderColor: '#a98ef5',
    iconShape: 'diamond',
    description:
      'A database-backed system for managing criminal records, FIR information, and administrative workflows — built for reliability and clarity.',
    tags: ['Supabase', 'Admin', 'Data', 'Workflows'],
    projectUrl: '#',
    liveUrl: '#',
  },
  {
    id: 'rag-voice-agent',
    index: '04',
    title: 'RAG Voice Agent',
    category: 'CONTEXT-AWARE AI ASSISTANT',
    color: '#F5CDB0',
    borderColor: '#e8a87a',
    iconShape: 'ring',
    description:
      'A voice workflow combining language models and retrieval-augmented generation to answer questions with highly relevant, grounded context.',
    tags: ['RAG', 'LangGraph', 'LLMs', 'Voice'],
    projectUrl: '#',
    liveUrl: '#',
  },
];

export const experienceItems = [
  {
    id: 'preflex',
    mono: 'INTERN',
    title: 'Software Development Intern',
    company: 'Preflex Solution',
    period: '2024',
    description:
      'Worked on EKART — a full-featured e-commerce platform. Contributed across web and mobile application workflows, resolved technical bugs, integrated Razorpay payment functionality, and collaborated on backend service improvements.',
  },
  {
    id: 'self-learning',
    mono: 'ONGOING PRACTICE',
    title: 'Exploring AI Systems',
    company: 'Building in Public',
    period: '2024 – Present',
    description:
      'Independently building RAG pipelines, LLM-powered applications, and AI agents. Participating in hackathons, shipping side projects, and deepening expertise in agentic AI, voice workflows, and modern software architecture.',
  },
];

export const achievements = [
  {
    id: 'hackring',
    mono: 'WINNER / HACKRING 2.0',
    title: 'Built fast. Built together.',
    icon: '🏆',
    description:
      'Won HackRing 2.0 at RVITM with teammates — turning an idea into a working product under intense time pressure. A reminder that the best solutions come from focused collaboration.',
  },
  {
    id: 'infothon',
    mono: 'PARTICIPANT / INFOTHON 4.0',
    title: 'Technology with purpose.',
    icon: '✦',
    description:
      'Participated with Raitha Mitra — an AI-powered smart farming assistant focused on crop recommendation, yield prediction, disease detection, and farmer-first guidance.',
  },
];

export const journeySteps = [
  {
    index: '01',
    title: 'Information Science Engineering',
    caption: 'Learning the foundations — Dayananda Sagar College of Engineering, Bengaluru',
  },
  {
    index: '02',
    title: 'Full-Stack Development',
    caption: 'Building web + mobile products with React, Node, and modern tooling',
  },
  {
    index: '03',
    title: 'Backend Frameworks & APIs',
    caption: 'Designing reliable, scalable systems with Django, FastAPI, and REST',
  },
  {
    index: '04',
    title: 'RAG, LLMs & AI Agents',
    caption: "Exploring what's next — agentic AI, voice workflows, and intelligent systems",
  },
];

export const marqueeItems = [
  'FULL STACK DEVELOPMENT',
  'AI ENGINEERING',
  'REACT + TYPESCRIPT',
  'LLM APPLICATIONS',
  'RAG PIPELINES',
  'API DESIGN',
  'PROBLEM SOLVING',
  'BUILDING IN PUBLIC',
];
