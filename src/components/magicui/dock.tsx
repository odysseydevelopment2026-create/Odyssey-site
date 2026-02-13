"use client"

import React, { createContext, useContext, useRef } from "react"
import {
  motion,
  type MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"

import { cn } from "@/lib/utils"

type DockDirection = "top" | "middle" | "bottom" | "left" | "right"

type DockContextValue = {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  distance: number
  magnification: number
}

const DockContext = createContext<DockContextValue | null>(null)

export function Dock({
  children,
  className,
  direction = "middle",
  magnification = 1.5,
  distance = 120,
}: {
  children: React.ReactNode
  className?: string
  direction?: DockDirection
  magnification?: number
  distance?: number
}) {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY)
  const mouseY = useMotionValue(Number.POSITIVE_INFINITY)

  const alignClass =
    direction === "top"
      ? "items-start"
      : direction === "bottom"
      ? "items-end"
      : "items-center"

  return (
    <div
      className={cn("flex", alignClass, className)}
      onMouseMove={(event) => {
        mouseX.set(event.clientX)
        mouseY.set(event.clientY)
      }}
      onMouseLeave={() => {
        mouseX.set(Number.POSITIVE_INFINITY)
        mouseY.set(Number.POSITIVE_INFINITY)
      }}
    >
      <DockContext.Provider value={{ mouseX, mouseY, distance, magnification }}>
        {children}
      </DockContext.Provider>
    </div>
  )
}

export function DockIcon({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const context = useContext(DockContext)
  const ref = useRef<HTMLDivElement>(null)

  const fallbackMouseX = useMotionValue(Number.POSITIVE_INFINITY)
  const fallbackMouseY = useMotionValue(Number.POSITIVE_INFINITY)
  const mouseX = context?.mouseX ?? fallbackMouseX
  const mouseY = context?.mouseY ?? fallbackMouseY
  const distance = context?.distance ?? 120
  const magnification = context?.magnification ?? 1.5
  const scale = useTransform(mouseX, (value) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return 1
    const dx = value - (rect.left + rect.width / 2)
    const dy = mouseY.get() - (rect.top + rect.height / 2)
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (!Number.isFinite(dist)) return 1
    const clamped = Math.min(dist, distance)
    const percent = 1 - clamped / distance
    return 1 + percent * (magnification - 1)
  })

  const smoothScale = useSpring(scale, { stiffness: 300, damping: 22 })
  return (
    <motion.div ref={ref} style={{ scale: smoothScale }} className={cn(className)}>
      {children}
    </motion.div>
  )
}
