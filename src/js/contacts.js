exports.contacts = () => {
  const overlay = document.querySelector(".overlay");
  const close = overlay.querySelector(".overlay__close");

  close.addEventListener("click", () => {
    overlay.classList.toggle("overlay_hide");
    close.classList.toggle("overlay__close_open");
  });
}
