"use client"

import { useEffect, useState } from "react"
import { ProgressiveBlur } from "@/components/magicui/progressive-blur"

export default function ScrollProgressiveBlur() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const onScroll = () => {
      setActive(true)
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => setActive(false), 220)
    }

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  const opacityClass = active ? "opacity-100" : "opacity-0"

  return (
    <>
      <ProgressiveBlur
        position="top"
        height="22%"
        className={`fixed left-0 right-0 top-0 z-20 transition-opacity duration-300 ${opacityClass}`}
      />
      <ProgressiveBlur
        position="bottom"
        height="22%"
        className={`fixed left-0 right-0 bottom-0 z-20 transition-opacity duration-300 ${opacityClass}`}
      />
    </>
  )
}
