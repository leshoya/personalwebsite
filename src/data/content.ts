export interface Project {
  id: string;
  title: string;
  org: string;
  description: string;
  tags: string[];
  metrics?: string[];
  link?: string;
  /** Public source repository; only set when the repo is public and backs up the card. */
  repo?: string;
  /** What Sophia personally built on the project; shown on featured cards. */
  role?: string;
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
  earlier?: boolean;
  /** Screen recording shown under the highlights; `link` defaults to the video file itself. */
  demo?: { video: string; caption: string; link?: string };
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
    "I build full-stack products and machine learning systems, most recently enterprise software at MetLife and healthcare ML with MIT.",
  email: "lee.c.sophia@gmail.com",
  phone: "(919) 244-6399",
  linkedin: "https://linkedin.com/in/sophial25",
  github: "https://github.com/leshoya",
  resume: "resume-sophia-lee.pdf",
  /** Shown in the hero and contact section. */
  availability: "Open to software engineering internships · Summer 2027",
  spotify: "https://open.spotify.com/user/dqef77t7y46kkq7gdcgmfiaai",
  /** Optional short audio clip in public/ (e.g. "audio/song.mp3") played while hovering the hero record. */
  songPreview: "",
  education: {
    school: "Duke University",
    location: "Durham, NC",
    degree: "B.S. in Computer Science",
    gpa: "4.0",
    honors: [
      {
        id: "yc-summer-school",
        title: "YC Summer School",
        issuer: "Y Combinator",
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
      "Computer Architecture",
      "Computer Systems",
      "Files & Databases",
      "Artificial Intelligence",
      "Discrete Mathematics",
      "Linear Algebra",
      "Probability",
    ],
  },
  skills: {
    languages: ["Python", "Java", "C", "TypeScript", "JavaScript", "SQL", "HTML/CSS"],
    frameworks: [
      "Spring Boot",
      "Node.js",
      "React",
      "Angular",
      "Flask",
      "TensorFlow",
      "PyTorch",
      "NumPy",
      "Pandas",
    ],
    tools: ["Git", "Docker", "Linux", "CI/CD"],
  },
};

export const experiences: Experience[] = [
  {
    id: "metlife",
    role: "Software Engineer Intern",
    company: "MetLife",
    period: "June 2026 – August 2026",
    highlights: [
      "Built full-stack enterprise features with Java, Spring Boot, TypeScript, and Angular, implementing REST APIs, backend validation, and service-layer logic supporting 1,000+ users.",
      "Developed AI agent evaluation frameworks and Agent-to-Agent workflows using Python, LLM APIs, and SQL pipelines, automating benchmarking, regression testing, experiment tracking, and evaluation reporting.",
      "Improved platform reliability across Linux environments, cloud infrastructure, and CI/CD pipelines, contributing to an 18% reduction in deployment-related issues.",
    ],
  },
  {
    id: "nc-gov",
    role: "Software Engineer Intern",
    company: "State of North Carolina Government",
    period: "July 2025 – August 2025",
    highlights: [
      "Built and optimized backend APIs and SQL queries for internal government data systems, improving query response speed and reporting accuracy by 45% across enterprise workflows.",
      "Containerized application workflows with Docker and contributed to CI/CD pipeline improvements, increasing deployment efficiency and system reliability.",
      "Partnered with 5+ IT divisions to translate operational requirements into backend services and automated reporting workflows.",
    ],
  },
  {
    id: "mantis",
    role: "AI/Full Stack Engineer Intern",
    company: "MIT Mantis AI",
    period: "July 2024 – November 2024",
    highlights: [
      "Engineered a Python, React, and Node.js platform to ingest, process, and visualize 2M+ records from unstructured datasets, delivering real-time analytics dashboards.",
      "Built 5+ AI-powered agent interfaces integrating model-generated recommendations, interactive workflows, and personalized feedback, increasing user engagement by 25%.",
    ],
    demo: {
      video: "videos/agent-inspector.mp4",
      caption: "Agent Inspector: exploring a knowledge map with AI-generated summaries",
    },
  },
  {
    id: "bwsi",
    role: "Software Engineering Intern",
    company: "Massachusetts Institute of Technology, BWSI",
    period: "July 2024 – August 2024",
    highlights: [
      "Built Python and TensorFlow preprocessing and model-training pipelines across 5 biomedical ML projects spanning medical image classification and physiological signal analysis.",
    ],
  },
  {
    id: "gwc",
    earlier: true,
    role: "Data Science Program Alumna",
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
    earlier: true,
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
    earlier: true,
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
    org: "Goldman Sachs",
    description:
      "Full-stack investment dashboard with FastAPI and Angular. CAPM and 5,000-run Monte Carlo simulations return full outcome distributions; Plotly.js charts show median and 10th/90th percentile scenarios. Includes a multi-scenario market simulator and AI tools to unify fragmented financial resources.",
    tags: ["FastAPI", "Angular", "Python", "Plotly.js", "Monte Carlo"],
    metrics: ["5,000 simulations", "Probability distributions"],
    link: "https://docs.google.com/presentation/d/1e2dp_mc0QCaTMK6bmSb1bOU5z3Rp2wNNRCoxRCCosjQ/edit?usp=drivesdk",
    // TODO(sophia): draft, confirm what you personally built
    role: "Built the FastAPI simulation service (CAPM returns and 5,000-run Monte Carlo) and the Angular + Plotly.js views that chart the median and 10th/90th percentile outcomes.",
    featured: true,
  },
  {
    id: "emerge-ai",
    title: "eMerge AI",
    org: "The Cube LLC Buildathon · 3rd Overall",
    description:
      "AI mock-interview platform for students breaking into product management and consulting. Candidates set up a session, answer questions in an interview room with a live transcript, then review a feedback dashboard that breaks down structure, clarity, and delivery.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    metrics: ["3rd overall", "Live at emergeai.us"],
    link: "https://emergeai.us/",
    role: "Designed and built the front end in Next.js and TypeScript: the interview setup flow, the interview room with avatar and live transcript, and the feedback dashboard.",
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
    link: "https://www.youtube.com/watch?v=GQqYw9a_Mco",
    repo: "https://github.com/maxx06/hackharvard2025",
    // TODO(sophia): draft, confirm what you personally built
    role: "Built the drag-and-drop composition canvas in React/Next.js and connected Gemini's instrument recommendations to the graph through the FastAPI backend.",
    featured: true,
  },
  {
    id: "mammogram",
    title: "Mammogram Analysis Model",
    org: "MIT Medlytics",
    description:
      "Transfer learning CNN for breast cancer detection, trained on mammography scans and evaluated on a held-out test set.",
    tags: ["TensorFlow", "CNN", "Transfer Learning"],
    metrics: ["96% held-out test accuracy", "89% multiclass accuracy"],
  },
  {
    id: "hypothyroid",
    title: "Hypothyroidism Classification",
    org: "MIT Medlytics",
    description:
      "Clinical ML model comparing KNN, random forest, decision tree, and SVM classifiers for hypothyroidism detection, trained and tested on structured patient lab data.",
    tags: ["Scikit-learn", "KNN", "SVM", "Random Forest"],
    metrics: ["98% test accuracy", "0.99 AUROC"],
  },
  {
    id: "ocular",
    title: "Ocular Disease Classification",
    org: "MIT Medlytics",
    description:
      "CNN that classifies retinal fundus scans into five classes, including glaucoma and cataracts, evaluated on a held-out validation set.",
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
