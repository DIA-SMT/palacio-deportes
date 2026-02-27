"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ChevronDown } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const QUICK_SUGGESTIONS = [
    "¿Cómo llego al Palacio?",
    "¿Qué eventos hay este mes?",
    "¿Hay estacionamiento?",
    "¿Hay entradas gratuitas?",
];

const WELCOME_MESSAGE: Message = {
    role: "assistant",
    content:
        "¡Buenas! 👋 Soy Pali, el asistente del Palacio de los Deportes. ¿En qué te puedo ayudar, che? Preguntame lo que quieras sobre eventos, cómo llegar, entradas... ¡lo que sea!",
};

export function VirtualAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasUnread, setHasUnread] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setHasUnread(false);
            // tiny delay so the animation finishes first
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isLoading]);

    const sendMessage = async (text: string) => {
        const userMessage = text.trim();
        if (!userMessage || isLoading) return;

        setInput("");
        setShowSuggestions(false);
        const newMessages: Message[] = [
            ...messages,
            { role: "user", content: userMessage },
        ];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: newMessages.filter((m) => m.role !== "assistant" || m !== WELCOME_MESSAGE).map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            });

            const data = await res.json();
            const assistantMessage: Message = {
                role: "assistant",
                content: data.content || "Uy, no pude procesar eso. ¿Me repetís?",
            };

            setMessages((prev) => [...prev, assistantMessage]);
            if (!isOpen) setHasUnread(true);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Uy, hubo un problema de conexión. ¡Probá de nuevo, che!",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    return (
        <>
            {/* Chat Window */}
            <div
                className={`fixed bottom-24 right-6 z-50 w-[350px] sm:w-[390px] max-h-[580px] flex flex-col rounded-2xl shadow-2xl border border-white/10 bg-[#111318] transition-all duration-300 ease-out ${isOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 translate-y-4 pointer-events-none"
                    }`}
                aria-hidden={!isOpen}
            >
                {/* Header */}
                <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#1e2a4a] to-[#0f1929] rounded-t-2xl border-b border-white/10 flex-shrink-0">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg flex-shrink-0">
                            <video
                                src="/pali-animado.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#111318]" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-semibold text-white text-sm">Pali</div>
                        <div className="text-xs text-emerald-400">En línea · Asistente del Palacio</div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="Cerrar chat"
                    >
                        <ChevronDown className="w-5 h-5" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 scroll-smooth">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                        >
                            {msg.role === "assistant" && (
                                <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mt-0.5">
                                    <video
                                        src="/pali-animado.mp4"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div
                                className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${msg.role === "user"
                                    ? "bg-blue-600 text-white rounded-tr-sm"
                                    : "bg-white/8 text-white/90 rounded-tl-sm border border-white/8"
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {isLoading && (
                        <div className="flex gap-2 flex-row">
                            <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mt-0.5">
                                <video
                                    src="/pali-animado.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="bg-white/8 border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3">
                                <div className="flex gap-1.5 items-center h-4">
                                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0ms]" />
                                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:150ms]" />
                                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:300ms]" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Quick suggestions */}
                    {showSuggestions && messages.length === 1 && (
                        <div className="flex flex-col gap-1.5 pt-1">
                            <p className="text-xs text-white/40 px-1">Preguntas frecuentes:</p>
                            {QUICK_SUGGESTIONS.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => sendMessage(s)}
                                    className="text-left text-xs px-3 py-2 rounded-xl bg-white/5 hover:bg-blue-600/20 border border-white/8 hover:border-blue-500/40 text-white/70 hover:text-white transition-all duration-150"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form
                    onSubmit={handleSubmit}
                    className="flex gap-2 p-3 border-t border-white/10 flex-shrink-0 bg-[#111318] rounded-b-2xl"
                >
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Preguntame algo..."
                        disabled={isLoading}
                        className="flex-1 bg-white/6 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-white/10 disabled:text-white/20 flex items-center justify-center text-white transition-all duration-150 flex-shrink-0 shadow-sm"
                        aria-label="Enviar mensaje"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>

            {/* Floating button */}
            <button
                onClick={() => setIsOpen((v) => !v)}
                className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-xl shadow-blue-900/40 overflow-hidden flex items-center justify-center transition-all duration-300 ${isOpen
                    ? "ring-2 ring-white/20 hover:scale-105"
                    : "hover:scale-110"
                    }`}
                aria-label={isOpen ? "Cerrar asistente" : "Abrir asistente virtual"}
            >
                {isOpen ? (
                    <div className="w-full h-full bg-[#1e2a4a] hover:bg-[#263354] flex items-center justify-center">
                        <X className="w-6 h-6 text-white" />
                    </div>
                ) : (
                    <video
                        src="/pali-animado.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />
                )}

                {/* Unread badge */}
                {hasUnread && !isOpen && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-background animate-pulse" />
                )}


            </button>
        </>
    );
}
