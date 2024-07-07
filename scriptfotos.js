document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const ArrowIcons = document.querySelectorAll(".wrapper .material-symbols-outlined");

  let isDragStart = false;
  let prevPageX, prevScrollLeft;
  let firstImgWidth = carousel.querySelector("img").clientWidth + 14;
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;

  const showHideIcons = () => {
    ArrowIcons[0].style.display = carousel.scrollLeft === 0 ? "none" : "block";
    ArrowIcons[1].style.display = carousel.scrollLeft === scrollWidth ? "none" : "block";
  };

  ArrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      carousel.scrollLeft += icon.id === "left" ? -firstImgWidth : firstImgWidth;
      setTimeout(() => showHideIcons(), 60);
    });
  });

  const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    let positionDiff = e.pageX - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
  };

  const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
  };

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  carousel.addEventListener("mouseup", dragStop);
  carousel.addEventListener("mouseleave", dragStop);
});
