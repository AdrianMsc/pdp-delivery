dropDownOpen = () => {
  const dropDown = document.getElementById("dropDown");
  dropDown.classList.toggle("rotate-180");

  const tableSection = document.getElementById("tableSection");
  tableSection.classList.toggle("hidden");
};
