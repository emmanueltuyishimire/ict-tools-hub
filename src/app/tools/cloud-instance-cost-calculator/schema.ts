
export const faqData = [
    { question: "What is a VM (Virtual Machine)?", answer: "A Virtual Machine is a software-based emulation of a physical computer. Cloud providers use hypervisors to run multiple VMs on a single physical server, allowing them to rent out compute resources efficiently." },
    { question: "What is a vCPU?", answer: "A vCPU, or virtual Central Processing Unit, represents a share of a physical server's CPU core. Typically, one vCPU maps to one hardware thread. The number of vCPUs is a primary indicator of a VM's processing power." },
    { question: "Why is RAM important for a VM?", answer: "RAM (Random Access Memory) is the fast, short-term memory your VM uses to run its operating system and applications. Insufficient RAM is a common performance bottleneck, forcing the system to use much slower disk storage ('swap'), which dramatically degrades performance, especially for databases and caching servers." },
    { question: "What is 'On-Demand' pricing?", answer: "On-Demand pricing is a pay-as-you-go model where you are billed at a fixed hourly or per-second rate for the compute resources you use, with no long-term commitment. It's flexible but the most expensive pricing model. This calculator's estimates are based on On-Demand prices." },
    { question: "What are 'Reserved Instances' or 'Committed Use Discounts'?", answer: "These are significant discounts (often 40-75%) that cloud providers offer in exchange for a 1-year or 3-year commitment to use a specific amount of compute resources. They are ideal for stable, long-running workloads like production databases and web servers." },
    { question: "What are 'Spot Instances'?", answer: "Spot Instances allow you to bid on spare, unused compute capacity in a provider's data center for discounts up to 90%. However, the provider can terminate your instance with very short notice. This makes them perfect for fault-tolerant, non-critical tasks like batch processing, data analysis, or testing, but unsuitable for production web servers." },
    { question: "Does this calculator include storage or data transfer costs?", answer: "No. This tool focuses solely on estimating the compute costs (vCPU and RAM). Storage and data transfer (egress) are separate, significant components of your cloud bill. You can use our other tools to estimate these." },
    { question: "How accurate are these estimates?", answer: "This tool provides a high-level, simplified estimate based on public, On-Demand pricing for general-purpose instance families. Actual costs will vary based on the specific instance type, region, taxes, and any discounts you may have. Always use the provider's official calculator for precise billing." },
    { question: "What is 'rights-sizing'?", answer: "'Rightsizing' is the process of continuously monitoring a VM's actual resource usage and adjusting its size to match its needs. This prevents overprovisioning (wasting money on unused resources) and underprovisioning (causing poor performance)." },
    { question: "What is the difference between a 'General Purpose', 'Compute Optimized', and 'Memory Optimized' instance?", answer: "Cloud providers offer different 'families' of instances with different ratios of vCPU to RAM. General Purpose instances have a balanced ratio (e.g., 1 vCPU to 4 GB RAM). Compute Optimized instances have more vCPU relative to RAM (e.g., 1 vCPU to 2 GB RAM), ideal for CPU-bound tasks. Memory Optimized instances have much more RAM relative to vCPU (e.g., 1 vCPU to 8 GB RAM), ideal for databases and caches." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Estimate Cloud Instance Costs',
    description: 'A step-by-step guide to forecasting your monthly VM costs.',
    step: [
        { '@type': 'HowToStep', name: 'Select Provider and Region', text: 'Choose your preferred cloud provider and the region where your VM will be located.' },
        { '@type': 'HowToStep', name: 'Enter VM Resources', text: 'Input the number of vCPUs and the amount of RAM (in GB) your workload requires.' },
        { '@type': 'HowToStep', name: 'Review Estimated Cost', text: 'The tool will calculate the approximate monthly On-Demand cost for a general-purpose instance with your specified resources.' },
        { '@type': 'HowToStep', name: 'Use Custom Pricing (Optional)', text: 'Select "Custom" as the provider to manually enter hourly vCPU and RAM costs for any provider or specific instance type not listed.' },
    ],
    totalTime: 'PT2M'
};

export const keyTerminologies = [
    { term: 'Virtual Machine (VM)', definition: 'A software emulation of a physical computer, providing virtualized compute resources.' },
    { term: 'vCPU', definition: 'A virtual Central Processing Unit, representing a share of a physical server\'s processing power.' },
    { term: 'On-Demand Pricing', definition: 'A flexible, pay-as-you-go pricing model with no long-term commitment.' },
    { term: 'Reserved Instance (RI)', definition: 'A pricing model that offers a significant discount in exchange for a 1 or 3-year commitment to a specific instance type.' },
    { term: 'Spot Instance', definition: 'A pricing model that offers very large discounts on spare compute capacity, but the instance can be terminated by the provider at any time.' },
    { term: 'Rightsizing', definition: 'The practice of matching instance resources to actual workload demands to optimize cost and performance.' },
];
