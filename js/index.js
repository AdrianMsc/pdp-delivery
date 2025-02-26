dropDownOpen = () => {
  const dropDown = document.getElementById("dropDown");
  dropDown.classList.toggle("rotate-180");

  const tableSection = document.getElementById("tableSection");
  tableSection.classList.toggle("hidden");
};

dropDownOpenSpec = () => {
  const dropDownSpec = document.getElementById("dropDownSpec");
  dropDownSpec.classList.toggle("rotate-180");

  const tableSection = document.querySelectorAll("#specificationsTable .hc");

  tableSection.forEach((section) => {
    section.classList.toggle("hidden");
  });
};
