
export const faqData = [
    { question: "What is RAM (Random Access Memory)?", answer: "RAM is a form of volatile computer memory that can be read and changed in any order. 'Volatile' means it requires power to maintain the stored information. It provides extremely fast access to data for the CPU and is where the OS and active applications run." },
    { question: "Why is RAM so much more expensive than SSD storage?", answer: "RAM (specifically DRAM) is more expensive due to its complex manufacturing process, higher performance design, and lower density. It is designed for speed (nanosecond access times) and direct communication with the CPU, whereas SSDs are designed for cost-effective, high-capacity, persistent storage with slower (microsecond) access times." },
    { question: "What is a 'memory-bound' workload?", answer: "A memory-bound workload is an application whose performance is primarily limited by the amount of available RAM, not the speed of the CPU. The most common examples are large databases and in-memory caches (like Redis), which need to hold large amounts of data in memory to perform quickly." },
    { question: "What is the difference between nanoseconds (ns) and microseconds (µs)?", answer: "A microsecond (µs) is one-millionth of a second. A nanosecond (ns) is one-billionth of a second. There are 1,000 nanoseconds in a microsecond, which illustrates how much faster RAM access is compared to even the fastest SSDs." },
    { question: "Is it a good idea to store my entire database in RAM?", answer: "For most databases, it is neither practical nor cost-effective to store the entire dataset in RAM. A better strategy is to provision enough RAM to hold the 'hot set'—the most frequently accessed tables and indexes. This provides the performance benefits of in-memory access for the majority of queries while keeping costs manageable." },
    { question: "What is an in-memory database?", answer: "An in-memory database is a database management system that primarily relies on main memory for data storage, in contrast to systems that store data on disk. They are used for applications that require minimal response time, such as real-time analytics, ad-bidding platforms, and gaming leaderboards. Redis and Memcached are popular examples." },
    { question: "Do the prices in this calculator reflect real-world costs?", answer: "The default prices are based on typical on-demand costs for general-purpose virtual machines from major cloud providers like AWS or Google Cloud. They are intended as a reasonable baseline for estimation, but you should always input the specific pricing from your chosen provider for accurate analysis." },
    { question: "Does this calculator account for I/O costs?", answer: "No. This tool focuses on the static cost of renting the storage or memory space per month. It does not account for the costs of I/O operations (reads and writes) or data transfer, which can be additional factors in your total cloud bill." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the Storage vs. Memory Cost Analyzer',
    description: 'A step-by-step guide to comparing the monthly costs of RAM and SSD storage.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Dataset Size', text: 'Input the size of the data you need to store in Gigabytes (GB).' },
        { '@type': 'HowToStep', name: 'Adjust Pricing (Optional)', text: 'The tool is pre-filled with average cloud provider costs. You can change the '$ per GB/month' values to match your specific provider.' },
        { '@type': 'HowToStep', name: 'Analyze Comparison', text: 'The tool instantly calculates and displays the total monthly cost for storing the data in RAM versus on an SSD, highlighting the cost multiplier and the difference in access speed.' },
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'RAM (Random Access Memory)', definition: 'Volatile, high-speed memory used for active processes and data. Access times are measured in nanoseconds.' },
    { term: 'SSD (Solid-State Drive)', definition: 'Non-volatile, persistent storage that is much faster than traditional hard drives but slower than RAM. Access times are measured in microseconds.' },
    { term: 'Volatile Memory', definition: 'Memory that requires power to maintain the stored information. All data is lost when power is turned off (e.g., RAM).' },
    { term: 'Non-Volatile Memory', definition: 'Memory that can retain stored information even when not powered (e.g., SSD, HDD).' },
    { term: 'Cache Hit Ratio', definition: 'A metric that measures how often a request for data is successfully served from the cache (fast RAM) instead of having to be fetched from the slower disk.' },
    { term: 'In-Memory Database', definition: 'A database that stores data primarily in main memory (RAM) rather than on disk to achieve maximum performance.' },
];
