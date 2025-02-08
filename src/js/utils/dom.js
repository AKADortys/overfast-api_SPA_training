import { AppStorage } from "./dexie.js";
import { HeroesCard } from "../components/hero.card.js";
import { HeroDetails } from "../components/hero.details.js";
import { MapsCard } from "../components/map.card.js";

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
  // afficher la carte des héros
  async displayHeroesCard() {
    const heroes = await this.storage.getHeroes();
    HeroesCard(heroes);
  }
  // afficher les détails d'un héros
  async displayHeroDetails(hero) {
    const heroDetails = await this.storage.getHeroDetails(hero);
    HeroDetails(heroDetails);
  }
  // afficher la carte des cartes
  async displayMapsCard() {
    const maps = await this.storage.getMaps();
    MapsCard(maps);
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
}
