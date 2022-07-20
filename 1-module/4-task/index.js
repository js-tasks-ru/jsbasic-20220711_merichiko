function checkSpam(str) {
  let lowerStr = str.toLowerCase();

  return lowerStr.includes('1xbet') || lowerStr.includes('xxx');
}

console.log( checkSpam('1XbeT now') );
console.log( checkSpam('free xxxxx') );
console.log( checkSpam('innocent rabbit') );