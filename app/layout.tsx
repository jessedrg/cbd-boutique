import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter',
  display: 'swap'
});

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600"],
  variable: '--font-serif',
  display: 'swap'
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cbdboutique.io';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'CBD Boutique | Premium CBD Products',
    template: '%s | CBD Boutique',
  },
  description: 'Premium CBD products. Organic, lab-tested CBD oils, flowers, cosmetics and edibles. Discreet shipping, expert guidance.',
  keywords: ['cbd oil', 'cbd flowers', 'cbd cosmetics', 'cbd edibles', 'organic cbd', 'lab tested cbd', 'premium cbd', 'cbd shop', 'buy cbd', 'cbd online'],
  authors: [{ name: 'CBD Boutique' }],
  creator: 'CBD Boutique',
  publisher: 'CBD Boutique',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/icon-light-32x32.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'CBD Boutique',
    title: 'CBD Boutique | Premium CBD Products',
    description: 'Premium CBD products. Organic, lab-tested CBD oils, flowers, cosmetics and edibles. Discreet shipping.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1612995923001-27d03779d023?w=1200&h=630&fit=crop&q=80',
        width: 1200,
        height: 630,
        alt: 'CBD Boutique - Premium CBD Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CBD Boutique | Premium CBD Products',
    description: 'Premium CBD products. Organic, lab-tested. Discreet shipping.',
    images: ['https://images.unsplash.com/photo-1612995923001-27d03779d023?w=1200&h=630&fit=crop&q=80'],
    creator: '@cbdboutique',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: '#f5f4f0',
  width: 'device-width',
  initialScale: 1,
}

import { CartProvider } from '@/components/cart/cart-context'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { IntercomProvider } from '@/components/intercom'
import { AgeVerification } from '@/components/age-verification'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}>
        <CartProvider>
          <AgeVerification />
          {children}
          <CartDrawer />
        </CartProvider>
        <IntercomProvider />
        <Analytics />
      </body>
    </html>
  )
}
