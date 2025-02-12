export const MapsCard = async (maps) => {
  const container = document.getElementById("map-list");
  container.innerHTML = "";
  if (maps.length <= 0) {
    container.innerHTML = "<p>Aucune carte trouvée.</p>";
    return;
  }

  maps.forEach((map, index) => {
    const gamemodes = map.gamemodes.map(
      (gamemode) => `<span class="badge bg-primary p-2">${gamemode}</span>`
    );
    const col = document.createElement("div");
    col.classList.add(
      "col-md-6",
      "p-2",
      "mt-1",
      "rounded-2",
      "overflow-hidden",
      "shadow-lg",
      "fade"
    );
    col.innerHTML = `
          <div class="card">
              <img src="${map.screenshot}" class="img" alt="${map.name}">
              <div class="card-body">
                  <h5 class="card-title">${map.name}</h5>
                  <p class="card-text">${map.location}</p>
                  ${gamemodes.join("")}
              </div>
          </div>`;

    container.appendChild(col);
    // Ajout de la carte avec un délai progressif
    setTimeout(() => {
      col.classList.add("show");
    }, index * 50);
  });
};
