import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';  // Import the CORS middleware
import Groq from "groq-sdk";

dotenv.config();

const apiKey = process.env.API_KEY;
console.log(apiKey);

const app = express();
const port = 3000;

// Use the CORS middleware
app.use(cors());  // Enable all CORS requests

// Middleware to parse JSON bodies
app.use(express.json());

const groq = new Groq({ apiKey: process.env.API_KEY });

app.post('/api/chatbot', async (req, res) => {
    const userMessage = req.body.message;
    try {
        const chatCompletion = await getGroqChatCompletion(userMessage);
        const botResponse = chatCompletion.choices[0]?.message?.content || "Sorry, I didn't understand that.";
        res.json({ response: botResponse });
    } catch (error) {
        res.status(500).json({ error: "Failed to get response from the bot" });
    }
});

async function getGroqChatCompletion(userMessage) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: userMessage,
            },
            {
                role: "system",
                content: "you respond as if you were 5 years old and in short answers like 10 words or less",
            },
        ],
        model: "llama3-8b-8192",
    });
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});