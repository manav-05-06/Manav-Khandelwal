import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";

export default function ProjectModal({ project, close }) {
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    closeBtnRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") close();
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

  const hasLive = project.live || project.repo;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-black"
    >
      {/* Full-screen: iframe when live URL exists, else placeholder */}
      {hasLive ? (
        <iframe
          src={project.live || project.repo}
          title={`${project.title} — full screen`}
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 p-8">
          <div className="max-w-2xl text-center text-gray-300">
            <img src={project.image} alt="" className="mx-auto rounded-xl shadow-xl mb-6 max-h-80 object-cover" />
            <h2 className="text-2xl font-bold text-white mb-2">{project.title}</h2>
            <p className="mb-4">{project.description}</p>
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                View on GitHub
              </a>
            )}
          </div>
        </div>
      )}

      {/* Top bar: close + title + links */}
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between gap-4 bg-black/80 backdrop-blur-md px-4 py-3 border-b border-white/10"
      >
        <h2 id="project-modal-title" className="text-white font-semibold truncate">
          {project.title}
        </h2>
        <div className="flex items-center gap-2 shrink-0">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20 transition-colors"
            >
              <FaGithub size={16} /> GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-indigo-500/80 px-3 py-2 text-sm text-white hover:bg-indigo-500 transition-colors"
            >
              <FaExternalLinkAlt size={14} /> Open in new tab
            </a>
          )}
          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            aria-label="Close"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <FaTimes size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
