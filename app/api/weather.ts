import { NextRequest, NextResponse } from 'next/server';

// You should set your OpenWeatherMap API key in your .env file as WEATHER_API_KEY
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');
  if (!city) {
    return NextResponse.json({ error: 'City is required' }, { status: 400 });
  }
  if (!WEATHER_API_KEY) {
    return NextResponse.json({ error: 'Missing WEATHER_API_KEY in environment' }, { status: 500 });
  }
  try {
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`
    );
    if (!weatherRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch weather' }, { status: 500 });
    }
    const weatherData = await weatherRes.json();
    return NextResponse.json(weatherData);
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
