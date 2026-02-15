import { useState, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import projectsData from "../data/projects";
import { motion } from "framer-motion";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", "React", "JavaScript", "Game", "AI"];

  const filteredProjects = useMemo(() => {
    return filter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section
      id="projects"
      className="font-mono max-w-6xl mx-auto px-4 mt-24"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, x: -25 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="
          text-4xl md:text-5xl font-bold mb-14
          text-gray-900 dark:text-gray-100
          relative inline-block
        "
      >
        Projects
        <span className="absolute left-0 -bottom-3 w-28 h-[3px] rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
      </motion.h2>

      {/* Category Filters */}
      <div className="flex gap-4 flex-wrap mb-14">
        {categories.map((cat) => {
          const active = filter === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full border text-sm font-semibold transition-all
                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900
                ${
                  active
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-400/30"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-blue-200 dark:hover:bg-gray-700"
                }
              `}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 place-items-center"
      >
        {filteredProjects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            openModal={setSelectedProject}
            index={idx}
          />
        ))}
      </motion.div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        close={() => setSelectedProject(null)}
      />
    </section>
  );
}
