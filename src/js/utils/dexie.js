import { ApiOw } from "../api/ow2.js";

export class AppStorage {
  constructor() {
    this.apiOw = new ApiOw();
    this.db = new Dexie("OverwatchDB");

    this.db.version(2).stores({
      heroes: "id",
      maps: "id",
      gamemodes: "id",
      heroDetails: "id",
    });

    this.heroes = this.db.heroes;
    this.maps = this.db.maps;
    this.gamemodes = this.db.gamemodes;
    this.heroDetails = this.db.heroDetails;

    this.init();
  }

  async init() {
    await this.checkAndFetchData();
  }

  async getHeroes() {
    return await this.heroes.toArray();
  }

  async getMaps() {
    return await this.maps.toArray();
  }

  async getGamemodes() {
    return await this.gamemodes.toArray();
  }
  async getHeroDetails(heroId) {
    let details = await this.heroDetails.get(heroId);

    if (!details) {
      details = await this.apiOw.getHeroDetails(heroId);
      console.log("Détails du héros récupérés :", details); // Debug
      if (details) {
        details.id = heroId;
        await this.heroDetails.put(details);
      } else {
        console.error(
          "Erreur : l'API ne renvoie pas de détails valides pour",
          heroId
        );
      }
    }

    return details;
  }

  async checkAndFetchData() {
    try {
      const [heroesCount, mapsCount, gamemodesCount] = await Promise.all([
        this.heroes.count(),
        this.maps.count(),
        this.gamemodes.count(),
      ]);

      if (heroesCount === 0) {
        const heroes = await this.apiOw.getHeroes();
        const formattedHeroes = heroes.map((hero) => ({
          ...hero,
          id: hero.name, // Utilise le nom comme identifiant unique
        }));
        await this.heroes.bulkPut(formattedHeroes);
      }

      if (mapsCount === 0) {
        const maps = await this.apiOw.getMaps();
        const formattedMaps = maps.map((map) => ({
          ...map,
          id: map.name, // Utilise le nom comme identifiant unique
        }));
        await this.maps.bulkPut(formattedMaps);
      }

      if (gamemodesCount === 0) {
        const gamemodes = await this.apiOw.getGameModes();
        const formattedGamemodes = gamemodes.map((mode) => ({
          ...mode,
          id: mode.name, // Utilise le nom comme identifiant unique
        }));
        await this.gamemodes.bulkPut(formattedGamemodes);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la vérification/chargement des données :",
        error
      );
    }
  }
}
