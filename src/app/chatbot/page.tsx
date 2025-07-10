"use client";

import { useState, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DarkModeContext } from "@/components/DarkModeProvider";
import { ChevronDown, MessageCircle } from "lucide-react";

type Message = {
  sender: "user" | "bot";
  text?: string;
  imageUrl?: string;
  fileName?: string;
};

export default function ChatbotWidget() {
  const { darkMode } = useContext(DarkModeContext);
  const [messages, setMessages] = useState<Message[]>([
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data?.output || "Désolé, une erreur est survenue." },
      ]);
    } catch (_) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Impossible de joindre le serveur." },
      ]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const reader = new FileReader();

    reader.onloadend = async () => {
      const fileMessage: Message = {
        sender: "user",
        ...(isImage ? { imageUrl: reader.result as string } : { fileName: file.name }),
      };
      setMessages((prev) => [...prev, fileMessage]);

      const formData = new FormData();
      formData.append("data", file);

      try {
        const res = await fetch("https://alexcadinot.app.n8n.cloud/webhook-test/chatbot", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: data?.output || "❌ Erreur de traitement du fichier." },
        ]);
      } catch (_) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "❌ Impossible d'envoyer le fichier." },
        ]);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
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
              className={`p-2 rounded-lg max-w-xs break-words ${
                msg.sender === "bot"
                  ? darkMode
                    ? "bg-zinc-700 text-white"
                    : "bg-zinc-100 text-zinc-800"
                  : "bg-purple-600 text-white ml-auto"
              }`}
            >
              {msg.text && <p>{msg.text}</p>}
              {msg.imageUrl && (
                <img
                  src={msg.imageUrl}
                  alt="Image envoyée"
                  className="mt-2 rounded-lg max-w-[200px] object-cover"
                />
              )}
              {msg.fileName && (
                <p className="italic text-xs mt-1">📎 {msg.fileName}</p>
              )}
            </div>
          ))}
        </div>

        {/* Input + fichier */}
        <div className={`p-4 border-t flex flex-col gap-2 ${darkMode ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"}`}>
          <div className="flex gap-2">
            <Input
              placeholder="Votre message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="text-sm"
              style={{ color: darkMode ? "white" : "inherit" }}
            />
            <Button onClick={handleSend}>Envoyer</Button>
          </div>

          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded-md file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
          />
        </div>
      </div>
    </>
  );
}
