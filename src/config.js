// =========================================================================
// PORTFOLIO CONFIGURATION - ADARSH M S
// Accurately populated from official resume:
// Kannur, Kerala, India • adarshz1080@gmail.com
// =========================================================================

export const PORTFOLIO_CONFIG = {
  // 1. Personal & Hero Header
  personal: {
    greeting: "HI, I'M",
    name: "ADARSH M S",
    // Typewriter rotating roles reflecting his real skills
    roles: [
      "MCA Student",
      "AI-assisted developer"
    ],
    statusPill: "Ahz CTRL",
    statusSubtitle: "System Core Online",
    starsHint: "Click the stars to explore",
    location: "Kannur, Kerala, India",
    availability: "Available for Software Development Roles"
  },

  // 2. Direct Social Links from Resume
  socials: {
    github: "https://github.com/adars-hz",
    linkedin: "https://linkedin.com/in/adarshz001",
    instagram: "https://www.instagram.com/adars_hz_?vrfl=ZDNlZDc0MzIxNw%3D%3D",
    email: "mailto:adarshz1080@gmail.com"
  },

  // 3. Floating 3D Polyhedrons (Skills) in the Galaxy
  // Exactly matching his verified technical skills
  skills: [
    {
      id: "python",
      name: "Python",
      level: "95%",
      experience: "Core Language",
      category: "Programming Language",
      color: "#38bdf8",
      position: [-3.1, -1.5, 1.0],
      geometry: "icosahedron"
    },
    {
      id: "javascript",
      name: "JavaScript",
      level: "90%",
      experience: "Frontend & Full Stack",
      category: "Programming Language",
      color: "#f7df1e",
      position: [-0.9, 2.5, -1.2],
      geometry: "octahedron"
    },
    {
      id: "react",
      name: "React.js",
      level: "92%",
      experience: "Frontend Library",
      category: "MERN Stack",
      color: "#61dafb",
      position: [2.4, -3.0, -1.2],
      geometry: "icosahedron"
    },
    {
      id: "django",
      name: "Django",
      level: "88%",
      experience: "Backend Framework",
      category: "Web Framework",
      color: "#2ba977",
      position: [1.8, 2.6, -0.6],
      geometry: "icosahedron"
    },
    {
      id: "fastapi",
      name: "FastAPI",
      level: "88%",
      experience: "Modern REST APIs",
      category: "Backend Framework",
      color: "#009688",
      position: [5.0, -1.2, -1.6],
      geometry: "octahedron"
    },
    {
      id: "mongodb",
      name: "MongoDB",
      level: "88%",
      experience: "NoSQL Database",
      category: "MERN Stack",
      color: "#00ed64",
      position: [-2.2, 0.9, 0.2],
      geometry: "octahedron"
    },
    {
      id: "sqlite",
      name: "SQLite",
      level: "85%",
      experience: "Relational DB",
      category: "Database",
      color: "#00758f",
      position: [-1.8, -2.9, 0.2],
      geometry: "octahedron"
    },
    {
      id: "git",
      name: "Git",
      level: "90%",
      experience: "Version Control",
      category: "Developer Tools",
      color: "#f05032",
      position: [4.2, 1.4, -2.0],
      geometry: "octahedron"
    }
  ],

  // 4. Projects from GitHub & Verified Engineering
  projects: [
    {
      id: "neuroface",
      title: "NeuroFace – AI Student Attendance System",
      tagline: "Facial-Recognition Attendance with Multi-Face Detection & ArcFace",
      category: "AI & Full Stack",
      description: "Engineered an AI-powered student attendance management system utilizing MTCNN for multi-face detection and ArcFace deep learning embeddings. Features real-time multi-student face recognition in a single camera feed, automatic duplicate prevention, and role-based portals (Admin, Teacher, Student) with subject-wise tracking and eligibility metrics.",
      tags: ["Python", "React.js", "FastAPI", "MTCNN", "ArcFace", "AI/ML", "OpenCV"],
      githubUrl: "https://github.com/adars-hz/NeuroFace",
      liveUrl: "https://neuro-face-72kikmgix-adarshz-s-projects.vercel.app/",
      stats: { stars: "AI Model", forks: "ArcFace" },
      image: "linear-gradient(135deg, #1f2937 0%, #111827 100%)"
    },
    {
      id: "life-connect",
      title: "LifeConnect Registry – Organ Donation Platform",
      tagline: "Role-Based Organ Donation & Donor-Recipient Management",
      category: "Full Stack",
      description: "Built a centralized organ donation awareness and management web application in Django. Implemented multi-role access control for Donors, Recipients, and Admins with secure registration, medical document uploads, live application status tracking, and administrative review workflows.",
      tags: ["Python", "Django", "SQLite", "HTML/CSS", "JavaScript", "RBAC"],
      githubUrl: "https://github.com/adars-hz/LifeConnect_Registry",
      liveUrl: null,
      stats: { stars: "Django", forks: "3 Roles" },
      image: "linear-gradient(135deg, #27272a 0%, #09090b 100%)"
    },
    {
      id: "job-portal",
      title: "Job Portal – Full-Stack Recruitment Platform",
      tagline: "MERN Stack Career Hub with Authentication & Job Management",
      category: "Full Stack",
      description: "Architected a full-stack career platform using the MERN stack (MongoDB, Express.js, React.js, Node.js). Features role-based access for job seekers and recruiters, secure JWT authentication, real-time job searching & filtering, dynamic resume submissions, and interactive application management dashboards.",
      tags: ["MongoDB", "Express.js", "React.js", "Node.js", "MERN Stack", "REST APIs"],
      githubUrl: "https://github.com/adars-hz/job-portal",
      liveUrl: "https://job-portal-one-iota.vercel.app",
      stats: { stars: "MERN", forks: "Vercel" },
      image: "linear-gradient(135deg, #18181b 0%, #000000 100%)"
    },
    {
      id: "smart-study-planner",
      title: "Smart Study Planner – AI Timetable Generator",
      tagline: "Machine Learning Study Optimizer using Decision Tree Regression",
      category: "AI & Backend",
      description: "Developed an intelligent study timetable generator powered by Scikit-Learn Decision Tree Regression. Automatically computes subject priority and dynamically allocates study hours according to upcoming exam dates, syllabus complexity, and preparation status, paired with a real-time web interface.",
      tags: ["Python", "Flask", "Scikit-Learn", "Machine Learning", "Decision Tree"],
      githubUrl: "https://github.com/adars-hz/Smart_study_planner",
      liveUrl: "https://smart-study-planner-iota-three.vercel.app",
      stats: { stars: "Scikit-Learn", forks: "Flask" },
      image: "linear-gradient(135deg, #262626 0%, #0a0a0a 100%)"
    },
    {
      id: "portfolio",
      title: "Cosmic 3D Galaxy Portfolio",
      tagline: "Interactive Three.js Galaxy Hub with Dynamic Routing & Motion Physics",
      category: "Frontend & 3D",
      description: "Engineered an interactive 3D WebGL cosmic portfolio utilizing Three.js and Vite. Features procedural star generation, rotating spiral arms, interactive floating skill polyhedrons, sound design, dedicated page transitions, and responsive mobile-first UI with modern typography.",
      tags: ["JavaScript", "Three.js", "WebGL", "Vite", "CSS3", "Framer Motion"],
      githubUrl: "https://github.com/adars-hz/ahz",
      liveUrl: "https://adarshz.is-a.dev",
      stats: { stars: "Three.js", forks: "is-a.dev" },
      image: "linear-gradient(135deg, #1e1e1e 0%, #050505 100%)"
    }
  ],

  // 5. About Me & Bio directly from Resume
  about: {
    title: "About Adarsh M S",
    subtitle: "MCA Candidate • Full Stack & Python Developer • Kannur, Kerala",
    bio: [
      "To begin my career in a software development role where I can apply my knowledge of programming, web development, databases, and problem-solving. I aim to gain practical industry experience, improve my technical and professional skills, learn from experienced team members, and contribute effectively to the organization through continuous learning and dedicated work.",
      "I hold a Bachelor of Computer Applications (BCA) and am currently pursuing my Master of Computer Applications (MCA) at AJ Institute of Engineering and Technology. I have completed a full-stack internship with ICT Academy of Kerala focusing on the MERN stack.",
      "My technical strengths include Python, JavaScript, React.js, Node.js, FastAPI, Django, MongoDB, SQLite, as well as hands-on AI/ML implementations like MTCNN facial recognition, ArcFace embeddings, and Scikit-Learn regression."
    ],
    stats: [
      { label: "Education", value: "MCA" },
      { label: "Projects Completed", value: "5+" },
      { label: "Core Technologies", value: "10+" },
      { label: "Internship", value: "MERN" }
    ],
    experience: [
      {
        role: "Full Stack Development Intern",
        company: "ICT Academy of Kerala",
        period: "Dec 2024 – Jan 2025",
        details: "Completed a 1-month full-stack development internship using all 4 MERN technologies (MongoDB, Express.js, React.js, Node.js). Built end-to-end web application workflows from user interface to server logic and database storage, integrating frontend, backend, and database layers while applying responsive web design practices."
      }
    ],
    education: [
      {
        degree: "Master of Computer Applications (MCA)",
        institution: "AJ Institute of Engineering and Technology",
        year: "Nov 2026 – Present • Mangaluru, Karnataka",
        score: "Pursuing Postgraduate Degree"
      },
      {
        degree: "Bachelor of Computer Applications (BCA)",
        institution: "Gurudev Arts & Science College, Payyannur",
        year: "Jul 2022 – Mar 2025 • Kannur, Kerala",
        score: "Completed Undergraduate Degree"
      }
    ]
  },

  // 6. Contact Details from Resume
  contact: {
    heading: "Get In Touch",
    subheading: "Looking for an enthusiastic, skilled software developer? Reach out directly via email or LinkedIn.",
    email: "adarshz1080@gmail.com",
    location: "Kannur, Kerala, India",
    status: "Actively seeking Software Development Roles"
  },

  // 7. Resume Details
  resume: {
    name: "ADARSH_M_S_Resume.pdf",
    downloadUrl: "#",
    lastUpdated: "2026"
  },

  // 8. Interactive Portfolio Navigation Nodes (Surrounding the central galaxy)
  // Replaces floating tech logos with interactive 3D navigation elements
  navigationNodes: [
    {
      id: "projects",
      name: "PROJECTS",
      label: "PROJECTS",
      type: "section",
      target: "projects",
      symbol3D: "folder",
      icon: "folder",
      angle: 0, // 0 rad (0°)
      radiusMult: 1.0,
      description: "Explore featured software, platforms & AI systems",
      color: "#38bdf8"
    },
    {
      id: "about",
      name: "ABOUT",
      label: "ABOUT",
      type: "section",
      target: "about",
      symbol3D: "user",
      icon: "user",
      angle: Math.PI * 0.25, // 45°
      radiusMult: 0.98,
      description: "Biography, MCA education & full-stack experience",
      color: "#818cf8"
    },
    {
      id: "resume",
      name: "RESUME",
      label: "RESUME",
      type: "section",
      target: "resume",
      symbol3D: "document",
      icon: "document",
      angle: Math.PI * 0.5, // 90°
      radiusMult: 1.02,
      description: "Verified academic & software engineering CV",
      color: "#34d399"
    },
    {
      id: "photos",
      name: "PHOTOS",
      label: "PHOTOS",
      type: "section",
      target: "photos",
      symbol3D: "photo",
      icon: "photo",
      angle: Math.PI * 0.75, // 135°
      radiusMult: 0.97,
      description: "Visual archive, official portrait & architecture blueprints",
      color: "#f472b6"
    },
    {
      id: "github",
      name: "GITHUB",
      label: "GITHUB",
      type: "external",
      url: "https://github.com/adars-hz",
      symbol3D: "github",
      icon: "github",
      angle: Math.PI, // 180°
      radiusMult: 1.0,
      description: "Open source repositories & code architectures",
      color: "#e2e8f0"
    },
    {
      id: "linkedin",
      name: "LINKEDIN",
      label: "LINKEDIN",
      type: "external",
      url: "https://linkedin.com/in/adarshz001",
      symbol3D: "linkedin",
      icon: "linkedin",
      angle: Math.PI * 1.25, // 225°
      radiusMult: 0.98,
      description: "Professional network & verified achievements",
      color: "#0ea5e9"
    },
    {
      id: "instagram",
      name: "INSTAGRAM",
      label: "INSTAGRAM",
      type: "external",
      url: "https://www.instagram.com/adars_hz_?vrfl=ZDNlZDc0MzIxNw%3D%3D",
      symbol3D: "instagram",
      icon: "instagram",
      angle: Math.PI * 1.5, // 270°
      radiusMult: 1.02,
      description: "Developer updates & tech journey",
      color: "#ec4899"
    },
    {
      id: "contact",
      name: "CONTACT",
      label: "CONTACT",
      type: "section",
      target: "contact",
      symbol3D: "envelope",
      icon: "envelope",
      angle: Math.PI * 1.75, // 315°
      radiusMult: 0.97,
      description: "Direct email messaging & collaboration inquiries",
      color: "#f59e0b"
    }
  ],

  // 9. Authentic Photos & Visual Gallery
  // Uses authentic project assets without any placeholder personal photos
  photos: [
    {
      id: "profile-portrait",
      title: "Adarsh M S",
      subtitle: "Full Stack Developer • MCA Candidate",
      category: "Profile",
      image: "/hero.png",
      aspect: "portrait",
      caption: "Official developer portrait of Adarsh M S (Kannur, Kerala). Specializing in Python, MERN stack, and modern scalable system architectures."
    },
    {
      id: "neuroface-arch",
      title: "NeuroFace AI Attendance Architecture",
      subtitle: "MTCNN Detection & ArcFace Embeddings",
      category: "AI / ML",
      badge: "AI Vision Pipeline",
      gradient: "linear-gradient(135deg, #1e3a8a 0%, #030712 100%)",
      caption: "Facial-recognition multi-student classroom attendance pipeline using MTCNN for face detection and 512D ArcFace cosine distance embeddings with duplicate rejection."
    },
    {
      id: "life-connect-workflow",
      title: "Life Connect Registry System",
      subtitle: "3-Role Organ Donation Web Platform",
      category: "Full Stack",
      badge: "Platform Architecture",
      gradient: "linear-gradient(135deg, #065f46 0%, #030712 100%)",
      caption: "End-to-end organ donation platform with role-based authentication, real-time application tracking, document uploads, and administrative verification."
    },
    {
      id: "study-planner-model",
      title: "Smart Study Planner Engine",
      subtitle: "Scikit-Learn Decision Tree Regression",
      category: "AI / ML",
      badge: "ML Scheduling Model",
      gradient: "linear-gradient(135deg, #78350f 0%, #030712 100%)",
      caption: "Machine learning study scheduler predicting preparation intensity and automating timetable generation across subjects via a responsive Flask interface."
    },
    {
      id: "galaxy-core-vis",
      title: "3D Cosmic Galaxy Engine",
      subtitle: "22,000+ Particle Additive Simulation",
      category: "Three.js / 3D",
      badge: "WebGL Engine",
      gradient: "linear-gradient(135deg, #581c87 0%, #030712 100%)",
      caption: "Real-time astrophysical particle simulation featuring dense stellar core, 3-arm logarithmic spiral, dynamic spectrum theming, and 3D navigation nodes."
    }
  ]
};
