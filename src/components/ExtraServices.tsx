'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from '@/components/SectionHeading'
import { siteData } from '@/data'

const ExtraServices = () => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeItem = siteData.extraServices.items.find((item) => item.id === activeId)

  return (
    <section className="bg-black px-6 py-16 sm:py-24">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10">
        <SectionHeading title={siteData.extraServices.heading} align="center" />
        <div className="flex w-full flex-col items-center gap-4">
          {siteData.extraServices.items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveId(item.id)}
              className="glass-soft w-full max-w-sm rounded-full border border-white/20 px-6 py-3 text-sm uppercase tracking-[0.2em] font-manrope transition duration-500 ease-smooth hover:scale-[1.02] hover:border-white/50 hover:bg-white/15 hover:shadow-glass"
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {activeItem ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="glass w-full max-w-md rounded-3xl p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="font-heading text-2xl">{activeItem.title}</h3>
                  <p className="mt-4 text-sm text-white/70">{activeItem.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveId(null)}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70"
                >
                  X
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}

export default ExtraServices
