//création des carte de héros avec l'event click pour ouvrir la section détails
export const HeroesCard = async (heroes) => {
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
};

const loadListeners = () => {
  const heroeImg = document.querySelectorAll("img[data-heroCard]");
  const heroDetails = document.getElementById("hero-details");
  heroeImg.forEach((img) => {
    const heroKey = img.getAttribute("data-heroCard");
    img.addEventListener("click", async () => {
      resetState();

      setTimeout(() => {
        app.appDom.displayHeroDetails(heroKey);
        heroDetails.scrollIntoView({ behavior: "smooth", block: "start" });
        heroDetails.classList.add("show");
      }, 300);
    });
  });

  const resetState = () => {
    heroDetails.classList.remove("show");
  };
};
