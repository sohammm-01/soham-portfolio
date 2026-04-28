import { useEffect, useRef } from 'react'

export function CrystalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

    class Crystal {
      x: number; y: number; angle: number; radius: number
      targetRadius: number; life: number; lineWidth: number; turnAngle: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.angle = Math.random() * Math.PI * 2
        this.radius = 0
        this.targetRadius = Math.random() * 80 + 20
        this.life = 150
        this.lineWidth = Math.random() * 1.5 + 0.5
        this.turnAngle = (Math.random() - 0.5) * 0.1
      }

      draw() {
        ctx.strokeStyle = `hsla(220, 100%, 80%, ${this.life / 150})`
        ctx.lineWidth = this.lineWidth
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(
          this.x + Math.cos(this.angle) * this.radius,
          this.y + Math.sin(this.angle) * this.radius,
        )
        ctx.stroke()
      }

      update() {
        if (this.radius < this.targetRadius) this.radius += 0.5
        this.life -= 1
        this.angle += this.turnAngle
      }
    }

    class Shard {
      x: number; y: number; vx: number; vy: number; life: number; size: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 5 + 2
        this.vx = Math.cos(angle) * speed
        this.vy = Math.sin(angle) * speed
        this.life = 100
        this.size = Math.random() * 3 + 1
      }

      draw() {
        ctx.fillStyle = `hsla(220, 100%, 90%, ${this.life / 100})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.life -= 1
      }
    }

    const crystals: Crystal[] = []
    const shards: Shard[] = []
    let rafId: number

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (Math.random() > 0.7) {
        crystals.push(new Crystal(
          mouse.x + (Math.random() - 0.5) * 50,
          mouse.y + (Math.random() - 0.5) * 50,
        ))
      }

      for (let i = crystals.length - 1; i >= 0; i--) {
        crystals[i].update()
        crystals[i].draw()
        if (crystals[i].life <= 0) crystals.splice(i, 1)
      }

      for (let i = shards.length - 1; i >= 0; i--) {
        shards[i].update()
        shards[i].draw()
        if (shards[i].life <= 0) shards.splice(i, 1)
      }

      rafId = requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 50; i++) {
        shards.push(new Shard(e.clientX, e.clientY))
      }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
