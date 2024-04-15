import { Weather } from './weather.model';

export class User extends Weather {
  constructor(
    public client_id: string,
    public family_name: string,
    public given_name: string,
    public email: string,
    public locale: string,
    public weather_now: Weather,
    public weather_history: Weather[],
    public user_stats: object
  ) {
    super(
      '', // base
      { all: 0 }, // clouds
      0, // cod
      { lat: 0, lon: 0 }, // coord
      0, // dt
      0, // id
      {
        // main
        feels_like: 0,
        humidity: 0,
        pressure: 0,
        temp: 0,
        temp_max: 0,
        temp_min: 0,
      },
      '', // name
      { country: '', id: 0, sunrise: 0, sunset: 0, type: 0 }, // sys
      0, // timezone
      0, // visibility
      [], // weather
      { deg: 0, speed: 0 } // wind
    );
  }
}
