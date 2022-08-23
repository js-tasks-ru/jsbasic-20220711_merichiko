function initCarousel() {
  let allSlide = document.getElementsByClassName("carousel__inner");
  let slide = allSlide[0];
  let size = allSlide[0].children[0].offsetWidth;
  let arrowRight = document.getElementsByClassName("carousel__arrow_right");
  let divArrowRight = arrowRight[0];
  let arrowLeft = document.getElementsByClassName("carousel__arrow_left");
  let divArrowLeft = arrowLeft[0];

  let count = 0;
  let position = 0;

  divArrowLeft.style.display = "none";

  divArrowRight.addEventListener("click", () => {
    count++;

    position -= size;
    slide.style.transform = `translateX(${position}px)`;

    if (count === 3) {
      divArrowRight.style.display = "none";
    } else {
      divArrowLeft.style.display = "";
    }
  });

  divArrowLeft.addEventListener("click", () => {
    count--;

    position += size;

    slide.style.transform = `translateX(${position}px)`;

    if (count === 0) {
      divArrowLeft.style.display = "none";
    } else {
      divArrowRight.style.display = "";
    }
  });
}