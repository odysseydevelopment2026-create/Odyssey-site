import Link from 'next/link'
import SectionHeading from '@/components/SectionHeading'
import { TextAnimate } from '@/components/magicui/text-animate'
import { MagicCard } from '@/components/magicui/magic-card'
import { siteData } from '@/data'

const StyleGrid = () => {
  return (
    <section className="relative z-10 bg-black px-6 py-16 sm:py-24">
      <div className="mx-auto flex w-full max-w-5xl flex-col">
        <SectionHeading title={siteData.styles.heading} align="center" />
        <div className="mt-8 grid auto-rows-fr items-stretch gap-6 sm:grid-cols-2">
          {siteData.styles.items.map((style) => (
            <Link
              key={style.id}
              href="/contacts#contacts"
              className="block h-full"
              aria-label="Перейти к контактам"
            >
              <MagicCard className="flex h-full flex-col rounded-2xl bg-white/5 p-6 backdrop-blur-md transition duration-500 ease-smooth hover:scale-[1.02]">
                <h3 className="font-heading text-xl">
                  <TextAnimate animation="blurInUp" by="character" once>
                    {style.title}
                  </TextAnimate>
                </h3>
                <p className="mt-3 text-sm text-white/70">
                  <TextAnimate animation="blurInUp" by="word" once>
                    {style.description}
                  </TextAnimate>
                </p>
              </MagicCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StyleGrid
