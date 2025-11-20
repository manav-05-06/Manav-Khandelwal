import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollSpy from "./components/ScrollSpy";
import AnimatedCursor from "./components/AnimatedCursor";
import ScrollProgressNav from "./components/ScrollProgressNav";

import "./index.css"

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // ⭐ Scroll-based grid movement
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY * 0.35;
      document.body.style.setProperty("--scroll-offset", `${offset}px`);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ⭐ Page scroll progress bar
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleProgress = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      setScrollProgress((window.scrollY / totalHeight) * 100);
    };

    window.addEventListener("scroll", handleProgress);
    return () => window.removeEventListener("scroll", handleProgress);
  }, []);

  return (
    <div className="font-serif">
    <div className="min-h-screen font-serif text-gray-900 dark:text-gray-100 transition-colors duration-300">

      {/* ⭐ Vertical Scroll Progress Bar */}
      <div
        className="fixed right-5 top-1/2 -translate-y-1/2 w-1 rounded-full 
        bg-gray-400/20 dark:bg-white/10 h-[60vh] overflow-hidden z-[999]"
      >
        <div
          style={{ height: `${scrollProgress}%` }}
          className="w-full bg-gradient-to-b from-blue-500 via-indigo-500 to-violet-500 
          transition-all duration-200"
        ></div>
      </div>
      
     

      <ScrollSpy/>
      {/* ⭐ Navbar */}
      <Navbar dark={darkMode} setDark={setDarkMode} />

      {/* ⭐ Main Sections */}
      <main>
        <Hero  />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* ⭐ Footer */}
      <Footer />
    </div>
    </div>
  );
}

export default App;
