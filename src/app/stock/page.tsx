// app/stock/page.tsx
"use client";

import { useContext } from "react";
import { DarkModeContext } from "@/components/DarkModeProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, PackageSearch, Zap, LayoutDashboard, BellRing, ShieldCheck } from "lucide-react";

export default function StockPage() {
  const { darkMode } = useContext(DarkModeContext);

  const cardBaseStyle = `rounded-2xl shadow-md border transition-colors duration-300`;
  const cardColor = darkMode ? "border-zinc-700 bg-zinc-800" : "border-zinc-200 bg-white";
  const textColor = darkMode ? "text-zinc-300" : "text-zinc-600";

  return (
    <main className={`min-h-screen px-6 md:px-12 py-16 space-y-24 ${darkMode ? "bg-zinc-900 text-zinc-100" : "bg-white text-zinc-900"}`}>
      {/* Intro */}
      <section className="max-w-5xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">📦 Gestion intelligente des stocks</h1>
        <p className="text-lg max-w-2xl mx-auto text-zinc-500 dark:text-zinc-300">
          Suivez et gérez votre inventaire en temps réel grâce à nos automatisations. Connecté à vos outils. 100% sans effort.
        </p>
        <Button className="bg-purple-600 hover:bg-purple-800 text-white text-base px-6 py-3 rounded-xl shadow">
          Demander une démo
        </Button>
      </section>

      {/* Fonctionnalités */}
      <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            icon: <PackageSearch className="text-purple-600 w-6 h-6" />,
            title: "Mise à jour automatique",
            desc: "Stock mis à jour en temps réel dans Airtable, Notion ou Google Sheets après chaque vente ou retour.",
          },
          {
            icon: <CheckCircle className="text-purple-600 w-6 h-6" />,
            title: "Alertes intelligentes",
            desc: "Recevez des notifications WhatsApp ou email quand le stock est faible. Zéro rupture surprise.",
          },
          {
            icon: <Zap className="text-purple-600 w-6 h-6" />,
            title: "Zéro tâche manuelle",
            desc: "Fini les erreurs de saisie : tout est relié à vos outils de vente (Shopify, Stripe, CRM...).",
          },
        ].map(({ icon, title, desc }, i) => (
          <Card key={i} className={`${cardBaseStyle} ${cardColor}`}>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                {icon}
                <h2 className="text-xl font-semibold">{title}</h2>
              </div>
              <p className={`text-sm ${textColor}`}>{desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Intégrations */}
      <section className="max-w-6xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-center">🔌 Exemples d’intégrations</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <LayoutDashboard className="text-purple-600 w-6 h-6" />,
              title: "Shopify → Airtable",
              desc: "Chaque commande sur Shopify déduit automatiquement les quantités en stock dans votre base Airtable.",
            },
            {
              icon: <BellRing className="text-purple-600 w-6 h-6" />,
              title: "Notion + WhatsApp",
              desc: "Notification automatique sur WhatsApp si le stock d’un produit Notion passe sous 10 unités.",
            },
            {
              icon: <ShieldCheck className="text-purple-600 w-6 h-6" />,
              title: "Google Sheets + Email",
              desc: "Envoi hebdo d’un rapport de stock par email à votre équipe, basé sur un Google Sheet dynamique.",
            },
          ].map(({ icon, title, desc }, i) => (
            <Card key={i} className={`${cardBaseStyle} ${cardColor}`}>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  {icon}
                  <h3 className="text-lg font-semibold">{title}</h3>
                </div>
                <p className={`text-sm ${textColor}`}>{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ rapide */}
      <section className="max-w-3xl mx-auto text-center space-y-8">
        <h2 className="text-3xl font-bold">❓ Questions fréquentes</h2>
        <div className="space-y-6 text-left">
          <div>
            <h4 className="font-semibold">C’est compatible avec mon site ?</h4>
            <p className={textColor}>
              Oui, on s’intègre facilement à Shopify, WooCommerce, Stripe, SquareSpace, etc.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Et si je n’ai pas de stock physique ?</h4>
            <p className={textColor}>
              On peut aussi automatiser le suivi des prestations, abonnements, ou ressources numériques.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Combien de temps pour l'installation ?</h4>
            <p className={textColor}>
              En général, 1 à 3 jours suffisent pour mettre en place une solution clé en main.
            </p>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="text-center mt-24 space-y-4">
        <h3 className="text-2xl font-semibold">Prêt à moderniser votre gestion de stock ?</h3>
        <p className={`max-w-xl mx-auto ${textColor}`}>
          On vous installe tout en quelques jours. Réservez un appel et on vous montre une démo avec vos vrais outils.
        </p>
        <Button className="bg-purple-600 hover:bg-purple-800 text-white text-base px-6 py-3 rounded-xl shadow">
          Réserver une démo gratuite
        </Button>
      </section>
    </main>
  );
}
