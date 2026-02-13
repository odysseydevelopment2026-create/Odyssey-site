'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { BlurFade } from '@/components/magicui/blur-fade'
import { TextAnimate } from '@/components/magicui/text-animate'
import { siteData } from '@/data'

const Portfolio = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectionKey, setSelectionKey] = useState(0)
  const activeCase = siteData.portfolio.cases[activeIndex]
  const aspectRatio =
    activeCase.width && activeCase.height
      ? `${activeCase.width} / ${activeCase.height}`
      : '16 / 9'

  const handleSelect = (index: number) => {
    setActiveIndex(index)
    setSelectionKey((prev) => prev + 1)
  }

  return (
    <section className="bg-black px-6 py-16 sm:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:gap-12">
        <div className="flex w-full flex-col gap-8 lg:w-1/3">
          <div className="mx-auto w-full max-w-4xl">
            <BlurFade inView duration={0.6} blur="10px" offset={12}>
              <h2 className="mb-8 text-left font-normal tracking-[0.08em] font-arsenal text-2xl sm:text-3xl lg:text-4xl leading-none leading-[1] align-baseline translate-y-[2px] px-5">
                {siteData.portfolio.heading}
              </h2>
            </BlurFade>
            <div className="flex flex-col gap-4">
              {siteData.portfolio.cases.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(index)}
                  className={`rounded-full border px-5 py-3 text-left text-sm transition duration-500 ease-smooth ${
                    index === activeIndex
                      ? 'border-white/70 bg-white/10 text-white'
                      : 'border-white/15 text-white/60 hover:border-white/40 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/3">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCase.id}-${selectionKey}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col gap-6"
            >
              <div className="group glass-soft rounded-2xl border border-white/20 p-4 transition-transform duration-500 ease-out will-change-transform hover:scale-[1.02] transition-shadow duration-500 ease-out group-hover:shadow-[0_30px_120px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-2 pb-3">
                  <span className="h-2 w-2 rounded-full bg-white/70" />
                  <span className="h-2 w-2 rounded-full bg-white/40" />
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                </div>
                <a
                  href={activeCase.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  <div
                    className="relative w-full overflow-hidden rounded-2xl"
                    style={{ aspectRatio }}
                  >
                    <Image
                      src={activeCase.image}
                      alt=""
                      fill
                      className="object-cover scale-110 blur-xl opacity-30"
                      aria-hidden
                    />
                    <Image
                      src={activeCase.image}
                      alt={activeCase.title}
                      fill
                      quality={100}
                      sizes="(max-width: 768px) 100vw, 1200px"
                      className="object-contain object-center"
                    />
                  </div>
                </a>
                <div className="mt-5 text-center">
                  <h3 className="text-xl">
                    <TextAnimate animation="blurInUp" by="character" once>
                      {activeCase.title}
                    </TextAnimate>
                  </h3>
                  <p className="mt-2 text-sm text-white/70">
                    <TextAnimate animation="blurInUp" by="word" once>
                      {activeCase.description}
                    </TextAnimate>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default Portfolio
