
export const faqData = [
    { question: "What is a primary key?", answer: "A primary key is a column (or set of columns) in a table that uniquely identifies each row. It must contain unique values and cannot have NULL values. It's the 'master ID' for a record." },
    { question: "What is a foreign key?", answer: "A foreign key is a column in one table that refers to the primary key of another table. It is the mechanism that creates a link or relationship between the two tables." },
    { question: "What is referential integrity?", answer: "Referential integrity is a database rule that ensures relationships between tables remain consistent. It prevents 'orphan' records by ensuring that a foreign key value must correspond to an existing primary key value in the other table." },
    { question: "Why must primary keys be unique?", answer: "Uniqueness is the core purpose of a primary key. It guarantees that you can unambiguously identify and retrieve one specific row from a table with millions of rows. Without this guarantee, data could not be reliably accessed." },
    { question: "Can a foreign key be NULL (empty)?", answer: "Yes, a foreign key can be NULL. This represents a scenario where the relationship is optional. For example, in an `employees` table, a `manager_id` foreign key could be NULL for the CEO, who has no manager." },
    { question: "What is a composite key?", answer: "A composite primary key is a primary key made up of two or more columns. The combination of the columns must be unique for each row, though the individual columns might not be. This is common in 'junction' tables that link two other tables." },
    { question: "Should I use an integer or a UUID for my primary key?", answer: "An auto-incrementing integer (like 1, 2, 3...) is simple, fast, and space-efficient. A UUID (Universally Unique Identifier) is a long, random string that is guaranteed to be unique across all tables and all databases everywhere. UUIDs are excellent for distributed systems where records might be created on different servers and need to be merged without ID conflicts." },
    { question: "What happens if I try to insert an invalid foreign key in a real database?", answer: "If you try to `INSERT` a row into a child table with a foreign key that does not exist in the parent table, the database will reject the operation and return a 'foreign key constraint violation' error. This tool simulates that check." },
    { question: "Should I add an index to my foreign key columns?", answer: "Yes, almost always. Creating a database index on your foreign key columns is one of the most important performance optimizations you can make. It dramatically speeds up `JOIN` operations between tables. You can use our <a href='/tools/index-size-calculator' class='text-primary hover:underline'>Index Size Calculator</a> to estimate the storage cost of doing so." },
    { question: "What is a one-to-many relationship?", answer: "This is the most common type of database relationship, enabled by foreign keys. For example, one customer (parent table) can have many orders (child table), but each order belongs to only one customer. The foreign key `customer_id` in the `orders` table creates this link." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Validate a Primary/Foreign Key Relationship',
    description: 'A guide to checking for referential integrity between two sets of keys.',
    step: [
        { '@type': 'HowToStep', name: 'Step 1: Enter Primary Keys', text: 'In the "Parent Table" box, enter the list of unique primary keys, one per line.' },
        { '@type': 'HowToStep', name: 'Step 2: Enter Foreign Keys', text: 'In the "Child Table" box, enter the list of foreign keys that should correspond to the primary keys. Leave a field empty to simulate a NULL value.' },
        { '@type': 'HowToStep', name: 'Step 3: Review Validation', text: 'The tool will automatically validate the relationship. If there are any issues, such as a duplicate primary key or a foreign key that does not point to a valid primary key, an error message will be displayed explaining the problem.' },
    ],
    totalTime: 'PT2M'
};

export const keyTerminologies = [
    { term: 'Primary Key', definition: 'A unique identifier for each row in a database table. It cannot be NULL and its values must be unique.' },
    { term: 'Foreign Key', definition: 'A key used to link two tables together. It is a field (or collection of fields) in one table that refers to the Primary Key in another table.' },
    { term: 'Referential Integrity', definition: 'A property of data stating that all its references are valid. In a relational database, it ensures that a foreign key value always points to an existing primary key.' },
    { term: 'Constraint', definition: 'A rule enforced on data columns in a table. Primary and foreign key relationships are implemented as constraints.' },
    { term: 'Orphan Record', definition: 'A record in a child table whose foreign key value does not match any primary key value in the parent table. Enforcing referential integrity prevents the creation of orphan records.' },
    { term: 'Relational Database', definition: 'A database that organizes data into tables of rows and columns, with relationships between tables defined by keys.' },
];
