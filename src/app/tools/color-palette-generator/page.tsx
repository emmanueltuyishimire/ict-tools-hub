
import { PageHeader } from '@/components/page-header';
import { ColorPaletteGenerator } from './color-palette-generator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export const metadata = {
    title: 'Color Palette Generator | ICT Toolbench',
    description: 'Generate beautiful, harmonious color palettes from a base color. Instantly create shades, tints, and complementary colors for your web design and development projects.',
};

export default function ColorPaletteGeneratorPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
        <PageHeader
            title="Color Palette Generator"
            description="Create harmonious color schemes instantly. Choose a base color and generate a full palette of shades, tints, and complementary colors."
        />
        
        <ColorPaletteGenerator />

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
    </div>
  );
}
