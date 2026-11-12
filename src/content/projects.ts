
import type { Project } from './types';

export const projects: readonly Project[] = [
  {
    id: 'agentforge',
    name: 'AgentForge',
    summary:
      'A modular multi-agent development framework that coordinates AI agents to plan, implement, and review software changes.',
    description:
      'Designed and developed a Python-based multi-agent orchestration framework to explore how specialized AI agents can collaborate on software development tasks. Built an orchestrator that coordinates architect, developer, and QA agents through structured message contracts. Implemented dependency injection for language model providers, automated validation, and a bounded retry workflow that incorporates QA feedback into subsequent development attempts.',
    highlights: [
      'Designed a modular architecture with strongly typed, immutable message contracts between agents.',
      'Implemented an orchestration pipeline with architect, developer, and QA responsibilities.',
      'Built a QA feedback loop that supports up to two additional development attempts when reviews fail.',
      'Created automated tests using a stub LLM provider to validate workflows without external API costs.',
    ],
    tech: [
      'Python',
      'Object-Oriented Programming',
      'AI Agents',
      'Pytest',
      'Ruff',
      'GitHub Actions',
    ],
    links: [],
  },
  {
    id: 'bomja',
    name: 'BOMJA',
    summary:
      'A full-stack event promotion website with dynamic content management and an administrative dashboard.',
    description:
      'Developed a responsive event promotion platform for a client to centralize event information, promotional media, and ticket links. Built the backend using Python and Flask, with database-backed content management that allows the organizer to update website information without modifying application code. Implemented administrative functionality to manage content and images, creating a more maintainable solution for ongoing event promotion.',
    highlights: [
      'Developed a responsive, single-page website with intuitive section-based navigation.',
      'Built an administrative interface for updating images, links, and promotional content.',
      'Integrated database-backed content management using Flask and SQLite.',
      'Implemented authentication and security protections for administrative workflows.',
    ],
    tech: [
      'Python',
      'Flask',
      'SQLite',
      'HTML',
      'CSS',
      'JavaScript',
      'Jinja2',
    ],
    links: [],
  },
  {
    id: 'scamalytics-risk-automation',
    name: 'Scamalytics Risk Automation',
    summary:
      'An automated cybersecurity investigation tool that enriches suspicious sign-in activity with IP risk intelligence.',
    description:
      'Developed a Python automation solution to support identity security investigations involving anonymized IP addresses detected through Microsoft Entra ID. Integrated Microsoft Graph using OAuth 2.0 client credentials to retrieve risk detections and connected the Scamalytics API to obtain IP risk scores. Designed a SQLite caching system with risk-based expiration policies to reduce unnecessary API requests while prioritizing higher-risk activity for more frequent evaluation.',
    highlights: [
      'Integrated Microsoft Graph and Scamalytics APIs to automate IP risk enrichment.',
      'Implemented OAuth 2.0 client credentials for unattended authentication.',
      'Developed a SQLite caching system with risk-based TTL policies.',
      'Prioritized scores of 75 or higher for daily refreshes, with lower-risk scores refreshed every 3–14 days.',
      'Supported security investigations using contextual risk indicators rather than relying solely on IP scores.',
    ],
    tech: [
      'Python',
      'Microsoft Graph API',
      'Microsoft Entra ID',
      'OAuth 2.0',
      'Scamalytics API',
      'SQLite',
      'REST APIs',
    ],
    links: [],
  },
  {
    id: 'matatu-ai',
    name: 'Matatu AI',
    summary:
      'A C# card game featuring a strategic AI opponent that evaluates game states and selects moves using heuristic algorithms.',
    description:
      'Developed a C#/.NET implementation of Matatu, a traditional Ugandan card game, featuring an autonomous computer opponent. Designed a modular AI decision system that evaluates legal moves based on card values, special-card effects, opponent hand size, and suit distribution. Separated decision-making from game execution and implemented interchangeable AI strategies to enable automated simulations and performance comparisons against a random baseline.',
    highlights: [
      'Implemented a heuristic AI opponent that evaluates legal moves and selects strategic actions.',
      'Designed interchangeable agent implementations using object-oriented interfaces.',
      'Built automated game simulations to evaluate AI performance against a random opponent.',
      'Achieved a 58.1% decisive win rate across 5,000 held-out simulation games.',
      'Applied object-oriented design principles to separate game rules, state management, and AI decision-making.',
    ],
    tech: [
      'C#',
      '.NET',
      'Object-Oriented Programming',
      'Heuristic Algorithms',
      'Simulation Testing',
    ],
    links: [],
  },
];
