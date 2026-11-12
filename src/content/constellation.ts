import type { ConstellationContent } from './types';

/**
 * Skill constellation content.
 *
 * - Each skill's category is looked up from `skillGroups` (skills.ts), so it isn't repeated here.
 * - "Used in" entries are derived from the `tech` lists in experience.ts, projects.ts and
 *   `supportingProjects` below. Nothing about usage is written by hand in this file.
 * - Only skills with at least one piece of evidence belong here.
 */
export const constellation: ConstellationContent = {
  centerLabel: 'Software Engineer',
  instruction: 'Select a skill to see where I have used it.',

  skills: [
    // Software Engineering
    {
      name: 'Python',
      alsoIn: ['data'],
      description:
        'A general-purpose programming language widely used for automation, data processing and back-end services.',
    },
    {
      name: 'C#',
      description: "Microsoft's statically typed, object-oriented language for building applications on .NET.",
    },
    {
      name: 'Java',
      description: 'A statically typed, object-oriented language that runs on the Java Virtual Machine.',
    },
    {
      name: 'Object-Oriented Programming',
      description:
        'A design approach that organizes code into classes and objects, using interfaces, inheritance and polymorphism.',
    },
    {
      name: 'JavaScript',
      description: 'The programming language of the web, used to make pages interactive in the browser.',
    },
    {
      name: 'TypeScript',
      description: 'A typed superset of JavaScript that catches errors at build time.',
    },
    {
      name: 'React',
      description: 'A JavaScript library for building user interfaces from reusable components.',
    },
    {
      name: '.NET',
      description: "Microsoft's platform and runtime for building and running C# applications.",
    },
    {
      name: 'Flask',
      description: 'A lightweight Python web framework for building web applications and APIs.',
    },
    {
      name: 'SQL',
      alsoIn: ['data'],
      description: 'The standard language for querying and transforming data in relational databases.',
    },
    {
      name: 'REST APIs',
      description: 'Web interfaces that expose data and actions over HTTP using standard methods and URLs.',
    },

    // Data Engineering
    {
      name: 'PySpark',
      description: 'The Python API for Apache Spark, used to process large datasets in parallel.',
    },
    {
      name: 'Microsoft Fabric',
      description: "Microsoft's analytics platform that brings data engineering, lakehouses and Power BI together.",
    },
    {
      name: 'Power BI',
      description: "Microsoft's business intelligence platform for reports and dashboards.",
    },
    {
      name: 'SQL Server',
      description: "Microsoft's relational database management system.",
    },
    {
      name: 'SQLite',
      description: 'A lightweight, file-based SQL database that runs inside the application that uses it.',
    },

    // Cybersecurity
    {
      name: 'Microsoft Entra ID',
      description: "Microsoft's cloud identity and access management service, formerly Azure Active Directory.",
    },
    {
      name: 'Active Directory',
      description: "Microsoft's directory service for managing users, devices and access on Windows networks.",
    },
    {
      name: 'Microsoft Graph API',
      description:
        'A single REST API for Microsoft 365 and Entra ID data, such as users, sign-ins and risk detections.',
    },
    {
      name: 'OAuth 2.0',
      description: 'The industry-standard protocol for letting applications access APIs without sharing passwords.',
    },
    {
      name: 'Security Automation',
      evidenceAliases: ['Scamalytics API'],
      description: 'Using code to collect, enrich and triage security data so analysts can focus on real risks.',
    },

    // AI & Machine Learning
    {
      name: 'AI Agents',
      description: 'Software that uses language models to plan and carry out tasks, often alongside other agents.',
    },
    {
      name: 'Heuristic Algorithms',
      description: 'Rule-based strategies that score options to make good decisions quickly without exhaustive search.',
    },
    {
      name: 'Simulation Testing',
      description: 'Evaluating software by running many automated, simulated scenarios and measuring the results.',
    },

    // Tools & Platforms
    {
      name: 'Git',
      description: 'A distributed version control system for tracking and collaborating on code changes.',
    },
    {
      name: 'Azure DevOps',
      description: "Microsoft's platform for source control, work tracking, pipelines and test management.",
    },
    {
      name: 'GitHub Actions',
      description: "GitHub's automation platform for running builds, tests and other workflows on each change.",
    },
    {
      name: 'PowerShell',
      description: "Microsoft's command-line shell and scripting language for automating Windows tasks.",
    },
    {
      name: 'Pytest',
      description: 'A Python testing framework for writing concise, readable automated tests.',
    },
  ],

  // Shown only in the constellation's detail panel, not in the Projects section.
  supportingProjects: [
    {
      id: 'amazon-purchase-reflection',
      name: 'Amazon Purchase Reflection',
      context: 'Research project · University of St. Thomas',
      summary:
        'A web application for a faculty-led research project on consumer purchasing behavior and how personal values influence spending decisions.',
      highlights: [
        'Built the application in React, using React state management, Material UI and drag-and-drop interactions.',
        'Imported and processed Amazon purchase-history CSV files so users could categorize purchases and reflect on their spending decisions.',
        'Added interactive value-rating sliders and written reflections.',
        'Visualized relationships between purchases and personal values as an interactive bipartite graph using React Flow.',
        'The research was presented at an undergraduate research poster session.',
      ],
      tech: ['React', 'JavaScript', 'React Flow', 'Material UI'],
      links: [],
    },
    {
      id: 'sustainability-trivia',
      name: 'Sustainability Trivia Game',
      context: 'Contest-winning team project · University of St. Thomas',
      summary:
        'A Java desktop quiz game with multiple-choice and true/false questions about sustainability, built by a team of four.',
      highlights: [
        'Built in Java with a JavaFX interface for choosing a quiz type, answering questions and viewing a final score.',
        'Used object-oriented programming to model questions: a Question interface is extended by multiple-choice and true/false question types, each implemented by its own class.',
        'Game flow supports moving between questions, submitting answers, scoring and restarting the quiz.',
      ],
      tech: ['Java', 'JavaFX', 'Object-Oriented Programming'],
      links: [{ label: 'GitHub', href: 'https://github.com/3luko/SustainabilityTrivia_UST' }],
    },
    {
      id: 'portfolio-site',
      name: 'This portfolio',
      context: 'Personal project',
      summary:
        'The site you are on: a single-page portfolio built with React, TypeScript and Vite, with all content kept in typed data files.',
      highlights: [
        'Built with React function components and hooks, with only react and react-dom as runtime dependencies.',
        'Written in TypeScript, with typed content files so a missing or misspelled field fails the build.',
        'This skill constellation builds its "used in" lists from the same typed experience and project data.',
      ],
      tech: ['React', 'TypeScript', 'Vite', 'CSS Modules'],
      links: [{ label: 'GitHub', href: 'https://github.com/3luko/LukoPortfolio' }],
    },
  ],
};
