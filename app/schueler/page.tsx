import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function SchuelerPage() {
  return (
     <div className="min-h-screen bg-[#faf9f6] text-[#2d2a26] flex flex-col">
        <Header
        title="Schülerbereich"
        subtitle="Dein Weg zu einem besseren Klassenklima"
          />

       <main className="flex-1 px-4 py-12">
         <div className="max-w-4xl mx-auto">
           {/* Welcome message */}
            <div className="text-center mb-12 md:mb-16">
              <h2
               className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-6"
               style={{ fontFamily: '"Playfair Display", serif' }}
               >
               Willkommen!
               </h2>
               <p className="text-[#6b665f] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
               Mache mit beim Fragebogen und erhalte personalisierte Tipps
               für dein Klassenklima.
               </p>
             </div>

             {/* Three main sections */}
             <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
               {/* Fragebogen Card */}
               <Link
               href="/schueler/fragebogen"
               className="group block bg-white border border-[#e8e5df] hover:border-[#d4d0c8] transition-all duration-500 rounded-3xl overflow-hidden"
               >
                 <div className="bg-[#f4f1ea] px-6 py-8 md:px-8 md:py-10">
                   <svg
                   viewBox="0 0 120 120"
                   className="w-20 h-20 md:w-24 md:h-24 mx-auto"
                   fill="none"
                   >
                     {/* Questionnaire/clipboard icon */}
                     <rect
                     x="30"
                     y="20"
                     width="60"
                     height="80"
                     rx="3"
                     stroke="#4a403a"
                     strokeWidth="1.5"
                     fill="none"
                     />
                     <path d="M 30 25 L 90 25" stroke="#4a403a" strokeWidth="1.5" />
                     <circle cx="40" cy="40" r="4" fill="#4a403a" />
                     <circle cx="40" cy="55" r="4" fill="#4a403a" />
                     <circle cx="40" cy="70" r="4" fill="#4a403a" />
                     <path d="M 50 40 L 80 40" stroke="#4a403a" strokeWidth="1" />
                     <path d="M 50 55 L 80 60" stroke="#4a403a" strokeWidth="1" />
                     <path d="M 50 70 L 75 75" stroke="#4a403a" strokeWidth="1" />
                   </svg>
                   <h3
                   className="text-lg md:text-xl font-light tracking-tight text-[#2d2a26] mt-4 md:mt-6 text-center"
                   style={{ fontFamily: '"Playfair Display", serif' }}
                   >
                   Fragebogen
                   </h3>
                 </div>
                 <div className="p-6 md:p-8">
                   <p className="text-[#6b665f] text-sm md:text-base leading-relaxed">
                   Beantworte einige Fragen über dein Klassenklima
                   </p>
                 </div>
               </Link>

               {/* Auswertung Card */}
               <Link
               href="/schueler/auswertung"
               className="group block bg-white border border-[#e8e5df] hover:border-[#d4d0c8] transition-all duration-500 rounded-3xl overflow-hidden"
               >
                 <div className="bg-[#f4f1ea] px-6 py-8 md:px-8 md:py-10">
                   <svg
                   viewBox="0 0 120 120"
                   className="w-20 h-20 md:w-24 md:h-24 mx-auto"
                   fill="none"
                   >
                     {/* Chart/pie chart icon */}
                     <circle
                     cx="60"
                     cy="60"
                     r="35"
                     stroke="#4a403a"
                     strokeWidth="1.5"
                     fill="none"
                     />
                     <path
                     d="M 60 60 L 60 25 A 35 35 0 0 1 92 60 Z"
                     stroke="#4a403a"
                     strokeWidth="1.5"
                     fill="none"
                     />
                     <path d="M 60 60 L 92 60" stroke="#4a403a" strokeWidth="1.5" />
                     <path
                     d="M 60 60 L 92 60 A 35 35 0 0 1 60 95 Z"
                     stroke="#4a403a"
                     strokeWidth="1.5"
                     fill="none"
                     />
                     <path d="M 60 60 L 60 95" stroke="#4a403a" strokeWidth="1.5" />
                   </svg>
                   <h3
                   className="text-lg md:text-xl font-light tracking-tight text-[#2d2a26] mt-4 md:mt-6 text-center"
                   style={{ fontFamily: '"Playfair Display", serif' }}
                   >
                   Auswertung
                   </h3>
                 </div>
                 <div className="p-6 md:p-8">
                   <p className="text-[#6b665f] text-sm md:text-base leading-relaxed">
                   Siehe deine Ergebnisse in einem Diagramm
                   </p>
                 </div>
               </Link>

               {/* Vorschlaege Card */}
               <Link
               href="/schueler/vorschlaege"
               className="group block bg-white border border-[#e8e5df] hover:border-[#d4d0c8] transition-all duration-500 rounded-3xl overflow-hidden"
               >
                 <div className="bg-[#f4f1ea] px-6 py-8 md:px-8 md:py-10">
                   <svg
                   viewBox="0 0 120 120"
                   className="w-20 h-20 md:w-24 md:h-24 mx-auto"
                   fill="none"
                   >
                     {/* Lightbulb icon */}
                     <path
                     d="M 50 45 C 50 30 70 30 70 45 C 70 55 65 60 60 65 C 55 60 50 55 50 45"
                     stroke="#4a403a"
                     strokeWidth="1.5"
                     fill="none"
                     />
                     <path
                     d="M 55 68 L 55 80 C 55 85 50 88 45 88 L 45 90 C 45 95 50 98 55 98 L 55 100 C 55 105 50 108 45 108 L 45 110 C 45 115 50 118 55 118 L 65 118 C 70 118 75 115 75 110 L 75 108 C 75 105 70 102 65 102 L 65 100 C 65 95 70 92 70 88 L 70 86 C 70 81 65 78 60 78 L 60 76 C 60 71 55 68 55 68"
                     stroke="#4a403a"
                     strokeWidth="1.5"
                     fill="none"
                     />
                     <path d="M 58 90 L 62 90" stroke="#4a403a" strokeWidth="1.5" />
                   </svg>
                   <h3
                   className="text-lg md:text-xl font-light tracking-tight text-[#2d2a26] mt-4 md:mt-6 text-center"
                   style={{ fontFamily: '"Playfair Display", serif' }}
                   >
                   Vorschläge
                   </h3>
                 </div>
                 <div className="p-6 md:p-8">
                   <p className="text-[#6b665f] text-sm md:text-base leading-relaxed">
                   Erhalte Tipps zur Verbesserung deines Klassenklimas
                   </p>
                 </div>
               </Link>
             </div>
           </div>
         </main>

        <Footer />
        </div>
      );
}
