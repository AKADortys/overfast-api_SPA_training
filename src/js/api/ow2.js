export class ApiOw {
  constructor() {
    // API Over-Fast endpoints
    this.apiUrl = "https://overfast-api.tekrop.fr/";
    this.heroUrl = `${this.apiUrl}heroes`;
    this.gameMode = `${this.apiUrl}gamemodes`;
    this.maps = `${this.apiUrl}maps`;
    this.heroDetailsUrl = `${this.heroUrl}/`;
  }

  // récupération des héros
  async getHeroes() {
    try {
      const response = await axios.get(this.heroUrl);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  // récupération des modes de jeu
  async getGameModes() {
    const response = await axios.get(this.gameMode);
    return response.data;
  }

  // récupération des cartes
  async getMaps() {
    const response = await axios.get(this.maps);
    return response.data;
  }
  // récupération des détails d'un héros
  async getHeroDetails(heroId) {
    const response = await axios.get(`${this.heroDetailsUrl}${heroId}`);
    return response.data;
  }
}
