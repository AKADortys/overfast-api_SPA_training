initModule = () => {
  app.appDom.displayMapsCard();
  app.appDom.displayMapFilters();

  const elDiv = document.querySelectorAll("section>div");
  console.log(elDiv.length);
  elDiv.forEach((n, i) => {
    setTimeout(
      () => {
        n.classList.add("show");
      },
      500 * (i / 4)
    ); // affiche avec un délai entre chaque div
  });
};
