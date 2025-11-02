
export const faqData = [
    { question: "Why should I partition my disk instead of using one large partition?", answer: "Partitioning provides stability, security, and easier maintenance. If one partition fills up (e.g., from log files in `/var`), it doesn't crash the entire operating system on the root (`/`) partition. It also allows you to separate user data (`/home`) from system data, making OS reinstalls safer and backups more organized." },
    { question: "What is the `/` (root) partition for?", answer: "The root partition is the top-level directory of the filesystem. It contains the core operating system, installed applications, system libraries, and everything else not assigned to another partition. It is the most critical partition." },
    { question: "How much space should I allocate to the root (`/`) partition?", answer: "This depends on the OS and the software you plan to install. A safe starting point for most modern Linux servers is 20-30 GB. This provides enough space for the OS, common tools, and future updates without being wasteful." },
    { question: "What is a `swap` partition for and how big should it be?", answer: "Swap space is a portion of the disk that the OS can use as virtual memory when it runs out of physical RAM. It's a safety net to prevent the system from crashing under heavy memory load. A common rule of thumb is to make it equal to your RAM size for systems with less RAM, and a flat 4-8 GB for systems with plenty of RAM." },
    { question: "Why is a separate `/home` partition a good idea?", answer: "Separating the `/home` directory, where user files are stored, from the OS (`/`) is a best practice. It allows you to resize, back up, or even completely reinstall the operating system without affecting your users' personal data and configurations." },
    { question: "What goes into the `/var` partition?", answer: "The `/var` directory contains 'variable' data—files that are expected to grow in size. This most notably includes system and application logs (`/var/log`), mail spools, and often database files (`/var/lib/mysql`). Giving `/var` its own partition is crucial for servers to prevent runaway log files from filling up the root filesystem and crashing the system." },
    { question: "What is LVM and should I use it?", answer: "LVM (Logical Volume Management) is a storage management technology for Linux that provides more flexibility than traditional partitioning. It allows you to create logical volumes that can be resized, extended, and moved on the fly, even across multiple physical disks. For servers, using LVM is highly recommended as it makes future storage adjustments much easier." },
    { question: "What are common filesystem types for Linux?", answer: "The most common and default filesystem for most Linux distributions is `ext4`, which is stable, reliable, and feature-rich. Another popular choice is `XFS`, which is known for its high performance with very large files and filesystems, making it a good choice for media servers or large data storage." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Plan Your Disk Partitions',
    description: 'A step-by-step guide to using the Disk Usage / Partition Estimator.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Total Disk Size', text: 'Input the total capacity of the disk you are partitioning in Gigabytes (GB).' },
        { '@type': 'HowToStep', name: 'Define Partitions', text: 'Adjust the sizes of the recommended partitions (`/`, `/home`, `/var`, `swap`) based on your server\'s expected workload. Add or remove partitions as needed.' },
        { '@type': 'HowToStep', name: 'Visualize Allocation', text: 'Use the color-coded bar chart to see a visual representation of your disk layout.' },
        { '@type': 'HowToStep', name: 'Check for Unallocated Space', text: 'Review the "Allocation Summary" to ensure you have accounted for all the disk space and to see if there is any remaining unallocated space for future use.' },
    ],
    totalTime: 'PT3M'
};

export const keyTerminologies = [
    { term: 'Partition', definition: 'A logical division of a physical disk drive. Each partition can be formatted with a filesystem and treated as a separate drive by the operating system.' },
    { term: 'Filesystem', definition: 'The structure and logic used by an operating system to control how data is stored and retrieved on a disk partition (e.g., ext4, XFS, NTFS).' },
    { term: 'Root (`/`) Partition', definition: 'The main and top-level partition in a Linux filesystem hierarchy, containing the core operating system.' },
    { term: 'Swap Space', definition: 'A space on a disk that is used as virtual memory when the amount of physical RAM is full.' },
    { term: 'Mount Point', definition: 'The directory in the filesystem where a partition is attached. For example, a partition might be mounted at `/home`.' },
    { term: 'LVM (Logical Volume Management)', definition: 'A flexible storage management layer in Linux that allows for easy resizing and management of partitions (logical volumes).' },
];
