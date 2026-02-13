"use client"

import { useMemo, useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

type TextAnimateProps = {
  children: string
  className?: string
  animation?: "blurInUp"
  by?: "character" | "word"
  once?: boolean
}

export function TextAnimate({
  children,
  className,
  animation = "blurInUp",
  by = "character",
  once = true,
}: TextAnimateProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(ref, { once })
  const prefersReducedMotion = useReducedMotion()

  const items = useMemo(() => {
    if (by === "word") {
      return children.split(" ")
    }
    return Array.from(children)
  }, [children, by])

  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>
  }

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: by === "character" ? 0.015 : 0.06,
        delayChildren: 0.02,
      },
    },
  }

  const child =
    animation === "blurInUp"
      ? {
          hidden: {
            opacity: 0,
            y: 8,
            filter: "blur(6px)",
          },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          },
        }
      : {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }

  return (
    <motion.span
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      aria-label={children}
    >
      {items.map((item, index) => (
        <motion.span
          key={`${item}-${index}`}
          variants={child}
          className="inline-block"
          style={{ willChange: "transform, opacity, filter" }}
        >
          {by === "word" ? (
            <>
              {item}
              {index === items.length - 1 ? "" : "\u00A0"}
            </>
          ) : item === " " ? (
            "\u00A0"
          ) : (
            item
          )}
        </motion.span>
      ))}
    </motion.span>
  )
}
