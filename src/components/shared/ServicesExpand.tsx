'use client';
import { useState } from 'react';
import { ServiceIcon } from './ArchComponents';
import type { ContentfulService } from '../../lib/contentful';

export default function ServicesExpand({ services }: { services: ContentfulService[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }} className="svc-grid">
      {services.map((s, i) => {
        const open = openId === s.sys.id;
        const f = s.fields;
        return (
          <article
            key={s.sys.id}
            style={{
              background: 'var(--card)',
              border: `1px solid ${open ? 'var(--primary)' : 'var(--line-soft)'}`,
              borderRadius: 'var(--r-card)',
              padding: 28,
              transition: 'border-color .25s ease, box-shadow .25s ease',
              gridColumn: open ? '1 / -1' : 'auto',
              boxShadow: open ? '0 30px 60px -38px rgba(18,60,53,.35)' : 'none',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: open ? '1.1fr 1fr' : '1fr', gap: open ? 36 : 0 }} className={open ? 'svc-open-grid' : ''}>
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{
                    width: 56, height: 64,
                    borderRadius: '999px 999px 8px 8px / 55% 55% 8px 8px',
                    background: 'rgba(200,164,93,.18)',
                    border: '1px solid rgba(200,164,93,.3)',
                    color: 'var(--primary)', display: 'grid', placeItems: 'center', flex: 'none',
                  }}>
                    <ServiceIcon kind={f.iconKey} size={28} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'ui-monospace,monospace', fontSize: 11, letterSpacing: '.1em', color: 'var(--ink-soft)' }}>0{i + 1}</div>
                    <h2 className="display" style={{ fontSize: 28, marginTop: 4 }}>{f.title}</h2>
                  </div>
                  <button
                    onClick={() => setOpenId(open ? null : s.sys.id)}
                    aria-expanded={open}
                    aria-label={open ? `Collapse ${f.title}` : `Expand ${f.title}`}
                    style={{
                      background: open ? 'var(--primary)' : 'transparent',
                      border: `1px solid ${open ? 'var(--primary)' : 'var(--line)'}`,
                      borderRadius: 999, width: 36, height: 36,
                      color: open ? '#fff' : 'var(--primary)',
                      display: 'grid', placeItems: 'center', flex: 'none',
                      transition: 'transform .25s ease, background .2s ease, color .2s ease',
                      transform: open ? 'rotate(45deg)' : 'rotate(0)',
                      cursor: 'pointer',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                  </button>
                </div>

                <p style={{ marginTop: 18, color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.6 }}>
                  {open ? f.body : f.summary}
                </p>

                {open && (
                  <>
                    <div className="svc-reveal-1" style={{ marginTop: 24, fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--accent)' }}>
                      Who this helps
                    </div>
                    <ul className="svc-reveal-2" style={{ margin: 0, marginTop: 14, padding: 0, listStyle: 'none', display: 'grid', gap: 10 }}>
                      {f.whoHelps.map((h, j) => (
                        <li key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          <span style={{ width: 18, height: 18, borderRadius: 6, background: 'rgba(200,164,93,.2)', display: 'grid', placeItems: 'center', color: 'var(--primary)', marginTop: 3, flex: 'none' }}>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M1 5l3 3 5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </span>
                          <span style={{ fontSize: 15 }}>{h}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="svc-reveal-3" style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <a className="btn btn-primary" href="/contact" style={{ padding: '12px 20px', fontSize: 14 }}>Schedule consultation</a>
                      <a className="btn btn-ghost" href="tel:9512990114" style={{ padding: '12px 0', fontSize: 14, color: 'var(--primary)' }}>or call 951-299-0114 →</a>
                    </div>
                  </>
                )}
              </div>

              {open && (
                <div className="svc-reveal-faq" style={{ background: 'var(--bg-alt)', borderRadius: 'var(--r-card)', padding: 24 }}>
                  <div style={{ fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--primary)' }}>
                    Common questions
                  </div>
                  <div style={{ marginTop: 8 }}>
                    {f.faqs.map((faq, k) => (
                      <details key={k} className="faq" style={{ borderColor: 'var(--line-soft)' }}>
                        <summary style={{ fontSize: 17 }}>
                          {faq.fields.question}
                          <span className="plus">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                          </span>
                        </summary>
                        <div className="ans" style={{ fontSize: 15 }}>{faq.fields.answer}</div>
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        );
      })}
      <style>{`
        @keyframes svcReveal {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes svcRevealSide {
          from { opacity: 0; transform: translateX(14px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .svc-reveal-1 { animation: svcReveal 0.3s ease both; }
        .svc-reveal-2 { animation: svcReveal 0.35s 0.06s ease both; }
        .svc-reveal-3 { animation: svcReveal 0.35s 0.12s ease both; }
        .svc-reveal-faq { animation: svcRevealSide 0.4s 0.05s ease both; }
        @media (prefers-reduced-motion: reduce) {
          .svc-reveal-1, .svc-reveal-2, .svc-reveal-3, .svc-reveal-faq { animation: none; }
        }
        @media (max-width: 880px) { .svc-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 900px) { .svc-open-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
