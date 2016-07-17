/**
* A calculator web app implemented without using any third-party libraries.
* The calculator uses the mathematical expression parser for getting results,
* and the display interface for displaying the result.
*
* @author: Facundo Victor <facundovt@gmail.com>
**/

Calculator = (function() {
  // Internal display
  var display;
  // Internal mathematical expresion parser
  var parser;

  // Constructor
  function Calculator() {
    clearAll(); // Initialize the display and parser
    registerListeners();
  }

  /**
  * Private method for re-initialize the display and parser. Used as a handler
  * for the 'C' button (clear).
  **/
  function clearAll(){
    display = new Display();
    parser = new Parser();
  }

  /**
  * Register all the dom listeners to the proper handler functions.
  **/
  function registerListeners(){
    for (var i=0; i<=9; i++) {
      (function(i){
        setClickHandler('num_'+i, function () { numHandler(i); });
      })(i);
    }

    setClickHandler('point', pointHandler);
    setClickHandler('C', clearAll);
    setClickHandler('CE', clearEntryHandler);

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

  /* Handlers -------------------------------------------------------------- */
  function clearEntryHandler () { // CE
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
    if (current_value !== null && current_value !== undefined) {
      parser.pushToken(current_value);
      parser.pushToken(symbol);
    }
  }

  function parenthesisHandler (symbol) {
    var current_value = display.getValue();
    if (current_value !== null && current_value !== undefined) {
      parser.pushToken(current_value);
    }
    parser.pushToken(symbol);
  }

  /**
  * This triggers the evaluation of the inputted mathematical expression, and
  * loads the result in the display. If an error occurs, then the Error message
  * is shown in the display.
  **/
  function enterHandler () {
    var current_value = display.getValue();
    if (current_value !== null && current_value !== undefined) {
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

  function keyHandler (evt) {
    var key = evt.key;
    switch (key){
      case '.': pointHandler(); break;
      case 'c':
      case 'C':
        if (evt.shiftKey){
          clearEntryHandler();
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

  return Calculator;
})();
