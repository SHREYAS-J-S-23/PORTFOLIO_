import { motion } from 'framer-motion';
import { achievements } from '../content';
import { usePrefersReducedMotion } from '../hooks';

export default function Achievements() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="achievements"
      className="section-anchor"
      style={{ background: '#0A0B0F', paddingTop: 120, paddingBottom: 120, borderTop: '1px solid rgba(255,255,255,0.06)' }}
      aria-label="Achievements section"
    >
      <div className="content-width">
        <p className="section-label" style={{ marginBottom: 24 }}>05 / ACHIEVEMENTS</p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 32,
            marginBottom: 64,
          }}
        >
          <motion.h2
            className="heading-lg"
            initial={reduced ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ margin: 0, color: 'white' }}
          >
            Proof of <span style={{ color: '#8B5CF6' }}>momentum.</span>
          </motion.h2>

          <motion.p
            initial={reduced ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ margin: 0, fontSize: 16, color: '#8A8A94', lineHeight: 1.7, maxWidth: 480 }}
          >
            The best work is rarely a solo act. It's made with teammates, time pressure, and a problem worth solving.
          </motion.p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {achievements.map((item, i) => (
            <motion.article
              key={item.id}
              initial={reduced ? {} : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
              className="glow-cyan-hover"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                padding: 32,
                position: 'relative',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                cursor: 'default',
              }}
            >
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                {/* Icon tile */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    background: 'rgba(139,92,246,0.12)',
                    border: '1px solid rgba(139,92,246,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                  }}
                  aria-hidden="true"
                >
                  {item.icon}
                </div>
                {/* Star */}
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 18 }} aria-hidden="true">✦</span>
              </div>

              {/* Mono label */}
              <p
                className="font-mono"
                style={{ margin: '0 0 12px 0', fontSize: 9, letterSpacing: '0.15em', color: '#47F5FA' }}
              >
                {item.mono}
              </p>

              {/* Title */}
              <h3 style={{ margin: '0 0 12px 0', fontSize: 22, fontWeight: 700, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                {item.title}
              </h3>

              {/* Description */}
              <p style={{ margin: 0, fontSize: 14, color: '#8A8A94', lineHeight: 1.7 }}>
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          #achievements .content-width > div:first-child + div {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
