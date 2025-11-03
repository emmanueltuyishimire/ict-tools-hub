
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
  metadataBase: new URL('https://ict.calculation.site'), // Replace with your actual domain
  title: {
    default: 'ICT Tools Hub - Your Ultimate Tech Toolkit',
    template: '%s | ICT Tools Hub',
  },
  description:
    'A comprehensive suite of 100+ free online tools for students, developers, network admins, and tech enthusiasts. Networking, programming, security, and more.',
  openGraph: {
    title: 'ICT Tools Hub - Your Ultimate Tech Toolkit',
    description: 'A comprehensive suite of free online tools for ICT professionals and students.',
    url: 'https://ict.calculation.site', // Replace with your actual domain
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
  url: 'https://ict.calculation.site', // Replace with actual URL
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
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-2LF3Z5PGR4"></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-2LF3Z5PGR4');
          `}
        </Script>
      </head>
      <body
        suppressHydrationWarning={true}
        className="min-h-screen bg-background font-body antialiased flex"
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground">
          Skip to main content
        </a>
        <AppLayout>{children}</AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
