
var Display = (function() {
  function Display() {
    this.reference = document.getElementById('display');
    this.isFloat = false;
    this.isDirty = false;
    this.isResult = false;
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
      this.isDirty = false;
      this.isResult = false;
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
    this.isResult = false;
  };

  Display.prototype.addValue = function (value){
    if (this.reference.innerText == '0' || this.isDirty || this.isResult){
      this.setValue(value);
    } else {
      this.appendValue(value);
    }
  };

  Display.prototype.getValue = function () {
    if (!this.isDirty) {
      this.isDirty = true;
      return this.reference.innerText;
    }
  };

  Display.prototype.markResult = function () {
    this.isResult = true;
  };

  return Display;
})();
