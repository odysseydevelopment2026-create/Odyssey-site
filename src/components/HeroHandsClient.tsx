'use client'

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react'

type Props = { targetSelector?: string }

export default function HeroHandsClient({ targetSelector = '#hero-cta' }: Props) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const update = () => {
      const el = document.querySelector(targetSelector) as HTMLElement | null
      if (!el) return
      const r = el.getBoundingClientRect()
      setPos({ x: r.left + r.width / 2, y: r.top + r.height / 2 })
    }
    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update)
    }
  }, [targetSelector])

  if (!pos) return null

  const ax = pos.x
  const ay = pos.y

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1]">
      <img
        src="/hands/left.png"
        alt=""
        className="absolute select-none will-change-transform opacity-70"
        style={{
          left: ax,
          top: ay,
          transform: 'translate(-100%, -50%) translateX(-160px) scale(2.4)',
        }}
      />
      <img
        src="/hands/right.png"
        alt=""
        className="absolute select-none will-change-transform opacity-70"
        style={{
          left: ax,
          top: ay,
          transform: 'translate(0%, -50%) translateX(160px) scale(2.4)',
        }}
      />
    </div>
  )
}
