"use client";

import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { DarkModeContext } from "../components/DarkModeProvider";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import ChatbotWidget from "./chatbot/page";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

export default function HomePage() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <main
      className={`min-h-screen p-8 transition-colors duration-300 ${
        darkMode ? "bg-zinc-900 text-zinc-100" : "bg-gradient-to-br from-blue-50 to-white text-zinc-900"
      }`}
    >
      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-10 items-center justify-center">
        <div className="w-full max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${
              darkMode ? "text-zinc-100" : "text-zinc-800"
            }`}
          >
            Gagnez du temps et de l'argent <br className="hidden md:block" /> grâce à
            <span className="text-purple-600"> l'automatisation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className={`text-lg mb-8 ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}
          >
            On installe pour vous des systèmes simples et efficaces qui automatisent vos tâches répétitives
            (réservations, relances, emails, gestion clients...).
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <Button className="text-base px-6 py-3 rounded-xl shadow-md bg-purple-600 hover:bg-purple-800 transition" asChild>
              <Link href="#services">Voir nos services</Link>
            </Button>
          </motion.div>
        </div>
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          src="/env.svg"
          alt="Automation Dashboard"
          className="w-full max-w-md mx-auto drop-shadow-xl"
        />
      </section>

      {/* Carousel des cas d’usage */}
      <section className="my-24">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Ce qu'on peut automatiser pour vous 💡
        </h2>
        <div className="relative max-w-6xl mx-auto px-4">
          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[Autoplay({ delay: 4000 })]}
            className="overflow-hidden"
          >
            <CarouselContent className="flex">
              {["Réponse client instantanée", "Relance de paniers abandonnés", "Confirmation de RDV", "Reporting automatique", "Mise à jour de stock"].map((title, idx) => {
                const contentList = [
                  "Un chatbot sur WhatsApp ou site web, qui répond selon votre FAQ ou vos documents.",
                  "Email ou SMS envoyés automatiquement après un abandon de panier sur votre boutique.",
                  "Formulaire + vérification dans votre calendrier + email ou SMS de confirmation.",
                  "Envoyer chaque semaine un rapport PDF ou Google Sheets de vos ventes / RDV / clients.",
                  "Quand un produit est vendu, vos stocks se mettent à jour automatiquement dans Sheets ou Notion."
                ];
                return (
                  <CarouselItem key={idx} className="basis-[90%] sm:basis-[70%] md:basis-[33%] px-2">
                    <Card className={`h-full rounded-xl border ${darkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-zinc-200"}`}>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{title}</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-300">{contentList[idx]}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-2rem] top-1/2 -translate-y-1/2 z-10 shadow-none bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-700" />
            <CarouselNext className="absolute right-[-2rem] top-1/2 -translate-y-1/2 z-10 shadow-none bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-700" />
          </Carousel>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className={`mt-24 grid gap-8 md:grid-cols-3 ${darkMode ? "text-zinc-100" : "text-zinc-800"}`}
      >
        {[
          {
            title: "🤖 Chatbot IA",
            content: "Assistance automatisée sur WhatsApp ou site web. Se base sur vos documents Google ou FAQ pour répondre aux clients.",
            link: "/chatbot"
          },
          {
            title: "📅 Prise de rendez-vous",
            content: "Réception des demandes, vérification dans votre planning Airtable ou Google Calendar, envoi de confirmation automatique.",
            link: "/appointment"
          },
          {
            title: "📦 Gestion des stocks",
            content: "Mise à jour automatique de vos stocks après commande, alertes de réapprovisionnement, synchronisation avec Google Sheets ou Notion.",
            link: "/stock"
          }
        ].map((item, idx) => (
          <Card
            key={idx}
            className={`rounded-2xl shadow-lg border ${darkMode ? "border-zinc-700 bg-zinc-800" : "border-zinc-200 bg-white"}`}
          >
            <CardContent className="p-6 space-y-4">
              <h2 className={`${darkMode ? "text-zinc-300" : "text-black-300"} font-semibold text-2xl`}>{item.title}</h2>
              <p className={`${darkMode ? "text-zinc-300" : "text-zinc-600"} text-sm`}>{item.content}</p>
              <Button
                variant="outline"
                className="w-full bg-white text-zinc-900 hover:bg-zinc-100 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                asChild
              >
                <Link href={item.link}>Voir plus</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </main>
  );
}
