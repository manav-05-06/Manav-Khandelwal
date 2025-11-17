import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = () => setMobileOpen((prev) => !prev);

  return (
    <>
      {/* -------------------- DESKTOP + TABLET NAV -------------------- */}
      <motion.nav
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{
          width: hovered ? "450px" : "150px",
          paddingLeft: hovered ? "24px" : "20px",
          paddingRight: hovered ? "24px" : "20px",
          boxShadow: hovered
            ? "0 12px 30px rgba(150,150,255,0.25)"
            : "0 6px 18px rgba(0,0,0,0.15)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="
          hidden sm:flex
          fixed top-6 left-1/2 -translate-x-1/2 z-50
          h-14 items-center gap-5
          rounded-full
          backdrop-blur-xl
          bg-white/60 dark:bg-white/10
          border border-white/40 dark:border-white/10
          shadow-[0_8px_30px_rgba(0,0,0,0.15)]
          relative
        "
      >
        

        {/* Name */}
        <p className="font-semibold text-gray-900 dark:text-gray-100 z-10">
          Manav
        </p>

        {/* Expanded Links */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-7 ml-4 z-10"
          >
            {["Projects", "Skills", "About"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-gray-900 dark:text-gray-200 hover:text-indigo-400 transition"
              >
                {link}
              </a>
            ))}

            <a
              href="#contact"
              className="
                px-4 py-1 rounded-full
                bg-white/30 dark:bg-white/10
                border border-white/40 dark:border-white/20
                shadow-md
                hover:bg-white/50 dark:hover:bg-white/20
                transition
              "
            >
              Contact
            </a>
          </motion.div>
        )}

        {/* Three Dots */}
        {!hovered && (
          <div className="flex gap-1 ml-auto mr-1 z-10">
            <span className="dot w-2 h-2 rounded-full bg-gray-600 dark:bg-gray-300 shadow-[0_0_6px_rgba(100,100,255,0.5)]" />
            <span className="dot w-2 h-2 rounded-full bg-gray-600 dark:bg-gray-300 shadow-[0_0_6px_rgba(100,100,255,0.5)]" />
            <span className="dot w-2 h-2 rounded-full bg-gray-600 dark:bg-gray-300 shadow-[0_0_6px_rgba(100,100,255,0.5)]" />
          </div>
        )}
      </motion.nav>

      {/* -------------------- MOBILE NAV -------------------- */}
      {!mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            sm:hidden fixed top-6 left-1/2 -translate-x-1/2 z-50
            flex items-center gap-3
            px-4 py-2
            w-[180px]
            rounded-full
            bg-white/40 dark:bg-white/10
            backdrop-blur-2xl
            border border-white/40 dark:border-white/10
            shadow-[0_8px_30px_rgba(0,0,0,0.2)]
            relative
          "
        >
          {/* Glow */}
          <div className="
            absolute inset-0 rounded-full
            bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10
            blur-xl pointer-events-none
          " />

          {/* Name */}
          <p className="font-semibold text-gray-900 dark:text-gray-100 z-10">
            Manav
          </p>

          {/* 3 Dots */}
          <button onClick={toggleMenu} className="flex gap-1 ml-auto z-10">
            <span className="w-2 h-2 rounded-full bg-gray-700 dark:bg-gray-300 shadow-[0_0_6px_rgba(100,100,255,0.5)]" />
            <span className="w-2 h-2 rounded-full bg-gray-700 dark:bg-gray-300 shadow-[0_0_6px_rgba(100,100,255,0.5)]" />
            <span className="w-2 h-2 rounded-full bg-gray-700 dark:bg-gray-300 shadow-[0_0_6px_rgba(100,100,255,0.5)]" />
          </button>
        </motion.div>
      )}

      {/* -------------------- MOBILE EXPANDED -------------------- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="
              sm:hidden fixed top-6 left-1/2 -translate-x-1/2 z-50
              w-72
              rounded-3xl
              bg-white/70 dark:bg-white/10
              backdrop-blur-3xl
              shadow-[0_12px_40px_rgba(0,0,0,0.25)]
              border border-white/50 dark:border-white/10
              overflow-hidden pb-6 relative
            "
          >
            {/* Glow */}
            <div className="
              absolute inset-0 rounded-3xl 
              bg-gradient-to-b from-blue-400/10 via-purple-400/10 to-pink-400/10 
              blur-xl pointer-events-none
            " />

            {/* Header */}
            <div className="flex justify-between items-center px-4 pt-4 pb-3 relative z-10">

              {/* Name only (removed avatar) */}
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                Manav
              </p>

              {/* Close Button */}
              <button onClick={toggleMenu}>
                <span className="text-2xl text-gray-900 dark:text-gray-200">
                  ×
                </span>
              </button>
            </div>

            {/* Menu Items */}
            <div className="px-4 mt-2 space-y-5 text-gray-800 dark:text-gray-200 relative z-10">
              <a href="#projects" onClick={toggleMenu} className="text-lg block">
                Projects
              </a>
              <a href="#skills" onClick={toggleMenu} className="text-lg block">
                Skills
              </a>
              <a href="#about" onClick={toggleMenu} className="text-lg block">
                About
              </a>
            </div>

            {/* Contact Button */}
            <div className="px-4 mt-7 relative z-10">
              <a
                href="#contact"
                onClick={toggleMenu}
                className="
                  block w-full py-3 text-center font-medium
                  rounded-full
                  bg-white/80 dark:bg-white/20
                  text-gray-900 dark:text-gray-100
                  border border-white/50 dark:border-white/10
                  shadow-[0_6px_20px_rgba(120,120,255,0.25)]
                "
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar; 
