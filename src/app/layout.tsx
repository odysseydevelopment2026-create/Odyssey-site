import type { Metadata } from 'next'
import { Unbounded } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import SmoothCursorClient from '@/components/SmoothCursorClient'
import RippleProvider from '@/components/RippleProvider'
import { siteData } from '@/data'

const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-heading',
  weight: ['400', '700'],
  display: 'swap',
})


export const metadata: Metadata = {
  title: siteData.meta.title,
  description: siteData.meta.description,
  keywords: [...siteData.meta.keywords],
  metadataBase: new URL(siteData.meta.url),
  openGraph: {
    title: siteData.meta.title,
    description: siteData.meta.description,
    url: siteData.meta.url,
    type: 'website',
    images: [
      {
        url: siteData.meta.ogImage,
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${unbounded.variable} bg-bg text-fg`}>
        <SmoothCursorClient />
        <RippleProvider />
        {/* GA / Analytics:
        <Script id="ga" strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX" />
        <Script id="ga-init" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-XXXXXXX');`}</Script>
        <Script id="ym-init" strategy="afterInteractive">{`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(XXXXXXX, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true });`}</Script>
        */}
        <div className="flex min-h-screen flex-col bg-black">
          <Header />
          <main className="relative z-0 flex-1 bg-black pt-28">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
