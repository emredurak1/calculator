'use strict';

const calculatorDislay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  '=': (firstNumber, secondNumber) => (firstNumber = secondNumber),
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

const sendNumberValue = function (number) {
  if (awaitingNextValue) {
    calculatorDislay.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = calculatorDislay.textContent;
    calculatorDislay.textContent =
      displayValue === '0' ? number : displayValue + number;
  }
};

const useOperator = function (operator) {
  const currentValue = +calculatorDislay.textContent;
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  if (!firstValue) firstValue = currentValue;
  else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    firstValue = calculation;
    calculatorDislay.textContent = calculation;
  }

  awaitingNextValue = true;
  operatorValue = operator;
};

const addDecimal = function () {
  if (awaitingNextValue) return;
  if (!calculatorDislay.textContent.includes('.')) {
    calculatorDislay.textContent = `${calculatorDislay.textContent}.`;
  }
};

const resetAll = function () {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDislay.textContent = '0';
};

// Event Listeners
inputBtns.forEach(inputBtn => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', () => addDecimal());
  }
});

clearBtn.addEventListener('click', resetAll);
