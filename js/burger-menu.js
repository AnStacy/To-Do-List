const burgerMenu = document.querySelector(".burger-menu");
const sidebar = document.querySelector(".sidebar");

burgerMenu.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});
