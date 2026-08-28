import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
});

// ===============================
// HEALTH CHECK
// ===============================

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "GramUdyam AI server is running",
  });
});

// ===============================
// SPEECH → TEXT
// ===============================

app.post(
  "/api/speech-to-text",
  upload.single("audio"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          error: "No audio file received",
        });
      }

      console.log("Audio received:", req.file.size, "bytes");

      const formData = new FormData();

      const audioBlob = new Blob(
        [req.file.buffer],
        {
          type: req.file.mimetype || "audio/webm",
        }
      );

      formData.append(
        "file",
        audioBlob,
        "voice.webm"
      );

      formData.append(
        "model",
        "saaras:v3"
      );

      formData.append(
        "mode",
        "transcribe"
      );

      const response = await fetch(
        "https://api.sarvam.ai/speech-to-text",
        {
          method: "POST",

          headers: {
            "api-subscription-key":
              process.env.SARVAM_API_KEY,
          },

          body: formData,
        }
      );

      const data = await response.json();

      console.log("Sarvam STT:", data);

      if (!response.ok) {
        return res.status(response.status).json({
          error:
            data.error?.message ||
            data.error ||
            "Sarvam STT failed",
        });
      }

      res.json({
        transcript: data.transcript || "",
        languageCode:
          data.language_code || null,
      });

    } catch (error) {
      console.error("STT ERROR:", error);

      res.status(500).json({
        error: error.message,
      });
    }
  }
);

// ===============================
// AI CHAT
// ===============================

app.post("/api/chat", async (req, res) => {
  try {
    const {
      message,
      languageCode = "hi-IN",
    } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const languageName = {
      "hi-IN": "Hindi",
      "en-IN": "English",
      "ta-IN": "Tamil",
      "te-IN": "Telugu",
      "kn-IN": "Kannada",
      "ml-IN": "Malayalam",
      "mr-IN": "Marathi",
      "gu-IN": "Gujarati",
      "bn-IN": "Bengali",
      "pa-IN": "Punjabi",
      "od-IN": "Odia",
    }[languageCode] || "Indian language";

    const systemPrompt = `
You are GramUdyam, an AI business assistant
for rural entrepreneurs in India.

Your job is to help users understand:

- business ideas
- project cost
- investment
- profit
- working capital
- government schemes
- loans
- eligibility
- risks
- business feasibility

IMPORTANT:

Reply in ${languageName}.

Keep the response simple and practical.

The user may be a first-time entrepreneur.

Do not use complicated financial terminology.

Give actionable advice.

If the user asks about a business,
try to explain:
1. feasibility
2. approximate investment
3. major costs
4. possible risks
5. next step

User message:

${message}
`;

    const response = await fetch(
      "https://api.sarvam.ai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "api-subscription-key":
            process.env.SARVAM_API_KEY,
        },

        body: JSON.stringify({
          model: "sarvam-105b-conversations",

          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: message,
            },
          ],

          temperature: 0.3,

          max_tokens: 500,
        }),
      }
    );

    const data = await response.json();

    console.log("Sarvam AI:", data);

    if (!response.ok) {
      return res.status(response.status).json({
        error:
          data.error?.message ||
          data.error ||
          "AI request failed",
      });
    }

    const reply =
      data.choices?.[0]?.message?.content;

    res.json({
      reply:
        reply ||
        "Sorry, I could not generate a response.",
    });

  } catch (error) {
    console.error("CHAT ERROR:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});

// ===============================
// TEXT → SPEECH
// ===============================

app.post("/api/text-to-speech", async (req, res) => {
  try {
    const {
      text,
      languageCode = "hi-IN",
    } = req.body;

    if (!text) {
      return res.status(400).json({
        error: "Text is required",
      });
    }

    const response = await fetch(
      "https://api.sarvam.ai/text-to-speech",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "api-subscription-key":
            process.env.SARVAM_API_KEY,
        },

        body: JSON.stringify({
          text: text.substring(0, 2500),

          target_language_code:
            languageCode,

          model: "bulbul:v3",

          speaker: "shubh",

          pace: 1.0,
        }),
      }
    );

    const data = await response.json();

    console.log("Sarvam TTS:", data);

    if (!response.ok) {
      return res.status(response.status).json({
        error:
          data.error?.message ||
          data.error ||
          "TTS failed",
      });
    }

    res.json({
      audio: data.audios?.[0],
    });

  } catch (error) {
    console.error("TTS ERROR:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});

// ===============================
// START SERVER
// ===============================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `GramUdyam server running at http://localhost:${PORT}`
  );
});