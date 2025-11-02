export const faqData = [
    { question: "What is storage capacity planning?", answer: "Capacity planning is the process of predicting future storage needs to ensure that you have enough disk space to accommodate data growth. It helps prevent service outages caused by full disks and allows for better financial budgeting for hardware or cloud costs." },
    { question: "How does compound growth work?", answer: "Compound growth means that each period's growth is calculated based on the new total from the previous period, not the original starting size. A 10% monthly growth rate on 100GB results in 110GB in month 1, then 10% of 110GB (11GB) is added in month 2, and so on. This leads to exponential, not linear, growth over time." },
    { question: "How can I find my current data growth rate?", answer: "The best way is to use historical data. Check your monitoring tools or take measurements of your database or file system size over a period (e.g., several weeks or months). Calculate the percentage increase between periods to find an average growth rate to use in this estimator." },
    { question: "What are some common causes of storage growth?", answer: "Common causes include user-generated content (uploads, posts), application logs, database transactions and history, backups and snapshots, and the natural expansion of the operating system and applications with updates." },
    { question: "Why is it important to have a performance buffer?", answer: "A performance buffer, or safety margin, ensures that you don't run out of space immediately after an unexpected spike in data growth. A common practice is to provision storage with 20-30% free space available at all times." },
    { question: "What strategies can I use to manage storage growth?", answer: "Effective strategies include: implementing data retention policies to delete old data, using compression, archiving less-frequently accessed data to cheaper storage tiers, and regularly monitoring usage to 'right-size' your provisioned storage." },
    { question: "How does this tool relate to cloud cost estimation?", answer: "This tool is the first step. Once you have a forecast of your storage needs over time (e.g., you will need 5TB in 2 years), you can use that data in a <a href='/tools/cloud-storage-cost-estimator' class='text-primary hover:underline'>Cloud Storage Cost Estimator</a> to budget for the associated monthly costs." },
    { question: "Should I include backups in my growth estimate?", answer: "It's often best to estimate primary data growth and backup growth separately. As your primary data grows, your backup size will also grow. You can use this tool for your primary data, and then use the results as input for our <a href='/tools/backup-storage-calculator' class='text-primary hover:underline'>Backup Storage Requirement Calculator</a>." },
    { question: "Is this tool suitable for on-premises and cloud storage?", answer: "Yes. The principle of capacity planning is universal. You can use it to plan for purchasing new physical hard drives for an on-premises server or for provisioning the correct size of a virtual disk (like AWS EBS or Azure Disk) in the cloud." },
    { question: "What happens if I run out of disk space?", answer: "Running out of disk space can have catastrophic consequences. Databases can crash and become corrupted, web servers can stop logging and fail, users may be unable to upload files, and the entire operating system can become unstable and unable to boot." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Estimate Storage Growth',
    description: 'A step-by-step guide to forecasting your future storage capacity needs.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Initial Size', text: 'Input the current size of your data and select the unit (GB, TB, etc.).' },
        { '@type': 'HowToStep', name: 'Define Growth Rate', text: 'Enter your projected growth rate as a percentage and select the time interval for that growth (e.g., per month, per week).' },
        { '@type': 'HowToStep', name: 'Set Projection Period', text: 'Define the total time frame you want to forecast over (e.g., 24 months).' },
        { '@type': 'HowToStep', name: 'Estimate and Analyze', text: 'Click "Estimate Growth" to see the final projected size and view the growth trend on the chart.' },
    ],
    totalTime: 'PT2M'
};

export const keyTerminologies = [
    { term: 'Capacity Planning', definition: 'The process of determining the resources needed to meet future service level objectives. In this context, it refers to storage capacity.' },
    { term: 'Compound Growth', definition: 'Growth calculated on the initial principal and also on the accumulated growth of previous periods.' },
    { term: 'Data Retention Policy', definition: 'Guidelines for how long data should be kept and when it should be deleted or archived.' },
    { term: 'Data Lifecycle Management', definition: 'The process of managing data throughout its entire lifespan, from creation to deletion.' },
    { term: 'Provisioning', definition: 'The process of setting up and allocating IT infrastructure resources, such as disk storage.' },
    { term: 'Rightsizing', definition: 'The practice of analyzing actual usage data to match provisioned resources to actual needs, avoiding waste.' },
];
