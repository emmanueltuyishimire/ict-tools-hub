export const faqData = [
    { question: "What is a database health check?", answer: "A database health check is a routine process of monitoring and analyzing key performance indicators (KPIs) of a database to ensure it is operating optimally, securely, and reliably. It helps to proactively identify and fix issues before they cause downtime or performance degradation." },
    { question: "How often should I perform a health check?", answer: "The frequency depends on the criticality of the system. For mission-critical production databases, key metrics should be monitored in real-time with automated alerts. A comprehensive manual review should be performed at least quarterly. For less critical systems, a semi-annual or annual check might be sufficient." },
    { question: "What are the most important metrics to monitor?", answer: "The most critical metrics are typically CPU Utilization, Memory Usage (and Cache Hit Ratio), Disk I/O (IOPS and latency), and the number of active vs. idle connections. Monitoring slow query logs is also essential for performance tuning." },
    { question: "What is a 'slow query log'?", answer: "A slow query log is a feature in most databases that records any SQL queries that take longer than a specified amount of time to execute. It is the single most important tool for finding and optimizing inefficient queries that are slowing down your application." },
    { question: "What is a 'cache hit ratio' and why is it important?", answer: "A cache hit ratio measures how often the database can find the data it needs in its RAM cache (a 'hit') versus having to read it from the much slower disk (a 'miss'). A high cache hit ratio (e.g., 99%+) is a sign of a healthy, well-provisioned database and is critical for good performance." },
    { question: "Why is 'index bloat' a problem?", answer: "Over time, indexes can accumulate dead space from deleted or updated rows, a phenomenon known as 'bloat'. A bloated index is larger than it needs to be, consuming extra disk space and making index scans less efficient because more pages have to be read from disk. Regular maintenance is required to rebuild indexes and remove bloat." },
    { question: "Can this tool connect to my database and run these checks?", answer: "No. This tool is a purely educational guide and interactive checklist. It does not and cannot connect to your database. You must use your database's own command-line tools or a dedicated monitoring platform (like Prometheus, Grafana, or your cloud provider's monitoring service) to gather the metrics described." },
    { question: "What are some common causes of high CPU usage on a database?", answer: "High CPU is often caused by poorly written queries that perform complex calculations or sort massive amounts of data without an efficient index, a very high number of concurrent connections, or insufficient CPU cores for the workload." },
    { question: "What is the difference between database backups and replication?", answer: "A backup is a periodic copy of your data stored separately for disaster recovery purposes. Replication is the continuous copying of data to a secondary 'read replica' server to provide read scalability and high availability (failover). Both are critical but solve different problems." },
    { question: "What is the 'principle of least privilege'?", answer: "This is a security best practice stating that a user account should only have the absolute minimum permissions required to perform its function. For an application's database user, this means it should have `SELECT`, `INSERT`, `UPDATE` permissions, but not administrative rights like `DROP TABLE` or the ability to create users. This limits the damage an attacker can do if the application is compromised." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Perform a Database Health Check',
    description: 'A step-by-step guide to using the Database Health Checker to assess your system.',
    step: [
        { '@type': 'HowToStep', name: 'Step 1: Go Through the Checklist', text: 'Work through each item in the interactive checklist, which covers Performance, Storage, Security, and Backups.' },
        { '@type': 'HowToStep', name: 'Step 2: Gather Metrics from Your System', text: 'Use your database\'s native tools (e.g., `pg_stat_user_tables` in PostgreSQL) or your cloud monitoring dashboard to find the current value for each metric.' },
        { '@type': 'HowToStep', name: 'Step 3: Compare and Check', text: 'Compare your system\'s metrics against the best practices described in the guide. Check the box for each item that is in a healthy state.' },
        { '@type': 'HowToStep', name: 'Step 4: Create an Action Plan', text: 'Any unchecked boxes represent areas for improvement. Use these as a starting point to create a plan for optimizing your database performance and stability.' },
    ],
    totalTime: 'PT1H'
};

export const keyTerminologies = [
    { term: 'KPI (Key Performance Indicator)', definition: 'A measurable value that demonstrates how effectively a system is achieving key objectives. In databases, this includes metrics like TPS, query latency, and cache hit ratio.' },
    { term: 'Index', definition: 'A data structure that improves the speed of data retrieval operations on a database table. Missing or bloated indexes are a common cause of poor performance.' },
    { term: 'Cache Hit Ratio', definition: 'The percentage of data requests that are successfully served from the database\'s RAM cache, avoiding a slow disk read.' },
    { term: 'Query Optimizer', definition: 'The component of a database that attempts to determine the most efficient way to execute a given query by considering possible query plans.' },
    { term: 'Replication', definition: 'The process of creating and maintaining copies of a database on multiple servers to improve read performance and provide high availability.' },
    { term: 'Point-in-Time Recovery (PITR)', definition: 'A backup method that allows a database to be restored to a specific moment in time (e.g., just before a major error occurred), usually by replaying transaction logs.' },
];
