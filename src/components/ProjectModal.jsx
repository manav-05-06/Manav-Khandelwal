// ProjectModal.jsx
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectModal({ project, close }) {
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    closeBtnRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, close]);

  if (!project) return null;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        fixed inset-0 bg-black/60 backdrop-blur-md 
        flex items-center justify-center p-4 z-50
      "
      onClick={close}
    >
      <motion.div
        ref={panelRef}
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="
          relative bg-white/10 dark:bg-gray-900/60 
          backdrop-blur-xl border border-white/20 dark:border-white/10
          rounded-2xl p-6 max-w-xl w-full shadow-xl
        "
      >
        {/* Close Button */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={close}
          aria-label="Close project details"
          className="
            absolute top-3 right-4 text-gray-300 
            hover:text-white text-xl
            focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded
          "
        >
          ✕
        </button>

        {/* Project Image */}
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="rounded-xl w-full mb-4 shadow-md"
        />

        {/* Title */}
        <h2 id="project-modal-title" className="text-2xl font-bold text-white mb-4">
          {project.title}
        </h2>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.stack.map((tech, i) => (
            <span
              key={i}
              className="
                px-3 py-1 rounded-full bg-blue-500/20 
                border border-blue-400/40 text-blue-300 text-sm
              "
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* Repo + Live Links */}
        <div className="flex gap-6 text-lg">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            >
              <FaGithub aria-hidden /> GitHub
            </a>
          )}

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-purple-400 hover:text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
            >
              <FaExternalLinkAlt aria-hidden /> Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
