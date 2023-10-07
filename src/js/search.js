exports.search = () =>{
  document.addEventListener("DOMContentLoaded", () => {
    const search = document.querySelector(".header__button");
    const headerClass = "header__";
    const close = document.querySelector(".header__close");
    const form = document.querySelector(".header__form");
    const input = document.querySelector(".header__input");
    const phone = document.querySelector(".header-top__phone");
    const block = document.querySelector(".header-top__search");
    const container = document.querySelector(".header__right");
    const logo = document.querySelector(".header__logo");
    const screenWidth = window.outerWidth;

    close.addEventListener("click", () => {
      input.classList.remove(`${headerClass}input_active`);
      close.classList.remove(`${headerClass}close_active`);

      setTimeout(() => {
        phone.classList.remove("header-top__phone_hide");
        search.classList.remove(`${headerClass}button_hide`);
        form.classList.remove(`${headerClass}form_active`);
        container.classList.remove(`${headerClass}right_active`);
        logo.classList.remove(`${headerClass}logo_hide`);
        block.classList.remove(`header-top__search_active`);


        phone.style.position = "static";
        search.style.position = "static";
        input.style.position = "absolute";
        close.style.position = "absolute";
        logo.style.position = "static";
      }, 500);
    });

    if (screenWidth <= 560) {
      search.addEventListener("click", (e) => {
        e.preventDefault();

        search.classList.add(`${headerClass}button_hide`);
        logo.classList.add(`${headerClass}logo_hide`);

        setTimeout(() => {
          input.classList.add(`${headerClass}input_active`);
          close.classList.add(`${headerClass}close_active`);
          form.classList.add(`${headerClass}form_active`);
          container.classList.add(`${headerClass}right_active`);
          block.classList.add(`header-top__search_active`);

          search.style.position = "absolute";
          logo.style.position = "absolute";
          input.style.position = "static";
          close.style.position = "relative";
        }, 300);
      });
    } else if (screenWidth <= 768) {
      search.addEventListener("click", (e) => {
        e.preventDefault();

        phone.classList.add("header-top__phone_hide");
        search.classList.add(`${headerClass}button_hide`);

        setTimeout(() => {
          input.classList.add(`${headerClass}input_active`);
          close.classList.add(`${headerClass}close_active`);
          form.classList.add(`${headerClass}form_active`);
          container.classList.add(`${headerClass}right_active`);
          block.classList.add(`header-top__search_active`);

          phone.style.position = "absolute";
          search.style.position = "absolute";
          input.style.position = "static";
          close.style.position = "relative";
        }, 300);
      });
    }

  });
}
