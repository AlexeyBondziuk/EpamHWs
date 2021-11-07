function isEquals (a, b) {
    return a === b;
}
console.log(`isEquals: ${isEquals( '2', 2)}`)

function isBigger (fist, second) {
    return fist > second;
}
console.log(`isBigger: ${isBigger( 1, 2)}`)

function storeNames (...args) {
    return args
}
console.log(storeNames( 'Tommy Shelby', 'Ragnar Lodbrok', 'Tom Hardy'))

function getDifference(a, b) {
    return a > b? a - b : b - a;
}
console.log(`getDifference: ${getDifference(0, -0)}`)

function negativeCount (arr) {
    return arr.reduce((sum, current) => current < 0? ++sum : sum, 0)
}
console.log(`negativeCount: ${negativeCount([4, 3, 2, 9])}`)
console.log(`negativeCount: ${negativeCount([0, -3, 5, 7])}`)

function letterCount(firstStr, secondStr) {
    let arr = firstStr.toLowerCase().split('');
    return arr.reduce((sum, current) => {
       return current.toLowerCase() === secondStr.toLowerCase() ? ++sum : sum;
    }, 0);
}
console.log(`letterCount: ${letterCount("MaRry", "r")}`);
console.log(`letterCount: ${letterCount("BaYYYYYYYYYYYYrn", "y")}`);
console.log(`letterCount: ${letterCount("", "z")}`);

function countPoints (arr) {
    let newArr = [];
    const WINPOINTS = 3;
    const DRAWPOINTS = 1;
    for (let el of arr) {
        newArr.push(el.split(':'))
    }
    return newArr.reduce((sum, current) => {
        if (+current[0] > +current[1]) {
            sum += WINPOINTS
        }else if (+current[0] === +current[1]) {
            sum += DRAWPOINTS
        }
        return sum
    }, 0)

    // let sum = 0;
    // for (let el of newArr) {
    //     if (+el[0] > +el[1]) {
    //         sum += 3
    //     }else if (+el[0] === +el[1]) {
    //         sum += 1
    //     }
    // }
    // return sum
}
console.log(
    `countPoints: ${countPoints(['100:90', '110:98', '100:100', '95:46', '54:90', '99:44', '90:90', '111:100'])}`);