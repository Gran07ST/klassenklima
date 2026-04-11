"use client";
import { useState, useRef, useEffect } from "react";
import { Uebung, ZeitBadge, AlterBadge, Subthema } from "@/lib/types";

interface UebungFilterProps {
  uebungen: Uebung[];
  onFilterChange: (filtered: Uebung[]) => void;
}

type FilterState = {
  zeit: ZeitBadge | "Alle";
  alter: AlterBadge | "Alle";
  subthema: Subthema | "Alle";
};

export default function UebungFilter({
  uebungen,
  onFilterChange,
}: UebungFilterProps) {
  const [filter, setFilter] = useState<FilterState>({
    zeit: "Alle",
    alter: "Alle",
    subthema: "Alle",
  });
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const alleZeiten = [...new Set(uebungen.map((u) => u.zeitBadge))];
  const alleAlters = [...new Set(uebungen.flatMap((u) => u.alterBadge))];
  const alleSubthemen = [...new Set(uebungen.flatMap((u) => u.subthemaBadge))];

  const activeCount = [filter.zeit, filter.alter, filter.subthema].filter(
    (v) => v !== "Alle",
  ).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const apply = (next: FilterState) => {
    setFilter(next);
    const filtered = uebungen.filter((u) => {
      const zeitMatch = next.zeit === "Alle" || u.zeitBadge === next.zeit;
      const alterMatch =
        next.alter === "Alle" ||
        u.alterBadge.includes(next.alter as AlterBadge);
      const subthemaMatch =
        next.subthema === "Alle" ||
        u.subthemaBadge.includes(next.subthema as Subthema);
      return zeitMatch && alterMatch && subthemaMatch;
    });
    onFilterChange(filtered);
  };

  const set = (key: keyof FilterState, value: string) =>
    apply({ ...filter, [key]: value });
  const reset = () => apply({ zeit: "Alle", alter: "Alle", subthema: "Alle" });

  const chipBase =
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-colors";
  const optBase =
    "px-2.5 py-1 rounded-full border text-sm cursor-pointer transition-colors";

  return (
    <div className="mb-8 flex items-center gap-2 flex-wrap">
      {/* Filter trigger */}
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen((o) => !o)}
          className={`${chipBase} gap-2 cursor-pointer ${
            activeCount > 0
              ? "border-accent text-accent"
              : "border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <line x1="2" y1="4" x2="12" y2="4" />
            <line x1="4" y1="7" x2="10" y2="7" />
            <line x1="6" y1="10" x2="8" y2="10" />
          </svg>
          Filter
          {activeCount > 0 && (
            <span className="bg-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
              {activeCount}
            </span>
          )}
        </button>

        {open && (
          <div className="absolute top-full mt-1.5 left-0 z-20 bg-white border border-gray-200 rounded-xl shadow-sm p-4 w-72">
            {[
              { key: "zeit" as const, label: "Zeit", options: alleZeiten },
              { key: "alter" as const, label: "Alter", options: alleAlters },
              {
                key: "subthema" as const,
                label: "Subthema",
                options: alleSubthemen,
              },
            ].map(({ key, label, options }) => (
              <div key={key} className="mb-4 last:mb-0">
                <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2">
                  {label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(["Alle", ...options] as string[]).map((v) => (
                    <button
                      key={v}
                      onClick={() => set(key, v)}
                      className={`${optBase} ${
                        filter[key] === v
                          ? "bg-accent/10 border-accent/40 text-accent"
                          : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between items-center">
              <button
                onClick={reset}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                Zurücksetzen
              </button>
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-1.5 bg-accent text-white text-sm rounded-full hover:opacity-90 transition-opacity"
              >
                Anwenden
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Active filter chips */}
      {(["zeit", "alter", "subthema"] as (keyof FilterState)[]).map((key) =>
        filter[key] !== "Alle" ? (
          <span
            key={key}
            className={`${chipBase} border-gray-300 text-gray-700 bg-gray-50`}
          >
            {filter[key]}
            <button
              onClick={() => set(key, "Alle")}
              className="text-gray-400 hover:text-gray-600 leading-none text-base"
              aria-label="Entfernen"
            >
              ×
            </button>
          </span>
        ) : null,
      )}
    </div>
  );
}
