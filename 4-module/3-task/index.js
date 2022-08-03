function highlight(table) {
  let statusIndex = 0;
  let genderIndex = 0;
  let ageIndex = 0;
  
  for (let i = 0; i < table.rows[0].cells.length; i++) {
    if (table.rows[0].cells[i].innerHTML == "Status") {
      statusIndex = i;
    }
    if (table.rows[0].cells[i].innerHTML == "Gender") {
      genderIndex = i;
     }
    if (table.rows[0].cells[i].innerHTML == "Age") {
       ageIndex = i;
    }
  }
  
  for (let row of table.rows) {
    if (row.cells[statusIndex].getAttribute('data-available') == "true") {
       row.classList.add('available');
     }
     else if (row.cells[statusIndex].getAttribute('data-available') == "false") {
       row.classList.add('unavailable');
     }
     else {
       row.setAttribute('hidden', '');
     }
  
     if (row.cells[genderIndex].innerHTML == 'm') {
       row.classList.add('male');
     }
     else {
       row.classList.add('female');
     }
  
     if (row.cells[ageIndex].innerHTML < 18) {
       row.style.textDecoration = 'line-through';
     }
   }
}
