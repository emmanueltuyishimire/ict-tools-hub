
export const faqData = [
    { question: "What is RAID?", answer: "RAID (Redundant Array of Independent Disks) is a data storage virtualization technology that combines multiple physical disk drives into one or more logical units for the purposes of data redundancy, performance improvement, or both." },
    { question: "What is the difference between RAID 5 and RAID 6?", answer: "Both use striping with parity, but RAID 5 can tolerate the failure of one disk, while RAID 6 uses a second parity block, allowing it to tolerate the failure of two disks simultaneously. This makes RAID 6 a much safer choice for large arrays with high-capacity drives." },
    { question: "What is the best RAID level?", answer: "There is no single 'best' level; it depends entirely on your needs. RAID 10 is often considered the best all-around for performance and redundancy but is expensive. RAID 6 is excellent for large-scale storage where data integrity is paramount. RAID 0 is only for situations where performance is the only concern and data loss is acceptable." },
    { question: "Is RAID a backup?", answer: "No, absolutely not. RAID is a system for providing high availability and protection against hardware (disk) failure. It does not protect against accidental file deletion, data corruption, malware/ransomware, or catastrophic events like fire or theft. You must always have a separate, independent backup strategy." },
    { question: "Should I use disks of different sizes in an array?", answer: "No. For consistent performance and to avoid wasting space, you should always use identical disks (same manufacturer, model, and capacity) in a RAID array. If you use mixed sizes, the array will treat all disks as if they were the size of the smallest disk in the set." },
    { question: "What is a 'hot spare'?", answer: "A hot spare is an unused, powered-on disk drive in a RAID array that stands by, ready to be automatically incorporated into the array to replace a failed disk. This allows the rebuild process to start immediately without manual intervention, reducing the time the array spends in a vulnerable, degraded state." },
    { question: "What does 'degraded mode' mean?", answer: "When a disk in a redundant RAID array (like RAID 5 or 6) fails, the array enters a 'degraded' mode. It continues to function and serve data, but with reduced performance, as it must recalculate the missing data from parity on the fly. The array is also vulnerable to further disk failures until the failed drive is replaced and the array is rebuilt." },
    { question: "What is the difference between Hardware RAID and Software RAID?", answer: "Hardware RAID uses a dedicated controller card with its own processor to manage the array. This is fast and doesn't use the main system's CPU resources. Software RAID is managed by the operating system, which uses the system's CPU and RAM to perform RAID calculations. Software RAID is cheaper and more flexible, but generally has lower performance than a dedicated hardware solution." },
    { question: "Why does RAID 10 require an even number of disks?", answer: "RAID 10 (a 'stripe of mirrors') is built by first creating pairs of mirrored disks (RAID 1) and then striping the data across these pairs (RAID 0). Because the base unit is a mirrored pair, you must have an even number of disks, with a minimum of four." },
    { question: "What does 'write penalty' mean?", answer: "In parity-based RAID levels like RAID 5 and 6, every write operation requires additional I/O. For a single write, the system must read the old data, read the old parity, calculate the new parity, write the new data, and write the new parity. This overhead is called the 'write penalty' and is why these RAID levels have slower write performance compared to RAID 0 or RAID 10." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the RAID Calculator',
    description: 'A step-by-step guide to calculating the capacity and fault tolerance of a RAID array.',
    step: [
        { '@type': 'HowToStep', name: 'Select RAID Level', text: 'Choose the RAID configuration you want to analyze from the dropdown menu (e.g., RAID 5, RAID 10).' },
        { '@type': 'HowToStep', name: 'Set Disk Count and Size', text: 'Specify the total number of physical disks in your array and the capacity of a single disk.' },
        { '@type': 'HowToStep', name: 'Analyze Results', text: 'The tool instantly calculates and displays the usable capacity, storage efficiency, and the number of disk failures the array can tolerate before data loss occurs.' },
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'RAID', definition: 'Redundant Array of Independent Disks. A technology that combines multiple disks into a single logical unit to improve performance, provide redundancy, or both.' },
    { term: 'Striping (RAID 0)', definition: 'The technique of splitting data across multiple disks to increase performance by reading/writing to all disks simultaneously.' },
    { term: 'Mirroring (RAID 1)', definition: 'The technique of duplicating data by writing identical copies to two or more disks, providing high redundancy.' },
    { term: 'Parity', definition: 'A method of data protection used in RAID 5 and 6. Parity is redundant information calculated from the data on other disks, which can be used to mathematically reconstruct the data from a failed drive.' },
    { term: 'Fault Tolerance', definition: 'The number of disk failures a RAID array can sustain without any data loss.' },
    { term: 'Storage Efficiency', definition: 'The percentage of the total raw disk capacity that is actually available for storing data after accounting for space used by parity or mirroring.' },
    { term: 'Degraded Mode', definition: 'The state of a redundant RAID array after a disk has failed but before it has been rebuilt. The array is functional but slower and at higher risk.' },
    { term: 'Rebuild', definition: 'The process of reconstructing the data from a failed disk onto a new replacement disk using the parity information from the remaining drives.' },
];
