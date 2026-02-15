import { useEffect, useState } from "react";

export default function AnimatedCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateVisibility = () => {
      setVisible(finePointer.matches && !reducedMotion.matches);
    };

    updateVisibility();
    finePointer.addEventListener("change", updateVisibility);
    reducedMotion.addEventListener("change", updateVisibility);

    return () => {
      finePointer.removeEventListener("change", updateVisibility);
      reducedMotion.removeEventListener("change", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Outer Glow (soft white glow) */}
      <div
        className="
          fixed pointer-events-none z-[9999]
          w-12 h-12 rounded-full 
          bg-gradient-to-r from-white/30 to-white/10
          blur-2xl opacity-70
          transition-transform duration-200
        "
        style={{
          transform: `translate(${pos.x - 24}px, ${pos.y - 24}px)`,
        }}
      />

      {/* Inner Dot */}
      <div
        className="
          fixed pointer-events-none z-[9999]
          w-3 h-3 rounded-full
          bg-white
          shadow-[0_0_10px_rgba(255,255,255,0.8)]
        "
        style={{
          transform: `translate(${pos.x - 6}px, ${pos.y - 6}px)`,
        }}
      />
    </>
  );
}
