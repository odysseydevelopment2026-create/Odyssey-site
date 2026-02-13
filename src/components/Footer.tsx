'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import NumberFlow, { continuous } from '@number-flow/react'
import { siteData } from '@/data'
import EmailCopyButton from '@/components/EmailCopyButton'

const Footer = () => {
  const [timeParts, setTimeParts] = useState({ hour: 0, minute: 0 })

  useEffect(() => {
    const formatterTime = new Intl.DateTimeFormat('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Europe/Moscow',
    })

    const update = () => {
      const now = new Date()
      const parts = formatterTime.formatToParts(now)
      const hour = parts.find((part) => part.type === 'hour')?.value ?? '00'
      const minute = parts.find((part) => part.type === 'minute')?.value ?? '00'
      setTimeParts({
        hour: Number(hour),
        minute: Number(minute),
      })
    }

    update()
    const interval = window.setInterval(update, 1000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <footer className="border-t border-white/10 px-6 py-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
        <div className="flex flex-col items-center gap-3 text-center lg:flex-row lg:items-center lg:gap-5 lg:text-left -mt-6">
          <Image src={siteData.footer.logo} alt="" width={160} height={160} />
          <span className="font-helvetica text-[2.4rem] font-light leading-none text-white/80">
            {siteData.footer.brandName}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h3 className="font-arsenal text-2xl">{siteData.contacts.heading}</h3>
          <div className="flex w-full max-w-[240px] flex-col items-center gap-3">
            {siteData.contacts.items.map((item) => {
              const content = (
                <>
                  <span className="absolute left-5 flex h-6 w-6 items-center justify-center">
                    {item.id === 'telegram' ? (
                      <Image src="/telegram-3.png" alt="" width={24} height={24} className="h-6 w-6" />
                    ) : item.id === 'email' ? (
                      <Image src="/email.png" alt="" width={24} height={24} className="h-6 w-6" />
                    ) : item.id === 'whatsapp' ? (
                      <Image src="/whatsapp.png" alt="" width={24} height={24} className="h-6 w-6" />
                    ) : (
                      <svg
                        viewBox={item.icon.viewBox}
                        className="h-6 w-6 text-white"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d={item.icon.path} />
                      </svg>
                    )}
                  </span>
                  <span className="mx-auto w-[120px] text-center">{item.label}</span>
                </>
              )

              if (item.id === 'email') {
                return (
                  <EmailCopyButton
                    key={item.id}
                    email={item.value}
                    className="relative flex h-12 w-full items-center rounded-full border border-white/15 px-5 text-sm text-white/70 font-manrope transition duration-500 ease-smooth hover:border-white/40 hover:text-white"
                  >
                    {content}
                  </EmailCopyButton>
                )
              }

              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="relative flex h-12 w-full items-center rounded-full border border-white/15 px-5 text-sm text-white/70 font-manrope transition duration-500 ease-smooth hover:border-white/40 hover:text-white"
                >
                  {content}
                </a>
              )
            })}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center sm:order-none order-last">
          <div className="liquid-time text-[3.4rem] font-semibold tracking-tight flex items-center gap-1">
            <NumberFlow
              value={timeParts.hour}
              format={{ minimumIntegerDigits: 2 }}
              plugins={[continuous]}
              className="tabular-nums"
            />
            <span className="tabular-nums">:</span>
            <NumberFlow
              value={timeParts.minute}
              format={{ minimumIntegerDigits: 2 }}
              plugins={[continuous]}
              className="tabular-nums"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
