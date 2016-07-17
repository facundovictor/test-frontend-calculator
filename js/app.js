/**
* @author: Facundo Victor <facundovt@gmail.com>
**/

var container;
var help_button;
var calculator;

/* Main -------------------------------------------------------------------- */

function helpHandler () {
  container.classList.toggle('turned');
  help_button.classList.toggle('active');
}

window.onload = function () {
  calculator = new Calculator();
  container = document.getElementById('container');
  help_button = document.getElementById('help');
  help_button.onclick = helpHandler;
};
