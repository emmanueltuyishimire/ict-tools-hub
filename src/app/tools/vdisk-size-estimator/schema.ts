
export const faqData = [
    { question: "What is a virtual disk?", answer: "A virtual disk (like a VMDK or VHD file) is a large file that a virtual machine (VM) sees as its own physical hard drive. It contains the VM's entire operating system, applications, and data." },
    { question: "What is the difference between Thick and Thin provisioning?", answer: "Thick provisioning allocates all disk space upfront, offering slightly better performance but potentially wasting space. Thin provisioning starts small and grows as the VM writes data, which is more space-efficient but carries a risk of over-provisioning the underlying physical storage." },
    { question: "Why is partitioning a virtual disk important?", answer: "Partitioning separates the OS from user data and logs. This improves stability, as a runaway log file in one partition (`/var`) won't crash the entire system by filling up the root (`/`) partition. It also simplifies backups and OS reinstalls." },
    { question: "How much space should I allocate for a Linux root (`/`) partition?", answer: "A safe starting point for most modern Linux servers is 30-50 GB. This provides ample space for the operating system, common applications, and future updates without being excessively large." },
    { question: "What is a VM snapshot and how does it affect disk space?", answer: "A snapshot is a point-in-time copy of a VM, useful for short-term backups before making changes. However, snapshots can grow very large over time and consume a significant amount of datastore space. They are not a substitute for proper backups and should be deleted after a short period." },
    { question: "What is 'rightsizing'?", answer: "Rightsizing is the practice of monitoring a VM's actual disk usage over time and adjusting its provisioned disk size to match the real needs. This avoids wasting money on unused allocated storage, a key part of cloud cost optimization." },
    { question: "Should I use one large disk or multiple smaller disks for my VM?", answer: "For critical servers, especially databases, using multiple virtual disks is a best practice. For example, one disk for the OS, one for the database files, and one for transaction logs. This can improve I/O performance and makes managing each component (e.g., backing up or resizing) easier." },
    { question: "How much swap space do I need?", answer: "A common rule of thumb for a swap partition is to match the VM's RAM size if it has 2GB of RAM or less, use half the RAM size for VMs with 2-8GB of RAM, and use a flat 4-8GB for systems with more than 8GB of RAM. You can estimate RAM needs with our <a href='/tools/vm-requirement-estimator' class='text-primary hover:underline'>VM Requirement Estimator</a>." },
    { question: "Does this estimator work for both cloud and on-premises VMs?", answer: "Yes. The principles of disk partitioning and capacity planning are the same whether you are provisioning a virtual disk on a cloud provider (like an AWS EBS volume) or on your own on-premises hypervisor (like VMware vSphere or Microsoft Hyper-V)." },
    { question: "What happens if a partition on my VM runs out of space?", answer: "This can cause critical failures. If the root (`/`) partition fills up, the OS may become unstable or unable to boot. If the `/var` partition fills up, applications may stop being able to write log files and crash. Proactive planning with this estimator helps prevent these scenarios." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Plan and Estimate Virtual Disk Size',
    description: 'A step-by-step guide to sizing and partitioning a virtual disk for a new server.',
    step: [
        { '@type': 'HowToStep', name: 'Step 1: Estimate Total Size', text: 'Start with a rough estimate of the total disk capacity you think you will need.' },
        { '@type': 'HowToStep', name: 'Step 2: Plan Partitions', text: 'Use the calculator to allocate space for essential system partitions like root (`/`), user data (`/home`), variable data (`/var`), and swap space based on the VM\'s role.' },
        { '@type': 'HowToStep', name: 'Step 3: Review Allocation', text: 'Check the summary to see the total allocated space. If there is a large amount of unallocated space, consider reducing the total disk size to save costs. If you have over-allocated, increase the total disk size.' },
        { '@type': 'HowToStep', name: 'Step 4: Provision and Monitor', text: 'Provision the virtual disk with your chosen size. After deployment, continuously monitor the actual disk usage to "right-size" it in the future if needed.' },
    ],
    totalTime: 'PT5M'
};

export const keyTerminologies = [
    { term: 'Virtual Disk (VMDK/VHD)', definition: 'A file on a physical datastore that acts as a hard drive for a virtual machine, containing its OS and data.' },
    { term: 'Hypervisor', definition: 'The software that creates and runs virtual machines (e.g., VMware ESXi, Microsoft Hyper-V, KVM).' },
    { term: 'Datastore', definition: 'The physical storage location (like a SAN or local disk array) where virtual disk files are stored.' },
    { term: 'Thick Provisioning', definition: 'A method where the full size of the virtual disk is allocated on the datastore immediately upon creation.' },
    { term: 'Thin Provisioning', definition: 'A method where the virtual disk starts small and only consumes physical storage space as data is written to it, growing up to its maximum allocated size.' },
    { term: 'VM Snapshot', definition: 'A point-in-time copy of a VM\'s state and disk, useful for short-term rollbacks but not a replacement for backups.' },
];
