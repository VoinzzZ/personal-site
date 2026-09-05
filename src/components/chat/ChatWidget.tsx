"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, MessageSquare, Send, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function formatInlineMarkdown(content: string) {
  const parts = content.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="rounded bg-black/30 px-1 py-0.5 font-mono text-[0.85em]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }

    return part;
  });
}

function MarkdownMessage({ content }: { content: string }) {
  return (
    <div className="space-y-1.5">
      {content.split("\n").map((line, index) => {
        const heading = line.match(/^(#{1,3})\s+(.+)$/);
        const bullet = line.match(/^\s*[-*]\s+(.+)$/);

        if (heading) {
          return (
            <p key={index} className="font-semibold text-white">
              {formatInlineMarkdown(heading[2])}
            </p>
          );
        }

        if (bullet) {
          return (
            <div key={index} className="flex gap-2">
              <span className="text-cyan-400">›</span>
              <span>{formatInlineMarkdown(bullet[1])}</span>
            </div>
          );
        }

        if (!line) return <div key={index} className="h-1" />;

        return <p key={index}>{formatInlineMarkdown(line)}</p>;
      })}
    </div>
  );
}

const UI_TEXT = {
  en: {
    bubbleLabel: "Open AI assistant",
    title: "AI Assistant",
    subtitle: "Ask me about Antony's skills & work",
    placeholder: "Ask a question...",
    send: "Send",
    close: "Close chat",
    errorMessage:
      "Sorry, could not connect to the assistant right now. Please try again later.",
    initialGreeting:
      "Hello! I am Antony's portfolio assistant. You can ask me about his skills, experience, education, or how to contact him.",
    sampleQuestions: [
      "What are Antony's main skills?",
      "Tell me about his work experience",
      "How can I contact Antony?",
    ],
  },
  id: {
    bubbleLabel: "Buka asisten AI",
    title: "Asisten AI",
    subtitle: "Tanya seputar skill & pengalaman Antony",
    placeholder: "Ketik pertanyaan...",
    send: "Kirim",
    close: "Tutup obrolan",
    errorMessage:
      "Maaf, sedang tidak bisa terhubung ke asisten. Silakan coba lagi beberapa saat lagi.",
    initialGreeting:
      "Halo! Saya asisten portfolio Antony. Anda bisa bertanya seputar keahlian, pengalaman kerja, pendidikan, atau kontak Antony.",
    sampleQuestions: [
      "Apa keahlian utama Antony?",
      "Ceritakan pengalaman kerjanya",
      "Bagaimana cara menghubungi Antony?",
    ],
  },
} as const;

export default function ChatWidget() {
  const { language } = useLanguage();
  const text = UI_TEXT[language] ?? UI_TEXT.en;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [
    { role: "assistant", content: text.initialGreeting },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<{ left: number; top: number } | null>(
    null,
  );
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  );
  const dragOffsetRef = useRef<{ x: number; y: number } | null>(null);
  const resizeStartRef = useRef<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const assistantTextRef = useRef("");

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  useEffect(() => {
    if (!isOpen) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (dragOffsetRef.current) {
        const offset = dragOffsetRef.current;
        const nextLeft = event.clientX - offset.x;
        const nextTop = event.clientY - offset.y;
        const maxLeft = window.innerWidth - 160;
        const maxTop = window.innerHeight - 60;

        setPosition({
          left: Math.min(Math.max(nextLeft, 8), Math.max(maxLeft, 8)),
          top: Math.min(Math.max(nextTop, 8), Math.max(maxTop, 8)),
        });
      }

      if (resizeStartRef.current) {
        const start = resizeStartRef.current;
        const deltaX = event.clientX - start.x;
        const deltaY = event.clientY - start.y;
        const width = Math.min(
          Math.max(start.width + deltaX, 280),
          Math.max(window.innerWidth - 24, 280),
        );
        const height = Math.min(
          Math.max(start.height + deltaY, 320),
          Math.max(window.innerHeight - 24, 320),
        );
        setSize({ width, height });
      }
    };

    const handleMouseUp = () => {
      dragOffsetRef.current = null;
      resizeStartRef.current = null;
      document.body.style.userSelect = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
    };
  }, [isOpen]);

  const startDrag = (event: React.MouseEvent) => {
    if (event.button !== 0) return;
    const panel = panelRef.current;
    if (!panel) return;

    const rect = panel.getBoundingClientRect();
    setPosition((prev) => prev ?? { left: rect.left, top: rect.top });
    dragOffsetRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    document.body.style.userSelect = "none";
  };

  const startResize = (event: React.MouseEvent) => {
    event.stopPropagation();
    const panel = panelRef.current;
    if (!panel) return;

    const rect = panel.getBoundingClientRect();
    resizeStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      width: rect.width,
      height: rect.height,
    };
    document.body.style.userSelect = "none";
  };

  const sendMessage = async (rawContent: string) => {
    const trimmed = rawContent.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Chat request failed with status ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      assistantTextRef.current = "";
      let buffer = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine.startsWith("data:")) continue;

          const dataPayload = trimmedLine.replace(/^data:\s*/, "");
          if (dataPayload === "[DONE]") continue;

          try {
            const parsed = JSON.parse(dataPayload) as {
              choices?: Array<{ delta?: { content?: string } }>;
            };
            const chunk = parsed.choices?.[0]?.delta?.content;
            if (chunk) {
              assistantTextRef.current += chunk;
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last && last.role === "assistant") {
                  updated[updated.length - 1] = {
                    ...last,
                    content: assistantTextRef.current,
                  };
                }
                return updated;
              });
            }
          } catch {}
        }
      }

      if (!assistantTextRef.current.trim()) {
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last && last.role === "assistant" && !last.content) {
            updated[updated.length - 1] = {
              role: "assistant",
              content: text.errorMessage,
            };
          }
          return updated;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: text.errorMessage },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    void sendMessage(input);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {isOpen && (
        <div
          ref={panelRef}
          style={{
            ...(position
              ? { position: "fixed", left: position.left, top: position.top }
              : {}),
            ...(size ? { width: size.width, height: size.height } : {}),
          }}
          className="relative mb-3 w-[92vw] sm:w-96 h-[500px] max-w-[calc(100vw-1.5rem)] max-h-[calc(100vh-1.5rem)] min-w-[280px] min-h-[320px] flex flex-col rounded-xl border border-white/10 bg-[#181818]/95 backdrop-blur-md shadow-2xl overflow-hidden font-sans text-white"
        >
          <div
            onMouseDown={startDrag}
            className="flex items-center justify-between px-4 py-3 bg-[#202020] border-b border-white/10 cursor-move select-none"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold font-mono leading-tight">
                  {text.title}
                </h3>
                <p className="text-[11px] text-gray-400">{text.subtitle}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={text.close}
              className="rounded p-1 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-cyan-500 text-black font-medium"
                      : "bg-[#252525] text-gray-200 border border-white/5"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <MarkdownMessage content={message.content} />
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="pt-2 space-y-1.5">
                <p className="text-xs text-gray-400 font-mono">
                  Suggested questions:
                </p>
                {text.sampleQuestions.map((question, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => void sendMessage(question)}
                    className="block w-full text-left text-xs text-cyan-300 hover:text-cyan-200 bg-[#222222] hover:bg-[#282828] border border-white/5 rounded-md px-2.5 py-1.5 transition-colors"
                  >
                    › {question}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg px-3 py-2 bg-[#252525] border border-white/5 text-xs text-gray-400 font-mono animate-pulse">
                  Typing...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 p-3 bg-[#202020] border-t border-white/10"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={text.placeholder}
              maxLength={1000}
              className="flex-1 bg-[#141414] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label={text.send}
              className="flex items-center justify-center h-9 w-9 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-black transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          <button
            type="button"
            onMouseDown={startResize}
            aria-label="Resize chat window"
            className="absolute bottom-0 right-0 h-5 w-5 cursor-nwse-resize bg-linear-to-tl from-cyan-400/70 from-0% from-20% via-transparent via-20% via-40% to-cyan-400/70 to-40% to-60%"
          />
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={text.bubbleLabel}
        className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all"
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageSquare className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
