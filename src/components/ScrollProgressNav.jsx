import { useEffect, useState } from "react";

export default function AnimatedCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* Outer Glow */}
      <div
        className="fixed pointer-events-none z-[9999] w-12 h-12 
        rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 
        blur-xl transition-transform duration-200"
        style={{
          transform: `translate(${pos.x - 24}px, ${pos.y - 24}px)`,
        }}
      />

      {/* Inner Dot */}
      <div
        className="fixed pointer-events-none z-[9999] w-3 h-3 
        rounded-full bg-indigo-400"
        style={{
          transform: `translate(${pos.x - 6}px, ${pos.y - 6}px)`,
        }}
      />
    </>
  );
}
