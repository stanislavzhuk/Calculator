const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons button');

let currentValue = '';
let currentOperator = '';
let previousValue = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (/[0-9]/.test(value) && currentValue.length < 13) {
      if (currentValue === '0' && !currentValue.includes('.')) {
        currentValue = value;
      } else {
        currentValue += value;
      }
    } else if (
      (value === '+' ||
        value === '-' ||
        value === '×' ||
        value === '÷') &&
      currentValue !== ''
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
        if (currentOperator === '/' && parseFloat(currentValue) === 0) {
          // display.value = "Error";
          currentValue = '';
        } else {
          let result = eval(previousValue + currentOperator + currentValue);
          let resultString = result.toString();
          let maxLength = 13;
          if (resultString.length > maxLength) {
            resultString = resultString.slice(0, maxLength);
          }
          currentValue = resultString;
          currentOperator = '';
          previousValue = '';
        }
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
      if (previousValue && currentValue) {
        const percentValue =
          (parseFloat(previousValue) * parseFloat(currentValue)) / 100;
        currentValue = percentValue.toString();
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
