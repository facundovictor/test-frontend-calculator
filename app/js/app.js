/**
* @author: Facundo Victor <facundovt@gmail.com>
**/

var display;
var parser;
var container;
var help_button;

/* Util functions ---------------------------------------------------------- */
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function setClickHandler (id, fn) {
  document.getElementById(id).onclick = fn;
}

/* Button handlers --------------------------------------------------------- */
function clearAll () {
  display = new Display();
  parser = new Parser();
}

function clearCurrentValue () {
  display.reset();
}

function numHandler (num) {
  display.addValue(num);
}

function pointHandler () {
  display.addValue('.');
}

function operatorHandler (symbol) {
  var current_value = display.getValue();
  if (current_value !== null) {
    parser.pushToken(current_value);
    parser.pushToken(symbol);
  }
}

function parenthesisHandler (symbol) {
  var current_value = display.getValue();
  if (current_value !== null) {
    parser.pushToken(current_value);
  }
  parser.pushToken(symbol);
}

function enterHandler () {
  var current_value = display.getValue();
  if (current_value !== null) {
    parser.pushToken(current_value);
  }
  try {
    parser.finishInfixNotation();
    display.setValue(parser.getResult());
  } catch (error) {
    display.setValue(); // Show error message
  }
  display.markResult();
  parser = new Parser();
}

function helpHandler () {
  container.classList.toggle('turned');
  help_button.classList.toggle('active');
}

function keyHandler (evt) {
  var key = evt.key;
  switch (key){
    case '.': pointHandler(); break;
    case 'c':
    case 'C':
      if (evt.shiftKey){
        clearCurrentValue();
      } else {
        clearAll();
      }
      break;
    case '+':
    case '-':
    case '*':
    case '/':
    case 'e': operatorHandler(key); break;
    case '^': operatorHandler('e'); break;
    case '(':
    case ')': parenthesisHandler(key); break;
    case 'Enter': enterHandler(); break;
    default:
      if (isNumber(key)){
        numHandler(key);
      }
      break;
  }
}

function registerCalculatorEvents(){
  for (var i=0; i<=9; i++) {
    (function(i){
      setClickHandler('num_'+i, function () { numHandler(i); });
    })(i);
  }

  setClickHandler('point', pointHandler);
  setClickHandler('C', clearAll);
  setClickHandler('CE', clearCurrentValue);

  setClickHandler('add', function () { operatorHandler('+'); });
  setClickHandler('sub', function () { operatorHandler('-'); });
  setClickHandler('mul', function () { operatorHandler('*'); });
  setClickHandler('div', function () { operatorHandler('/'); });
  setClickHandler('exp', function () { operatorHandler('e'); });

  setClickHandler('sym_(', function () { parenthesisHandler('('); });
  setClickHandler('sym_)', function () { parenthesisHandler(')'); });

  setClickHandler('enter', enterHandler);

  document.onkeypress = keyHandler;
}

window.onload = function () {
  clearAll();
  registerCalculatorEvents();
  container = document.getElementById('container');
  help_button = document.getElementById('help');
  help_button.onclick = helpHandler;
};
