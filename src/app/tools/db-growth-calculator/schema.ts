
export const faqData = [
    { question: "What is database capacity planning?", answer: "Capacity planning is the process of predicting future storage needs to ensure that you have enough disk space to accommodate data growth. It helps prevent service outages caused by full disks and allows for better financial budgeting for hardware or cloud costs." },
    { question: "How does compound growth work?", answer: "Compound growth means that each period's growth is calculated based on the new total from the previous period, not the original starting size. A 10% monthly growth rate on 100GB results in 110GB in month 1, then 10% of 110GB (11GB) is added in month 2, and so on. This leads to exponential, not linear, growth over time." },
    { question: "How can I find my database's current growth rate?", answer: "The best way is to use historical data. Check your database monitoring tools over the last 6-12 months to find an average growth rate to use in this estimator." },
    { question: "What causes database growth?", answer: "Database growth is caused by new data being inserted (e.g., new users, new orders), updates that increase row size, and the growth of indexes that are created to speed up queries. Log files and backups also contribute to overall storage consumption." },
    { question: "Why is a performance buffer important?", answer: "A performance buffer, or safety margin, ensures that you don't run out of space immediately after an unexpected spike in data growth. A common practice is to provision storage with 20-30% free space available at all times." },
    { question: "What strategies can I use to manage database growth?", answer: "Effective strategies include: implementing data retention policies to delete or archive old data, using data compression, normalizing your database schema to reduce redundancy, and regularly monitoring usage to 'right-size' your provisioned storage." },
    { question: "How does this tool relate to cloud cost estimation?", answer: "This tool is the first step. Once you have a forecast of your storage needs over time (e.g., you will need 5TB in 2 years), you can use that data in a <a href='/tools/cloud-storage-cost-estimator' class='text-primary hover:underline'>Cloud Storage Cost Estimator</a> to budget for the associated monthly costs." },
    { question: "Should I include index size in my initial estimate?", answer: "Yes, absolutely. As your table data grows, your indexes grow with it. An index can often take up as much space as the table data itself. Use our <a href='/tools/index-size-calculator' class='text-primary hover:underline'>Index Size Calculator</a> to estimate this and add it to your initial size." },
    { question: "Should I include backups in my growth estimate?", answer: "It's often best to estimate primary data growth and backup growth separately. As your primary data grows, your backup size will also grow. You can use this tool for your primary data, and then use the results as input for our <a href='/tools/backup-storage-calculator' class='text-primary hover:underline'>Backup Storage Requirement Calculator</a>." },
    { question: "Is this tool suitable for on-premises and cloud storage?", answer: "Yes. The principle of capacity planning is universal. You can use it to plan for purchasing new physical hard drives for an on-premises server or for provisioning the correct size of a virtual disk (like AWS EBS or Azure Disk) in the cloud." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Estimate Database Growth',
    description: 'A step-by-step guide to forecasting your future database storage capacity needs.',
    step: [
        { '@type': 'HowToStep', name: 'Step 1: Enter Initial Size', text: 'Input the current size of your database and select the unit (GB, TB, etc.).' },
        { '@type': 'HowToStep', name: 'Step 2: Define Growth Rate', text: 'Enter your projected growth rate as a percentage and select the time interval for that growth (e.g., per month, per week).' },
        { '@type': 'HowToStep', name: 'Step 3: Set Projection Period', text: 'Define the total time frame you want to forecast over (e.g., 24 months).' },
        { '@type': 'HowToStep', name: 'Step 4: Estimate and Analyze', text: 'Click "Estimate Growth" to see the final projected size and view the growth trend on the chart.' },
    ],
    totalTime: 'PT2M'
};

export const keyTerminologies = [
    { term: 'Capacity Planning', definition: 'The process of determining the resources needed to meet future service level objectives, especially for storage.' },
    { term: 'Compound Growth', definition: 'Growth calculated on the initial principal and also on the accumulated growth of previous periods.' },
    { term: 'Data Retention Policy', definition: 'Guidelines for how long data should be kept and when it should be deleted or archived.' },
    { term: 'Data Archiving', definition: 'The process of moving data that is no longer actively used to separate, long-term storage to reduce costs and improve the performance of production systems.' },
    { term: 'Database Normalization', definition: 'The process of organizing columns and tables in a relational database to minimize data redundancy.' },
    { term: 'Rightsizing', definition: 'The practice of analyzing actual usage data to match provisioned resources to actual needs, avoiding waste (overprovisioning) or poor performance (underprovisioning).' },
];
