
export const faqData = [
    { question: "What is the primary difference between replication and sharding?", answer: "Replication copies the same data to multiple servers to scale read operations and provide high availability. Sharding partitions data across multiple servers to scale write operations. Replication handles read-heavy workloads; sharding handles write-heavy workloads at massive scale." },
    { question: "When should I use read replicas (replication)?", answer: "You should use read replicas when your application is 'read-heavy'—meaning it performs many more read queries (`SELECT`) than write queries (`INSERT`, `UPDATE`). This is typical for blogs, content websites, and most e-commerce stores. It's the first and most common step in database scaling." },
    { question: "When should I consider sharding?", answer: "You should only consider sharding after you have exhausted all other options. If your application's write load is so high that even the largest possible single primary server cannot handle it, or your dataset is too large to fit on a single server, then sharding is the next logical step. It's a strategy for hyper-scale applications." },
    { question: "What is 'replication lag'?", answer: "Replication lag is the delay between when data is written to the primary database and when it becomes visible on a read replica. Since most replication is asynchronous, this delay can be a few milliseconds to several seconds. Applications must be designed to handle this, for example, by directing a user's own reads to the primary for a short time after they make a change." },
    { "question": "What is a 'shard key'?", "answer": "A shard key is a specific column in your database table that is used to determine which shard a particular row of data should be stored on. For example, in a `users` table, the `user_id` might be the shard key. The choice of a good shard key that distributes data evenly is one of the most critical decisions in a sharding strategy." },
    { question: "Can I do a `JOIN` across different shards?", answer: "Not easily. Standard `JOIN` operations work within a single database. A query that needs to join data from two different shards requires a 'distributed join,' which is very complex and slow, often needing to be handled at the application layer. This is a major drawback of sharding." },
    { question: "Which strategy is better for high availability?", answer: "Both can provide high availability, but replication is simpler for this purpose. With a primary-replica setup, if the primary fails, a replica can be automatically 'promoted' to become the new primary with minimal downtime. While each shard in a sharded architecture can itself be replicated for availability, the overall system has more moving parts and is more complex to manage." },
    { question: "Is sharding the same as partitioning in PostgreSQL?", answer: "They are related concepts but not identical. PostgreSQL's native partitioning allows you to split a single large table into multiple smaller tables within the same database instance, which can improve query performance. Sharding takes this a step further by physically distributing those partitions across multiple independent database servers." },
    { question: "Do cloud providers offer managed replication and sharding?", answer: "Yes. Most major cloud providers offer managed database services that make these complex architectures easier. For example, Amazon RDS allows you to create read replicas with a single click. For sharding, services like Amazon Aurora, Google Cloud Spanner, or CockroachDB are designed to handle distributed data and scaling automatically." },
    { question: "What is a 'single point of failure'?", answer: "A single point of failure (SPOF) is any part of a system that, if it fails, will stop the entire system from working. A single, non-replicated database server is a classic SPOF. Both replication and sharding are strategies designed to eliminate this SPOF by distributing data and load across multiple servers." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Plan a Database Scaling Strategy',
    description: 'A step-by-step framework for choosing between replication and sharding.',
    step: [
        { '@type': 'HowToStep', name: 'Step 1: Analyze Your Workload', text: 'Determine if your application is read-heavy or write-heavy. Monitor your database performance to find the primary bottleneck.' },
        { '@type': 'HowToStep', name: 'Step 2: Start with Vertical Scaling', text: 'Before distributing your database, ensure you are using an appropriately sized server. Often, simply moving to a server with more RAM can solve performance issues.' },
        { '@type': 'HowToStep', name: 'Step 3: Implement Replication for Read Scalability', text: 'If your reads are the bottleneck, add one or more read replicas to your database and direct all read queries to them.' },
        { '@type': 'HowToStep', name: 'Step 4: Consider Sharding as a Last Resort', text: 'If, after implementing read replicas, your single primary server still cannot handle the write load, begin planning a migration to a sharded architecture. This is a major architectural change.' },
    ],
    totalTime: 'P1M', // Planning can take months
};

export const keyTerminologies = [
    { term: 'Replication', definition: 'The process of creating and maintaining copies of a database on multiple servers to improve read performance and provide high availability.' },
    { term: 'Sharding (Horizontal Partitioning)', definition: 'The process of splitting a large database table into smaller, separate tables (shards), often across multiple servers, to improve write performance and scalability.' },
    { term: 'Vertical Scaling', definition: 'Increasing the resources (CPU, RAM) of a single server to handle more load.' },
    { term: 'Horizontal Scaling', definition: 'Adding more servers to a pool to distribute load.' },
    { term: 'Read Replica', definition: 'A read-only copy of a primary database that is used to serve `SELECT` queries, reducing the load on the primary.' },
    { term: 'Shard Key', definition: 'A column used to determine which shard a particular row of data belongs to.' },
    { term: 'Replication Lag', definition: 'The delay between a write operation on the primary database and its appearance on a read replica.' },
    { term: 'High Availability (HA)', definition