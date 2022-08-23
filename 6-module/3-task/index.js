import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.template();
  }

  template() {

    let templateCards = this.slides.map((element => {
      return `<div class="carousel__slide" data-id="penang-shrimp">
        <img src="/assets/images/carousel/${element.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${element.price.toFixed(2)}</span>
          <div class="carousel__title">${element.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `;
    }));

    let cards = document.createElement('div');
    cards.classList.add('carousel__inner');
    cards.innerHTML = templateCards;

    let carousel = document.createElement('div');
    carousel.classList.add('carousel');

    let arrow = `
    <div class="carousel__arrow carousel__arrow_right">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
    <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    `;

    carousel.innerHTML = arrow;
    carousel.append(cards);

    let allSlide = carousel.getElementsByClassName("carousel__inner");
    let slide = allSlide[0];
    let slideOne = slide.getElementsByClassName('carousel__slide');
    let arrowRight = carousel.getElementsByClassName("carousel__arrow_right");
    let divArrowRight = arrowRight[0];
    let arrowLeft = carousel.getElementsByClassName("carousel__arrow_left");
    let divArrowLeft = arrowLeft[0];

    let count = 0;
    let position = 0;

    divArrowLeft.style.display = "none";

    divArrowRight.addEventListener("click", () => {
      count++;
      let size = this.offsetWidth;
      position -= size;
      slide.style.transform = `translateX(${position}px)`;

      if (count === slideOne.length - 1) {
        divArrowRight.style.display = "none";
      } else {
        divArrowLeft.style.display = "";
      }
    });

    divArrowLeft.addEventListener("click", () => {
      count--;
      let size = this.offsetWidth;
      position += size;

      slide.style.transform = `translateX(${position}px)`;

      if (count === 0) {
        divArrowLeft.style.display = "none";
      } else {
        divArrowRight.style.display = "";
      }
    });



    let buttons = carousel.querySelectorAll('button');

    for (let i = 0; i < buttons.length; i++) {
      let button = buttons[i];
      let id = this.slides[i].id;
      button.addEventListener('click', function(event) {
        button.dispatchEvent(new CustomEvent('product-add', {
          detail: id,
          bubbles: true
        }));
      });
    }

    return carousel;
  }



  get offsetWidth() {
    return this.elem.offsetWidth;
  }
}