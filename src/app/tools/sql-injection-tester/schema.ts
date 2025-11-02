
export const faqData = [
    { question: "What is SQL Injection?", answer: "SQL Injection is a code injection technique where an attacker inserts malicious SQL code into an application's queries. This can allow them to bypass authentication, read sensitive data, modify data, and potentially take control of the database server. It is one of the most common and dangerous web application vulnerabilities." },
    { question: "Why is this tool for educational purposes only?", answer: "This tool simulates a vulnerable system in a safe, client-side environment. Attempting SQL injection techniques on a real website or application that you do not own is illegal and can cause serious damage. This tool is designed to teach you how to recognize and prevent the vulnerability, not to perform real attacks." },
    { question: "What is the `' OR 1=1 --` attack?", answer: "This is a classic authentication bypass attack. By injecting this string into a username field, the attacker changes the query's logic. The `OR 1=1` clause is always true, and the `--` comments out the rest of the query (including the password check), causing the database to return a valid user and grant access." },
    { question: "How do I prevent SQL Injection?", answer: "The most effective method is to use **parameterized queries** (also known as prepared statements). This technique strictly separates the SQL command from the user data, ensuring that user input is always treated as data and never as executable code. Using a modern ORM (Object-Relational Mapper) also provides a high level of protection by default." },
    { question: "Is sanitizing user input enough to prevent SQLi?", answer: "No. While input sanitization (like stripping out single quotes) can help, it's a fragile, blacklist-based approach. Attackers are constantly finding new ways to bypass sanitization filters. Parameterized queries are the only truly reliable defense." },
    { question: "Does this tool connect to a real database?", answer: "No. It uses a simple JavaScript array of objects to simulate a 'users' table. All query 'execution' happens locally in your browser, making it completely safe to experiment with." },
    { question: "What are other types of SQL Injection attacks?", answer: "Beyond authentication bypass, attackers can use `UNION`-based attacks to extract data from other tables, `error-based` attacks to reveal database structure through error messages, and `blind` SQL injection to infer data bit by bit when the application doesn't return direct results." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the SQL Injection Simulator',
    description: 'A step-by-step guide to demonstrating an SQL injection vulnerability.',
    step: [
        { '@type': 'HowToStep', name: 'Step 1: Examine the Vulnerable Code', text: 'Observe the example code that shows how user input is being insecurely concatenated into a SQL query.' },
        { '@type': 'HowToStep', name: 'Step 2: Try a Normal Login', text: 'Enter a valid username and password from the sample data table to see how a legitimate login query is constructed.' },
        { '@type': 'HowToStep', name: 'Step 3: Attempt an Injection', text: "In the username field, enter an injection string like `admin'--`. Leave the password field blank." },
        { '@type': 'HowToStep', name: 'Step 4: Analyze the Executed Query', text: 'Observe how your input has altered the SQL query, causing the password check to be ignored. The simulator will show a \'successful\' login, demonstrating the bypass.' },
    ],
    totalTime: 'PT2M'
};

export const keyTerminologies = [
    { term: 'SQL Injection (SQLi)', definition: 'A web security vulnerability that allows an attacker to interfere with the queries that an application makes to its database.' },
    { term: 'Parameterized Queries (Prepared Statements)', definition: 'The primary defense against SQLi. A technique where the SQL query and the user-supplied data are sent to the database separately, preventing the data from being interpreted as code.' },
    { term: 'Authentication Bypass', definition: 'A common goal of SQLi where an attacker bypasses a login form without needing a valid password.' },
    { term: 'Concatenation', definition: 'The process of joining strings together. In this context, insecurely joining user input directly into a SQL query string, which is the root cause of the vulnerability.' },
    { term: 'Database Schema', definition: 'The structure of a database, including its tables, columns, and relationships. An attacker can often extract schema information using SQLi.' },
    { term: 'ORM (Object-Relational Mapper)', definition: 'A library that provides a high-level abstraction over a database. Modern ORMs use parameterized queries by default, helping to prevent SQLi.' },
];
