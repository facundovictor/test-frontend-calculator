
var Display = (function() {
  function Display() {
    this.reference = document.getElementById('display');
    this.isFloat = false;   // Used to restrict the amount of inputted points.
    this.isDirty = false;   // Indicate that the value is used.
    this.isResult = false;  // The value it's a result of an operation.
    this.reference.innerText = 0;
  }

  /**
  * Set the value to show in the display.
  **/
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

  /**
  * Append the value to the end of the current value if applies.
  **/
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

  /**
  * Reset the display object to the inital state.
  **/
  Display.prototype.reset = function () {
    this.reference.innerText = 0;
    this.isFloat = false;
    this.isDirty = false;
    this.isResult = false;
  };

  /**
  * Set the new value to the display, or if applies, append it to the end.
  **/
  Display.prototype.addValue = function (value){
    if (this.reference.innerText == '0' || this.isDirty || this.isResult){
      this.setValue(value);
    } else {
      this.appendValue(value);
    }
  };

  /**
  * Get the value if it's not already given.
  */
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
