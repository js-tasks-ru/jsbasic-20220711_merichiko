function toggleText() {
  let elem = document.querySelector("button");
  elem.addEventListener("click", hiddenElem);
}

function hiddenElem() {
  let element = document.getElementById("text");
  if (element.hidden) {
    element.removeAttribute("hidden");
  } else {
    element.hidden = true;
  }
}