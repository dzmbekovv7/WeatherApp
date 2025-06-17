import type { FC } from 'react';

type WeatherMainProps = {
  weather: {
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
    };
  };
};

const WeatherMain: FC<WeatherMainProps> = ({ weather }) => {
  const { location, current } = weather;

  return (
   <div
  style={{
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: "'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#fff',
    userSelect: 'none',
    maxWidth: 360,
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: 1.1,
  }}
>
  <h1
    style={{
      fontSize: 52,
      fontWeight: '800',
      marginBottom: 6,
      letterSpacing: '-0.03em',
      textTransform: 'capitalize',
      textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
    }}
  >
    {location.name}, {location.country}
  </h1>

  <p
    style={{
      fontSize: 86,
      fontWeight: '900',
      margin: '8px 0',
      lineHeight: 1,
      color: '#fff',
      textShadow: '0 0 16px rgba(255,255,255,0.9)',
    }}
  >
    {current.temp_c}°C
  </p>

  <p
    style={{
      fontSize: 28,
      fontWeight: '600',
      margin: '10px 0 24px',
      fontStyle: 'italic',
      color: '#eee',
      letterSpacing: '0.03em',
      textShadow: '1px 1px 4px rgba(0,0,0,0.6)',
    }}
  >
    {current.condition.text}
  </p>

  <img
    src={`https:${current.condition.icon}`}
    alt={current.condition.text}
    style={{
      width: 120,
      height: 120,
      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.8))',
      transition: 'transform 0.25s ease',
      cursor: 'default',
      userSelect: 'none',
    }}
    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
  />
</div>

  );
};

export default WeatherMain;
