import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2, rootMargin: "80px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

const DESKTOP_WIDTH = 1280;
const DESKTOP_HEIGHT = 800;

export default function ProjectCard({ project, openModal, index }) {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(0.2);
  const cardRef = useRef(null);
  const previewRef = useRef(null);
  const inView = useInView(cardRef);

  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 600], [0, index * -10]);

  useEffect(() => {
    if (!previewRef.current || !inView) return;
    const el = previewRef.current;
    const updateScale = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const scaleX = w / DESKTOP_WIDTH;
      const scaleY = h / DESKTOP_HEIGHT;
      setScale(Math.min(scaleX, scaleY, 1));
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, [inView]);

  const useLivePreview = project.live && !project.preferImage;
  const fallbackSrc = project.preview || project.image;
  const scaledW = DESKTOP_WIDTH * scale;
  const scaledH = DESKTOP_HEIGHT * scale;

  return (
    <motion.div ref={cardRef} style={{ y: parallax }}>
      <motion.div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openModal(project);
          }
        }}
        onClick={() => openModal(project)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setCursor({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }}
        onMouseLeave={() => setCursor({ x: 0, y: 0 })}
        className="
          group relative p-5 rounded-2xl cursor-pointer overflow-hidden
          bg-white/10 dark:bg-white/5 backdrop-blur-xl
          border border-white/10 dark:border-white/5
          shadow-lg hover:shadow-xl transition-all duration-300
          flex flex-col h-full
          focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900
        "
      >
        {/* Spotlight on hover */}
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

        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none"
        />

        {/* Preview: laptop view (1280×800 scaled) when live, else screenshot */}
        <div
          ref={previewRef}
          className="relative h-40 w-full overflow-hidden rounded-xl mb-4 shadow-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
        >
          {useLivePreview && inView ? (
            <>
              <div
                className="absolute rounded-xl overflow-hidden pointer-events-none"
                style={{
                  width: scaledW,
                  height: scaledH,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                }}
              >
                <iframe
                  src={project.live}
                  title={`Live preview — ${project.title}`}
                  className="border-0 rounded-xl origin-top-left"
                  loading="lazy"
                  style={{
                    width: DESKTOP_WIDTH,
                    height: DESKTOP_HEIGHT,
                    transform: `scale(${scale})`,
                    transformOrigin: "0 0",
                  }}
                />
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </>
          ) : (
            <motion.img
              src={fallbackSrc}
              alt={project.title}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05, y: -3 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full object-cover rounded-xl"
            />
          )}
        </div>

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
