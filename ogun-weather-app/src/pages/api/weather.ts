import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { OGUN_CITIES } from '../../utils/api';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_OPENWEATHER_BASE_URL || 'https://api.openweathermap.org/data/2.5';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cityIndex = 0, type = 'current' } = req.query;
  
  try {
    const index = Number(cityIndex);
    if (isNaN(index) || index < 0 || index >= OGUN_CITIES.length) {
      return res.status(400).json({ error: 'Invalid city index' });
    }

    const city = OGUN_CITIES[index];
    const endpoint = type === 'forecast' ? 'forecast' : 'weather';
    
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: {
        lat: city.lat,
        lon: city.lon,
        appid: API_KEY,
        units: 'metric',
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Weather API error:', error);
    return res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}
