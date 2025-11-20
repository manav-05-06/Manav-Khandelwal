import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef(null);

  // Parallax effect for huge background text
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [180, 0]);
  const opacityText = useTransform(scrollYProgress, [0, 1], [0.05, 0.12]);

  return (
    <footer
      ref={ref}
      className="
        w-full relative overflow-hidden
        pt-32 pb-24 px-6
        bg-transparent text-white
      "
    >
      {/* Noise Texture */}
      <div className="
        absolute inset-0 pointer-events-none opacity-[0.04]
        bg-[url('https://grainy-gradients.vercel.app/noise.svg')]
      " />

      {/* Grid Pattern */}
      <div className="
        absolute inset-0 opacity-[0.025] pointer-events-none
        bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),
        linear-gradient(180deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
        bg-[size:42px_42px]
      " />

      {/* Soft Glow */}
      <div className="
        absolute bottom-0 left-1/2 -translate-x-1/2
        w-[550px] h-[350px]
        bg-white/10 blur-[140px] rounded-full
        pointer-events-none
      " />

      {/* HUGE BACKGROUND NAME */}
      <motion.h1
        style={{ y: yText, opacity: opacityText }}
        className="
          absolute bottom-[-160px] left-1/2 -translate-x-1/2
          text-[150px] md:text-[230px] lg:text-[300px]
          font-extrabold select-none whitespace-nowrap
          tracking-tighter text-white/10
          leading-none pointer-events-none
        "
      >
        MANAV
      </motion.h1>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight">
            Let's create
          </h1>

          <h2 className="text-3xl md:text-5xl font-light text-gray-300 mt-2 tracking-tight">
            incredible work together.
          </h2>

          <p className="mt-6 text-white/80 max-w-lg leading-relaxed">
            I’m open for freelance work and full-time opportunities.
            Let’s build something meaningful.
          </p>

          <div className="flex justify-center md:justify-start my-10">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </motion.div>

        {/* CONTACT BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="
            flex flex-col md:flex-row justify-between
            items-start md:items-center gap-10
            mt-4
          "
        >
          {/* Email */}
          <div>
            <p className="uppercase text-xs tracking-wide text-gray-400">
              Email
            </p>
            <p className="mt-1 text-lg font-medium text-white">
              manavkhandelwal72@gmail.com
            </p>
          </div>

          {/* Socials */}
          <div>
            <p className="uppercase text-xs tracking-wide mb-3 text-gray-400">
              Socials
            </p>

            <div className="flex gap-3">
              {[
                { Icon: FaLinkedin, link: "https://www.linkedin.com/in/manav178892250/" },
                { Icon: FaGithub, link: "https://github.com/manav-05-06" },
                { Icon: FaEnvelope, link: "mailto:manavkhandelwal72@gmail.com" },
              ].map(({ Icon, link }, i) => (
                <motion.a
                  key={i}
                  href={link}
                  whileHover={{ scale: 1.12 }}
                  target="_blank"
                  className="
                    w-10 h-10 rounded-full flex items-center justify-center
                    bg-white/90 dark:bg-white/80 text-black
                    shadow-sm hover:shadow-md
                    hover:bg-white transition-all duration-300
                    backdrop-blur-md
                  "
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="my-12 border-t border-white/20" />

        {/* Bottom Links + Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="
            flex flex-col md:flex-row justify-between
            items-start md:items-center gap-8
          "
        >
          {/* Footer Navigation */}
          <div className="flex gap-6 text-sm text-white/80">
            {["Home", "Projects", "Skills", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="
                  relative transition-all hover:text-white
                  after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:w-0 after:bg-white
                  after:transition-all hover:after:w-full
                "
              >
                {item}
              </a>
            ))}
          </div>

          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Manav Khandelwal
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
