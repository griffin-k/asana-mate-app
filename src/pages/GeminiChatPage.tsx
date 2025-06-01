import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaDumbbell, FaPlus, FaTrashAlt } from "react-icons/fa";

// Hardcoded API key for demo (replace with your real key)
const API_KEY = "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";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

// Custom system instruction for the AI
const SYSTEM_PROMPT = {
  role: "system",
  content: `You are a helpful assistant specialized ONLY in Diet, Gym, and Yoga advice. 
  Always respond shortly and to the point. Do not answer questions unrelated to these topics.`,
};

const GroqChatPage = () => {
  const [messages, setMessages] = useState([
    SYSTEM_PROMPT,
    { role: "assistant", content: "Hi! I’m your Diet, Gym & Yoga assistant. Ask me anything related!" },
  ]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newUserMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");

    try {
      const response = await axios.post(
        GROQ_URL,
        {
          model: "llama3-70b-8192",
          messages: [...messages, newUserMessage],
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const assistantMessage = response.data.choices[0].message;
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Error getting response. Please try again." },
      ]);
    }
  };

  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]);

  const scrollInputIntoView = () => {
    setTimeout(() => {
      inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <header className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white flex justify-between items-center shadow-lg rounded-b-lg">
        <div className="flex items-center space-x-3">
          <FaDumbbell className="text-3xl text-blue-300" />
          <h1 className="text-2xl font-bold tracking-wide select-none">Diet & Gym Chat</h1>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => setMessages([SYSTEM_PROMPT])}
            title="Start New Chat"
            aria-label="Start new chat"
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 px-5 py-2 rounded-md transition shadow-md"
          >
            <FaPlus /> Add
          </button>
          <button
            onClick={() => setMessages([SYSTEM_PROMPT])}
            title="Clear Chat"
            aria-label="Clear chat"
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-400 px-5 py-2 rounded-md transition shadow-md"
          >
            <FaTrashAlt /> Del
          </button>
        </div>
      </header>

      <main
        ref={chatBoxRef}
        className="flex-1 overflow-y-auto p-5 space-y-3 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100"
        style={{ paddingBottom: "80px" }} // space for fixed footer
      >
        {messages
          .filter((msg) => msg.role !== "system") // hide system prompt from UI
          .map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[75%] px-4 py-3 rounded-lg whitespace-pre-line break-words ${
                msg.role === "user"
                  ? "bg-blue-600 text-white ml-auto rounded-br-none"
                  : "bg-blue-200 text-blue-900 mr-auto rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          ))}
      </main>

      <footer
        className="flex gap-3 border-t border-blue-300 p-4 bg-blue-100"
        style={{
          position: "fixed",
          bottom: "env(safe-area-inset-bottom, 0px)",
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        <input
          ref={inputRef}
          type="text"
          className="flex-1 rounded-md border border-blue-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask about Diet, Gym, Yoga..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          onFocus={scrollInputIntoView}
          aria-label="Message input"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
          aria-label="Send message"
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default GroqChatPage;
