import express from "express";
import axios from "axios";
const router = express.Router();

router.get("/search", async (req, res) => {
  const query = req.query.q || "space";

  try {
    const response = await axios.get(
      `https://images-api.nasa.gov/search?q=${query}&media_type=image`
    );

    const results = response.data.collection.items.slice(0, 6); // limit to 5 images
    const imageUrls = results
      .map((item) => item.links?.[0]?.href)
      .filter(Boolean);

    res.json({ images: imageUrls });
  } catch (err) {
    console.error("NASA API Error:", err.message);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

export default router;
