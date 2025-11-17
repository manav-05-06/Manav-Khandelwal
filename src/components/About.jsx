import { motion } from "framer-motion";

function About() {
  return (
    <section
      id="about"
      className="font-mono max-w-6xl mx-auto px-6 py-24 text-gray-700 dark:text-gray-300"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="
          text-4xl md:text-5xl font-bold mb-8 
          text-gray-900 dark:text-gray-100
          relative inline-block
        "
      >
        About Me

        {/* animated underline */}
        <span className="absolute left-0 -bottom-2 w-32 h-[3px] rounded-full 
          bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
      </motion.h2>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="space-y-6 text-lg md:text-xl leading-relaxed"
      >
        <p>
          Hey, I'm{" "}
          <span className="text-indigo-400 font-semibold">
            Manav Khandelwal
          </span>
          , 4th-year B.Tech CSE student of JECRC University with a deep passion
          for building clean, modern, and highly interactive web experiences.  
          I love turning ideas into polished digital products that feel smooth,
          intuitive, and visually appealing.
        </p>

        <p>
          I work confidently across the full stack, but I especially enjoy
          frontend engineering and UI-focused development. My preferred tools
          include{" "}
          <span className="text-blue-400 font-medium">React.js</span>,{" "}
          <span className="text-green-400 font-medium">Node.js</span>,{" "}
          <span className="text-yellow-400 font-medium">Express.js</span>,{" "}
          <span className="text-cyan-400 font-medium">Tailwind CSS</span>, and{" "}
          <span className="text-gray-100 font-medium">JavaScript</span>.  
          Whether it’s dynamic interfaces, API development, or performance
          optimization — I enjoy creating solutions that scale and look great.
        </p>

        <p>
          I deploy most of my projects on{" "}
          <span className="text-pink-400 font-medium">Vercel</span> and{" "}
          <span className="text-gray-200 font-medium">GitHub Pages</span>,  
          ensuring fast load times and a seamless user experience.  
          I'm always exploring new technologies, improving my skills, and
          building things that genuinely help people.
        </p>
      </motion.div>
    </section>
  );
}

export default About;
