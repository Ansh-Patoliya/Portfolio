import { useEffect, useRef } from "react";
import * as THREE from "three";

interface WavePosition {
  x?: number;
  y?: number;
  rotate?: number;
}

interface FloatingLinesProps {
  linesGradient?: string[];
  enabledWaves?: ("top" | "middle" | "bottom")[];
  lineCount?: number[];
  lineDistance?: number[];
  topWavePosition?: WavePosition;
  middleWavePosition?: WavePosition;
  bottomWavePosition?: WavePosition;
  animationSpeed?: number;
  interactive?: boolean;
  bendRadius?: number;
  bendStrength?: number;
  mouseDamping?: number;
  parallax?: boolean;
  parallaxStrength?: number;
  mixBlendMode?: string;
}

const vertexShader = `
precision highp float;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3  iResolution;
uniform float animationSpeed;

uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;

uniform vec3 lineGradient[8];
uniform int lineGradientCount;
uniform vec3 backgroundColor;

const vec3 BLACK = vec3(0.0);
const vec3 PINK  = vec3(233.0, 71.0, 245.0) / 255.0;
const vec3 BLUE  = vec3(47.0,  75.0, 162.0) / 255.0;

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 background_color(vec2 uv) {
  vec3 col = vec3(0.0);

  float y = sin(uv.x - 0.2) * 0.3 - 0.1;
  float m = uv.y - y;

  col += mix(BLUE, BLACK, smoothstep(0.0, 1.0, abs(m)));
  col += mix(PINK, BLACK, smoothstep(0.0, 1.0, abs(m - 0.8)));
  return col * 0.5;
}

vec3 getLineColor(float t, vec3 baseColor) {
  if (lineGradientCount <= 0) {
    return baseColor;
  }

  vec3 gradientColor;
  
  if (lineGradientCount == 1) {
    gradientColor = lineGradient[0];
  } else {
    float clampedT = clamp(t, 0.0, 0.9999);
    float scaled = clampedT * float(lineGradientCount - 1);
    int idx = int(floor(scaled));
    float f = fract(scaled);
    int idx2 = min(idx + 1, lineGradientCount - 1);

    vec3 c1 = lineGradient[idx];
    vec3 c2 = lineGradient[idx2];
    
    gradientColor = mix(c1, c2, f);
  }
  
  return gradientColor * 0.5;
}

float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
  float time = iTime * animationSpeed;

  float x_offset   = offset;
  float x_movement = time * 0.1;
  float amp        = sin(offset + time * 0.2) * 0.3;
  float y          = sin(uv.x + x_offset + x_movement) * amp;

  if (shouldBend) {
    vec2 d = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius); // radial falloff around cursor
    float bendOffset = (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
    y += bendOffset;
  }

  float m = uv.y - y;
  return 0.005 / max(abs(m) + 0.008, 1e-3);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;
  
  if (parallax) {
    baseUv += parallaxOffset;
  }

  vec3 col = backgroundColor;

  vec3 b = lineGradientCount > 0 ? vec3(0.0) : background_color(baseUv);

  vec2 mouseUv = vec2(0.0);
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }
  
  if (enableBottom) {
    for (int i = 0; i < 8; ++i) {
      if (i >= bottomLineCount) break;
      float fi = float(i);
      float t = fi / max(float(bottomLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y),
        1.5 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.2;
    }
  }

  if (enableMiddle) {
    for (int i = 0; i < 8; ++i) {
      if (i >= middleLineCount) break;
      float fi = float(i);
      float t = fi / max(float(middleLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y),
        2.0 + 0.15 * fi,
        baseUv,
        mouseUv,
        interactive
      );
    }
  }

  if (enableTop) {
    for (int i = 0; i < 8; ++i) {
      if (i >= topLineCount) break;
      float fi = float(i);
      float t = fi / max(float(topLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = topWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      ruv.x *= -1.0;
      col += lineCol * wave(
        ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y),
        1.0 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.1;
    }
  }

  float centerMask = smoothstep(0.1, 0.6, length(baseUv * vec2(0.5, 1.0)));
  centerMask = mix(0.25, 1.0, centerMask);
  vec3 linesOnly = col - backgroundColor;
  vec3 finalCol = backgroundColor + linesOnly * centerMask;
  fragColor = vec4(finalCol, 1.0);
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`;

function parseColorToVector3(colorStr: string): THREE.Vector3 {
  const trimmed = colorStr.trim();
  if (trimmed.startsWith("rgba") || trimmed.startsWith("rgb")) {
    const match = trimmed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (match) {
      const r = parseInt(match[1], 10) / 255;
      const g = parseInt(match[2], 10) / 255;
      const b = parseInt(match[3], 10) / 255;
      return new THREE.Vector3(r, g, b);
    }
  }
  const color = new THREE.Color(trimmed);
  return new THREE.Vector3(color.r, color.g, color.b);
}

export default function FloatingLines({
  linesGradient,
  enabledWaves = ["top", "middle", "bottom"],
  lineCount = [6],
  lineDistance = [5],
  topWavePosition,
  middleWavePosition,
  bottomWavePosition = { x: 2, y: -0.7, rotate: -1 },
  animationSpeed = 1,
  interactive = true,
  bendRadius = 5,
  bendStrength = -0.5,
  mouseDamping = 0.05,
  parallax = true,
  parallaxStrength = 0.2,
  mixBlendMode = "screen"
}: FloatingLinesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const mouseRef = useRef(new THREE.Vector2(-1000, -1000));
  const targetMouseRef = useRef(new THREE.Vector2(-1000, -1000));
  const hoverRef = useRef(0);
  const bendInfluenceRef = useRef(0);
  const parallaxOffsetRef = useRef(new THREE.Vector2(0, 0));
  const targetParallaxOffsetRef = useRef(new THREE.Vector2(0, 0));

  const getLineCount = (waveType: string) => {
    if (!enabledWaves.includes(waveType as any)) return 0;
    const idx = enabledWaves.indexOf(waveType as any);
    return lineCount[idx] ?? 6;
  };

  const getLineDistance = (waveType: string) => {
    if (!enabledWaves.includes(waveType as any)) return 0.01;
    const idx = enabledWaves.indexOf(waveType as any);
    return (lineDistance[idx] ?? 5) * 0.01;
  };

  const q = getLineCount("top");
  const Q = getLineCount("middle");
  const Z = getLineCount("bottom");

  const dTop = getLineDistance("top");
  const dMiddle = getLineDistance("middle");
  const dBottom = getLineDistance("bottom");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isRunning = true;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    // Color background #0A0A0A (10/255, 10/255, 10/255)
    const backgroundVec = new THREE.Vector3(10 / 255, 10 / 255, 10 / 255);

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3(1, 1, 1) },
      animationSpeed: { value: animationSpeed },
      enableTop: { value: enabledWaves.includes("top") },
      enableMiddle: { value: enabledWaves.includes("middle") },
      enableBottom: { value: enabledWaves.includes("bottom") },
      topLineCount: { value: q },
      middleLineCount: { value: Q },
      bottomLineCount: { value: Z },
      topLineDistance: { value: dTop },
      middleLineDistance: { value: dMiddle },
      bottomLineDistance: { value: dBottom },
      topWavePosition: {
        value: new THREE.Vector3(
          topWavePosition?.x ?? 10,
          topWavePosition?.y ?? 0.5,
          topWavePosition?.rotate ?? -0.4
        )
      },
      middleWavePosition: {
        value: new THREE.Vector3(
          middleWavePosition?.x ?? 5,
          middleWavePosition?.y ?? 0,
          middleWavePosition?.rotate ?? 0.2
        )
      },
      bottomWavePosition: {
        value: new THREE.Vector3(
          bottomWavePosition?.x ?? 2,
          bottomWavePosition?.y ?? -0.7,
          bottomWavePosition?.rotate ?? 0.4
        )
      },
      iMouse: { value: new THREE.Vector2(-1000, -1000) },
      interactive: { value: interactive },
      bendRadius: { value: bendRadius },
      bendStrength: { value: bendStrength },
      bendInfluence: { value: 0 },
      parallax: { value: parallax },
      parallaxStrength: { value: parallaxStrength },
      parallaxOffset: { value: new THREE.Vector2(0, 0) },
      lineGradient: { value: Array.from({ length: 8 }, () => new THREE.Vector3(1, 1, 1)) },
      lineGradientCount: { value: 0 },
      backgroundColor: { value: backgroundVec }
    };

    if (linesGradient && linesGradient.length > 0) {
      const sliced = linesGradient.slice(0, 8);
      uniforms.lineGradientCount.value = sliced.length;
      sliced.forEach((colStr, idx) => {
        const parsed = parseColorToVector3(colStr);
        uniforms.lineGradient.value[idx].copy(parsed);
      });
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();

    const resize = () => {
      if (!isRunning) return;
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      renderer.setSize(width, height, false);
      const canvasWidth = renderer.domElement.width;
      const canvasHeight = renderer.domElement.height;
      uniforms.iResolution.value.set(canvasWidth, canvasHeight, 1);
    };

    resize();

    const resizeObserver = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => { if (isRunning) resize(); })
      : null;
    if (resizeObserver) resizeObserver.observe(container);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const pixelRatio = renderer.getPixelRatio();
      
      mouseRef.current.set(x * pixelRatio, (rect.height - y) * pixelRatio);
      hoverRef.current = 1;

      if (parallax) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const offsetValX = (e.clientX - rect.left - centerX) / rect.width;
        const offsetValY = -(e.clientY - rect.top - centerY) / rect.height;
        targetParallaxOffsetRef.current.set(offsetValX * parallaxStrength, offsetValY * parallaxStrength);
      }
    };

    const handlePointerLeave = () => {
      hoverRef.current = 0;
    };

    if (interactive) {
      window.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerleave", handlePointerLeave);
    }

    let animationFrameId = 0;

    const animate = () => {
      if (!isRunning) return;

      uniforms.iTime.value = clock.getElapsedTime();

      if (interactive) {
        targetMouseRef.current.lerp(mouseRef.current, mouseDamping);
        uniforms.iMouse.value.copy(targetMouseRef.current);
        bendInfluenceRef.current += (hoverRef.current - bendInfluenceRef.current) * mouseDamping;
        uniforms.bendInfluence.value = bendInfluenceRef.current;
      }

      if (parallax) {
        parallaxOffsetRef.current.lerp(targetParallaxOffsetRef.current, mouseDamping);
        uniforms.parallaxOffset.value.copy(parallaxOffsetRef.current);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      if (resizeObserver) resizeObserver.disconnect();
      if (interactive) {
        window.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerleave", handlePointerLeave);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [
    linesGradient,
    enabledWaves,
    lineCount,
    lineDistance,
    topWavePosition,
    middleWavePosition,
    bottomWavePosition,
    animationSpeed,
    interactive,
    bendRadius,
    bendStrength,
    mouseDamping,
    parallax,
    parallaxStrength
  ]);

  return (
    <div
      ref={containerRef}
      className="floating-lines-container w-full h-full"
      style={{ mixBlendMode: mixBlendMode as any }}
    />
  );
}
