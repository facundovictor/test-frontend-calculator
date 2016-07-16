/**
* @author: Facundo Victor <facundovt@gmail.com>
**/

var display;
var parser;

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var Parser = (function() {
  function Parser() {
    this.precedence = {
      'e': 4,
      '*': 3,
      '/': 3,
      '+': 2,
      '-': 2
    };
    this.associative = {
      'e': 'right',
      '*': 'left',
      '/': 'left',
      '+': 'left',
      '-': 'left'
    };
    this.infix_notation = [];
    this.operator_stack = [];
  }

  /**
  * Each token will be added to the data structure following the "Shunting Yard
  * Algorithm", that will left the required calculation in an infix notation.
  **/
  Parser.prototype.pushToken = function(token) {
    var operator_on_top, operator_amount, popped_op;

    if (isNumber(token)) {
      this.infix_notation.push(token);
      return;
    }
    if (this.precedence[token]) { // Is an operator
      while (1) {
        operator_amount = this.operator_stack.length;
        if (operator_amount > 0) {
          operator_on_top = this.operator_stack[operator_amount - 1];
          if (((this.associative[token] == 'left') && (this.precedence[token] <= this.precedence[operator_on_top])) ||
            ((this.associative[token] == 'right') && (this.precedence[token] < this.precedence[operator_on_top]))) {
            this.operator_stack.length--; // Pop
            this.infix_notation.push(operator_on_top);
          } else {
            break;
          }
        } else {
          break;
        }
      }
      this.operator_stack.push(token);
      return; 
    }
    if (token == '('){
      this.operator_stack.push(token);
      return;
    }
    if (token == ')'){
      while (1) {
        operator_amount = this.operator_stack.length;
        if (operator_amount > 0) {
          popped_op = this.operator_stack.pop();
          if (popped_op != '('){
            this.infix_notation.push(popped_op);
          } else {
            break;
          }
        } else {
          throw new Error("Left parenthesis not found");
        }
      }
      return;
    }
    throw new Error("Token not recognized: "+token);
  };

  /**
  * This is the last step of the "Shunting Yard Algorithm". This is separated
  * from the previous function, because the it's executed only when all tokens
  * are inputted.
  **/
  Parser.prototype.finishInfixNotation = function() {
    var popped_op;
    while (this.operator_stack.length > 0){
      popped_op = this.operator_stack.pop();
      if (popped_op == '(') {
        throw new Error("Found a not recovered parenthesis");
      }else{
        this.infix_notation.push(popped_op);
      }
    }
  };

  /**
  * Returns the proper result execution, applying the operator to the operands.
  **/
  Parser.prototype.applyOperation = function (operator, operand_1, operand_2) {
    switch (operator){
      case '+': return +operand_1 + +operand_2;
      case '-': return operand_1 - operand_2;
      case '*': return operand_1 * operand_2;
      case '/': return operand_1 / operand_2;
      case 'e': return Math.pow(operand_1, operand_2);
      default:
        throw new Error('Operator not supported');
    }
  };

  /**
  * Calculates the infix term and returns the result.
  **/
  Parser.prototype.getResult = function() {
    var stack = [], symbol;

    while (this.infix_notation.length > 0) {
      symbol = this.infix_notation.shift();
      if (isNumber(symbol)) {
        stack.push(symbol);
      } else {
        if (this.precedence[symbol]) { // Is an operator
          argument_2 = stack.pop();
          argument_1 = stack.pop();
          result = this.applyOperation(symbol, argument_1, argument_2);
          stack.push(result);
        } else {
          throw new Error('Unknown symbol found in infix stack');
        }
      }
    }
    return stack.pop();
  };

  return Parser;
})();


var Display = (function() {
  function Display() {
    this.reference = document.getElementById('display');
    this.isFloat = false;
    this.isDirty = false;
    this.reference.innerText = 0;
  }

  Display.prototype.setValue = function (new_value) {
    if (new_value == '.'){
      this.appendValue('.');
      return;
    }
    if (isNaN(new_value)){
      this.reference.innerText = "Error";
    } else {
      this.reference.innerText = new_value;
    }
  };

  Display.prototype.appendValue = function (value) {
    if (!isNaN(value)){
      this.reference.innerText += value;
      return;
    }
    if (value == '.'){
      if (!this.isFloat) { 
        this.isFloat = true;
        this.reference.innerText += value;
      }
      return;
    }
    if (value == '-') {
      this.reference.innerText += value;
      return;
    }
    throw new Error('Value not supported');
  };

  Display.prototype.reset = function () {
    this.reference.innerText = 0;
    this.isFloat = false;
  };

  Display.prototype.addValue = function (value){
    if (this.reference.innerText == '0' || this.isDirty){
      this.setValue(value);
      this.isDirty = false;
    } else {
      this.appendValue(value);
    }
  };

  Display.prototype.getValue = function () {
    return this.reference.innerText;
  };

  Display.prototype.markDirty = function () {
    this.isDirty = true;
  };

  return Display;
})();

function clearAll () {
  display = new Display();
  parser = new Parser();
}

function clearCurrentValue () {
  display.reset();
}

/* Button events ----------------------------------------------------------- */
function numHandler (num) {
  display.addValue(num);
}

function pointHandler () {
  display.addValue('.');
}

function addHandler () {
  if (!display.isDirty){
    parser.pushToken(display.getValue());
    parser.pushToken('+');
    display.markDirty();
  }
}

function subHandler () {
  if (!display.isDirty){
    parser.pushToken(display.getValue());
    parser.pushToken('-');
    display.markDirty();
  }
}

function mulHandler () {
  if (!display.isDirty){
    parser.pushToken(display.getValue());
    parser.pushToken('*');
    display.markDirty();
  }
}

function divHandler () {
  if (!display.isDirty){
    parser.pushToken(display.getValue());
    parser.pushToken('/');
    display.markDirty();
  }
}

function expHandler () {
  if (!display.isDirty){
    parser.pushToken(display.getValue());
    parser.pushToken('e');
    display.markDirty();
  }
}

function equalHandler () {
  parser.pushToken(display.getValue());
  parser.finishInfixNotation();
  display.setValue(parser.getResult());
  parser = new Parser();
}

function registerCalculatorEvents(){
  for (var i=0; i<=9; i++) {
    (function(i){
      document.getElementById('num_'+i).onclick = function () { numHandler(i); };
    })(i);
  }

  document.getElementById('point').onclick = pointHandler;
  document.getElementById('C').onclick = clearAll;
  document.getElementById('CE').onclick = clearCurrentValue;

  document.getElementById('add').onclick = addHandler;
  document.getElementById('sub').onclick = subHandler;
  document.getElementById('mul').onclick = mulHandler;
  document.getElementById('div').onclick = divHandler;
  document.getElementById('exp').onclick = expHandler;

  document.getElementById('enter').onclick = equalHandler;
}

window.onload = function () {
  clearAll();
  registerCalculatorEvents();
};
