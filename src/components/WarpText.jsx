import { useEffect, useRef } from "react";
import "./WarpText.css";

function WarpText({
  text = "HYBRIMOTO",
  color = "#ffffff",
  warpStrength = 0.06,
  warpScale = 1.0,
  speed = 0.5,
  pointerInfluence = 0.35,
  pointerStrength = 0.3,
  refraction = 0,
  ripple = false,
  fontSize,
  fontWeight = 800,
  fontFamily = "var(--hmi-font-heading), sans-serif",
  letterSpacing,
  lineHeight,
  className = "",
  style = {},
}) {
  const textRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const handleMouseMove = (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      mouseRef.current = { x, y };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: 0, y: 0 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    const animate = () => {
      time += 0.016 * speed;
      const { x, y } = mouseRef.current;

      const rotateX = y * pointerStrength * 12;
      const rotateY = x * pointerStrength * -12;
      const translateX = Math.sin(time) * warpStrength * 10 + x * pointerInfluence * 15;
      const translateY = Math.cos(time * 0.8) * warpStrength * 8 + y * pointerInfluence * 10;
      const scale = (1 + Math.sin(time * 1.2) * warpStrength * 0.02) * warpScale;

      element.style.transform = `
        perspective(1000px)
        translate3d(${translateX}px, ${translateY}px, 0)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(${scale})
      `;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [warpStrength, warpScale, speed, pointerInfluence, pointerStrength, refraction]);

  const formattedFontSize = fontSize
    ? typeof fontSize === "number"
      ? `clamp(26px, 7.8vw, ${Math.min(fontSize, 115)}px)`
      : fontSize
    : undefined;

  const formattedLetterSpacing = letterSpacing !== undefined
    ? typeof letterSpacing === "number"
      ? `${letterSpacing}em`
      : letterSpacing
    : undefined;

  return (
    <div
      ref={textRef}
      className={`warp-text-container ${ripple ? "warp-text-ripple" : ""} ${className}`}
      style={{
        color,
        fontFamily,
        ...style,
      }}
    >
      <span
        className="warp-text-content"
        style={{
          color,
          fontWeight,
          fontFamily,
          ...(formattedFontSize ? { fontSize: formattedFontSize } : {}),
          ...(formattedLetterSpacing ? { letterSpacing: formattedLetterSpacing } : {}),
          ...(lineHeight ? { lineHeight } : {}),
        }}
      >
        {text}
      </span>
    </div>
  );
}

export default WarpText;