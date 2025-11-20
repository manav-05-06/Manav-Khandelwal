import { useEffect, useState } from "react";

const sections = ["hero", "about", "skills", "projects", "contact"];

export default function ScrollSpy() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      let current = "hero";

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const threshold = window.innerHeight * 0.35;

        if (rect.top <= threshold) {
          current = id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="
      fixed left-6 top-1/2 -translate-y-1/2 
      flex flex-col gap-5 
      z-[999]
      pointer-events-none sm:pointer-events-auto
    ">
      {sections.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className="group flex flex-col items-center cursor-pointer pointer-events-auto"
        >
          {/* Dot */}
          <div
            className={`
              w-3.5 h-3.5 rounded-full transition-all duration-300
              relative
              ${active === id
                ? `
                  bg-white 
                  shadow-[0_0_12px_rgba(255,255,255,0.8)]
                  scale-125
                `
                : `
                  bg-white/20 dark:bg-white/10
                  shadow-[0_0_4px_rgba(255,255,255,0.2)]
                `
              }
            `}
          >
            {/* subtle hover ring */}
            <div
              className="
                absolute inset-0 rounded-full
                transition-all duration-300 opacity-0
                group-hover:opacity-40
                bg-white/20 blur-md
              "
            />
          </div>

          {/* Label */}
          <span className="
            opacity-0 group-hover:opacity-100
            text-xs mt-1 text-gray-700 dark:text-gray-300 
            transition-all duration-300 
            font-medium tracking-wide
            select-none
          ">
            {id}
          </span>
        </a>
      ))}
    </div>
  );
}
