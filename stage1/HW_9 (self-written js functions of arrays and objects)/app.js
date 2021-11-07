function reverseNumber(num) {
    let digit, result = 0;
    let ten = 10;
    while(num){
        digit =num % ten;
        result = result * ten + digit;
        num = (num - digit)/ten;
    }
    return result;
}
console.log(reverseNumber(-987654323));
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function forEach(arr, func) {
    for (let el of arr) {
        func(el)
    }
}
forEach([2,5,8], function(el) { console.log(el) })
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function map(arr, func) {
    let newArray = [];
     forEach(arr, (el) => {
         newArray.push(func(el));
     })
    return newArray
}
console.log(map([1, 2, 3, 4, 5], function (el) { return el * 2; }) )
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function filter(arr, func) {
    let newArr = [];
    forEach(arr, (el) => {
        if (func(el) === true) {
            newArr.push(el);
        }
    })
    return newArr
}
console.log(filter([1, 4, 6, 7, 8, 10], function(el) { return el % 2 === 0 }))
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let data = [
    {
        "_id": "5b5e3168c6bf40f2c1235cd6",
        "index": 0,
        "age": 39,
        "eyeColor": "green",
        "name": "Stein",
        "favoriteFruit": "apple"
    },
    {
        "_id": "5b5e3168e328c0d72e4f27d8",
        "index": 1,
        "age": 38,
        "eyeColor": "blue",
        "name": "Cortez",
        "favoriteFruit": "apple"
    },
    {
        "_id": "5b5e3168cc79132b631c666a",
        "index": 2,
        "age": 66,
        "eyeColor": "blue",
        "name": "Suzette",
        "favoriteFruit": "apple"
    },
    {
        "_id": "5b5e31682093adcc6cd0dde5",
        "index": 3,
        "age": 19,
        "eyeColor": "green",
        "name": "Weiss",
        "favoriteFruit": "apple"
    }
]

function getAdultAppleLovers(data) {
    let numberOfAge = 18;
    let favoriteFruit = 'apple';
    return map(filter(data, (el) => {
        return el.age > numberOfAge && el.favoriteFruit === favoriteFruit;
    }), (el) => el.name)

}
console.log(getAdultAppleLovers(data))
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getKeys(obj) {
    let result = [];
    for (let el in obj) {
        if (obj.hasOwnProperty(el)) {
            result.push(el);
        }
    }
    return result;
}
console.log(getKeys({keyOne: 1, keyTwo: 2, keyThree: 3}));
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getValues(obj) {
    let result = [];
    for (let el in obj) {
        if (obj.hasOwnProperty(el)) {
            result.push(obj[el]);
        }
    }
    return result;
}
console.log(getValues({keyOne: 1, keyTwo: 2, keyThree: 3}))
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showFormattedDate(dateObj) {
    let day = dateObj.getDate();
    let month = dateObj.getMonth();
    let year = dateObj.getFullYear();
    let listOfMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `It is ${day} of ${listOfMonth[month]}, ${year}`
}
console.log(showFormattedDate(new Date('2019-09-28T01:10:00')))