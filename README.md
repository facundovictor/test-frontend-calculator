# test-frontend-calculator
This is simple calculator (add, sub, mult, div, exp), implemented for a front-end test, without using third parties libraries.

## Task:
Create a calculator app without using any third-party libraries. The calculator should be capable of performing addition, subtraction, multiplication, division and exponentiation. It should be usable via mouse and keyboard. Explain on which aspects (choose three) you intend to focus on (e.g. design, maintainability, etc.) and briefly explain why you chose each.

### Implemented Operators:
  - Addition :white_check_mark:
  - Subtraction :white_check_mark:
  - Multiplication :white_check_mark:
  - Division :white_check_mark:
  - Exponentiation :white_check_mark:

### Usability:
  - Via mouse :white_check_mark:
  - Via keyboard: :white_check_mark: (A help button at the top right of the screen, that displays a simple help for non intuitive keyboard shortcuts)

### Aspects:
  - Style: I decided to maintain a simple style to avoid getting long pure CSS code. And I chosen to center the widget and bind the size to the window width.
  - Maintainability: JS is a language that forces a developer to use good practices to achieve a well structured application. Thus, I did an OO implementation, a parser class for doing all the input interpretation  and calculation, a display class for using the calculator output, and finally, the calculator class with all the event listeners.
  - Readability: As the idea is to build it to be reviewed more than really to be used, the JS code is divided in 3 JS files. Also I used Git-Hub, and set the [MIT license](https://github.com/facundovictor/test-frontend-calculator/blob/master/LICENSE) for it, anyone can see it, use it, contribute to it, or comment about it. You may say that there are a lot of calculators out there, and you're right, but this one has a simple JS implementation of the mathematical expression parser: [Shunting yard algorithm] (https://en.wikipedia.org/wiki/Shunting-yard_algorithm). And I had to build it anyway, so... Why not to share it?

## Live result:
[https://facundovictor.github.io/test-frontend-calculator/](https://facundovictor.github.io/test-frontend-calculator/)
