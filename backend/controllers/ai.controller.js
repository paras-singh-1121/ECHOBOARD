import { getAICaptionSuggestions } from '../services/ai.service.js';

// Ensure the name here matches your route import
export const handleCaptionGeneration = async (req, res) => {
  try {
    const { draft, tone } = req.body;

    if (!draft) {
      return res.status(400).json({ success: false, message: "Draft required" });
    }

    const suggestions = await getAICaptionSuggestions(draft, tone);
    res.status(200).json({ success: true, suggestions });
  } catch (error) {
    res.status(500).json({ success: false, message: "EchoAI Error" });
  }
};