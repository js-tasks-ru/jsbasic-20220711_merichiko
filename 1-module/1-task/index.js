function factorial(n) { 

  let i = 1;
  for (; n > 1; n--) {
  i*=n;
  }

  return i; 
  }

    console.log(factorial(0));
    console.log(factorial(1));
    console.log(factorial(3));
    console.log(factorial(5));
