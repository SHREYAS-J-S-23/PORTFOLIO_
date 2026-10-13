import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { aboutFeatures } from '../content';
import { usePrefersReducedMotion } from '../hooks';

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="section-label" style={{ margin: '0 0 24px 0' }}>
      {text}
    </p>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof aboutFeatures)[0];
  index: number;
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.article
      initial={reduced ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={reduced ? {} : { y: -4, transition: { duration: 0.2 } }}
      style={{
        border: '1px solid rgba(0,0,0,0.12)',
        borderRadius: 6,
        padding: '28px 24px',
        background: 'white',
        flex: 1,
        minWidth: 200,
        cursor: 'default',
        transition: 'box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        if (!reduced) (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(139,92,246,0.1)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Index */}
      <p
        className="font-mono"
        style={{ margin: '0 0 12px 0', fontSize: 10, letterSpacing: '0.15em', color: '#8A8A94' }}
      >
        {feature.index}
      </p>
      {/* Icon */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 6,
          background: 'rgba(139,92,246,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          color: '#8B5CF6',
          marginBottom: 14,
          border: '1px solid rgba(139,92,246,0.2)',
        }}
        aria-hidden="true"
      >
        {feature.icon}
      </div>
      <h3
        className="font-grotesk"
        style={{ margin: '0 0 8px 0', fontSize: 16, fontWeight: 600, color: '#111', letterSpacing: '-0.01em' }}
      >
        {feature.title}
      </h3>
      <p style={{ margin: 0, fontSize: 14, color: '#8A8A94', lineHeight: 1.6 }}>
        {feature.description}
      </p>
    </motion.article>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="about"
      className="section-anchor"
      style={{ background: '#EFEFEA', paddingTop: 120, paddingBottom: 120 }}
      aria-label="About section"
    >
      <div className="content-width">
        <SectionLabel text="01 / ABOUT" />

        {/* Two column heading + body */}
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 60,
            marginBottom: 72,
          }}
        >
          {/* Left: heading */}
          <motion.h2
            className="heading-lg"
            initial={reduced ? {} : { opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            style={{ margin: 0, color: '#111' }}
          >
            Engineer by mind.{' '}
            <span style={{ color: '#8B5CF6' }}>Builder by passion.</span>
          </motion.h2>

          {/* Right: body text */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <p
              style={{
                margin: '0 0 20px 0',
                fontSize: 18,
                lineHeight: 1.7,
                color: '#111',
                fontWeight: 400,
              }}
            >
              I'm an Information Science engineering student at Dayananda Sagar College of
              Engineering, Bengaluru, with hands-on experience building web and mobile applications,
              backend services, and AI-powered solutions.
            </p>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: '#555' }}>
              I worked at Preflex Solution on EKART's web and mobile apps — resolving technical
              issues, debugging workflows, and integrating Razorpay payment functionality. Outside
              of work, I'm deeply interested in agentic AI, RAG pipelines, and modern software
              architecture. I believe the best products are built at the intersection of curiosity
              and craft.
            </p>
          </motion.div>
        </div>

        {/* Feature cards */}
        <div
          style={{
            display: 'flex',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          {aboutFeatures.map((f, i) => (
            <FeatureCard key={f.index} feature={f} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          #about .content-width > div:nth-child(2) {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
