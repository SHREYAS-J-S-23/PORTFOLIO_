import { siteConfig } from '../content';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      role="contentinfo"
      style={{
        background: '#0A0B0F',
        color: 'white',
        paddingTop: 80,
        paddingBottom: 48,
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div className="content-width">
        {/* Top 3 columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 40,
            marginBottom: 64,
            alignItems: 'start',
          }}
          className="footer-grid"
        >
          {/* Col 1: Wordmark & tagline */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 6,
                marginBottom: 16,
              }}
            >
              <span
                className="font-grotesk"
                style={{ fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em', color: 'white' }}
              >
                {siteConfig.wordmark.main}
              </span>
              <span
                className="font-mono"
                style={{ fontSize: 14, color: '#47F5FA', fontWeight: 700 }}
              >
                {siteConfig.wordmark.accent}
              </span>
            </div>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: '#8A8A94',
                margin: 0,
                maxWidth: 340,
              }}
            >
              {siteConfig.tagline}
            </p>
          </div>

          {/* Col 2: Center icon links */}
          <div
            style={{
              display: 'flex',
              gap: 24,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
            className="footer-socials"
          >
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="font-mono"
              style={{
                fontSize: 13,
                color: '#8A8A94',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#47F5FA')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#8A8A94')}
            >
              GitHub ↗
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="font-mono"
              style={{
                fontSize: 13,
                color: '#8A8A94',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#47F5FA')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#8A8A94')}
            >
              LinkedIn ↗
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Send email"
              className="font-mono"
              style={{
                fontSize: 13,
                color: '#8A8A94',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#47F5FA')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#8A8A94')}
            >
              Email ↗
            </a>
          </div>

          {/* Col 3: Back to top */}
          <div style={{ display: 'flex', justifyContent: 'flex-start' }} className="footer-top-btn-wrapper">
            <button
              onClick={scrollToTop}
              className="font-mono"
              style={{
                background: 'none',
                border: 'none',
                color: '#47F5FA',
                fontSize: 13,
                letterSpacing: '0.08em',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: 0,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.7')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
            >
              Back to top ↗
            </button>
          </div>
        </div>

        {/* Bottom hairline divider */}
        <div
          aria-hidden="true"
          style={{
            height: 1,
            background: 'rgba(255, 255, 255, 0.08)',
            marginBottom: 24,
          }}
        />

        {/* Copyright row */}
        <div
          className="font-mono"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 11,
            letterSpacing: '0.08em',
            color: '#8A8A94',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span>© 2025 Shreyas J S</span>
          <span>Designed & built with curiosity ✦</span>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr !important;
          }
          .footer-socials {
            justify-content: center !important;
          }
          .footer-top-btn-wrapper {
            justify-content: flex-end !important;
          }
        }
      `}</style>
    </footer>
  );
}
