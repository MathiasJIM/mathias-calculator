const buttons = document.querySelector(".buttons-container");
const input = document.querySelector(".calculator-screen");


buttons.addEventListener("click", (e) => {
    const isBtn = e.target.nodeName === "BUTTON";
  
    if (!isBtn) {
      return;
    }

    console.log(e.target.id);
    addToScreen(e.target.id);
});

const addToScreen = (num) => {
    input.value = num;
}
  