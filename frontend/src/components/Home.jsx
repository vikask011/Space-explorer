import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import SpaceCanvas from "../components/SpaceCanvas";
import RotatingEarth from "./RotatingEarth";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-screen bg-black text-white overflow-hidden">
      {/* Top Navbar */}
      <div className="absolute top-0 left-0 w-full z-30">
        <Navbar />
      </div>

      {/* Combined 3D Canvas */}
      <RotatingEarth />

      {/* Animated Text and Button */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/30 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-bold mb-6 text-center drop-shadow-lg"
        >
          <span className="text-white">Welcome to </span>
          <span className="text-[#00ffff]">Space Explorer</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl max-w-2xl text-center text-white/80"
        >
          Ask anything about the Universe and get instant AI answers with Visuals.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/chatbot")}
          className="mt-10 bg-purple-600 px-8 py-3 rounded-full text-lg font-semibold shadow-xl hover:bg-purple-700 transition-all"
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
};

export default Home;
