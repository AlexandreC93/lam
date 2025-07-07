"use client";

import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { DarkModeContext } from "../components/DarkModeProvider"; // <-- adapte le chemin

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import ChatbotWidget from "./chatbot/page"; // adapte le chemin si besoin

export default function HomePage({ }) {
  const { darkMode } = useContext(DarkModeContext);
  // const [darkMode, setDarkMode] = useState(false);

  return (
    <>


      <main
        className={`min-h-screen p-8 transition-colors duration-300 ${darkMode
          ? "bg-zinc-900 text-zinc-100"
          : "bg-gradient-to-br from-blue-50 to-white text-zinc-900"
          }`}
      >
        <section className="grid md:grid-cols-2 gap-10 items-center justify-center">
          <div className="w-full max-w-3xl mx-auto">

            <h1
              className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${darkMode ? "text-zinc-100" : "text-zinc-800"
                }`}
            >
              Boostez votre business <br className="hidden md:block" /> avec
              <span className="text-purple-600"> l'automatisation</span>
            </h1>
            <p className={`text-lg mb-8 ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}>
              Notre agence connecte vos outils pour automatiser les tâches
              répétitives : chatbot IA, gestion des rendez-vous, suivi des stocks...
            </p>
            <Button
              className="text-base px-6 py-3 rounded-xl shadow-md bg-purple-600 hover:bg-purple-800 transition"
              asChild
            >
              <Link href="#services">Voir nos services</Link>
            </Button>
          </div>
          <img
            src="env.svg"
            alt="Automation Dashboard"
            className="w-full max-w-md mx-auto drop-shadow-xl"
          />
        </section>

        <section
          id="services"
          className={`mt-24 grid gap-8 md:grid-cols-3 ${darkMode ? "text-zinc-100" : "text-zinc-800"
            }`}
        >
          <Card
            className={`rounded-2xl shadow-lg border ${darkMode ? "border-zinc-700 bg-zinc-800" : "border-zinc-200 bg-white"
              }`}
          >
            <CardContent className="p-6 space-y-4">
              <h2 className={`${darkMode ? "text-zinc-300" : "text-black-300"} font-semibold text-2xl`}>🤖 Chatbot IA</h2>
              <p className={`${darkMode ? "text-zinc-300" : "text-zinc-600"} text-sm`}>
                Assistance automatisée sur WhatsApp ou site web. Se base sur vos
                documents Google ou FAQ pour répondre aux clients.
              </p>
              <Button
                variant="outline"
                className="w-full bg-white text-zinc-900 hover:bg-zinc-100 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                asChild
              >
                <Link href="/chatbot">Voir plus</Link>
              </Button>


            </CardContent>
          </Card>

          <Card
            className={`rounded-2xl shadow-lg border ${darkMode ? "border-zinc-700 bg-zinc-800" : "border-zinc-200 bg-white"
              }`}
          >
            <CardContent className="p-6 space-y-4">
              <h2 className={`${darkMode ? "text-zinc-300" : "text-black-300"} font-semibold text-2xl`}>📅 Prise de rendez-vous</h2>
              <p className={`${darkMode ? "text-zinc-300" : "text-zinc-600"} text-sm`}>
                Réception des demandes, vérification dans votre planning Airtable ou
                Google Calendar, envoi de confirmation automatique.
              </p>
              <Button
                variant="outline"
                className="w-full bg-white text-zinc-900 hover:bg-zinc-100 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                asChild
              >
                <Link href="/appointment">Voir plus</Link>
              </Button>


            </CardContent>
          </Card>

          <Card
            className={`rounded-2xl shadow-lg border ${darkMode ? "border-zinc-700 bg-zinc-800" : "border-zinc-200 bg-white"
              }`}
          >
            <CardContent className="p-6 space-y-4">
              <h2 className={`${darkMode ? "text-zinc-300" : "text-black-300"} font-semibold text-2xl`}>📦 Gestion des stocks</h2>
              <p className={`${darkMode ? "text-zinc-300" : "text-zinc-600"} text-sm`}>
                Mise à jour automatique de vos stocks après commande, alertes de
                réapprovisionnement, synchronisation avec Google Sheets ou Notion.
              </p>
              <Button
                variant="outline"
                className="w-full bg-white text-zinc-900 hover:bg-zinc-100 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                asChild
              >
                <Link href="/stock">Voir plus</Link>
              </Button>


            </CardContent>
          </Card>
        </section>
      </main>

      {/* Chatbot avec mode sombre / clair */}
      <ChatbotWidget darkMode={darkMode} />
    </>
  );
}
