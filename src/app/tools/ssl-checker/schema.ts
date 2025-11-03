
export const faqData = [
    { question: "What is an SSL/TLS certificate?", answer: "An SSL/TLS (Secure Sockets Layer/Transport Layer Security) certificate is a digital certificate that authenticates a website's identity and enables an encrypted connection. It's a small data file that cryptographically links a domain name, server, or hostname to an organization's details." },
    { question: "Why is SSL important?", answer: "SSL is critical for modern web security. It encrypts the data sent between a user's browser and the web server, preventing eavesdroppers from reading sensitive information like passwords, credit card numbers, and personal details. It also verifies that you are connecting to the legitimate server and not an imposter, building user trust. Browsers like Chrome now mark all non-HTTPS sites as 'Not Secure'." },
    { question: "What happens when an SSL certificate expires?", answer: "When an SSL certificate expires, browsers will show a prominent security warning to visitors, stating that the site's connection is not private or secure. This warning page can severely damage user trust, increase bounce rates, and harm sales or lead generation. The encryption still works, but the browser can no longer verify the website's identity, breaking the chain of trust." },
    { question: "How often should I check my SSL certificate?", answer: "It's good practice to check your certificate status regularly, especially a month before its expiration date. Most certificate authorities send reminder emails, but they can be missed. Using an automated monitoring service or a manual tool like this one can help prevent unexpected expirations." },
    { question: "What is the difference between DV, OV, and EV certificates?", answer: "These are different levels of validation. DV (Domain Validated) is the most basic, only verifying that the applicant controls the domain. OV (Organization Validated) includes vetting the organization's details. EV (Extended Validation) is the most stringent, requiring extensive verification of the business's legal identity. EV certificates used to display a 'green bar' in browsers, though this is less common now." },
    { question: "Can a certificate expire early?", answer: "A certificate can be 'revoked' by the issuing Certificate Authority (CA) before its expiration date. This happens if the certificate's private key is compromised, the certificate was mis-issued, or the domain owner requests it. Browsers check revocation lists (CRLs) or use OCSP to see if a certificate has been revoked." },
    { question: "What is a 'Certificate Authority' (CA)?", answer: "A Certificate Authority is a trusted third-party organization that issues digital certificates. Well-known CAs include Let's Encrypt, DigiCert, GlobalSign, and Sectigo. Browsers and operating systems have a pre-installed list of trusted CAs." },
    { question: "Is this tool safe to use with my domain?", answer: "Yes. This tool performs a standard, public-facing check on the specified domain, similar to what your web browser does every time you visit an HTTPS site. It does not perform any intrusive scans or store any of the information." },
    { question: "What does 'Days Remaining' mean?", answer: "This is a simple countdown from the current date to the certificate's 'Valid To' date. A negative number means the certificate has already expired. A low number (e.g., under 30) is a sign that you need to plan for renewal soon." },
    { question: "Can I check the certificate of a service on a non-standard port?", answer: "Yes, you can check services on non-standard ports by appending the port number to the domain name, for example, `my-app.example.com:8443`." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Check an SSL Certificate',
    description: 'A step-by-step guide to checking the expiration and validity of a website\'s SSL/TLS certificate.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Domain Name', text: 'In the input field, type the domain name you want to check (e.g., google.com). You can optionally include a port number (e.g., example.com:8443).' },
        { '@type': 'HowToStep', name: 'Check Certificate', text: 'Click the "Check Certificate" button. Our server will establish a secure connection to the domain to retrieve its public certificate details.' },
        { '@type': 'HowToStep', name: 'Review the Summary', text: 'A summary card will appear, showing the most critical information: if the certificate is valid, how many days are left until it expires, and who issued it.' },
        { '@type': 'HowToStep', name: 'Analyze Full Details', text: 'For a comprehensive view, a table will display all the key fields of the certificate, including the subject name, issuer, serial number, and the full validity period.' },
    ],
    totalTime: 'PT1M',
};

export const keyTerminologies = [
    { term: 'SSL/TLS', definition: 'Protocols for encrypting data between a web server and a browser. TLS is the modern, more secure successor to SSL.' },
    { term: 'Certificate Authority (CA)', definition: 'A trusted entity that issues digital certificates, verifying the identity of the certificate holder (e.g., Let\'s Encrypt, DigiCert).' },
    { term: 'Encryption', definition: 'The process of converting data into a code to prevent unauthorized access. SSL/TLS uses encryption to protect user data.' },
    { term: 'HTTPS', definition: 'Hypertext Transfer Protocol Secure. It is the secure version of HTTP, where the communication protocol is encrypted using SSL/TLS.' },
    { term: 'Common Name (CN)', definition: 'A field in an SSL certificate that specifies the primary domain name the certificate is intended to secure.' },
    { term: 'Subject Alternative Name (SAN)', definition: 'A field in an SSL certificate that lists additional hostnames (like subdomains) that are also secured by the same certificate.' },
    { term: 'Expiration Date', definition: 'The date after which an SSL certificate is no longer considered valid by browsers, leading to security warnings.' },
    { term: 'Chain of Trust', definition: 'The hierarchy of certificates, from an end-entity certificate up to a trusted root CA, that allows a browser to verify a certificate\'s authenticity.' },
];
