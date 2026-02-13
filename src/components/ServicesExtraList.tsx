'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MagicCard } from '@/components/magicui/magic-card'

type ExtraItem = {
  id: string
  title: string
  description: string
}

type Props = {
  title: string
  items: readonly ExtraItem[]
}

const ServicesExtraList = ({ title, items }: Props) => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeItem = items.find((item) => item.id === activeId)

  return (
    <>
      <MagicCard className="rounded-2xl bg-white/5 p-6 backdrop-blur-md transition duration-500 ease-smooth hover:scale-[1.02]">
        <h3 className="font-heading text-lg">{title}</h3>
        <ul className="mt-4 space-y-3 text-sm text-white/70">
          {items.map((item) => (
            <li key={item.id} className="border-b border-white/10 pb-3 last:border-b-0">
              <button
                type="button"
                onClick={() => setActiveId(item.id)}
                className="w-full text-left transition duration-300 ease-smooth hover:text-white"
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </MagicCard>
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
                  <p className="mt-4 text-sm text-white/70">
                    {activeItem.description}
                  </p>
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
    </>
  )
}

export default ServicesExtraList
