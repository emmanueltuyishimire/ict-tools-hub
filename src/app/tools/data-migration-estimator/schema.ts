
export const faqData = [
    { question: "What is data migration?", answer: "Data migration is the process of moving data from one location, format, or application to another. It's a complex project that could involve migrating a database to a new server, moving from an on-premises file server to cloud storage, or changing underlying database technologies." },
    { question: "Why is estimating the migration time so important?", answer: "Estimating the transfer time is the most critical first step. It determines the feasibility of your entire strategy. If a network transfer of your data will take three weeks, a 'big bang' migration over a weekend is impossible, and you must plan for a phased or physical migration approach instead." },
    { question: "What is the biggest bottleneck in a data migration?", answer: "For network-based migrations, the biggest bottleneck is almost always the **upload bandwidth** of the source location. Many business internet connections are asymmetrical, with much slower upload speeds than download speeds, which can make transfers unexpectedly long." },
    { question: "What is a 'Big Bang' vs. a 'Trickle' migration?", answer: "'Big Bang' migrations involve scheduled downtime where the system is taken offline, data is moved in one go, and the system is brought back up. 'Trickle' migrations are more complex and use continuous replication to keep the source and destination in sync, allowing for a near-zero downtime cutover." },
    { question: "What is 'data transformation'?", answer: "Data transformation is the process of converting data from one format or structure to another. For example, during a database migration, you might need to change date formats, combine columns, or clean up 'dirty' data before loading it into the new system. This can be a very time-consuming part of the migration process." },
    { question: "How do I validate a migration was successful?", answer: "Validation is crucial. At a minimum, you should perform row counts on key tables to ensure everything was copied. For more critical data, you can perform checksums on both the source and destination datasets to guarantee a bit-for-bit identical copy. You should also run a suite of application tests against the new data source." },
    { question: "What is a physical data transfer appliance?", answer: "For migrating massive datasets (tens or hundreds of terabytes), it can be faster and cheaper to use a physical appliance like AWS Snowball or Azure Data Box. The provider ships you a rugged storage device, you copy your data to it locally, and then ship it back, bypassing the slow public internet." },
    { question: "Should I perform a trial migration?", answer: "Absolutely. Before migrating any production data, you should perform at least one full trial run in a staging environment. This will help you uncover any unexpected issues with your scripts, accurately measure timelines, and build confidence in your migration plan." },
    { question: "What is a 'cutover'?", answer: "The cutover is the final step of the migration process where you switch your application's live traffic from the old data source to the new one. In a big bang migration, this happens after the data transfer is complete. In a trickle migration, this is a quick switch after the two systems are fully in sync." },
    { question: "What is Change Data Capture (CDC)?", answer: "CDC is a process used in trickle migrations. It's a mechanism for identifying and capturing changes made to a database (inserts, updates, deletes) in real-time and streaming those changes to a destination system to keep it in sync." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Plan and Estimate a Data Migration',
    description: 'A step-by-step framework for planning a successful data migration.',
    step: [
        { '@type': 'HowToStep', name: 'Step 1: Scope & Profile Data', text: 'Determine the total size and nature of the data you need to move.' },
        { '@type': 'HowToStep', name: 'Step 2: Estimate Transfer Time', text: 'Use a Data Transfer Time Calculator with your available upload bandwidth to get a baseline time estimate. This determines the feasibility of a network transfer.' },
        { '@type': 'HowToStep', name: 'Step 3: Choose Strategy', text: 'Based on the time estimate and your downtime tolerance, choose a strategy like "Big Bang" (with downtime) or "Trickle" (with replication).' },
        { '@type': 'HowToStep', name: 'Step 4: Plan for Transformation & Validation', text: 'Allocate time for any data cleaning, transformation, and the final validation process to ensure all data was migrated correctly.' },
        { '@type': 'HowToStep', name: 'Step 5: Plan the Cutover', text: 'Define the exact steps for the final cutover, including DNS changes, application configuration updates, and a rollback plan.' },
    ],
    totalTime: 'P1W', // Planning can take a week or more
};

export const keyTerminologies = [
    { term: 'Data Migration', definition: 'The process of moving data from one storage system, format, or application to another.' },
    { term: 'Big Bang Migration', definition: 'A migration strategy where the entire data transfer happens during a single period of scheduled downtime.' },
    { term: 'Trickle Migration', definition: 'A migration strategy that uses continuous replication to minimize downtime, followed by a quick final cutover.' },
    { term: 'Cutover', definition: 'The final step in a migration where the live application is switched to point to the new data source.' },
    { term: 'Change Data Capture (CDC)', definition: 'The process of identifying and capturing changes made to a database in real-time, used for replication in trickle migrations.' },
    { term: 'Data Validation', definition: 'The process of verifying that migrated data is accurate and complete by comparing the source and destination datasets.' },
];
