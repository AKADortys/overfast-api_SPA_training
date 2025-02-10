initModule = () => {
  app.appDom.displayMapsCard();
  app.appDom.displayMapFilters();
  const input = document.getElementById("maps-filters-input");
  input.addEventListener("input", (e) => {
    app.appDom.filterMapByName(e.target.value);
  });
};
