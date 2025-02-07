import { AppStorage } from "./dexie.js";
import { HeroesCard } from "../components/hero.card.js";
import { HeroDetails } from "../components/hero.details.js";
import { MapsCard } from "../components/map.card.js";

export class AppDom {
  constructor() {
    this.storage = new AppStorage();
    this.contentElement = document.getElementById("container");
  }

  clearContent() {
    this.contentElement.innerHTML = "";
  }
  updateContent(html) {
    if (typeof html === "string") this.contentElement.innerHTML = html;
  }
  async displayHeroesCard() {
    const heroes = await this.storage.getHeroes();
    HeroesCard(heroes);
  }
  async displayHeroDetails(hero) {
    const heroDetails = await this.storage.getHeroDetails(hero);
    HeroDetails(heroDetails);
  }
  async displayMapsCard() {
    const maps = await this.storage.getMaps();
    MapsCard(maps);
  }

  executeScript(scriptContent, page) {
    document
      .querySelectorAll(`[data-script="${page}"]`)
      .forEach((el) => el.remove());
    const scriptElement = document.createElement("script");
    scriptElement.textContent = scriptContent;
    scriptElement.setAttribute("data-script", page);
    document.body.appendChild(scriptElement);

    if (typeof initModule === "function") {
      initModule();
    }
  }
}
