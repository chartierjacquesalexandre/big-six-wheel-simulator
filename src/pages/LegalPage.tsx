import type { LegalPageContent } from "./legalPages";

type Props = {
  page: LegalPageContent;
};

export function LegalPage({ page }: Props) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <section className="panel">
        <p className="eyebrow">Site information</p>
        <h1 className="section-title">{page.title}</h1>
        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">{page.intro}</p>

        <div className="mt-8 space-y-7 text-sm leading-7 text-slate-300 sm:text-base">
          {page.sections.map((section) => (
            <article key={section.heading}>
              <h2 className="text-xl font-black text-white">{section.heading}</h2>
              <div className="mt-3 space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <a className="secondary-button mt-8" href="/">
          Back to simulator
        </a>
      </section>
    </main>
  );
}
