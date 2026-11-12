
import type { Profile } from './types';

const name = 'Ethan Lukandwa';

export const profile: Profile = {
  name,
  greeting: 'Hi, my name is',

  headline: 'Software Engineer | Building Reliable, Scalable, and Intelligent Solutions',

  intro:
    "I'm a Computer Science student at the University of St. Thomas with a minor in Data Science and hands-on experience in software engineering, data engineering, and cybersecurity. I've worked on software reliability, data automation, and security-focused solutions at organizations including Beckman Coulter Diagnostics and U.S. Bank. I'm passionate about building technology that solves meaningful problems and continuously expanding my skills.",

  focusAreas: [
    'Software engineering',
    'Data engineering',
    'Cybersecurity',
    'AI',
  ],

  about: [
    "My journey in technology has been driven by curiosity and a desire to understand how things work. I'm pursuing a Bachelor's degree in Computer Science with a minor in Data Science at the University of St. Thomas. Through internships at Beckman Coulter Diagnostics and U.S. Bank, I've gained experience developing software, improving system reliability, and building data-driven solutions. These experiences have strengthened my foundation in Python, C#, SQL, and modern software development practices.",

    "I enjoy solving problems that require both technical thinking and creativity. At Beckman Coulter Diagnostics, I worked on improving software reliability and supporting hardware integration for medical diagnostic systems. At U.S. Bank, I developed data engineering and automation solutions using Python, PySpark, and Microsoft Fabric. My cybersecurity experience has also allowed me to explore identity security, API integrations, and automated risk analysis. Outside of my professional experience, I've been exploring AI agents, building applications, and developing websites for clients.",

    "I'm currently seeking opportunities where I can contribute as a software engineer while continuing to grow across software development, data engineering, cybersecurity, and artificial intelligence. I value collaboration, mentorship, and environments that encourage continuous learning. Beyond writing code, I enjoy connecting with other professionals, taking on new challenges, and turning ideas into practical solutions.",
  ],

  resume: {
    href: `${import.meta.env.BASE_URL}resume.pdf`,
    label: 'View resume',
  },

  contactLabel: 'Get in touch',

  headshot: {
    src: `${import.meta.env.BASE_URL}headshot.jpg`,
    alt: `Portrait of ${name}`,
    width: 1028,
    height: 1028,
  },
};
