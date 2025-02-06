export class ApiOw {
  constructor() {
    this.apiUrl = "https://overfast-api.tekrop.fr/";
    this.heroUrl = `${this.apiUrl}heroes`;
    this.gameMode = `${this.apiUrl}gamemodes`;
    this.maps = `${this.apiUrl}maps`;
    this.heroDetailsUrl = `${this.heroUrl}/`;
  }

  async getHeroes() {
    try {
      const response = await axios.get(this.heroUrl);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getGameModes() {
    const response = await axios.get(this.gameMode);
    return response.data;
  }

  async getMaps() {
    const response = await axios.get(this.maps);
    return response.data;
  }
  async getHeroDetails(heroId) {
    const response = await axios.get(`${this.heroDetailsUrl}${heroId}`);
    return response.data;
  }
}
