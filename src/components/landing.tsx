"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useContext } from 'react'
import { DarkModeContext } from "@/components/DarkModeProvider";

export default function LandingPage() {
  const { darkMode } = useContext(DarkModeContext);

  const features = [
    {
      title: "📨 Traitement des e-mails",
      desc: "Classement, extraction, réponses automatiques ou enregistrement dans vos outils.",
    },
    {
      title: "🧾 Facturation & Devis",
      desc: "Générez automatiquement des devis/factures à partir d’un simple formulaire ou email.",
    },
    {
      title: "📅 Prise de RDV",
      desc: "Un formulaire + Google Calendar + mails/SMS de rappel = zéro prise de tête.",
    },
    {
      title: "📢 Réseaux sociaux",
      desc: "Publiez automatiquement sur vos réseaux depuis un tableau Notion ou Google Sheets.",
    },
    {
      title: "🧠 IA intégrée",
      desc: "Classez, analysez ou rédigez avec de l’IA sur mesure connectée à vos outils.",
    },
    {
      title: "📂 Gestion documentaire",
      desc: "Stockez et renommez automatiquement vos documents (factures, CV, etc.).",
    },
  ];

  const benefits = [
    "Zéro compétence technique requise – on installe tout pour vous",
    "Compatible avec vos outils (Google, WhatsApp, Notion, Airtable...)",
    "Invisible pour vos équipes, mais ultra efficace",
    "Service humain, rapide, et adapté à vos besoins réels",
    "Prix clair, sans engagement, sans bullshit",
  ];

  const testimonials = [
    {
      name: "Sophie - RH chez NovaTech",
      text: "On a économisé plus de 10h par semaine juste en automatisant notre gestion de CV. C’est devenu indispensable.",
    },
    {
      name: "Mehdi - Freelance",
      text: "Je passais un temps fou à gérer mes RDV. Maintenant c’est automatique, je peux enfin souffler. Merci !",
    },
    {
      name: "Julie - E-commerce",
      text: "J’ai confié mes automatisations à l’équipe. Résultat : moins d’erreurs, plus de ventes. J’adore.",
    },
  ];

  return (
    <main className="py-12 px-4 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">On automatise votre quotidien</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6">
          On s’occupe de tout pour vous – sans besoin technique, sans perte de temps.
        </p>
        <Button className="text-lg px-6 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white">
          Demander un audit gratuit
        </Button>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        {features.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`rounded-2xl p-6 shadow-md hover:shadow-xl transition-all ${darkMode ? "bg-zinc-800 text-zinc-100" : "bg-white text-zinc-900"}`}
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-sm opacity-80">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Benefits List */}
      <section className="text-center max-w-4xl mx-auto mb-32">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">🤝 Pourquoi nous choisir ?</h2>
        <ul className="space-y-6 text-lg text-left">
          {benefits.map((text, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-3"
            >
              <span className="text-green-500 text-xl">✔️</span>
              <span>{text}</span>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Testimonials Carousel */}
      <section className="text-center max-w-3xl mx-auto mb-32">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">💬 Ils en parlent mieux que nous</h2>
        <motion.div
          className="overflow-hidden relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex gap-6 animate-scroll-x w-max">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`min-w-[300px] p-6 rounded-2xl shadow-md ${darkMode ? "bg-zinc-800 text-zinc-100" : "bg-white text-zinc-900"}`}
              >
                <p className="mb-4 italic">“{t.text}”</p>
                <p className="font-semibold">{t.name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">🚀 Envie de gagner du temps ?</h2>
        <p className="mb-6 text-lg">
          On installe l’automatisation idéale pour vous – vous n’avez rien à faire, sauf en profiter.
        </p>
        <Button className="bg-purple-600 text-white hover:bg-purple-700 transition px-6 py-3 text-lg rounded-xl">
          Lancer mon audit maintenant
        </Button>
      </section>
    </main>
  );
}
