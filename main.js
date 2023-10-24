const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons button');

let currentValue = '';
let currentOperator = '';
let previousValue = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (/[0-9]/.test(value) && currentValue.length < 13) {
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
    } else if (value === '±') {
      if (currentValue) {
        currentValue = (parseFloat(currentValue) * -1).toString();
      }
    } else if (value === '.') {
      if (currentValue === '') {
        currentValue = '0.';
      } else if (!currentValue.includes('.')) {
        currentValue += '.';
      }
    } else if (value === '%') {
      if (currentValue) {
        currentValue = (parseFloat(currentValue) / 100).toString();
      }
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
