import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import MainLayoutWrapper from '../components/MainLayoutWrapper';
import CommonRootLayout from '../components/common/RootLayout';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://hypehop.co.kr'),
  title: '하입합 | 앨범 리뷰',
  description: '하입합, hypehop, 앨범 리뷰, 힙합, 음악, 차트, 앨범 차트, 힙합 차트, 앨범, 앨범 평점',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
  },
  icons: {
    apple: '/logo-main.svg',
  },
  openGraph: {
    title: '하입합',
    siteName: '하입합',
    description: '하입합, hypehop, 앨범 리뷰, 힙합, 음악, 차트',
    images: [
      {
        url: '/meta_guide.jpg',
        width: 600,
        height: 450,
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TZ9GR4QGLP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TZ9GR4QGLP');
          `}
        </Script>
        <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />
        <AppRouterCacheProvider>
          <MainLayoutWrapper>
            <CommonRootLayout>{children}</CommonRootLayout>
          </MainLayoutWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
