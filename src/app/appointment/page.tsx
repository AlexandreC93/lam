"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";

export default function Appointment() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

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
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-white text-zinc-900 p-8">
      <section className="max-w-xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">📅 Démo : Prise de Rendez-vous Automatisée</h1>
        <p className="text-zinc-600 text-lg">
          Remplissez le formulaire ci-dessous pour voir comment nos automatisations gèrent vos prises de rendez-vous avec Airtable, Google Calendar et confirmations automatiques.
        </p>
      </section>

      <Card className="max-w-xl mx-auto shadow-xl border border-zinc-200 rounded-2xl">
        <CardContent className="p-6 space-y-4">
          {confirmed ? (
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold text-green-600">✅ Rendez-vous confirmé !</h2>
              <p className="text-zinc-700">
                Un email de confirmation vous a été envoyé. Ce processus est entièrement automatisé.
              </p>
              <Button onClick={() => setConfirmed(false)}>Faire un autre test</Button>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Nom</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre nom" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Email</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@exemple.com" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Date souhaitée</label>
                <div className="flex items-center gap-2">
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                  <CalendarIcon className="w-5 h-5 text-zinc-500" />
                </div>
              </div>
              <Button
                onClick={handleBooking}
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 transition text-white"
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