'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { siteData } from '@/data'

type ChatMessage = {
  from: 'client' | 'me'
  text: string
}

const ContactsChat = () => {
  const messages = siteData.chat.messages
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([])
  const [typing, setTyping] = useState<ChatMessage | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let msgIndex = 0
    let charIndex = 0
    let active = true

    const next = () => {
      if (!active) return
      const current = messages[msgIndex]

      if (!current) {
        timeoutId = setTimeout(() => {
          setVisibleMessages([])
          setTyping(null)
          msgIndex = 0
          charIndex = 0
          next()
        }, 1200)
        return
      }

      if (charIndex < current.text.length) {
        setTyping({ ...current, text: current.text.slice(0, charIndex + 1) })
        charIndex += 1
        timeoutId = setTimeout(next, current.from === 'me' ? 36 : 46)
        return
      }

      setVisibleMessages((prev) => [...prev, current])
      setTyping(null)
      msgIndex += 1
      charIndex = 0
      timeoutId = setTimeout(next, 640)
    }

    timeoutId = setTimeout(next, 500)

    return () => {
      active = false
      clearTimeout(timeoutId)
    }
  }, [messages])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    container.scrollTop = container.scrollHeight
  }, [visibleMessages, typing])

  return (
    <div className="relative flex h-[420px] w-full flex-col overflow-hidden rounded-3xl border border-white/20 bg-black/40 backdrop-blur-[30px] text-white shadow-[0_30px_80px_rgba(0,0,0,0.7)] before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-b before:from-white/18 before:via-white/8 before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:rounded-3xl after:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(255,255,255,0.08)] after:pointer-events-none sm:h-[480px]">
      <div className="relative z-10 flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <div className="h-9 w-9 overflow-hidden rounded-full">
          <img src="/avatg.png" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-white">Odyssey</span>
          <span className="text-[11px] text-white/50">online</span>
        </div>
      </div>
      <div
        ref={containerRef}
        className="relative z-10 flex flex-1 flex-col gap-3 overflow-hidden px-4 py-4 text-sm"
      >
        {visibleMessages.map((message, index) => (
          <div
            key={`${message.from}-${index}`}
            className={`relative max-w-[80%] overflow-hidden rounded-2xl px-4 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl border before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/25 before:via-white/8 before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] after:pointer-events-none ${
              message.from === 'client'
                ? 'mr-auto bg-[#1f8ec7] text-white border-white/20'
                : 'ml-auto bg-white/10 text-white border-transparent'
            }`}
          >
            {message.text}
          </div>
        ))}
        {typing ? (
          <div
            className={`relative max-w-[80%] overflow-hidden rounded-2xl px-4 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl border before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/25 before:via-white/8 before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] after:pointer-events-none ${
              typing.from === 'client'
                ? 'mr-auto bg-[#1f8ec7] text-white border-white/20'
                : 'ml-auto bg-white/10 text-white border-transparent'
            }`}
          >
            {typing.text}
          </div>
        ) : null}
      </div>
      <div className="relative z-10 flex items-center gap-3 border-t border-white/10 bg-white/5 px-4 py-3 text-xs text-white/50 overflow-hidden backdrop-blur-xl before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:via-white/8 before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] after:pointer-events-none">
        <button type="button" aria-label="Emoji" className="text-white/60">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4 8a1 1 0 11-2 0 1 1 0 012 0zm-8 0a1 1 0 11-2 0 1 1 0 012 0zm8.2 6.2a6 6 0 01-8.4 0 1 1 0 011.4-1.4 4 4 0 005.6 0 1 1 0 011.4 1.4z" />
          </svg>
        </button>
        <button type="button" aria-label="Attach" className="text-white/60">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M16.5 6.5l-7.8 7.8a2.5 2.5 0 003.5 3.5l7.8-7.8a4 4 0 10-5.7-5.7l-7.9 7.9a5.5 5.5 0 107.8 7.8l6.4-6.4a1 1 0 10-1.4-1.4l-6.4 6.4a3.5 3.5 0 11-5-5l7.9-7.9a2 2 0 112.8 2.8l-7.8 7.8a.5.5 0 01-.7-.7l7.8-7.8a1 1 0 10-1.4-1.4z" />
          </svg>
        </button>
        <div className="flex-1 rounded-full bg-white/10 px-4 py-2 text-[11px] text-white/50">
          {siteData.ui.chatPlaceholder}
        </div>
        <button type="button" aria-label="Send" className="text-white/60">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M3 11l17-8-4 18-6-6-5-4z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ContactsChat
