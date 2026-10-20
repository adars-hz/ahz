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
      "Full Stack Developer",
      "Python & React.js Developer",
      "MCA Student"
    ],
    statusPill: "Ahz CTRL",
    statusSubtitle: "System Core Online",
    location: "Kannur, Kerala, India",
    availability: "Available for Software Development Roles"
  },

  // 2. Direct Social Links from Resume
  socials: {
    github: "https://github.com/adars-hz",
    linkedin: "https://linkedin.com/in/adarshz001",
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

  // 4. Academic Projects from Resume
  projects: [
    {
      id: "neuroface",
      title: "NeuroFace – AI Student Attendance System",
      tagline: "Facial-Recognition Attendance with Multi-Face Detection",
      category: "AI & Full Stack",
      description: "Engineered a facial-recognition attendance system using MTCNN for face detection and ArcFace embeddings to identify multiple students in a single classroom frame. Implemented automatic attendance marking with duplicate-attendance prevention and unknown-face rejection. Designed 3 role-based dashboards (Admin, Teacher, Student) with subject-wise attendance, leave management, and exam eligibility tracking against an 85% requirement.",
      tags: ["Python", "React.js", "FastAPI", "MTCNN", "ArcFace", "AI/ML"],
      githubUrl: "https://github.com/adars-hz",
      liveUrl: "https://github.com/adars-hz",
      stats: { stars: "AI Model", forks: "ArcFace" },
      image: "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)"
    },
    {
      id: "life-connect",
      title: "Life Connect Registry – Organ Donation Platform",
      tagline: "Role-Based Organ Donation & Donor-Recipient Management",
      category: "Full Stack",
      description: "Built a responsive organ donation platform supporting 3 user roles (donor, recipient, admin) with registration and secure authentication. Developed dashboards, application status tracking, document upload, and admin verification workflows with accessible, mobile-first responsive design.",
      tags: ["HTML", "CSS", "JavaScript", "Responsive Design", "Authentication"],
      githubUrl: "https://github.com/adars-hz",
      liveUrl: "https://github.com/adars-hz",
      stats: { stars: "3 Roles", forks: "Verified" },
      image: "linear-gradient(135deg, #065f46 0%, #022c22 100%)"
    },
    {
      id: "smart-study-planner",
      title: "Smart Study Planner – AI-Powered Timetable Generator",
      tagline: "Machine Learning Timetable Generator & Study Optimizer",
      category: "AI & Backend",
      description: "Developed an AI-based study planner that predicts subject priority using Decision Tree Regression (Scikit-Learn). Automated study-time allocation across subjects based on exam schedules and preparation levels, with an interactive Flask web interface generating personalized study timetables in real time.",
      tags: ["Python", "Flask", "Scikit-Learn", "Machine Learning", "Decision Tree"],
      githubUrl: "https://github.com/adars-hz",
      liveUrl: "https://github.com/adars-hz",
      stats: { stars: "ML Regression", forks: "Flask" },
      image: "linear-gradient(135deg, #4c1d95 0%, #1e1b4b 100%)"
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
      { label: "Projects Completed", value: "3+" },
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
  }
};
