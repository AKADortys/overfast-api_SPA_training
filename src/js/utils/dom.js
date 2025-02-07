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

    // Carte de présentation du héros
    card.innerHTML = `
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${herodetails.portrait}" class="img-fluid rounded-start" alt="Portrait de ${herodetails.name}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${herodetails.name}</h5>
            <p class="card-text">${herodetails.description}</p>
            <div class="d-flex justify-content-between mt-2">
              <span class="badge bg-dark">${herodetails.role}</span>
              <span class="badge bg-primary">${herodetails.location}</span>
            </div>
            <div class="col-md-4">
              <h5 class="text-secondary text-center my-2">Hit points</h5>
              <div id="charthero"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);

    // Compétences, graphique points de vie, historique
    const elDiv = document.createElement("div");
    elDiv.classList.add("row", "g-0", "bg-dark", "mt-2");

    elDiv.innerHTML = `
      <div class="col-12">
        <table class="table p-2 text-warning table align-middle">
          <thead class="table-light">
            <tr><th scope="col">Nom</th><th scope="col">Description</th><th scope="col">Icône</th></tr>
          </thead>
          <tbody>
            ${herodetails.abilities
              ?.map(
                (ability) => `
              <tr class="pt-1">
                <th scope="row">${ability.name}</th>
                <td>${ability.description}</td>
                <td><img style="width: 8em;" class="bg-dark" src="${ability.icon}" alt="${ability.name}"></td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
      <div class="col-md-12 bg-light p-2">
        <h5 class="text-secondary text-center my-2">Historique</h5>
        ${herodetails.story?.chapters
          ?.map(
            (chapter) => `
          <div class="section mt-2 bg-dark text-info rounded-2 p-2">
            <h6>${chapter.title}</h6>
            <p>${chapter.content}</p>
            ${chapter.picture ? `<img style="width: 50%;" class="mb-2" src="${chapter.picture}" alt="Illustration de ${chapter.title}">` : ""}
          </div>
        `
          )
          .join("")}
      </div>
    `;

    container.appendChild(elDiv);

    // Vérification avant d'afficher le graphique
    if (herodetails.hitpoints) {
      let options = {
        chart: { type: "donut" },
        series: [
          herodetails.hitpoints.armor || 0,
          herodetails.hitpoints.health || 0,
          herodetails.hitpoints.shields || 0,
        ],
        labels: ["Armor", "Health", "Shields"],
        colors: ["#FFCD56", "#FF6384", "#36A2EB"],
      };

      let chart = new ApexCharts(document.querySelector("#charthero"), options);
      chart.render();
    }
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
