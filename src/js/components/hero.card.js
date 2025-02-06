export const loadListeners = () => {
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
