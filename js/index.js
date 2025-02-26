const dropDownOpen = () => {
  const dropDown = document.querySelector("#dropDown");
  const tableSection = document.querySelector("#tableSection");
  const detailText = document.querySelector("#detailText");

  dropDown?.classList.toggle("rotate-180");
  tableSection?.classList.toggle("hidden");

  if (detailText) {
    detailText.textContent =
      detailText.textContent.trim() === "Hide" ? "View" : "Hide";
  }
};

dropDownOpenSpec = () => {
  const dropDownSpec = document.getElementById("dropDownSpec");
  dropDownSpec.classList.toggle("rotate-180");

  const tableSection = document.querySelectorAll("#specificationsTable .hc");

  tableSection.forEach((section) => {
    section.classList.toggle("hidden");
  });
};
