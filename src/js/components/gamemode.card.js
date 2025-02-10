export const GMCard = async (gamemodes) => {
  const container = document.getElementById("gm-list");
  for (const gm of gamemodes) {
    const col = document.createElement("div");
    col.classList.add(
      "col-md-6",
      "d-flex",
      "justify-content-center",
      "rounded-2",
      "mt-2",
      "fade"
    );
    col.innerHTML = `
          <div class="card bg-white" >
              <img src="${gm.screenshot}" class="img-fluid rounded-2" alt="${gm.name}">
              <div class="card-body bg-light">
                  <h5 class="card-title">${gm.name}</h5>
                  <p class="card-text">${gm.description}</p>
                  </div>
                <img src="${gm.icon}" style="width: 20%;position: absolute;left:0.3em;top: 0.3em;" alt="${gm.name}">
              </div>`;
    container.appendChild(col);
  }
};
