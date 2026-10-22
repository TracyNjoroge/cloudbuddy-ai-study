export type QuizQuestion = {
  id: string;
  category: string;
  question: string;
  choices: string[];
  correctAnswer: number;
  explanation: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'cloud-benefit',
    category: 'Cloud Concepts',
    question: 'A small business wants to launch a website without buying servers upfront. Which cloud benefit helps most?',
    choices: [
      'Pay-as-you-go pricing',
      'Manual hardware maintenance',
      'A fixed amount of physical storage',
      'A requirement to build a data center',
    ],
    correctAnswer: 0,
    explanation:
      'Pay-as-you-go lets the business use cloud resources and pay for what it consumes instead of making a large hardware investment first.',
  },
  {
    id: 'paas',
    category: 'Cloud Concepts',
    question: 'A developer wants to deploy a web app while Azure manages the operating system and runtime. Which service model fits best?',
    choices: ['Infrastructure as a Service (IaaS)', 'Platform as a Service (PaaS)', 'Software as a Service (SaaS)', 'On-premises hosting'],
    correctAnswer: 1,
    explanation:
      'PaaS provides a managed platform for building and running an application. The developer focuses on the app while the provider manages much of the underlying infrastructure.',
  },
  {
    id: 'availability-zone',
    category: 'Azure Architecture and Services',
    question: 'Why might an application use multiple Availability Zones in the same Azure region?',
    choices: [
      'To remove the need for any application code',
      'To make every resource free',
      'To improve resilience if one zone has a failure',
      'To move the application outside Azure',
    ],
    correctAnswer: 2,
    explanation:
      'Availability Zones are separate locations within a region with independent power, cooling, and networking. Spreading resources across zones can keep an app available if one zone has an issue.',
  },
  {
    id: 'resource-groups',
    category: 'Azure Management and Governance',
    question: 'What is a practical purpose of an Azure resource group?',
    choices: [
      'To group related resources for management and lifecycle actions',
      'To replace all Azure regions',
      'To create a personal internet connection',
      'To guarantee that an app never needs monitoring',
    ],
    correctAnswer: 0,
    explanation:
      'A resource group is a logical container for related Azure resources. It helps you manage them together, apply organization, and remove a solution cleanly when it is no longer needed.',
  },
  {
    id: 'cost-management',
    category: 'Azure Management and Governance',
    question: 'A team wants an alert when its Azure spending reaches a chosen amount. Which capability should it use?',
    choices: ['Azure Cost Management budgets', 'Availability Zones', 'Virtual machine extensions', 'Azure regions'],
    correctAnswer: 0,
    explanation:
      'Cost Management budgets let a team define spending thresholds and receive alerts as actual or forecast costs approach those thresholds.',
  },
];
