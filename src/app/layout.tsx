import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import './globals.css';
import { AppLayout } from '@/components/app-layout';
import { Toaster } from '@/components/ui/toaster';
import { StructuredData } from '@/components/structured-data';

export const metadata: Metadata = {
  title: 'ICT Toolbench - Your Ultimate Tech Toolkit',
  description:
    'A comprehensive suite of 200+ free online tools for students, developers, network admins, and tech enthusiasts. Networking, programming, security, and more.',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'ICT Toolbench',
  description: 'A comprehensive suite of free online tools for ICT professionals, students, and enthusiasts, including networking, programming, and security utilities.',
  url: 'https://www.your-app-url.com', // Replace with actual URL
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData data={webAppSchema} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning={true}
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          'selection:bg-primary selection:text-primary-foreground'
        )}
      >
        <AppLayout>{children}</AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
