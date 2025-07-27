import React, { useState, useRef, useEffect } from "react";
import { FaRocket, FaPaperPlane, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SpaceCanvas from "../components/SpaceCanvas";
import Navbar from "../components/Navbar";
import "../index.css";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [responses, setResponses] = useState([]);
  const topRef = useRef(null);
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!input.trim()) return;

    const question = input;
    setInput("");

    let botText = "Thinking...";
    let images = [];

    try {
      const res1 = await fetch("http://localhost:5000/api/chatbot/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: question }),
      });

      const data1 = await res1.json();

      if (res1.ok && data1.reply) {
        botText = data1.reply;
      } else {
        botText = data1.error || "No reply from Gemini.";
        console.error("Gemini API Error:", data1.details || "Unknown error");
      }
    } catch (err) {
      console.error("Gemini request failed:", err.message);
      botText = "Failed to get reply from Gemini.";
    }

    try {
      const res2 = await fetch(
        `http://localhost:5000/api/image/search?q=${encodeURIComponent(question)}`
      );
      if (!res2.ok) throw new Error(`Image fetch error: ${res2.status}`);
      const data2 = await res2.json();
      images = data2.images || [];
    } catch (err) {
      console.error("NASA image error:", err.message);
    }

    setResponses((prev) => [...prev, { question, answer: botText, images }]);
  };

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [responses]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white bg-black">
      <div className="stars fixed top-0 left-0 w-full h-full z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <SpaceCanvas />
      </div>
      <div className="absolute top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen p-4 pt-40">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-cyan-400">
            Space AI Chatbot
          </h1>
          <p className="text-lg sm:text-xl text-emerald-300">
            Ask me anything about space <FaRocket className="inline ml-2" />
          </p>
        </div>

        {/* 🔽 Back Arrow below Navbar */}
        <div className="relative w-full max-w-2xl mt-6 mb-2 flex justify-start z-20">
          <button
            onClick={() => navigate("/")}
            className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white"
          >
            <FaArrowLeft size={20} />
          </button>
        </div>

        {/* Chat responses */}
        <div className="w-full max-w-2xl mt-4 flex flex-col items-center max-h-[600px] overflow-y-scroll px-4 space-y-6">
          <div ref={topRef}></div>
          {[...responses].reverse().map((res, idx) => (
            <div key={idx} className="bg-white/10 p-4 rounded-xl shadow w-full">
              <p className="font-semibold text-indigo-300">You: {res.question}</p>
              <p className="mt-2 text-white">Bot: {res.answer}</p>
              <div className="mt-4 flex flex-wrap gap-4">
                {res.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`space ${i}`}
                    className="w-40 h-40 object-cover rounded-lg border border-white/20"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="w-full max-w-2xl mt-6 mb-10 flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-transparent outline-none text-white px-2"
            placeholder="Type your question here..."
          />
          <button
            onClick={handleSend}
            className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded-full"
          >
            <FaPaperPlane className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
