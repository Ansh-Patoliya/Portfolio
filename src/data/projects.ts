/**
 * Project content.
 *
 * To add a project: append an object to `projects` and pick a `category`.
 * Projects are shown grouped by category, in the order they appear in this file.
 *
 *  - githubUrl  link to the repo (leave out for private repos and set isPrivate: true)
 *  - liveUrl    link to a deployed demo (optional)
 *  - image      screenshot shown on the card and in the details popup (optional)
 *  - description supports **bold**, blank lines for paragraphs and "* " bullet lines
 */

export type CategoryId = "analytics" | "ai" | "web" | "apps" | "learning";

export type Category = {
  id: CategoryId;
  label: string;
  blurb: string;
};

export const categories: Category[] = [
  {
    id: "analytics",
    label: "Data Analytics",
    blurb: "Interactive dashboards that turn raw data into decisions.",
  },
  {
    id: "ai",
    label: "AI & Machine Learning",
    blurb: "Tools built on top of Gemini and modern ML workflows.",
  },
  {
    id: "web",
    label: "Full-stack Web Apps",
    blurb: "Platforms, simulators and sites built end to end.",
  },
  {
    id: "apps",
    label: "Desktop Apps",
    blurb: "JavaFX desktop applications.",
  },
  {
    id: "learning",
    label: "Learning & Academic",
    blurb: "Notes, practice and first-year projects.",
  },
];

export type Project = {
  title: string;
  category: CategoryId;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  isPrivate?: boolean;
};

export const projects: Project[] = [
  /* ------------------------------ Data Analytics ------------------------------ */
  {
    title: "Stock Market Analytics Dashboard",
    category: "analytics",
    description:
      "The **Stock Market Analytics Dashboard** is a comprehensive, interactive Power BI suite designed to analyze stock market behavior. Utilizing **5-minute OHLCV (Open, High, Low, Close, Volume)** historical data, it computes and visualizes trend metrics, momentum indicators, volatility indices, and key candlestick statistical behaviors to empower traders and analysts with actionable market insights.\n\n" +
      "Key Objectives:\n" +
      "* **Price Analysis**: Track intraday trend cycles and micro-movements.\n" +
      "* **Trend Detection**: Highlight market directions using multi-interval Moving Averages and Cross-over markers.\n" +
      "* **Momentum Monitoring**: Gauge oversold and overbought conditions.\n" +
      "* **Volatility Analysis**: Quantify risk parameters using price deviations.\n" +
      "* **Candlestick Statistics**: Measure structural candle configurations (wicks, body proportions).\n" +
      "* **Interactive Design**: Deliver a modern dashboard optimized for performance.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=80",
    tags: ["Power BI", "Python", "Data Analytics", "Finance", "SQL"],
    githubUrl: "https://github.com/Ansh-Patoliya/Stock-Market-Analytics-Dashboard",
  },
  {
    title: "IPL Analytics Dashboard",
    category: "analytics",
    description:
      "An interactive and dynamic **Power BI Dashboard** that provides comprehensive insights into Indian Premier League (IPL) matches, team performances, and player statistics across multiple seasons.\n\n" +
      "This dashboard is designed to analyze IPL historical data to help cricket enthusiasts, analysts, and franchise managers gain deep insights into match trends, player profiles, and team statistics.\n\n" +
      "The dashboard leverages **Power Query** for data transformation, **DAX (Data Analysis Expressions)** for advanced calculations/measures, and modern **Power BI visuals** for interactive storytelling.",
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1400&q=80",
    tags: ["Power BI", "Data Analytics", "EDA", "SQL"],
    githubUrl: "https://github.com/Ansh-Patoliya/IPL-Dashboard",
  },

  /* ----------------------------- AI & Machine Learning ----------------------------- */
  {
    title: "AI Video & Voice Transcriber",
    category: "ai",
    description:
      "A web app that turns uploaded video or audio files, or links such as YouTube, into accurate **timestamped transcripts**.\n\n" +
      "An interactive studio keeps the transcript in sync with the video, supports inline editing and **AI-generated summaries**, and exports to SRT, PDF, DOCX, CSV and TXT.\n\n" +
      "Built with a **React + TypeScript** frontend, a **FastAPI** backend, the **Google Gemini API** for transcription, and FFmpeg and yt-dlp for media handling.",
    tags: ["React", "TypeScript", "FastAPI", "Gemini API", "FFmpeg"],
    githubUrl: "https://github.com/Ansh-Patoliya/AiVideo_Voice_Trans",
    liveUrl: "https://ai-video-voice-trans.vercel.app",
  },
  {
    title: "OmniDoc AI",
    category: "ai",
    description:
      "A **Streamlit** app that turns raw text, document photos, handwritten notes and diagrams into styled **PDF reports**.\n\n" +
      "**Google Gemini** handles text extraction, document structuring and automatic styling, ReportLab generates the PDF, and Mermaid flowcharts are rendered straight into the document.",
    tags: ["Python", "Streamlit", "Gemini API", "ReportLab"],
    githubUrl: "https://github.com/Ansh-Patoliya/OmniDoc-AI",
  },
  {
    title: "Mockly",
    category: "ai",
    description:
      "An interview preparation platform where students practice role-specific questions and get personalized feedback.\n\n" +
      "Answers are scored with a **hybrid method**: keyword matching, semantic embeddings and LLM grading. It includes timed mock interviews, a gated **3-round placement simulation** and a performance dashboard.\n\n" +
      "Built with **React**, **Node.js + Express**, **MongoDB** and the **Google Gemini API**.",
    tags: ["React", "Node.js", "MongoDB", "Gemini API"],
    githubUrl: "https://github.com/Mocktra-Forge/Mockly",
  },

  /* ------------------------------- Full-stack Web Apps ------------------------------- */
  {
    title: "Syntra",
    category: "web",
    description:
      "A **hackathon management platform** for organizing and running events, built with a **Django REST Framework** backend and a **Next.js** frontend.\n\n" +
      "Includes a participant console with team registration flows and **QR-based scanning** for volunteers on event day.",
    tags: ["Django REST", "Next.js", "QR Scanning"],
    githubUrl: "https://github.com/Tech-Wizards-1331/syntra",
    liveUrl: "https://syntra-blond.vercel.app",
  },
  {
    title: "HackHub",
    category: "web",
    description:
      "A **Flask** based hackathon management platform with separate **admin, faculty and participant** portals and **QR-code scanning** for check-ins.\n\n" +
      "Uses SQLAlchemy with PostgreSQL and is organized into blueprints for auth, API, admin, faculty, participant and QR flows.",
    tags: ["Flask", "PostgreSQL", "SQLAlchemy", "QR Code"],
    githubUrl: "https://github.com/Tech-Wizards-1331/HackHub",
  },
  {
    title: "Stocxsim",
    category: "web",
    description:
      "A web-based **paper trading simulator** that uses live **NSE/BSE market data** from Angel One SmartAPI.\n\n" +
      "Users can sign up, fund a virtual account, place simulated orders and track their portfolio without risking real money.",
    tags: ["Flask", "Socket.IO", "PostgreSQL", "SmartAPI", "Plotly"],
    githubUrl: "https://github.com/Stocxsim/stocxsim",
  },
  {
    title: "Stocxsim 2.0",
    category: "web",
    description:
      "The second version of Stocxsim, rebuilt around dedicated services: an **order-matching engine**, a **portfolio engine**, a brokerage **charge engine**, watchlists, holdings and transaction history, all on top of live market data.",
    tags: ["Python", "Flask", "PostgreSQL", "WebSockets"],
    isPrivate: true,
  },
  {
    title: "Orbito (TaskFlow)",
    category: "web",
    description:
      "A task management app with **categories, subtasks, due-soon reminders, search, date filters** and dashboard stats.\n\n" +
      "Built with a **Next.js + TypeScript** frontend and an **Express + PostgreSQL** backend, set up for deployment on Vercel, Railway and Supabase.",
    tags: ["Next.js", "TypeScript", "Express", "PostgreSQL"],
    isPrivate: true,
  },
  {
    title: "Tannu Nail Studio",
    category: "web",
    description:
      "A storefront website for a handmade **luxury press-on nails** brand, with a built-in **admin panel** for managing the catalogue.\n\n" +
      "Data lives in **Supabase** and product images are hosted on **Cloudinary**.",
    tags: ["JavaScript", "Supabase", "Cloudinary", "Admin Panel"],
    isPrivate: true,
  },
  {
    title: "Spinner",
    category: "web",
    description: "An interactive web app built with JavaScript and deployed on Vercel.",
    tags: ["JavaScript", "Vercel"],
    githubUrl: "https://github.com/Ansh-Patoliya/Spinner",
    liveUrl: "https://spinner-three-kappa.vercel.app",
  },

  /* ------------------------------ Desktop Apps ------------------------------ */
  {
    title: "Stock Market Simulator",
    category: "apps",
    description:
      "A real-time stock trading simulator built with **Java and JavaFX**.\n\n" +
      "Users can register, log in, add wallet balance, and buy and sell stocks while prices update dynamically through **multithreading**. Data is stored in PostgreSQL via JDBC.",
    tags: ["Java", "JavaFX", "PostgreSQL", "JDBC"],
    githubUrl: "https://github.com/Ansh-Patoliya/Stock-Market-Simulator",
  },
  {
    title: "CampusConnect",
    category: "apps",
    description:
      "A **JavaFX desktop application** for managing campus events, clubs and users, connecting students, club members and administrators.\n\n" +
      "Includes event registration, club membership, **approval workflows**, notifications and reporting, backed by PostgreSQL.",
    tags: ["Java", "JavaFX", "PostgreSQL", "JDBC"],
    githubUrl: "https://github.com/Ansh-Patoliya/CampusConnect",
  },

  /* ------------------------------- Learning & Academic ------------------------------- */
  {
    title: "Python Learning Journal",
    category: "learning",
    description:
      "Day-by-day notes, code and mini projects covering Python basics, data structures, OOP, file handling, NumPy, Pandas and Matplotlib.",
    tags: ["Python", "NumPy", "Pandas", "Matplotlib"],
    githubUrl: "https://github.com/Ansh-Patoliya/python_learning",
  },
  {
    title: "Data Structures & Algorithms in Java",
    category: "learning",
    description:
      "Practice problems and implementations in Java: linked lists, stacks, queues, trees and more, with a progress log.",
    tags: ["Java", "DSA"],
    githubUrl: "https://github.com/Ansh-Patoliya/DSA",
  },
  {
    title: "Machine Learning Notes",
    category: "learning",
    description:
      "Notes, notebooks and exercise solutions from working through Hands-On Machine Learning (2nd edition) with Scikit-Learn, Keras and TensorFlow.",
    tags: ["Scikit-Learn", "Keras", "TensorFlow", "Jupyter"],
    githubUrl: "https://github.com/Ansh-Patoliya/ML_Documentation",
  },
  {
    title: "Employee Management System",
    category: "learning",
    description:
      "A Java application for managing employee details, salaries and leave requests, with role-based access for employees and managers.",
    tags: ["Java", "Sem-1 Project"],
    githubUrl: "https://github.com/Ansh-Patoliya/Sem-1-Project-EmpoyeeManagement",
  },
  {
    title: "Online Banking System",
    category: "learning",
    description:
      "A Java application with account management, loans, fixed deposits and transaction history. Customers register, log in and deposit, withdraw or apply for loans.",
    tags: ["Java", "Sem-1 Project"],
    githubUrl: "https://github.com/Ansh-Patoliya/sem-1-project-OnlineBankingSystem",
  },
];
