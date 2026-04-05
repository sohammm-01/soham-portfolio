export const profile = {
  name: 'Soham',
  tagline: 'I Build Things That Can Actually Ship',
  heroSubtext: 'Aspiring Product Manager · Data Enthusiast · Builder',
  heroBody:
    "Hi, I'm Soham. Final-year engineering student at Manipal, building products that solve real problems — from POS systems running live in restaurants to ML pipelines and hyperlocal news bots.",
  location: 'Manipal, India',
  availability: 'AVAILABLE\nFOR WORK\nFULL TIME',
}

export const about = {
  eyebrow: 'A FEW THINGS ABOUT ME',
  body:
    "I'm Soham, a final-year Electronics & Instrumentation Engineering student at Manipal Institute of Technology, with a strong inclination toward product management and data-driven decision making. I bridge the gap between technical depth and product thinking — having independently conceptualized, built, and shipped a fully functional POS system currently in active use at a restaurant. I'm passionate about building products that solve real problems, backed by structured thinking, user empathy, and hands-on execution.",
  footnote: 'Currently — open to PM & APM roles for 2026.',
}

export const skills = [
  {
    group: 'Product & Strategy',
    items: ['Product Thinking', 'User Research', 'Wireframing', 'Agile / Scrum', 'Roadmapping'],
  },
  {
    group: 'Data & Analytics',
    items: ['Python', 'SQL', 'Data Analysis', 'Excel / Google Sheets'],
  },
  {
    group: 'Design & Tools',
    items: ['Figma', 'Git', 'Notion'],
  },
]

export type ProjectStatus = 'live' | 'progress' | 'shipped'

export interface Project {
  title: string
  status: ProjectStatus
  statusLabel: string
  description: string
  stack: string[]
  links: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    title: 'Bill It — POS for Indian Restaurants',
    status: 'live',
    statusLabel: 'Live & In Use',
    description:
      'A fully-featured desktop Point-of-Sale application built specifically for small Indian restaurants and dhabas. Handles table management, KOT generation, GST-compliant billing, UPI payments, day-end reports, and an anti-fraud cashier tracking system. Currently deployed and actively used in a restaurant. More features under active development including role-based access, employee management, and WhatsApp-delivered analytics.',
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
    description:
      'A transformer-based sentiment analysis pipeline trained on Amazon product reviews, classifying customer feedback into Positive, Neutral, and Negative categories. Involves advanced techniques including R-Drop regularization, Confident Learning for label noise correction, and Layer-wise Learning Rate Decay. Ongoing research project with continuous experimentation.',
    stack: ['Python', 'PyTorch', 'HuggingFace', 'RoBERTa'],
    links: [
      { label: 'GitHub', href: 'https://github.com/sohammm-01/Amazon-Sentiment-Analysis' },
    ],
  },
  {
    title: 'Manipal Local Loop',
    status: 'shipped',
    statusLabel: 'Shipped',
    description:
      'A hyperlocal Telegram news bot delivering curated news and updates for students in Manipal, Udupi, and Mangaluru. Aggregates from Google News, Reddit, MAHE, weather APIs, and more — summarized using Gemini AI and delivered on schedule.',
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
  phone: '+91 8770381597',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/soham-goud-9bb279215' },
    { label: 'Resume', href: '/Soham_Goud_Resume.pdf' },
  ],
}
