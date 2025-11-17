// Skills.jsx

import {
  FaReact,
  FaNode,
  FaCss3Alt,
  FaJava,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";

import {
  SiJavascript,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiVercel,
  SiFramer,
  SiPostman
} from "react-icons/si";

import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
      { name: "React.js", icon: <FaReact className="text-blue-400" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
      { name: "Framer Motion", icon: <SiFramer className="text-pink-400" /> },
      { name: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
    ],
  },

  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: <FaNode className="text-green-500" /> },
      { name: "Express.js", icon: <SiExpress className="text-gray-300" /> },
      { name: "REST API", icon: <span className="text-indigo-400 text-xl">🔗</span> },
      { name: "Firebase", icon: <SiFirebase className="text-yellow-500" /> },
    ],
  },

  {
    title: "Databases",
    skills: [
      { name: "MongoDB", icon: <SiMongodb className="text-green-400" /> },
      { name: "MySQL", icon: <SiMysql className="text-blue-300" /> },
    ],
  },

  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git", icon: <FaGitAlt className="text-orange-500" /> },
      { name: "GitHub", icon: <FaGithub className="text-white" /> },
      { name: "Vercel", icon: <SiVercel className="text-white" /> },
      { name: "Postman", icon: <SiPostman className="text-orange-400" /> },
    ],
  },

  {
    title: "Languages",
    skills: [
      { name: "Java", icon: <FaJava className="text-orange-500" /> },
    ],
  },
];

function Skills() {
  return (
    <section
      id="skills"
      className="font-mono max-w-6xl mx-auto mt-24 px-6 py-12"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, x: -25 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="
          text-4xl md:text-5xl font-bold mb-12 
          text-gray-900 dark:text-gray-100
          relative inline-block
        "
      >
        Skills & Tools

        {/* Underline */}
        <span className="absolute left-0 -bottom-3 w-36 h-[3px] rounded-full 
          bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500"></span>
      </motion.h2>

      {/* Category Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {/* Category Title */}
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {category.title}
            </h3>

            {/* Skills List */}
            <div className="flex flex-wrap gap-5">
              {category.skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  whileHover={{ scale: 1.12, rotate: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="
                    relative flex items-center gap-3 px-6 py-3
                    rounded-full cursor-default

                    bg-white/10 dark:bg-white/5 backdrop-blur-xl
                    border border-white/20 dark:border-white/10 
                    shadow-md dark:shadow-gray-900/20
                    
                    text-gray-900 dark:text-gray-100 
                    
                    hover:border-indigo-400 transition-all duration-300
                  "
                >
                  {/* Glow Ring */}
                  <div className="
                    absolute inset-0 rounded-full 
                    bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 
                    opacity-0 hover:opacity-100 blur-xl 
                    transition-all duration-500
                  "></div>

                  {/* Icon */}
                  <span className="text-2xl relative z-10">{skill.icon}</span>

                  {/* Skill Name */}
                  <span className="text-base font-semibold relative z-10">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
