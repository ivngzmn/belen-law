import { createClient } from 'contentful';

// ── Types matching the Contentful content model ──────────────────────────────

export interface ServiceFaqFields {
  question: string;
  answer: string;
}

export interface ServiceFields {
  title: string;
  slug: string;
  /** One of: immigration | humanitarian | removal | family | consular | estate */
  iconKey: string;
  summary: string;
  body: string;
  whoHelps: string[];
  faqs: Array<{ fields: ServiceFaqFields }>;
  order: number;
}

export interface ContentfulService {
  sys: { id: string };
  fields: ServiceFields;
}

// ── Fallback data — used when Contentful credentials are absent ───────────────

export const FALLBACK_SERVICES: ContentfulService[] = [
  {
    sys: { id: '1' },
    fields: {
      title: 'Immigration',
      slug: 'immigration',
      iconKey: 'immigration',
      summary: 'Visas, residency, citizenship, work authorization, and the path that fits your story.',
      body: 'Immigration law can feel overwhelming. Our office helps individuals and families understand their options, prepare strong applications, and move forward with dignity and confidence. We handle adjustment of status, naturalization, employment authorization, and the close, ongoing work of guiding a case through USCIS.',
      whoHelps: [
        'Lawful permanent residents pursuing citizenship',
        'Spouses & families adjusting status in the U.S.',
        'Clients seeking or renewing work authorization',
        'Long-term residents weighing next steps',
      ],
      faqs: [
        { fields: { question: 'Do I qualify to adjust status in the U.S.?', answer: 'Eligibility depends on how you entered the country, family relationships, current status, and any prior immigration history. We review your full record before recommending a path.' } },
        { fields: { question: 'How long does naturalization take?', answer: 'Timelines vary by field office and case complexity. We give you a realistic range during your consultation, and keep you updated as the case progresses.' } },
        { fields: { question: 'Can I work while my case is pending?', answer: 'In many cases, yes — through an Employment Authorization Document (EAD). We file and track these alongside the underlying case.' } },
      ],
      order: 1,
    },
  },
  {
    sys: { id: '2' },
    fields: {
      title: 'Humanitarian Visas & U Visas',
      slug: 'humanitarian-visas-u-visas',
      iconKey: 'humanitarian',
      summary: 'Compassionate representation for survivors of crime, abuse, and trafficking.',
      body: 'For survivors of crime, abuse, trafficking, or violence, immigration relief may provide a path toward safety and stability. Our office provides compassionate guidance through humanitarian visa options, including U Visas, T Visas, and VAWA-related matters — always with care for what each client has already carried.',
      whoHelps: [
        'Survivors of qualifying crimes seeking U Visas',
        'Survivors of trafficking seeking T Visas',
        'Self-petitioners under VAWA',
        'Family members of qualifying survivors',
      ],
      faqs: [
        { fields: { question: 'What qualifies as a U Visa crime?', answer: 'A specific list of serious crimes — including domestic violence, sexual assault, felonious assault, and others. We help you confirm eligibility and gather law-enforcement certification.' } },
        { fields: { question: 'Will my abuser know I filed?', answer: 'VAWA self-petitions are confidential. We explain in detail how your information is protected.' } },
        { fields: { question: 'How long is the wait?', answer: 'U Visa wait times are long and continue to evolve. We are honest about the timeline and what relief is available in the meantime.' } },
      ],
      order: 2,
    },
  },
  {
    sys: { id: '3' },
    fields: {
      title: 'Removal Proceedings',
      slug: 'removal-proceedings',
      iconKey: 'removal',
      summary: 'Steady, prepared defense in immigration court.',
      body: 'Facing removal proceedings can be stressful and time-sensitive. Our office helps clients understand their rights, prepare their defense, and navigate the immigration court process with careful, informed representation — including bond hearings, master calendar hearings, and individual merits hearings.',
      whoHelps: [
        'Individuals placed in removal proceedings',
        'Detained respondents seeking bond',
        'Clients facing prior orders of removal',
        'Asylum-seekers in court',
      ],
      faqs: [
        { fields: { question: 'I received a Notice to Appear — what do I do?', answer: 'Contact our office promptly. Deadlines in immigration court are unforgiving, and many forms of relief require an early decision.' } },
        { fields: { question: 'Can I be released from detention?', answer: 'In many cases, yes. We pursue bond hearings and prepare the documentation and witnesses needed to make a strong case.' } },
        { fields: { question: 'What forms of relief are possible?', answer: 'Cancellation of removal, asylum, adjustment, voluntary departure, and others. The right path depends on your full record.' } },
      ],
      order: 3,
    },
  },
  {
    sys: { id: '4' },
    fields: {
      title: 'Family Visa Petitions',
      slug: 'family-visa-petitions',
      iconKey: 'family',
      summary: 'Bringing loved ones together through lawful immigration pathways.',
      body: 'Family immigration matters are deeply personal. We help families prepare petitions for spouses, children, parents, and siblings — and walk through the long stretches of waiting, evidence, and follow-up that family-based cases require.',
      whoHelps: [
        'U.S. citizens petitioning immediate relatives',
        'Lawful permanent residents petitioning family',
        'Fiancé(e) visa petitioners',
        'Families navigating priority dates',
      ],
      faqs: [
        { fields: { question: 'How long will my family member\'s case take?', answer: 'It depends on the relationship and current visa-bulletin movement. We explain your priority date and give you a realistic range.' } },
        { fields: { question: 'What documents do I need?', answer: 'Civil records, identity documents, financial records, and supporting evidence of the relationship. We provide a clear, organized checklist.' } },
        { fields: { question: 'Can my family member work while waiting?', answer: 'In some pathways, yes. We confirm what is and is not allowed for your specific case.' } },
      ],
      order: 4,
    },
  },
  {
    sys: { id: '5' },
    fields: {
      title: 'Consular Process',
      slug: 'consular-process',
      iconKey: 'consular',
      summary: 'Preparation, documentation, and clarity for overseas interviews.',
      body: 'The consular process can involve important decisions and risks, especially when a waiver may be required. Our office helps clients prepare for overseas interviews, understand required documentation, and approach the process with full information about possible outcomes.',
      whoHelps: [
        'Spouses and family members processing abroad',
        'Clients requiring provisional unlawful-presence waivers',
        'Returning residents and re-entry cases',
        'Mixed-status families weighing options',
      ],
      faqs: [
        { fields: { question: 'Do I need a waiver before leaving the U.S.?', answer: 'Many clients do. We evaluate prior immigration history before recommending any departure for consular processing.' } },
        { fields: { question: 'What happens at the interview?', answer: 'We prepare you in detail — likely questions, document order, follow-up requests, and what to do if something goes wrong.' } },
        { fields: { question: 'What if my case is denied abroad?', answer: 'There are options. We discuss next steps and how to respond effectively.' } },
      ],
      order: 5,
    },
  },
  {
    sys: { id: '6' },
    fields: {
      title: 'Estate Planning',
      slug: 'estate-planning',
      iconKey: 'estate',
      summary: 'Wills, trusts, and planning to safeguard what your family has built.',
      body: 'Estate planning helps families protect what they have built. Our office helps clients prepare wills, trusts, and planning documents designed to safeguard loved ones and honor their wishes — including planning for mixed-status families where care, documentation, and clarity matter most.',
      whoHelps: [
        'Families planning wills and trusts',
        'Parents naming guardians for minor children',
        'Mixed-status families coordinating estate documents',
        'Property owners structuring transfers',
      ],
      faqs: [
        { fields: { question: 'Do I need a trust or just a will?', answer: 'It depends on your assets, family structure, and goals. We walk through both, with the trade-offs in plain language.' } },
        { fields: { question: 'Can you coordinate with my immigration matter?', answer: 'Yes. Estate documents can be designed with the realities of mixed-status families in mind.' } },
        { fields: { question: 'Are documents available in Spanish?', answer: 'Conversations and supporting summaries are available in Spanish. Final instruments follow California legal requirements.' } },
      ],
      order: 6,
    },
  },
];

// ── Client factory — gracefully handles missing credentials ──────────────────

function makeClient() {
  const spaceId = import.meta.env.CONTENTFUL_SPACE_ID;
  const accessToken = import.meta.env.CONTENTFUL_ACCESS_TOKEN;
  if (!spaceId || !accessToken) return null;
  return createClient({ space: spaceId, accessToken });
}

export async function getServices(): Promise<ContentfulService[]> {
  const client = makeClient();
  if (!client) return FALLBACK_SERVICES;

  try {
    const res = await client.getEntries<any>({
      content_type: 'service',
      order: ['fields.order'],
      include: 2,
    });
    return res.items as unknown as ContentfulService[];
  } catch {
    console.warn('[contentful] Failed to fetch services — using fallback data');
    return FALLBACK_SERVICES;
  }
}

export async function getServiceBySlug(slug: string): Promise<ContentfulService | undefined> {
  const services = await getServices();
  return services.find((s) => s.fields.slug === slug);
}
