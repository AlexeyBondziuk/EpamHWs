'use strict';

let minRandom = 0;
let maxRandom = 8;
const upperMaxRandom =4;
let prize = 100;
let currentPrize = 0;
let counter = 0;
let counter2 = 0;
let rise = 2;
let totalPrize = 0;
const IsTrue = true;
const maxAttempts = 3;
const nextAttemptCoeff = 0.5;
const defaultPrize = 100;

function getRandom(minRandom, maxRandom) {
    let min = Math.ceil(minRandom);
    let max = Math.floor(maxRandom);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function guessPocket(randomNumber, prize ) {
    let numberOfPocket = +prompt(`Choose a roulette pocket number from 0 to ${maxRandom}
Attempts left: ${maxAttempts-counter}
Total prize: ${totalPrize}$
Possible prize on current attempt: ${prize}$`);
    if (numberOfPocket === randomNumber) {
        alert(`Congratulation, you won! Your prize is: ${prize}`);
        currentPrize = prize
    } else if (counter >= maxAttempts-1) {
        alert(`Thank you for your participation. Your prize is: ${totalPrize}`);
        currentPrize = 0;
    } else {
        counter = ++counter;
        +guessPocket(randomNumber, prize * nextAttemptCoeff);
    }
    return currentPrize
}
function tryAgain() {
    return confirm('Do you want to play again?');
}

let startTheGame = confirm('Do you want to play a game?')
if (!startTheGame) {
    alert('You did not become a billionaire, but can.')
}else {
    let randomNumber = getRandom(minRandom, maxRandom);
    totalPrize = guessPocket(randomNumber, prize);
    while (IsTrue) {
        let result = tryAgain()
        if (!result) {
            alert(`Thank you for your participation. Your prize is: ${totalPrize}`);
            break
        } else {
            prize = defaultPrize;
            maxRandom += upperMaxRandom;
            counter2++;
            randomNumber = getRandom(minRandom, maxRandom)
            let rate = Math.pow(rise, counter2);
            prize = prize * rate;
            counter = 0;
            prize = guessPocket(randomNumber, prize);
            totalPrize += prize
        }
    }
}