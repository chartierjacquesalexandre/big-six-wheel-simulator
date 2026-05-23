import { legalPages } from "../pages/legalPages";

export function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 pb-8 pt-4 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
      <p>Big Six Wheel Simulator is an educational probability tool using virtual credits only.</p>
      <nav className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label="Footer">
        {legalPages.map((page) => (
          <a className="font-bold text-slate-400 transition hover:text-amber-300" href={page.path} key={page.slug}>
            {page.title}
          </a>
        ))}
      </nav>
    </footer>
  );
}
