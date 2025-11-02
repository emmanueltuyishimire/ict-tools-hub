
export const faqData = [
    { question: "What is a user quota?", answer: "A user quota is a limit set by a system administrator on the amount of a specific system resource a user can consume. The most common type is a disk quota, which limits storage space, but quotas can also be applied to network bandwidth, CPU time, or memory." },
    { question: "Why is quota management important?", answer: "In any multi-user environment (like a web host, university server, or corporate file server), quotas are essential for ensuring fair usage and system stability. They prevent a single user from monopolizing a resource and negatively impacting all other users, for example by filling up the entire disk." },
    { question: "What is the difference between a hard quota and a soft quota?", answer: "A hard quota is a strict, enforced limit. Once a user hits their hard quota, they are completely blocked from consuming more of that resource. A soft quota acts as a warning threshold. When a user exceeds their soft quota, they are typically notified but allowed to continue for a grace period, giving them time to reduce their usage." },
    { question: "How does this calculator work?", answer: "This tool performs a simple calculation: it multiplies the 'Number of Users' by the 'Quota per User' to find the 'Total Allocated' resources. It then compares this to the 'Total Available Resource' to show you how much space is remaining, helping you see if your allocation plan is feasible." },
    { question: "Should I allocate 100% of my available resources?", answer: "No, this is not recommended. You should always leave a buffer or reserve a portion of your total resources (e.g., 10-20%) for the operating system, system services, logs, and unexpected growth. Allocating 100% of your disk space to user quotas is a recipe for running out of space." },
    { question: "Can this tool be used for planning bandwidth quotas?", answer: "Yes. While the language often refers to disk space (GB, TB), the calculation is generic. You can use it to plan any divisible resource. For example, if you have a total of 1000 Mbps of bandwidth to share among 100 users, you can use the calculator to model different quota scenarios (e.g., 5 Mbps per user)." },
    { question: "What is 'over-provisioning' or 'over-allocation'?", answer: "Over-provisioning is when you allocate more resources than you physically have available. This is common with 'thin provisioning' in virtual environments. This tool will warn you if your plan is over-allocated, as it can lead to system failures if all users attempt to use their full quota simultaneously." },
    { question: "Is it safe to use this tool?", answer: "Yes. All calculations are performed entirely within your web browser. No data about your resources or users is ever sent to our servers." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the User Quota Calculator',
    description: 'A step-by-step guide to planning resource allocation for multiple users.',
    step: [
        { '@type': 'HowToStep', name: 'Step 1: Define Total Resource', text: 'Enter the total amount of the shared resource you have available (e.g., 1000 GB of disk space).' },
        { '@type': 'HowToStep', name: 'Step 2: Define User Base', text: 'Enter the total number of users who will be sharing this resource.' },
        { '@type': 'HowToStep', name: 'Step 3: Set Per-User Quota', text: 'Enter the amount of the resource you want to allocate to each individual user (e.g., 10 GB).' },
        { '@type': 'HowToStep', name: 'Step 4: Review Allocation', text: 'The tool will instantly show you the total resources allocated and how much is left over, helping you validate your plan.' },
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'Quota', definition: 'An enforced limit on the amount of a system resource (like disk space) that a user or group is allowed to consume.' },
    { term: 'Resource Allocation', definition: 'The process of assigning and managing assets and resources in a manner that supports an organization\'s strategic goals.' },
    { term: 'Multi-user System', definition: 'A computer system that allows multiple users to access it simultaneously (e.g., a web server, a university file server).' },
    { term: 'Fair Usage Policy', definition: 'A policy that defines the acceptable level of resource consumption to ensure that no single user degrades the service for others.' },
    { term: 'Capacity Planning', definition: 'The process of determining the resources needed to meet future demands. Quota calculation is a key part of capacity planning.' },
];
