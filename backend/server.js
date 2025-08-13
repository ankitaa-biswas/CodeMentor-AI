// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import fetch from "node-fetch"; // If using GPT API

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Replace with your actual API key if using GPT-3.5
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// app.post("/review", async (req, res) => {
//     const { code } = req.body;

//     if (!code) {
//         return res.status(400).json({ error: "No code provided" });
//     }

//     try {
//         // Example: call OpenAI GPT-3.5
//         const response = await fetch("https://api.openai.com/v1/chat/completions", {
//             method: "POST",
//             headers: {
//                 "Authorization": `Bearer ${OPENAI_API_KEY}`,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 model: "gpt-3.5-turbo",
//                 messages: [
//                     { role: "system", content: "You are a senior software engineer reviewing code. Give concise improvement suggestions." },
//                     { role: "user", content: code }
//                 ],
//                 max_tokens: 200
//             })
//         });

//         const data = await response.json();
//         const feedback = data.choices?.[0]?.message?.content || "No feedback generated.";

//         res.json({ feedback });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Error generating feedback" });
//     }
// });

// app.listen(5000, () => {
//     console.log("Server running on http://localhost:5000");
// });


// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import 'dotenv/config';
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// app.post("/review", async (req, res) => {
//     const { code } = req.body;

//     if (!code) {
//         return res.status(400).json({ error: "No code provided" });
//     }

//     try {
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
//         const prompt = `You are a senior software engineer. Review the following code and suggest improvements:\n\n${code}`;

//         const result = await model.generateContent(prompt);
//         const feedback = result.response.text();

//         res.json({ feedback });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Error generating feedback" });
//     }
// });

// app.listen(3001, () => {
//     console.log("Server running on http://localhost:3001");
// });


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/review", async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: "No code provided" });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an expert programmer. Review the following code and give suggestions on correctness, style, efficiency, and improvements.",
        },
        { role: "user", content: code },
      ],
      temperature: 0.5,
    });

    const aiFeedback = response.choices[0].message.content;
    res.json({ feedback: aiFeedback });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5001, () => console.log("Server running on http://localhost:5001"));
