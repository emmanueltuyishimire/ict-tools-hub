
export const faqData = [
    { question: "What is IOPS?", answer: "IOPS stands for Input/Output Operations Per Second. It's a performance metric that measures how many read and write operations a storage device or array can perform in one second. It's especially important for transactional workloads like databases." },
    { question: "What is the 'RAID Write Penalty'?", answer: "The RAID write penalty is the extra I/O overhead required for a RAID controller to write data to a parity-based array (like RAID 5 or 6). For every single write from the application, the controller must perform multiple reads and writes to calculate and store the parity data. This significantly reduces the effective write IOPS of the array." },
    { question: "Why is RAID 5/6 bad for write-heavy workloads?", answer: "RAID 5 has a write penalty of 4, and RAID 6 has a penalty of 6. This means for every write operation your application sends, the disk array has to do 4 or 6 operations. This makes them very slow for applications that do a lot of writing, like a busy database. They are better suited for read-heavy workloads." },
    { question: "Why is RAID 10 good for write performance?", answer: "RAID 10 (a stripe of mirrors) has a write penalty of only 2, as every write must simply be duplicated to its mirror. There are no complex parity calculations. This makes it much faster for random write operations than RAID 5 or 6, which is why it's a popular choice for databases." },
    { question: "How does the Read/Write Ratio affect total IOPS?", answer: "The total IOPS an array can deliver is a blend of its read and write performance. An array with a high write penalty (like RAID 6) will perform much better overall if the workload is 90% reads. If the workload is 90% writes, its total performance will be severely degraded." },
    { question: "Is IOPS the same as throughput (MB/s)?", answer: "No. IOPS measures the number of operations, while throughput measures the amount of data transferred per second. High IOPS is critical for handling many small, random requests (like database transactions). High throughput is important for transferring large, sequential files (like video streaming)." },
    { question: "How do I know my application's IOPS requirement?", answer: "The best way is to use monitoring tools. Both operating systems (like Windows Performance Monitor) and cloud providers (like AWS CloudWatch) provide metrics to track the number of read/write operations per second on a disk volume. Analyze this data during peak load to find your real-world requirement." },
    { question: "Why do SSDs have so much higher IOPS than HDDs?", answer: "HDDs (Hard Disk Drives) are mechanical devices with a spinning platter and a moving read/write head. The number of IOPS is physically limited by how fast the disk can spin (RPM) and how fast the head can move ('seek time'). SSDs (Solid-State Drives) have no moving parts; they can access any location in their memory instantly, resulting in thousands of times more IOPS." },
    { question: "What is a 'transactional workload'?", answer: "A transactional workload consists of a large number of small, random read and write operations. Online Transaction Processing (OLTP) databases, which power e-commerce sites and banking systems, are the classic example of a transactional workload that is highly sensitive to IOPS performance." },
    { question: "Does a RAID controller's cache affect IOPS?", answer: "Yes, significantly. A large, battery-backed write cache on a hardware RAID controller can absorb bursts of write I/O at memory speed and then write them to the slower disks later. This can effectively mask the RAID write penalty for short bursts of activity, improving perceived write performance." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the IOPS Calculator',
    description: 'A step-by-step guide to estimating the performance of a disk array.',
    step: [
        { '@type': 'HowToStep', name: 'Select Disk Type and Count', text: 'Choose the type of disks in your array (e.g., HDD, SSD) and enter the total number of disks.' },
        { '@type': 'HowToStep', name: 'Choose RAID Level', text: 'Select the RAID configuration you plan to use (e.g., RAID 5, RAID 10).' },
        { '@type': 'HowToStep', name: 'Define Your Workload', text: 'Use the slider to specify the expected ratio of read vs. write operations for your application.' },
        { '@type': 'HowToStep', name: 'Analyze IOPS Estimate', text: 'The tool will calculate the total usable IOPS and break it down into read and write IOPS, accounting for the write penalty of the chosen RAID level.' },
    ],
    totalTime: 'PT2M'
};

export const keyTerminologies = [
    { term: 'IOPS (Input/Output Operations Per Second)', definition: 'A performance measurement for storage devices, indicating how many read or write operations can be performed per second.' },
    { term: 'RAID (Redundant Array of Independent Disks)', definition: 'A technology that combines multiple disks into a logical unit to improve performance, provide redundancy, or both.' },
    { term: 'Write Penalty', definition: 'The extra I/O operations a RAID controller must perform to write parity data in redundant RAID levels like RAID 5 and RAID 6.' },
    { term: 'Throughput', definition: 'A measure of how much data can be transferred over a period, typically in Megabytes per second (MB/s). Contrasts with IOPS, which measures operations.' },
    { term: 'Transactional Workload', definition: 'An application workload characterized by a high volume of small, random read and write operations, for which IOPS is the key performance metric.' },
    { term: 'RAID Controller', definition: 'A hardware card or software that manages the disks in a RAID array, handling tasks like striping, mirroring, and parity calculations.' },
];
