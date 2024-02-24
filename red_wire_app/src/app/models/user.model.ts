export class User {
  constructor(
    public client_id: string,
    public family_name: string,
    public given_name: string,
    public email: string,
    public locale: string,
    public weather_now: object,
    public weather_history: object[],
    public user_stats: object
  ) {}
}
