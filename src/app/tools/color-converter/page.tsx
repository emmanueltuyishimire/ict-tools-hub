
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { ColorConverter } from './color-converter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import { BookOpen, AlertTriangle, Wand, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Hex to RGB Color Converter | ICT Toolbench',
    description: 'Instantly convert colors between hexadecimal (hex) and RGB formats. A simple and fast tool for web developers and designers.',
};

const faqData = [
    { question: "What is the RGB color model?", answer: "The RGB color model is an additive color model in which red, green, and blue light are added together in various ways to reproduce a broad array of colors. The name of the model comes from the initials of the three additive primary colors, red, green, and blue. Each component can have a value from 0 to 255." },
    { question: "What is a hexadecimal color code?", answer: "A hexadecimal color code is a way of representing colors from the RGB color model in a six-digit, three-byte hexadecimal number. The format is `#RRGGBB`, where RR represents red, GG green, and BB blue. For example, `#FF0000` is displayed as red, because red is set to its highest value (FF) and the others are set to the lowest (00)." },
    { question: "What is the shorthand hex format?", answer: "Shorthand hex format allows you to represent some colors with only three digits, like `#F0C`. The browser then expands this by duplicating each digit, so `#F0C` becomes `#FF00CC`. This tool supports both shorthand and full hex formats." },
    { question: "Is this tool safe to use?", answer: "Yes. All color conversions happen entirely within your browser using JavaScript. No data is sent to our servers, ensuring your work remains private." },
    { question: "How can this tool help me with web development?", answer: "Developers and designers constantly work with colors. While design tools often use visual color pickers, code (especially CSS) requires specific formats like Hex or RGB. This tool provides a quick and error-free way to switch between these formats without having to do manual calculations." },
    { question: "Which format should I use in CSS: Hex or RGB?", answer: "Both are fully supported in all modern browsers. Hex codes are shorter and more common for solid colors. The `rgb()` function is useful when you need to set a color's opacity using the `rgba()` format (e.g., `rgba(255, 0, 0, 0.5)` for semi-transparent red), which is something hex could not do until the 4 and 8-digit hex notation (`#RRGGBBAA`) became widely supported." },
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Convert Colors Between Hex and RGB',
    description: 'A guide to using the Hex to RGB converter.',
    step: [
        { '@type': 'HowToStep', name: 'Enter a Color', text: 'Type a color value into either the Hexadecimal input (e.g., `#3B82F6`) or the three RGB inputs (e.g., 59, 130, 246).' },
        { '@type': 'HowToStep', name: 'View Live Conversion', text: 'As you type, the tool will instantly convert the color to the other format. The color preview swatch at the top will also update in real-time.' },
        { '@type': 'HowToStep', name: 'Copy the Result', text: 'Click the copy icon next to the format you need to copy the color code to your clipboard for use in your CSS, image editor, or design tool.' },
    ],
    totalTime: 'PT1M'
};

const keyTerminologies = [
    { term: 'Hex (Hexadecimal)', definition: 'A base-16 number system used in computing. In CSS, it represents a color as a six-digit code preceded by a hash (#).' },
    { term: 'RGB', definition: 'An additive color model based on the primary colors Red, Green, and Blue. In CSS, it\'s represented by the `rgb()` function with three values from 0-255.' },
    { term: 'RGBA', definition: 'An extension of the RGB model that includes an alpha channel (A) to specify the opacity of the color.' },
    { term: 'Additive Color Model', definition: 'A color model where different colors of light are mixed to synthesize new colors. Used for digital displays like monitors and screens.' },
    { term: 'Color Picker', definition: 'A graphical user interface tool used to select colors. Most design software and browser dev tools have a built-in color picker.' },
];

const Page = () => {
    return (
        <>
            <StructuredData data={faqData.map(item => ({'@type': 'Question', name: item.question, acceptedAnswer: {'@type': 'Answer', text: item.answer}}))} />
            <StructuredData data={howToSchema} />
            <div className="max-w-4xl mx-auto space-y-12">
                <PageHeader
                    title="Hex ↔ RGB Color Converter"
                    description="Instantly convert colors between hexadecimal and RGB formats. A simple tool for web developers, designers, and digital artists."
                />
                <ColorConverter />
                
                 <section>
                  <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
                  <Card className="prose prose-sm max-w-none text-foreground p-6">
                      <p>This tool provides a seamless, real-time way to translate between the two most common web color formats.</p>
                      <ol>
                          <li><strong>Enter a Color:</strong> You can start by typing in either the "Hexadecimal" field or the "RGB" fields. The conversion works both ways.</li>
                          <li><strong>See Instant Results:</strong> As you type, the other format will update automatically. The large color swatch at the top will also change to reflect your current color.</li>
                          <li><strong>Copy the Code:</strong> Once you have the color you need, click the copy icon next to the corresponding input to copy the exact code to your clipboard.</li>
                      </ol>
                  </Card>
                </section>

                <section>
                   <h2 className="text-2xl font-bold mb-4">Key Terminologies</h2>
                   <Card>
                      <CardContent className="p-6">
                          <dl className="space-y-4">
                              {keyTerminologies.map((item) => (
                                  <div key={item.term}>
                                      <dt className="font-semibold">{item.term}</dt>
                                      <dd className="text-muted-foreground text-sm">{item.definition}</dd>
                                  </div>
                              ))}
                          </dl>
                      </CardContent>
                   </Card>
                </section>
                
                <Card className='bg-secondary/30 border-primary/20'>
                    <CardHeader>
                        <div className='flex items-center gap-2 text-primary'>
                            <BookOpen className="h-6 w-6" aria-hidden="true" />
                            <CardTitle className="text-primary">Educational Deep Dive: Digital Color Models</CardTitle>
                        </div>
                        <CardDescription>From light on a screen to code in a file, understand how computers represent color.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
                        <section>
                            <h3 className="font-bold text-xl">The RGB Model: Mixing Light</h3>
                            <p>
                                Every color you see on a digital screen—be it a monitor, phone, or TV—is created by mixing three primary colors of light: Red, Green, and Blue. This is known as an **additive color model**. Starting with black (the absence of light), you add different amounts of red, green, and blue light to produce the full spectrum of colors. In the digital world, the intensity of each color component is represented by a number from 0 (no light) to 255 (maximum intensity).
                            </p>
                            <ul className='list-disc pl-5'>
                                <li>`rgb(0, 0, 0)` is black (no light).</li>
                                <li>`rgb(255, 255, 255)` is white (all lights at full intensity).</li>
                                <li>`rgb(255, 0, 0)` is pure red.</li>
                            </ul>
                        </section>
                         <section>
                            <h3 className="font-bold text-xl">Hexadecimal: The Developer's Shorthand</h3>
                            <p>
                                While `rgb(255, 0, 0)` is descriptive, it's also quite long to write in code. This is where the hexadecimal format comes in. Hexadecimal is a base-16 number system. A standard hex color code combines the three RGB values into a single six-digit string. Each color component (Red, Green, Blue) gets two hexadecimal digits to represent its value from 0 to 255.
                            </p>
                            <p>
                                The format is `#RRGGBB`. For example, pure red (`rgb(255, 0, 0)`) becomes `#FF0000`, because `FF` is the hexadecimal equivalent of the decimal number 255, and `00` is the equivalent of 0. This compact format is the most common way to specify colors in CSS and other web technologies.
                            </p>
                        </section>
                    </CardContent>
                </Card>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Real-Life Application Scenarios</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Web Development (CSS)</h3>
                            <p className="text-sm text-muted-foreground">A front-end developer receives a design mockup from a designer. The mockup specifies the brand's primary color as `rgb(59, 130, 246)`. To use this in their CSS, the developer prefers the shorter hex format. They use the converter to instantly get `#3B82F6` and apply it in their stylesheet: `.btn-primary &#123; background-color: #3B82F6; &#125;`.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Graphic Design to Code</h3>
                            <p className="text-sm text-muted-foreground">A graphic designer using a tool like Photoshop or Figma uses the color picker to find the perfect shade for a client's logo, which gives them a hex code: `#10B981`. They need to provide the RGB values for a different medium. They use the converter to find the equivalent `rgb(16, 185, 129)` for their documentation.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Data Visualization</h3>
                            <p className="text-sm text-muted-foreground">A data scientist is creating charts in a Python library like Matplotlib or a JavaScript library like D3.js. The library requires colors to be specified as RGB tuples or an array of values from 0 to 1 (e.g., `(0.06, 0.72, 0.5)`). They start with a list of brand-approved hex codes, convert them to RGB (16, 185, 129), and then divide by 255 to get the required format for their charting library.</p>
                        </div>
                         <div className="bg-card p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Setting up a Tailwind CSS Theme</h3>
                            <p className="text-sm text-muted-foreground">A developer is configuring their `tailwind.config.js` file. They have the primary brand color in hex, `#8B5CF6`, but need to define it as HSL values for ShadCN UI. They first convert the hex to RGB (`139, 92, 246`) and then use an RGB-to-HSL converter to get the final values required for their theme configuration file, ensuring brand consistency.</p>
                        </div>
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Use Browser DevTools:</strong> Modern browsers have excellent built-in color pickers. In your browser's developer tools, you can click on any color swatch in the CSS panel to visually select a new color and see its Hex and RGB values instantly.</li>
                                <li><strong>Shorthand Hex:</strong> If each pair of hex digits is the same (e.g., `#22AAFF`), you can use the three-digit shorthand: `#2AF`. It's a quick way to write simple colors.</li>
                                <li><strong>Opacity with RGBA:</strong> To add transparency to a color, you must use the `rgba()` format. The 'a' stands for alpha and is a value from 0.0 (fully transparent) to 1.0 (fully opaque).</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes</CardTitle></div>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                                <li><strong>Forgetting the Hash:</strong> A common mistake is forgetting the leading `#` on a hex code. `#3B82F6` is a color, but `3B82F6` is just a string and won't work in CSS.</li>
                                <li><strong>Incorrect Digit Count:</strong> A hex code must have either 3 or 6 digits after the `#`. A 5-digit code like `#3B82F` is invalid.</li>
                                <li><strong>Mixing up Hex and RGB:</strong> Confusing the different formats, such as trying to put a hex value inside an `rgb()` function.</li>
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
                        <Link href="/tools/number-converter" className="block">
                            <Card className="hover:border-primary transition-colors h-full">
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center justify-between">Binary ↔ Decimal ↔ Hex Converter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                    <CardDescription className="text-xs">Understand the base-16 (hexadecimal) number system that powers hex color codes.</CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                         <Link href="/tools/css-grid-generator" className="block">
                            <Card className="hover:border-primary transition-colors h-full">
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center justify-between">CSS Grid Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                                    <CardDescription className="text-xs">Once you have your colors, use them to build a modern CSS grid layout.</CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Page;
