import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { siteConfig, marqueeItems } from '../content';
import { usePrefersReducedMotion } from '../hooks';

const HeroModel = lazy(() => import('./HeroModel'));

function MarqueeBand() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#D4FF3F',
        transform: 'skewY(-1.5deg)',
        transformOrigin: 'left bottom',
        overflow: 'hidden',
        height: 52,
        display: 'flex',
        alignItems: 'center',
        zIndex: 10,
      }}
      aria-hidden="true"
    >
      <div
        className="marquee-track"
        style={{
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          gap: 0,
          willChange: 'transform',
        }}
      >
        {items.map((item, i) => (
          <span key={i} className="font-mono" style={{ color: '#0A0B0F', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', padding: '0 24px' }}>
            {item} ✦
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const reduced = usePrefersReducedMotion();

  const fadeUp = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100svh',
        background: '#0A0B0F',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 72,
        paddingBottom: 80,
      }}
      aria-label="Hero section"
    >
      {/* Background grid lines */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
      />

      <div
        className="content-width"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 60,
          paddingTop: 48,
          paddingBottom: 120,
          alignItems: 'center',
          minHeight: 'calc(100svh - 72px)',
        }}
      >
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {/* Status chip */}
          <motion.div {...fadeUp(0.1)} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                border: '1px solid rgba(212,255,63,0.3)',
                borderRadius: 24,
                padding: '6px 14px 6px 10px',
                background: 'rgba(212,255,63,0.05)',
              }}
            >
              <span
                className="pulse-dot"
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#D4FF3F',
                  flexShrink: 0,
                }}
              />
              <span className="font-mono" style={{ fontSize: 10, letterSpacing: '0.15em', color: '#D4FF3F' }}>
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </div>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)', maxWidth: 80 }} />
          </motion.div>

          {/* H1 */}
          <h1
            className="heading-xl"
            style={{ margin: 0, color: 'white' }}
          >
            <motion.span {...fadeUp(0.2)} style={{ display: 'block' }}>Building</motion.span>
            <motion.span {...fadeUp(0.28)} style={{ display: 'block', color: '#47F5FA' }}>intelligent</motion.span>
            <motion.span {...fadeUp(0.36)} style={{ display: 'block' }}>experiences</motion.span>
            <motion.span {...fadeUp(0.44)} style={{ display: 'block' }}>at the</motion.span>
            <motion.span {...fadeUp(0.52)} style={{ display: 'block' }}>intersection</motion.span>
            <motion.span {...fadeUp(0.6)} style={{ display: 'block' }}>
              of{' '}
              <span style={{ color: '#8B5CF6' }}>AI + code.</span>
            </motion.span>
          </h1>

          {/* Sub paragraph */}
          <motion.p
            {...fadeUp(0.72)}
            style={{
              margin: 0,
              fontSize: 17,
              lineHeight: 1.65,
              color: '#8A8A94',
              maxWidth: 500,
            }}
          >
            I'm Shreyas — a developer passionate about building impactful web applications,
            intelligent AI systems, and scalable backend solutions.
          </motion.p>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.84)} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: '#EFEFEA',
                border: 'none',
                borderRadius: 4,
                padding: '14px 28px',
                cursor: 'pointer',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: '#111',
                transition: 'all 0.2s',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#fff'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#EFEFEA'; }}
            >
              Explore my work →
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: 4,
                padding: '14px 28px',
                cursor: 'pointer',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: 'white',
                transition: 'all 0.2s',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#47F5FA';
                (e.currentTarget as HTMLButtonElement).style.color = '#47F5FA';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.25)';
                (e.currentTarget as HTMLButtonElement).style.color = 'white';
              }}
            >
              Let's connect ↗
            </button>
          </motion.div>

          {/* Scroll hint */}
          <motion.div {...fadeUp(1.0)} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <span className="font-mono" style={{ fontSize: 10, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)' }}>
              SCROLL TO EXPLORE
            </span>
            <span className="bounce-chevron" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>⌄</span>
          </motion.div>
        </div>

        {/* Right column — 3D */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
          style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', maxWidth: 520, margin: '0 auto' }}
        >
          {/* Mono overlays */}
          <div
            className="font-mono"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              zIndex: 2,
              fontSize: 10,
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.4)',
              textAlign: 'right',
              lineHeight: 1.7,
            }}
          >
            SYSTEM // 01{' '}
            <span style={{ color: '#D4FF3F' }}>LIVE</span>
          </div>

          {/* 3D Model Canvas */}
          <Suspense
            fallback={
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: 480,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 40% 40%, #0A4F6A, #0A0B0F)',
                  border: '1px solid rgba(71,245,250,0.15)',
                }}
              />
            }
          >
            <HeroModel showDecor={false} altText="Shreyas J S — 3D Developer Avatar" />
          </Suspense>

          {/* Bottom overlays bar: Separate containers with flex-between on desktop, stacked on mobile */}
          <div
            className="hero-bottom-bar font-mono"
            style={{
              position: 'absolute',
              bottom: 4,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: 16,
              zIndex: 2,
              pointerEvents: 'none',
            }}
          >
            {/* Bottom-left block: LAT / LON */}
            <div
              className="hero-geo-block"
              style={{
                fontSize: 9,
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.4)',
                whiteSpace: 'nowrap',
              }}
            >
              LAT {siteConfig.location.lat} / LON {siteConfig.location.lon}
            </div>

            {/* Bottom-right block: Model caption */}
            <div
              className="hero-caption-block"
              style={{
                fontSize: 9,
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.4)',
                textAlign: 'right',
                whiteSpace: 'nowrap',
              }}
            >
              Interactive 3D avatar
              <br />
              <span style={{ color: 'rgba(255,255,255,0.24)' }}>Move cursor or drag to explore</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Marquee band */}
      <MarqueeBand />

      {/* Responsive grid layout */}
      <style>{`
        @media (min-width: 960px) {
          #hero > .content-width {
            grid-template-columns: 1fr 1fr !important;
            gap: 80px !important;
          }
        }
        @media (max-width: 640px) {
          .hero-bottom-bar {
            position: static !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
            margin-top: 14px !important;
          }
          .hero-caption-block {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
}
