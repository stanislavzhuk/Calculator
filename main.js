const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons button');

let currentValue = '';
let currentOperator = '';
let previousValue = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (/[0-9]/.test(value)) {
      currentValue += value;
    } else if (
      value === '+' ||
      value === '-' ||
      value === '×' ||
      value === '÷'
    ) {
      if (value === '×') {
        currentOperator = '*';
      } else if (value === '÷') {
        currentOperator = '/';
      } else {
        currentOperator = value;
      }
      previousValue = currentValue;
      currentValue = '';
    } else if (value === '⌫') {
        currentValue = currentValue.slice(0, -1);
    } else if (value === '=') {
      if (currentOperator && previousValue && currentValue) {
        previousValue = String(
          eval(previousValue + currentOperator + currentValue)
        );
        currentValue = '';
        currentOperator = '';
      }
    } else if (value === 'AC') {
      previousValue = '';
      currentValue = '';
      currentOperator = '';
    }

    display.value =
      previousValue +
      (currentOperator === '*'
        ? '×'
        : currentOperator === '/'
        ? '÷'
        : currentOperator) +
      currentValue;
  });
});
