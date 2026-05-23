'use client';
import { useState, useEffect } from 'react';

const TESTIMONIALS = [
  {
    quote: "There are not enough words to express our deepest gratitude for Belen and her entire support staff. Every step of the way, Belen and Valeria guided us, answering every question and easing the fears that so many families experience. In a world full of people who may take advantage of difficult situations, you will never have to doubt that you're in good hands with Belen and her team.",
    name: 'Belen M.',
    role: 'Client · Family immigration',
    initial: 'B',
  },
  {
    quote: "The Law Office of Belen Gomez is a dedicated team that will work tirelessly for you. They are honest, straightforward and understanding. They answered our questions every step of the way, communicated with us, and made us feel valuable. Thank you for all your hard work — we are forever grateful.",
    name: 'Mariel',
    role: 'Client · Riverside, CA',
    initial: 'M',
  },
  {
    quote: "Belen Gomez is a reliable lawyer that is always looking forward to helping her clients. She helped me and my husband get our work permits and U Visa. Belen and her assistant Valeria were always there to answer our questions and support us during the process. I strongly recommend her to anyone looking to get a legal status in this country.",
    name: 'Iveth S.',
    role: 'Client · U Visa & Work Permits',
    initial: 'I',
  },
  {
    quote: "My experience with attorney Belen Gomez was excellent! I recommend her 100%. She and her staff did an amazing job with my husband's adjustment for permanent residence — fast and very efficient! Prior to hiring her, we had a bad experience with another firm, but she took over and was able to finish the process in no time.",
    name: 'Antonia O.',
    role: 'Client · Permanent Residence',
    initial: 'A',
  },
  {
    quote: "I've used Belen Gomez services three times. Her staff is very efficient and on top of everything. Belen is very cordial — she made me feel welcomed every time I had an appointment. They answered my calls right away and communicated with me within hours. I am pleased with her service and have recommended her to my relatives.",
    name: 'Bry E.',
    role: 'Returning client · Google Review',
    initial: 'B',
  },
  {
    quote: "Excellent and experienced team. I recommend her without hesitation. She did an amazing job helping me fix my immigration status. Very organized, efficient, and friendly staff members. I have no words to express my gratitude — thank you and keep up with the amazing work this team is doing for the community.",
    name: 'Ricardo A.',
    role: 'Client · Immigration status',
    initial: 'R',
  },
];

// Deterministic color per initial so it looks consistent
const INITIAL_COLORS: Record<string, string> = {
  B: '#2d5a4e',
  M: '#5a3e2d',
  I: '#2d4a5a',
  A: '#4e2d5a',
  R: '#3e5a2d',
};

export default function TestimonialFeature() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(id);
  }, []);

  const cur = TESTIMONIALS[idx];
  const avatarBg = INITIAL_COLORS[cur.initial] || 'var(--primary)';

  return (
    <section className="section" style={{ textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: 980 }}>

        <div className="eyebrow center" style={{ justifyContent: 'center' }}>Client voices</div>

        <blockquote
          key={idx}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(20px, 2.6vw, 30px)',
            lineHeight: 1.4,
            margin: '28px 0 28px',
            color: 'var(--ink)',
            animation: 'fadeIn .4s ease',
          }}
        >
          "{cur.quote}"
        </blockquote>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'center' }}>
          {/* Letter-initial avatar */}
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: avatarBg,
            color: '#f4ece0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 500,
            flexShrink: 0, userSelect: 'none',
          }}>
            {cur.initial}
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: 600 }}>{cur.name}</div>
            <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{cur.role}</div>
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 32 }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                width: i === idx ? 32 : 8, height: 8, borderRadius: 4, border: 'none',
                background: i === idx ? 'var(--primary)' : 'var(--line)',
                transition: 'all .3s ease', cursor: 'pointer',
              }}
            />
          ))}
        </div>

        {/* Google Reviews attribution — quiet, below the dots */}
        <a
          href="https://g.co/kgs/belengomezlaw"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            marginTop: 24, opacity: 0.45, fontSize: 12,
            color: 'var(--ink)', textDecoration: 'none',
            fontFamily: 'var(--font-body)', letterSpacing: '0.04em',
            transition: 'opacity .2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.45')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span style={{ color: '#f5a623', letterSpacing: 0 }}>★★★★★</span>
          <span>4.9 · 48 Google reviews</span>
        </a>

      </div>
    </section>
  );
}
