import { brand, nav } from "@/lib/site";
import GrapeMark from "./GrapeMark";
import MotionToggle from "./MotionToggle";
import Wordmark from "./Wordmark";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline/12 py-14">
      <div className="shell">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-5">
            <GrapeMark className="mt-1 h-12 w-auto flex-none text-ink" />
            <span className="text-[2rem] text-ink">
              <Wordmark withDescriptor />
            </span>
          </div>

          <nav aria-label="Secções, rodapé">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3 lg:grid-cols-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-body text-muted transition-colors duration-200 hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-hairline/12 pt-6 text-body text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{brand.status}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <MotionToggle />
            <p>
              Um projeto {brand.owner}. {year}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
