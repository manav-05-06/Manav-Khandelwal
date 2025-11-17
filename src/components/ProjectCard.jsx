// ProjectCard.jsx
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProjectCard({ project, openModal, index }) {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  // Scroll Parallax Effect
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 600], [0, index * -10]);

  return (
    <motion.div style={{ y: parallax }}>
      <motion.div
        className="
          group relative p-5 rounded-2xl cursor-pointer overflow-hidden
          bg-white/10 dark:bg-white/5 backdrop-blur-xl
          border border-white/10 dark:border-white/5
          shadow-lg hover:shadow-xl transition-all duration-300
          flex flex-col h-full
        "
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setCursor({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }}
        onMouseLeave={() => setCursor({ x: 0, y: 0 })}
        onClick={() => openModal(project)}
      >
        {/* Spotlight Cursor */}
        <div
          className="
            absolute pointer-events-none w-40 h-40 rounded-full 
            bg-white/10 blur-xl opacity-0 group-hover:opacity-100 
            transition duration-300
          "
          style={{
            left: cursor.x - 80,
            top: cursor.y - 80,
          }}
        />

        {/* Animated Border */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 rounded-2xl border border-white/20"
        />

        {/* Project Image */}
        <motion.img
          src={project.image}
          alt={project.title}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05, y: -3 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl w-full h-40 object-cover mb-4 shadow-md"
        />

        {/* Title + Stack + Description */}
        <div className="flex flex-col flex-grow">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 leading-tight">
            {project.title}
          </h3>

          <p className="text-sm text-blue-500 dark:text-blue-300 mb-3 font-medium">
            {project.stack.join(" / ")}
          </p>

          <p className="text-gray-700 dark:text-gray-300 line-clamp-3 flex-grow">
            {project.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
