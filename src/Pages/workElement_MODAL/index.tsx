import type { Project, ProjectSection } from '@/Types';
import { motion, useScroll } from 'framer-motion';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

type Props = {
  project: Project;
  onClose: () => void;
};

// لازم يساوي duration-300 في الكلاسات تحت
const DURATION = 300;

/* ───────── كارت القسم: رقم كبير + spotlight بيتبع الماوس ───────── */
type SectionCardProps = {
  section: ProjectSection;
  index: number;
  total: number;
  root: RefObject<HTMLDivElement | null>;
};

const SectionCard = ({ section, index, total, root }: SectionCardProps) => {
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, root }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-6 transition-colors duration-300 hover:border-[#6489ff]/40 sm:p-8"
    >
      {/* spotlight */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(350px_circle_at_var(--x,50%)_var(--y,50%),rgba(100,137,255,0.14),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* رقم كبير outline في الخلفية */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-4 right-4 font-mono text-8xl font-black text-transparent select-none sm:text-9xl"
        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.08)' }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative">
        <div className="mb-4 flex items-center gap-3">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6489ff] opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-[#6489ff]" />
          </span>
          <span className="font-mono text-xs tracking-widest text-white/40 uppercase">
            {String(index + 1).padStart(2, '0')} /{' '}
            {String(total).padStart(2, '0')}
          </span>
        </div>

        <h3 className="mb-3 text-xl font-bold tracking-tight wrap-break-word text-white sm:text-2xl">
          {section.heading}
        </h3>

        <p className="text-base leading-relaxed wrap-break-word text-white/60 sm:text-lg">
          {section.content}
        </p>
      </div>
    </motion.div>
  );
};

// Min section
const ProjectModal = ({ project, onClose }: Props) => {
  const [visible, setVisible] = useState(false);
  const closingRef = useRef(false);
  const timerRef = useRef<number | undefined>(undefined);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const { scrollYProgress } = useScroll({ container: scrollRef });

  const heroImage = project.image2 ?? project.image3;

  // أنيميشن الفتح
  useEffect(() => {
    let id2 = 0;
    const id1 = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => setVisible(true));
    });
    return () => {
      cancelAnimationFrame(id1);
      cancelAnimationFrame(id2);
    };
  }, []);

  // أنيميشن القفل: شغّل الـ transition الأول، وبعدها شيل الكومبوننت
  const handleClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setVisible(false);
    timerRef.current = window.setTimeout(onClose, DURATION);
  }, [onClose]);

  // نضّف الـ timer
  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  // قفل بزرار Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [handleClose]);

  // امنع سكرول الصفحة ورا المودال (مع تعويض عرض الـ scrollbar)
  useEffect(() => {
    const { overflow, paddingRight } = document.body.style;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, []);

  // ركّز على زرار القفل أول ما يفتح
  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={handleClose}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md transition-all duration-300 ease-out motion-reduce:transition-none sm:p-6 ${
        visible ? 'bg-black/85 opacity-100' : 'bg-black/0 opacity-0'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d] shadow-[0_0_80px_-20px_rgba(100,137,255,0.45)] transition-all duration-300 ease-out motion-reduce:transition-none ${
          visible
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-8 scale-95 opacity-0'
        }`}
      >
        {/* progress bar */}
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="absolute top-0 right-0 left-0 z-20 h-0.75 origin-left bg-linear-to-r from-[#6489ff] to-[#9db4ff]"
        />

        {/* CLOSE BUTTON */}
        <button
          ref={closeBtnRef}
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/80 backdrop-blur-md transition duration-300 hover:rotate-90 hover:border-[#6489ff] hover:text-[#6489ff]"
        >
          ✕
        </button>

        {/* HIDDEN SCROOL*/}
        <div
          ref={scrollRef}
          className="flex-1 scrollbar-none overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden"
        >
          {/* ───── HERO ───── */}
          <div className="relative h-60 overflow-hidden sm:h-80">
            {heroImage ? (
              <motion.img
                src={heroImage}
                alt={project.title}
                initial={{ scale: 1.15 }}
                animate={{ scale: visible ? 1 : 1.15 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(100,137,255,0.35),transparent_60%)]" />
            )}

            {/* overlays */}
            <div className="absolute inset-0 bg-linear-to-t from-[#0d0d0d] via-[#0d0d0d]/70 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-br from-[#6489ff]/20 via-transparent to-transparent mix-blend-overlay" />

            {/* العنوان فوق الصورة */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[#6489ff]/40 bg-[#6489ff]/15 px-3 py-1 text-xs font-semibold tracking-wider text-[#9db4ff] uppercase backdrop-blur-md">
                  {project.category}
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-md">
                  {project.year}
                </span>
              </div>

              <h2 className="bg-linear-to-r from-white via-white to-[#9db4ff] bg-clip-text text-4xl font-bold tracking-tighter text-transparent sm:text-5xl">
                {project.title}
              </h2>

              <p className="mt-2 text-sm text-white/50">
                <span className="text-white/30">Client — </span>
                {project.client}
              </p>
            </div>
          </div>

          {/* ───── CONTENT ───── */}
          <div className="relative p-6 sm:p-8">
            {/* SOME LIGHT IN BACKGROUND */}
            <div className="pointer-events-none absolute -top-10 -left-20 size-72 rounded-full bg-[#6489ff]/10 blur-3xl" />

            <div className="relative flex flex-col gap-5">
              {project.sections.map(
                (section: ProjectSection, index: number) => (
                  <SectionCard
                    key={index}
                    section={section}
                    index={index}
                    total={project.sections.length}
                    root={scrollRef}
                  />
                )
              )}
            </div>
          </div>
        </div>

        {/* ───── Footer  ───── */}
        <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-[#0d0d0d]/90 px-6 py-4 backdrop-blur-md sm:px-8">
          <span className="hidden text-xs text-white/40 sm:block">
            Press{' '}
            <kbd className="rounded border border-white/15 px-1.5 py-0.5 font-mono">
              Esc
            </kbd>{' '}
            to close
          </span>

          <Link
            to={`/works/${project.slug}`}
            className="group relative ml-auto inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#6489ff] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:shadow-[0_0_30px_-5px_rgba(100,137,255,0.8)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">View full project</span>
            <span className="relative transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProjectModal;
