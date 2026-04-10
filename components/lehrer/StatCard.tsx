import { Card, CardContent } from "@/components/ui/card";

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
  return (
    <Card className="border-[#e8e5df] hover:border-[#d4d0c8] transition-colors duration-300">
      <CardContent className="p-8">
        <div className="flex flex-col items-start">
          {/* Large number */}
          <div
            className="text-5xl font-light text-[#2d2a26] mb-4"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            {zahl}
          </div>
          {/* Statement */}
          <p className="text-[#6b665f] text-lg leading-relaxed mb-4">
            {aussage}
          </p>
          {/* Source */}
          <div className="flex items-center gap-2 text-[#8a847a] text-sm">
            <span className="text-[#b8afa7]">▹</span>
            <span>{quelle}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
