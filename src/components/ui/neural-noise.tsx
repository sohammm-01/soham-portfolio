import { useEffect, useRef } from 'react'

interface NeuralNoiseProps {
  color?: [number, number, number]
  opacity?: number
  speed?: number
}

export function NeuralNoise({
  color = [0.9, 0.2, 0.4],
  opacity = 0.95,
  speed = 0.001,
}: NeuralNoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const pointer = { x: 0, y: 0, tX: 0, tY: 0 }
    let gl: WebGLRenderingContext | null = null
    let uniforms: Record<string, WebGLUniformLocation | null> = {}
    let rafId = 0

    const vsSource = `
      precision mediump float;
      varying vec2 vUv;
      attribute vec2 a_position;
      void main() {
        vUv = 0.5 * (a_position + 1.0);
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `
    const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform float u_time;
      uniform float u_ratio;
      uniform vec2 u_pointer_position;
      uniform vec3 u_color;
      uniform float u_speed;
      vec2 rotate(vec2 uv, float th) {
        return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
      }
      float neuro_shape(vec2 uv, float t, float p) {
        vec2 sine_acc = vec2(0.0);
        vec2 res = vec2(0.0);
        float scale = 8.0;
        for (int j = 0; j < 15; j++) {
          uv = rotate(uv, 1.0);
          sine_acc = rotate(sine_acc, 1.0);
          vec2 layer = uv * scale + float(j) + sine_acc - t;
          sine_acc += sin(layer) + 2.4 * p;
          res += (0.5 + 0.5 * cos(layer)) / scale;
          scale *= 1.2;
        }
        return res.x + res.y;
      }
      void main() {
        vec2 uv = 0.5 * vUv;
        uv.x *= u_ratio;
        vec2 pointer = vUv - u_pointer_position;
        pointer.x *= u_ratio;
        float p = clamp(length(pointer), 0.0, 1.0);
        p = 0.5 * pow(1.0 - p, 2.0);
        float t = u_speed * u_time;
        vec3 col = vec3(0.0);
        float noise = neuro_shape(uv, t, p);
        noise = 1.2 * pow(noise, 3.0);
        noise += pow(noise, 10.0);
        noise = max(0.0, noise - 0.5);
        noise *= (1.0 - length(vUv - 0.5));
        col = u_color * noise;
        gl_FragColor = vec4(col, noise);
      }
    `

    function createShader(glCtx: WebGLRenderingContext, source: string, type: number) {
      const shader = glCtx.createShader(type)
      if (!shader) return null
      glCtx.shaderSource(shader, source)
      glCtx.compileShader(shader)
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error('Shader compile error:', glCtx.getShaderInfoLog(shader))
        glCtx.deleteShader(shader)
        return null
      }
      return shader
    }

    function createProgram(glCtx: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) {
      const program = glCtx.createProgram()
      if (!program) return null
      glCtx.attachShader(program, vs)
      glCtx.attachShader(program, fs)
      glCtx.linkProgram(program)
      if (!glCtx.getProgramParameter(program, glCtx.LINK_STATUS)) {
        console.error('Program link error:', glCtx.getProgramInfoLog(program))
        return null
      }
      return program
    }

    function getUniforms(glCtx: WebGLRenderingContext, program: WebGLProgram) {
      const u: Record<string, WebGLUniformLocation | null> = {}
      const count = glCtx.getProgramParameter(program, glCtx.ACTIVE_UNIFORMS)
      for (let i = 0; i < count; i++) {
        const info = glCtx.getActiveUniform(program, i)
        if (!info) continue
        u[info.name] = glCtx.getUniformLocation(program, info.name)
      }
      return u
    }

    function initShader() {
      const canvasEl = canvasRef.current
      if (!canvasEl) return null
      const context =
        canvasEl.getContext('webgl') ||
        (canvasEl.getContext('experimental-webgl') as WebGLRenderingContext | null)
      if (!context) {
        console.error('WebGL not supported')
        return null
      }
      const vs = createShader(context, vsSource, context.VERTEX_SHADER)
      const fs = createShader(context, fsSource, context.FRAGMENT_SHADER)
      if (!vs || !fs) return null
      const program = createProgram(context, vs, fs)
      if (!program) return null
      uniforms = getUniforms(context, program)
      const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
      const vertexBuffer = context.createBuffer()
      context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer)
      context.bufferData(context.ARRAY_BUFFER, vertices, context.STATIC_DRAW)
      context.useProgram(program)
      const loc = context.getAttribLocation(program, 'a_position')
      context.enableVertexAttribArray(loc)
      context.vertexAttribPointer(loc, 2, context.FLOAT, false, 0, 0)
      return context
    }

    function resizeCanvas() {
      const canvasEl = canvasRef.current
      if (!canvasEl || !gl) return
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvasEl.width = window.innerWidth * dpr
      canvasEl.height = window.innerHeight * dpr
      if (uniforms.u_ratio) {
        gl.uniform1f(uniforms.u_ratio, canvasEl.width / canvasEl.height)
      }
      gl.viewport(0, 0, canvasEl.width, canvasEl.height)
    }

    function render() {
      if (!gl) return
      const t = performance.now()
      pointer.x += (pointer.tX - pointer.x) * 0.2
      pointer.y += (pointer.tY - pointer.y) * 0.2
      if (uniforms.u_time) gl.uniform1f(uniforms.u_time, t)
      if (uniforms.u_pointer_position)
        gl.uniform2f(
          uniforms.u_pointer_position,
          pointer.x / window.innerWidth,
          1 - pointer.y / window.innerHeight,
        )
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafId = requestAnimationFrame(render)
    }

    function setupEvents() {
      const update = (x: number, y: number) => {
        pointer.tX = x
        pointer.tY = y
      }
      const pm = (e: PointerEvent) => update(e.clientX, e.clientY)
      const tm = (e: TouchEvent) => {
        if (e.targetTouches[0]) update(e.targetTouches[0].clientX, e.targetTouches[0].clientY)
      }
      const cl = (e: MouseEvent) => update(e.clientX, e.clientY)
      window.addEventListener('pointermove', pm)
      window.addEventListener('touchmove', tm)
      window.addEventListener('click', cl)
      return () => {
        window.removeEventListener('pointermove', pm)
        window.removeEventListener('touchmove', tm)
        window.removeEventListener('click', cl)
      }
    }

    gl = initShader()
    if (!gl) return
    const cleanupEvents = setupEvents()
    resizeCanvas()
    const onResize = () => resizeCanvas()
    window.addEventListener('resize', onResize)
    if (uniforms.u_color) gl.uniform3f(uniforms.u_color, color[0], color[1], color[2])
    if (uniforms.u_speed) gl.uniform1f(uniforms.u_speed, speed)
    render()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      cleanupEvents()
    }
  }, [color, speed])

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
        opacity,
        zIndex: 0,
      }}
    />
  )
}
