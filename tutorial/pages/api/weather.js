import axios from 'axios';

export default async function handler(req, res) {
  const { latitude, longitude } = req.query;
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m`;

  try {
    const response = await axios.get(apiUrl);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}