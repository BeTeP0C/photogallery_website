exports.projects = () => {
  const swiper = new Swiper(".projects__slider", {
    wrapperClass: "projects__wrapper",
    slideClass: "projects__slide",
    direction: 'horizontal',
    spaceBetween: 50,
    speed: 1000,
    allowTouchMove: false,
    // loop: false,
    on: {
      slideChange: () => addClassVisible(),
    },
    navigation: {
      nextEl: '.projects__prev',
      prevEl: '.projects__next',
    },
  });

  function addClassVisible () {
    const buttons = document.querySelectorAll(".projects__navigation");
    buttons.forEach(button => {
      button.classList.toggle("projects__navigation_blocked");
    });
  };

  function buttonTransform () {
    const projectsTop = document.querySelector(".projects__top");
    const centering = document.querySelector(".centering");

    if (window.outerWidth <= 560) {
      const buttonsTop = projectsTop.querySelectorAll(".projects__navigation");
      const buttonsSlider = centering.querySelectorAll(".projects__navigation");

      for (let i = 0; i < buttonsTop.length; i++) {
        const buttonTop = buttonsTop[i];

        buttonTop.addEventListener("click", () =>{
          buttonsSlider[i].click();
        });
      }
    }
  }

  buttonTransform();
}
