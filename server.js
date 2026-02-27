import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());
app.use(express.static("public"));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are PLANTBOT, a professional plant and gardening expert." },
        { role: "user", content: userMessage }
      ]
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({ reply: "Error connecting to AI." });
  }
});

app.listen(3000, () => {
  console.log("🌿 PLANTBOT running on port 3000");
});
