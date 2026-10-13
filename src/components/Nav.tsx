import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks, siteConfig } from '../content';
import { useActiveSection } from '../hooks';

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionIds = navLinks.map((l) => l.id);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'background 0.3s, backdrop-filter 0.3s, border-color 0.3s',
          background: scrolled ? 'rgba(10,11,15,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        }}
      >
        <nav
          aria-label="Main navigation"
          className="content-width"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 72,
            gap: 16,
          }}
        >
          {/* Wordmark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'baseline',
              gap: 4,
              flexShrink: 0,
            }}
          >
            <span
              className="font-grotesk"
              style={{ fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em', color: 'white' }}
            >
              {siteConfig.wordmark.main}
            </span>
            <span
              className="font-mono"
              style={{ fontSize: 13, color: '#47F5FA', fontWeight: 700 }}
            >
              {siteConfig.wordmark.accent}
            </span>
          </button>

          {/* Desktop nav links */}
          <ul
            role="list"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: 2,
              margin: 0,
              padding: 0,
              listStyle: 'none',
            }}
            className="nav-desktop"
          >
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    aria-current={isActive ? 'page' : undefined}
                    style={{
                      background: 'none',
                      border: isActive ? '1px solid rgba(71,245,250,0.5)' : '1px solid transparent',
                      borderRadius: 20,
                      padding: '5px 12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      color: isActive ? '#47F5FA' : 'rgba(255,255,255,0.55)',
                    }}
                  >
                    <span className="font-mono" style={{ fontSize: 10, letterSpacing: '0.08em' }}>
                      {link.index} {link.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right side: CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <button
              onClick={() => scrollToSection('contact')}
              className="nav-cta"
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 20,
                padding: '7px 16px',
                cursor: 'pointer',
                color: 'white',
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.06em',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#47F5FA';
                (e.currentTarget as HTMLButtonElement).style.color = '#47F5FA';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)';
                (e.currentTarget as HTMLButtonElement).style.color = 'white';
              }}
            >
              LET'S TALK ↗
            </button>

            {/* Hamburger */}
            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="hamburger-btn"
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 8,
                padding: '8px 10px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: 18,
                  height: 1.5,
                  background: 'white',
                  transition: 'transform 0.2s',
                  transformOrigin: 'center',
                  transform: mobileOpen ? 'rotate(45deg) translateY(4px)' : 'none',
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: 18,
                  height: 1.5,
                  background: 'white',
                  transition: 'opacity 0.2s',
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: 18,
                  height: 1.5,
                  background: 'white',
                  transition: 'transform 0.2s',
                  transformOrigin: 'center',
                  transform: mobileOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
                }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 90,
              background: 'rgba(10,11,15,0.97)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => { scrollToSection(link.id); setMobileOpen(false); }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '12px 24px',
                  textAlign: 'center',
                }}
              >
                <span
                  className="font-mono"
                  style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, display: 'block' }}
                >
                  {link.index}
                </span>
                <span
                  className="font-grotesk"
                  style={{
                    color: activeId === link.id ? '#47F5FA' : 'white',
                    fontSize: 28,
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {link.label}
                </span>
              </motion.button>
            ))}

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => { scrollToSection('contact'); setMobileOpen(false); }}
              style={{
                marginTop: 24,
                background: '#47F5FA',
                border: 'none',
                borderRadius: 4,
                padding: '14px 32px',
                cursor: 'pointer',
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: '#0A0B0F',
              }}
            >
              LET'S TALK ↗
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 1024px) {
          .nav-desktop { display: flex !important; }
          .hamburger-btn { display: none !important; }
        }
        @media (max-width: 768px) {
          .nav-cta { display: none !important; }
        }
      `}</style>
    </>
  );
}
