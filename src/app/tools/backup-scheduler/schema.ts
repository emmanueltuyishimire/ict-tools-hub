
export const faqData = [
    { question: "What is the purpose of a backup schedule?", answer: "A backup schedule automates the process of creating data backups, ensuring that they are performed consistently and predictably without manual intervention. This is critical for meeting business continuity objectives like RPO (Recovery Point Objective)." },
    { question: "What is the Grandfather-Father-Son (GFS) backup strategy?", answer: "GFS is a common backup rotation scheme that uses a hierarchy of backups: daily ('Son'), weekly ('Father'), and monthly ('Grandfather'). This provides granular short-term recovery options while efficiently storing long-term archives. This tool can be used to generate the schedules for each of these tiers." },
    { question: "What is RPO (Recovery Point Objective)?", answer: "RPO defines the maximum amount of data loss a business can tolerate, measured in time. An RPO of 12 hours means you need a backup at least every 12 hours. Your backup schedule's frequency is what determines your RPO." },
    { question: "What is RTO (Recovery Time Objective)?", answer: "RTO defines how quickly a system must be restored and operational after a disaster. While the schedule is about frequency (RPO), your backup method, technology, and restore process determine your RTO." },
    { question: "What's the difference between a full, incremental, and differential backup?", answer: "A 'full' backup copies all data every time. An 'incremental' backup copies only the data that has changed since the *last* backup of any type. A 'differential' backup copies all data that has changed since the *last full* backup. You can use our <a href='/tools/backup-storage-calculator' class='text-primary hover:underline'>Backup Storage Requirement Calculator</a> to see how these choices impact storage needs." },
    { question: "Why is automation important for backups?", answer: "Manual backups are prone to human error and forgetfulness. Automating your backup schedule with a script or software ensures that backups are never missed, providing reliable data protection." },
    { question: "How do I use the generated list of dates?", answer: "You can use this list as input for a cron job on a Linux server or a Task Scheduler job on Windows. Your backup script can read this list to know when to execute a full, weekly, or monthly backup job." },
    { question: "What is a snapshot?", answer: "A snapshot is an instantaneous, point-in-time copy of a file system or a virtual machine's disk. Cloud providers extensively use snapshots for VM backups. This scheduler can be used to plan the automation of these snapshots." },
    { question: "How many backups should I keep?", answer: "This is defined by your <a href='/tools/data-retention-calculator' class='text-primary hover:underline'>Data Retention Policy</a>. It depends on your business needs and any legal or compliance requirements. A common strategy is to keep daily backups for a week, weekly backups for a month, and monthly backups for a year or longer." },
    { question: "Should I test my backups?", answer: "Absolutely. A backup that has not been tested is not a reliable backup. You should periodically perform test restores to a separate environment to ensure your backup files are valid and your recovery procedure works as expected." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Create a Backup Schedule',
    description: 'A step-by-step guide to generating a schedule for your backup jobs.',
    step: [
        { '@type': 'HowToStep', name: 'Set Start Date', text: 'Choose the date you want the schedule to begin.' },
        { '@type': 'HowToStep', name: 'Select Frequency', text: 'Choose how often the backup should run: Daily, Weekly, or Monthly.' },
        { '@type': 'HowToStep', name: 'Define Specifics', text: 'If weekly, choose the day of the week. If monthly, choose the day of the month.' },
        { '@type': 'HowToStep', name: 'Generate and Use', text: 'Set how many dates you want to generate and click the "Generate Schedule" button. The resulting list of dates can be used to configure your backup automation software or script.' },
    ],
    totalTime: 'PT2M'
};

export const keyTerminologies = [
    { term: 'Backup Schedule', definition: 'A plan that specifies when and how often data backups should be performed.' },
    { term: 'GFS (Grandfather-Father-Son)', definition: 'A common backup rotation scheme that manages daily (Son), weekly (Father), and monthly (Grandfather) backup sets.' },
    { term: 'RPO (Recovery Point Objective)', definition: 'The maximum age of files that an organization must recover from backup storage for normal operations to resume after a disaster. This dictates backup frequency.' },
    { term: 'RTO (Recovery Time Objective)', definition: 'The maximum tolerable duration of time that a computer, system, network, or application can be down after a failure or disaster. This dictates recovery speed.' },
    { term: 'Incremental Backup', definition: 'A backup that only copies data that has changed since the last backup was made.' },
    { term: 'Full Backup', definition: 'A complete backup of all data.' }
];
