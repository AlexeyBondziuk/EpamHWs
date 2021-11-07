'use strict';

let amountOfMoney = prompt('Please, input your amount of money');
let numberOfYears = prompt('Please, input number of years');
let percentageOfYear= prompt('Please, input  percentage of a year');
const minCash = 1000;
const minYears = 1;
const maxPercentage = 100;
const oneHundredPercent = 100;
const decimalPlaces = 2;

workFlow();
function workFlow() {
    if (checkoutData()) {
        calcTotalProfit(amountOfMoney, numberOfYears, percentageOfYear)
    }
}
function checkoutData() {
    function isNumber(value1, value2, value3) {
        return Number(value1) && Number(value2) && Number(value3) && true;
    }
    function checkInitialAmount(value) {
        return +value >= minCash;
    }
    function checkNumberOfYears (value) {
        return +value >= minYears;
    }
    function checkPercentageOfYear (value) {
        return +value <= maxPercentage;
    }
    if (!isNumber(amountOfMoney, numberOfYears, percentageOfYear)) {
        return alert('Invalid input data')
    } else if (!checkInitialAmount(amountOfMoney)) {
        return alert('Invalid input data');
    }else if (!checkNumberOfYears(numberOfYears)) {
        return alert('Invalid input data');
    }else if (!checkPercentageOfYear(percentageOfYear)) {
        return alert('Invalid input data');
    }else {
        return true
    }
}
function calcTotalProfit (amountOfMoney, numberOfYears, percentageOfYear) {
    let totalProfit = 0;
    numberOfYears = parseInt(numberOfYears);
    for (let i=1; i <= numberOfYears; i++) {
        totalProfit = totalProfit + (+amountOfMoney+totalProfit) * percentageOfYear/oneHundredPercent;
    }
    let totalAmount = totalProfit + +amountOfMoney;
   alert(`
    Initial amount: ${amountOfMoney}
    Number of years: ${numberOfYears}
    Percentage of year: ${percentageOfYear}\n
    Total profit: ${totalProfit.toFixed(decimalPlaces)}
    Total amount: ${totalAmount.toFixed(decimalPlaces)}
`);
}

