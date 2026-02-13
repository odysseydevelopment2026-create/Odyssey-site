'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dock, DockIcon } from '@/components/magicui/dock'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { siteData } from '@/data'
import { buildTelegramLink } from '@/lib/links'

const Header = () => {
  const pathname = usePathname()

  const telegramItem =
    siteData?.contacts?.items?.find((item) => item?.id === 'telegram') ??
    siteData?.contacts?.items?.[0]

  const ctaLink =
    telegramItem?.href
      ? buildTelegramLink(telegramItem.href, siteData?.cta?.message ?? '')
      : null

  return (
    <header className="fixed left-0 right-0 top-4 z-[9999] px-4 sm:px-6 pointer-events-auto">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4 sm:rounded-full sm:border sm:border-white/10 sm:bg-black/90 sm:backdrop-blur">
        <div className="flex items-center gap-2 pointer-events-auto sm:gap-4">
          {siteData?.header?.logo ? (
            <Image src={siteData.header.logo} alt="" width={44} height={44} priority className="scale-105" />
          ) : null}

          {siteData?.header?.brandName ? (
            <span className="font-helvetica text-xs font-light tracking-tight text-white/90 sm:text-base">
              {siteData.header.brandName}
            </span>
          ) : null}
        </div>

        <nav className="flex w-full items-center justify-center px-3 py-2 text-xs pointer-events-auto sm:w-auto sm:rounded-full sm:bg-white/5 sm:px-4 sm:text-sm">
          <Dock direction="middle" magnification={1.12} distance={70} className="flex items-center gap-2 sm:gap-4">
            {(siteData?.header?.nav ?? [])
              .filter((item) => item?.href && item?.label)
              .map((item) => (
                <DockIcon key={item.id}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className={`relative isolate overflow-hidden pointer-events-auto rounded-full px-3 py-1 text-white/85 transition-all duration-300 ease-smooth hover:text-white focus:outline-none focus-visible:outline-none bg-white/[0.04] backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12)] before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-white/20 before:via-white/6 before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:left-[15%] after:right-[15%] after:bottom-[-50%] after:h-[120%] after:rounded-full after:bg-[radial-gradient(closest-side,rgba(255,255,255,0.18),rgba(255,255,255,0.06),rgba(0,0,0,0)_70%)] after:blur-[1px] after:opacity-70 after:pointer-events-none sm:px-4 sm:py-1.5 ${
                      pathname === item.href
                        ? 'bg-white/[0.08] text-white shadow-[0_12px_40px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.16)]'
                        : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                </DockIcon>
              ))}
          </Dock>
        </nav>

        {ctaLink ? (
          <ShimmerButton
            as="a"
            href={ctaLink}
            target="_blank"
            rel="noreferrer"
            shimmerColor="#ffffff"
            shimmerDuration="3.2s"
            borderRadius="999px"
            background="rgba(0,0,0,0.45)"
            shimmer={false}
            className="hidden pointer-events-auto px-4 py-2 text-[10px] font-helvetica font-light uppercase tracking-[0.18em] text-white/90 transition-transform duration-300 ease-smooth hover:scale-[1.05] sm:inline-flex sm:px-5 sm:text-xs sm:tracking-[0.22em]"
          >
            {siteData?.header?.ctaLabel ?? 'Связаться'}
          </ShimmerButton>
        ) : null}
      </div>
    </header>
  )
}

export default Header
