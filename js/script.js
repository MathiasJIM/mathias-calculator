const buttons = document.querySelector(".buttons-container");

const currentOperation = document.querySelector(".currentOperation");
const lastOperation = document.querySelector(".lastOperation");

let nextNum = false;
let operation = "";
let num1 = "";
let operator = "";
let num2 = "";

const add = (num1,num2) =>  num1 + num2;
const multiply = (num1,num2) => num1 * num2;
const divide = (num1,num2) => num1 / num2;
const substract = (num1,num2) => num1 - num2;


buttons.addEventListener("click", (e) => {
  btnClicked = e.target.id;
  processScreen(btnClicked);
});


const operate = (operator, num1, num2) => {
  if(operator === "+"){
    result = add(num1,num2)
  }
  else if(operator === "x"){
    result = multiply(num1,num2)
  }
  else if(operator === "÷"){
    result = divide(num1,num2)
  }
  else if(operator === "-"){
    result = substract(num1,num2)
  }

  console.log(result);
  return result;
}


const clearScreen = () => {
  btnClicked = "";
  lastOperation.textContent = "";
  currentOperation.textContent = "0";
  operation = "";
  num1 = "";
  num2 = "";
  operator = "";
  nextNum = false;
};  


const processScreen = (btnClicked) => {
  let isOperator = btnClicked === "+" || btnClicked === "x" || btnClicked === "÷" || btnClicked === "-";
  let isEqual = btnClicked === "=";
  let isClear = btnClicked === "clear"

  if(isEqual && operator.length === 0 && num2.length === 0){
    btnClicked = "";
  }

  operation += btnClicked;

  if(isOperator){
    nextNum = true;
    operator = btnClicked;
    console.log(operator);
    lastOperation.textContent = operation;
    btnClicked = "";
    currentOperation.textContent = "0";
  }

  if(nextNum === false && !isOperator){
    num1 += btnClicked;
  }

  if(operator.length === 1){
    num2 += btnClicked;
  }

  if(isEqual){
    result = operate(operator, parseFloat(num1), parseFloat(num2));

    if (result % 1 === 0){
      result = Math.round(result);
    } else {
      result = result.toFixed(2);
    }

    lastOperation.textContent += `${num2} ${result}`;
    currentOperation.textContent = result;
    

    num1 = result
    operation = num1;
    num2 = "";
    btnClicked = "";
  }

  if(currentOperation.textContent === "0"){
    currentOperation.textContent = "";
  }

  if(isClear){
    clearScreen();
  } else {
    currentOperation.textContent += btnClicked;
  }

  console.log("num1",num1);
  console.log("num2",num2);
  console.log("opertor",operator);
  console.log(nextNum);
};

