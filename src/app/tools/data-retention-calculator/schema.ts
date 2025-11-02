
export const faqData = [
    { question: "What is a data retention policy?", answer: "A data retention policy is a set of guidelines an organization uses to determine how long specific types of data should be kept and when they should be disposed of. It's a critical component of data governance, security, and legal compliance." },
    { question: "Why is a data retention policy important?", answer: "It's important for several reasons: 1) Legal & Compliance: Many regulations (like GDPR, HIPAA) mandate specific retention periods. 2) Cost Savings: Deleting unneeded data reduces storage costs. 3) Risk Reduction: Minimizes liability by not keeping old, unnecessary data that could be exposed in a breach or legal discovery. 4) Efficiency: Keeps databases and systems lean and performant." },
    { question: "How long should I keep my data?", answer: "This depends entirely on the type of data and your industry. Financial records might need to be kept for 7+ years, medical records for the life of the patient plus several years, while temporary log files might only be kept for 30 days. You must consult legal and compliance experts to define your specific policy." },
    { question: "What is the difference between deletion and archival?", answer: "Deletion is the permanent removal of data. Archival is the process of moving data that is no longer actively used from expensive, high-performance storage to cheaper, long-term storage (like cloud archive tiers). The data is preserved but is less accessible. Your retention policy should specify whether data is to be deleted or archived." },
    { question: "What is a 'legal hold'?", answer: "A legal hold is a directive to preserve all forms of relevant information when litigation is reasonably anticipated. It overrides any standard retention policy, requiring the company to suspend the deletion or modification of data that might be relevant to the legal case." },
    { question: "How does GDPR affect data retention?", answer: "The GDPR's 'storage limitation' principle states that personal data should be kept in a form which permits identification of data subjects for no longer than is necessary for the purposes for which the personal data are processed. This means you must have a clear justification for how long you keep personal data and delete it once that justification no longer applies." },
    { question: "Does a retention policy apply to backups?", answer: "Yes, absolutely. Your retention policy must cover all copies of your data, including backups and archives. There is little point in deleting data from a live database if it still exists in a five-year-old unmanaged backup. Backup rotation schemes are a key part of implementing a retention policy." },
    { question: "Is it safe to use this tool with sensitive dates?", answer: "Yes. This tool is 100% client-side. All calculations are performed in your browser. No data you enter is ever sent to our servers." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate a Data Retention End Date',
    description: 'A step-by-step guide to determining the deletion or archival date for your data.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Start Date', text: 'Input the date when the data was created or when the retention period officially begins.' },
        { '@type':- 'HowToStep', name: 'Define Retention Period', text: 'Enter the length of time the data must be kept, and select the appropriate unit (Days, Weeks, Months, or Years).' },
        { '@type': 'HowToStep', name: 'Calculate Deletion Date', text: 'Click the "Calculate" button to see the exact date when the retention period ends and the data is eligible for its end-of-life action (deletion or archival).' },
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'Data Retention Policy', definition: 'An organization\'s established protocol for keeping and disposing of data.' },
    { term: 'Data Lifecycle Management (DLM)', definition: 'The process of managing data throughout its entire lifespan, from creation to deletion, including how it is stored, used, and protected.' },
    { term: 'Archival', definition: 'The process of moving data that is no longer actively used to separate, long-term storage to reduce costs and improve the performance of production systems.' },
    { term: 'Compliance', definition: 'Adherence to laws, regulations, guidelines, and specifications relevant to a business process (e.g., GDPR, HIPAA, SOX).' },
    { term: 'Legal Hold', definition: 'A process that an organization uses to preserve all forms of relevant information when litigation is pending or reasonably anticipated.' },
    { term: 'Personally Identifiable Information (PII)', definition: 'Any data that can be used to identify a specific individual. PII is often subject to the strictest data retention and protection regulations.' },
];
