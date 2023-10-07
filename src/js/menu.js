exports.menu = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".header__burger");
    const menu = document.querySelectorAll(".header__nav")[0];
    const close = document.querySelector(".header__menu-close");
    const body = document.body;
    const list = menu.querySelector(".menu");
    const headerTop = document.querySelector(".header__top");
    const header = document.querySelector(".header");
    const screenWidth = window.screen.width;
    const esc = 27;

    function deleteInertChildren (el) {
      el.inert = false;

      Array.from(el.children).forEach(child => {
        child.inert = false;
        if (child.hasChildNodes()) {
          deleteInertChildren(child);
        }
      });
    }

    if (screenWidth <= 560) {
      Array.from(list.querySelectorAll(".menu__link")).forEach(item => {
        item.inert = true;
      });
    }
    close.inert = true;
    menu.querySelector(".header__menu-phone").inert = true;

    const inertElements = document.querySelectorAll("[inert]");

    const showMenu = () => {
      menu.classList.add("header__nav_active");
      body.style.overflowY = "hidden";

      Array.from(body.querySelectorAll("*")).forEach(el => {
        if (el !== header) {
          el.inert = true;
        }
      });

      deleteInertChildren(headerTop);

      setTimeout(() => {
        close.focus();
      }, 100);
    };

    const hideMenu = () => {
      menu.classList.remove("header__nav_active");
      body.style.overflowY = "auto";

      Array.from(body.querySelectorAll("*")).forEach(el => {
        Array.from(inertElements).forEach(child => {
          if (el !== child) {
            el.inert = false;
          } else {
            el.inert = true;
          }
        });
      });

      setTimeout(() => {
        burger.focus();
      }, 100);
    };

    burger.addEventListener("click", () => {
      showMenu();
    });

    close.addEventListener("click", () => {
      hideMenu();
    });

    document.addEventListener("keydown", (e) => {
      if (e.keyCode === esc) {
        hideMenu();
      }
    })
  });
};
