
import { PageHeader } from '@/components/page-header';
import { ColorPaletteGenerator } from './color-palette-generator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, ChevronRight, Wand, AlertTriangle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StructuredData } from '@/components/structured-data';
import Link from 'next/link';

export const metadata = {
    title: 'Color Palette Generator | Create Harmonious Color Schemes | ICT Toolbench',
    description: 'Generate beautiful, harmonious color palettes from a base color. Instantly create shades, tints, and complementary colors for your web design and development projects.',
    openGraph: {
        title: 'Color Palette Generator | Create Harmonious Color Schemes | ICT Toolbench',
        description: 'Easily create color palettes for your design projects. Input a base color and instantly get shades, tints, and complementary colors to build a cohesive visual identity.',
        url: '/tools/color-palette-generator',
    }
};

const faqData = [
    { question: "What is a color palette?", answer: "A color palette is a set of colors chosen for a specific design or brand. A good palette creates a cohesive and visually appealing look, enhances readability, and evokes a specific mood or feeling." },
    { question: "What is HSL?", answer: "HSL stands for Hue, Saturation, and Lightness. It's a color model that is often more intuitive for humans to work with than RGB. **Hue** is the pure color on a 360-degree wheel (e.g., 0 is red, 120 is green, 240 is blue). **Saturation** is the intensity or 'purity' of the color (0% is gray, 100% is the full color). **Lightness** is the brightness of the color (0% is black, 100% is white). This tool uses HSL to easily calculate shades and tints." },
    { question: "What are shades and tints?", answer: "Shades are created by adding black to a base color, making it darker. In HSL, this is done by decreasing the lightness. Tints are created by adding white to a base color, making it lighter. This is done by increasing the lightness." },
    { question: "What is a complementary color?", answer: "A complementary color is the color directly opposite the base color on the color wheel. This creates the highest possible contrast and is often used for accent colors on buttons or links to draw the user's attention." },
    { question: "How do I choose a good base color?", answer: "Start with your brand's primary color. If you're starting from scratch, think about the emotion you want to evoke. Blue often conveys trust and stability, green suggests nature and growth, while orange and yellow are energetic. Use the 'Randomize' button to explore different base colors until you find one you like." },
    { question: "Is this tool safe to use?", answer: "Yes. All color generation and calculations happen entirely in your browser using JavaScript. No data is sent to our servers." },
    { question: "How should I use the generated palette in my design?", answer: "Use the base color for primary elements like buttons and headers. Use the darker shades for text and backgrounds to ensure readability. Use the lighter tints for hover effects, subtle background gradients, or highlight sections. Use the complementary color sparingly as an accent for call-to-action elements you want to stand out." },
];

const keyTerminologies = [
    { term: 'Hue', definition: 'The pure color itself, represented as an angle on the 360° color wheel.' },
    { term: 'Saturation', definition: 'The intensity or purity of a color. A lower saturation results in a more grayish, muted color.' },
    { term: 'Lightness', definition: 'The perceived brightness of a color, from black (0%) to white (100%).' },
    { term: 'Shade', definition: 'A darker version of a color, created by decreasing its lightness (adding black).' },
    { term: 'Tint', definition: 'A lighter version of a color, created by increasing its lightness (adding white).' },
    { term: 'Complementary Color', definition: 'The color on the opposite side of the color wheel, providing maximum contrast.' },
];

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Generate a Color Palette',
    description: 'A step-by-step guide to creating a harmonious color scheme.',
    step: [
        { '@type': 'HowToStep', name: 'Choose a Base Color', text: 'Enter a hexadecimal color code in the input field, use the color picker to select one visually, or click "Randomize" to get a random starting color.' },
        { '@type': 'HowToStep', name: 'Review the Palette', text: 'The tool instantly generates a palette based on your selection, including a complementary color for accents, five darker shades, and five lighter tints.' },
        { '@type': 'HowToStep', name: 'Copy Colors', text: 'Click on any color swatch in the generated palette. Its hexadecimal code will be automatically copied to your clipboard.' },
        { '@type':- 'HowToStep', name: 'Apply to Your Design', text: 'Use the copied hex codes in your CSS, design software, or any other tool to build a cohesive and professional-looking design.' },
    ],
    totalTime: 'PT2M'
};

const ColorPaletteGeneratorPage = () => {
    return (
    <>
      <StructuredData data={faqData} />
      <StructuredData data={howToSchema} />
      <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
            title="Color Palette Generator"
            description="Create harmonious color schemes instantly. Choose a base color and generate a full palette of shades, tints, and complementary colors for your design projects."
        />
        
        <ColorPaletteGenerator />
        
        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <Card className="prose prose-sm max-w-none text-foreground p-6">
              <p>This tool helps designers and developers create a cohesive set of colors for any project, based on a single starting color.</p>
              <ol>
                  <li><strong>Select a Base Color:</strong> You have three ways to start. You can type a hex code (e.g., `#3b82f6`), use the visual color picker, or click the "Randomize" button to explore new ideas.</li>
                  <li><strong>Review Your Palette:</strong> The tool instantly generates a full palette based on your base color. This includes:
                    <ul>
                        <li><strong>Base & Complementary:</strong> Your starting color and its direct opposite on the color wheel, perfect for high-contrast accents.</li>
                        <li><strong>Shades:</strong> A series of darker versions of your base color, ideal for text, borders, and dark-mode backgrounds.</li>
                        <li><strong>Tints:</strong> A series of lighter versions, perfect for subtle backgrounds, hover states, and highlights.</li>
                    </ul>
                  </li>
                  <li><strong>Copy Colors with a Click:</strong> Simply click on any color swatch in the palette. Its hex code will be automatically copied to your clipboard, ready to be pasted into your CSS or design tool. A checkmark will appear to confirm the copy.</li>
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
                  <CardTitle className="text-primary">Educational Deep Dive: Color Theory for the Web</CardTitle>
              </div>
              <CardDescription>From Hex to HSL, understand the building blocks of digital color and how to create visually appealing palettes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-lg max-w-none text-foreground">
              <section>
                  <h3 className="font-bold text-xl">The Importance of a Good Color Palette</h3>
                  <p>
                    A well-chosen color palette is the foundation of good design. It establishes brand identity, evokes emotion, improves readability, and guides the user's attention. A harmonious color scheme makes a website feel professional and polished, while a chaotic one can feel jarring and untrustworthy. This tool helps you build a cohesive palette based on fundamental color theory principles.
                  </p>
              </section>
              <section>
                  <h3 className="font-bold text-xl">Understanding Color Models</h3>
                  <p>This tool works with color models to generate palettes. Here's a quick breakdown:</p>
                  <ul className="list-disc pl-5">
                     <li><strong>RGB (Red, Green, Blue):</strong> An additive model where colors are created by mixing red, green, and blue light. It's the standard for digital screens.</li>
                     <li><strong>Hex (Hexadecimal):</strong> A compact, six-digit representation of an RGB color, commonly used in web development (e.g., `#3B82F6`).</li>
                     <li><strong>HSL (Hue, Saturation, Lightness):</strong> A more intuitive model for humans. <strong>Hue</strong> is the pure color (e.g., red, green, blue), <strong>Saturation</strong> is the intensity or vividness of the color, and <strong>Lightness</strong> is how light or dark it is. This tool uses HSL internally to easily calculate shades and tints.</li>
                  </ul>
              </section>
              <section>
                  <h3 className="font-bold text-xl">Creating Palettes: Shades, Tints, and Complements</h3>
                  <p>
                    A good palette isn't just a collection of random colors. It's often built from a single base color.
                  </p>
                   <ul className="list-disc pl-5">
                       <li><strong>Shades:</strong> Created by adding black to a base color, making it darker. In HSL, this is done by decreasing the Lightness. Shades are great for text, backgrounds, and borders.</li>
                       <li><strong>Tints:</strong> Created by adding white to a base color, making it lighter. In HSL, this is done by increasing the Lightness. Tints are useful for hover states, highlights, and subtle background variations.</li>
                       <li><strong>Complementary Color:</strong> The color directly opposite the base color on the color wheel. It provides the strongest possible contrast and is excellent for creating a vibrant accent color for call-to-action buttons or important highlights. In HSL, this is found by shifting the Hue by 180 degrees.</li>
                  </ul>
              </section>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <div className='flex items-center gap-2'><Wand className="h-6 w-6 text-accent" /> <CardTitle>Pro Tips</CardTitle></div>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>60-30-10 Rule:</strong> A classic design rule. Use your primary color (tints/shades) for 60% of your design, a secondary color for 30%, and an accent color (like the complementary color) for 10% to create a balanced look.</li>
                        <li><strong>Test for Accessibility:</strong> Ensure your text has enough contrast against its background. Use a contrast checking tool to make sure your shades are dark enough for text and your tints are light enough for backgrounds to be readable by everyone.</li>
                        <li><strong>Use in CSS Variables:</strong> For easy theming, define your generated palette as CSS variables in your global stylesheet. This makes it easy to apply them consistently and update them globally.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'><AlertTriangle className="h-6 w-6 text-destructive" /> <CardTitle>Common Mistakes to Avoid</CardTitle></div>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                        <li><strong>Too Many Colors:</strong> Avoid using too many unrelated colors, which can make your design look chaotic. Sticking to a generated palette creates harmony.</li>
                        <li><strong>Overusing the Accent Color:</strong> The complementary color is powerful because it's high-contrast. Overusing it will make it lose its impact. Save it for the most important actions you want users to take.</li>
                        <li><strong>Poor Text Contrast:</strong> Don't place light text on a light background or dark text on a dark background. The shades and tints generated are perfect for creating good text/background contrast.</li>
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
                <Link href="/tools/color-converter" className="block">
                    <Card className="hover:border-primary transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center justify-between">Hex ↔ RGB Color Converter<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                            <CardDescription className="text-xs">Convert your generated hex codes to RGB values for use in different applications.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
                <Link href="/tools/css-grid-generator" className="block">
                    <Card className="hover:border-primary transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center justify-between">CSS Grid Generator<ChevronRight className="h-4 w-4 text-muted-foreground" /></CardTitle>
                            <CardDescription className="text-xs">Once you have your color palette, use it to design a modern CSS grid layout.</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            </div>
        </section>
      </div>
    </>
    );
};

export default ColorPaletteGeneratorPage;
