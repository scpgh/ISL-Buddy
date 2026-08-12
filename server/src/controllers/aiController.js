import { queryGroqAi } from '../services/groqService.js';

export async function handleAiChat(req, res) {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GROQ_API_KEY || '';
    const reply = await queryGroqAi(prompt, apiKey);
    res.json({ reply });
  } catch (err) {
    console.error('Server AI Controller error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
