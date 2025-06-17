import type { FC } from 'react'
import {
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiThermometer,
  WiCloud,
  WiTime3
} from 'react-icons/wi'

type WeatherDetailsProps = {
  weather: {
    current: {
      humidity: number
      wind_kph: number
      pressure_mb: number
      feelslike_c: number
      cloud: number
      last_updated: string
    }
  }
}

const WeatherDetails: FC<WeatherDetailsProps> = ({ weather }) => {
  const { current } = weather

  const detailStyle = `
    flex items-center gap-5 text-white/95 text-xl md:text-2xl 
    font-semibold font-sans transition-transform duration-300 ease-in-out 
    hover:text-white hover:scale-105 cursor-default
  `

  return (
    <div
      className="p-8 rounded-3xl bg-white/10 backdrop-blur-3xl shadow-xl max-w-md"
      style={{ fontFamily: "Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      <h2 className="text-4xl font-extrabold text-white mb-8 tracking-wide drop-shadow-lg">
        🌦️ Weather Details
      </h2>
      <div className="space-y-6">
        <p className={detailStyle}>
          <WiHumidity size={30} /> Humidity: {current.humidity}%
        </p>
        <p className={detailStyle}>
          <WiStrongWind size={30} /> Wind: {current.wind_kph} km/h
        </p>
        <p className={detailStyle}>
          <WiBarometer size={30} /> Pressure: {current.pressure_mb} mb
        </p>
        <p className={detailStyle}>
          <WiThermometer size={30} /> Feels like: {current.feelslike_c}°C
        </p>
        <p className={detailStyle}>
          <WiCloud size={30} /> Cloudiness: {current.cloud}%
        </p>
        <p className={detailStyle}>
          <WiTime3 size={30} /> Updated: {current.last_updated}
        </p>
      </div>
    </div>
  )
}

export default WeatherDetails
