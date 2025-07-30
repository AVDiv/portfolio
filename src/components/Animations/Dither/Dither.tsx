/* eslint-disable react/no-unknown-property */
import { useRef, useState, useEffect, forwardRef, useMemo } from "react";
import { useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { EffectComposer, wrapEffect } from "@react-three/postprocessing";
import { Effect } from "postprocessing";
import * as THREE from "three";

// Dynamically import Canvas with SSR disabled
const Canvas = dynamic(() => import("@react-three/fiber").then(mod => mod.Canvas), {
  ssr: false // This ensures the component only renders on client-side
});

const waveVertexShader = `
precision highp float;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;
}
`;

const waveFragmentShader = `
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float waveSpeed;
uniform float waveFrequency;
uniform float waveAmplitude;
uniform vec3 waveColor;
uniform vec2 mousePos;
uniform int enableMouseInteraction;
uniform float mouseRadius;

vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);
  Pi = mod289(Pi);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);
}

const int OCTAVES = 4;
// Optimized fbm function with fewer noise computations
float fbm(vec2 p) {
  float value = 0.0;
  float amp = 1.0;
  float freq = waveFrequency;
  
  // Unroll the loop for better performance
  value += amp * abs(cnoise(p));
  
  p *= freq;
  amp *= waveAmplitude;
  value += amp * abs(cnoise(p));
  
  p *= freq;
  amp *= waveAmplitude;
  value += amp * abs(cnoise(p));
  
  p *= freq;
  amp *= waveAmplitude;
  value += amp * abs(cnoise(p));
  
  return value;
}

// Cache intermediate computation
float pattern(vec2 p) {
  vec2 p2 = p - time * waveSpeed;
  float noiseVal = fbm(p2);
  return fbm(p + noiseVal);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  uv -= 0.5;
  uv.x *= resolution.x / resolution.y;
  float f = pattern(uv);
  if (enableMouseInteraction == 1) {
    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);
    mouseNDC.x *= resolution.x / resolution.y;
    float dist = length(uv - mouseNDC);
    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);
    f -= 0.5 * effect;
  }
  vec3 col = mix(vec3(1.0), waveColor, f);
  gl_FragColor = vec4(col, 1.0);
}
`;

const ditherFragmentShader = `
precision highp float;
uniform float colorNum;
uniform float pixelSize;

// Pre-compute Bayer matrix thresholds for better performance
// Use 4x4 matrix instead of 8x8 for better performance while maintaining visual quality
const float bayerMatrix4x4[16] = float[16](
  0.0/16.0, 8.0/16.0, 2.0/16.0, 10.0/16.0,
  12.0/16.0, 4.0/16.0, 14.0/16.0, 6.0/16.0,
  3.0/16.0, 11.0/16.0, 1.0/16.0, 9.0/16.0,
  15.0/16.0, 7.0/16.0, 13.0/16.0, 5.0/16.0
);

// Optimized dither function with fewer calculations
vec3 dither(vec2 uv, vec3 color) {
  // Pixel grid calculation
  vec2 scaledCoord = floor(uv * resolution / pixelSize);
  
  // Faster 4x4 matrix indexing
  int x = int(mod(scaledCoord.x, 4.0));
  int y = int(mod(scaledCoord.y, 4.0));
  
  // Look up the threshold directly
  float threshold = bayerMatrix4x4[y * 4 + x] - 0.25;
  
  // Pre-calculate color quantization step
  float step = 1.0 / (colorNum - 1.0);
  
  // Apply dithering with fewer operations
  color = clamp(color + threshold * step - 0.2, 0.0, 1.0);
  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
}

void mainImage(in vec4 inputColor, in vec2 uv, out vec4 outputColor) {
  // Pre-calculate normalized pixel size once
  vec2 normalizedPixelSize = pixelSize / resolution;
  
  // Pixelate the texture coordinates
  vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
  
  // Sample texture once
  vec4 color = texture2D(inputBuffer, uvPixel);
  
  // Apply dither to RGB channels
  color.rgb = dither(uv, color.rgb);
  outputColor = color;
}
`;

class RetroEffectImpl extends Effect {
  public uniforms: Map<string, THREE.Uniform<any>>;
  constructor() {
    const uniforms = new Map<string, THREE.Uniform<any>>([
      ["colorNum", new THREE.Uniform(4.0)],
      ["pixelSize", new THREE.Uniform(2.0)],
    ]);
    super("RetroEffect", ditherFragmentShader, { uniforms });
    this.uniforms = uniforms;
  }
  set colorNum(value: number) {
    this.uniforms.get("colorNum")!.value = value;
  }
  get colorNum(): number {
    return this.uniforms.get("colorNum")!.value;
  }
  set pixelSize(value: number) {
    this.uniforms.get("pixelSize")!.value = value;
  }
  get pixelSize(): number {
    return this.uniforms.get("pixelSize")!.value;
  }
}

const RetroEffect = forwardRef<
  RetroEffectImpl,
  { colorNum: number; pixelSize: number }
>((props, ref) => {
  const { colorNum, pixelSize } = props;
  const WrappedRetroEffect = wrapEffect(RetroEffectImpl);
  return (
    <WrappedRetroEffect ref={ref} colorNum={colorNum} pixelSize={pixelSize} />
  );
});

RetroEffect.displayName = "RetroEffect";

interface WaveUniforms {
  [key: string]: THREE.Uniform<any>;
  time: THREE.Uniform<number>;
  resolution: THREE.Uniform<THREE.Vector2>;
  waveSpeed: THREE.Uniform<number>;
  waveFrequency: THREE.Uniform<number>;
  waveAmplitude: THREE.Uniform<number>;
  waveColor: THREE.Uniform<THREE.Color>;
  mousePos: THREE.Uniform<THREE.Vector2>;
  enableMouseInteraction: THREE.Uniform<number>;
  mouseRadius: THREE.Uniform<number>;
}

interface DitheredWavesProps {
  waveSpeed: number;
  waveFrequency: number;
  waveAmplitude: number;
  waveColor: [number, number, number];
  colorNum: number;
  pixelSize: number;
  disableAnimation: boolean;
  enableMouseInteraction: boolean;
  mouseRadius: number;
}

function DitheredWaves({
  waveSpeed,
  waveFrequency,
  waveAmplitude,
  waveColor,
  colorNum,
  pixelSize,
  disableAnimation,
  enableMouseInteraction,
  mouseRadius,
}: DitheredWavesProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const mouseRef = useRef(new THREE.Vector2());
  const { viewport, size, gl } = useThree();

  // Create uniforms with memoized values to prevent unnecessary updates
  const waveUniformsRef = useRef<WaveUniforms>({
    time: new THREE.Uniform(0),
    resolution: new THREE.Uniform(new THREE.Vector2(0, 0)),
    waveSpeed: new THREE.Uniform(waveSpeed),
    waveFrequency: new THREE.Uniform(waveFrequency),
    waveAmplitude: new THREE.Uniform(waveAmplitude),
    waveColor: new THREE.Uniform(new THREE.Color(...waveColor)),
    mousePos: new THREE.Uniform(new THREE.Vector2(0, 0)),
    enableMouseInteraction: new THREE.Uniform(enableMouseInteraction ? 1 : 0),
    mouseRadius: new THREE.Uniform(mouseRadius),
  });
  
  // Memoize resolution calculations
  const updateResolution = useRef((width: number, height: number) => {
    const dpr = gl.getPixelRatio();
    const newWidth = Math.floor(width * dpr);
    const newHeight = Math.floor(height * dpr);
    waveUniformsRef.current.resolution.value.set(newWidth, newHeight);
  });

  // Only update resolution when size changes
  useEffect(() => {
    updateResolution.current(size.width, size.height);
  }, [size.width, size.height, gl]);

  const prevProps = useRef({
    waveSpeed,
    waveFrequency,
    waveAmplitude,
    waveColor: [...waveColor],
    enableMouseInteraction,
    mouseRadius
  });
  
  // Use a throttled update for animation frames
  const lastFrameTime = useRef(0);
  const frameInterval = useRef(1000 / 60); // Cap at 60fps for performance
  
  useFrame(({ clock }) => {
    const u = waveUniformsRef.current;
    const now = clock.getElapsedTime() * 1000;
    
    // Time-based animation update at capped framerate
    if (!disableAnimation && now - lastFrameTime.current >= frameInterval.current) {
      u.time.value = clock.getElapsedTime();
      lastFrameTime.current = now;
    }

    // Batch uniform updates only when props change
    const prev = prevProps.current;
    let propsChanged = false;
    
    if (prev.waveSpeed !== waveSpeed) {
      u.waveSpeed.value = waveSpeed;
      prev.waveSpeed = waveSpeed;
      propsChanged = true;
    }
    
    if (prev.waveFrequency !== waveFrequency) {
      u.waveFrequency.value = waveFrequency;
      prev.waveFrequency = waveFrequency;
      propsChanged = true;
    }
    
    if (prev.waveAmplitude !== waveAmplitude) {
      u.waveAmplitude.value = waveAmplitude;
      prev.waveAmplitude = waveAmplitude;
      propsChanged = true;
    }
    
    if (!prev.waveColor.every((v, i) => v === waveColor[i])) {
      u.waveColor.value.set(...waveColor);
      prev.waveColor = [...waveColor];
      propsChanged = true;
    }
    
    if (prev.enableMouseInteraction !== enableMouseInteraction) {
      u.enableMouseInteraction.value = enableMouseInteraction ? 1 : 0;
      prev.enableMouseInteraction = enableMouseInteraction;
      propsChanged = true;
    }
    
    if (prev.mouseRadius !== mouseRadius) {
      u.mouseRadius.value = mouseRadius;
      prev.mouseRadius = mouseRadius;
      propsChanged = true;
    }

    // Only update mouse position when interaction is enabled and something changed
    if (enableMouseInteraction) {
      u.mousePos.value.copy(mouseRef.current);
    }
  });

  // Throttle pointer events for better performance
  const lastMoveTime = useRef(0);
  const moveThrottleInterval = useRef(16); // ~60fps throttle
  
  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!enableMouseInteraction) return;
    
    const now = performance.now();
    if (now - lastMoveTime.current < moveThrottleInterval.current) {
      return;
    }
    
    const rect = gl.domElement.getBoundingClientRect();
    const dpr = gl.getPixelRatio();
    mouseRef.current.set(
      (e.clientX - rect.left) * dpr,
      (e.clientY - rect.top) * dpr
    );
    
    lastMoveTime.current = now;
  };

  // Memoize the geometry to prevent recreation
  const planeGeometry = useMemo(() => new THREE.PlaneGeometry(1, 1), []);
  
  return (
    <>
      <mesh 
        ref={mesh} 
        scale={[viewport.width, viewport.height, 1]}
        // Combine event handling with the main mesh to eliminate extra mesh
        onPointerMove={enableMouseInteraction ? handlePointerMove : undefined}
      >
        <primitive object={planeGeometry} />
        <shaderMaterial
          vertexShader={waveVertexShader}
          fragmentShader={waveFragmentShader}
          uniforms={waveUniformsRef.current}
        />
      </mesh>

      <EffectComposer>
        <RetroEffect colorNum={colorNum} pixelSize={pixelSize} />
      </EffectComposer>
    </>
  );
}

interface DitherProps {
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  waveColor?: [number, number, number];
  colorNum?: number;
  pixelSize?: number;
  disableAnimation?: boolean;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
}

export default function Dither({
  waveSpeed = 0.05,
  waveFrequency = 3,
  waveAmplitude = 0.3,
  waveColor = [0.5, 0.5, 0.5],
  colorNum = 4,
  pixelSize = 2,
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 1,
}: DitherProps) {
  // Handle SSR - detect if window is defined (client-side) or not (server-side)
  const [isClient, setIsClient] = useState(false);
  
  // Use effect to set client-side flag after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Memoize props to prevent unnecessary rerenders
  const memoizedProps = useMemo(() => ({
    waveSpeed,
    waveFrequency,
    waveAmplitude,
    waveColor,
    colorNum,
    pixelSize,
    disableAnimation,
    enableMouseInteraction,
    mouseRadius
  }), [
    waveSpeed,
    waveFrequency,
    waveAmplitude,
    waveColor,
    colorNum,
    pixelSize,
    disableAnimation,
    enableMouseInteraction,
    mouseRadius
  ]);
  
  // If we're server-side rendering, return an empty div as placeholder
  // This prevents trying to access window during SSR
  if (!isClient) {
    return <div className="w-full h-full relative" />;
  }
  
  // Safely determine device pixel ratio
  const getDpr = () => {
    if (typeof window !== 'undefined') {
      return Math.min(window.devicePixelRatio, 2);
    }
    return 1;
  };
  
  return (
    <Canvas
      className="w-full h-full relative"
      camera={{ position: [0, 0, 6] }}
      dpr={getDpr()}
      gl={{ 
        antialias: false, // Turn off antialiasing since we're using pixelation anyway
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance'
      }}
      frameloop={disableAnimation ? 'demand' : 'always'} // Only render when needed if animation is disabled
    >
      <DitheredWaves {...memoizedProps} />
    </Canvas>
  );
}
