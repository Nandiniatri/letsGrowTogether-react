// // import express from "express";
// // import cors from "cors";
// // import dotenv from "dotenv";
// // import OpenAI from "openai";
// // import { createClient } from "@supabase/supabase-js";

// // dotenv.config();
// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // // ENV setup
// // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// // const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// // // Route: POST /analyze
// // app.post("/analyze", async (req, res) => {
// //     const { profileText, targetRole, email } = req.body;

// //     if (!profileText) return res.status(400).json({ error: "Profile text required" });

// //     try {
// //         const prompt = `
// //     You are a LinkedIn Profile Coach. Analyze the following profile text for role: ${targetRole}.
// //     Give:
// //     1. Overall score (0-100)
// //     2. 3 actionable suggestions for improvement
// //     3. A rewritten headline (max 120 chars)
// //     4. A rewritten 'About' summary (3-4 sentences)

// //     Profile:
// //     """${profileText}"""
// //     Return JSON like:
// //     { "score": 85, "suggestions": ["...", "...", "..."], "headline": "...", "summary": "..." }
// //     `;

// //         const completion = await openai.chat.completions.create({
// //             model: "gpt-4o-mini",
// //             messages: [{ role: "user", content: prompt }],
// //             temperature: 0.7,
// //         });

// //         const raw = completion.choices[0].message.content;
// //         const parsed = JSON.parse(raw);

// //         // Save in Supabase
// //         await supabase.from("profile_reviews").insert([
// //             {
// //                 email,
// //                 role: targetRole,
// //                 profile_text: profileText,
// //                 score: parsed.score,
// //                 suggestions: parsed,
// //             },
// //         ]);

// //         res.json(parsed);
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json({ error: "Failed to analyze profile" });
// //     }
// // });

// // app.listen(4000, () => console.log("✅ Server running on http://localhost:4000"));




// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import OpenAI from "openai";
// import { createClient } from "@supabase/supabase-js";

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// // --- Supabase Setup ---
// const supabase = createClient(
//     process.env.SUPABASE_URL,
//     process.env.SUPABASE_ANON_KEY
// );

// // --- OpenAI Setup ---
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// // --- Test Route ---
// app.get("/", (req, res) => {
//     res.send("Server is running successfully 🚀");
// });

// // --- Example Route ---
// app.post("/analyze", async (req, res) => {
//     try {
//         const { prompt } = req.body;
//         const completion = await openai.chat.completions.create({
//             model: "gpt-4o-mini",
//             messages: [{ role: "user", content: prompt }],
//         });

//         res.json({ result: completion.choices[0].message.content });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Something went wrong!" });
//     }
// });

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));










// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// API route
app.post("/chat", async (req, res) => {
  try {
    const { message, user_id } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // OpenAI call
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const aiResponse = completion.choices[0].message.content;

    // Insert into Supabase
    const { data, error } = await supabase.from("chat_history").insert([
      {
        user_id: user_id || "anonymous",
        message: message,
        ai_response: aiResponse,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
    }

    // Return AI response
    res.json({ aiResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


