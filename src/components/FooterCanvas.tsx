'use client'

import { useEffect, useRef } from 'react'

type Duck = {
  x: number
  y: number
  size: number
  phase: number
  drift: number
}

const createDucks = (): Duck[] => [
  { x: 0.25, y: 0.78, size: 0.09, phase: 0.2, drift: 0.05 },
  { x: 0.5, y: 0.74, size: 0.11, phase: 1.1, drift: -0.04 },
  { x: 0.75, y: 0.8, size: 0.08, phase: 2.4, drift: 0.06 },
]

const FooterCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let animationId = 0
    const dpr = window.devicePixelRatio || 1
    const ducks = createDucks()

    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const drawCrane = () => {
      ctx.strokeStyle = 'rgba(255,255,255,0.7)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(width * 0.1, height * 0.2)
      ctx.lineTo(width * 0.1, height * 0.65)
      ctx.lineTo(width * 0.5, height * 0.65)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(width * 0.1, height * 0.2)
      ctx.lineTo(width * 0.42, height * 0.2)
      ctx.lineTo(width * 0.5, height * 0.26)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(width * 0.42, height * 0.2)
      ctx.lineTo(width * 0.42, height * 0.34)
      ctx.stroke()
    }

    const drawWater = (time: number) => {
      const waterY = height * 0.72
      ctx.strokeStyle = 'rgba(255,255,255,0.25)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(width * 0.1, waterY)
      ctx.lineTo(width * 0.95, waterY)
      ctx.stroke()

      const dropStart = height * 0.34
      const progress = ((time * 0.0006) % 1) ** 1.3
      const dropY = dropStart + (waterY - dropStart) * progress
      ctx.strokeStyle = 'rgba(255,255,255,0.5)'
      ctx.beginPath()
      ctx.moveTo(width * 0.42, dropStart)
      ctx.lineTo(width * 0.42, dropY)
      ctx.stroke()

      ctx.fillStyle = 'rgba(255,255,255,0.8)'
      ctx.beginPath()
      ctx.ellipse(width * 0.42, dropY + 4, 3, 5, 0, 0, Math.PI * 2)
      ctx.fill()
    }

    const drawDuck = (duck: Duck, time: number) => {
      const bob = Math.sin(time * 0.002 + duck.phase) * 4
      const drift = Math.sin(time * 0.001 + duck.phase) * duck.drift * width
      const x = width * duck.x + drift
      const y = height * duck.y + bob
      const size = duck.size * width

      ctx.fillStyle = '#f4d35e'
      ctx.beginPath()
      ctx.ellipse(x, y, size, size * 0.8, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(x + size * 0.35, y - size * 0.35, size * 0.5, size * 0.4, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#f6a800'
      ctx.beginPath()
      ctx.moveTo(x + size * 0.8, y - size * 0.3)
      ctx.lineTo(x + size * 1.1, y - size * 0.2)
      ctx.lineTo(x + size * 0.8, y - size * 0.05)
      ctx.closePath()
      ctx.fill()
    }

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height)
      drawCrane()
      drawWater(time)
      ducks.forEach((duck) => drawDuck(duck, time))
      animationId = window.requestAnimationFrame(render)
    }

    animationId = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="h-full w-full pointer-events-none" aria-hidden="true" />
  )
}

export default FooterCanvas
