import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#2d2a26] flex flex-col">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#000"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Header */}
      <header className="relative pt-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6 animate-fade-in-up"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Schulklima
          </h1>
          <p
            className="text-lg md:text-xl  font-normal leading-relaxed animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            Eine kleine App für ein grosses Thema
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full">
          {/* Welcome Message */}
          <div className="text-center mb-16 md:mb-20">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-6 animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              Wer bist du?
            </h2>
            <p className=" text-base md:text-lg font-normal animate-fade-in">
              Wähle deine Rolle
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Teacher Card */}
            <Link
              href="/lehrer"
              className="group block bg-white border border-[#e8e5df] hover:border-accent transition-all duration-500 animate-fade-in-up rounded-3xl overflow-hidden"
              style={{ animationDelay: "300ms" }}
            >
              <div className="bg-[#f4f1ea] border-b border-[#e8e5df] px-6 py-8 md:px-8 md:py-12">
                {/* Hand-drawn teacher SVG */}
                <svg
                  viewBox="0 0 120 120"
                  className="w-20 h-20 md:w-24 md:h-24 mx-auto"
                  fill="none"
                >
                  {/* Head */}
                  <ellipse
                    cx="60"
                    cy="45"
                    rx="18"
                    ry="22"
                    stroke="#4a403a"
                    strokeWidth="1.5"
                    fill="#faf9f6"
                  />
                  {/* Body */}
                  <path
                    d="M 42 70 L 42 95 L 78 95 L 78 70"
                    stroke="#4a403a"
                    strokeWidth="1.5"
                    fill="#faf9f6"
                  />
                  {/* Arms */}
                  <path
                    d="M 42 72 L 30 82"
                    stroke="#4a403a"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M 78 72 L 90 82"
                    stroke="#4a403a"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  {/* Legs */}
                  <path
                    d="M 50 95 L 48 110"
                    stroke="#4a403a"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M 70 95 L 72 110"
                    stroke="#4a403a"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  {/* Book */}
                  <rect
                    x="35"
                    y="80"
                    width="24"
                    height="18"
                    rx="1"
                    stroke="#4a403a"
                    strokeWidth="1.5"
                    fill="#f0ede6"
                  />
                  <path
                    d="M 42 84 L 52 84"
                    stroke="#4a403a"
                    strokeWidth="0.8"
                  />
                  <path
                    d="M 42 89 L 50 89"
                    stroke="#4a403a"
                    strokeWidth="0.8"
                  />
                  {/* Book lines */}
                  <path
                    d="M 58 80 L 58 98"
                    stroke="#4a403a"
                    strokeWidth="0.8"
                  />
                </svg>
                <h3
                  className="text-xl md:text-2xl font-light tracking-tight text-[#2d2a26] mt-4 md:mt-6 text-center"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  Lehrperson
                </h3>
              </div>
              <div className="p-6 md:p-8">
                <p className="mb-4 md:mb-6 leading-relaxed">
                  Übungen und Studien zum Schulklima entdecken
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-[#b8afa7]">▸</span>
                    Übungskatalog
                  </div>
                  <div className="flex items-center gap-3  text-sm">
                    <span className="text-[#b8afa7]">▸</span>
                    Wissenswertes
                  </div>
                </div>
              </div>
            </Link>

            {/* Student Card */}
            <Link
              href="/schueler"
              className="group block bg-white border border-[#e8e5df] hover:border-accent transition-all duration-500 animate-fade-in-up rounded-3xl overflow-hidden"
              style={{ animationDelay: "400ms" }}
            >
              <div className="bg-[#f4f1ea] border-b border-[#e8e5df] px-6 py-8 md:px-8 md:py-12">
                {/* Hand-drawn student SVG */}
                <svg
                  viewBox="0 0 120 120"
                  className="w-20 h-20 md:w-24 md:h-24 mx-auto"
                  fill="none"
                >
                  {/* Head */}
                  <ellipse
                    cx="60"
                    cy="40"
                    rx="16"
                    ry="20"
                    stroke="#4a403a"
                    strokeWidth="1.5"
                    fill="#faf9f6"
                  />
                  {/* Body */}
                  <path
                    d="M 45 65 L 45 88 L 75 88 L 75 65"
                    stroke="#4a403a"
                    strokeWidth="1.5"
                    fill="#faf9f6"
                  />
                  {/* Arms */}
                  <path
                    d="M 45 68 L 32 78"
                    stroke="#4a403a"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M 75 68 L 88 78"
                    stroke="#4a403a"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  {/* Legs */}
                  <path
                    d="M 52 88 L 50 105"
                    stroke="#4a403a"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M 68 88 L 70 105"
                    stroke="#4a403a"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  {/* Backpack */}
                  <rect
                    x="48"
                    y="50"
                    width="24"
                    height="22"
                    rx="2"
                    stroke="#4a403a"
                    strokeWidth="1.5"
                    fill="#f0ede6"
                  />
                  <circle
                    cx="52"
                    cy="61"
                    r="1.5"
                    stroke="#4a403a"
                    strokeWidth="1"
                  />
                  <circle
                    cx="68"
                    cy="61"
                    r="1.5"
                    stroke="#4a403a"
                    strokeWidth="1"
                  />
                </svg>
                <h3
                  className="text-xl md:text-2xl font-light tracking-tight text-[#2d2a26] mt-4 md:mt-6 text-center"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  Schüler:in
                </h3>
              </div>
              <div className="p-6 md:p-8">
                <p className=" mb-4 md:mb-6 leading-relaxed">
                  Fragebogen ausfüllen und Tipps erhalten
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3  text-sm">
                    <span className="text-[#b8afa7]">▸</span>
                    Fragebogen
                  </div>
                  <div className="flex items-center gap-3  text-sm">
                    <span className="text-[#b8afa7]">▸</span>
                    Auswertung
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-[#b8afa7]">▸</span>
                    Anregungen
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
