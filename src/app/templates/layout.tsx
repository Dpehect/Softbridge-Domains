import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Premium Website Templates',
  description: 'Browse our collection of premium, industry-specific website templates. Get started with Softbridge Solutions.',
  openGraph: {
    title: 'Premium Website Templates | Softbridge Solutions',
    description: 'Browse our collection of premium, industry-specific website templates.',
    url: 'https://www.softbridgesolutions.com/templates',
  },
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
