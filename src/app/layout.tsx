import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import { brand, brandOpenGraphImages, siteUrl } from "@/lib/brand";

import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Pressroom — Independent Daily",
    template: "%s",
  },
  description:
    "Independent reporting, features and commissioned writing from the Pressroom newsroom.",
  authors: [{ name: "Pressroom" }],
  icons: {
    icon: [{ url: brand.logo, type: "image/png", sizes: "797x372" }],
    apple: [{ url: brand.logo, type: "image/png" }],
    shortcut: [{ url: brand.logo, type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: brand.name,
    images: brandOpenGraphImages,
  },
  twitter: {
    card: "summary_large_image",
    images: brandOpenGraphImages,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Barlow:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=Noto+Sans+Sinhala:wght@400;500;600;700;800&family=Noto+Serif+Sinhala:wght@400;600;700&display=swap"
        />
      </head>
      <body>
        <Providers>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
