initModule = async () => {
  await app.appDom.displayGamemodeCard();

  const elDiv = document.querySelectorAll("section>div>div");
  elDiv.forEach((n, i) => {
    setTimeout(
      () => {
        n.classList.add("show");
      },
      500 * (i / 4)
    ); // affiche avec un délai entre chaque div
  });
};
