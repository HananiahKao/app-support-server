const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/static', express.static(path.join(__dirname, '..', 'public')));

// Routes
app.get('/support', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'support.html'));
});

app.get('/privacy', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'privacy.html'));
});

app.post('/support-message', (req, res) => {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: 'name, email and message are required' });
    }

    const entry = { id: Date.now(), name, email, message, receivedAt: new Date().toISOString() };
    const storePath = path.join(__dirname, '..', 'messages.json');

    fs.readFile(storePath, 'utf8', (err, data) => {
        let arr = [];
        if (!err && data) {
            try { arr = JSON.parse(data); } catch (e) { arr = []; }
        }
        arr.push(entry);
        fs.writeFile(storePath, JSON.stringify(arr, null, 2), (werr) => {
            if (werr) {
                console.error('Failed to write message:', werr);
                return res.status(500).json({ success: false, error: 'failed to store message' });
            }
            return res.json({ success: true, id: entry.id });
        });
    });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`app-support-server listening on ${PORT}`);
    });
}

module.exports = app;