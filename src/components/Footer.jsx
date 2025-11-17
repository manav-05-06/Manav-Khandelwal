import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef(null);

  // Parallax tracking for big name
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  // Parallax: moves upward as user scrolls
  const yText = useTransform(scrollYProgress, [0, 1], [140, 0]);
  const opacityText = useTransform(scrollYProgress, [0, 1], [0.08, 0.18]);

  return (
    <footer
      ref={ref}
      className="
        w-full relative overflow-hidden
        text-white/80 pt-24 pb-24 px-6
        bg-transparent
      "
    >
      {/* ---------------- Noise texture ---------------- */}
      <div className="
        absolute inset-0 opacity-[0.05] pointer-events-none
        bg-[url('https://grainy-gradients.vercel.app/noise.svg')]
      "></div>

      {/* ---------------- Subtle grid ---------------- */}
      <div className="
        absolute inset-0 opacity-[0.03] pointer-events-none
        bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),
        linear-gradient(180deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
        bg-[size:45px_45px]
      "></div>

      {/* ---------------- Glow spot behind big name ---------------- */}
      <div className="
        absolute bottom-0 left-1/2 -translate-x-1/2
        w-[500px] h-[350px]
        bg-white/10 blur-[120px] rounded-full
        pointer-events-none
      "></div>

      {/* ---------------- BIG PARALLAX NAME ---------------- */}
      <motion.h1
        style={{ y: yText, opacity: opacityText }}
        className="
          absolute bottom-[-150px] left-1/2 -translate-x-1/2
          text-[150px] md:text-[230px] lg:text-[300px]
          font-extrabold tracking-tight pointer-events-none
          text-white/10 select-none whitespace-nowrap
          leading-none 
          drop-shadow-[0_0_40px_rgba(255,255,255,0.05)]
        "
      >
        MANAV
      </motion.h1>

      {/* ---------------- CONTENT WRAPPER ---------------- */}
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ---------------- Headings ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight">
            Lets create
          </h1>
          <h2 className="text-3xl md:text-5xl font-light text-gray-400 mt-2 tracking-tight">
            incredible work together.
          </h2>
          <br></br>
          <p className="">I'M CURRENTLY AVAILABLE FOR FREELANCE PROJECTS AND FULL-TIME OPPORTUNITIES.</p>


          <div className="w-full flex justify-center my-8">
            <div className="w-3 h-3 rounded-full bg-white"></div>
          </div>
        </motion.div>

        {/* ---------------- Email + Socials ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="
            flex flex-col md:flex-row justify-between
            items-start md:items-center gap-10 mt-10
          "
        >

          {/* Email */}
          <div>
            <p className="uppercase text-xs tracking-wide text-gray-400">
              Email
            </p>
            <p className="mt-1 text-lg font-medium text-white break-all">
              manavkhandelwal72@gmail.com
            </p>
          </div>

          {/* Social icons */}
          <div>
            <p className="uppercase text-xs tracking-wide mb-3 text-gray-400">
              Socials
            </p>

            <div className="flex gap-3">
              {[
                { Icon: FaLinkedin, link: "https://www.linkedin.com/in/manav178892250/" },
                { Icon: FaGithub, link: "https://github.com/manav-05-06" },
                { Icon: FaEnvelope, link: "mailto:manavkhandelwal72@gmail.com" }
              ].map(({ Icon, link }, i) => (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  key={i}
                  href={link}
                  target="_blank"
                  className="
                    w-10 h-10 rounded-full bg-white/90 backdrop-blur-lg
                    flex items-center justify-center text-black
                    hover:bg-white transition shadow
                  "
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="my-10 border-t border-white/20"></div>

        {/* ---------------- Bottom Row ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="
            flex flex-col md:flex-row justify-between items-start md:items-center gap-8
          "
        >
          {/* Nav Links */}
          <div className="flex gap-6 text-sm text-white/80">
            {["Home", "Projects", "Skills", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="
                  relative hover:text-white transition 
                  after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:w-0 after:bg-white after:transition-all
                  hover:after:w-full
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