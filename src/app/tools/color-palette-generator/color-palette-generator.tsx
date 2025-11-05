'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Copy, Check, RefreshCw, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// --- Color Conversion & Generation Logic ---
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
};

const rgbToHex = (r: number, g: number, b: number): string => {
    const componentToHex = (c: number): string => {
        const hex = Math.round(c).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
};

const hslToRgb = (h: number, s: number, l: number) => {
    s /= 100; l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) { r = c; g = x; b = 0; }
    else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
    else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
    else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
    else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
    else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return { r, g, b };
};


const generatePalette = (baseHex: string) => {
    const baseRgb = hexToRgb(baseHex);
    if (!baseRgb) return null;

    const baseHsl = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);

    const shades = Array.from({ length: 5 }, (_, i) => {
        const lightness = Math.max(0, baseHsl.l - (i + 1) * 10);
        const { r, g, b } = hslToRgb(baseHsl.h, baseHsl.s, lightness);
        return rgbToHex(r, g, b);
    });

    const tints = Array.from({ length: 5 }, (_, i) => {
        const lightness = Math.min(100, baseHsl.l + (i + 1) * 8);
        const { r, g, b } = hslToRgb(baseHsl.h, baseHsl.s, lightness);
        return rgbToHex(r, g, b);
    });
    
    const complementaryHue = (baseHsl.h + 180) % 360;
    const { r, g, b } = hslToRgb(complementaryHue, baseHsl.s, baseHsl.l);
    const complementary = rgbToHex(r, g, b);

    return { shades, tints, complementary };
}


const ColorSwatch = ({ color, name }: { color: string, name: string }) => {
    const [copied, setCopied] = useState(false);

    const copyColor = () => {
        navigator.clipboard.writeText(color);
        setCopied(true);
        setTimeout(() => setCopied(null), 2000);
    }
    
    return (
        <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="relative w-full h-20 rounded-md cursor-pointer" style={{ backgroundColor: color }} onClick={copyColor}>
                    {copied && <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-white mix-blend-difference" />}
                </div>
            </TooltipTrigger>
            <TooltipContent>
                 <p>{name}: {color} (Click to copy)</p>
            </TooltipContent>
        </Tooltip>
        </TooltipProvider>
    );
};


export function ColorPaletteGenerator() {
    const [baseColor, setBaseColor] = useState('#3b82f6'); // A nice blue
    
    const palette = useMemo(() => generatePalette(baseColor), [baseColor]);
    
    const handleRandomize = () => {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        setBaseColor(randomColor);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Color Palette Generator</CardTitle>
                <CardDescription>
                    Generate a harmonious color palette from a base color. Click any color swatch to copy its hex code.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="space-y-2 flex-grow">
                        <Label htmlFor="base-color-input">Base Color (Hex)</Label>
                        <Input
                            id="base-color-input"
                            value={baseColor}
                            onChange={(e) => setBaseColor(e.target.value)}
                            className="font-code"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="color-picker">Select</Label>
                        <Input id="color-picker" type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="w-full h-10 p-1" />
                    </div>
                    <div>
                         <Button onClick={handleRandomize} className="mt-6 w-full sm:w-auto"><RefreshCw className="mr-2 h-4 w-4" /> Randomize</Button>
                    </div>
                </div>

                {palette && (
                    <div className="space-y-6">
                        <div>
                             <h3 className="font-semibold mb-2 text-lg">Base & Complementary</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <ColorSwatch color={baseColor} name="Base" />
                                <ColorSwatch color={palette.complementary} name="Complementary" />
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2 text-lg">Shades (Darker)</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                {palette.shades.map((shade, i) => <ColorSwatch key={i} color={shade} name={`Shade ${i+1}`} />)}
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold mb-2 text-lg">Tints (Lighter)</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                {palette.tints.map((tint, i) => <ColorSwatch key={i} color={tint} name={`Tint ${i+1}`} />)}
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
