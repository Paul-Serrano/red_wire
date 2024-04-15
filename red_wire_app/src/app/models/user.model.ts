import { Weather } from './weather.model';

export class User {
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
    
  }
}
