import type { Metadata } from 'next';
import '../src/index.css';

export const metadata: Metadata = {
  title: 'CTA Alerts Dashboard',
  description: 'Realtime CTA system alerts dashboard built with Next.js and React.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
