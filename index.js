import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Webhook for Telegram
app.post('/telegram', async (req, res) => {
    const { message } = req.body;
    if (message && message.text) {
        const chatId = message.chat.id;
        const responseText = `Hello! I'm AlmaLoop. You said: ${message.text}`;
        await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: chatId,
            text: responseText
        });
    }
    res.sendStatus(200);
});

// Webhook for WhatsApp (via Twilio API example)
app.post('/whatsapp', async (req, res) => {
    const { Body, From } = req.body;
    const responseText = `Hello! I'm AlmaLoop. You said: ${Body}`;
    await axios.post(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
        new URLSearchParams({
            From: process.env.TWILIO_WHATSAPP_NUMBER,
            To: From,
            Body: responseText
        }),
        {
            auth: {
                username: process.env.TWILIO_ACCOUNT_SID,
                password: process.env.TWILIO_AUTH_TOKEN
            }
        }
    );
    res.sendStatus(200);
});

// Basic Web Chatbot Endpoint
app.post('/chat', (req, res) => {
    const { message } = req.body;
    res.json({ response: `Hello! I'm AlmaLoop. You said: ${message}` });
});

app.listen(PORT, () => {
    console.log(`AlmaLoop bot is running on port ${PORT}`);
});
