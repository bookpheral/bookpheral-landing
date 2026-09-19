"use client";

import { useEffect, useId, useState } from "react";
import { cn } from "@/components/ui";
import type { FaqCategory, FaqItem } from "@/content/faq";

type FAQProps = {
  items: FaqItem[];
  categories: { id: FaqCategory; label: string }[];
};

const groupId = (id: FaqCategory) => `faq-${id}`;

/**
 * FAQ grouped by category, with a sticky category index (scroll-spy) on
 * desktop and a horizontally scrolling chip row on mobile.
 */
export default function FAQ({ items, categories }: FAQProps) {
  const baseId = useId();
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(() => new Set(items[0] ? [items[0].question] : []));
  const [activeCategory, setActiveCategory] = useState<FaqCategory | undefined>(categories[0]?.id);

  const groups = categories
    .map((category) => ({ ...category, items: items.filter((item) => item.category === category.id) }))
    .filter((group) => group.items.length > 0);

  // Scroll-spy: highlight the category whose group is nearest the top of the viewport.
  useEffect(() => {
    const elements = categories
      .map((category) => document.getElementById(groupId(category.id)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveCategory(visible.target.id.replace("faq-", "") as FaqCategory);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [categories]);

  const toggle = (question: string) =>
    setOpenQuestions((current) => {
      const next = new Set(current);
      if (next.has(question)) next.delete(question);
      else next.add(question);
      return next;
    });

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
      {/* Category index */}
      <nav aria-label="FAQ categories" className="lg:col-span-4">
        {/* Mobile: chips */}
        <ul className="scrollbar-hide -mx-5 flex gap-2 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:hidden">
          {groups.map((group) => (
            <li key={group.id} className="shrink-0">
              <a
                href={`#${groupId(group.id)}`}
                className="inline-flex h-10 items-center rounded-full bg-white px-4 text-small font-medium text-ink-700 ring-1 ring-inset ring-ink-200 transition-colors hover:bg-ink-50"
              >
                {group.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop: sticky list */}
        <ul className="sticky top-28 hidden flex-col gap-1 lg:flex">
          {groups.map((group) => {
            const active = activeCategory === group.id;
            return (
              <li key={group.id}>
                <a
                  href={`#${groupId(group.id)}`}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "group flex items-center justify-between rounded-xl px-4 py-3 text-body transition-colors duration-200",
                    active ? "bg-white text-ink-950 shadow-soft ring-1 ring-ink-200" : "text-ink-500 hover:text-ink-950",
                  )}
                >
                  {group.label}
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-small tabular-nums transition-colors",
                      active ? "bg-primary-50 text-primary-600" : "bg-ink-100 text-ink-500",
                    )}
                  >
                    {group.items.length}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Groups */}
      <div className="flex flex-col gap-12 lg:col-span-8">
        {groups.map((group) => (
          <section key={group.id} id={groupId(group.id)} aria-labelledby={`${groupId(group.id)}-title`} className="scroll-mt-28">
            <h3 id={`${groupId(group.id)}-title`} className="mb-4 font-heading text-h4">
              {group.label}
            </h3>
            <div className="divide-y divide-ink-200 overflow-hidden rounded-card bg-white ring-1 ring-ink-200">
              {group.items.map((faq, i) => {
                const isOpen = openQuestions.has(faq.question);
                const panelId = `${baseId}-${group.id}-${i}`;
                return (
                  <div key={faq.question}>
                    <h4>
                      <button
                        type="button"
                        onClick={() => toggle(faq.question)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="group flex w-full items-center justify-between gap-6 px-5 py-5 text-left transition-colors hover:bg-ink-50 sm:px-6"
                      >
                        <span className="font-switzer text-body-lg font-medium text-ink-950">{faq.question}</span>
                        <span
                          aria-hidden
                          className={cn(
                            "relative flex size-8 shrink-0 items-center justify-center rounded-full ring-1 ring-inset transition-[background-color,box-shadow,transform] duration-300 ease-out-quint",
                            isOpen ? "rotate-45 bg-primary-500 ring-primary-500" : "bg-white ring-ink-200 group-hover:ring-ink-300",
                          )}
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={isOpen ? "text-white" : "text-ink-700"}>
                            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                          </svg>
                        </span>
                      </button>
                    </h4>
                    {/*
                      Height animates via grid-template-rows 0fr → 1fr (no JS measuring);
                      the content itself fades/slides with transform + opacity.
                    */}
                    <div
                      id={panelId}
                      role="region"
                      aria-hidden={!isOpen}
                      inert={!isOpen}
                      className={cn(
                        "grid transition-[grid-template-rows] duration-300 ease-out-quint",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <div className="overflow-hidden">
                        <div
                          className={cn(
                            "flex flex-col gap-3 px-5 pb-6 text-body text-ink-500 transition-[opacity,transform] duration-300 ease-out-quint sm:px-6 sm:pr-20",
                            isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
                          )}
                        >
                          {faq.answer.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
