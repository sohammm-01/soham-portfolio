import { useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  varying vec2 vUv;

  vec3 mod289v3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289v2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289v3(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289v2(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 a0 = x - floor(x + 0.5);
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;

    float flow1 = snoise(vec2(uv.x * 2.0  + time * 0.10, uv.y * 0.5 + time * 0.05));
    float flow2 = snoise(vec2(uv.x * 1.5  + time * 0.08, uv.y * 0.8 + time * 0.03));
    float flow3 = snoise(vec2(uv.x * 3.0  + time * 0.12, uv.y * 0.3 + time * 0.07));

    float streaks = sin((uv.x + flow1 * 0.3) * 8.0  + time * 0.20) * 0.5 + 0.5;
    streaks      *= sin((uv.y + flow2 * 0.2) * 12.0 + time * 0.15) * 0.5 + 0.5;

    float aurora = pow((flow1 + flow2 + flow3) * 0.33 + 0.5, 2.0);

    vec3 color = vec3(0.0, 0.1, 0.15);
    color = mix(color, vec3(0.0, 0.3, 0.4),  smoothstep(0.3,  0.7,  aurora + streaks * 0.3));
    color = mix(color, vec3(0.0, 0.6, 0.7),  smoothstep(0.6,  0.9,  aurora + flow1 * 0.4));
    color = mix(color, vec3(0.2, 0.8, 0.9),  smoothstep(0.8,  1.0,  streaks + aurora * 0.5) * 0.7);
    color = mix(color, vec3(0.0, 0.7, 0.4),  smoothstep(0.7,  0.95, flow3 + streaks * 0.2) * 0.5);
    color += snoise(uv * 100.0) * 0.02;

    gl_FragColor = vec4(color, 1.0);
  }
`

function AuroraScene() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
      }),
    [],
  )

  useFrame((state) => {
    material.uniforms.time.value = state.clock.elapsedTime
  })

  return (
    <mesh position={[0, 0, -50]}>
      <planeGeometry args={[200, 200]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

function CameraController() {
  useFrame((state) => {
    const t = state.clock.elapsedTime
    state.camera.position.x = Math.sin(t * 0.05) * 3
    state.camera.position.y = Math.cos(t * 0.07) * 2
    state.camera.position.z = 30
    state.camera.lookAt(0, 0, -30)
  })
  return null
}

export function AuroraBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        style={{ display: 'block', width: '100%', height: '100%', pointerEvents: 'none' }}
        onCreated={({ gl }) => {
          // Ensure the canvas never blocks scroll or touch events
          gl.domElement.style.pointerEvents = 'none'
          gl.domElement.style.touchAction = 'auto'
        }}
      >
        <AuroraScene />
        <CameraController />
        <ambientLight intensity={0.9} />
        <pointLight position={[20, 20, 10]} intensity={0.8} color="#00cccc" distance={100} decay={2} />
        <pointLight position={[-20, -10, 5]} intensity={0.6} color="#00ff99" distance={80} decay={2} />
      </Canvas>
    </div>
  )
}
