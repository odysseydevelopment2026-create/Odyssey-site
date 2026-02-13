'use client'

import { useEffect, useRef } from 'react'

type HeroCanvasProps = {
  targetSelector?: string
  scaleFactor?: number
}

type Point = {
  x: number
  y: number
  seed: number
}

const parseAsciiArt = (text: string) => {
  const lines = text.split('\n')
  const points: Point[] = []
  let minX = Number.POSITIVE_INFINITY
  let maxX = Number.NEGATIVE_INFINITY
  let minY = Number.POSITIVE_INFINITY
  let maxY = Number.NEGATIVE_INFINITY

  lines.forEach((line, row) => {
    Array.from(line).forEach((char, col) => {
      if (char.trim() !== '' && (row + col) % 2 === 0) {
        minX = Math.min(minX, col)
        maxX = Math.max(maxX, col)
        minY = Math.min(minY, row)
        maxY = Math.max(maxY, row)
      }
    })
  })

  const width = Math.max(1, maxX - minX + 1)
  const height = Math.max(1, maxY - minY + 1)

  lines.forEach((line, row) => {
    Array.from(line).forEach((char, col) => {
      if (char.trim() !== '' && (row + col) % 2 === 0) {
        const x = (col - minX) / width
        const y = (row - minY) / height
        points.push({ x, y, seed: Math.random() })
      }
    })
  })

  return points
}

const HeroCanvas = ({
  targetSelector = '#hero-cta',
  scaleFactor = 2.4,
}: HeroCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const boostRef = useRef(false)
  const pointsRef = useRef<Point[]>([])
  const targetPosRef = useRef({ x: 0, y: 0 })
  const targetReadyRef = useRef(false)

  useEffect(() => {
    let active = true
    const load = () => {
      fetch('/ascii-art-2.txt')
        .then((res) => res.text())
        .then((text) => {
          if (!active) return
          pointsRef.current = parseAsciiArt(text)
        })
        .catch(() => {
          pointsRef.current = []
        })
    }

    if ('requestIdleCallback' in window) {
      const id = (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(load)
      return () => {
        active = false
        ;(window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id)
      }
    }

    const timeoutId = setTimeout(load, 0)
    return () => {
      active = false
      clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let animationId = 0
    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const updateTarget = () => {
      const target = document.querySelector(targetSelector) as HTMLElement | null
      if (!target) return
      const buttonRect = target.getBoundingClientRect()
      const canvasRect = canvas.getBoundingClientRect()
      targetPosRef.current = {
        x: buttonRect.left + buttonRect.width / 2 - canvasRect.left,
        y: buttonRect.top + buttonRect.height / 2 - canvasRect.top,
      }
      targetReadyRef.current = true
    }

    resize()
    updateTarget()
    window.addEventListener('resize', resize)
    window.addEventListener('resize', updateTarget)
    window.addEventListener('scroll', updateTarget, { passive: true })

    const targetElement = document.querySelector(targetSelector) as HTMLElement | null
    const setBoost = (value: boolean) => {
      boostRef.current = value
    }

    const onEnter = () => setBoost(true)
    const onLeave = () => setBoost(false)
    const onFocus = () => setBoost(true)
    const onBlur = () => setBoost(false)

    if (targetElement) {
      targetElement.addEventListener('mouseenter', onEnter)
      targetElement.addEventListener('mouseleave', onLeave)
      targetElement.addEventListener('focus', onFocus)
      targetElement.addEventListener('blur', onBlur)
    }

    const render = (time: number) => {
      if (!targetReadyRef.current) {
        updateTarget()
      }
      const t = time * 0.001
      const intensity = boostRef.current ? 1.6 : 1
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, width, height)

      const baseHandWidth = Math.min(width * 0.5, 520)
      const baseHandHeight = Math.min(height * 0.4, 360)
      const isMobile = width < 640
      const responsiveScale = isMobile ? 0.7 : 1
      const computedHandWidth =
        (isMobile ? baseHandHeight : baseHandWidth) * scaleFactor * responsiveScale
      const computedHandHeight =
        (isMobile ? baseHandWidth : baseHandHeight) * scaleFactor * responsiveScale
      const padX = 0
      const padY = 0
      const maxHandWidth = Math.max(0, width - padX * 2)
      const targetHandWidth = maxHandWidth
      const handWidth = Math.min(
        maxHandWidth,
        Math.max(computedHandWidth, targetHandWidth),
      )
      const widthScale =
        computedHandWidth > 0 ? handWidth / computedHandWidth : 1
      const handHeight = computedHandHeight * widthScale
      const centerX = width * 0.5
      const centerY = height * 0.22
      const desiredContactX = targetReadyRef.current ? targetPosRef.current.x : centerX
      const desiredContactY = targetReadyRef.current
        ? (isMobile ? targetPosRef.current.y : targetPosRef.current.y - handHeight * 1.25)
        : centerY
      const contactRatioX = isMobile ? 0.5 : 0.38
      const contactRatioY = isMobile ? 0.5 : 0.45

      let originX = desiredContactX - handWidth * contactRatioX
      let originY = desiredContactY - handHeight * contactRatioY

      originX = Math.max(padX, Math.min(originX, width - handWidth - padX))
      const minOriginY = -handHeight * 0.18
      originY = Math.max(minOriginY, Math.min(originY, height - handHeight - padY))

      const contactX = originX + handWidth * contactRatioX
      const contactY = originY + handHeight * contactRatioY
      const fontSize = Math.max(10, Math.min(16, handWidth / 20))

      ctx.font = `${fontSize}px "IBM Plex Mono", "Courier New", monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#ffffff'

      pointsRef.current.forEach((point, index) => {
        const flicker =
          Math.sin(t * 3 + point.seed * 10 + index * 0.02) * 0.5 + 0.5
        const digit = flicker > 0.5 ? '1' : '0'
        const driftY =
          Math.sin(t * 4 + point.seed * 8) * (boostRef.current ? 2.2 : 1.2)
        const alpha = Math.min(1, 0.25 + flicker * 0.75 * intensity)

        const localX = originX + point.x * handWidth
        const localY = originY + point.y * handHeight + driftY
        const relX = localX - contactX
        const relY = localY - contactY
        const angle = isMobile ? Math.PI / 2 : 0
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        const drawX = contactX + relX * cos - relY * sin + (isMobile ? width * 0.16 : 0)
        const drawY = contactY + relX * sin + relY * cos
        if (drawY < height * 0.18) return

        ctx.globalAlpha = alpha
        ctx.fillText(
          digit,
          drawX,
          drawY,
        )
      })

      ctx.globalAlpha = 1
      animationId = window.requestAnimationFrame(render)
    }

    const start = () => {
      animationId = window.requestAnimationFrame(render)
    }

    window.requestAnimationFrame(() => window.requestAnimationFrame(start))

    return () => {
      window.cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('resize', updateTarget)
      window.removeEventListener('scroll', updateTarget)
      if (targetElement) {
        targetElement.removeEventListener('mouseenter', onEnter)
        targetElement.removeEventListener('mouseleave', onLeave)
        targetElement.removeEventListener('focus', onFocus)
        targetElement.removeEventListener('blur', onBlur)
      }
    }
  }, [targetSelector, scaleFactor])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      aria-hidden="true"
    />
  )
}

export default HeroCanvas
