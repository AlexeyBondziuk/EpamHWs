const appRoot = document.getElementById('app-root');

appRoot.insertAdjacentHTML('afterbegin', '' +
    '<header>' +
        '<h1>Countries Search</h1>' +
        '<form class="form">' +
                '<p class="align-items-center">Please choose type of search:</p>' +
                '<p>' +
                    '<label><input name="choose" id="radio-region" type="radio" value="region">By Region</label>' +
                    '<br>'+
                    '<label>' +
                        '<input name="choose" id="radio-language" type="radio" value="language">By Language' +
                    '</label>' +
               '</p>' +
               '<p>' +
                   '<label for="query">Please choose search query: </label>' +
                   '<select  name="query" id="query" disabled>' +
                        '<option value="default">Select value</option>' +
                   '</select>' +
               '</p>' +
        '</form>' +
    '</header>'+
    '<main id="searchResult" class="justify-content-center">' +
    '</main>'
)

const searchResult = document.querySelector('#searchResult');
const radioButtonRegion = document.querySelector('#radio-region');
const radioButtonLang = document.querySelector('#radio-language');
const querySelect = document.querySelector('#query');
let arrOfLang = externalService.getLanguagesList();
let arrOfRegion = externalService.getRegionsList();
let radioButtonChoice;
let isSortedByName = true;
let isSortedByArea = false;
let newArr;
let numberOfColumns;

const arrowBoth = '&#8597;';
const arrowDown = '&#8595';
const arrowUp = '&#8593';

radioButtonRegion.addEventListener('change', function (event) {
    querySelect.disabled = !event.target.value;
    getList(arrOfRegion);
    searchResult.innerHTML = '<p>No items, please choose search query</p>';
    appRoot.append(searchResult);
    radioButtonChoice = radioButtonRegion.value

}, false)

radioButtonLang.addEventListener('change', function (event) {
    querySelect.disabled = !event.target.value;
    getList(arrOfLang);
    searchResult.innerHTML = '<p>No items, please choose search query</p>';
    appRoot.append(searchResult);
    radioButtonChoice = radioButtonLang.value
}, false)

function getList(arr) {
    if (querySelect.options.length > 1) {
        while (querySelect.options.length > 1) {
            querySelect.options[1].remove()
        }
    }
    for (let elem of arr) {
        querySelect.insertAdjacentHTML( 'beforeend',`<option value = "${elem}">${elem}</option> \+`)
    }
}

querySelect.addEventListener('change', function () {
    let arr;
    if (radioButtonChoice === 'region') {
        arr = externalService.getCountryListByRegion(querySelect.value)
    }else if (radioButtonChoice === 'language') {
        arr = externalService.getCountryListByLanguage(querySelect.value)
    }

    newArr = []
    for (let elem of arr) {
        let tableRow = [];
        tableRow.push(elem.name);
        tableRow.push(elem.capital);
        tableRow.push(elem.region);

        let listOfLang = []
        for (let key in elem.languages) {
            if (elem.languages.hasOwnProperty(key)) {
                listOfLang.push(' ' + elem.languages[key])
            }
        }
        tableRow.push(listOfLang);

        tableRow.push(elem.area);

        let flagEl = `<img src = ${elem.flagURL} alt = "img of flag">`
        tableRow.push(flagEl);

        newArr.push(tableRow)
    }
    numberOfColumns = newArr[0] ? newArr[0].length : 0;

    newArr.sort();
    createTable(searchResult, numberOfColumns, newArr.length, newArr, arrowUp, arrowBoth);
})

function createTable(parent, cols, rows, arr, arrowForCountryName, arrowForArea) {
    searchResult.innerHTML = '';
    appRoot.append(searchResult)

    let resultTable = document.createElement('table');
    resultTable.id = 'resultTable';
    if (numberOfColumns > 0) {
        resultTable.insertAdjacentHTML('afterbegin', '' +
            '<thead>' +
                '<th>Country name ' +
                    '<button id="buttonForCountryName" class="btn-arrow" >' +
                        `${arrowForCountryName}` +
                    '</button>' +
                '</th>' +
                '<th>Capital</th>' +
                '<th>World Region</th>' +
                '<th>Languages</th>' +
                '<th>Area ' +
                    '<button id="buttonForArea" class="btn-arrow">' +
                        `${arrowForArea}` +
                    '</button>' +
                '</th>' +
                '<th>Flag</th>' +
            '</thead>'
        )

        for (let i = 0; i < rows; i++) {
            let tr = document.createElement('tr')

            for (let j = 0; j < cols; j++) {
                let td = document.createElement('td');
                td.innerHTML = `${arr[i][j]}`;
                tr.append(td)
            }

            resultTable.append(tr)
        }
        parent.append(resultTable)

        let buttonForCountryName = document.querySelector('#buttonForCountryName');

        buttonForCountryName.onclick = () => {
            isSortedByName = !isSortedByName

            if (isSortedByName) {
                arr.sort()
                arrowForCountryName = arrowUp;
            } else if (!isSortedByName) {
                arr.sort().reverse();
                arrowForCountryName = arrowDown;
            }

            arrowForArea = arrowBoth;

            createTable(searchResult, numberOfColumns, newArr.length, arr, arrowForCountryName, arrowForArea);
        }

        const buttonForArea = document.querySelector('#buttonForArea');

        buttonForArea.onclick = () => {
            isSortedByArea = !isSortedByArea
            const areaIndex = 4
            if (isSortedByArea) {
                arr.sort((a, b) => a[areaIndex] - b[areaIndex])

                arrowForArea = arrowUp;

            } else if (!isSortedByArea) {
                arr.sort((a, b) => a[areaIndex] - b[areaIndex]).reverse();

                arrowForArea = arrowDown;
            }

            arrowForCountryName = arrowBoth;

            createTable(searchResult, numberOfColumns, newArr.length, arr, arrowForCountryName, arrowForArea);
        }
    }else{
        searchResult.innerHTML = '<p>No items, please choose search query</p>';
    }
}