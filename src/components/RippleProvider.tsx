"use client"

import { useEffect } from "react"

const RIPPLE_DURATION_MS = 600

export default function RippleProvider() {
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return
      const target = (event.target as HTMLElement | null)?.closest("button, a") as HTMLElement | null
      if (!target) return
      if (target.getAttribute("data-ripple") === "false") return

      const rect = target.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return

      if (getComputedStyle(target).position === "static") {
        target.classList.add("ripple-target")
      }
      target.classList.add("ripple-clip")

      const size = Math.max(rect.width, rect.height)
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2

      const ripple = document.createElement("span")
      ripple.className = "ripple-effect"
      ripple.style.width = `${size}px`
      ripple.style.height = `${size}px`
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`

      target.appendChild(ripple)

      const cleanup = () => ripple.remove()
      ripple.addEventListener("animationend", cleanup, { once: true })
      setTimeout(cleanup, RIPPLE_DURATION_MS + 100)
    }

    document.addEventListener("pointerdown", handlePointerDown)
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
    }
  }, [])

  return null
}
