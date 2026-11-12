import type { ExperienceItem } from './types';

// Listed in the order given; reorder most-recent-first once dates are filled in.
export const experience: readonly ExperienceItem[] = [
  
{
  id: 'beckman-coulter',
  organization: 'Beckman Coulter Diagnostics',
  title: 'Software Engineering Intern',
  location: 'Chaska, Minnesota',
  start: 'June 2026',
  end: 'August 2026',
  summary:
    'Developed and tested C#/.NET software for the DxI 9000 immunoassay analyzer, improving system reliability, hardware compatibility, and installation workflows.',
  highlights: [
    'Resolved a race condition between SQL Server initialization and IoT Edge verification by implementing bounded retry logic, eliminating false verification failures.',
    'Redesigned the RSM2 hardware control architecture using inheritance and polymorphism, enabling new hardware support and unblocking 6 downstream features.',
    'Delivered 4 software features and resolved 2 defects while maintaining backward compatibility with existing hardware.',
    'Developed and executed unit, integration, boundary, and regression tests using Azure DevOps, Moq, Microsoft Fakes, and dedicated Windows test environments.',
  ],
  tech: [
    'C#',
    '.NET',
    'SQL Server',
    'Azure DevOps',
    'Azure IoT Edge',
    'Moq',
    'Microsoft Fakes',
    'Git',
    'PowerShell',
  ],
},
{
  id: 'us-bank',
  organization: 'U.S. Bank',
  title: 'Software Engineering Intern',
  location: '{{ Confirm location }}',
  start: 'June 2025',
  end: 'August 2025',
  summary:
    'Built data engineering and automation solutions using Python, PySpark, SQL, and Microsoft Fabric to optimize enterprise Power BI infrastructure and improve audit visibility.',
  highlights: [
    'Analyzed 1,400+ Power BI workspaces and identified 400+ inactive workspaces, supporting optimization efforts with an estimated 15% reduction in storage usage.',
    'Developed automated workspace monitoring and owner notification workflows to identify resources inactive for more than 6 months.',
    'Built a custom audit logging solution using the Power BI Admin API to capture detailed user and workspace activity.',
    'Used PySpark and SQL within Microsoft Fabric Lakehouses to merge, deduplicate, transform, and validate enterprise datasets.',
  ],
  tech: [
    'Python',
    'PySpark',
    'SQL',
    'Microsoft Fabric',
    'Power BI',
    'REST APIs',
    'Microsoft Graph API',
    'Git',
    'Jira',
    'Confluence',
  ],
},
{
  id: 'st-thomas-infosec',
  organization: 'University of St. Thomas',
  title: 'Information Security Analyst',
  employmentType: 'Student worker',
  location: 'St. Paul, Minnesota',
  start: '{{ Confirm start date }}',
  end: '{{ Confirm end date or Present }}',
  summary:
    'Supported campus identity security operations and developed Python automation to investigate suspicious authentication activity and improve security risk triage.',
  highlights: [
    'Developed a Python automation pipeline integrating Microsoft Graph and Scamalytics APIs to identify and assess anonymized IP addresses associated with risky sign-ins.',
    'Implemented OAuth 2.0 Client Credentials authentication to securely retrieve Microsoft Entra ID risk detections and sign-in activity.',
    'Designed a SQLite caching system with risk-based TTL policies, refreshing high-risk results daily while reducing unnecessary API requests for lower-risk activity.',
    'Investigated suspicious authentication events using MFA status, device information, sign-in logs, and Active Directory context.',
  ],
  tech: [
    'Python',
    'Microsoft Entra ID',
    'Active Directory',
    'Microsoft Graph API',
    'OAuth 2.0',
    'SQLite',
    'REST APIs',
    'Scamalytics API',
  ],
},
];
