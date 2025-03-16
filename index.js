import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// ✅ Webhook for Telegram
app.post('/telegram', async (req, res) => {
    console.log("Received Telegram message:", req.body);  // Debugging log
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

// ✅ Basic homepage
app.get('/', (req, res) => {
    res.send('AlmaLoop Bot is running!');
});

app.listen(PORT, () => {
    console.log(`AlmaLoop bot is running on port ${PORT}`);
});
