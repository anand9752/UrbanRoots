const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced CORS configuration - add your actual frontend domain
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://urban-roots.vercel.app',
    'https://urbanroots.vercel.app',
    'https://urban-roots-git-main.vercel.app',
    // Add your actual frontend deployed domain here if not listed
    // 'https://your-actual-frontend-domain.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Apply CORS middleware with the enhanced options
app.use(cors(corsOptions));
app.use(express.json());

// Route to get weather data by lat/lon
app.get('/api/weather', async (req, res) => {
  try {
    // Manually set CORS headers for this specific route
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
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
    // Manually set CORS headers for this specific route
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
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

// New route to handle reverse geocoding
app.get('/api/reverse-geocode', async (req, res) => {
  try {
    // Manually set CORS headers for this specific route
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({ 
        error: 'Latitude and longitude are required parameters' 
      });
    }
    
    const API_KEY = process.env.AGRO_API_KEY;
    
    // Call the OpenWeatherMap Reverse Geocoding API
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching reverse geocoding data:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch location data',
      details: error.message 
    });
  }
});

// Add a better test route with CORS headers
app.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send('Urban Roots API is running! Version: 1.0.1');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS allowed origins: ${corsOptions.origin.join(', ')}`);
});
