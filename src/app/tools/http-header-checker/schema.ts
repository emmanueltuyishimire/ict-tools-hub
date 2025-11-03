
export const faqData = [
    { question: "What are HTTP headers?", answer: "HTTP headers are key-value pairs of information transmitted between a client (like your browser) and a server. They provide metadata about the request or response, such as the content type, caching policies, and security settings, without being part of the main content itself." },
    { question: "What is an HTTP status code?", answer: "The status code is the first line of an HTTP response, indicating the result of the request. Codes in the 2xx range mean success (e.g., `200 OK`), 3xx codes indicate redirection (`301 Moved Permanently`), 4xx codes indicate a client-side error (`404 Not Found`), and 5xx codes indicate a server-side error (`500 Internal Server Error`)." },
    { question: "Why are HTTP headers important for SEO?", answer: "Headers are critical for SEO. The `Cache-Control` header affects page speed. The `Location` header in a `301` redirect passes link equity to a new URL. The `Vary` header ensures search engines cache the correct version of a page (e.g., mobile vs. desktop). Misconfigured headers can lead to poor crawling, indexing, and ranking." },
    { question: "What is the `Cache-Control` header?", answer: "This is one of the most important headers for web performance. It gives browsers and CDNs instructions on how to cache a resource. A directive like `max-age=3600` tells the browser it can reuse the file for one hour without re-downloading it from the server. You can explore this with our <a href='/tools/cache-expiry-calculator' class='text-primary hover:underline'>Cache Expiration Calculator</a>." },
    { question: "What are some important security headers?", answer: "Key security headers include `Strict-Transport-Security` (HSTS), which forces browsers to use HTTPS; `Content-Security-Policy` (CSP), which prevents Cross-Site Scripting (XSS) attacks by specifying allowed content sources; and `X-Frame-Options`, which prevents your site from being embedded in an iframe on another site (clickjacking)." },
    { question: "Is it safe to use this tool with any URL?", answer: "Yes. This tool performs a simple, non-intrusive GET request to fetch the headers of a URL, which is the same action a web browser takes. It does not perform any scans or store any data. It simply reads the public headers that the server sends to any visitor." },
    { question: "What's the difference between a request header and a response header?", answer: "Request headers are sent *by the client* (your browser) *to the server*. They contain information about the client, like its User-Agent string and the types of content it can accept. Response headers, which this tool checks, are sent *by the server* *to the client* in response to a request." },
    { question: "What does a `301` vs. a `302` redirect mean?", answer: "A `301 Moved Permanently` status code tells browsers and search engines that a page has moved to a new URL permanently. A `302 Found` (or `307 Temporary Redirect`) indicates that the move is temporary. For SEO, it is crucial to use a `301` for permanent moves to ensure link equity is passed to the new URL." },
    { question: "What is a `User-Agent`?", answer: "The `User-Agent` is a request header that identifies the client making the request, such as the browser type and version (e.g., Chrome, Firefox) or the name of a search engine crawler (e.g., Googlebot). Servers can use this information to send tailored content." },
    { question: "Why would I see `X-Cache: HIT` in the headers?", answer: "This is a custom header added by a caching layer, such as a Content Delivery Network (CDN) or a reverse proxy like Varnish. A `HIT` means the response was served from the fast, local cache. A `MISS` means the request had to be sent to the origin server to fetch the content. This header is invaluable for debugging caching performance." }
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Check HTTP Response Headers',
    description: 'A step-by-step guide to inspecting the HTTP headers of a URL.',
    step: [
        { '@type': 'HowToStep', name: 'Enter URL', text: 'Type or paste the full URL of the website or API endpoint you want to test.' },
        { '@type': 'HowToStep', name: 'Check Headers', text: 'Click the "Check Headers" button. Our server will then make a request to the provided URL to retrieve its response headers.' },
        { '@type': 'HowToStep', name: 'Analyze Results', text: 'The tool will display the HTTP status code (e.g., 200 OK) and a complete table of all response headers, such as `Content-Type`, `Cache-Control`, and any security headers.' },
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'HTTP Headers', definition: 'Key-value pairs of metadata transmitted between a client and server that provide instructions and information about the request or response.' },
    { term: 'HTTP Status Code', definition: 'A three-digit code returned by a server indicating the result of a client\'s request (e.g., 200 for success, 404 for not found).' },
    { term: 'Cache-Control', definition: 'A response header that defines the caching policy for a resource, instructing browsers and proxies how long to store it.' },
    { term: 'Redirect (301/302)', definition: 'A server response that directs the client to a different URL. `301` is permanent, while `302` is temporary.' },
    { term: 'Content Security Policy (CSP)', definition: 'A security header that helps prevent cross-site scripting (XSS) and other injection attacks by specifying which sources of content are trusted.' },
    { term: 'Strict-Transport-Security (HSTS)', definition: 'A security header that forces browsers to only communicate with a server over a secure HTTPS connection.' },
];
