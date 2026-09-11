import { useEffect, useRef, useState } from "react";
import "./Reveal.css";

function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up", // 'up' | 'down' | 'left' | 'right' | 'none'
  threshold = 0.15,
  triggerOnce = true,
  style = {},
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(node);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [threshold, triggerOnce]);

  return (
    <div
      ref={ref}
      className={`reveal-box reveal-direction-${direction} ${
        isVisible ? "reveal-active" : ""
      } ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default Reveal;
