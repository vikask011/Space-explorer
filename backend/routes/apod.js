import express from "express";
import axios from "axios";
const router = express.Router();

const NASA_API_KEY = process.env.NASA_API_KEY;

router.get("/apod", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
    );

    res.json({
      title: response.data.title,
      image: response.data.url,
      explanation: response.data.explanation,
    });
  } catch (err) {
    console.error("APOD Error:", err.message);
    res.status(500).json({ error: "Failed to fetch APOD" });
  }
});

export default router;
