const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.OPENWEATHERMAP_API_KEY;
if (!apiKey) {
    console.error('Error: OPENWEATHERMAP_API_KEY is not set');
    process.exit(1);
}

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) return res.status(400).json({ message: 'City name is required' });
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).json({ message: 'Error fetching weather data' });
    }
});

// Use Render's assigned port
const port = process.env.PORT;
if (!port) {
    console.error('Error: PORT is not set');
    process.exit(1);
}

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});