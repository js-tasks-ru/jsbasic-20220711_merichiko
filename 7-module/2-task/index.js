import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.create();
    this.close();
  }

  create() {
    this.modal = createElement(`<div class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">
        </h3>
      </div>
      <div class="modal__body">
      </div>
    </div>
  </div>`);
  }

  open() {
    let container = document.querySelector("body");
    container.classList.add("is-modal-open");
    container.append(this.modal);
    this.ev();
  }

  setTitle(title) {
    let modalTitle = this.modal.querySelector(".modal__title");
    modalTitle.textContent = title;
  }

  setBody(body) {
    let modalBody = this.modal.querySelector(".modal__body");
    modalBody.innerHTML = body.outerHTML;
  }

  close() {
    let bodyContent = document.querySelector("body");
    bodyContent.classList.remove("is-modal-open");
    let modal = this.modal;
    modal.remove();
  }

  ev() {
    let bodyContent = document.querySelector("body");
    let modal = this.modal;

    let closeButton = modal.querySelector(".modal__close");

    closeButton.addEventListener("click", function (e) {
      bodyContent.classList.remove("is-modal-open");
      modal.remove();
    });

    document.addEventListener("keydown", function keyDown(e) {
      if (e.code === "Escape") {
        bodyContent.classList.remove("is-modal-open");
        modal.remove();
      }
      document.removeEventListener("keydown", keyDown);
    });
  }
}