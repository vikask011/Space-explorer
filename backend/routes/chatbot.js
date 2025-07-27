import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/ask", async (req, res) => {
  const { userMessage } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are a helpful and expert assistant that only answers questions related to space, astronomy, cosmology, and astrophysics. 
If the user asks anything outside these topics, you will politely say you can only talk about space.

User: ${userMessage}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    res.json({ reply });
  } catch (err) {
    console.error("Gemini API Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to get response from Gemini.",
      details: err.response?.data || err.message,
    });
  }
});

export default router;
