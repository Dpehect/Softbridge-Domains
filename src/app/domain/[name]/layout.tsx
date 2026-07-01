import { Metadata } from 'next';
import { mockDomainsSearch } from '@/utils/domain';
import React from 'react';

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const rawName = resolvedParams.name;
  const domainName = decodeURIComponent(rawName);

  return {
    title: `${domainName} - Premium Domain`,
    description: `Secure ${domainName} today and start building your brand. Available on Softbridge Solutions.`,
    openGraph: {
      title: `${domainName} | Softbridge Solutions`,
      description: `Premium domain name ${domainName} is available for purchase.`,
      url: `https://www.softbridgesolutions.com/domain/${rawName}`,
    },
  };
}

export default async function DomainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ name: string }>;
}) {
  const resolvedParams = await params;
  const rawName = resolvedParams.name;
  const domainName = decodeURIComponent(rawName);
  const nameParts = domainName.split(".");
  const name = nameParts[0] || domainName;
  const tld = nameParts[1] ? `.${nameParts[1]}` : ".com";

  // Mock domain info retrieval for schema
  const matches = mockDomainsSearch(name);
  const domainDetail = matches.find((m) => m.tld === tld) || {
    name,
    tld,
    available: true,
    price: 14.99,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": domainName,
    "description": `Premium domain name ${domainName}`,
    "brand": {
      "@type": "Brand",
      "name": "Softbridge Solutions"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.softbridgesolutions.com/domain/${rawName}`,
      "priceCurrency": "USD",
      "price": domainDetail.price,
      "availability": domainDetail.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Softbridge Solutions"
      }
    }
  };

  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {children}
    </>
  );
}
