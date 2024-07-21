export interface WeatherModel {
  weather: weatherInterface[];
  main: WeatherMainInterface;
}

export interface weatherInterface {
  id: number
  main: string
  description: string
  icon: string
}

export interface WeatherMainInterface {
  feels_like: string
  temp: string;
  temp_min: string
  temp_max: string
  pressure: string
  humidity: string
  sea_level: string
  grnd_level: string
}
