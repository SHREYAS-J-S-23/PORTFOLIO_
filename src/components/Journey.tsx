import { motion } from 'framer-motion';
import { journeySteps } from '../content';
import { usePrefersReducedMotion } from '../hooks';

export default function Journey() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="journey"
      className="section-anchor"
      style={{
        background: '#0A0B0F',
        paddingTop: 120,
        paddingBottom: 120,
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
      aria-label="Development journey section"
    >
      <div className="content-width">
        <p className="section-label" style={{ marginBottom: 24 }}>
          06 / JOURNEY
        </p>

        {/* Section header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 32,
            marginBottom: 80,
          }}
          className="journey-header"
        >
          <div>
            <motion.h2
              className="heading-lg"
              initial={reduced ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ margin: 0, color: 'white' }}
            >
              Always <span style={{ color: '#47F5FA' }}>becoming.</span>
              <span className="blink-caret" style={{ color: '#47F5FA', marginLeft: 4 }}>
                _
              </span>
            </motion.h2>
          </div>
          <motion.p
            initial={reduced ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              margin: 0,
              fontSize: 16,
              color: '#8A8A94',
              lineHeight: 1.7,
              maxWidth: 480,
            }}
          >
            A living map of the questions I'm asking, the systems I'm building, and the direction I'm heading.
          </motion.p>
        </div>

        {/* Timeline container */}
        <div
          style={{
            position: 'relative',
          }}
          className="journey-timeline"
        >
          {/* Horizontal Hairline connecting the dots (desktop) */}
          <div
            className="journey-horizontal-line"
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 7,
              left: 0,
              right: 0,
              height: 1,
              background: 'rgba(255, 255, 255, 0.12)',
              zIndex: 0,
            }}
          />

          {/* 4 Steps */}
          <div
            className="journey-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 32,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {journeySteps.map((step, i) => (
              <motion.div
                key={step.index}
                initial={reduced ? {} : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  delay: i * 0.15,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                className="journey-step"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                {/* Glowing cyan dot with pulse ring */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 24,
                  }}
                  className="journey-dot-wrapper"
                >
                  <motion.div
                    initial={reduced ? {} : { scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.15 + 0.1,
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                    }}
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: '50%',
                      background: '#47F5FA',
                      boxShadow: '0 0 16px rgba(71, 245, 250, 0.8), 0 0 32px rgba(71, 245, 250, 0.3)',
                      border: '2px solid #0A0B0F',
                      position: 'relative',
                    }}
                  />
                </div>

                {/* Index label */}
                <span
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.15em',
                    color: '#47F5FA',
                    marginBottom: 10,
                  }}
                >
                  {step.index}
                </span>

                {/* Title */}
                <h3
                  className="font-grotesk"
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: 'white',
                    margin: '0 0 8px 0',
                    lineHeight: 1.25,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {step.title}
                </h3>

                {/* Caption */}
                <p
                  style={{
                    fontSize: 13,
                    color: '#8A8A94',
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {step.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .journey-header {
            grid-template-columns: 1fr 1fr !important;
            align-items: end;
          }
        }
        @media (max-width: 860px) {
          .journey-horizontal-line {
            display: none !important;
          }
          .journey-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding-left: 28px;
            position: relative;
          }
          .journey-grid::before {
            content: '';
            position: absolute;
            left: 6px;
            top: 6px;
            bottom: 6px;
            width: 1px;
            background: rgba(255, 255, 255, 0.12);
          }
          .journey-step {
            position: relative;
          }
          .journey-dot-wrapper {
            position: absolute;
            left: -28px;
            top: 2px;
            margin-bottom: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
