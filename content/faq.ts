import {
  EDUCATOR_REVENUE_SHARE,
  FEC_PRODUCTION_DISCOUNT_PERCENT,
  FEC_SEAT_LIMIT,
  PLATFORM_REVENUE_SHARE,
  PRODUCTION_SAVING_PERCENT,
  fecDeadlineLabel,
  fecDeadlineShortLabel,
  fecDeadlineTimeLabel,
  launchDateLabel,
} from "@/lib/site-config";

export type FaqCategory = "getting-started" | "production" | "earnings" | "protection" | "institutions" | "fec";

export const faqCategories: { id: FaqCategory; label: string }[] = [
  { id: "getting-started", label: "Getting started" },
  { id: "production", label: "Production" },
  { id: "earnings", label: "Earnings & rights" },
  { id: "protection", label: "Protection & sales" },
  { id: "institutions", label: "Institutions" },
  { id: "fec", label: "Founding Educators Circle" },
];

export type FaqItem = {
  category: FaqCategory;
  question: string;
  /** One entry per paragraph. */
  answer: string[];
};

// Source: "Bookpheral Website Copy.docx" — Contact page FAQ.
export const faqs: FaqItem[] = [
  {
    category: "getting-started",
    question: "Can I use Bookpheral if my book has already been published?",
    answer: [
      "Yes, provided you have the right to distribute the book through Bookpheral and the title meets our quality and technical requirements.",
    ],
  },
  {
    category: "getting-started",
    question: "Do I have to publish through Bookpheral before I can distribute my book there?",
    answer: [
      "No. Bookpheral is primarily a distribution platform. If your book has already been professionally produced, you can submit it directly for assessment and distribution.",
      "If it still needs professional work, you can access production support through the Bookpheral ecosystem before distribution.",
    ],
  },
  {
    category: "getting-started",
    question: "Can I use Bookpheral only for distribution?",
    answer: [
      "Yes. You do not have to use Bookpheral’s production services if your book is already ready for distribution.",
    ],
  },
  {
    category: "production",
    question: "Can I use my own editor, designer, or formatter?",
    answer: [
      "Yes. You are free to produce your book independently.",
      "Before distribution, however, the finished book will still need to meet Bookpheral’s quality and technical requirements.",
    ],
  },
  {
    category: "production",
    question: "What if some parts of my manuscript have already been professionally completed?",
    answer: [
      "That is fine. Production support is based on what the manuscript actually needs.",
      "If your editing is complete but you still need cover design and digital formatting, for example, the assessment can take that into account.",
    ],
  },
  {
    category: "getting-started",
    question: "Does Bookpheral accept every manuscript for distribution?",
    answer: [
      "No. Books and manuscripts are assessed before production or distribution.",
      "Bookpheral needs to be satisfied that a title is suitable for the platform and can meet the required production and quality standards.",
    ],
  },
  {
    category: "production",
    question: "Does Bookpheral produce technical books?",
    answer: [
      "Yes. Bookpheral can support educational books containing elements such as tables, figures, equations, and specialist formatting.",
      "Technical complexity may affect the production requirements and final quotation.",
    ],
  },
  {
    category: "getting-started",
    question: "Can I distribute just one book?",
    answer: [
      "Yes. You do not need a catalogue of titles to use Bookpheral.",
    ],
  },
  {
    category: "production",
    question: "How is my production cost determined?",
    answer: [
      "There is no fixed production price for every manuscript.",
      "The cost depends on what the book requires, including its length, level of editing, layout, technical complexity, tables, figures, equations, formatting needs, and other production requirements.",
      "After assessment, you receive one production quote covering the services required.",
    ],
  },
  {
    category: "production",
    question: `Is the production discount always ${PRODUCTION_SAVING_PERCENT}%?`,
    answer: [
      `Bookpheral can help educators save up to ${PRODUCTION_SAVING_PERCENT}% on standard professional production costs.`,
      "The exact saving depends on the requirements of the individual manuscript and the services involved.",
    ],
  },
  {
    category: "production",
    question: "What happens if my manuscript needs more work than I expected?",
    answer: [
      "The manuscript is assessed before production begins so that the required work can be identified and reflected in the quotation.",
      "Where additional issues emerge during production, they should be discussed with the educator before any material change to the agreed scope or cost.",
    ],
  },
  {
    category: "production",
    question: "What happens when production is complete?",
    answer: [
      "Once the book has been completed and meets Bookpheral’s requirements, it can proceed into the standard Bookpheral distribution model.",
    ],
  },
  {
    category: "earnings",
    question: "Does Bookpheral own my book?",
    answer: [
      "No.",
      "Your underlying intellectual property remains separate from the distribution arrangement. Bookpheral receives the rights necessary to distribute the title under the terms of the applicable agreement, but ownership of the work remains with the educator.",
    ],
  },
  {
    category: "earnings",
    question: "How much do I earn from each sale?",
    answer: [
      `Educators receive ${EDUCATOR_REVENUE_SHARE}% of net distributable revenue, while Bookpheral receives ${PLATFORM_REVENUE_SHARE}%.`,
    ],
  },
  {
    category: "earnings",
    question: "What does “net distributable revenue” mean?",
    answer: [
      "It is the amount available for revenue sharing after applicable deductions such as taxes, payment-processing charges, refunds, and necessary third-party transaction costs.",
      "The applicable distribution agreement will state these deductions clearly.",
    ],
  },
  {
    category: "earnings",
    question: `Are production fees taken from my ${EDUCATOR_REVENUE_SHARE}% revenue share?`,
    answer: [
      "No.",
      "Production fees and distribution revenue sharing are separate.",
      `Where production is required, the agreed production fee covers the professional work needed to prepare the book. Once the title enters distribution, the standard ${EDUCATOR_REVENUE_SHARE}/${PLATFORM_REVENUE_SHARE} revenue model applies.`,
    ],
  },
  {
    category: "earnings",
    question: "Can I withdraw my book from Bookpheral later?",
    answer: [
      "Yes. Distribution agreements will include terms covering withdrawal, termination, and any applicable notice period.",
      "The precise process will be set out in the agreement you enter into with Bookpheral.",
    ],
  },
  {
    category: "earnings",
    question: "Can I sell my book elsewhere while it is on Bookpheral?",
    answer: [
      "Bookpheral’s model does not depend on taking ownership of your work. Any restrictions relating to other distribution channels would need to be stated expressly in the applicable distribution agreement.",
    ],
  },
  {
    category: "earnings",
    question: "What happens when a customer receives a refund?",
    answer: [
      "Refunds are treated as part of the calculation of net distributable revenue and may therefore affect the amount available for revenue sharing.",
    ],
  },
  {
    category: "earnings",
    question: "Will I be able to see how my book is performing?",
    answer: [
      "Bookpheral’s distribution service includes sales administration and reporting, so educators can track the commercial performance of their titles.",
    ],
  },
  {
    category: "protection",
    question: "Can Bookpheral completely stop piracy?",
    answer: [
      "No.",
      "No distribution system can realistically guarantee that piracy will disappear entirely.",
      "Bookpheral’s approach is to reduce unnecessary leakage by providing controlled digital access instead of circulating unrestricted files that can easily be forwarded, uploaded, or reproduced.",
    ],
  },
  {
    category: "protection",
    question: "What happens if my book is still pirated?",
    answer: [
      "Protected distribution reduces the risk of casual copying and uncontrolled circulation, but it cannot eliminate deliberate piracy.",
      "Bookpheral’s focus is therefore on giving educators greater control over legitimate distribution and making authorized access a more practical alternative to informal sharing.",
    ],
  },
  {
    category: "protection",
    question: "What does “controlled digital access” mean?",
    answer: [
      "It means readers access educational content through an authorized Bookpheral environment rather than receiving an unrestricted digital file that can simply be forwarded to other people.",
      "The goal is to protect the educator’s work without making legitimate access unnecessarily difficult.",
    ],
  },
  {
    category: "protection",
    question: "Does Bookpheral guarantee sales?",
    answer: [
      "No.",
      "Bookpheral can improve distribution, discoverability, and marketing support, but no legitimate platform can guarantee how many copies a particular book will sell.",
      "Performance will depend on factors such as the title, audience, relevance, pricing, existing demand, and the effectiveness of promotional activity.",
    ],
  },
  {
    category: "protection",
    question: "What if I already have my own audience?",
    answer: [
      "That can be an advantage.",
      "Many educators already have potential readers through their students, institutions, professional networks, or training communities. Bookpheral can provide a more structured and secure way to serve that audience while also creating opportunities for wider discovery.",
    ],
  },
  {
    category: "protection",
    question: "Can Bookpheral help my book reach people outside my institution?",
    answer: [
      "Yes.",
      "Depending on specific author-platform arrangements, Bookpheral may support visibility through social media, email marketing, and other relevant promotional channels.",
    ],
  },
  {
    category: "institutions",
    question: "Can universities, departments, schools, or professional bodies use Bookpheral?",
    answer: [
      "Yes.",
      "Bookpheral is open to institutional relationships with universities, schools, departments, professional associations, research organizations, and training bodies interested in improving how educator-created content is distributed.",
    ],
  },
  {
    category: "institutions",
    question: "Can an institution distribute materials without individual lecturers selling directly to students?",
    answer: [
      "Yes. Bookpheral’s model can support institutional distribution arrangements as well as distribution by individual educators.",
      "The exact arrangement would depend on the institution and the nature of the materials involved.",
    ],
  },
  {
    category: "institutions",
    question: "Does Bookpheral allow lecturers to force students to buy their books?",
    answer: [
      "Bookpheral supports educators earning from their intellectual work, but not at the expense of student fairness.",
      "Where materials are distributed to students, adoption should remain consistent with institutional policies and academic standards. Bookpheral does not support tying the purchase of a book to grades, assessment outcomes, or preferential treatment.",
    ],
  },
  {
    category: "fec",
    question: `What happens if all ${FEC_SEAT_LIMIT} Founding Educator places are filled before ${fecDeadlineShortLabel}?`,
    answer: [
      `Registration for the Founding Educators Circle will close as soon as all ${FEC_SEAT_LIMIT} places are filled.`,
      "You will still be able to use Bookpheral after that, but the lifetime Founding Educator privileges may no longer be available.",
    ],
  },
  {
    category: "fec",
    question: "Can I still join Bookpheral after the Founding Educators Circle closes?",
    answer: [
      "Yes.",
      "The Founding Educators Circle is an early-membership program, not a requirement for using Bookpheral.",
      `Bookpheral launches on ${launchDateLabel}, and educators will still be able to access its standard services after the FEC closes.`,
    ],
  },
  {
    category: "fec",
    question: `Does every Founding Educator automatically receive ${FEC_PRODUCTION_DISCOUNT_PERCENT}% off production?`,
    answer: [
      `The benefit is up to ${FEC_PRODUCTION_DISCOUNT_PERCENT}% off the professional production cost of one eligible book per benefit year.`,
      "The exact benefit depends on the manuscript assessment and the production services required.",
    ],
  },
  {
    category: "fec",
    question: "What is a benefit year?",
    answer: [
      "A benefit year is the annual period during which a Founding Educator may use the enhanced production benefit for one eligible book.",
      "The benefit applies once during that period and does not accumulate if unused.",
    ],
  },
  {
    category: "fec",
    question: "Can I save an unused production benefit for the following year?",
    answer: [
      "No.",
      "If the benefit is not used within the applicable benefit year, it expires. A new benefit becomes available for the following benefit year.",
    ],
  },
  {
    category: "fec",
    question: "Does joining the FEC change my revenue share?",
    answer: [
      "No.",
      `Founding Educators still use Bookpheral’s standard ${EDUCATOR_REVENUE_SHARE}% educator / ${PLATFORM_REVENUE_SHARE}% Bookpheral distribution model.`,
      "The FEC production benefit and other founding privileges are additional advantages.",
    ],
  },
  {
    category: "fec",
    question: "Do I need to have a completed book before joining the FEC?",
    answer: [
      "No.",
      "You may join with a completed book, a manuscript in development, or a serious educational book project you intend to bring to market.",
    ],
  },
  {
    category: "fec",
    question: "When does FEC registration close?",
    answer: [
      `Registration closes at ${fecDeadlineTimeLabel} on ${fecDeadlineLabel}, or earlier if all ${FEC_SEAT_LIMIT} places are filled. Bookpheral launches on ${launchDateLabel}.`,
    ],
  },
];
