"use client";

import { useState } from "react";
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

const alleZeiten: (ZeitBadge | "Alle")[] = [
  "Alle",
  "< 5 Min",
  "5–15 Min",
  "15–30 Min",
  "> 30 Min",
];

const alleAlters: (AlterBadge | "Alle")[] = [
  "Alle",
  "6–10 Jahre",
  "10–13 Jahre",
  "13–16 Jahre",
];

const alleSubthemen: (Subthema | "Alle")[] = [
  "Alle",
  "Empathie",
  "Kommunikation",
  "Teamfähigkeit",
  "Selbstregulation",
  "Konfliktlösung",
  "Soziale Kompetenz",
  "Selbstbewusstsein",
];

export default function UebungFilter({ uebungen, onFilterChange }: UebungFilterProps) {
  const [filter, setFilter] = useState<FilterState>({
    zeit: "Alle",
    alter: "Alle",
    subthema: "Alle",
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilter = { ...filter, [key]: value as FilterState[keyof FilterState] };
    setFilter(newFilter);

    const filtered = uebungen.filter((uebung) => {
      const zeitMatch = value === "Alle" || uebung.zeitBadge === value;
      const alterMatch =
        value === "Alle" || uebung.alterBadge.some((a) => a === value);
      const subthemaMatch =
        value === "Alle" || uebung.subthemaBadge.some((s) => s === value);
      return zeitMatch && alterMatch && subthemaMatch;
    });

    onFilterChange(filtered);
  };

  const activeCount = [
    filter.zeit !== "Alle",
    filter.alter !== "Alle",
    filter.subthema !== "Alle",
  ].filter(Boolean).length;

  return (
       <div className="mb-8">
         <div className="flex flex-wrap items-center gap-4">
           {/* Zeit Filter */}
           <div className="flex flex-wrap gap-2">
             {alleZeiten.map((zeit) => (
               <button
                key={zeit}
                onClick={() => handleFilterChange("zeit", zeit)}
                className={`px-4 py-2 text-sm border transition-all duration-300 ${
                  filter.zeit === zeit
                    ? "bg-[#4a403a] text-white border-[#4a403a]"
                    : "bg-white text-[#6b665f] border-[#e8e5df] hover:border-[#d4d0c8]"
                }`}
               >
                 {zeit}
               </button>
             ))}
           </div>

           {/* Alter Filter */}
           <div className="flex flex-wrap gap-2">
             {alleAlters.map((alter) => (
               <button
                key={alter}
                onClick={() => handleFilterChange("alter", alter)}
                className={`px-4 py-2 text-sm border transition-all duration-300 ${
                  filter.alter === alter
                    ? "bg-[#4a403a] text-white border-[#4a403a]"
                    : "bg-white text-[#6b665f] border-[#e8e5df] hover:border-[#d4d0c8]"
                }`}
               >
                 {alter}
               </button>
             ))}
           </div>

           {/* Subthema Filter */}
           <div className="flex flex-wrap gap-2">
             {alleSubthemen.map((subthema) => (
               <button
                key={subthema}
                onClick={() => handleFilterChange("subthema", subthema)}
                className={`px-4 py-2 text-sm border transition-all duration-300 ${
                  filter.subthema === subthema
                    ? "bg-[#4a403a] text-white border-[#4a403a]"
                    : "bg-white text-[#6b665f] border-[#e8e5df] hover:border-[#d4d0c8]"
                }`}
               >
                 {subthema}
               </button>
             ))}
           </div>

           {/* Active Filter Count */}
           {activeCount > 0 && (
             <div className="ml-auto text-[#8a847a] text-sm">
               {activeCount} Filter{activeCount > 1 ? "e" : ""} aktiv
             </div>
           )}
         </div>
       </div>
   );
}
