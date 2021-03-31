function headerBurgerInit() {
  const burgerItem = document.querySelector(".burger");
  const menu = document.querySelector(".header__nav");
  const menuCloseItem = document.querySelector(".nav__close");
  burgerItem.addEventListener("click", () => {
    menu.classList.add("nav--active");
    burgerItem.classList.add("burder--hide");
  });

  menuCloseItem.addEventListener("click", () => {
    menu.classList.remove("nav--active");
    burgerItem.classList.remove("burder--hide");
  });
}


function main() {
  headerBurgerInit();
}

document.addEventListener("DOMContentLoaded", main);
