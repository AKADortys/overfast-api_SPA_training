import { AppStorage } from "./dexie.js";
import { loadListeners } from "../components/hero.card.js";

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
      col.classList.add(
        "col-sm",
        "d-flex",
        "justify-content-center",
        "rounded-2",
        "mt-2"
      );

      col.innerHTML = `<img src="${hero.portrait}" style="width: 10em; cursor:pointer;" class="border border-dark bg-light rounded-2" alt="${hero.name}" data-heroCard="${hero.key}">`;

      container.appendChild(col);
    });
    loadListeners();
  }
  async displayHeroDetails(hero) {
    const herodetails = await this.storage.getHeroDetails(hero);
    if (!herodetails) {
      console.error("Aucun détail trouvé pour ce héros.");
      return;
    }

    const container = document.getElementById("hero-details");
    container.innerHTML = "";

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${herodetails.portrait}" class="img-fluid rounded-start" alt="Portrait de ${herodetails.name}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title"></h5>
            <p class="card-text"></p>
            <div class="d-flex justify-content-center">
              <span class="badge bg-dark"></span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Sécurisation du texte (évite l'injection HTML)
    card.querySelector(".card-title").textContent = herodetails.name;
    card.querySelector(".card-text").textContent = herodetails.description;
    card.querySelector(".badge").textContent = herodetails.role;

    container.appendChild(card);
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
