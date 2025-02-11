initModule = async () => {
  app.appDom.displayHeroFilters(); // génerer les filtres
  await app.appDom.displayHeroesCard(); // génerer les cartes héros
};
