const buttons = document.querySelector(".buttons-container");

const currentOperation = document.querySelector(".currentOperation");
const lastOperation = document.querySelector(".lastOperation");

let nextNum = false;
let operatorClicked = false;
let operation = "";
let num1 = "";
let operator = "";
let num2 = "0";

const add = (num1, num2) => num1 + num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;
const substract = (num1, num2) => num1 - num2;

buttons.addEventListener("click", (e) => {
  btnClicked = e.target.id;
  processScreen(btnClicked);
});

const operate = (operator, num1, num2) => {
  if (operator === "+") {
    result = add(num1, num2);
  } else if (operator === "x") {
    result = multiply(num1, num2);
  } else if (operator === "÷") {
    result = divide(num1, num2);
  } else if (operator === "-") {
    result = substract(num1, num2);
  }

  console.log(result);
  return result;
};

const clearScreen = () => {
  btnClicked = "";
  lastOperation.textContent = "";
  currentOperation.textContent = "0";
  operation = "";
  num1 = "";
  num2 = "0";
  operator = "";
  nextNum = false;
  operatorClicked = false;
};

const deleteNumber = () => {
  lastNum = currentOperation.textContent.length - 1;
  newNumber = currentOperation.textContent.slice(0, -1);
  currentOperation.textContent = newNumber;
  if (operatorClicked) {
    num2 = newNumber;
  } else {
    num1 = newNumber;
  }

  updateOperation = operation.substring(0, operation.length - 1);
  operation = updateOperation;
};

const processScreen = (btnClicked) => {
  let isOperator =
    btnClicked === "+" ||
    btnClicked === "x" ||
    btnClicked === "÷" ||
    btnClicked === "-";
  let isEqual = btnClicked === "=";
  let isClear = btnClicked === "clear";
  let isDel = btnClicked === "del";
  let notNumber = isOperator || isClear || isDel || isEqual;

  //Check the negative number
  if (btnClicked === "-" && num1.length === 0) {
    isOperator = false;
    btnClicked = "-";
    num1 = btnClicked;
  } else if (btnClicked === "-" && num2.length === 1 && operatorClicked) {
    btnClicked = "-";
    num2 = btnClicked;
  }

  //Prevents the print of any operator if the nums are empty
  if (isOperator && num1.length == 0) {
    return (btnClicked = "");
  }
  //Prevents the print equal if the nums and operator are empty
  if (isEqual && operator.length === 0 && num2.length === 1) {
    return (btnClicked = "");
  }

  //Prevents the print of del
  if (isDel) {
    btnClicked = "";
  }

  operation += btnClicked;

  if (currentOperation.textContent === "0") {
    currentOperation.textContent = "";
  }

  //check if the btnclick is one of the operators
  if (isOperator && !operatorClicked) {
    nextNum = true;
    operatorClicked = true;
    operator = btnClicked;
    console.log(operator);
    lastOperation.textContent = operation;
    btnClicked = "";
    currentOperation.textContent = "0";
  }
  //prevent te repetition of operators
  if (operatorClicked && isOperator) {
    btnClicked = "";
  }
  //Check if is an empty decimal
  if (btnClicked === "." && num1.length === 0) {
    num1 += 0;
  }
  //set first num
  if (nextNum === false && !notNumber) {
    num1 += btnClicked;
  }
  // set second num
  if (nextNum && !isOperator && !isEqual) {
    if(num2.length === 1 && num2 === "0"){
      num2 = "";
    }
    num2 += btnClicked;
  }
  //Check if is an empty decimal
  if (btnClicked === "." && num2.length === 1 && num2 === ".") {
    num2 += 0;
  }

  //if is equal and nums are filled with te operator then run this process
  if (isEqual) {
    result = operate(operator, parseFloat(num1), parseFloat(num2));

    if (result % 1 === 0) {
      result = Math.round(result);
    } else {
      result = result.toFixed(2);
    }

    lastOperation.textContent += `${num2} = ${result}`;
    currentOperation.textContent = result;

    if (result === 0) {
      num1 = "";
    } else {
      num1 = result;
    }

    operation = num1;
    num2 = "0";
    operator = "";
    nextNum = false;
    operatorClicked = false;
    btnClicked = "";
  }

  if (isClear) {
    clearScreen();
  } else if (isDel) {
    deleteNumber();
  } else {
    currentOperation.textContent += btnClicked;
  }

  console.log("num1", num1);
  console.log("num2", num2);
  console.log("operator", operator);
  console.log("click operator", operatorClicked);
  console.log("next num", nextNum);
  console.log("operation", operation);
};
