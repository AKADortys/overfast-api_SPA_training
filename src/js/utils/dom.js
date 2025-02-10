import { AppStorage } from "./dexie.js";
import { HeroesCard } from "../components/hero.card.js";
import { HeroDetails } from "../components/hero.details.js";
import { MapsCard } from "../components/map.card.js";
import { HeroFilters } from "../components/hero.filters.js";
import { MapFilters } from "../components/map.filters.js";

export class AppDom {
  constructor() {
    this.storage = new AppStorage();
    this.contentElement = document.getElementById("container");
  }
  // vider le conteneur
  clearContent() {
    this.contentElement.innerHTML = "";
  }
  // mettre à jour le conteneur avec du HTML
  updateContent(html) {
    if (typeof html === "string") this.contentElement.innerHTML = html;
  }
  // exécuter le script d'une page
  executeScript(scriptContent, page) {
    document
      .querySelectorAll(`[data-script="${page}"]`)
      .forEach((el) => el.remove()); // suppresion des scripts exitant
    const scriptElement = document.createElement("script");
    scriptElement.textContent = scriptContent;
    scriptElement.setAttribute("data-script", page);
    document.body.appendChild(scriptElement); //création et ajout au body

    if (typeof initModule === "function") {
      initModule(); // initialisation du script lié à la page
    }
  }
  // Filtrer les cartes par gamemode
  async filterMapByGamemode(gamemode) {
    const maps = await this.storage.getMaps();
    const filteredMaps = maps.filter((map) => map.gamemodes.includes(gamemode));
    MapsCard(filteredMaps);
  }
  //filtrer les héros par nom
  async filterHeroByName(name) {
    const heroes = await this.storage.getHeroes();
    const filterHeroes = heroes.filter((hero) =>
      hero.name.toLowerCase().includes(name.toLowerCase())
    );
    HeroesCard(filterHeroes);
  }
  // filtrer les héros par rôle
  async filterHeroByRole(role) {
    const heroes = await this.storage.getHeroes();
    const filterHeroes = heroes.filter((hero) => hero.role === role);
    HeroesCard(filterHeroes);
  }
  // afficher les filtres des chéro
  async displayHeroFilters() {
    const role = await this.storage.getRoles();
    HeroFilters(role);
  }
  // afficher les filtres des cartes
  async displayMapFilters() {
    const gameModes = await this.storage.getGamemodes();
    MapFilters(gameModes);
  }
  // afficher les carte des héros
  async displayHeroesCard() {
    document.getElementById("heroes-filters-input").value = "";
    const heroes = await this.storage.getHeroes();
    HeroesCard(heroes);
  }
  // afficher les détails d'un héros
  async displayHeroDetails(hero) {
    const heroDetails = await this.storage.getHeroDetails(hero);
    HeroDetails(heroDetails);
  }
  // afficher les carte des maps
  async displayMapsCard() {
    const maps = await this.storage.getMaps();
    MapsCard(maps);
  }
}
