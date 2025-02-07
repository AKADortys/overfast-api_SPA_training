export const HeroDetails = async (herodetails) => {
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
            <p class="text-primary">${herodetails.location}</p>
            <div class="d-flex justify-content-evenly mt-2">
              <span class="badge bg-dark">${herodetails.role}</span>
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
            ${chapter.picture ? `<img class="mb-2 img-fluid" src="${chapter.picture}" alt="Illustration de ${chapter.title}">` : ""}
          </div>
        `
          )
          .join("")}
      </div>
      <div class="col-md-4">
        <h5 class="text-secondary text-center my-2">Hit points</h5>
        <div id="charthero"></div>
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
};
