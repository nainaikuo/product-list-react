import type { Metadata } from 'next';
import './globals.scss';

export const metadata: Metadata = {
  title: 'React 前端工程師實作題',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
