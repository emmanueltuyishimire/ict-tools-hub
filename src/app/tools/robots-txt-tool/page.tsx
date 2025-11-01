
import { PageHeader } from '@/components/page-header';
import { RobotsTxtTool } from './robots-txt-tool';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { Lightbulb, AlertTriangle, BookOpen, ChevronRight, Wand } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Robots.txt Generator & Validator | ICT Toolbench',
    description: 'Create a custom robots.txt file with our generator or validate your existing one to ensure search engine crawlers are correctly indexing your site. Control access for Googlebot, Bingbot, and more.',
    openGraph: {
        title: 'Robots.txt Generator & Validator | ICT Toolbench',
        description: 'Easily generate or validate your robots.txt file to manage search engine crawler behavior and optimize your site\'s SEO.',
        url: '/tools/robots-txt-tool',
    }
};

const faqData = [
    { question: "What is a robots.txt file?", answer: "A robots.txt file is a simple text file placed on your web server that tells search engine crawlers (like Googlebot) which pages or files the crawler can or can't request from your site. It acts as a set of instructions for web robots, not a security mechanism." },
    { question: "Where should I place my robots.txt file?", answer: "The robots.txt file must be placed in the root directory of your website. For example, for the domain `www.example.com`, the file must be accessible at `www.example.com/robots.txt`." },
    { question: "Is robots.txt a security feature?", answer: "No, it is not. The robots.txt protocol is purely advisory. While reputable crawlers like Googlebot will respect its directives, malicious bots, scrapers, or spammers can and will ignore it. Never use robots.txt to hide private or sensitive information. Use proper authentication and authorization for that." },
    { question: "What is a 'User-agent'?", answer: "A User-agent is the name of the specific web crawler you want to give instructions to. For example, `Googlebot` is the user-agent for Google's main crawler. A wildcard, `*`, can be used to apply rules to all crawlers." },
    { question: "What's the difference between `Disallow` and `Allow`?", answer: "`Disallow` tells a crawler not to access a specific path. `Allow` explicitly permits access to a path, even if it's within a disallowed directory. The `Allow` directive is useful for making exceptions. For example, you could disallow `/images/` but then allow `/images/logo.png`." },
    { question: "How do I add a sitemap to my robots.txt?", answer: "You should add a `Sitemap:` directive followed by the full URL of your XML sitemap (e.g., `Sitemap: https://www.example.com/sitemap.xml`). This helps search engines discover all the pages you want them to index. You can have multiple sitemap directives." },
    { question: "Will disallowing a page remove it from Google's search results?", answer: "Not necessarily. If a disallowed page is linked to from other sites, Google may still index it without visiting it, showing a URL-only result with a note that the content is blocked by robots.txt. To reliably prevent a page from appearing in search results, you should use a `noindex` meta tag on the page itself." },
    { question: "Can I use wildcards like `*` in the path?", answer: "Yes. The `*` character acts as a wildcard to match any sequence of characters. For example, `Disallow: /*.pdf$` would block crawling of all URLs that end with `.pdf`." },
    { question: "What is `Crawl-delay`?", answer: "The `Crawl-delay` directive is an unofficial directive that asks crawlers to wait a certain number of seconds between requests to avoid overloading your server. While some crawlers like Bingbot respect it, Googlebot does not. For Google, you should set your preferred crawl rate in Google Search Console." },
    { question: "Does my site need a robots.txt file?", answer: "If you want all content on your site to be crawled, you don't technically need a robots.txt file. A missing file is generally interpreted as 'allow all.' However, it's a good practice to have a basic one, even if it just contains `User-agent: *` and `Allow: /`, as it can prevent 404 errors in your server logs from bots looking for it." }
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Generate and Validate a Robots.txt File',
    description: 'A step-by-step guide to using the Robots.txt tool.',
    step: [
        {
            '@type': 'HowToStep',
            name: 'Generate a File',
            text: 'Select the "Generate" tab. Choose a default policy (Allow all or Disallow all). Add specific rules for different user-agents (bots) like Googlebot, or use `*` for all bots. Add `Allow` or `Disallow` paths for each user-agent. Finally, add the full URL to your sitemap(s). The generated text will appear in the output box, ready to be copied.'
        },
        {
            '@type': 'HowToStep',
            name: 'Validate a File',
            text: 'Select the "Validate" tab. Paste the content of your existing robots.txt file into the text area. The tool will instantly check for common syntax errors, structural problems, and offer best-practice recommendations.'
        },
        {
            '@type': 'HowToStep',
            name: 'Save and Upload',
            text: 'Once you are happy with your robots.txt content, copy it from the output box, save it as a text file named `robots.txt`, and upload it to the root directory of your website.'
        }
    ],
    totalTime: 'PT3M'
};

export default function RobotsTxtToolPage() {
  return (
    <>
      <StructuredData data={faqData.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } }))} />
      <StructuredData data={howToSchema} />
      <PageHeader
        title="Robots.txt Validator & Generator"
        description="Take control of how search engines crawl your site. Generate a custom robots.txt file from scratch or validate your existing one against SEO best practices."
      />
      <div className="max-w-4xl mx-auto space-y-12">
        <RobotsTxtTool />

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool provides a simple interface for creating and checking your `robots.txt` file, a crucial part of technical SEO.</p>
              <h4>To Generate a New `robots.txt` File:</h4>
              <ol>
                  <li><strong>Select the "Generate" Tab:</strong> This is the default view.</li>
                  <li><strong>Set Default Policy:</strong> Choose whether you want to allow or disallow all crawlers by default.</li>
                  <li><strong>Add Rules:</strong> Click "+ Add Rule Group" to add instructions for a specific crawler (e.g., `Googlebot`, `Bingbot`) or use `*` for all bots.</li>
                  <li><strong>Specify Paths:</strong> Within each rule group, add `Disallow` or `Allow` rules for specific directory paths (e.g., `/admin/`) or file types (e.g., `/*.pdf`).</li>
                  <li><strong>Add Sitemaps:</strong> Paste the full URL of your XML sitemap at the bottom. You can add multiple sitemaps.</li>
                  <li><strong>Copy the Output:</strong> The generated `robots.txt` content appears in the output box, ready to be copied and uploaded to your site's root directory.</li>
              </ol>
              <h4>To Validate an Existing `robots.txt` File:</h4>
              <ol>
                <li><strong>Select the "Validate" Tab.</strong></li>
                <li><strong>Paste Your Content:</strong> Paste the full contents of your current `robots.txt` file into the text area.</li>
                <li><strong>Review Feedback:</strong> The tool will instantly provide feedback, highlighting any syntax errors, logical contradictions, or opportunities for improvement based on SEO best practices.</li>
              </ol>
          </Card>
        </section>

        <Card className='bg-secondary/30 border-primary/20'>
            <CardHeader>
                <div className='flex items-center gap-2 text-primary'>
                    <BookOpen className="h-6 w-6" aria-hidden="true" />
                    <CardTitle className="text-primary">Educational Deep Dive: A Guide to the Robots Exclusion Protocol</CardTitle>
                </div>
                <CardDescription>Understand the power and limitations of `robots.txt` and how it influences your site's presence on search engines.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                <section>
                    <h3 className="font-bold text-xl">What is Robots.txt? The Webmaster's Handshake</h3>
                    <p>
                        The Robots Exclusion Protocol, universally known as `robots.txt`, is a standard used by websites to communicate with web crawlers and other web robots. It's a simple text file that acts as a guide, telling these automated bots which parts of the website they should or should not access. Think of it as a "welcome" sign at the entrance of your digital property with a list of house rules for visiting robots.
                    </p>
                    <p>
                        When a reputable search engine crawler like Googlebot discovers your site, the very first thing it does before crawling any pages is look for `https://yourdomain.com/robots.txt`. If it finds this file, it will read the rules inside and abide by them during its crawling session. If it doesn't find the file, it assumes it has permission to crawl everything.
                    </p>
                </section>
                <section>
                    <h3 className="font-bold text-xl">Key Directives and Their Meanings</h3>
                    <p>A `robots.txt` file is made up of rule groups, and each group consists of a user-agent and a set of `Allow` or `Disallow` directives.</p>
                    <ul className="list-disc pl-5">
                       <li><strong>User-agent:</strong> This specifies which crawler the following rules apply to. `User-agent: *` is a wildcard that applies to all bots. You can also target specific bots like `User-agent: Googlebot` or `User-agent: Bingbot`.</li>
                       <li><strong>Disallow:</strong> This directive tells the user-agent not to crawl a specific URL path. For example, `Disallow: /admin/` prevents crawlers from accessing your admin login page.</li>
                       <li><strong>Allow:</strong> This directive explicitly permits crawling of a URL path, even if it's within a disallowed directory. It acts as an exception. For instance, if you have `Disallow: /private/` but want to allow access to one public file inside, you can add `Allow: /private/report.pdf`.</li>
                       <li><strong>Sitemap:</strong> This directive is not about exclusion but about discovery. It provides the full URL to your XML sitemap, helping crawlers find all the pages you *want* them to index more efficiently.</li>
                    </ul>
                </section>
                 <section>
                    <h3 className="font-bold text-xl">The Critical Misconception: `robots.txt` is NOT a Security Tool</h3>
                    <p>
                        It is absolutely crucial to understand that `robots.txt` is a **voluntary protocol**. Reputable search engines will honor it, but malicious bots, scrapers, and email harvesters will gleefully ignore it. In fact, some malicious bots use `robots.txt` files as a roadmap to find directories you *don't* want people to see.
                    </p>
                     <p>
                        **Never, ever use `robots.txt` to hide sensitive or private information.** If you have content that should not be public, you must protect it with proper authentication (e.g., a password-protected directory) on your server. To prevent a page from appearing in search results, use the `noindex` meta tag in the page's HTML head.
                    </p>
                </section>
            </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips & Quick Hacks</CardTitle></div>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Be Specific:</strong> A trailing slash matters. `Disallow: /folder` will block both `/folder` and `/folder-with-more-text`, while `Disallow: /folder/` will only block content inside that specific directory.</li>
                        <li><strong>Use `$` for Precision:</strong> Use a dollar sign `$` to mark the end of a URL. For example, `Disallow: /*.pdf$` will block any URL ending in `.pdf`, preventing crawlers from downloading these files.</li>
                        <li><strong>Test Before You Deploy:</strong> Always use a tool like this one or Google's own Robots Testing Tool in Search Console to validate your file before uploading it. A small syntax error can have major SEO consequences, like accidentally blocking your entire site.</li>
                        <li><strong>Consolidate Sitemaps:</strong> If you have multiple sitemaps, it's best practice to create a sitemap index file and link to that single index file in your `robots.txt`.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Accidental Full Block:</strong> A typo resulting in `Disallow: /` will block your entire website from being crawled, which can be catastrophic for your SEO.</li>
                        <li><strong>Case Sensitivity:</strong> Paths in `robots.txt` are case-sensitive. `Disallow: /MyFolder/` is different from `Disallow: /myfolder/`. Ensure your rules match your URL structure exactly.</li>
                        <li><strong>Using `noindex` in `robots.txt`:</strong> Google officially stopped supporting the `noindex:` directive in `robots.txt` in 2019. To prevent indexing, you must use the `noindex` meta tag or X-Robots-Tag HTTP header.</li>
                        <li><strong>Blocking CSS and JS Files:</strong> In the past, it was common to disallow crawling of CSS and JavaScript files. This is now a bad practice. Google needs to render your pages to understand them, and blocking these resources can negatively impact your ranking.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>

        <section>
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <Card>
                <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                        {faqData.map((item, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent>{item.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </section>

        <section>
            <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/tools/sitemap-generator" className="block">
                    <Card className="hover:border-primary transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center justify-between">Sitemap Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                            <CardDescription className="text-xs">Create the XML sitemap that you will link to in your `robots.txt` file.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
                <Link href="/tools/http-header-checker" className="block">
                    <Card className="hover:border-primary transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center justify-between">HTTP Header Checker<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                            <CardDescription className="text-xs">Check for `X-Robots-Tag` HTTP headers, which can also control crawler behavior.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
                <Link href="/tools/url-encoder-decoder" className="block">
                    <Card className="hover:border-primary transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center justify-between">URL Encoder/Decoder<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                            <CardDescription className="text-xs">Ensure paths with special characters are correctly formatted for your `robots.txt` rules.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            </div>
        </section>
      </div>
    </>
  );
}
