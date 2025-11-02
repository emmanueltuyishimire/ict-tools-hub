
export const faqData = [
    { question: "What is a cloud migration?", answer: "A cloud migration is the process of moving a company's digital assets—such as data, workloads, IT resources, or applications—from on-premises infrastructure to a cloud provider's infrastructure, like AWS, Google Cloud, or Azure." },
    { question: "What are the main benefits of migrating to the cloud?", answer: "The main benefits include reduced hardware costs, improved scalability and elasticity, enhanced disaster recovery capabilities, global accessibility, and the ability to leverage managed services which reduces administrative overhead for IT staff." },
    { question: "What are the '6 R's of Migration'?", answer: "The '6 R's' are a popular framework for classifying cloud migration strategies: Rehosting (lift-and-shift), Replatforming (lift-and-tinker), Repurchasing (drop-and-shop), Refactoring (re-architecting), Retiring (decommissioning), and Retaining (keeping on-premises). This guide explains each one in detail." },
    { question: "What is the hardest part of a cloud migration?", answer: "While technical challenges exist, often the hardest parts are non-technical: accurate cost estimation, managing organizational change, training staff with new skills, and ensuring security and compliance throughout the process. A thorough discovery and planning phase is critical to success." },
    { question: "What is Total Cost of Ownership (TCO)?", answer: "TCO is a financial estimate that includes not only the direct costs of a service (like a monthly cloud bill) but also the indirect costs. For on-premises infrastructure, this includes hardware, electricity, cooling, and IT staff salaries. A proper cloud migration analysis compares the TCO of the on-premises solution to the TCO of the proposed cloud solution." },
    { question: "What is the most common hidden cost of cloud migration?", answer: "Data egress fees are the most common 'bill shock' for new cloud users. While cloud providers make it cheap to put data in, they charge for data going out to the internet. You can model this cost with our <a href='/tools/bandwidth-cost-calculator' class='text-primary hover:underline'>Bandwidth Cost Calculator</a>." },
    { question: "Should I 'lift-and-shift' my servers?", answer: "Rehosting, or 'lift-and-shift', can be a good strategy if you need to exit a data center quickly. However, it often fails to take advantage of the cloud's main benefits (like autoscaling and managed services) and can be more expensive in the long run. It's often better to at least 'replatform' by making small optimizations during the migration." },
    { question: "How do I choose a cloud provider?", answer: "The choice between AWS, Google Cloud, Azure, and others depends on many factors, including cost, the specific services you need, your team's existing skill set, and any enterprise agreements your company may have. It's often wise to start with a single, small project on one provider to gain experience before making a large-scale commitment." },
    { question: "What is a 'hybrid cloud' environment?", answer: "A hybrid cloud is an IT environment that combines on-premises infrastructure with services from a public cloud provider. This is the most common end-state for large enterprises, as some applications may need to remain on-premises for regulatory or performance reasons." },
    { question: "How long does a cloud migration take?", answer: "This varies dramatically. Migrating a single, simple web application might take a few weeks. Migrating an entire enterprise's IT portfolio can be a multi-year project involving hundreds of applications and requiring careful phasing and planning." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Plan and Estimate a Cloud Migration',
    description: 'A step-by-step framework for planning a successful cloud migration.',
    step: [
        { '@type': 'HowToStep', name: 'Phase 1: Discovery and Assessment', text: 'Inventory and document your current on-premises servers, applications, databases, and their resource usage (CPU, RAM, storage).' },
        { '@type': 'HowToStep', name: 'Phase 2: Choose a Migration Strategy', text: 'For each application, choose one of the "6 R\'s" of migration: Rehost, Replatform, Repurchase, Refactor, Retire, or Retain.' },
        { '@type': 'HowToStep', name: 'Phase 3: Estimate Cloud Costs', text: 'Map your on-premises resources to cloud services and use calculators to estimate monthly costs for compute, storage, and networking.' },
        { '@type': 'HowToStep', name: 'Phase 4: Estimate Migration Costs', text: 'Factor in one-time costs like data transfer, labor for refactoring, training, and any period of running parallel systems.' },
        { '@type': 'HowToStep', name: 'Phase 5: Calculate TCO and Finalize Plan', text: 'Calculate the Total Cost of Ownership (TCO) for both your current and proposed cloud setups to make a final business case and execution plan.' }
    ],
    totalTime: 'P2W', // Estimated time for a small project could be weeks.
};

export const keyTerminologies = [
    { term: 'Cloud Migration', definition: 'The process of moving digital assets like applications, data, and workloads from an on-premises data center to a cloud provider\'s infrastructure.' },
    { term: 'The 6 R\'s', definition: 'A framework outlining common migration strategies: Rehost, Replatform, Repurchase, Refactor, Retire, and Retain.' },
    { term: 'Rehosting (Lift-and-Shift)', definition: 'Moving an application to the cloud with minimal or no changes. It is the fastest but often least cloud-optimized strategy.' },
    { term: 'Refactoring (Rearchitecting)', definition: 'Significantly modifying or rewriting an application to take full advantage of cloud-native features like serverless and microservices. It is the most complex but most powerful strategy.' },
    { term: 'TCO (Total Cost of Ownership)', definition: 'A financial estimate that includes all direct and indirect costs of a system, used to compare the costs of on-premises vs. cloud solutions.' },
    { term: 'IaaS, PaaS, SaaS', definition: 'The three main service models of cloud computing. IaaS (Infrastructure as a Service) provides raw compute/storage. PaaS (Platform as a Service) provides a managed platform for development. SaaS (Software as a Service) provides a complete, ready-to-use application.' },
];
