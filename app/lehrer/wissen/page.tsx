"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StatCard from "@/components/lehrer/StatCard";
import { StudienDaten } from "@/lib/types";

// Import data
import studienData from "@/data/studien.json";

export default function WissenPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const data = studienData as StudienDaten;

  return (
      <div className="min-h-screen bg-[#faf9f6] text-[#2d2a26] flex flex-col">
         <Header
        title="Wissen & Studien"
        subtitle="Forschungsergebnisse zum Klassenklima"
         />

        <main className="flex-1 px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto px-4">
            {/* Introduction */}
             <div className="mb-8 md:mb-12">
               <p className="text-[#6b665f] text-base md:text-lg leading-relaxed">
                 {data.einleitung}
               </p>
             </div>

            {/* Statistics Grid */}
             <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
               {data.statistiken.map((stat) => (
                 <StatCard
                key={stat.id}
                zahl={stat.zahl}
                aussage={stat.aussage}
                quelle={stat.quelle}
                details={stat.details}
                 />
               ))}
             </div>

            {/* Thematic Areas */}
             <h2
            className="text-xl md:text-2xl font-light tracking-tight mb-6 md:mb-8"
            style={{ fontFamily: '"Playfair Display", serif' }}
             >
               Themenbereiche
             </h2>

             <div className="space-y-6 md:space-y-8">
               {data.themenBereiche.map((thema, index) => (
                 <div
                key={index}
                className="border-b border-[#e8e5df] pb-6 md:pb-8 last:border-b-0"
                 >
                   <h3
                  className="text-lg md:text-xl font-light tracking-tight mb-3 md:mb-4"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                   >
                     {thema.titel}
                   </h3>
                   <p className="text-[#6b665f] leading-relaxed">
                     {thema.inhalt}
                   </p>

                   {/* Expandable details */}
                   <button
                  onClick={() => setExpanded(expanded === thema.titel ? null : thema.titel)}
                  className="mt-3 md:mt-4 group inline-flex items-center gap-2 text-[#6b665f] hover:text-[#4a403a] transition-colors duration-300"
                   >
                     <span className="text-xs md:text-sm font-normal">
                       {expanded === thema.titel ? "Weniger zeigen" : "Mehr erfahren"}
                     </span>
                     <svg
                    className="w-4 h-4 transition-transform duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                     >
                       <path d="M 6 9 L 12 15 L 18 9" stroke="currentColor" />
                     </svg>
                   </button>

                   {expanded === thema.titel && (
                     <div className="mt-4 ml-4 md:ml-6 border-l-2 border-[#e8e5df] pl-6 md:pl-8 animate-fade-in-up">
                       <p className="text-[#6b665f] leading-relaxed">
                         {thema.inhalt}
                       </p>
                     </div>
                   )}
                 </div>
               ))}
             </div>
          </div>
         </main>

         <Footer />
       </div>
  );
}
