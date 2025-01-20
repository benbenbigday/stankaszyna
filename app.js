const express = require('express');
const cors = require('cors');
app.use(cors());
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Store status in memory
let currentStatus = {
    date: new Date().toISOString().split('T')[0], // Current date
    status: 'brak danych',
    lastUpdated: new Date().toLocaleTimeString('pl-PL')
};

// API endpoint to get the current status
app.get('/status', (req, res) => {
    res.json(currentStatus);
});

// API endpoint to update the status
app.post('/status', (req, res) => {
    const { status } = req.body;

    if (!status || typeof status !== 'string' || status.length > 20) {
        return res.status(400).json({ message: 'Podaj poprawny status (1-20 znaków).' });
    }

    currentStatus = {
        date: new Date().toISOString().split('T')[0],
        status,
        lastUpdated: new Date().toLocaleTimeString('pl-PL')
    };

    res.json({ message: 'Status zaktualizowany!', currentStatus });
});

// Start the server
app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});
