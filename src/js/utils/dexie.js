import { ApiOw } from "../api/ow2.js";

export class AppStorage {
  constructor() {
    this.apiOw = new ApiOw();
    this.db = new Dexie("OverwatchDB");

    // Create the database schema if it doesn't exist yet.
    this.db.version(2).stores({
      heroes: "id",
      maps: "id",
      gamemodes: "id",
      heroDetails: "id",
      roles: "id",
    });

    this.heroes = this.db.heroes;
    this.maps = this.db.maps;
    this.gamemodes = this.db.gamemodes;
    this.heroDetails = this.db.heroDetails;
    this.roles = this.db.roles;

    this.init();
  }

  // initialise le stockage
  async init() {
    await this.checkAndFetchData();
  }

  async getHeroes() {
    return await this.heroes.toArray();
  }

  async getMaps() {
    return await this.maps.toArray();
  }
  async getRoles() {
    return await this.roles.toArray();
  }
  async getGamemodes() {
    return await this.gamemodes.toArray();
  }
  // Récupère les détails d'un héros depuis le stockage ou l'API si ils ne sont pas déjà présents
  async getHeroDetails(heroId) {
    let details = await this.heroDetails.get(heroId);

    if (!details) {
      console.warn("Chargement des détails du hero");
      details = await this.apiOw.getHeroDetails(heroId);
      if (details) {
        details.id = heroId;
        await this.heroDetails.put(details);
        console.warn("Hero recup avec succès:", details);
      } else {
        console.error(
          "Erreur : l'API ne renvoie pas de détails valides pour",
          heroId
        );
      }
    }

    return details;
  }

  // Vérifie si les données sont déjà présentes dans le stockage, sinon les récupère depuis l'API
  async checkAndFetchData() {
    try {
      const [heroesCount, mapsCount, gamemodesCount, rolesCount] =
        await Promise.all([
          this.heroes.count(),
          this.maps.count(),
          this.gamemodes.count(),
          this.roles.count(),
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
      if (rolesCount === 0) {
        const roles = await this.apiOw.getRoles();
        const formattedRoles = roles.map((role) => ({
          ...role,
          id: role.key, // Utilise le nom comme identifiant unique
        }));
        await this.roles.bulkPut(formattedRoles);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la vérification/chargement des données :",
        error
      );
    }
  }
}
