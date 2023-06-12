const fetchBtn = document.getElementById("fetchBtn");
const tutorialList = document.getElementById("tutorialList");

fetchBtn.addEventListener("click", () => {
  const confirmed = window.confirm("Proceed to fetch?");
  if (confirmed) {
    fetchTutorials();
  }
});

function fetchTutorials() {
  fetch("http://localhost:3002/fetch-tutorials")
    .then((response) => response.json())
    .then((data) => {
      // to delete the existing content
      tutorialList.innerHTML = "";
      const tutorials = data.sort(
        (a, b) =>
          new Date(b.node.frontmatter.date) - new Date(a.node.frontmatter.date)
      );
      renderOut(tutorials);
    })
    .catch((error) => console.log("Failed to fetch"));
}

function renderOut(nodes) {
  nodes.forEach((node) => {
    // container for each node
    const nodeContainer = document.createElement("li");
    nodeContainer.classList.add("tutorial");
    // information of each node
    const categories = document.createElement("div");
    categories.classList.add("categories");
    categories.textContent = node.node.frontmatter.categories;
    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = node.node.frontmatter.title;
    const date = document.createElement("div");
    date.classList.add("date");
    date.textContent = node.node.frontmatter.date;
    const link = document.createElement("a");
    link.classList.add("link");
    link.href = "https://www.sesvtutorial.com/" + node.node.fields.slug;
    link.target = "_blank";
    link.appendChild(title);
    link.appendChild(date);
    link.appendChild(categories);
    nodeContainer.appendChild(link);
    tutorialList.appendChild(nodeContainer);
  });
}
