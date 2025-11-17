import { useEffect, useState } from "react";

const sections = ["hero", "about", "skills", "projects", "contact"];

export default function ScrollSpy() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      let current = "hero";

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;

          if (top <= window.innerHeight / 2) {
            current = id;
          }
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[999]">
      {sections.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className="group flex flex-col items-center cursor-pointer"
        >
          <div
            className={`
              w-3 h-3 rounded-full transition-all duration-300 
              ${active === id 
                ? "bg-gradient-to-b from-blue-500 via-indigo-500 to-violet-500 scale-125 shadow-lg shadow-indigo-500/40" 
                : "bg-gray-400/40 dark:bg-gray-600/40"
              }
            `}
          ></div>

          {/* Hover Name Label */}
          <span className="opacity-0 group-hover:opacity-100 
            text-xs text-gray-700 dark:text-gray-300 
            mt-1 transition-all">
            {id}
          </span>
        </a>
      ))}
    </div>
  );
}
