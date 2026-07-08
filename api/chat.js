export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const SYSTEM_PROMPT =
        'You are a helpful assistant for the Grace and Truth Life Care Centre website.';

    const geminiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;

    if (!geminiKey && !openaiKey) {
        return res.status(500).json({
            error: 'AI API key is not configured. Add GEMINI_API_KEY or OPENAI_API_KEY in Vercel environment variables.',
        });
    }

    const { messages } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages are required.' });
    }

    try {
        let aiText = 'Sorry, I could not generate a reply.';

        if (geminiKey) {
            const prompt = [
                SYSTEM_PROMPT,
                '',
                'Conversation history:',
                ...messages.map((entry) => `${entry.role === 'user' ? 'User' : 'Assistant'}: ${entry.content}`),
            ].join('\n');

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ role: 'user', parts: [{ text: prompt }] }],
                    }),
                }
            );

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error?.message || 'Unable to get AI response.');
            }

            aiText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || aiText;
        } else {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${openaiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
                    temperature: 0.7,
                    max_tokens: 500,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error?.message || 'Unable to get AI response.');
            }

            aiText = data.choices?.[0]?.message?.content?.trim() || aiText;
        }

        return res.status(200).json({ reply: aiText });
    } catch (err) {
        return res.status(500).json({ error: err.message || 'Error sending message.' });
    }
}
