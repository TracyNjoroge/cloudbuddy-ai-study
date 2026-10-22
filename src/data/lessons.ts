export type SuggestedTopic = {
  id: string;
  label: string;
  icon: string;
};

export type Lesson = {
  id: string;
  title: string;
  category: string;
  explanation: string;
  africanExample: string;
  takeaways: string[];
};

export const suggestedTopics: SuggestedTopic[] = [
  { id: 'virtual-machines', label: 'Virtual Machines', icon: 'Server' },
  { id: 'cloud-computing', label: 'Cloud Computing', icon: 'Cloud' },
  { id: 'availability-zones', label: 'Availability Zones', icon: 'ShieldCheck' },
  { id: 'iaas-paas-saas', label: 'IaaS vs PaaS vs SaaS', icon: 'Layers' },
];

export const topicCards = [
  {
    id: 'cloud-concepts',
    title: 'Cloud Concepts',
    description: 'Understand what the cloud is and why it matters.',
    icon: 'Cloud',
  },
  {
    id: 'azure-architecture',
    title: 'Azure Architecture and Services',
    description: 'Explore the building blocks of Azure.',
    icon: 'Network',
  },
  {
    id: 'azure-management',
    title: 'Azure Management and Governance',
    description: 'Learn how to manage and secure your resources.',
    icon: 'Settings',
  },
];

export type TopicGuide = {
  id: string;
  title: string;
  summary: string;
  concepts: { name: string; explanation: string }[];
  example: string;
};

export const topicGuides: Record<string, TopicGuide> = {
  'cloud-concepts': {
    id: 'cloud-concepts',
    title: 'Azure Cloud Concepts',
    summary: 'Learn why organizations use cloud services and how responsibility changes between cloud models.',
    concepts: [
      { name: 'Shared responsibility', explanation: 'Azure manages more of the physical infrastructure, while you remain responsible for the parts you configure, such as your data, identities, and access.' },
      { name: 'Elasticity and scalability', explanation: 'Scalability adds capacity as demand grows. Elasticity lets capacity expand or shrink as demand changes.' },
      { name: 'IaaS, PaaS, and SaaS', explanation: 'IaaS gives you infrastructure, PaaS gives you a managed platform for your app, and SaaS gives you a finished application to use.' },
    ],
    example: 'A growing Nairobi delivery business can start by renting cloud computing resources, add capacity during busy periods, and reduce it after demand drops instead of buying a large server room upfront.',
  },
  'azure-architecture': {
    id: 'azure-architecture',
    title: 'Azure Architecture and Services',
    summary: 'Understand how Azure organizes locations and the main services used to build cloud solutions.',
    concepts: [
      { name: 'Regions and Availability Zones', explanation: 'A region is a geographic area containing Azure datacenters. Availability Zones are separate datacenter locations within some regions that help protect workloads from local failures.' },
      { name: 'Resource groups', explanation: 'A resource group is a logical container for related resources, making it easier to manage a solution together.' },
      { name: 'Core services', explanation: 'Azure Virtual Machines provide computing, Azure Storage stores data, and Azure Virtual Network connects resources securely.' },
    ],
    example: 'A Lagos media company might store videos in Azure Storage, run its processing software on a Virtual Machine, and use a Virtual Network to keep internal services connected securely.',
  },
  'azure-management': {
    id: 'azure-management',
    title: 'Azure Management and Governance',
    summary: 'Learn how Azure helps teams organize resources, control access, monitor systems, and manage spending.',
    concepts: [
      { name: 'Azure Policy', explanation: 'Azure Policy checks resources against rules, such as requiring approved regions or tags, and can help enforce organizational standards.' },
      { name: 'Role-based access control', explanation: 'Azure RBAC gives people only the permissions they need for their role, such as viewing resources or managing virtual machines.' },
      { name: 'Cost Management and monitoring', explanation: 'Budgets and cost alerts help track spending, while Azure Monitor helps observe the health and performance of resources.' },
    ],
    example: 'A school can use tags to group resources by department, give an IT assistant limited access through RBAC, and set a budget alert before monthly cloud spending becomes too high.',
  },
};

export const lessons: Record<string, Lesson> = {
  'virtual-machines': {
    id: 'virtual-machines',
    title: 'Virtual Machines',
    category: 'Azure Architecture and Services',
    explanation:
      'A Virtual Machine (VM) is a computer that runs inside another computer. Instead of buying physical hardware, you rent a slice of a big server in the cloud. You choose the size, the operating system, and what software runs on it, just like a real computer, but it lives in a data center far away.',
    africanExample:
      'Think of a VM like renting a room in a big guesthouse instead of building your own house. You do not own the bricks, but you control who comes in, what you cook, and how you decorate. If you outgrow the room, you can move to a bigger one the next day, no construction needed.',
    takeaways: [
      'A VM is a rented computer running in a cloud data center.',
      'You choose the operating system and software.',
      'You pay for what you use, and can scale up or down quickly.',
    ],
  },
  'cloud-computing': {
    id: 'cloud-computing',
    title: 'Cloud Computing',
    category: 'Cloud Concepts',
    explanation:
      'Cloud computing means using computers, storage, and software over the internet instead of owning them yourself. Someone else owns and maintains the big machines, and you rent access to them, paying only for what you use, when you use it.',
    africanExample:
      'Picture a communal borehole in a village. No single family digs their own well, everyone pays a small fee for the water they actually fetch. The water company keeps the pump working, and you just bring your bucket.',
    takeaways: [
      'Cloud = rent computing power over the internet.',
      'You pay only for what you use.',
      'Someone else handles maintenance and repairs.',
    ],
  },
  'availability-zones': {
    id: 'availability-zones',
    title: 'Availability Zones',
    category: 'Azure Architecture and Services',
    explanation:
      'An Availability Zone is a separate group of data centers within a region, with its own power, cooling, and network. If one zone has a problem, the others keep running. Spreading your work across zones keeps your app online even when something fails.',
    africanExample:
      'Imagine a market with three separate sections, each with its own generator and water tank. If a fire hits one section, the other two still trade and customers can keep shopping. By not putting all your stalls in one corner, you protect against disaster.',
    takeaways: [
      'A region can have multiple Availability Zones.',
      'Each zone is independent in power and network.',
      'Using more than one zone protects you from failures.',
    ],
  },
  'iaas-paas-saas': {
    id: 'iaas-paas-saas',
    title: 'IaaS vs PaaS vs SaaS',
    category: 'Cloud Concepts',
    explanation:
      'These are three ways to consume cloud services. IaaS gives you the raw infrastructure (servers, storage). PaaS gives you a platform to build on without managing the underlying servers. SaaS gives you a finished product you simply use. Each shifts more responsibility from you to the provider.',
    africanExample:
      'Think of eating at a restaurant. IaaS is renting the kitchen and cooking yourself. PaaS is ordering from a buffet, the stove and ingredients are ready, you just plate the meal. SaaS is having a plate of jollof rice brought to your table, nothing for you to prepare at all.',
    takeaways: [
      'IaaS = you manage almost everything.',
      'PaaS = provider manages the platform, you focus on your app.',
      'SaaS = a finished product you just use.',
    ],
  },
};
