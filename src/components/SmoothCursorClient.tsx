"use client"

import { useEffect, useState } from "react"
import { SmoothCursor } from "@/components/magicui/smooth-cursor"

export default function SmoothCursorClient() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px) and (pointer: fine)")
    const update = () => setEnabled(media.matches)
    update()

    if (media.addEventListener) {
      media.addEventListener("change", update)
    } else {
      media.addListener(update)
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", update)
      } else {
        media.removeListener(update)
      }
    }
  }, [])

  if (!enabled) return null
  return <SmoothCursor />
}
