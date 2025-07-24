"use client";

import { useState, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { DarkModeContext } from "@/components/DarkModeProvider";


export default function Appointment() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const { darkMode } = useContext(DarkModeContext);


  const handleBooking = async () => {
    if (!name || !email || !date) return alert("Veuillez remplir tous les champs.");
    setLoading(true);
    try {
      // Simulation d'appel n8n webhook ou Airtable
      await new Promise((res) => setTimeout(res, 1500));
      setConfirmed(true);
    } catch (err) {
      alert("Erreur lors de la réservation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={`min-h-screen p-8 transition-colors duration-300 ${darkMode
          ? "bg-zinc-900 text-zinc-100"
          : "bg-gradient-to-br from-orange-50 to-white text-zinc-900"
        }`}
    >
      <section className="max-w-xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          📅 Démo : Prise de Rendez-vous Automatisée
        </h1>
        <p className={`text-lg ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}>
          Remplissez le formulaire ci-dessous pour voir comment nos automatisations gèrent vos prises de rendez-vous avec Airtable, Google Calendar et confirmations automatiques.
        </p>
      </section>

      <Card
        className={`max-w-xl mx-auto shadow-xl rounded-2xl border ${darkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-zinc-200"
          }`}
      >
        <CardContent className="p-6 space-y-4">
          {confirmed ? (
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold text-green-500">✅ Rendez-vous confirmé !</h2>
              <p className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
                Un email de confirmation vous a été envoyé. Ce processus est entièrement automatisé.
              </p>
              <Button onClick={() => setConfirmed(false)}>Faire un autre test</Button>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Nom</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom"
                  className={darkMode ? "bg-zinc-900 text-white" : ""}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Email</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@exemple.com"
                  className={darkMode ? "bg-zinc-900 text-white" : ""}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Date souhaitée</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={darkMode ? "bg-zinc-900 text-white" : ""}
                  />
                  <CalendarIcon className="w-5 h-5 text-zinc-500" />
                </div>
              </div>

              <Button
                onClick={handleBooking}
                disabled={loading}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white transition"
              >
                {loading ? "Envoi en cours..." : "Réserver le rendez-vous"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
}