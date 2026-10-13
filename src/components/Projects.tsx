import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, type Project } from '../content';
import { usePrefersReducedMotion } from '../hooks';

// ── Icon shapes ───────────────────────────────────────────────────────────────
function IconShape({ shape }: { shape: Project['iconShape'] }) {
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    borderRadius: '50%',
    border: '1px solid rgba(0,0,0,0.15)',
    fontSize: 24,
    color: 'rgba(0,0,0,0.5)',
    background: 'rgba(0,0,0,0.04)',
  };

  const icons: Record<Project['iconShape'], string> = {
    asterisk: '✳',
    arrow: '↗',
    diamond: '◆',
    ring: '◎',
  };

  return <div style={style} aria-hidden="true">{icons[shape]}</div>;
}

// ── Orbit illustration ────────────────────────────────────────────────────────
function CardIllustration({
  shape,
  isHovered,
}: {
  shape: Project['iconShape'];
  isHovered: boolean;
}) {
  return (
    <div
      style={{
        height: 160,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* Perspective grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
          transform: 'perspective(300px) rotateX(40deg) translateY(30%)',
          transformOrigin: 'bottom center',
        }}
      />
      {/* Elliptical orbit with hover rotation */}
      <motion.div
        animate={{ rotate: isHovered ? 180 : 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: 120,
          height: 48,
          borderRadius: '50%',
          border: '1px solid rgba(0,0,0,0.2)',
          transform: 'perspective(300px) rotateX(60deg)',
        }}
      />
      {/* Center icon */}
      <IconShape shape={shape} />
    </div>
  );
}

// ── Project card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const reduced = usePrefersReducedMotion();

  return (
    <motion.article
      initial={reduced ? {} : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={reduced ? {} : { y: -6, transition: { duration: 0.25 } }}
      style={{
        background: project.color,
        border: `1px solid ${project.borderColor}`,
        borderRadius: 8,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default',
        transition: 'box-shadow 0.25s',
      }}
      onMouseEnter={(e) => {
        setIsHovered(true);
        if (!reduced) (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px rgba(0,0,0,0.15)`;
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Card top */}
      <div style={{ padding: '20px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span className="font-mono" style={{ fontSize: 11, fontWeight: 700, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.08em' }}>
          {project.index}
        </span>
        <span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.12em', color: 'rgba(0,0,0,0.45)', textAlign: 'right' }}>
          {project.category}
        </span>
      </div>

      {/* Illustration */}
      <div style={{ padding: '8px 20px 0' }}>
        <CardIllustration shape={project.iconShape} isHovered={isHovered} />
      </div>

      {/* Content */}
      <div style={{ padding: '20px 20px 0', flex: 1 }}>
        <h3
          className="font-grotesk"
          style={{ margin: '0 0 10px 0', fontSize: 24, fontWeight: 700, color: '#111', letterSpacing: '-0.02em', lineHeight: 1.1 }}
        >
          {project.title}
        </h3>
        <p style={{ margin: '0 0 16px 0', fontSize: 14, color: 'rgba(0,0,0,0.6)', lineHeight: 1.65 }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono"
              style={{
                fontSize: 9,
                letterSpacing: '0.1em',
                border: '1px solid rgba(0,0,0,0.2)',
                borderRadius: 24,
                padding: '4px 10px',
                color: 'rgba(0,0,0,0.5)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: '1px solid rgba(0,0,0,0.1)',
          padding: '14px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <a
          href={project.projectUrl || '#'}
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#111',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.65'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
        >
          View project
        </a>
        <a
          href={project.liveUrl || '#'}
          aria-label={`View ${project.title} live`}
          style={{
            width: 32,
            height: 32,
            border: '1px solid rgba(0,0,0,0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(0,0,0,0.5)',
            textDecoration: 'none',
            fontSize: 13,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = 'rgba(0,0,0,0.08)';
            el.style.borderColor = 'rgba(0,0,0,0.35)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = 'none';
            el.style.borderColor = 'rgba(0,0,0,0.2)';
          }}
        >
          ↗
        </a>
      </div>
    </motion.article>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section
      id="projects"
      className="section-anchor"
      style={{ background: '#EFEFEA', paddingTop: 120, paddingBottom: 120 }}
      aria-label="Projects section"
    >
      <div className="content-width">
        {/* Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 32,
            marginBottom: 64,
          }}
        >
          <div>
            <p className="section-label" style={{ marginBottom: 24 }}>03 / SELECTED WORK</p>
            <h2 className="heading-lg" style={{ margin: 0, color: '#111' }}>
              Ideas made <span style={{ color: '#8B5CF6' }}>tangible.</span>
            </h2>
          </div>
          <p style={{ margin: 0, fontSize: 16, color: '#555', lineHeight: 1.7, maxWidth: 440 }}>
            A selection of things I've built, shaped, and learned from. Each one started with a question.
          </p>
        </div>

        {/* Project grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          #projects .content-width > div:first-child {
            grid-template-columns: 1fr 1fr !important;
            align-items: end;
          }
        }
      `}</style>
    </section>
  );
}
