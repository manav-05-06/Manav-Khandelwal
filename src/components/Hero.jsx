import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useEffect, useState } from "react";

function Hero() {
  const roles = [
    "Software Developer",
    "Frontend Engineer",
    "Full-Stack Developer",
  ];

  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentText(
        !reverse
          ? roles[index].substring(0, subIndex + 1)
          : roles[index].substring(0, subIndex - 1)
      );

      if (!reverse && subIndex + 1 === roles[index].length) {
        setTimeout(() => setReverse(true), 600);
      } else if (reverse && subIndex - 1 === 0) {
        setReverse(false);
        setIndex((prev) => (prev + 1) % roles.length);
      }

      setSubIndex((prev) => (reverse ? prev - 1 : prev + 1));
    }, reverse ? 60 : 120);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden"
    >
      {/* Background Blurs */}
      <div className="absolute w-[450px] h-[450px] bg-indigo-400/20 blur-[140px] rounded-full top-20 left-1/4" />
      <div className="absolute w-[450px] h-[450px] bg-violet-500/20 blur-[140px] rounded-full bottom-20 right-1/4" />

      {/* ===================== REVEAL: NAME ===================== */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100"
      >
        Manav Khandelwal
      </motion.h1>

      {/* Underline */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "140px", opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="h-[3px] rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 mt-3 mb-6"
      />

      {/* ===================== REVEAL: ROLES ===================== */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 h-10"
      >
        {currentText}
        <span className="border-r-2 border-indigo-500 animate-pulse ml-1" />
      </motion.p>

      {/* ===================== REVEAL: BUTTONS ===================== */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="flex flex-wrap gap-4 mt-10 justify-center"
      >
        {/* View My Work */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          onClick={() => (window.location.href = "#projects")}
          className="
            px-7 py-3 rounded-xl font-medium
            bg-gray-900 text-white dark:bg-white dark:text-black
            transition-all duration-300 relative overflow-hidden
            shadow-sm hover:shadow-md group
          "
        >
          <span className="relative z-10">View My Work</span>
          <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white dark:bg-black scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
        </motion.button>

        {/* Contact */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          onClick={() => (window.location.href = "#contact")}
          className="
            px-7 py-3 rounded-xl font-medium
            border border-gray-600 dark:border-gray-400
            text-gray-800 dark:text-gray-200
            hover:bg-gray-100 dark:hover:bg-gray-800
            transition-all duration-300 shadow-sm hover:shadow-md
            relative overflow-hidden group
          "
        >
          <span className="relative z-10">Contact Me</span>
          <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gray-400 dark:bg-gray-300 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
        </motion.button>

        {/* Resume */}
        <motion.a
          whileHover={{ scale: 1.08 }}
          href="/Manav.pdf"
          target="_blank"
          className="
            px-7 py-3 rounded-xl font-medium
            bg-gray-100 dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            border border-gray-300 dark:border-gray-700
            hover:bg-gray-200 dark:hover:bg-gray-700
            transition-all duration-300 shadow-sm hover:shadow-md
            relative overflow-hidden group
          "
        >
          <span className="relative z-10">Resume</span>
          <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gray-500 dark:bg-gray-300 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
        </motion.a>
      </motion.div>

      {/* ===================== REVEAL: SOCIAL ICONS ===================== */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="flex gap-6 text-3xl mt-12"
      >
        {[
          { Icon: FaGithub, href: "https://github.com/manav-05-06" },
          { Icon: FaLinkedin, href: "https://www.linkedin.com/in/manav178892250/" },
          { Icon: FaEnvelope, href: "mailto:manavkhandelwal72@gmail.com" },
        ].map(({ Icon, href }, idx) => (
          <motion.a
            whileHover={{ scale: 1.18 }}
            key={idx}
            href={href}
            target="_blank"
            className="
              p-3 rounded-full
              bg-white/10 dark:bg-white/10
              backdrop-blur-lg
              hover:bg-white/20 transition-all
              text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400
            "
          >
            <Icon />
          </motion.a>
        ))}
      </motion.div>

      {/* ===================== REVEAL: DOWN ARROW ===================== */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.45 }}
        animate={{ y: [0, 10, 0] }}
        className="mt-20 text-gray-500 dark:text-gray-400"
      >
        <span className="text-3xl">↓</span>
      </motion.div>
    </section>
  );
}

export default Hero;
