/**
* Util functions
* @author: Facundo Victor <facundovt@gmail.com>
**/

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function setClickHandler (id, fn) {
  document.getElementById(id).onclick = fn;
}
