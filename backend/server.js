import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import apodRoute from "./routes/apod.js";
import imageRoute from "./routes/image.js";
import chatbotRoute from "./routes/chatbot.js";



dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/nasa", apodRoute);
app.use("/api/image", imageRoute);
app.use("/api/chatbot", chatbotRoute);


app.get("/", (req, res) => {
  res.send("🌌 NASA API Server is running.");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
