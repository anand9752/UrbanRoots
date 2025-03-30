import { useState, useEffect } from 'react';
import '../styles/Weather.css';

export function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchMethod, setFetchMethod] = useState('current'); // 'current', 'city', or 'coordinates'
  const [manualLocation, setManualLocation] = useState({ lat: 35, lon: 139 }); // Default values
  const [cityName, setCityName] = useState('');
  const [locationName, setLocationName] = useState('');

  const fetchWeatherByCoordinates = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `http://localhost:5000/api/weather?lat=${lat}&lon=${lon}`
      );
      
      if (!response.ok) {
        throw new Error('Weather data fetch failed');
      }
      
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
      
      // Try to get a readable location name for display
      try {
        const locationResponse = await fetch(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=73d794ce3aeac27b680921cffce4445c`
        );
        if (locationResponse.ok) {
          const locationData = await locationResponse.json();
          if (locationData.length > 0) {
            const place = locationData[0];
            setLocationName(`${place.name}${place.state ? `, ${place.state}` : ''}${place.country ? `, ${place.country}` : ''}`);
          }
        }
      } catch (err) {
        console.error('Could not fetch location name:', err);
        setLocationName(`${lat.toFixed(2)}, ${lon.toFixed(2)}`);
      }
      
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Failed to load weather data. Please try again later.');
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (city) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://urban-roots-backend.vercel.app/api/geocode?city=${encodeURIComponent(city)}`
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'City weather data fetch failed');
      }
      
      const data = await response.json();
      setWeatherData(data);
      setLocationName(city);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching city weather:', err);
      setError(err.message || 'Failed to load weather data for this city. Please check the spelling and try again.');
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoordinates(latitude, longitude);
      },
      (err) => {
        console.error('Geolocation error:', err);
        setError(`Could not get your location: ${err.message}`);
        setLoading(false);
      },
      { timeout: 10000 }
    );
  };

  useEffect(() => {
    // Automatically fetch weather for current location when component mounts
    if (fetchMethod === 'current') {
      getCurrentLocation();
    }
  }, []);

  const handleCoordinatesSubmit = (e) => {
    e.preventDefault();
    const lat = parseFloat(e.target.latitude.value);
    const lon = parseFloat(e.target.longitude.value);
    if (!isNaN(lat) && !isNaN(lon)) {
      setManualLocation({ lat, lon });
      fetchWeatherByCoordinates(lat, lon);
    }
  };

  const handleCitySubmit = (e) => {
    e.preventDefault();
    if (cityName.trim()) {
      fetchWeatherByCity(cityName);
    }
  };

  const handleMethodChange = (method) => {
    setFetchMethod(method);
    setError(null);
    
    if (method === 'current') {
      getCurrentLocation();
    } else if (method === 'coordinates') {
      fetchWeatherByCoordinates(manualLocation.lat, manualLocation.lon);
    }
    // For 'city' method, we'll wait for form submission
  };

  const kelvinToCelsius = (k) => (k - 273.15).toFixed(1);
  
  // Function to get vegetable recommendations based on weather
  const getVegetableRecommendations = (weatherData) => {
    if (!weatherData || !weatherData.main) return [];
    
    const temp = weatherData.main.temp - 273.15; // Convert to Celsius
    const humidity = weatherData.main.humidity;
    const weatherCondition = weatherData?.weather?.[0]?.main || '';
    
    let recommendations = [];
    
    // Temperature-based recommendations
    if (temp < 15) {
      recommendations.push(
        { name: 'Spinach', reason: 'thrives in cooler temperatures' },
        { name: 'Kale', reason: 'frost-resistant and nutrient-rich' },
        { name: 'Carrots', reason: 'develop sweetness in cool weather' },
        { name: 'Peas', reason: 'prefer cooler growing conditions' }
      );
    } else if (temp >= 15 && temp < 25) {
      recommendations.push(
        { name: 'Tomatoes', reason: 'ideal moderate temperature for growth' },
        { name: 'Cucumbers', reason: 'thrive in mild temperatures' },
        { name: 'Beans', reason: 'grow well in moderate conditions' },
        { name: 'Lettuce', reason: 'perfect growing temperature range' }
      );
    } else if (temp >= 25 && temp < 35) {
      recommendations.push(
        { name: 'Okra', reason: 'heat-loving and drought-tolerant' },
        { name: 'Eggplant', reason: 'thrives in warm temperatures' },
        { name: 'Peppers', reason: 'produce well in hot conditions' },
        { name: 'Sweet Potatoes', reason: 'need warm soil to develop' }
      );
    } else {
      recommendations.push(
        { name: 'Amaranth', reason: 'extremely heat-tolerant' },
        { name: 'Malabar Spinach', reason: 'grows well in hot and humid conditions' },
        { name: 'Indian Cluster Beans', reason: 'suitable for very hot weather' }
      );
    }
    
    // Add or filter based on humidity
    if (humidity > 75) {
      recommendations.push({ name: 'Taro', reason: 'thrives in high humidity' });
      // Filter out plants that don't do well in high humidity
      recommendations = recommendations.filter(veg => 
        !['Tomatoes', 'Peppers'].includes(veg.name));
    } else if (humidity < 40) {
      recommendations.push(
        { name: 'Rosemary', reason: 'drought-resistant herb' },
        { name: 'Sage', reason: 'prefers drier conditions' }
      );
    }
    
    // Weather condition specific recommendations
    if (weatherCondition.includes('Rain')) {
      recommendations.push({ name: 'Rice', reason: 'benefits from rainy conditions' });
      // Avoid recommending plants that suffer in rainy conditions
      recommendations = recommendations.filter(veg => 
        !['Tomatoes', 'Peppers'].includes(veg.name));
    } else if (weatherCondition.includes('Clear')) {
      recommendations.push({ name: 'Sunflowers', reason: 'thrive in sunny conditions' });
    }
    
    // Limit to 5 recommendations
    return recommendations.slice(0, 5);
  };

  return (
    <div className="weather-container">
      <h2>Current Weather Conditions</h2>
      
      <div className="fetch-method-selector">
        <button 
          className={`method-button ${fetchMethod === 'current' ? 'active' : ''}`}
          onClick={() => handleMethodChange('current')}
        >
          Use Current Location
        </button>
        <button 
          className={`method-button ${fetchMethod === 'city' ? 'active' : ''}`}
          onClick={() => handleMethodChange('city')}
        >
          Search by City
        </button>
        <button 
          className={`method-button ${fetchMethod === 'coordinates' ? 'active' : ''}`}
          onClick={() => handleMethodChange('coordinates')}
        >
          Enter Coordinates
        </button>
      </div>
      
      {fetchMethod === 'city' && (
        <form onSubmit={handleCitySubmit} className="city-form">
          <div className="form-group">
            <label htmlFor="city">City Name:</label>
            <input 
              type="text" 
              id="city" 
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              placeholder="Enter city name (e.g., Mumbai, London)"
              required
            />
          </div>
          <button type="submit">Get Weather</button>
        </form>
      )}
      
      {fetchMethod === 'coordinates' && (
        <form onSubmit={handleCoordinatesSubmit} className="location-form">
          <div className="form-group">
            <label htmlFor="latitude">Latitude:</label>
            <input 
              type="number" 
              id="latitude" 
              name="latitude"
              step="0.000001"
              defaultValue={manualLocation.lat}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="longitude">Longitude:</label>
            <input 
              type="number" 
              id="longitude" 
              name="longitude"
              step="0.000001"
              defaultValue={manualLocation.lon}
              required
            />
          </div>
          
          <button type="submit">Update Location</button>
        </form>
      )}
      
      {loading && <div className="loading-indicator">Loading weather data...</div>}
      {error && <div className="error-message">{error}</div>}
      
      {weatherData && !loading && (
        <div className="weather-info">
          <div className="weather-main">
            <h3>Weather for {locationName}</h3>
            <div className="weather-icon">
              {weatherData.weather && weatherData.weather[0] && (
                <img 
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                  alt={weatherData.weather[0].description} 
                />
              )}
            </div>
            <p className="weather-description">
              {weatherData.weather && weatherData.weather[0]?.description}
            </p>
          </div>
          
          <div className="weather-details">
            <div className="weather-detail">
              <span>Temperature:</span> 
              <strong>{kelvinToCelsius(weatherData.main?.temp)}°C</strong>
            </div>
            <div className="weather-detail">
              <span>Feels like:</span> 
              <strong>{kelvinToCelsius(weatherData.main?.feels_like)}°C</strong>
            </div>
            <div className="weather-detail">
              <span>Humidity:</span> 
              <strong>{weatherData.main?.humidity}%</strong>
            </div>
            <div className="weather-detail">
              <span>Wind speed:</span> 
              <strong>{weatherData.wind?.speed} m/s</strong>
            </div>
            <div className="weather-detail">
              <span>Pressure:</span> 
              <strong>{weatherData.main?.pressure} hPa</strong>
            </div>
          </div>
          
          <div className="weather-advice">
            <h4>Gardening Recommendations:</h4>
            <ul>
              {weatherData.weather && weatherData.weather[0]?.main === 'Rain' && (
                <li>It's raining! No need to water your plants today.</li>
              )}
              {weatherData.main && weatherData.main.temp > 303 && (
                <li>High temperature alert! Provide shade for sensitive plants and water them in the evening.</li>
              )}
              {weatherData.main && weatherData.main.temp < 283 && (
                <li>Cool conditions. Consider covering sensitive plants at night.</li>
              )}
              {weatherData.main && weatherData.main.humidity < 30 && (
                <li>Low humidity. Consider misting your plants and watering more frequently.</li>
              )}
              {weatherData.wind && weatherData.wind.speed > 5 && (
                <li>Windy conditions. Secure any tall plants or young saplings.</li>
              )}
              {weatherData.weather && weatherData.weather[0]?.main === 'Clear' && (
                <li>Clear skies! A good day for planting or garden maintenance.</li>
              )}
            </ul>
          </div>
          
          {/* New section for vegetable recommendations */}
          <div className="vegetable-recommendations">
            <h4>Recommended Vegetables to Grow:</h4>
            {getVegetableRecommendations(weatherData).length > 0 ? (
              <div className="vegetable-grid">
                {getVegetableRecommendations(weatherData).map((veg, index) => (
                  <div key={index} className="vegetable-card">
                    <h5>{veg.name}</h5>
                    <p>Why: {veg.reason}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No specific recommendations available for current conditions.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
