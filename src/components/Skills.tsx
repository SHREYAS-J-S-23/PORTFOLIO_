import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillCategories } from '../content';
import { usePrefersReducedMotion } from '../hooks';

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);
  const reduced = usePrefersReducedMotion();
  const current = skillCategories[activeTab];

  return (
    <section
      id="skills"
      className="section-anchor"
      style={{ background: '#0A0B0F', paddingTop: 120, paddingBottom: 120 }}
      aria-label="Skills section"
    >
      <div className="content-width">
        {/* Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 32,
            marginBottom: 72,
          }}
        >
          <div>
            <p className="section-label" style={{ marginBottom: 24 }}>02 / CAPABILITIES</p>
            <h2 className="heading-lg" style={{ margin: 0, color: 'white' }}>
              Tools for <span style={{ color: '#47F5FA' }}>curious</span> minds.
            </h2>
          </div>
          <p style={{ margin: 0, fontSize: 16, color: '#8A8A94', lineHeight: 1.7, maxWidth: 440 }}>
            From interface to infrastructure, I care about the complete system — and the people using it.
          </p>
        </div>

        {/* Tab layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 40,
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 8,
            padding: 32,
          }}
        >
          {/* Left tab list */}
          <div
            role="tablist"
            aria-label="Skill categories"
            style={{ display: 'flex', flexDirection: 'column', gap: 4, borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: 24 }}
          >
            {skillCategories.map((cat, i) => {
              const isActive = i === activeTab;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  id={`tab-${cat.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${cat.id}`}
                  onClick={() => setActiveTab(i)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '14px 0',
                    textAlign: 'left',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    transition: 'color 0.2s',
                  }}
                >
                  <span
                    className="font-mono"
                    style={{ fontSize: 10, color: isActive ? '#47F5FA' : '#8A8A94', letterSpacing: '0.1em', width: 24, flexShrink: 0 }}
                  >
                    {cat.index}
                  </span>
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: isActive ? 'white' : '#555',
                      transition: 'color 0.2s',
                      flex: 1,
                    }}
                  >
                    {cat.label}
                  </span>
                  {isActive && <span style={{ color: '#47F5FA', fontSize: 14 }}>↗</span>}
                </button>
              );
            })}
          </div>

          {/* Right panel */}
          <div style={{ position: 'relative', minHeight: 180 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                role="tabpanel"
                id={`panel-${current.id}`}
                aria-labelledby={`tab-${current.id}`}
                initial={reduced ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? {} : { opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {/* Chip grid */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
                  {current.skills.map((skill, i) => (
                    <motion.div
                      key={skill.id}
                      initial={reduced ? {} : { opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      style={{
                        border: '1px solid rgba(71,245,250,0.3)',
                        borderRadius: 24,
                        padding: '8px 14px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        cursor: 'default',
                      }}
                    >
                      <span className="font-mono" style={{ fontSize: 9, color: '#47F5FA', letterSpacing: '0.1em' }}>
                        {skill.id}
                      </span>
                      <span style={{ fontSize: 13, color: 'white', fontWeight: 500 }}>
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Glowing badge */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      border: '1px solid rgba(71,245,250,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 24px rgba(71,245,250,0.15), inset 0 0 24px rgba(71,245,250,0.05)',
                      transition: 'all 0.3s',
                    }}
                  >
                    <span
                      className="font-mono"
                      style={{ fontSize: 14, color: '#47F5FA', letterSpacing: '0.05em' }}
                    >
                      {current.icon}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          #skills .content-width > div:first-child {
            grid-template-columns: 1fr 1fr !important;
            align-items: end;
          }
          #skills .content-width > div:last-child {
            grid-template-columns: 260px 1fr !important;
            gap: 0 !important;
          }
          #skills .content-width > div:last-child > div:first-child {
            border-bottom: none !important;
            padding-bottom: 0 !important;
            border-right: 1px solid rgba(255,255,255,0.07);
            padding-right: 32px;
          }
          #skills .content-width > div:last-child > div:last-child {
            padding-left: 40px;
          }
        }
      `}</style>
    </section>
  );
}
