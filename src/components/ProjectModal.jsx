// ProjectModal.jsx
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectModal({ project, close }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        fixed inset-0 bg-black/60 backdrop-blur-md 
        flex items-center justify-center p-4 z-50
      "
      onClick={close}
    >
      <motion.div
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
          onClick={close}
          className="
            absolute top-3 right-4 text-gray-300 
            hover:text-white text-xl
          "
        >
          ✕
        </button>

        {/* Project Image */}
        <img
          src={project.image}
          alt={project.title}
          className="rounded-xl w-full mb-4 shadow-md"
        />

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-4">
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
              className="flex items-center gap-2 text-blue-400 hover:text-blue-200"
            >
              <FaGithub /> GitHub
            </a>
          )}

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              className="flex items-center gap-2 text-purple-400 hover:text-purple-200"
            >
              <FaExternalLinkAlt /> Live Demo
            </a>
          )}
        </div>

      </motion.div>
    </motion.div>
  );
}
