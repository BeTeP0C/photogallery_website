exports.complete = () => {
  const buttons = document.querySelectorAll(".services__switch");
  const progress = document.querySelector(".services__progress");
  const tabs = document.querySelectorAll(".services__tab");
  let buttonClick;

  buttons.forEach(button => {
    button.addEventListener("click", (e) => {
      const path = button.dataset.path;
      tabs.forEach(tab => {
        tab.classList.remove("services__tab_active");
      });

      document.querySelectorAll(`[data-target=${path}]`).forEach(tab => {
        tab.classList.add("services__tab_active");
        tab.classList.add("services__tab_show");
      })


      button.classList.add("services__switch_active");
      if (buttonClick !== button) {
        progress.classList.toggle("services__progress_scroll");
        buttonClick = button;
      }


      buttons.forEach(el => {
        if (el !== button) {
          el.classList.remove("services__switch_active");
        }
      });
    });
  });
};
