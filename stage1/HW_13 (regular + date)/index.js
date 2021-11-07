//Task1 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getAge(birthday) {
    let today = new Date();
    let years = today.getFullYear() - birthday.getFullYear()
    if (today.getMonth() < birthday.getMonth() ||
        today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate()) {
        years--;
    }
    return years
}
const birthday22 = new Date(2000, 2, 28);
const birthday23 = new Date(2000, 2, 30);
console.log(getAge(birthday22)); // 20 (assuming today is the 22nd October)
console.log(getAge(birthday23)); // 19 (assuming today is the 22nd October)

//Task2  (маленькая поддержка в бразуреах)//////////////////////////////////////////////////////////////////////////////
function getWeekDay(date) {
    let options = { weekday: 'long'};
    return new Intl.DateTimeFormat('en-US', options).format(date)
}

console.log(getWeekDay(Date.now())); // "Thursday" (if today is the 22nd October)
console.log(getWeekDay(new Date(2020, 9, 22))); // "Thursday"

//Task3 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getAmountDaysToNewYear() {
    const milliSecInSec = 1000;
    const secInHour = 3600;
    const hoursInDay = 24;
    let today, fullYear, newYearDay, daysToNY;
    today = new Date();
    fullYear = new Date().getFullYear()
    newYearDay = new Date().setFullYear(fullYear+1, 0, 1)
    daysToNY = newYearDay - today;

    return Math.floor(daysToNY / (hoursInDay * secInHour * milliSecInSec))
}

console.log(getAmountDaysToNewYear()); // 124 (if today is the 30th August)

//Task4 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getProgrammersDay(year) {
    const milliSecInSec = 1000;
    const secInHour = 3600;
    const hoursInDay = 24;
    const programmerDay = 256;
    let startYear, programmerDayInMilliSeconds, dateOfProgrammerDay;
    let options = { month: 'short'};
    let resultDate, resultMonth, resultYear;

    startYear = new Date().setFullYear(year, 0, 0);
    programmerDayInMilliSeconds = programmerDay * hoursInDay * secInHour * milliSecInSec;
    dateOfProgrammerDay = new Date(startYear + programmerDayInMilliSeconds);

    resultDate = dateOfProgrammerDay.getDate();
    resultMonth = new Intl.DateTimeFormat('en-US', options).format(dateOfProgrammerDay);
    resultYear = dateOfProgrammerDay.getFullYear();

    return `${resultDate} ${resultMonth}, ${resultYear} (${getWeekDay(dateOfProgrammerDay)})`

}

console.log(getProgrammersDay(2020)); // "12 Sep, 2020 (Saturday)"
console.log(getProgrammersDay(2019)); // "13 Sep, 2019 (Friday)"

//Task5 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function howFarIs(day) {
    let dayToFind = day[0].toUpperCase() + day.slice(1).toLowerCase();
    let today = new Date();
    let todayDay = getWeekDay(today);
    let count = 0;

    if (todayDay === dayToFind) {
        return `Hey, today is ${todayDay} =)`
    }else{
        while (todayDay !== dayToFind) {
            todayDay = getWeekDay(today.setDate(today.getDate() + 1));
            count++
        }
        return `It's ${count} day(s) left till ${dayToFind}.`
    }
}
console.log(howFarIs('monday'))
console.log(howFarIs('tuesday'))
console.log(howFarIs('wednesday'))
console.log(howFarIs('thursday'))
console.log(howFarIs('friDAy'));
console.log(howFarIs('saturDAY'));
console.log(howFarIs('sunday'));

//Task6 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function isValidIdentifier(str) {
   return /^[a-z_$][\w$]*$/i.test(str)
}

console.log(isValidIdentifier('myVar!')); // false
console.log(isValidIdentifier('myVa$r$')); // true
console.log(isValidIdentifier('myVar_1')); // true
console.log(isValidIdentifier('1_myVar')); // false

//Task7 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function capitalize(str) {
    return str.replace(/(\s|^)[a-z]/g, (x) => x.toUpperCase());
}

const testStr = "My name is John Smith. I am 27.";
console.log(capitalize(testStr)); // "My Name Is John Smith. I Am 27."

//Task8 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function isValidAudioFile(str) {
    return /^[a-zA-Z]+(\.(mp3|flac|alac|acc))$/.test(str)
}

console.log(isValidAudioFile('file.mp3')); // false
console.log(isValidAudioFile('my_file.mp3')); // false
console.log(isValidAudioFile('file.mp3')); //) true

//Task9 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getHexadecimalColors(str) {
    return str.match(/#([a-f0-9]{3}){1,2}\b/gi) || []
}

const testString = "color: #3f3; background-color: #AA00ef; and: #abcd";
console.log(getHexadecimalColors(testString)); // ["#3f3", "#AA00ef"]
console.log(getHexadecimalColors('red and #0000')); // [];

//Task10 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function isValidPassword(str) {
    return /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])).{8,}$/.test(str)
}

console.log(isValidPassword('agent007')); // false (no uppercase letter)
console.log(isValidPassword('AGENT007')); // false (no lowercase letter)
console.log(isValidPassword('AgentOOO')); // false (no numbers)
console.log(isValidPassword('Age_007')); // false (too short)
console.log(isValidPassword('Agent007')); // true

//Task11 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addThousandsSeparators(value) {
    return value.toString().replace(/(?=(\d{3})+(?!\d))/g, ',');
}

console.log(addThousandsSeparators('1234567890')); // "1,234,567,890"
console.log(addThousandsSeparators(1234567890)); // "1,234,567,890"

//Task12 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getAllUrlsFromText(text) {
    try {
        if (!text) {
            throw new Error('Данные неполны: нет имени')
        }else {
            return text.match(/(https?:\/\/[^'" >]+\.[^'" >]+\/)/gi) || []
        }
    }catch (err) {
        return 'Error: array is empty'
    }
}
const text1 = 'We use https://translate.google.com/ to translate some words and phrases from https://angular.io/ ';
const text2 = 'JavaScript is the best language for beginners!'
console.log(getAllUrlsFromText(text1)); // ["https://translate.google.com/", "https://angular.io/"]
console.log(getAllUrlsFromText(text2)); // []
console.log(getAllUrlsFromText()); // (error)
