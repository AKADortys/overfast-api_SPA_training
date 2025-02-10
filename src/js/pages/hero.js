initModule = async () => {
  app.appDom.displayHeroFilters(); // génerer les filtres
  await app.appDom.displayHeroesCard(); // génerer les cartes héros
  const input = document.getElementById("heroes-filters-input");
  input.addEventListener("input", (e) => {
    setTimeout(() => {
      app.appDom.filterHeroByName(e.target.value);
    }, 3000);
  });
};
