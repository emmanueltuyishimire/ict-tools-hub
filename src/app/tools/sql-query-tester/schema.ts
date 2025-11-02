
export const faqData = [
    { question: "What is SQL?", answer: "SQL (Structured Query Language) is the standard language for managing and querying data in relational databases. It's used to create, read, update, and delete data (CRUD operations)." },
    { question: "What does this tool actually do?", answer: "This is a client-side, educational tool. It simulates a database in your browser with pre-defined tables. It parses and executes very basic `SELECT * FROM ... WHERE ...` queries against this sample data. It does not connect to a real database and cannot perform `INSERT`, `UPDATE`, or `DELETE` operations." },
    { question: "Why can't I run complex queries like JOINs or GROUP BY?", answer: "Building a full SQL parser that supports advanced features is extremely complex. This tool is designed to provide a simple, safe environment for beginners to practice the most fundamental `SELECT` statements without needing to set up a database." },
    { question: "What does `SELECT *` mean?", answer: "The asterisk `*` is a wildcard that means 'all columns'. A query like `SELECT * FROM users` will return every column for every row in the 'users' table." },
    { question: "What is a `WHERE` clause?", answer: "A `WHERE` clause is used to filter records. It extracts only those records that fulfill a specified condition. For example, `WHERE country = 'Canada'` will only return rows where the 'country' column has the value 'Canada'." },
    { question: "Is SQL case-sensitive?", answer: "SQL keywords (like `SELECT`, `FROM`, `WHERE`) are generally case-insensitive. However, table and column names can be case-sensitive depending on the specific database system and its configuration. Data itself (the values within the table) is almost always case-sensitive unless a specific function is used to change it." },
    { question: "What is SQL Injection?", answer: "SQL Injection is a major security vulnerability where an attacker can interfere with the queries that an application makes to its database. This tool is not vulnerable as it doesn't connect to a real database, but in real applications, you must always use parameterized queries to prevent it." },
    { question: "How can I practice more advanced SQL?", answer: "There are many great online platforms like SQLFiddle, DB-Fiddle, or by installing a local database like SQLite or PostgreSQL on your own machine. These will allow you to practice the full range of SQL commands." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the SQL Query Tester',
    description: 'A step-by-step guide to practicing basic SQL SELECT queries in the browser.',
    step: [
        { '@type': 'HowToStep', name: 'Step 1: Examine Sample Data', text: 'Look at the sample data tables provided to see what columns and tables are available to query.' },
        { '@type': 'HowToStep', name: 'Step 2: Write Your Query', text: 'In the query editor, write a basic `SELECT` query, such as `SELECT * FROM users`.' },
        { '@type': 'HowToStep', name: 'Step 3: Add a Filter', text: 'Optionally, add a `WHERE` clause to filter your results, like `WHERE age > 30`.' },
        { '@type': 'HowToStep', name: 'Step 4: Execute and Review', text: 'Click "Run Query" to see the results in the table below. If your syntax is incorrect, an error message will guide you.' },
    ],
    totalTime: 'PT2M'
};

export const keyTerminologies = [
    { term: 'SQL (Structured Query Language)', definition: 'The standard language for communicating with relational databases.' },
    { term: 'Relational Database', definition: 'A database that organizes data into tables of rows and columns, with relationships between different tables.' },
    { term: 'Query', definition: 'A request for data or information from a database. In SQL, this is typically done with a `SELECT` statement.' },
    { term: '`SELECT` Statement', definition: 'The SQL command used to retrieve data from a database.' },
    { term: '`FROM` Clause', definition: 'Specifies the table to retrieve the data from.' },
    { term: '`WHERE` Clause', definition: 'Filters the results of a query based on a specific condition.' },
    { term: 'CRUD', definition: 'An acronym for the four basic database operations: Create, Read, Update, and Delete.' },
];
