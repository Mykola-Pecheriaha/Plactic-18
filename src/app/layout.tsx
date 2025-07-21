import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AdminHotkey } from '@/components/AdminHotkey/AdminHotkey';
import RootLayout from '@/components/layout/RootLayout';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Медичний центр',
  description: 'Ваш надійний партнер у здоров\'ї',
};

function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme') || 'light';
              document.documentElement.setAttribute('data-theme', theme);
            } catch (e) {
              console.error('Failed to set theme:', e);
            }
          })();
        `,
      }}
    />
  );
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={inter.className}>
        <Providers>
          <RootLayout>
            {children}
            <AdminHotkey />
          </RootLayout>
        </Providers>
      </body>
    </html>
  );
}
