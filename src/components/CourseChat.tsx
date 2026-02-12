"use client";
import { useState } from "react";

type Course = { id: string; name: string; instructor: string; credits: number; color: string };
type Msg = { role: "user" | "assistant"; text: string };

export default function CourseChat({ course }: { course: Course }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendMessage() {
    if (!input.trim()) return;
    setError(null);
    const userMsg: Msg = { role: "user", text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              text: `You are a helpful study assistant for the course "${course.name}" taught by ${course.instructor}. Help the student understand topics, clarify concepts, and plan their study. Be concise and friendly.`,
            },
            userMsg,
          ],
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "AI service error");
      }

      const body = await res.json();
      const reply = (body?.reply as string) || body?.output || "(no response)";
      setMessages((m) => [...m, { role: "assistant", text: String(reply) }]);
    } catch (e: Error | unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  const quickPrompts = [
    "Create a study schedule",
    "Key topics for exam",
    "Explain a topic",
    "Practice questions",
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-3">
        {messages.length === 0 && (
          <div className="text-sm text-gray-500">
            <p className="mb-3">Ask questions about this course. Try:</p>
            <div className="space-y-2">
              {quickPrompts.map((p) => (
                <button
                  key={p}
                  className="block w-full text-left p-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                  onClick={() => { setInput(p); }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`p-2 rounded text-sm ${m.role === "user" ? "bg-blue-50 text-slate-800" : "bg-gradient-to-r from-purple-50 to-blue-50 text-slate-900"}`}>
            {m.text}
          </div>
        ))}
      </div>

      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about this course..."
          className="flex-1 p-2 border rounded-lg text-sm"
          onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
        />
        <button className="btn-primary px-3 py-1 rounded-lg text-sm" onClick={sendMessage} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
