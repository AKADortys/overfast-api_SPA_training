import { AppStorage } from "./dexie.js";

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
  async displayHeroesCard() {
    const heroes = await this.storage.getHeroes();

    const container = document.getElementById("heroes-list");
    container.innerHTML = "";

    heroes.forEach((hero) => {
      const col = document.createElement("div");
      col.classList.add("col-2", "p-2", "rounded-2");

      col.innerHTML = `
            <div class="card">
                <img src="${hero.portrait}" class="card-img" alt="${hero.name}">
                <div class="card-body">
                    <h5 class="card-title">${hero.name}</h5>
                    <p class="badge bg-warning p-2">${hero.role}</p>
                    <button onclick="app.appDom.displayHeroDetails('${hero.key}')" class="btn btn-primary">More</button>
                </div>
            </div>
        `;

      container.appendChild(col);
    });
  }
  async displayHeroDetails(hero) {
    const herodetails = await this.storage.getHeroDetails(hero);
    const container = document.getElementById("hero-details");
    container.innerHTML = "";
    console.log(herodetails);
  }
  async displayMapsCard() {
    const maps = await this.storage.getMaps();
    const container = document.getElementById("map-list");
    container.innerHTML = "";
    for (const map of maps) {
      const gamemodes = map.gamemodes.map(
        (gamemode) => `<span class="badge bg-primary p-2">${gamemode}</span>`
      );
      const col = document.createElement("div");
      col.classList.add(
        "col-8",
        "bg-dark",
        "p-2",
        "mt-1",
        "rounded-2",
        "overflow-hidden",
        "shadow-lg"
      );
      col.innerHTML = `
            <div class="card" >
                <img src="${map.screenshot}" class="img" alt="${map.name}">
                <div class="card-body">
                    <h5 class="card-title">${map.name}</h5>
                    <p class="card-text">${map.location}</p>
                    ${gamemodes}
                    </div>
                </div>`;

      container.appendChild(col);
    }
  }
}
