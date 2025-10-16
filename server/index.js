// // index.js
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { createClient } from "@supabase/supabase-js";
// import OpenAI from "openai";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Supabase client
// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_ANON_KEY
// );

// // OpenAI client
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // API route
// app.post("/chat", async (req, res) => {
//   try {
//     const { message, user_id } = req.body;

//     if (!message) {
//       return res.status(400).json({ error: "Message is required" });
//     }

//     // OpenAI call
//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: message }],
//     });

//     const aiResponse = completion.choices[0].message.content;

//     // Insert into Supabase
//     const { data, error } = await supabase.from("chat_history").insert([
//       {
//         user_id: user_id || "anonymous",
//         message: message,
//         ai_response: aiResponse,
//       },
//     ]);

//     if (error) {
//       console.error("Supabase insert error:", error);
//     }

//     // Return AI response
//     res.json({ aiResponse });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });

// // Start server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
















// // index.js
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { createClient } from "@supabase/supabase-js";
// import OpenAI from "openai";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Supabase client
// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_ANON_KEY
// );

// // OpenAI client
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// // POST /chat route
// app.post("/chat", async (req, res) => {
//   try {
//     const { email, role, profile_text } = req.body;

//     if (!profile_text || !role || !email) {
//       return res.status(400).json({ error: "email, role and profile_text are required" });
//     }

//     // OpenAI analysis
//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "user",
//           content: `Analyze this LinkedIn profile for role "${role}": ${profile_text}. Return score (0-100), headline suggestion, rewritten summary, and 3 improvement suggestions.`
//         }
//       ],
//     });

//     const aiContent = completion.choices[0].message.content;

//     // Here we assume AI returns JSON string like:
//     // { "score": 85, "headline": "...", "summary": "...", "suggestions": ["...", "...", "..."] }
//     let aiResult;
//     try {
//       aiResult = JSON.parse(aiContent);
//     } catch {
//       aiResult = {
//         score: 0,
//         headline: "",
//         summary: aiContent,
//         suggestions: []
//       };
//     }

//     // Insert into Supabase
//     const { data, error } = await supabase.from("profile_reviews").insert([
//       {
//         email,
//         role,
//         profile_text,
//         score: aiResult.score,
//         suggestions: aiResult.suggestions
//       }
//     ]);

//     if (error) {
//       console.error("Supabase insert error:", error);
//     }

//     // Return AI response
//     res.json({
//       score: aiResult.score,
//       headline: aiResult.headline,
//       summary: aiResult.summary,
//       suggestions: aiResult.suggestions
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });

// // Start server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });








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

// POST /chat route
app.post("/chat", async (req, res) => {
  try {
    const { email, role, profile_text } = req.body;

    if (!profile_text || !role) {
      return res
        .status(400)
        .json({ error: "Both role and profile_text are required" });
    }

    // OpenAI prompt
    const prompt = `
    Analyze this LinkedIn About section for the role "${role}".
    Return JSON ONLY in this format:
    {
      "score": number (0-100),
      "headline": string,
      "summary": string,
      "suggestions": [string, string, string]
    }

    Profile:
    """${profile_text}"""
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;
    let aiResult;

    try {
      aiResult = JSON.parse(aiResponse);
    } catch (err) {
      console.warn("AI returned non-JSON, using fallback");
      aiResult = {
        score: 0,
        headline: "No headline generated",
        summary: aiResponse,
        suggestions: [],
      };
    }

    // Save in Supabase
    const { error: insertError } = await supabase
      .from("profile_reviews")
      .insert([
        {
          email: email || "anonymous@example.com",
          role,
          profile_text,
          score: aiResult.score,
          suggestions: aiResult.suggestions,
        },
      ]);

    if (insertError) console.error("Supabase insert error:", insertError);

    res.json(aiResult);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
