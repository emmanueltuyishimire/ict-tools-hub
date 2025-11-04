
export const faqData = [
    { question: "What is the main difference between a public and a private IP address?", answer: "A public IP address is a globally unique address assigned by an Internet Service Provider (ISP) that is directly accessible from the internet. A private IP address is a non-unique address used within a local network (like your home Wi-Fi) and is not reachable from the outside world. To communicate with the internet, a device with a private IP must go through a router using NAT." },
    { question: "How can multiple devices in my home use the internet with only one public IP?", answer: "This is possible thanks to Network Address Translation (NAT). Your router is assigned one public IP address by your ISP. It then creates a private network and assigns a unique private IP address to each of your devices (laptops, phones, etc.). When a device sends a request to the internet, the router translates the private source IP to its public IP, keeps track of the connection, and directs the response back to the correct private device." },
    { question: "Is my private IP address a security risk?", answer: "By itself, no. A private IP address is not routable on the internet, so attackers cannot connect to it directly. Security risks arise when your router's firewall is misconfigured (e.g., unnecessary ports are opened) or when a device on your private network is compromised by malware, which can then initiate outbound connections." },
    { question: "What are the private IP address ranges (RFC 1918)?", answer: "The Internet Engineering Task Force (IETF) has reserved three blocks of the IP address space for private networks: 10.0.0.0 to 10.255.255.255 (10.0.0.0/8), 172.16.0.0 to 172.31.255.255 (172.16.0.0/12), and 192.168.0.0 to 192.168.255.255 (192.168.0.0/16)." },
    { question: "What is an APIPA or link-local address?", answer: "APIPA (Automatic Private IP Addressing) is a feature where a device self-assigns an IP address from the 169.254.0.0 to 169.254.255.255 range if it cannot contact a DHCP server to be assigned an address. These are also known as link-local addresses and are only usable for communication on the immediate local network segment." },
    { question: "What is a loopback address?", answer: "The entire 127.0.0.0/8 block is reserved for loopback. The most common loopback address is 127.0.0.1, also known as 'localhost'. It's a special address that a computer uses to send network traffic to itself, which is very useful for testing applications and services without needing a physical network connection." },
    { question: "Why do I see a different IP when I search 'What is my IP' on Google?", answer: "When you search on Google, it shows you your public IP address—the address your router presents to the world. The IP address shown in your computer's network settings is your private IP address, assigned by your router. This tool can check both types." },
    { question: "Can a private IP address be the same as someone else's?", answer: "Yes. Since private IPs are only for local use, the same `192.168.1.100` address can be used simultaneously on millions of different home and office networks around the world without conflict. However, within a single local network, every device must have a unique private IP address." },
    { question: "Do I need a public IP address for my web server?", answer: "For a web server to be accessible to the public internet, it must have a public IP address. If your server is on a private network, you would need to configure your router with 'port forwarding' to direct incoming traffic (e.g., on port 443) from the public IP to the server's private IP." },
    { question: "Is it safe to share my public IP address?", answer: "It's generally safe, as it's visible to every website you visit. However, a persistent public IP can be used to target your network in attacks. It's best not to post it publicly on forums or social media. Dynamic IPs, which change periodically, offer slightly more anonymity." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Check if an IP Address is Public or Private',
    description: 'A step-by-step guide to determining the type of an IPv4 address.',
    step: [
        { '@type': 'HowToStep', name: 'Enter the IP Address', text: 'Type or paste the IPv4 address you want to check into the input field.' },
        { '@type': 'HowToStep', name: 'Review the Instant Result', text: 'The tool will immediately analyze the IP and display a card indicating whether it is Public, Private, Link-Local, or another special type.' },
        { '@type': 'HowToStep', name: 'Read the Explanation', text: 'The result card includes a brief explanation of what that IP type means and its role in networking.' },
    ],
    totalTime: 'PT1M',
};

export const keyTerminologies = [
    { term: 'Public IP', definition: 'A globally unique, internet-routable address assigned by an ISP.' },
    { term: 'Private IP', definition: 'An address from a reserved range (RFC 1918) for use within a local network only. Not routable on the internet.' },
    { term: 'NAT (Network Address Translation)', definition: 'A router function that translates private IPs to a public IP, allowing multiple devices to share one public address.' },
    { term: 'Link-Local Address (APIPA)', definition: 'An automatically self-assigned address from the 169.254.x.x range when a DHCP server is unavailable.' },
    { term: 'Loopback Address', definition: 'A special address (127.x.x.x) that a device uses to send traffic to itself (localhost).' },
    { term: 'ISP (Internet Service Provider)', definition: 'A company that provides internet access to customers and assigns public IP addresses.' },
];
