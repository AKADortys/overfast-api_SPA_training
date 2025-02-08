export const HeroFilters = async (roles) => {
  const list = document.getElementById("roles-icon");
  for (const role of roles) {
    const img = document.createElement("img");
    img.src = role.icon;
    img.alt = role.name;
    img.dataset.roleFilter = role.key;
    img.style.cursor = "pointer";
    img.classList.add("rounded-4", "p-3");
    img.title = role.name;
    list.appendChild(img);
  }
  loadListeners();
};

const loadListeners = () => {
  const roleFilters = document.querySelectorAll("img[data-role-filter]");
  roleFilters.forEach((img) => {
    const role = img.getAttribute("data-role-filter");
    img.addEventListener("click", () => {
      app.appDom.filterHeroByRole(role);
    });
  });
};
