function hideSelf() {
  let elem = document.querySelector('button');
  elem.onclick = function() {
    elem.hidden = true;
  };
}