
export const faqData = [
    { question: "What is a database index?", answer: "A database index is a special data structure that improves the speed of data retrieval operations on a database table. It works like the index in a book: instead of searching through the entire table (a 'full table scan'), the database can use the index to quickly find the location of the desired data." },
    { question: "Why do indexes consume disk space?", answer: "An index is essentially a sorted copy of the data from the indexed columns, along with pointers back to the original rows in the table. This duplication of data is what consumes additional disk space. The more columns you have in an index, and the larger the data types, the larger the index will be." },
    { question: "What is the trade-off with using indexes?", answer: "The trade-off is read performance vs. write performance and storage cost. Indexes dramatically speed up `SELECT` queries, but they slow down write operations (`INSERT`, `UPDATE`, `DELETE`) because the database must update both the table and every index that contains the affected data. They also consume disk space, which can be a significant cost for very large tables." },
    { question: "When should I create an index?", answer: "You should create an index on columns that are frequently used in the `WHERE` clause of your queries, in `JOIN` conditions between tables, and in `ORDER BY` clauses. Use your database's query analysis tools (like `EXPLAIN`) to identify slow queries that could benefit from an index." },
    { question: "What is a composite index?", answer: "A composite index is an index on two or more columns. The order of columns in a composite index is important. For best performance, the column that is most frequently used in `WHERE` clauses should be listed first." },
    { question: "Why does this calculator have a 'row overhead'?", answer: "An index entry doesn't just store the key value; it also contains metadata and, most importantly, a pointer (like a CTID in PostgreSQL) back to the location of the full row on disk. This overhead is a fixed size for every single row in the index, so it contributes significantly to the total size." },
    { question: "How accurate is this estimate?", answer: "This tool provides a simplified, baseline estimate. The actual size of an index can vary based on the database engine (e.g., MySQL vs. PostgreSQL), the storage engine (e.g., InnoDB), the page 'fill factor', and data alignment. It is best used for high-level capacity planning and understanding the cost-benefit of adding a new index." },
    { question: "Is it a bad idea to index every column in a table?", answer: "Yes, this is a very bad practice. It will severely degrade the performance of all write operations on that table and consume a massive amount of disk space, while providing little benefit if those columns are not actually used for filtering or sorting." },
    { question: "How do I find the size of my existing indexes?", answer: "All database systems provide commands to inspect the size of your tables and indexes. In PostgreSQL, you can use `pg_relation_size('your_index_name')`. In MySQL, you can query the `information_schema.TABLES` view." },
    { question: "Is it safe to use this tool with my schema information?", answer: "Yes. This tool is 100% client-side. All calculations are performed in your browser, and no information about your table structure or row counts is ever sent to our servers." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Estimate Database Index Size',
    description: 'A step-by-step guide to forecasting the storage requirements of a database index.',
    step: [
        { '@type': 'HowToStep', name: 'Step 1: Define Index Columns', text: 'For each column included in your index, add a row and select its data type. For variable-length types like VARCHAR, specify the maximum length.' },
        { '@type': 'HowToStep', name: 'Step 2: Enter Table Row Count', text: 'Input the total number of rows you expect the table to have.' },
        { '@type': 'HowToStep', name: 'Step 3: Review Estimate', text: 'The tool will automatically calculate the total estimated size of the index based on the key size, row overhead, and table size. Use this estimate for capacity planning and cost forecasting.' },
    ],
    totalTime: 'PT2M'
};

export const keyTerminologies = [
    { term: 'Database Index', definition: 'A data structure that improves the speed of data retrieval operations on a database table at the cost of additional write time and storage space.' },
    { term: 'B-Tree', definition: 'A self-balancing tree data structure that maintains sorted data and allows for searches, sequential access, insertions, and deletions in logarithmic time. It is the most common type of database index.' },
    { term: 'Composite Index', definition: 'An index on two or more columns of a table. The order of columns in the index is important for query performance.' },
    { term: 'Query Performance', definition: 'The measure of how quickly a database can execute a query and return a result. Indexes are the primary tool for improving query performance.' },
    { term: 'Write Overhead', definition: 'The additional work a database must do to update all relevant indexes whenever a row is inserted, updated, or deleted. This is the performance cost of having indexes.' },
    { term: 'Fill Factor', definition: 'A database setting that determines how much free space to leave on each index page for future updates, which can affect the total size and performance of an index.' },
];
