
export const faqData = [
    { question: "What is log rotation?", answer: "An automated process in server administration that manages large log files. It works by renaming the current log file, creating a new empty one, and deleting the oldest files to prevent them from consuming all available disk space." },
    { question: "Why is log rotation important?", answer: "It is critical for system stability. Without log rotation, a busy server's log files would grow indefinitely until they fill up the entire disk, which can crash the operating system or critical applications. It also helps manage storage costs and enforce data retention policies." },
    { question: "How does this calculator work?", answer: "This tool calculates the total storage required by multiplying the average size of a single log file by the number of rotated logs you plan to keep. It also calculates the maximum age of your logs by multiplying the number of logs kept by the rotation frequency." },
    { question: "What is `logrotate`?", answer: "On Linux systems, `logrotate` is the standard utility used to handle log rotation. It runs on a schedule (usually daily) and uses configuration files to determine how to rotate, compress, and delete logs for various services." },
    { question: "What does the 'compress' option in logrotate do?", answer: "The `compress` directive tells `logrotate` to compress the old log files, usually with Gzip. This can dramatically reduce their size (often by 90% or more), allowing you to keep more historical logs in the same amount of disk space. This calculator estimates uncompressed size." },
    { question: "What are common log rotation frequencies?", answer: "The most common frequency is 'daily'. For very high-traffic servers, logs might be rotated 'hourly'. For less busy systems, 'weekly' or 'monthly' rotation is sufficient. The choice depends on how quickly your logs grow." },
    { question: "How many old logs should I keep?", answer: "This depends on your troubleshooting and compliance needs. A common practice is to keep 7 to 14 days of recent logs for immediate troubleshooting. For compliance (like PCI-DSS), you may be required to archive logs for a year or more. Your rotation policy should work in tandem with a log archiving strategy." },
    { question: "What is a 'postrotate' script?", answer: "Some applications keep a file handle open to their log file. A `postrotate` script is a command that runs after the log is rotated to signal the application to release the old file handle and start writing to the new, empty log file. This is essential for services like Nginx or Apache." },
    { question: "Is it safe to use this tool?", answer: "Yes. This tool is 100% client-side. All calculations are performed in your browser. No data about your server configuration is ever sent to us." },
    { question: "How does this relate to a data retention policy?", answer: "Your log rotation settings are a direct implementation of your data retention policy for logs. If your policy states that logs must be kept for 30 days, you can use this calculator to configure a rotation schedule that achieves this (e.g., rotate daily, keep 30). Our Data Retention Calculator can help you plan the policy itself." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the Log Rotation Calculator',
    description: 'A step-by-step guide to planning your log rotation strategy.',
    step: [
        { '@type': 'HowToStep', name: 'Step 1: Enter Log Size', text: 'Input the average size of a single log file before it is rotated.' },
        { '@type': 'HowToStep', name: 'Step 2: Set Retention Count', text: 'Enter the number of old, rotated log files you wish to keep on disk.' },
        { '@type': 'HowToStep', name: 'Step 3: Define Frequency', text: 'Specify how often the log rotation occurs (e.g., every 1 day, every 1 week).' },
        { '@type': 'HowToStep', name: 'Step 4: Analyze Summary', text: 'The tool will calculate the total disk space required for all log files and the maximum age of the oldest log file in your rotation.' },
    ],
    totalTime: 'PT2M'
};

export const keyTerminologies = [
    { term: 'Log Rotation', definition: 'An automated process for managing log files by archiving old logs and creating new ones to prevent them from consuming excessive disk space.' },
    { term: 'logrotate', definition: 'The standard Linux utility that automates the rotation, compression, removal, and mailing of log files.' },
    { term: 'Directive', definition: 'A configuration command within a `logrotate` configuration file, such as `daily`, `rotate 14`, or `compress`.' },
    { term: 'Compression', definition: 'The process of reducing the file size of old logs (usually with Gzip) to save disk space.' },
    { term: 'Data Retention', definition: 'A policy that defines how long data must be kept for operational, legal, or compliance reasons.' },
    { term: 'Log Archiving', definition: 'The process of moving old log files from a server\'s local disk to cheaper, long-term storage (like cloud object storage) for compliance or historical analysis.' },
];
