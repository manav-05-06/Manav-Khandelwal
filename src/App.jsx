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

import "./index.css";

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

  return (
    <div className="min-h-screen font-sans text-foreground antialiased">

      <AnimatedCursor />
      <ScrollSpy />

      {/* ⭐ Navbar */}
      <Navbar />

      {/* ⭐ Main Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* ⭐ Footer */}
      <Footer />
    </div>
  );
}

export default App;
