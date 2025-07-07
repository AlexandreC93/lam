"use client";

import { useState, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DarkModeContext } from "@/components/DarkModeProvider";
import { ChevronDown, MessageCircle } from "lucide-react";

export default function ChatbotWidget({ }) {
  const { darkMode } = useContext(DarkModeContext);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?" },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("https://alexcadinot.app.n8n.cloud/webhook-test/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      const data = await res.json();
      if (data?.output) {
        setMessages((prev) => [...prev, { sender: "bot", text: data.output }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Désolé, une erreur est survenue." },
        ]);
      }
    } catch (_) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Impossible de joindre le serveur." },
      ]);
    }
  };

  return (
    <>
      {/* Icône flottante quand fermé */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition hover:scale-105
            ${darkMode ? "bg-purple-600 text-white" : "bg-purple-600 text-white"}`}
          aria-label="Ouvrir le chatbot"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chatbot principal avec animation */}
      <div
        className={`fixed bottom-6 right-6 w-full max-w-sm rounded-2xl shadow-xl border overflow-hidden z-50 transform transition-all duration-500
          ${darkMode ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white border-zinc-200 text-zinc-900"}
          ${isOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-90 translate-y-4 pointer-events-none"}
        `}
      >
        {/* Header */}
        <div
          className={`flex justify-between items-center p-4 font-semibold text-lg cursor-pointer
            ${darkMode ? "bg-zinc-800 text-white" : "bg-purple-600 text-white"}`}
          onClick={() => setIsOpen(false)}
        >
          <span>💬 Chatbot IA</span>
          <ChevronDown className="w-5 h-5" />
        </div>

        {/* Messages */}
        <div className={`max-h-80 overflow-y-auto p-4 space-y-2 text-sm ${darkMode ? "bg-zinc-900" : "bg-white"}`}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg max-w-xs break-words ${msg.sender === "bot"
                  ? darkMode
                    ? "bg-zinc-700 text-white"
                    : "bg-zinc-100 text-zinc-800"
                  : "bg-purple-600 text-white ml-auto"
                }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className={`p-4 border-t flex gap-2 ${darkMode ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"}`}>
          <Input
            placeholder="Votre message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="text-sm"
            style={{ color: darkMode ? "white" : "inherit" }}
          />
          <Button onClick={handleSend}>Envoyer</Button>
        </div>
      </div>
    </>
  );
}