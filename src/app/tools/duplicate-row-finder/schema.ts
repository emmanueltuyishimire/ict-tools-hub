
export const faqData = [
    { question: "What is data deduplication?", answer: "Data deduplication is the process of eliminating duplicate copies of repeating data. In the context of this tool, it refers to identifying identical rows or entries in a dataset. It's a critical first step in any data cleaning process." },
    { question: "Why is finding duplicate data important?", answer: "Duplicate data can cause numerous problems. It can skew analytics and reporting, lead to wasted resources (e.g., sending multiple mailings to the same person), cause database import errors if there are unique constraints, and create a confusing user experience. Identifying and removing duplicates improves data quality and integrity." },
    { question: "Is this tool case-sensitive?", answer: "Yes. The current version of this tool performs a case-sensitive comparison. This means 'Apple' and 'apple' would be treated as two different, unique rows. For case-insensitive checking, you should normalize your data to a single case (e.g., all lowercase) before pasting it into the tool." },
    { question: "Does this tool handle CSV files?", answer: "This tool treats each line as a single string. If you paste data from a CSV file, it will find rows where the entire line is identical. If you only want to find duplicates based on a single column (like an email address), you should paste just that one column's data into the tool." },
    { question: "Is it safe to use this tool with sensitive data?", answer: "Yes. All processing is done 100% client-side in your web browser. The data you paste into the text area is never sent to our server, ensuring your information remains private." },
    { question: "What is the best way to handle duplicates once they are found?", answer: "It depends on the context. For a simple list, you might just keep the first occurrence and delete the rest. For complex database records, you might need to perform a 'merge' operation, combining the best information from all duplicate records into a single 'golden record' before deleting the others." },
    { question: "How can I prevent duplicates in my database?", answer: "The best way is to use database constraints. Applying a `UNIQUE` constraint or a `PRIMARY KEY` to a column (or set of columns) like `email_address` or `product_sku` will cause the database to reject any attempt to insert a duplicate value. You can explore this concept with our Primary / Foreign Key Validator." },
    { question: "Does leading/trailing whitespace affect the result?", answer: "Yes. This tool trims leading and trailing whitespace from each line before comparing them, so a line like '  apple  ' will be treated the same as 'apple'." },
    { question: "Can this tool handle very large datasets?", answer: "This is a browser-based tool, so its performance is limited by your computer's memory and CPU. For very large files (millions of rows), a command-line tool (like `sort | uniq` on Linux) or a dedicated data cleaning script in a language like Python is more appropriate." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Find Duplicate Rows in Data',
    description: 'A step-by-step guide to using the Duplicate Row Finder to clean your dataset.',
    step: [
        { '@type': 'HowToStep', name: 'Step 1: Paste Your Data', text: 'Paste your line-separated data into the input text area. Each line will be treated as a single record.' },
        { '@type': 'HowToStep', name: 'Step 2: Find Duplicates', text: 'Click the "Find Duplicates" button to initiate the analysis.' },
        { '@type': 'HowToStep', name: 'Step 3: Review the Summary', text: 'The tool will provide a summary of the total, unique, and duplicate rows found in your data.' },
        { '@type': 'HowToStep', name: 'Step 4: Analyze the Details', text: 'A table will appear listing each piece of duplicate data, the number of times it appeared, and the specific line numbers where it was found, helping you locate and resolve the issues.' },
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'Data Cleaning', definition: 'The process of detecting and correcting (or removing) corrupt or inaccurate records from a record set, table, or database. Finding duplicates is a core part of data cleaning.' },
    { term: 'Data Integrity', definition: 'The maintenance of, and the assurance of the accuracy and consistency of, data over its entire life-cycle.' },
    { term: 'Deduplication', definition: 'A specialized data compression technique for eliminating duplicate copies of repeating data.' },
    { term: 'Unique Constraint', definition: 'A database rule that ensures that all values in a column or a group of columns are unique. This is a primary method for preventing duplicate data at the source.' },
    { term: 'Golden Record', definition: 'In data management, a single, well-defined version of the truth for a specific data entity, often created by merging data from multiple duplicate records.' },
];
