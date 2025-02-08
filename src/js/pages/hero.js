initModule = async () => {
  app.appDom.displayHeroFilters(); // génerer les filtres
  await app.appDom.displayHeroesCard(); // génerer les cartes héros
  const cards = document.querySelectorAll("img[data-heroCard]");
  cards.forEach((n, i) => {
    setTimeout(
      () => {
        n.parentElement.classList.add("show");
      },
      200 * (i / 4)
    ); // affiche avec un délai entre chaque cartes
  });
  const input = document.getElementById("heroes-filters-input");
  input.addEventListener("input", (e) => {
    app.appDom.filterHeroByName(e.target.value);
  });
};
