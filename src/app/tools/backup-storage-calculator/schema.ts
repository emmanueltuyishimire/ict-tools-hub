
export const faqData = [
    { question: "What is a full backup?", answer: "A full backup is a complete copy of all selected data. It is the simplest to manage and fastest to restore from, but it consumes the most storage space and takes the longest to create." },
    { question: "What is an incremental backup?", answer: "An incremental backup only copies the data that has changed since the *last* backup (of any type). It's the fastest to create and uses the least storage for daily backups, but restoration is complex as it requires the last full backup and every incremental backup since." },
    { question: "What is a differential backup?", answer: "A differential backup copies all data that has changed since the *last full backup*. It's a balance between full and incremental. Restoration is simpler than incremental (only needing the last full and latest differential), but the backup files grow in size each day." },
    { question: "What is a 'change rate'?", answer: "The change rate is the percentage of your total data that is modified between backups. For a database server, this might be 5-10% per day. For a file server with mostly static documents, it could be less than 1%. A good estimate is crucial for calculating storage for incremental and differential backups." },
    { question: "What does 'retention' mean?", answer: "Retention policy defines how long backups are kept. In this calculator, it's the number of backup sets you intend to store. For example, a daily backup with a retention of 14 means you will always have the last 14 days of backups available." },
    { question: "What is the 3-2-1 backup rule?", answer: "The 3-2-1 rule is a best practice for data protection. It states you should have at least **3** copies of your data, on **2** different types of storage media, with **1** copy stored off-site (e.g., in the cloud)." },
    { question: "How does compression affect these calculations?", answer: "This calculator does not account for compression. Modern backup software can significantly reduce the size of backups by compressing the data. You can use our <a href='/tools/compression-estimator' class='text-primary hover:underline'>Compression Savings Estimator</a> to get a rough idea of how much space you might save." },
    { question: "How can I use this to plan a real backup strategy?", answer: "A common strategy is a weekly full backup combined with daily incremental backups. You can use this calculator twice: once for the weekly full backups (e.g., with a retention of 4) and once for the daily incrementals (e.g., with a retention of 6), then add the results to get your total storage need." },
    { question: "Does this calculator account for deduplication?", answer: "No. Deduplication is an advanced feature in some backup systems that saves space by only storing a single copy of identical blocks of data. This can lead to massive storage savings but is highly dependent on the data and the specific software, so it's not modeled here." },
    { question: "Where should I store my backups?", answer: "Following the 3-2-1 rule, you should have both local backups (for fast restores) and off-site backups (for disaster recovery). Off-site backups can be on physical media taken off-site or, more commonly, in the cloud. Use our <a href='/tools/cloud-storage-cost-estimator' class='text-primary hover:underline'>Cloud Storage Cost Estimator</a> to budget for cloud backups." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Backup Storage Needs',
    description: 'Estimate the total storage space required for your backup strategy.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Initial Data Size', text: 'Input the total size of the data you need to back up.' },
        { '@type': 'HowToStep', name: 'Define Backup Strategy', text: 'Choose the backup type (Full, Incremental, or Differential) and estimate the daily percentage of data that changes.' },
        { '@type': 'HowToStep', name: 'Set Retention Policy', text: 'Specify how many backup versions you need to keep (e.g., 14 for two weeks of daily backups).' },
        { '@type': 'HowToStep', name: 'Calculate Total Storage', text: 'Click the "Calculate" button to see the total estimated storage space required to hold all retained backups according to your strategy.' },
    ],
    totalTime: 'PT2M'
};

export const keyTerminologies = [
    { term: 'Full Backup', definition: 'A complete copy of all data. Simple to restore, but uses the most space.' },
    { term: 'Incremental Backup', definition: 'A copy of data that has changed since the last backup of any type. Uses the least space, but complex to restore.' },
    { term: 'Differential Backup', definition: 'A copy of all data that has changed since the last full backup. A balance between the other two types.' },
    { term: 'Retention Policy', definition: 'A rule that defines how long backup data should be kept.' },
    { term: 'RPO (Recovery Point Objective)', definition: 'The maximum acceptable amount of data loss, measured in time. It dictates how frequently you need to run backups.' },
    { term: 'RTO (Recovery Time Objective)', definition: 'The maximum acceptable amount of time to restore a system after a failure. It influences your choice of backup media and restore process.' },
];
