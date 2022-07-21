function sumSalary(salaries) {
  let sum = 0;
  for (key in salaries) {
    if (typeof salaries[key] == 'number') {
      sum += salaries[key];
    }
  }

  return sum;
}

console.log(sum(salaries));