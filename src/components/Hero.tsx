import HeroCanvasClient from '@/components/HeroCanvasClient'
import { BlurFade } from '@/components/magicui/blur-fade'
import { TextAnimate } from '@/components/magicui/text-animate'
import { siteData } from '@/data'
import { buildTelegramLink } from '@/lib/links'

const Hero = () => {
  const telegramItem =
    siteData?.contacts?.items?.find((item) => item?.id === 'telegram') ??
    siteData?.contacts?.items?.[0]
  const ctaLink = telegramItem?.href
    ? buildTelegramLink(telegramItem.href, siteData?.cta?.message ?? '')
    : null

  return (
    <section id="home" className="section-target relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6">
      <HeroCanvasClient targetSelector="#hero-cta" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90" />
      <div className="relative z-10 -mt-24 flex w-full max-w-4xl flex-col items-center text-center">
        <div className="-mt-10">
          <BlurFade inView duration={0.6} blur="10px" offset={12}>
            <h1
              className="
                mx-auto
                max-w-[1200px]
                text-center
                font-arsenal font-normal
                text-white
                leading-[1.02]
                tracking-[0.04em]
                text-[clamp(2.6rem,5.8vw,5.2rem)]
                drop-shadow-[0_12px_50px_rgba(0,0,0,0.65)]
                whitespace-normal
                sm:whitespace-nowrap
              "
            >
              Там где идея оживает
            </h1>
          </BlurFade>
        </div>
        <div className="hero-cta mt-6 flex flex-col items-center gap-3">
          {ctaLink ? (
            <a
              id="hero-cta"
              href={ctaLink}
              target="_blank"
              rel="noreferrer"
              className="glass accent-ring rounded-full px-8 py-3 text-sm font-helvetica font-light uppercase tracking-[0.3em] transition duration-500 ease-smooth hover:scale-[1.03]"
            >
              {siteData.cta.label}
            </a>
          ) : null}
          <TextAnimate
            animation="blurInUp"
            by="character"
            once
            className="text-xs text-white/50"
          >
            {siteData.hero.ctaNote}
          </TextAnimate>
        </div>
      </div>
    </section>
  )
}

export default Hero
