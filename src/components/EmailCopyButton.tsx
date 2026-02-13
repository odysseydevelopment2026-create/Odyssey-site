'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Props = {
  email: string
  className?: string
  children: React.ReactNode
}

const EmailCopyButton = ({ email, className, children }: Props) => {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 1500)
    return () => window.clearTimeout(timer)
  }, [copied])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = email
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      try {
        document.execCommand('copy')
        setCopied(true)
      } finally {
        document.body.removeChild(textarea)
      }
    }
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="glass w-full max-w-md rounded-3xl p-8 text-white"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative flex w-full flex-col items-center text-center">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute right-0 top-0 rounded-full border border-white/20 px-3 py-1 text-xs text-white/70"
                >
                  X
                </button>
                <div className="flex flex-col items-center text-center">
                  <h3 className="font-heading text-2xl">Email</h3>
                  <p className="mt-4 text-sm text-white/70">{email}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="glass-soft rounded-full border border-white/20 px-6 py-2 text-xs uppercase tracking-[0.2em] transition duration-500 ease-smooth hover:scale-[1.02]"
                >
                  Копировать
                </button>
                {copied ? (
                  <div className="rounded-full border border-white/20 px-4 py-1 text-xs text-white/70">
                    Скопировано
                  </div>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default EmailCopyButton
