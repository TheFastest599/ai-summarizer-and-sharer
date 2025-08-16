const express = require('express');
const Groq = require('groq-sdk');
const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post('/', async (req, res) => {
  try {
    const { transcript, customPrompt } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: 'Transcript is required' });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: 'Groq API key not configured' });
    }

    // Default prompt if none provided
    const defaultPrompt = `Please summarize this meeting transcript in a clear, structured format with key points, action items, and important decisions.`;

    const prompt = customPrompt || defaultPrompt;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are an expert meeting summarizer. Create clear, actionable summaries that capture the most important information from meeting transcripts.',
        },
        {
          role: 'user',
          content: `${prompt}\n\nTranscript:\n${transcript}`,
        },
      ],
      model: 'qwen/qwen3-32b',
      temperature: 0.3,
      max_tokens: 2000,
    });

    const summary = completion.choices[0]?.message?.content;

    if (!summary) {
      return res.status(500).json({ error: 'Failed to generate summary' });
    }

    res.json({
      summary,
      success: true,
      message: 'Summary generated successfully',
    });
  } catch (error) {
    console.error('Summarization error:', error);

    if (error.status === 401) {
      return res.status(401).json({ error: 'Invalid Groq API key' });
    }

    if (error.status === 429) {
      return res
        .status(429)
        .json({ error: 'Rate limit exceeded. Please try again later.' });
    }

    res.status(500).json({
      error: 'Failed to generate summary',
      message: error.message,
    });
  }
});

module.exports = router;
