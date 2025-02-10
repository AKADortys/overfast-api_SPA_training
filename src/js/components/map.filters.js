export const MapFilters = async (data) => {
  const container = document.getElementById("gm-icon");
  for (const gm of data) {
    const span = document.createElement("span");
    span.style.cursor = "pointer";
    span.className = "bg-primary badge p-2 m-2";
    span.innerHTML = gm.name;
    container.appendChild(span);
    span.addEventListener("click", () => {
      const filter = span.innerHTML.toLocaleLowerCase().replaceAll(" ", "-");
      console.log(filter);
      app.appDom.filterMapByGamemode(filter);
    });
  }
};
