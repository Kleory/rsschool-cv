(function () {
  const burger = document.documentElement.querySelector(".burger");
  const menu = document.documentElement.querySelector(".menu-mobile");
  const menuBgr = document.documentElement.querySelector(".menu-mobileBackground");
  // const logoMove = document.documentElement.querySelector(".header");
  const logo = document.documentElement.querySelector(".logo");
  const logoHeader = document.documentElement.querySelector(".logo-header");
  const logoDescription = document.documentElement.querySelector(".logo-description");
  const headerWrapper = document.documentElement.querySelector(".header-wrapper");  


  burger.addEventListener("click", toggleMenu);
  menuBgr.addEventListener("click", toggleMenu);

  function toggleMenu() {
    let bodyStyle = "hidden";

    if (menu.classList.contains("isOpen")) {
      bodyStyle = "auto";
    }

    document.body.style.overflowY = bodyStyle;
    menu.classList.toggle("isOpen");
    burger.classList.toggle("isRotate");    
    logo.classList.toggle("move");
    logoHeader.classList.toggle("logoHeaderColor");
    logoDescription.classList.toggle("logoDescriptionColor");
    headerWrapper.classList.toggle("backgroundOpacity");
  }
})();
