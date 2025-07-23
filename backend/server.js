const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = 'GEMINI_API_KEY'; 

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // or "gemini-pro" if you want
      contents: userMessage,
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      }
    });
    // The SDK returns a response object, get the text:
    res.json({ reply: response.text || 'No response from Gemini.' });
  } catch (err) {
    console.error(err);
    res.json({ reply: 'Error contacting Gemini API.' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));