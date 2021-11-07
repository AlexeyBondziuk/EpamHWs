/* START TASK 1: Your code goes here */
const tds = document.querySelectorAll('td');
const firstTdInRow = document.querySelectorAll('td:first-child');
const table = document.querySelector('table');
const specialCell = document.querySelector('#specialCell');

tds.forEach(el => {
    el.onclick = () => {
        el.className = 'bg-yellow'
    }
})

firstTdInRow.forEach(el => {
    el.onclick = () => {
        const row = el.closest('tr');
        row.className = 'bg-blue'
    }
})

specialCell.onclick = () => {
    // specialCell.className = "bg-yellow"; //данное условие было добавлено, согласно ответу на Q&A сессии (0:12:25),
    //                                     // однако согласно скриншоту в ТЗ, его необходимо убрать
    if(table.classList.contains('bg-green')) {
        specialCell.className = 'bg-yellow'
    }

    table.className = 'bg-green';
}
/* END TASK 1 */

/* START TASK 2: Your code goes here */
const telInput = document.querySelector('#telInput');
const telInputSendButton = document.querySelector('#telInputSendButton');
const divMessage = document.querySelector('#message');
const label = document.querySelector('#test');
const form = document.querySelector('form');
const regexp = /^\+380\d{9}$/;

function telValidation() {
    if (regexp.test(telInput.value)) {
        telInput.classList.toggle('border-red', false);
        divMessage.classList.toggle('bg-red', false);
        telInputSendButton.disabled = false;
    }else{
       if( divMessage.classList.contains('bg-green') ) {
           divMessage.classList.remove('bg-green')
       }
       if(!telInputSendButton.disabled) {
           telInputSendButton.disabled = true;
        }
        telInput.classList.toggle('border-red', true);
        divMessage.classList.toggle('bg-red', true);
        label.textContent = 'Type number does not follow format +380*********'
    }
}
form.onsubmit = function(event) {
    event.preventDefault()
    divMessage.classList.add('bg-green')
    label.textContent = 'Data was successfully sent'

};
/* END TASK 2 */

/* START TASK 3: Your code goes here */
const court = document.querySelector('#court');
const ball = document.querySelector('#ball');
const scoreFieldTeamA = document.querySelector('#scoreFieldTeamA');
const scoreFieldTeamB = document.querySelector('#scoreFieldTeamB');
const scoreNotification = document.querySelector('#scoreNotification');
const soresOfTeamA = document.querySelector('#soresOfTeamA');
const soresOfTeamB = document.querySelector('#soresOfTeamB');
const TWO = 2;
const QUARTER = 4;
const THREESEC = 3000;
const defaultBallPositionLeft = 280;
const defaultBallPositionTop = 145;

let countTeamA = 0;
let countTeamB = 0;

court.addEventListener('click', (event) => {

    if(event.path[0].id === 'court') {
        ball.style.left = event.offsetX - ball.clientWidth / TWO + 'px';
        ball.style.top = event.offsetY- ball.clientWidth / TWO + 'px';

    }else if(event.path[0].id === 'scoreFieldTeamA'){
        ball.style.left = parseInt(getComputedStyle(scoreFieldTeamA).left) -ball.clientWidth / QUARTER + 'px';
        ball.style.top = parseInt(getComputedStyle(scoreFieldTeamA).top) - ball.clientWidth / QUARTER + 'px';


        soresOfTeamA.textContent = `Team A:${++countTeamA}`
        showScoreNotification( 'Team A score!', 'red')
        court.style.pointerEvents = 'none'
        setTimeout(returnBallToDefaultPosition, THREESEC)


    }else if(event.path[0].id === 'scoreFieldTeamB'){
        ball.style.left = parseInt(getComputedStyle(scoreFieldTeamB).left) -ball.clientWidth / QUARTER + 'px';
        ball.style.top = parseInt(getComputedStyle(scoreFieldTeamB).top) - ball.clientWidth / QUARTER + 'px';

        soresOfTeamB.textContent = `Team B:${++countTeamB}`;
        showScoreNotification( 'Team B score!', 'blue')
        court.style.pointerEvents = 'none'
        setTimeout(returnBallToDefaultPosition, THREESEC)
    }
})

function returnBallToDefaultPosition() {
    ball.style.left = defaultBallPositionLeft + 'px';
    ball.style.top = defaultBallPositionTop + 'px';
    court.style.pointerEvents = '';
}

scoreNotification.addEventListener('scoreNotificationShowed', function (e){
    scoreNotification.textContent = e.detail.scoreNot;
    scoreNotification.style.color = e.detail.color;

    setTimeout(function() {
        scoreNotification.textContent = ''
    }, THREESEC)
})

function showScoreNotification(scoreNot, color) {
    const event = new CustomEvent('scoreNotificationShowed', {
        detail: {
            scoreNot,
            color
        }
    })
    scoreNotification.dispatchEvent(event);
}
/* END TASK 3 */
