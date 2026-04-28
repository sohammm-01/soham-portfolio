export const profile = {
  name: 'Soham',
  tagline: 'I Turn Problems Into Products',
  heroSubtext: 'Product Manager · Builder · Data-Driven Thinker',
  heroBody:
    "Hi, I'm Soham. I shipped a live POS system, solo, from idea to deployment, while studying full-time. Now I'm looking for a team where I can bring that same ownership to product.",
  location: 'Manipal, India',
  availability: 'AVAILABLE\nFOR WORK\nFULL TIME',
}

export const about = {
  eyebrow: 'A FEW THINGS ABOUT ME',
  body:
    "I shipped a fully-featured POS system, solo, from zero to live deployment, while studying full-time. I'm a final-year Electronics Engineering student at MIT Manipal with a strong lean toward product management: structured thinking, user empathy, and hands-on execution. I don't just plan products. I build them.",
  footnote: 'Open to PM & APM roles · 2026 grad',
}

export const skills = [
  {
    group: 'Product Management',
    items: ['PRD Writing', 'User Research', 'Roadmapping', 'Metrics Frameworks', 'A/B Testing', 'Agile / Scrum'],
  },
  {
    group: 'Data & Engineering',
    items: ['Python', 'SQL', 'Data Analysis', 'React', 'Electron.js', 'Git'],
  },
  {
    group: 'Tools',
    items: ['Figma', 'Notion', 'Wireframing', 'JIRA / Linear'],
  },
]

export type ProjectStatus = 'live' | 'progress' | 'shipped'

export interface Project {
  title: string
  status: ProjectStatus
  statusLabel: string
  highlight: string
  description: string
  stack: string[]
  links: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    title: 'Bill It: POS for Indian Restaurants',
    status: 'live',
    statusLabel: 'Live & In Use',
    highlight: 'Shipped solo. Running live at a restaurant in Manipal.',
    description:
      'A fully-featured desktop POS system independently conceived, built, and deployed. Currently processing live orders at a restaurant in Manipal. Covers table management, KOT generation, GST-compliant billing, UPI payments, day-end reports, and cashier fraud prevention. Role-based access and WhatsApp analytics under active development.',
    stack: ['Electron.js', 'SQLite', 'JavaScript', 'React'],
    links: [
      { label: 'GitHub', href: 'https://github.com/sohammm-01/Bill-it' },
      { label: 'Website', href: 'https://bill-it-site-kw3c.vercel.app' },
    ],
  },
  {
    title: 'Sentiment Analysis System',
    status: 'progress',
    statusLabel: 'In Progress',
    highlight: 'Transformer-based NLP with advanced regularization techniques.',
    description:
      'A transformer-based sentiment pipeline trained on Amazon product reviews, classifying feedback as Positive, Neutral, or Negative. Applies R-Drop regularization, Confident Learning for label noise correction, and Layer-wise Learning Rate Decay to push benchmark accuracy. Active research project iterating on architecture and evaluation methodology.',
    stack: ['Python', 'PyTorch', 'HuggingFace', 'RoBERTa'],
    links: [
      { label: 'GitHub', href: 'https://github.com/sohammm-01/Amazon-Sentiment-Analysis' },
    ],
  },
  {
    title: 'Manipal Local Loop',
    status: 'shipped',
    statusLabel: 'Shipped',
    highlight: 'Automated hyperlocal news delivery for the Manipal campus.',
    description:
      'A hyperlocal Telegram news bot delivering curated daily updates to students across Manipal, Udupi, and Mangaluru. Aggregates from Google News, Reddit, MAHE, and weather APIs, summarized by Gemini AI and pushed on a scheduled cadence. Active subscriber base across campus.',
    stack: ['Python', 'Gemini AI', 'SQLite', 'Docker', 'Telegram Bot API'],
    links: [{ label: 'GitHub', href: 'https://github.com/sohammm-01/manipal-local-loop' }],
  },
]

export const education = {
  institution: 'Manipal Institute of Technology, MAHE',
  degree: 'B.Tech in Electronics & Instrumentation Engineering',
  duration: '2022 — 2026',
  location: 'Manipal, Karnataka',
}

export const contact = {
  email: 'iamsohammm@gmail.com',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/soham-goud-9bb279215' },
    { label: 'GitHub', href: 'https://github.com/sohammm-01' },
    { label: 'Resume', href: '/Soham_Goud_Resume.pdf' },
  ],
}

export const seeking = {
  eyebrow: "WHAT I'M LOOKING FOR",
  headline: "A product team where I can own problems end to end: not just write specs, but ship solutions.",
  details:
    "I'm a 2026 grad open to PM and APM roles at companies building products that touch real users. I care most about teams that move fast, value data, and trust junior hires to take real ownership from day one.",
}
