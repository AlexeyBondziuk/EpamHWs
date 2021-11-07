let nameEvent = prompt('Please, input event name', 'meeting')
function showForm () {
    document.querySelector('#form').style.display = 'block';
}
showForm();
let userName = document.querySelector('#name');
let time = document.querySelector('#time');
let place = document.querySelector('#place');

const timeCheck = new RegExp('^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$');

document.querySelector('.btn-confirm').onclick = (event) => {
    event.preventDefault()
    if(userName.value === '' || time.value === '' || place.value === '') {
        alert(`Input all data`)
    }else if (!timeCheck.test(time.value)) {
        alert('Enter time in format hh:mm')
    }else{
        console.log(`${userName.value} has a ${nameEvent} today at ${time.value} somewhere in ${place.value}`);
    }
};
document.querySelector('.btn-converter').onclick = (event) => {
    event.preventDefault()
    let amountEuro = prompt('Please, input amount of euro');
    let amountDollar = prompt('Please, input amount of dollar');
    let toFixNumber = 2;
    if (!isFinite(amountDollar)
        || !isFinite(amountDollar)
        || amountEuro === ''
        || amountDollar === ''
        || amountDollar < 0
        || amountEuro < 0 ) {
        alert('Please, enter correct number.')
    }else {
       let exchangeDollarRate = 27.76;
       let exchangeEuroRate = 33.52;
       let hryvnaFromDollar = exchangeDollarRate * amountDollar;
       let hryvnaFromEuro = exchangeEuroRate * amountEuro;
       alert(`${amountEuro} euros are equal ${hryvnaFromEuro.toFixed(toFixNumber)}hrns, 
       ${amountDollar} dollars are equal ${hryvnaFromDollar.toFixed(toFixNumber)}hrns`)
    }
}