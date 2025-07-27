import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowRight,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import Navbar from "./Navbar";

const About = () => {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(null); // github, linkedin, contact

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden text-white"
      style={{
        backgroundImage:
          "url('https://wallpapers.com/images/hd/8k-space-rveom8206cpwxz0k.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 🧭 Navbar */}
      <div className="absolute top-0 left-0 w-full z-30">
        <Navbar />
      </div>

      {/* 🔙 Back Arrow */}
      <div className="absolute top-[4.5rem] left-4 z-40">
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-all"
          title="Go Back"
        >
          <FaArrowLeft size={20} />
        </button>
      </div>

      {/* 🌌 About Content */}
      <div className="relative z-20 pt-40 px-6 max-w-3xl mx-auto">
       <h1 className="text-4xl font-bold text-purple-300 mb-6">
  About Space Explorer
</h1>
<p className="text-lg text-white/90 leading-relaxed space-y-4">
  <span>
    Welcome to <strong>Space Explorer</strong>it is a MERN stack web application that allows users to interact with an Al chatbot and learn about the wonders of the universe.
  </span>
  <br />
  <span>
   This project showcases the synergy of cutting-edge technologies like <strong>React.js</strong>, <strong>Tailwind CSS</strong>, <strong>Framer Motion</strong>, and advanced 3D rendering. The chatbot is driven by Gemini AI's GPT models, enabling natural, intuitive conversations around astronomy, science, and exploration.
  </span>
  <br />
  <span>
    The chatbot responds with information and relevant space images using a combination of GeminiAl and NASA APIs (or Unsplash). The goal is to create an engaging and educational interface for space enthusiasts.
  </span>
</p>


        {/* 🔗 Contact Links with Dropdowns */}
        <div className="mt-8 space-y-4 text-white">

          {/* GitHub */}
          <div>
            <button
              onClick={() => toggleSection("github")}
              className="w-full flex items-center justify-between border-b border-white/20 pb-2 hover:text-purple-300 transition-all"
            >
              <div className="flex items-center gap-2">
                <FaGithub />
                <span className="font-medium">GitHub</span>
              </div>
              <FaArrowRight />
            </button>
            {openSection === "github" && (
              <div className="ml-6 mt-2 space-y-2">
                <a
                  href="https://github.com/Varun822468"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-purple-300"
                >
                  https://github.com/Varun822468
                </a>
                <a
                  href="https://github.com/vikask011"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-purple-300"
                >
                  https://github.com/vikask011
                </a>
              </div>
            )}
          </div>

          {/* LinkedIn */}
          <div>
            <button
              onClick={() => toggleSection("linkedin")}
              className="w-full flex items-center justify-between border-b border-white/20 pb-2 hover:text-purple-300 transition-all"
            >
              <div className="flex items-center gap-2">
                <FaLinkedin />
                <span className="font-medium">LinkedIn</span>
              </div>
              <FaArrowRight />
            </button>
            {openSection === "linkedin" && (
              <div className="ml-6 mt-2 space-y-2">
                <a
                  href="https://www.linkedin.com/in/varun-t-b-8a454931b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-purple-300"
                >
                  https://www.linkedin.com/in/varun-t-b-8a454931b
                </a>
                <a
                  href="https://www.linkedin.com/in/vikas-k-95o"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-purple-300"
                >
                  https://www.linkedin.com/in/vikas-k-95o
                </a>
              </div>
            )}
          </div>

          {/* Contact */}
          <div>
            <button
              onClick={() => toggleSection("contact")}
              className="w-full flex items-center justify-between border-b border-white/20 pb-2 hover:text-purple-300 transition-all"
            >
              <div className="flex items-center gap-2">
                <FaEnvelope />
                <span className="font-medium">Contact</span>
              </div>
              <FaArrowRight />
            </button>
            {openSection === "contact" && (
              <div className="ml-6 mt-2 space-y-2">
                <a
                  href="mailto:varunvaru297@gmail.com"
                  className="block hover:text-purple-300"
                >
                  varunvaru297@gmail.com
                </a>
                <a
                  href="mailto:vikas95116@email.com"
                  className="block hover:text-purple-300"
                >
                  vikas95116@gmail.com
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
