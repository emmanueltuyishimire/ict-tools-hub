
export const faqData = [
    { question: "What is a database data type?", answer: "A data type is an attribute that specifies the type of data that an object (like a column in a table) can hold. Common types include integers, strings (VARCHAR), text, floating-point numbers, and dates. The data type determines how much storage space the value will consume and what kind of operations can be performed on it." },
    { question: "Why is choosing the right data type important?", answer: "Choosing the smallest, most appropriate data type for your data is a critical database optimization. It reduces storage costs, improves query performance by allowing more data to be cached in RAM, and enforces data integrity by preventing incorrect data from being inserted (e.g., text into an integer column)." },
    { question: "What's the difference between INT, BIGINT, SMALLINT, and TINYINT?", answer: "These are all integer types, but they have different storage sizes and ranges. A `TINYINT` uses 1 byte and can store numbers up to 255 (if unsigned). An `INT` uses 4 bytes and can store numbers up to about 2 billion. A `BIGINT` uses 8 bytes for extremely large numbers. Using the smallest one that fits your data is a key optimization." },
    { question: "When should I use VARCHAR vs. TEXT?", answer: "`VARCHAR` is for variable-length strings up to a specified maximum length (e.g., `VARCHAR(255)`). It's ideal for things like names, email addresses, or titles. `TEXT` is for long-form text of variable length with a very high maximum size, suitable for blog post content or user comments. `VARCHAR` is often more performant for indexed columns." },
    { question: "What does this tool's recommendation mean?", answer: "This tool analyzes the sample data you provide and suggests the most space-efficient data type that can accommodate it. For example, if you provide a list of numbers where the highest is 150, it will recommend `TINYINT` because it's the smallest integer type that can hold values up to 255." },
    { question: "Is it safe to change a column's data type?", answer: "Changing a data type on a large production table is a high-risk operation. It can lock the table for a long time and potentially lead to data loss if the new type cannot accommodate the old data (e.g., converting a `VARCHAR` to an `INT` when some rows contain text). Always perform such changes in a development environment first and take a full backup." },
    { question: "Does this tool work for all database systems?", answer: "This tool uses standard SQL data types that are common across most database systems like PostgreSQL, MySQL, and SQL Server. However, the exact names and storage sizes can vary slightly between systems. The recommendations provide a general best practice." },
    { question: "Why is it better to use a specific VARCHAR length (e.g., `VARCHAR(50)`) instead of a huge one (`VARCHAR(5000)`)?", answer: "While `VARCHAR` only stores the data you use, defining a smaller, more realistic maximum length acts as a form of data validation, preventing absurdly long strings from being inserted. It also helps the database's query planner optimize memory allocation for sorting and processing, which can improve performance." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the Column Type Optimizer',
    description: 'A guide to getting recommendations for optimal database column data types.',
    step: [
        { '@type': 'HowToStep', name: 'Step 1: Define Current Type', text: 'Select the data type you are currently using or considering for your column.' },
        { '@type': 'HowToStep', name: 'Step 2: Provide Sample Data', text: 'Paste a representative sample of the data that the column will hold. The more accurate the sample, the better the recommendation.' },
        { '@type': 'HowToStep', name: 'Step 3: Review Recommendation', text: 'The tool will analyze the sample data and suggest a more space-efficient data type, along with the reason for its choice.' },
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'Data Type', definition: 'An attribute that specifies the type of data a database column can hold (e.g., INT, VARCHAR, DATE).' },
    { term: 'Rightsizing', definition: 'The practice of choosing the smallest and most appropriate data type for a column to optimize storage and performance.' },
    { term: 'VARCHAR', definition: 'A variable-length string data type. It only uses storage for the characters you actually save, plus a small overhead for length.' },
    { term: 'CHAR', definition: 'A fixed-length string data type. It always reserves space for the maximum length, padding shorter strings with spaces.' },
    { term: 'INT Family (TINYINT, SMALLINT, INT, BIGINT)', definition: 'A family of integer data types with different storage sizes and value ranges, allowing for efficient storage of numbers.' },
    { term: 'Schema', definition: 'The structure of a database, describing the tables, the columns in those tables, their data types, and the relationships between them. You can use our <a href="/tools/db-storage-estimator">Database Storage Estimator</a> to model a full schema.' }
];

export const dataTypeSizes: Record<string, { base: number, perChar?: boolean }> = {
    'INT': { base: 4 },
    'BIGINT': { base: 8 },
    'SMALLINT': { base: 2 },
    'TINYINT': { base: 1 },
    'BOOLEAN': { base: 1 },
    'FLOAT': { base: 4 },
    'DOUBLE': { base: 8 },
    'DECIMAL': { base: 16 }, // Approximate, can vary
    'DATE': { base: 3 },
    'DATETIME': { base: 8 },
    'TIMESTAMP': { base: 4 },
    'UUID': { base: 16 },
    'CHAR': { base: 0, perChar: true },
    'VARCHAR': { base: 2, perChar: true }, // 2 bytes for length + bytes for data
    'VARCHAR(50)': { base: 2, perChar: true },
    'VARCHAR(255)': { base: 2, perChar: true },
    'TEXT': { base: 4 }, // Pointer size, actual data stored elsewhere
};
