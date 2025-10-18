// // import express from "express";
// // import cors from "cors";
// // import dotenv from "dotenv";
// // import fetch from "node-fetch"; // DeepSeek API call ke liye
// // import { createClient } from "@supabase/supabase-js";

// // dotenv.config(); 
// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // // Connect Supabase
// // const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// // // Route: POST /analyze
// // app.post("/analyze", async (req, res) => {
// //   const { profileText, targetRole, email } = req.body;

// //   if (!profileText) return res.status(400).json({ error: "Profile text required" });

// //   const prompt = `
// //   You are a LinkedIn Profile Coach. Analyze the following profile text for role: ${targetRole}.
// //   Give:
// //   1. Overall score (0-100)
// //   2. 3 actionable suggestions for improvement
// //   3. A rewritten headline (max 120 chars)
// //   4. A rewritten 'About' summary (3-4 sentences)

// //   Profile:
// //   """${profileText}"""
// //   Return JSON like:
// //   { "score": 85, "suggestions": ["...", "...", "..."], "headline": "...", "summary": "..." }
// //   `;

// //   try {
// //     // 🔹 DeepSeek API call
// //     const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
// //       },
// //       body: JSON.stringify({
// //         model: "deepseek-chat",
// //         messages: [{ role: "user", content: prompt }],
// //         temperature: 0.7,
// //       }),
// //     });

// //     const data = await response.json();
// //     const raw = data?.choices?.[0]?.message?.content || "{}";

// //     let parsed;
// //     try {
// //       parsed = JSON.parse(raw);
// //     } catch {
// //       parsed = { score: 0, suggestions: ["Parsing failed"], headline: "", summary: raw };
// //     }

// //     // 🔹 Save to Supabase
// //     await supabase.from("profile_reviews").insert([
// //       {
// //         email,
// //         role: targetRole,
// //         profile_text: profileText,
// //         score: parsed.score,
// //         suggestions: parsed,
// //       },
// //     ]);

// //     res.json(parsed);
// //   } catch (err) {
// //     console.error("Error:", err);
// //     res.status(500).json({ error: "Failed to analyze profile" });
// //   }
// // });

// // app.listen(process.env.PORT, () =>
// //   console.log(`✅ Server running on http://localhost:${process.env.PORT}`)
// // );




// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import puppeteer from "puppeteer";
// import fetch from "node-fetch";
// import { createClient } from "@supabase/supabase-js";

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// // 🔹 Supabase setup (optional)
// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_ANON_KEY
// );

// // 🔹 ROUTE 1: Fetch LinkedIn profile data using Puppeteer
// app.post("/fetch-profile", async (req, res) => {
//   const { profileUrl } = req.body;

//   if (!profileUrl || !profileUrl.includes("linkedin.com/in")) {
//     return res.status(400).json({ error: "Invalid LinkedIn URL" });
//   }

//   try {
//     const browser = await puppeteer.launch({
//       headless: true,
//       args: ["--no-sandbox", "--disable-setuid-sandbox"],
//     });

//     const page = await browser.newPage();
//     await page.goto(profileUrl, { waitUntil: "networkidle2", timeout: 60000 });

//     // Extract name, headline & about
//     const data = await page.evaluate(() => {
//       const name =
//         document.querySelector(".pv-text-details__left-panel h1")?.innerText ||
//         "";
//       const headline =
//         document.querySelector(
//           ".pv-text-details__left-panel .text-body-medium"
//         )?.innerText || "";
//       const about =
//         document.querySelector(
//           ".pv-about__summary-text, .display-flex.mt2.t-12.t-black--light"
//         )?.innerText || "";

//       return { name, headline, about };
//     });

//     await browser.close();
//     res.json(data);
//   } catch (err) {
//     console.error("❌ LinkedIn Scraping Error:", err);
//     res.status(500).json({ error: "Failed to fetch LinkedIn data" });
//   }
// });

// // 🔹 ROUTE 2: Analyze LinkedIn data with DeepSeek AI
// app.post("/analyze", async (req, res) => {
//   const { profileText, targetRole, email } = req.body;

//   if (!profileText) return res.status(400).json({ error: "Profile text required" });

//   const prompt = `
// You are a LinkedIn Profile Coach. Analyze the following profile for the role: ${targetRole}.
// Give:
// 1️⃣ Overall score (0–100)
// 2️⃣ 3 actionable suggestions
// 3️⃣ A better headline (max 120 chars)
// 4️⃣ A rewritten About summary (3–4 sentences)

// Profile:
// """${profileText}"""

// Return valid JSON like:
// {"score":85,"suggestions":["...","...","..."],"headline":"...","summary":"..."}
//   `;

//   try {
//     const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "deepseek-chat",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.7,
//       }),
//     });

//     const data = await response.json();
//     const raw = data?.choices?.[0]?.message?.content || "{}";

//     let parsed;
//     try {
//       parsed = JSON.parse(raw);
//     } catch {
//       parsed = {
//         score: 0,
//         suggestions: ["Could not parse response properly."],
//         headline: "",
//         summary: raw,
//       };
//     }

//     // Optional: save to Supabase
//     if (supabase && email) {
//       await supabase.from("profile_reviews").insert([
//         {
//           email,
//           role: targetRole,
//           profile_text: profileText,
//           score: parsed.score,
//           suggestions: parsed,
//         },
//       ]);
//     }

//     res.json(parsed);
//   } catch (err) {
//     console.error("❌ DeepSeek Error:", err);
//     res.status(500).json({ error: "Failed to analyze profile" });
//   }
// });

// // 🔹 Start server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));





import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import puppeteer from "puppeteer";
import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Supabase setup (optional)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// 🔹 ROUTE 1: Fetch LinkedIn profile data using Puppeteer
app.post("/fetch-profile", async (req, res) => {
  const { profileUrl } = req.body;

  if (!profileUrl || !profileUrl.includes("linkedin.com/in")) {
    return res.status(400).json({ error: "Invalid LinkedIn URL" });
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    await page.goto(profileUrl, { waitUntil: "networkidle2", timeout: 60000 });

    // Extract name, headline & about
    const data = await page.evaluate(() => {
      const name =
        document.querySelector(".pv-text-details__left-panel h1")?.innerText ||
        "";
      const headline =
        document.querySelector(
          ".pv-text-details__left-panel .text-body-medium"
        )?.innerText || "";
      const about =
        document.querySelector(
          ".pv-about__summary-text, .display-flex.mt2.t-12.t-black--light"
        )?.innerText || "";

      return { name, headline, about };
    });

    await browser.close();
    res.json(data);
  } catch (err) {
    console.error("❌ LinkedIn Scraping Error:", err);
    res.status(500).json({ error: "Failed to fetch LinkedIn data" });
  }
});

// 🔹 ROUTE 2: Analyze LinkedIn data with DeepSeek AI
app.post("/analyze", async (req, res) => {
  const { profileText, targetRole, email } = req.body;

  if (!profileText)
    return res.status(400).json({ error: "Profile text required" });

  const prompt = `
You are a LinkedIn Profile Coach. Analyze the following profile for the role: ${targetRole}.
Give:
1️⃣ Overall score (0–100)
2️⃣ 3 actionable suggestions
3️⃣ A better headline (max 120 chars)
4️⃣ A rewritten About summary (3–4 sentences)

Profile:
"""${profileText}"""

Return valid JSON like:
{"score":85,"suggestions":["...","...","..."],"headline":"...","summary":"..."}
  `;

  try {
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
      parsed = {
        score: 0,
        suggestions: ["Could not parse AI response properly."],
        headline: "",
        summary: raw,
      };
    }

    // Optional: Save feedback in Supabase
    if (supabase && email) {
      await supabase.from("profile_reviews").insert([
        {
          email,
          role: targetRole,
          profile_text: profileText,
          score: parsed.score,
          suggestions: parsed,
        },
      ]);
    }

    res.json(parsed);
  } catch (err) {
    console.error("❌ DeepSeek Error:", err);
    res.status(500).json({ error: "Failed to analyze profile" });
  }
});

// 🔹 Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
