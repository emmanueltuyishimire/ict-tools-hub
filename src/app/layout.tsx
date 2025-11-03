
import type { Metadata } from 'next';
import { Inter, Source_Code_Pro } from 'next/font/google';
import Script from 'next/script';
import { cn } from '@/lib/utils';
import './globals.css';
import { AppLayout } from '@/components/app-layout';
import { Toaster } from '@/components/ui/toaster';
import { StructuredData } from '@/components/structured-data';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro',
});


export const metadata: Metadata = {
  metadataBase: new URL('https://www.icttoolshub.com'), // Replace with your actual domain
  title: {
    default: 'ICT Tools Hub - Your Ultimate Tech Toolkit',
    template: '%s | ICT Tools Hub',
  },
  description:
    'A comprehensive suite of 200+ free online tools for students, developers, network admins, and tech enthusiasts. Networking, programming, security, and more.',
  openGraph: {
    title: 'ICT Tools Hub - Your Ultimate Tech Toolkit',
    description: 'A comprehensive suite of free online tools for ICT professionals and students.',
    url: 'https://www.icttoolshub.com', // Replace with your actual domain
    siteName: 'ICT Tools Hub',
    images: [
      {
        url: '/og-image.png', // Replace with your actual OG image path
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ICT Tools Hub - Your Ultimate Tech Toolkit',
    description: 'A comprehensive suite of free online tools for ICT professionals and students.',
    // images: ['/og-image.png'], // Replace with your actual OG image path
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'ICT Tools Hub',
  description: 'A comprehensive suite of free online tools for ICT professionals, students, and enthusiasts, including networking, programming, and security utilities.',
  url: 'https://www.icttoolshub.com', // Replace with actual URL
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${sourceCodePro.variable}`}>
      <head>
        <StructuredData data={webAppSchema} />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=pub-3042243846300811"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        suppressHydrationWarning={true}
        className={cn(
          'min-h-screen bg-background font-body antialiased flex',
          'selection:bg-primary selection:text-primary-foreground'
        )}
      >
        <AppLayout>{children}</AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
