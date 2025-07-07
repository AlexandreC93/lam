// components/Navbar.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: (v: boolean) => void }) {
    return (
        <header className={`w-full px-6 py-4 flex justify-between items-center shadow-lg shadow-black/10 sticky top-0 z-50 transition
  ${darkMode
                ? "bg-zinc-900 text-white border-b border-zinc-700 "
                : "bg-white text-zinc-900 "}`}>
            <Link href="/" className="text-xl font-bold">
                🚀 Automatisations
            </Link>

            <nav className="flex gap-4 items-center">
                <Link href="/" className="hover:underline">Accueil</Link>
                <Link href="#services" className="hover:underline">Services</Link>
                <Link href="/appointment" className="hover:underline">RDV</Link>
                <Link href="/contact" className="hover:underline">Contact</Link>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDarkMode(!darkMode)}
                    className="ml-4"
                >
                    {darkMode ? "🌙 Sombre" : "☀️ Clair" }
                </Button>
            </nav>
        </header>
    );
}
