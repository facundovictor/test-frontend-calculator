/**
* @author: Facundo Victor <facundovt@gmail.com>
**/

var display;
var parser;

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

Parser = (function() {
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

  return Parser;
})();


function refreshDisplay (new_value) {
  if (isNaN(new_value)){
    display.innerText = "Error";
  } else {
    display.innerText = new_value;
  }
}

function clearAll () {
  refreshDisplay(0);
  parser = new Parser();
}

window.onload = function () {
  display = document.getElementById('display');
  clearAll();
};
