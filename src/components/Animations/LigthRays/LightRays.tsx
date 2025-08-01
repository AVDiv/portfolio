import { useRef, useEffect, useState } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";

interface LightRaysProps {
  rayColor?: string;
  className?: string;
}

const DEFAULT_COLOR = "#ffffff";

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [
        parseInt(m[1], 16) / 255,
        parseInt(m[2], 16) / 255,
        parseInt(m[3], 16) / 255,
      ]
    : [1, 1, 1];
};

const LightRays: React.FC<LightRaysProps> = ({
  rayColor = DEFAULT_COLOR,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<any>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const meshRef = useRef<any>(null);
  const cleanupFunctionRef = useRef<(() => void) | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    if (cleanupFunctionRef.current) {
      cleanupFunctionRef.current();
      cleanupFunctionRef.current = null;
    }

    const initializeWebGL = async () => {
      if (!containerRef.current) return;

      await new Promise((resolve) => setTimeout(resolve, 10));

      if (!containerRef.current) return;

      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 2),
        alpha: true,
      });
      rendererRef.current = renderer;

      const gl = renderer.gl;
      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";

      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      containerRef.current.appendChild(gl.canvas);

      const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

      const frag = `precision highp float;

uniform float iTime;
uniform vec2  iResolution;
uniform vec3  rayColor;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayDirection, vec2 coord, float seedA, float seedB) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayDirection);
  
  // Create spread effect
  float spreadFactor = pow(max(cosAngle, 0.0), 0.8);
  
  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * 0.8;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
  
  // Animated rays
  float baseStrength = clamp(
    (0.4 + 0.2 * sin(cosAngle * seedA + iTime * 1.2)) +
    (0.3 + 0.15 * cos(-cosAngle * seedB + iTime * 0.8)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * spreadFactor;
}

void main() {
  vec2 coord = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);
  
  // White background
  vec3 background = vec3(1.0, 1.0, 1.0);
  
  // Left side rays
  vec2 leftRaySource = vec2(-iResolution.x * 0.2, iResolution.y * 0.5);
  vec2 leftRayDirection = vec2(1.0, 0.0);
  
  // Right side rays
  vec2 rightRaySource = vec2(iResolution.x * 1.2, iResolution.y * 0.5);
  vec2 rightRayDirection = vec2(-1.0, 0.0);
  
  // Calculate ray strengths
  float leftRays1 = rayStrength(leftRaySource, leftRayDirection, coord, 36.22, 21.11);
  float leftRays2 = rayStrength(leftRaySource, leftRayDirection, coord, 22.40, 18.02);
  
  float rightRays1 = rayStrength(rightRaySource, rightRayDirection, coord, 15.33, 28.77);
  float rightRays2 = rayStrength(rightRaySource, rightRayDirection, coord, 31.88, 12.45);
  
  // Combine rays
  float totalRayStrength = (leftRays1 + leftRays2) * 0.5 + (rightRays1 + rightRays2) * 0.5;
  
  // Add subtle noise
  float n = noise(coord * 0.01 + iTime * 0.1);
  totalRayStrength *= (0.9 + 0.1 * n);
  
  // Blend rays with background
  vec3 finalColor = mix(background, rayColor, totalRayStrength * 0.3);
  
  gl_FragColor = vec4(finalColor, 1.0);
}`;

      const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] },
        rayColor: { value: hexToRgb(rayColor) },
      };
      uniformsRef.current = uniforms;

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: vert,
        fragment: frag,
        uniforms,
      });
      const mesh = new Mesh(gl, { geometry, program });
      meshRef.current = mesh;

      const updateSize = () => {
        if (!containerRef.current || !renderer) return;

        renderer.dpr = Math.min(window.devicePixelRatio, 2);

        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
        renderer.setSize(wCSS, hCSS);

        const dpr = renderer.dpr;
        const w = wCSS * dpr;
        const h = hCSS * dpr;

        uniforms.iResolution.value = [w, h];
      };

      const loop = (t: number) => {
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) {
          return;
        }

        uniforms.iTime.value = t * 0.001;

        try {
          renderer.render({ scene: mesh });
          animationIdRef.current = requestAnimationFrame(loop);
        } catch (error) {
          console.warn("WebGL rendering error:", error);
          return;
        }
      };

      window.addEventListener("resize", updateSize);
      updateSize();
      animationIdRef.current = requestAnimationFrame(loop);

      cleanupFunctionRef.current = () => {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }

        window.removeEventListener("resize", updateSize);

        if (renderer) {
          try {
            const canvas = renderer.gl.canvas;
            const loseContextExt =
              renderer.gl.getExtension("WEBGL_lose_context");
            if (loseContextExt) {
              loseContextExt.loseContext();
            }

            if (canvas && canvas.parentNode) {
              canvas.parentNode.removeChild(canvas);
            }
          } catch (error) {
            console.warn("Error during WebGL cleanup:", error);
          }
        }

        rendererRef.current = null;
        uniformsRef.current = null;
        meshRef.current = null;
      };
    };

    initializeWebGL();

    return () => {
      if (cleanupFunctionRef.current) {
        cleanupFunctionRef.current();
        cleanupFunctionRef.current = null;
      }
    };
  }, [isVisible, rayColor]);

  useEffect(() => {
    if (!uniformsRef.current) return;
    uniformsRef.current.rayColor.value = hexToRgb(rayColor);
  }, [rayColor]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full overflow-hidden relative ${className}`.trim()}
    />
  );
};

export default LightRays;