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
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef(null);
  const previewRef = useRef(null);
  const inView = useInView(cardRef);

  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 600], [0, index * -10]);

  // Recompute scale when container size changes (responsive breakpoints, resize)
  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    const updateScale = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (w <= 0 || h <= 0) return;
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
  // When preferImage (e.g. Evoneural), use screenshot only so we don't try missing preview GIF first
  const fallbackSrc = project.preferImage ? project.image : (project.preview || project.image);
  const scaledW = DESKTOP_WIDTH * scale;
  const scaledH = DESKTOP_HEIGHT * scale;
  // When fallback image fails (missing file), prefer live iframe if available
  const showLiveIframe = useLivePreview && (inView || imageError);

  return (
    <motion.div ref={cardRef} style={{ y: parallax }} className="w-full h-full flex">
      <motion.div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (project.openInNewTab && project.live) {
              window.open(project.live, "_blank", "noopener,noreferrer");
            } else {
              openModal(project);
            }
          }
        }}
        onClick={() => {
          if (project.openInNewTab && project.live) {
            window.open(project.live, "_blank", "noopener,noreferrer");
          } else {
            openModal(project);
          }
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setCursor({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }}
        onMouseLeave={() => setCursor({ x: 0, y: 0 })}
        className="
          group relative p-4 sm:p-5 rounded-xl sm:rounded-2xl cursor-pointer overflow-hidden
          bg-white/10 dark:bg-white/5 backdrop-blur-xl
          border border-white/10 dark:border-white/5
          shadow-lg hover:shadow-xl transition-all duration-300
          flex flex-col h-full w-full min-h-[380px] sm:min-h-[400px]
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

        {/* Preview: laptop view (1280×800 scaled), responsive height */}
        <div
          ref={previewRef}
          className="relative w-full overflow-hidden rounded-lg sm:rounded-xl mb-3 sm:mb-4 shadow-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center min-h-[120px] h-32 sm:h-40 md:h-44 lg:h-48"
        >
          {showLiveIframe ? (
            <>
              <div
                className="absolute rounded-lg sm:rounded-xl overflow-hidden pointer-events-none"
                style={{
                  width: scaledW,
                  height: scaledH,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                }}
              >
                <iframe
                  src={project.live}
                  title={`Live preview — ${project.title}`}
                  className="border-0 rounded-lg sm:rounded-xl origin-top-left"
                  loading="lazy"
                  style={{
                    width: DESKTOP_WIDTH,
                    height: DESKTOP_HEIGHT,
                    transform: `scale(${scale})`,
                    transformOrigin: "0 0",
                  }}
                />
              </div>
              <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </>
          ) : (
            <>
              <motion.img
                src={fallbackSrc}
                alt={project.title}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05, y: -3 }}
                transition={{ duration: 0.3 }}
                className={`h-full w-full object-cover rounded-lg sm:rounded-xl ${imageError ? "hidden" : ""}`}
                onError={() => setImageError(true)}
              />
              {imageError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-lg sm:rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 dark:from-indigo-600/30 dark:to-violet-600/30 border border-indigo-200/50 dark:border-indigo-500/30">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{project.title}</span>
                  {project.live && (
                    <span className="text-xs text-indigo-600 dark:text-indigo-400">Click to open live site</span>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex flex-col flex-grow min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1 leading-tight truncate">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-blue-500 dark:text-blue-300 mb-2 sm:mb-3 font-medium line-clamp-2">
            {project.stack.join(" / ")}
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 flex-grow">
            {project.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
