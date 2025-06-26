const billInput = document.getElementById('bill-input');
const tipButtons = document.querySelectorAll('.tip');
const customTip = document.querySelector('.tip-custom');
const numberOfPeople = document.querySelector('.input-people-input');
const alert = document.querySelector('.alert');
const tipAmount = document.getElementById('tip-amount');
const totalAmount = document.getElementById('total-amount');
const resetButton = document.querySelector('.reset');

let tipValue = 0;
let billValue = 0;
let peopleValue = 1;


//validate bill input
billInput.addEventListener("input", function () {
    billValue = parseFloat(billInput.value) || 0;
    calculateTip();
});


tipButtons.forEach((button) => {
    button.addEventListener("click", function () {
        //remove active classes from all buttons
        tipButtons.forEach ((button) => button.classList.remove("active"));

        //add activ class when the button is clicked
        button.classList.add("active");

        // get the tip from the button clicked
        tipValue = parseInt(this.textContent);
        customTip.value = "";
        calculateTip();
    });
});

customTip.addEventListener("input", function () {
    // remove active class from all buttons
    tipButtons.forEach((button) => button.classList.remove("active"));
    tipValue = parseFloat(customTip.value) || 0;
    calculateTip();
});
numberOfPeople.addEventListener("input", function () {
    peopleValue = parseInt(numberOfPeople.value);
    if (peopleValue === 0) {
        alert.style.display = "block";
        numberOfPeople.style.outline = "1px solid red";
        numberOfPeople.style.border = "none";
    } else {
        alert.style.display = "none";
        numberOfPeople.style.outline = "";
        numberOfPeople.style.border = "";
    }
    calculateTip();
});

// function to calculate tip and total
function calculateTip() {
    if(peopleValue === 0) return;
    const tipPerPerson = (billValue * (tipValue / 100)) / peopleValue;
    const totalAmountPerPerson = billValue / peopleValue + tipPerPerson;
    tipAmount.textContent = `£${totalAmountPerPerson.toFixed(2)}`;
    totalAmount.textContent = `£${totalAmountPerPerson.toFixed(2)}`;

    if(billValue > 0 || peopleValue > 0 || tipValue > 0) {
        resetButton.disabled = false;
    }
}

resetButton.addEventListener("click", function () {
    billInput.value = "";
    customTip.value = "";
    numberOfPeople.value = "";
    tipButtons.forEach((button) => button.classList.remove("active"));
    tipAmount.textContent = "£0.00";
    totalAmount.text = "£0.00";
    resetButton.disabled = true;
    alert.style.display = "none";
    numberOfPeople.style.outline = "";
});
