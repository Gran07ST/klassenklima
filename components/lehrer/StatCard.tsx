import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface StatCardProps {
  zahl: string;
  aussage: string;
  quelle: string;
  details: string;
}

export default function StatCard({
  zahl,
  aussage,
  quelle,
  details,
}: StatCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="border border-accent">
      <CardContent className="p-8">
        <div className="flex flex-col items-start">
          {/* Large number */}
          <div
            className="text-accent text-5xl font-light mb-4"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            {zahl}
          </div>
          {/* Statement */}
          <p className="text-lg leading-relaxed mb-4">{aussage}</p>
          {/* Source */}
          <div
            className="flex items-center gap-2 text-[#8a847a] text-sm cursor-pointer"
            onClick={() => setShowDetails(!showDetails)}
          >
            <span
              className={`transition-transform duration-300 ${showDetails ? "rotate-90" : "rotate-0"}`}
            >
              ▹
            </span>
            <span>{quelle}</span>
          </div>
        </div>

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-accent/20">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {details}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
