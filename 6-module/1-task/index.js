/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.elem();
  }

  elem() {
    let templates = "";
    let elem = this.rows;


    elem.forEach(element => {
      let templateRow = '<tr>';
      for (let key in element) {
        templateRow += `<td>${element[key]}</td>`;
      }
      templates += `${templateRow}<td><button>X</button></td></tr>`;


    });
    let templateElem = `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      ${templates}
    </tbody>`;


    let newDiv = document.createElement('div');
    newDiv.classList.add('example');
    let newTable = document.createElement('table');
    newTable.innerHTML = templateElem;
    newDiv.append(newTable);


    Array.from(newDiv.querySelectorAll('button')).forEach(function(e) {
      e.addEventListener('click', function() {
        let a = this.closest('tr');
        a.parentElement.removeChild(a);
      });
    });

    return newDiv.firstElementChild;

  }

}
