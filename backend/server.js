const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route to get weather data by lat/lon
app.get('/api/weather', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({ 
        error: 'Latitude and longitude are required parameters' 
      });
    }
    
    const API_KEY = process.env.AGRO_API_KEY;
    
    const response = await axios.get(
      `https://api.agromonitoring.com/agro/1.0/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch weather data',
      details: error.message 
    });
  }
});

// New route to get coordinates by city name
app.get('/api/geocode', async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({ 
        error: 'City name is required' 
      });
    }
    
    const API_KEY = process.env.AGRO_API_KEY;
    
    // OpenWeatherMap geocoding API to convert city name to coordinates
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
    );
    
    if (response.data.length === 0) {
      return res.status(404).json({ error: 'City not found' });
    }
    
    const { lat, lon } = response.data[0];
    
    // Now get the weather with these coordinates
    const weatherResponse = await axios.get(
      `https://api.agromonitoring.com/agro/1.0/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    
    res.json(weatherResponse.data);
  } catch (error) {
    console.error('Error fetching geocoding data:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch geocoding data',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
