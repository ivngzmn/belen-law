'use client';
import { useState, useEffect } from 'react';
import { ArchMark } from './ArchComponents';

const TESTIMONIALS = [
  {
    quote: "She walked us through every step of the U Visa process — calmly, clearly, in both English and Spanish. After years of feeling invisible, we finally felt heard.",
    name: 'Maria S.',
    role: 'Client · Riverside, CA',
    avatar: '/img/profile-1.png',
  },
  {
    quote: "Belen prepared us for a difficult consular interview better than we ever could have alone. When we landed back in the U.S. as a family, she was the first call.",
    name: 'Daniel R.',
    role: 'Client · Family petition',
    avatar: '/img/profile-2.png',
  },
  {
    quote: "I came in scared, with documents in two languages and a removal date. Belen sat with me, explained my options, and built a real defense. That changed my life.",
    name: 'Joaquin T.',
    role: 'Client · Removal defense',
    avatar: '/img/profile-3.png',
  },
];

export default function TestimonialFeature() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(id);
  }, []);

  const cur = TESTIMONIALS[idx];

  return (
    <section className="section" style={{ textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: 980 }}>
        <div className="eyebrow center" style={{ justifyContent: 'center' }}>Client voices</div>
        <div style={{ marginTop: 24, color: 'var(--accent)', display: 'flex', justifyContent: 'center' }}>
          <ArchMark size={40} stroke={1.2} />
        </div>
        <blockquote
          key={idx}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 3vw, 34px)',
            lineHeight: 1.35,
            margin: '32px 0 28px',
            color: 'var(--ink)',
            animation: 'fadeIn .4s ease',
          }}
        >
          "{cur.quote}"
        </blockquote>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'center' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', background: 'var(--muted)' }}>
            <img src={cur.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: 600 }}>{cur.name}</div>
            <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{cur.role}</div>
          </div>
        </div>
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
      </div>
    </section>
  );
}
