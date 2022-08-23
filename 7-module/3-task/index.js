export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
    this.eventSlider();
  }

  render() {
    let slider = document.createElement("div");
    slider.classList.add("slider");
    let temp = `
    <div class="slider__thumb" style="left: 50%;">
      <span class="slider__value">2</span>
    </div>
    <!--Заполненная часть слайдера-->
    <div class="slider__progress" style="width: 50%;"></div>
    <!--Шаги слайдера-->
    <div class="slider__steps">
    </div>
    </div>`;
    slider.innerHTML = temp;

    let spans = "";
    for (let i = 0; i < this.steps; i++) {
      spans += "<span></span>";
    }

    let sliderSteps = slider.querySelector(".slider__steps");
    sliderSteps.innerHTML = spans;
    sliderSteps
      .querySelectorAll("span")
      [this.value].classList.add("slider__step-active");

    return slider;
  }

  eventSlider() {
    let slider = this.elem;
    let steps = this.steps;
    let val = this.value;

    let thumb = slider.querySelector(".slider__thumb");
    let progress = slider.querySelector(".slider__progress");
    let valueSlide = slider.querySelector(".slider__value");
    let slides = slider.querySelectorAll("span");

    slider.addEventListener("click", function (event) {
      let left = event.clientX - slider.getBoundingClientRect().left;
      let leftRelative = left / slider.offsetWidth;
      let segments = steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let valuePercents = (value / segments) * 100;

      val = value;

      valueSlide.textContent = value;
      slides.forEach((element) =>
        element.classList.remove("slider__step-active")
      );
      slides[value + 1].classList.add("slider__step-active");

      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;

      slider.dispatchEvent(
        new CustomEvent("slider-change", {
          // имя события должно быть именно 'slider-change'
          detail: val, // значение 0, 1, 2, 3, 4
          bubbles: true, // событие всплывает - это понадобится в дальнейшем
        })
      );
    });
  }
}