import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import './globals.css';
import { AppLayout } from '@/components/app-layout';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'ICT Toolbench - Your Ultimate Tech Toolkit',
  description:
    'A comprehensive suite of 200+ free online tools for students, developers, network admins, and tech enthusiasts. Networking, programming, security, and more.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
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