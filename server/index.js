import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch"; // DeepSeek API call ke liye
import { createClient } from "@supabase/supabase-js";

dotenv.config(); 
const app = express();
app.use(cors());
app.use(express.json());

// Connect Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Route: POST /analyze
app.post("/analyze", async (req, res) => {
  const { profileText, targetRole, email } = req.body;

  if (!profileText) return res.status(400).json({ error: "Profile text required" });

  const prompt = `
  You are a LinkedIn Profile Coach. Analyze the following profile text for role: ${targetRole}.
  Give:
  1. Overall score (0-100)
  2. 3 actionable suggestions for improvement
  3. A rewritten headline (max 120 chars)
  4. A rewritten 'About' summary (3-4 sentences)

  Profile:
  """${profileText}"""
  Return JSON like:
  { "score": 85, "suggestions": ["...", "...", "..."], "headline": "...", "summary": "..." }
  `;

  try {
    // 🔹 DeepSeek API call
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const raw = data?.choices?.[0]?.message?.content || "{}";

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = { score: 0, suggestions: ["Parsing failed"], headline: "", summary: raw };
    }

    // 🔹 Save to Supabase
    await supabase.from("profile_reviews").insert([
      {
        email,
        role: targetRole,
        profile_text: profileText,
        score: parsed.score,
        suggestions: parsed,
      },
    ]);

    res.json(parsed);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to analyze profile" });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`✅ Server running on http://localhost:${process.env.PORT}`)
);
