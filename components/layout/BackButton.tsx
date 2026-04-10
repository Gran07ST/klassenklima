"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
      <button
       onClick={() => router.back()}
       className="group inline-flex items-center gap-3 text-[#6b665f] hover:text-[#4a403a] transition-colors duration-300"
      >
       <svg
        className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
       >
         <path d="M 19 12 L 5 12" stroke="currentColor"/>
         <path d="M 10 7 L 5 12 L 10 17" stroke="currentColor"/>
       </svg>
       <span className="text-[#6b665f] text-sm font-normal">Zurück</span>
      </button>
  );
}
