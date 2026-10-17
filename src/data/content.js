/* Single source of truth for portfolio copy (from allen_Linkedin_context.md) */
const GH = 'https://github.com/allenjohn006';

export const PROFILE = {
  email: 'allen15022006@gmail.com',
  github: GH,
  linkedin: 'https://www.linkedin.com/in/allen-john-isac-7b6730363/',
};

export const TYPED_WORDS = ['AI & ML Engineer', 'Full-Stack Developer', 'MLOps Builder'];

export const STATS = [
  { n: 3, suffix: 'rd', label: 'Year B.Tech AI & DS' },
  { n: 3, suffix: '', label: 'Internships Completed' },
  { n: 10, suffix: '+', label: 'Systems Shipped' },
];

export const FEATURED = [
  {
    id: 'vox',
    title: 'VOX',
    kind: 'AI · Full Stack',
    role: 'Team Lead · Team Glitch',
    status: 'Presented at MindKraft 2026',
    image: 'vox-demo.jpeg',
    link: `${GH}/VOX`,
    short: 'A fully voice-navigated examination platform — zero keyboard or mouse from login to submission, built to replace the human scribe for students with physical disabilities.',
    metrics: [['54+', 'API endpoints'], ['0%', 'keyboard / mouse'], ['15s', 'auto-save']],
    how: [
      'Face authentication (face-api.js) for password-free login.',
      'Voice navigation — "Select exam 1", "Next question", "Submit exam" — plus live speech-to-text dictation for written answers.',
      'MCQ, descriptive and numerical question types; auto-save every 15 s and auto-submit on timer; 5-second silence detection.',
      '22 Pydantic models, JWT + bcrypt auth, OWASP-aligned security audit, Docker + Nginx deployment, PWA-ready.',
    ],
    story: 'Presented at MindKraft 2026, Karunya\'s international techno-management fest. Industry evaluators gave feedback on the accessibility design — and it earned the Certificate of Leadership at ATOM Achievers Day 2026.',
    tags: ['Python', 'FastAPI', 'React', 'TypeScript', 'MongoDB', 'Docker', 'Nginx', 'Web Speech API', 'face-api.js', 'JWT'],
  },
  {
    id: 'sahayak',
    title: 'Sahayak',
    kind: 'AI · Full Stack',
    role: 'Team Lead · Team LNX',
    status: 'AI for Bharat Hackathon — Top Innovator shortlist',
    arch: ['Kiosk UI', 'Admin Portal', 'FastAPI', 'PostgreSQL', 'Whisper STT', 'gTTS', 'OCR', 'AWS Bedrock'],
    link: `${GH}/Sahayak_Kiosk`,
    short: 'An offline-first, multilingual AI banking kiosk. Customers fill official bank forms by voice or touch in English, Hindi or Tamil — no internet, no scribe.',
    metrics: [['8', 'containers'], ['128', 'Playwright E2E tests'], ['9', 'form categories']],
    how: [
      '8 containerised services: kiosk and admin frontends, FastAPI backend, PostgreSQL 15, Whisper STT, gTTS, OCR and an AWS Bedrock LLM microservice.',
      'Kiosk flow: language → account auth + PIN → OTP → mode (voice / touch / assisted) → field-by-field input → staff verification → submission.',
      'AWS Bedrock extracts structured field values from raw Whisper transcripts, with a 25 s timeout and fallback to raw STT.',
      'Admin portal manages kiosks, staff, form templates, OTA firmware updates and reports across 9 pages.',
    ],
    story: 'Built for the AI for Bharat Hackathon (AWS, Hack2Skill + YourStory) and shortlisted as a Top Innovator in the prototype phase.',
    tags: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Docker Compose', 'AWS Bedrock', 'Whisper', 'Playwright', 'Nginx'],
  },
  {
    id: 'omniflow',
    title: 'OmniFlow',
    kind: 'MLOps',
    role: 'Solo',
    status: 'Complete',
    image: 'omniflow-demo.jpeg',
    link: `${GH}/OmniFlow`,
    short: 'A production-grade MLOps platform for sales forecasting that automates the whole lifecycle — ingestion, drift detection and champion–challenger auto-retraining.',
    metrics: [['0.88', 'R² score'], ['3M+', 'rows trained'], ['~5 min', 'full training']],
    how: [
      'Trains XGBoost models on 3M+ rows in about five minutes through an 8-phase async pipeline with live progress tracking.',
      'KS-test and Chi-square drift detection per feature.',
      'Champion–challenger strategy: a new model must beat the current one before it replaces it. Auto-retrain triggers on R² drop > 5% or MAE rise > 10%.',
      'Explains why a model was retained or retrained. Final result: R² 0.88, MAE $102.85.',
    ],
    story: 'The conceptual successor to the earlier e-commerce sales predictor — taking a notebook-level idea all the way to an operable system.',
    tags: ['Python', 'XGBoost', 'MLflow', 'FastAPI', 'Django', 'Scikit-learn', 'SciPy', 'Docker'],
  },
  {
    id: 'cvscope',
    title: 'CVScope',
    kind: 'AI · NLP',
    role: 'Solo',
    status: 'Complete',
    image: 'cvscope-demo.jpeg',
    link: `${GH}/CVScope`,
    short: 'Resume-to-job-description matching that understands meaning, not keywords — "built ML pipelines" and "developed machine learning workflows" score as equivalent.',
    metrics: [['0–100%', 'match score'], ['RAG', 'recruiter feedback'], ['OCR', 'scanned PDFs']],
    how: [
      'PDF parsing → semantic chunking → OpenRouter embeddings → FAISS vector index → cosine-similarity scoring.',
      'RAG retrieves the relevant chunks and an LLM writes recruiter-style, actionable recommendations.',
      'Match levels: Excellent 75–100%, Good 50–74%, Needs Work < 50%. Tesseract OCR fallback for scanned PDFs.',
    ],
    story: 'Built because keyword-based ATS filters punish good candidates for phrasing — semantic search fixes that.',
    tags: ['Python', 'FAISS', 'RAG', 'OpenRouter', 'Streamlit', 'pdfplumber', 'Tesseract OCR', 'Scikit-learn'],
  },
];

export const MORE_BUILDS = [
  { title: 'RetailSense', note: 'Any-CSV retail analytics. Fuzzy column detection, 2σ anomaly detection, 12-month Prophet forecast and async PDF reports via Celery + Redis.', tags: ['React', 'FastAPI', 'Prophet', 'Celery'], link: `${GH}/RetailSense`, tag: 'Codmetric' },
  { title: 'CineMetric', note: 'IMDB intelligence dashboard over 368,000+ records. A certificate classifier infers ratings for 85,000+ films before a rating predictor runs.', tags: ['React', 'FastAPI', 'scikit-learn'], link: `${GH}/CineMetric`, tag: 'Codmetric' },
  { title: 'FlowerLens', note: 'Iris classifier with explainable AI — live sliders, feature-importance chart and decision-boundary map. Random Forest hits ~97%.', tags: ['React', 'FastAPI', 'XAI'], link: `${GH}/FlowerLens`, tag: 'Codmetric' },
  { title: 'WorkConnect', note: 'Workforce-matching mobile app for Kerala. GPS matching with geohashing + Haversine — zero-cost maps — and real-time job tracking.', tags: ['React Native', 'Expo', 'Firebase'], link: `${GH}/WorkFace`, tag: 'CODTECH' },
  { title: 'Smart AI Tetris', note: 'Tetris with a real-time AI coach. Pure heuristic search scores every rotation and column — no ML library, no pre-trained model.', tags: ['React', 'TypeScript', 'Heuristics'], link: `${GH}/Smart-AI-Tetris-game`, tag: 'KaaShiv' },
  { title: 'Sales Predictor', note: 'Random Forest vs Gradient Boosting for marketplace sales, with feature engineering and a Streamlit batch + single-day dashboard.', tags: ['Scikit-learn', 'Streamlit', 'Pandas'], link: `${GH}/SaleCo`, tag: 'ML' },
];

export const INTERNSHIPS = [
  {
    period: 'May – Jun 2026',
    role: 'Data Science Intern',
    org: 'Codmetric',
    meta: 'Remote · 2 months',
    points: [
      'Finished the assigned Titanic EDA, then went beyond the brief and shipped three full-stack ML products for the remaining tasks.',
      'Built RetailSense, CineMetric and FlowerLens end to end — data pipeline, model, API and dashboard.',
    ],
    tags: ['Prophet', 'FastAPI', 'React', 'scikit-learn'],
  },
  {
    period: 'May – Jun 2026',
    role: 'Full Stack Developer Intern',
    org: 'CODTECH IT Solutions',
    meta: 'Remote · 2 months',
    points: [
      'Built WorkConnect — one React Native app serving customers and workers through Firestore profile-based routing.',
      'Zero-cost maps with geohashing + Haversine, GPS nearby-worker matching and an admin dashboard in React + Vite.',
    ],
    tags: ['React Native', 'Expo', 'Firebase', 'Zustand'],
  },
  {
    period: 'Jun 2025',
    role: 'Artificial Intelligence Intern',
    org: 'KaaShiv InfoTech',
    meta: 'Remote · 1 month · Grade A',
    points: [
      'Covered supervised learning, NLP pipelines and TensorFlow, then applied it by building Smart AI Tetris.',
    ],
    tags: ['TensorFlow', 'NLP', 'Python'],
  },
];

export const LEADERSHIP = [
  {
    period: 'Aug 2026 – Present',
    role: 'Coordinator, DotDev',
    org: 'ATOM · Karunya',
    meta: 'Appointed at the ATOM Inauguration, 25 Aug 2026',
    points: [
      'Leads the full-stack vertical of ATOM — sessions, mentoring and project development.',
      'Ran a 6-day full-stack bootcamp ahead of the HALO 2026 hackathon.',
    ],
    tags: ['Leadership', 'Mentoring'],
  },
  {
    period: 'Jul 2026 – Present',
    role: 'Head, NSS Parade Team',
    org: 'NSS · Karunya',
    meta: 'Parade Member → MC Team → Head',
    points: [
      'Leads drill, coordination and member management; led the team on the 80th Independence Day.',
      'Part of the blood-donation camp that collected 804 units, breaking Coimbatore\'s 714-unit record.',
    ],
    tags: ['Leadership', 'Public Speaking'],
  },
  {
    period: 'Jul 2025 – Present',
    role: 'MC Team Member',
    org: 'NSS Core Team · Karunya',
    meta: 'Anchoring & hosting',
    points: ['Selected to host and anchor NSS events and programmes on campus.'],
    tags: ['Hosting'],
  },
  {
    period: 'Sep 2026 – Present',
    role: 'Member',
    org: 'IEEE TEMS',
    meta: 'Technology & Engineering Management Society',
    points: ['Active member; preparing a candidacy for the IEEE CIS student-chapter Secretary role.'],
    tags: ['IEEE'],
  },
];

export const ACHIEVEMENTS = [
  { icon: 'fa-award', title: 'Certificate of Leadership', org: 'ATOM Achievers Day 2026', note: 'For leading Team Glitch in building and presenting VOX at MindKraft 2026.' },
  { icon: 'fa-trophy', title: 'Top Innovator Shortlist', org: 'AI for Bharat Hackathon', note: 'Led Team LNX to the prototype-development phase of this national, AWS-powered hackathon.' },
  { icon: 'fa-medal', title: 'NSS Merit Award + Medal', org: 'Karunya NSS · 2025–26', note: 'Outstanding performance with the NSS Parade Team.' },
  { icon: 'fa-microphone-lines', title: 'MindKraft 2026', org: 'International Techno-Management Fest', note: 'Presented VOX and received industry evaluation feedback.' },
  { icon: 'fa-bullhorn', title: 'HALO 2026 Organiser & MC', org: 'Department hackathon', note: 'Two-day, ₹10,000 prize-pool hackathon on human-centric AI for public safety.' },
  { icon: 'fa-flag', title: 'Republic Day 2025', org: 'NSS Certificate of Recognition', note: 'Represented Karunya at the 26 Jan 2025 celebrations.' },
];

export const CERTS = [
  ['Business Intelligence & Analytics', 'NPTEL · IIT Madras', '2026'],
  ['Data Analytics Job Simulation', 'Deloitte Australia · Forage', '2026'],
  ['Introduction to Industry 4.0 & IIoT', 'NPTEL', 'Oct 2025'],
  ['Artificial Intelligence Internship', 'KaaShiv InfoTech', 'Jun 2025'],
];
