"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface RoutingGuardProps {
  children: React.ReactNode;
  requiredAnswers?: boolean;
}

export default function RoutingGuard({
  children,
  requiredAnswers = false,
}: RoutingGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Nur auf Schüler-Seiten prüfen
    if (!pathname?.startsWith("/schueler")) return;

    // Nur auf Auswertung und Vorschläge Seiten prüfen
    if (!requiredAnswers) return;

    // Prüfe ob Antworten vorhanden sind
    const gespeicherte = localStorage.getItem(
      "klassenklima_fragebogen_antworten",
    );

    if (!gespeicherte) {
      // Keine Antworten vorhanden -> zur Fragebogen-Seite leiten
      router.push("/schueler/fragebogen");
    }
  }, [router, pathname, requiredAnswers]);

  return <>{children}</>;
}
