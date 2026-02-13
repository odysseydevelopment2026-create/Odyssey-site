'use client'

import { useRef, useState } from 'react'
import type { PointerEvent, TouchEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from '@/components/SectionHeading'
import { siteData } from '@/data'

const FormatPicker = () => {
  const [index, setIndex] = useState(0)
  const items = siteData.formats.items
  const active = items[index]
  const touchRef = useRef({
    startX: 0,
    startY: 0,
    swiped: false,
    active: false,
  })

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % items.length)
  }

  const handlePrevPointer = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    handlePrev()
  }

  const handleNextPointer = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    handleNext()
  }

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0]
    if (!touch) return
    touchRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      swiped: false,
      active: true,
    }
  }

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0]
    if (!touch || !touchRef.current.active) return
    const dx = touch.clientX - touchRef.current.startX
    const dy = touch.clientY - touchRef.current.startY
    if (Math.abs(dx) > 24 && Math.abs(dx) > Math.abs(dy)) {
      touchRef.current.swiped = true
    }
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (!touchRef.current.active) return
    const touch = event.changedTouches[0]
    if (!touch) return
    const dx = touch.clientX - touchRef.current.startX
    const dy = touch.clientY - touchRef.current.startY
    touchRef.current.active = false
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        handleNext()
      } else {
        handlePrev()
      }
    }
  }

  return (
    <section className="relative z-0 bg-black px-6 py-16 sm:py-24">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10">
        <SectionHeading title={siteData.formats.heading} align="center" />
        <div className="relative w-full">
          <button
            type="button"
            data-ripple="false"
            onPointerDown={handlePrevPointer}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                handlePrev()
              }
            }}
            className="glass-soft pointer-events-auto absolute left-1 top-1/2 z-30 h-12 w-12 -translate-y-1/2 rounded-full border border-white/20 text-lg transition duration-500 ease-smooth hover:scale-105"
            aria-label={siteData.ui.formatPrev}
          >
            {'<'}
          </button>

          <button
            type="button"
            data-ripple="false"
            onPointerDown={handleNextPointer}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                handleNext()
              }
            }}
            className="glass-soft pointer-events-auto absolute right-1 top-1/2 z-30 h-12 w-12 -translate-y-1/2 rounded-full border border-white/20 text-lg transition duration-500 ease-smooth hover:scale-105"
            aria-label={siteData.ui.formatNext}
          >
            {'>'}
          </button>

          <div className="mx-auto w-full max-w-[820px] px-20 sm:px-28 lg:px-32">
            <div
              className="glass pointer-events-auto relative z-0 flex w-full flex-col items-center gap-6 rounded-3xl px-6 py-10 transition-transform duration-500 ease-smooth will-change-transform hover:scale-[1.02]"
              onClick={() => {
                if (touchRef.current.swiped) {
                  touchRef.current.swiped = false
                  return
                }
                window.location.assign('/contacts#contacts')
              }}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  window.location.assign('/contacts#contacts')
                }
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  className="flex flex-col items-center gap-6"
                >
                  <svg
                    viewBox={active.viewBox}
                    preserveAspectRatio="xMidYMid meet"
                    className="h-40 w-full max-w-[320px] self-center"
                  >
                    <g transform={`translate(${active.offsetX ?? 0} ${active.offsetY ?? 0})`}>
                      {active.paths.map((path) => (
                        <path
                          key={path}
                          d={path}
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      ))}
                    </g>
                  </svg>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/70 font-manrope">
                    {active.name}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FormatPicker
