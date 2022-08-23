import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.menu();
  }

  menu() {
    let menuElems = this.categories;
    let ribbonItems = '';

    let ribbonMenu = document.createElement('div');
    ribbonMenu.classList.add('ribbon');

    let arrowLeft = document.createElement('button');
    arrowLeft.classList.add('ribbon__arrow', 'ribbon__arrow_left');
    arrowLeft.innerHTML = '<img src="/assets/images/icons/angle-icon.svg" alt="icon">';


    let arrowRight = document.createElement('button');
    arrowRight.classList.add('ribbon__arrow', 'ribbon__arrow_right', 'ribbon__arrow_visible');
    arrowRight.innerHTML = '<img src="/assets/images/icons/angle-icon.svg" alt="icon">';

    let ribbonInner = document.createElement('nav');
    ribbonInner.classList.add('ribbon__inner');

    for (let elem of menuElems) {

      let temp = `<a href="#" class="ribbon__item" data-id="${elem.id}">${elem.name}</a>`;
      ribbonItems += temp;
    }

    ribbonInner.innerHTML = ribbonItems;

    arrowLeft.addEventListener('click', function() {
      ribbonInner.scrollBy(-350, 0);
      let scrollLeft = ribbonInner.scrollLeft;
      if (scrollLeft < 1) {
        arrowLeft.classList.remove('ribbon__arrow_visible');
      }
      else {
        arrowLeft.classList.add('ribbon__arrow_visible');
        arrowRight.classList.add('ribbon__arrow_visible');
      }
      console.log(scrollLeft);

    });

    arrowRight.addEventListener('click', function() {
      ribbonInner.scrollBy(350, 0);
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;

      let scrollRight = scrollWidth - scrollLeft - clientWidth;
      if (scrollRight < 1) {
        arrowRight.classList.remove('ribbon__arrow_visible');

      }
      else {
        arrowRight.classList.add('ribbon__arrow_visible');
        arrowLeft.classList.add('ribbon__arrow_visible');
      }
    });

    ribbonMenu.append(arrowLeft, ribbonInner, arrowRight);

    // let customEvent = new CustomEvent('ribbon-select', {
    //   detail: category.id, // уникальный идентификатора категории из её объекта
    //   bubbles: true // это событие всплывает - это понадобится в дальнейшем
    // })

    // Array.from(ribbonMenu.querySelectorAll('a').forEach(function(e) {
    //   e.dispatchEvent(new CustomEvent('ribbon-select', {
    //     detail: category.id, // уникальный идентификатора категории из её объекта
    //     bubbles: true
    //   }))
    // }))

    let menuItems = ribbonMenu.querySelectorAll('a');
    for (let i = 0; i < menuItems.length; i++) {
      let elem = menuItems[i];
      elem.addEventListener('click', function() {
        elem.dispatchEvent(new CustomEvent('ribbon-select', {
          detail: menuElems[i].id, // уникальный идентификатора категории из её объекта
          bubbles: true
        }));
      });

    }


    return ribbonMenu;
  }

}