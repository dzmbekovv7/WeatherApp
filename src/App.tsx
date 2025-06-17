import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar.tsx';
import WeatherMain from './components/WeatherMain.tsx';
import WeatherDetails from './components/WeatherDetails.tsx';

const apiKey = '1915523048af48bcbdc124458251706';

const weatherBackgrounds: Record<string, string> = {
  Sunny: 'https://media.istockphoto.com/id/962500712/video/4k-tl-cloudy-sky-with-sun-rays.jpg?s=640x640&k=20&c=XQrz-Y4FIzovVlayePLhPZpHoM8-iLN7gZ_uSdnoe-8=',
  Clear: 'https://static.vecteezy.com/system/resources/previews/015/134/640/non_2x/a-view-of-the-sky-with-clear-weather-in-the-morning-the-lush-green-fields-are-outdoors-agricultural-landscape-background-design-template-for-book-cover-magazine-website-photo.jpg',
  Rain: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1600&q=80',
  Drizzle: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1600&q=80',
  Thunderstorm: 'https://images.unsplash.com/photo-1500674425229-f692875b0ab7?auto=format&fit=crop&w=1600&q=80',
  Snow: 'https://images.unsplash.com/photo-1608889175119-d6b8f1493a16?auto=format&fit=crop&w=1600&q=80',
  Clouds: 'https://c8.alamy.com/comp/R24WPR/forest-and-green-field-nature-landscape-on-cloudy-day-sky-with-lot-white-clouds-above-forest-trees-nature-and-freedom-concept-cloudy-weather-forecast-weather-changes-signs-cloudy-sky-and-nature-R24WPR.jpg',
  Mist: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80',
  Fog: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80',
};

type WeatherData = {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    pressure_mb: number;
    feelslike_c: number;
    cloud: number;
    last_updated: string;
  };
};

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (cityName: string): Promise<void> => {
    if (!cityName) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(cityName)}`
      );
      if (!res.ok) throw new Error('Город не найден');
      const data = await res.json();
      setWeather(data);
      setCity(cityName);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Произошла неизвестная ошибка');
      }
    } finally {
      setLoading(false);
    }
  };

  // При первом рендере загружаем погоду в Токио
  useEffect(() => {
    fetchWeather('Tokyo');
  }, []);

  // Получаем описание погоды для выбора фона
  const weatherText = weather?.current?.condition?.text || '';
  // Ищем подходящий фон
  const backgroundKey =
    Object.keys(weatherBackgrounds).find((key) =>
      weatherText.toLowerCase().includes(key.toLowerCase())
    ) || 'Clear';

  const backgroundUrl =
    weatherBackgrounds[backgroundKey as keyof typeof weatherBackgrounds] ||
    weatherBackgrounds['Clear'];

  return (
    <div
      style={{
        position: 'relative',
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        padding: 20,
        overflow: 'hidden',
      }}
    >
      {/* Оверлей для затемнения фона */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 0,
        }}
      />

      {/* Контент поверх оверлея */}
      <div
        style={{
          flex: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: 40,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {loading && <p>Загрузка...</p>}
        {error && <p style={{ color: 'salmon' }}>{error}</p>}
        {weather && !loading && <WeatherMain weather={weather} />}
      </div>

      <div
        style={{
          flex: 1,
          paddingLeft: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h1 style={{    fontFamily: "'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",}}>{city}</h1>
        <SearchBar onSearch={fetchWeather} />
        {weather && !loading && <WeatherDetails weather={weather} />}
      </div>
    </div>
  );
}
