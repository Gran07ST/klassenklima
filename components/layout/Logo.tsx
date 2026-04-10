import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <svg
        viewBox="45 8 71 37"
        fill="none"
        className="w-16 h-8"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Central figure */}
        <circle
          cx="80"
          cy="18"
          r="9"
          stroke="#4a403a"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 80 27 L 80 38"
          stroke="#4a403a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 80 29 L 66 36 L 80 43 L 94 36 L 80 29"
          stroke="#4a403a"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Left figure */}
        <circle
          cx="56"
          cy="20"
          r="7"
          stroke="#4a403a"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M 56 27 L 56 35"
          stroke="#4a403a"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M 56 28 L 46 34 L 56 39 L 66 34 L 56 28"
          stroke="#4a403a"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right figure */}
        <circle
          cx="104"
          cy="20"
          r="7"
          stroke="#4a403a"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M 104 27 L 104 35"
          stroke="#4a403a"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M 104 28 L 94 34 L 104 39 L 114 34 L 104 28"
          stroke="#4a403a"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Connection arc */}
        <path
          d="M 65 16 Q 80 24 95 16"
          stroke="#4a403a"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </Link>
  );
}
