import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Link from "next/link";

export default function LehrerPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#2d2a26] flex flex-col">
      <Header
        title="Lehrerbereich"
        subtitle="Übungen und Studien für ein positives Klassenklima"
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
              Hier findest du Übungen für den Unterricht und interessante
              Studien zum Thema Klassenklima.
            </p>
          </div>

          {/* Two main sections */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 max-w-3xl mx-auto">
            {/* Wissen Card */}
            <Link
              href="/lehrer/wissen"
              className="group block bg-white border border-[#e8e5df] hover:border-[#d4d0c8] transition-all duration-500 rounded-3xl overflow-hidden"
            >
              <div className="bg-[#f4f1ea] px-6 py-8 md:px-8 md:py-10">
                <svg
                  viewBox="0 0 120 120"
                  className="w-20 h-20 md:w-24 md:h-24 mx-auto"
                  fill="none"
                >
                  {/* Book icon */}
                  <path
                    d="M 30 20 L 30 100 C 30 105 35 110 40 110 L 80 110 C 85 110 90 105 90 100 L 90 20 C 90 15 85 10 80 10 L 40 10 C 35 10 30 15 30 20"
                    stroke="#4a403a"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M 40 30 L 80 30"
                    stroke="#4a403a"
                    strokeWidth="0.8"
                  />
                  <path
                    d="M 40 40 L 80 40"
                    stroke="#4a403a"
                    strokeWidth="0.8"
                  />
                  <path
                    d="M 40 50 L 60 50"
                    stroke="#4a403a"
                    strokeWidth="0.8"
                  />
                </svg>
                <h3
                  className="text-lg md:text-xl font-light tracking-tight text-[#2d2a26] mt-4 md:mt-6 text-center"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  Wissen & Studien
                </h3>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-[#6b665f] text-sm md:text-base leading-relaxed">
                  Entdecke Studien und Fakten zum Thema Klassenklima
                </p>
              </div>
            </Link>

            {/* Übungen Card */}
            <Link
              href="/lehrer/uebungen"
              className="group block bg-white border border-[#e8e5df] hover:border-[#d4d0c8] transition-all duration-500 rounded-3xl overflow-hidden"
            >
              <div className="bg-[#f4f1ea] px-6 py-8 md:px-8 md:py-10">
                <svg
                  viewBox="0 0 120 120"
                  className="w-20 h-20 md:w-24 md:h-24 mx-auto"
                  fill="none"
                >
                  {/* Exercise/clipboard icon */}
                  <rect
                    x="35"
                    y="20"
                    width="50"
                    height="90"
                    rx="3"
                    stroke="#4a403a"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M 35 25 L 85 25"
                    stroke="#4a403a"
                    strokeWidth="1.5"
                  />
                  <circle cx="45" cy="40" r="3" fill="#4a403a" />
                  <circle cx="55" cy="40" r="3" fill="#4a403a" />
                  <circle cx="65" cy="40" r="3" fill="#4a403a" />
                  <path d="M 45 55 L 70 55" stroke="#4a403a" strokeWidth="1" />
                  <path d="M 45 65 L 70 65" stroke="#4a403a" strokeWidth="1" />
                  <path d="M 45 75 L 65 75" stroke="#4a403a" strokeWidth="1" />
                </svg>
                <h3
                  className="text-lg md:text-xl font-light tracking-tight text-[#2d2a26] mt-4 md:mt-6 text-center"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  Übungen
                </h3>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-[#6b665f] text-sm md:text-base leading-relaxed">
                  Finde passende Übungen für deine Klasse
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
