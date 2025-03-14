web: node index.js
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
