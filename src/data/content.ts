export interface Project {
  id: string;
  title: string;
  org: string;
  description: string;
  tags: string[];
  metrics?: string[];
  link?: string;
  featured?: boolean;
  placeholder?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  highlights: string[];
}

export interface Honor {
  id: string;
  title: string;
  issuer: string;
  date: string;
  note?: string;
}

export const profile = {
  name: "Sophia Lee",
  chineseName: "李舒雅",
  tagline: "Software & AI Engineer",
  subtitle:
    "Building intelligent systems at the intersection of healthcare, enterprise software, and human-centered design.",
  email: "lee.c.sophia@gmail.com",
  phone: "(919) 244-6399",
  linkedin: "https://linkedin.com/in/sophial25",
  github: "https://github.com/leshoya",
  resume: "resume-sophia-lee.pdf",
  education: {
    school: "Duke University",
    location: "Durham, NC",
    degree: "B.S. in Computer Science",
    honors: [
      {
        id: "yc-summer-school",
        title: "YC Summer School",
        issuer: "YC Combinator",
        date: "May 2026",
      },
      {
        id: "susquehanna",
        title: "Susquehanna Virtual Discovery Event",
        issuer: "Susquehanna",
        date: "Nov 2025",
      },
      {
        id: "jpmorgan",
        title: "Career.edYOU Academy",
        issuer: "JPMorganChase",
        date: "2025",
      },
      {
        id: "goldman",
        title: "Emerging Leaders Series",
        issuer: "Goldman Sachs",
        date: "2025",
      },
      {
        id: "ncdit-article",
        title: "Primary Article Feature — Lady Cardinal Mentorship Program",
        issuer: "NCDIT",
        date: "Jul 2025",
        note: "NCDIT Provides Real-World STEM Experience through Lady Cardinal Mentorship Program",
      },
      {
        id: "medlytics-award",
        title: "Energetic Innovator Award",
        issuer: "MIT Medlytics",
        date: "2024",
      },
      {
        id: "ncwit",
        title: "Award for Aspirations in Computing",
        issuer: "NCWIT",
        date: "2024",
      },
      {
        id: "coca-cola",
        title: "Coca-Cola Scholar Semifinalist",
        issuer: "Coca-Cola Scholars Foundation",
        date: "Sep 2024",
        note: "Top 1.27% of 105,000+ applicants nationwide for academic excellence, leadership, and service.",
      },
    ] as Honor[],
    courses: [
      "Data Structures & Algorithms",
      "Artificial Intelligence",
      "Computer Systems",
      "Intro to Data Science",
      "Linear Algebra",
      "Probability",
    ],
  },
  skills: {
    languages: ["Python", "Java", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
    frameworks: [
      "React",
      "Angular",
      "Spring Boot",
      "Flask",
      "Node.js",
      "TensorFlow",
      "PyTorch",
      "Docker",
    ],
    tools: ["Git", "CI/CD", "Figma", "FastAPI", "Next.js", "Plotly.js"],
  },
};

export const experiences: Experience[] = [
  {
    id: "metlife",
    role: "Software Engineer Intern",
    company: "MetLife",
    period: "June 2026 – August 2026",
    highlights: [
      "Built full-stack enterprise features with Java, Spring Boot, TypeScript, and Angular for 1,000+ users.",
      "Developed SQL-based data workflows improving reporting efficiency by 15%.",
      "Supported CI/CD and platform reliability initiatives, reducing deployment issues by 18%.",
    ],
  },
  {
    id: "nc-gov",
    role: "Software Engineer Intern",
    company: "State of North Carolina Government",
    period: "July 2025 – August 2025",
    highlights: [
      "Optimized backend APIs and SQL queries, improving data retrieval performance by 45%.",
      "Containerized workflows with Docker and improved CI/CD pipeline reliability.",
      "Partnered with 5+ IT divisions to deploy scalable tools, boosting productivity by 35%.",
    ],
  },
  {
    id: "mantis",
    role: "AI / Full Stack Engineer Intern",
    company: "MIT Mantis AI",
    period: "July 2024 – November 2024",
    highlights: [
      "Engineered a full-stack data platform processing 2M+ records with real-time analytics dashboards.",
      "Built 5+ AI-powered agent interfaces, improving user engagement by 25%.",
    ],
  },
  {
    id: "bwsi",
    role: "Software Engineering Intern",
    company: "MIT – BWSI (Medlytics)",
    period: "July 2024 – August 2024",
    highlights: [
      "Developed biomedical ML pipelines with Python and TensorFlow across 5 healthcare subprojects.",
      "Led model training, evaluation, and experimentation for medical imaging and biosignal analysis.",
    ],
  },
  {
    id: "gwc",
    role: "Data Science Alumni",
    company: "Girls Who Code",
    period: "June 2023 – September 2023",
    location: "Remote",
    highlights: [
      "Explored web development with HTML, CSS, and JavaScript.",
      "Studied intermediate Python with a focus on cybersecurity, AI, and data science.",
      "Built self-guided projects and applications across the program curriculum.",
    ],
  },
  {
    id: "gwc-kwk",
    role: "Web Development Scholar",
    company: "Kode With Klossy",
    period: "June 2022 – September 2022",
    location: "Remote",
    highlights: [
      "Completed a web development curriculum using HTML, JavaScript, and CSS Flexbox in Replit.",
      "Built an interactive final project website exploring the influence of technology.",
    ],
  },
  {
    id: "biogen-mit",
    role: "Biogen–MIT Biotech in Action",
    company: "Lemelson-MIT Program",
    period: "June 2022 – September 2022",
    location: "Remote",
    highlights: [
      "Studied neurological disease, pharmaceutical medicine, and biomedical technology.",
      "Conducted a virtual lab project on neurocognitive disease under scientist mentorship.",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "mutual-fund",
    title: "Mutual Fund Decision Platform",
    org: "Duke University · Group 10",
    description:
      "Full-stack investment dashboard with FastAPI and Angular. CAPM and 5,000-run Monte Carlo simulations return full outcome distributions; Plotly.js charts show median and 10th/90th percentile scenarios. Includes a multi-scenario market simulator and AI tools to unify fragmented financial resources.",
    tags: ["FastAPI", "Angular", "Python", "Plotly.js", "Monte Carlo"],
    metrics: ["5,000 simulations", "Probability distributions"],
    link: "https://docs.google.com/presentation/d/1e2dp_mc0QCaTMK6bmSb1bOU5z3Rp2wNNRCoxRCCosjQ/edit?usp=drivesdk",
    featured: true,
  },
  {
    id: "emerge-ai",
    title: "eMerge AI",
    org: "The Cube LLC Buildathon · 3rd Overall",
    description:
      "End-to-end interview simulation platform for CS majors breaking into product and consulting. Real-time voice interaction, transcript analysis, and personalized AI feedback on frameworks and structure.",
    tags: ["Flask", "React", "OpenAI", "Whisper"],
    metrics: ["Real-time voice AI", "Personalized scoring"],
    link: "https://emergeai.us/",
    featured: true,
  },
  {
    id: "jamfusion",
    title: "JamFusion",
    org: "HackHarvard 2025",
    description:
      "AI-powered collaborative music platform with an interactive flow diagram. Gemini recommends instruments from 71+ global traditions; ElevenLabs powers real-time producer voice feedback and graph-based composition.",
    tags: ["Next.js", "React", "FastAPI", "Gemini", "ElevenLabs"],
    metrics: ["71+ instruments", "Speech-to-graph"],
    link: "https://devpost.com/software/jamflow-bdc4yr",
    featured: true,
  },
  {
    id: "mammogram",
    title: "Mammogram Analysis Model",
    org: "MIT Medlytics",
    description:
      "Transfer learning CNN for breast cancer detection from mammogram images.",
    tags: ["TensorFlow", "CNN", "Transfer Learning"],
    metrics: ["96% test accuracy", "89% multiclass accuracy"],
  },
  {
    id: "hypothyroid",
    title: "Hypothyroidism Classification",
    org: "MIT Medlytics",
    description:
      "Clinical ML model comparing KNN, RF, DT, and SVM classifiers for hypothyroidism detection.",
    tags: ["Scikit-learn", "KNN", "SVM", "Random Forest"],
    metrics: ["98% accuracy", "0.99 AUROC"],
  },
  {
    id: "ocular",
    title: "Ocular Disease Classification",
    org: "MIT Medlytics",
    description:
      "Retinal scan classifier detecting glaucoma, cataracts, and other ocular conditions.",
    tags: ["CNN", "Medical Imaging", "5-Class"],
    metrics: ["86% validation accuracy"],
  },
  {
    id: "sleep",
    title: "Sleep Signaling",
    org: "MIT Medlytics",
    description:
      "Biosignal analysis with FFT transformations and transfer learning for REM sleep stage classification.",
    tags: ["FFT", "Transfer Learning", "Biosignals"],
    metrics: ["97% binary accuracy", "93% multiclass accuracy"],
  },
  {
    id: "bone-fracture",
    title: "Bone Fracture Detection",
    org: "Kode With Klossy × Deloitte",
    description:
      "Embedded image classification model integrated into a React website for bone health prediction.",
    tags: ["React", "Image Processing", "Classification"],
  },
  {
    id: "earthquake",
    title: "Earthquake Classification",
    org: "Independent",
    description:
      "Random forest model for earthquake magnitude classification from seismic data.",
    tags: ["Random Forest", "Python"],
  },
  {
    id: "snap-education",
    title: "Computing Infused Projects",
    org: "Educational Outreach",
    description:
      "Interactive Snap! programs teaching middle and high school students computing concepts across non-CS subjects.",
    tags: ["Snap!", "Education", "Visual Programming"],
    link: "https://drive.google.com/drive/folders/15KsEoW8-_95ETya8t76SHFEtZgqCrGaB?usp=sharing",
  },
];
