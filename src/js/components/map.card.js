// création de cartes pour les maps
export const MapsCard = async (maps) => {
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
};
