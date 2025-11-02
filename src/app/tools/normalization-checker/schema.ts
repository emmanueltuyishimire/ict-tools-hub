
export const faqData = [
    { question: "What is database normalization?", answer: "Database normalization is the process of organizing the columns and tables of a relational database to minimize data redundancy. It's a formal process that involves dividing larger tables into smaller, well-structured tables and defining relationships between them." },
    { question: "Why is normalization important?", answer: "Normalization helps to reduce data redundancy, which saves storage space. More importantly, it prevents data anomalies (insertion, update, and deletion anomalies), which ensures that your data remains consistent, accurate, and reliable as it is modified over time." },
    { question: "What is First Normal Form (1NF)?", answer: "A table is in 1NF if it has a primary key and all its columns contain atomic (indivisible) values. This means no 'repeating groups,' such as storing a comma-separated list of values in a single cell." },
    { question: "What is Second Normal Form (2NF)?", answer: "A table is in 2NF if it is in 1NF and every non-key column is fully functionally dependent on the entire composite primary key. This rule only applies to tables with composite keys and is designed to remove partial dependencies." },
    { question: "What is Third Normal Form (3NF)?", answer: "A table is in 3NF if it is in 2NF and all its columns are dependent only on the primary key, not on other non-key columns. This step removes 'transitive dependencies.'" },
    { question: "Are there higher normal forms than 3NF?", answer: "Yes, there are BCNF, 4NF, 5NF, and even 6NF. However, for the vast majority of practical database designs, achieving 3NF is sufficient to eliminate the most common data anomalies and provide a robust, efficient schema." },
    { question: "What is 'denormalization'?", answer: "Denormalization is the process of intentionally violating normalization rules, usually by adding redundant data back into a table to improve read performance by avoiding costly JOIN operations. This is a common technique in data warehousing and reporting databases, but it should be done carefully as a deliberate trade-off." },
    { question: "What is a 'functional dependency'?", answer: "A functional dependency is a relationship between columns. If the value of Column A uniquely determines the value of Column B, then B is functionally dependent on A. Understanding these dependencies in your data is the key to the normalization process." },
    { question: "How does normalization relate to database keys?", answer: "Keys are central to normalization. A primary key is required for 1NF. Composite primary keys are the focus of 2NF. Transitive dependencies in 3NF are about relationships between non-key columns and the primary key. You can explore keys further with our <a href='/tools/key-validator'>Primary / Foreign Key Validator</a>." },
    { question: "Can a tool automatically normalize my database?", answer: "Not completely. While a tool can identify some potential issues, true normalization requires understanding the meaning and business rules of your data to correctly identify functional dependencies. It requires human analysis." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Normalize a Database Table',
    description: 'A step-by-step guide to applying normalization principles to your database design.',
    step: [
        { '@type': 'HowToStep', name: 'Step 1: Achieve 1NF', text: 'Ensure the table has a primary key and that every column contains a single, atomic value. Eliminate repeating groups by splitting them into a new table.' },
        { '@type': 'HowToStep', name: 'Step 2: Achieve 2NF', text: 'If you have a composite primary key, identify any non-key columns that depend on only part of the key and move them to a separate table.' },
        { '@type': 'HowToStep', name: 'Step 3: Achieve 3NF', text: 'Identify any non-key columns that depend on other non-key columns (transitive dependencies) and move them into their own table.' },
    ],
    totalTime: 'PT10M'
};

export const keyTerminologies = [
    { term: 'Normalization', definition: 'The process of organizing a database to reduce redundancy and improve data integrity.' },
    { term: '1NF (First Normal Form)', definition: 'Ensures that a table has a primary key and all columns hold atomic values (no repeating groups).' },
    { term: '2NF (Second Normal Form)', definition: 'Builds on 1NF and removes partial dependencies, where a non-key attribute depends on only part of a composite primary key.' },
    { term: '3NF (Third Normal Form)', definition: 'Builds on 2NF and removes transitive dependencies, where a non-key attribute depends on another non-key attribute.' },
    { term: 'Primary Key', definition: 'A column or set of columns that uniquely identifies each row in a table. See our <a href="/tools/key-validator">Primary / Foreign Key Validator</a> for more.' },
    { term: 'Functional Dependency', definition: 'A relationship where the value of one attribute (or set of attributes) determines the value of another attribute.' },
    { term: 'Data Anomaly', definition: 'A data inconsistency that can occur during insertion, updating, or deletion, which normalization aims to prevent.' }
];
