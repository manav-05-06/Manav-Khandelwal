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
      {/* Background blur blobs */}
      <div className="absolute w-[450px] h-[450px] bg-indigo-400/20 blur-[140px] rounded-full top-20 left-1/4" />
      <div className="absolute w-[450px] h-[450px] bg-violet-500/20 blur-[140px] rounded-full bottom-20 right-1/4" />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="
          text-5xl md:text-7xl font-extrabold tracking-tight
          text-gray-900 dark:text-gray-100
        "
      >
        Manav Khandelwal
      </motion.h1>

      {/* Underline */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "140px" }}
        transition={{ duration: 0.8 }}
        className="h-[3px] rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 mt-3 mb-6"
      />

      {/* Typing animation */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 h-10"
      >
        {currentText}
        <span className="border-r-2 border-indigo-500 animate-pulse ml-1" />
      </motion.p>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-10 justify-center">
        {/* View My Work */}
        <motion.a
          whileHover={{ scale: 1.07 }}
          href="#projects"
          className="
            px-7 py-3 rounded-xl font-semibold 
            bg-indigo-600 text-white 
            hover:bg-indigo-700 transition-all shadow-lg
          "
        >
          View My Work
        </motion.a>

        {/* Contact */}
        <motion.a
          whileHover={{ scale: 1.07 }}
          href="#contact"
          className="
            px-7 py-3 rounded-xl font-semibold border
            border-gray-400 dark:border-gray-600
            bg-white/20 dark:bg-black/20 backdrop-blur-md
            hover:bg-white/30 dark:hover:bg-gray-900/40 
            transition-all
          "
        >
          Contact Me
        </motion.a>

        {/* ⭐ Resume Button */}
        <motion.a
          whileHover={{ scale: 1.07 }}
          href="/Manav_khandelwal.pdf"
          target="_blank"
          className="
            px-7 py-3 rounded-xl font-semibold 
            bg-gradient-to-r from-purple-500 to-indigo-500 
            text-white shadow-lg
            hover:from-purple-600 hover:to-indigo-600 
            transition-all
          "
        >
          Resume
        </motion.a>
      </div>

      {/* Social Icons */}
      <div className="flex gap-6 text-3xl mt-12">
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
      </div>

      {/* Down Arrow */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-20 text-gray-500 dark:text-gray-400"
      >
        <span className="text-3xl">↓</span>
      </motion.div>
    </section>
  );
}

export default Hero;
