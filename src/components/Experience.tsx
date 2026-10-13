import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experienceItems } from '../content';
import { usePrefersReducedMotion } from '../hooks';

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="experience"
      className="section-anchor"
      style={{ background: '#0A0B0F', paddingTop: 120, paddingBottom: 120 }}
      aria-label="Experience section"
    >
      <div className="content-width">
        <p className="section-label" style={{ marginBottom: 24 }}>04 / EXPERIENCE</p>

        <motion.h2
          className="heading-lg"
          initial={reduced ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          style={{ margin: '0 0 16px 0', color: 'white' }}
        >
          Learning beyond{' '}
          <span style={{ color: '#8B5CF6' }}>the classroom.</span>
        </motion.h2>

        <motion.p
          initial={reduced ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ margin: '0 0 80px 0', fontSize: 16, color: '#8A8A94', lineHeight: 1.7, maxWidth: 500 }}
        >
          Learning by shipping, debugging, and staying curious about what happens underneath.
        </motion.p>

        {/* Timeline */}
        <div ref={sectionRef} style={{ position: 'relative', paddingLeft: 32 }}>
          {/* Vertical line */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 1,
              background: 'rgba(255,255,255,0.1)',
            }}
          />

          {experienceItems.map((item, i) => (
            <TimelineEntry key={item.id} item={item} index={i} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineEntry({
  item,
  index,
  reduced,
}: {
  item: (typeof experienceItems)[0];
  index: number;
  reduced: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        marginBottom: index < experienceItems.length - 1 ? 64 : 0,
      }}
    >
      {/* Square node */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: -36,
          top: 4,
          width: 10,
          height: 10,
          border: '2px solid #47F5FA',
          background: '#0A0B0F',
          transform: 'rotate(45deg)',
          transition: 'background 0.3s',
        }}
      />

      <motion.div
        initial={reduced ? {} : { opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <span
            className="font-mono"
            style={{ fontSize: 9, letterSpacing: '0.15em', color: '#47F5FA', border: '1px solid rgba(71,245,250,0.3)', borderRadius: 24, padding: '4px 10px' }}
          >
            {item.mono}
          </span>
          <span className="font-mono" style={{ fontSize: 9, color: '#8A8A94', letterSpacing: '0.08em' }}>
            {item.period}
          </span>
        </div>

        <h3
          style={{ margin: '0 0 4px 0', fontSize: 22, fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}
        >
          {item.title}
        </h3>
        <p
          className="font-mono"
          style={{ margin: '0 0 14px 0', fontSize: 11, color: '#8A8A94', letterSpacing: '0.06em' }}
        >
          {item.company}
        </p>
        <p style={{ margin: 0, fontSize: 15, color: '#8A8A94', lineHeight: 1.7, maxWidth: 560 }}>
          {item.description}
        </p>
      </motion.div>
    </div>
  );
}
