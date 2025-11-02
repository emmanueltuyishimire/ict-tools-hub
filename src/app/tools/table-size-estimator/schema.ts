export const faqData = [
    { question: "Why is estimating table size important?", answer: "Estimating table size is a critical part of database capacity planning. It helps you provision the right amount of disk space, preventing service outages caused by full disks. It also allows you to forecast future costs for hardware or cloud services, which is essential for budgeting." },
    { question: "What is 'index and overhead'?", answer: "Indexes are special data structures that speed up data retrieval but consume additional storage space. Overhead includes space used by the database for metadata, transaction logs, and internal page structures. A typical overhead estimate is 25-50% of the raw data size, but can be much higher for tables with many indexes." },
    { question: "How do I choose the right data types for my columns?", answer: "You should choose the smallest, most specific data type that can accommodate your data. For example, use `TINYINT` instead of `INT` if you know a value will never exceed 255. Use `VARCHAR(50)` instead of `TEXT` for a username. This practice, known as 'right-sizing', minimizes row size and improves performance." },
    { question: "Does this calculator account for data compression?", answer: "No. This tool calculates storage based on uncompressed data types. Many modern database engines (like PostgreSQL and MySQL) offer transparent data compression, which can significantly reduce the actual disk footprint. This calculator provides a conservative, pre-compression estimate." },
    { question: "How does a `VARCHAR` differ from a `CHAR` in storage?", answer: "A `CHAR(50)` column will always reserve 50 bytes of space, even if you only store 10 characters in it (it pads the rest with spaces). A `VARCHAR(50)` column uses a variable amount of space—it stores the 10 characters plus a small overhead (1-2 bytes) to record the length. `VARCHAR` is generally more space-efficient." },
    { question: "What is a database 'page'?", answer: "Databases read and write data from the disk in fixed-size blocks called pages (e.g., 8KB or 16KB). This is more efficient than reading individual rows. The way rows are packed onto pages, along with a 'fill factor' that leaves empty space for future updates, means the actual disk usage is often higher than a simple sum of row sizes." },
    { question: "How can I find my table's current size?", answer: "Most database systems provide built-in commands or views to check the size of tables (e.g., `pg_size_pretty()` in PostgreSQL). To find the growth rate, you need to record these sizes over time (e.g., weekly or monthly) and calculate the percentage increase." },
    { question: "Is this calculator suitable for both SQL and NoSQL databases?", answer: "The principles are most applicable to relational SQL databases that use a fixed schema. For document-based NoSQL databases (like MongoDB), where each document can have a different structure, estimation is more complex. However, you can still use this tool to estimate the size of a 'typical' document in your collection and multiply by the number of documents." },
    { question: "Is it safe to use this tool with my table schema?", answer: "Yes. All calculations are performed in your browser using JavaScript. No data about your schema or row counts is ever sent to our servers." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Estimate Database Table Size',
    description: 'A step-by-step guide to forecasting the storage requirements for a database table.',
    step: [
        { '@type': 'HowToStep', name: 'Step 1: Define Table Columns', text: 'Add a column for each field in your database table. For each one, select the most appropriate data type and specify a length if required (e.g., for VARCHAR).' },
        { '@type': 'HowToStep', name: 'Step 2: Estimate Row Count', text: 'Enter the total number of rows you expect the table to contain.' },
        { '@type': 'HowToStep', name: 'Step 3: Add Overhead', text: 'Enter a percentage to account for storage that will be used by indexes, database metadata, and other overhead. 25-50% is a common starting point.' },
        { '@type': 'HowToStep', name: 'Step 4: Analyze Estimate', text: 'The tool will calculate the estimated size of a single row and the total estimated storage for the entire table, including overhead.' },
    ],
    totalTime: 'PT3M'
};

export const keyTerminologies = [
    { term: 'Schema', definition: 'The structure of a database, describing the tables, the columns in those tables, and the relationships between them.' },
    { term: 'Data Type', definition: 'An attribute that specifies the type of data a column can hold (e.g., integer, string, date), which determines its storage size.' },
    { term: 'Index', definition: 'A data structure that improves the speed of data retrieval operations on a database table at the cost of additional storage space and slower writes.' },
    { term: 'Overhead', definition: 'Additional storage space used by the database system for metadata, indexes, transaction logs, and internal page management, beyond the raw data itself.' },
    { term: 'Capacity Planning', definition: 'The process of determining the production capacity needed by an organization to meet changing demands. In this context, predicting future storage needs.' },
    { term: 'VARCHAR', definition: 'A variable-length character data type. It only uses storage for the characters you actually save, plus a small amount of overhead.' }
];
