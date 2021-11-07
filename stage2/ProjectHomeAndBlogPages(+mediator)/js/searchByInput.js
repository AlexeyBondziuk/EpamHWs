import { blogPost, mainDataForPost, searchData } from './blogPageScript.js'

import {createAudioPosts} from "./createAudioPosts.js";

const inputForAuthor = document.querySelector('#inputForAuthor'),
    inputForTitle = document.querySelector('#inputForTitle'),
    dropdownForAuthors = document.getElementById('dropdownForAuthors'),
    dropdownForTitles = document.getElementById('dropdownForTitles'),
    inputWrapperAuthor = document.querySelector('.blog-section_input-wrapper-author'),
    inputWrapperTitle = document.querySelector('.blog-section_input-wrapper-title');

const searchSelectedPostWrapper = document.createElement('div')

inputForAuthor.value = getItemFromLocalStorage('author')
inputForTitle.value = getItemFromLocalStorage('title')

function getItemFromLocalStorage(item) {

    let jsonItem = localStorage.getItem(item)
    if(jsonItem) {
        let objItem = JSON.parse(jsonItem)
        return objItem[item]
    }else{
        return ''
    }
}

inputForTitle.addEventListener('keyup', () => {

    // if (validate(inputForTitle.value)) { //если воодить в  инпут запрос, то согласно ругулярке
                                            // первые 5 букв ничего не будет происходить, что не очень юзер френдли
    if(inputForTitle.value) {
        sendTitleRequest (inputForTitle.value)
            .then(movieCollection => {

                setTitlesToDropdown(movieCollection)

                mainDataForPost.movieCollection = movieCollection

            })
    }
    // }
    inputForAuthor.disabled = true
    showDropdown(dropdownForTitles)
})

inputForTitle.addEventListener('change', () => {
    removeItemFromLocalStorage(inputForTitle, 'title', dropdownForTitles)
})

inputForTitle.addEventListener('click', () => {
    showHideDropdown(dropdownForTitles)
    hideDropdown(dropdownForAuthors)
})

inputWrapperTitle.addEventListener('focusout', (e) => {
    const didClickMenu = dropdownForTitles.contains(e.relatedTarget);
    if (!didClickMenu) {
        hideDropdown(dropdownForTitles)
    }
})

dropdownForTitles.addEventListener('click', (e) => {
    setItemToLocalStorage(e, 'title', 'author', inputForAuthor, inputForTitle, dropdownForTitles)
    inputForAuthor.disabled = true
})

inputForAuthor.addEventListener('click', () => {
    showHideDropdown(dropdownForAuthors)
    hideDropdown(dropdownForTitles)
})
inputForAuthor.addEventListener('keyup', () => {
    filterFunction(inputForAuthor, 'noAuthor', dropdownForAuthors, 'No such genre')
})
inputForAuthor.addEventListener('change', () => {
    removeItemFromLocalStorage(inputForAuthor, 'author', dropdownForAuthors)
})

inputWrapperAuthor.addEventListener('focusout', (e) => {
    const didClickMenu = dropdownForAuthors.contains(e.relatedTarget);
    if (!didClickMenu) {
        hideDropdown(dropdownForAuthors)
    }
})

dropdownForAuthors.addEventListener('click', (e) => {
    setItemToLocalStorage(e, 'author', 'title', inputForTitle, inputForAuthor, dropdownForAuthors)
})

async function sendTitleRequest (value) {
    if(value) {
        let response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=0f3abe6c40314201d6cfc0d3278edea8&language=en-US&query=${value}&page=1&include_adult=false`);

        if (response.ok) {

            return await response.json();


            // console.log(movieCollection)
        } else {
            console.log('Ошибка HTTP: ' + response.status);
        }
    }
}

function showHideDropdown(dropdown) {
    dropdown.classList.toggle('show');
}

function hideDropdown(dropdown) {
    dropdown.classList.remove('show');
}

function showDropdown(dropdown) {
    dropdown.classList.add('show');
}

function validate(title) {
    return /^[A-Z][A-Za-z0-9\s!:-?.,]{5,59}$/.test(title)
}

function setTitlesToDropdown(movieCollection) {
    let collectionForTitles = new Set();

    movieCollection.results.forEach( item => {
        collectionForTitles[item.id] = item.title
        // setForTitles.add( item.title)

    })

    innerToDropdown(collectionForTitles, dropdownForTitles)
}

function innerToDropdown (collectionForTitles, dropdown, searchData, isDropDownForAuthors, setForAuthors) {
    dropdown.innerHTML = '';

    if(isDropDownForAuthors){

        for (let value of setForAuthors) {

            mainDataForPost.genreCollection.genres.forEach(item => {
                if (item.name === value) {
                    dropdown.insertAdjacentHTML('beforeend', `
                        <li tabIndex="-1" id='${item.id}'>${value}</li>
                    `)
                }
            })
        }

    }else{
        if (Object.keys(collectionForTitles).length === 0) {
            dropdown.insertAdjacentHTML('beforeend', `
                <li>No such movie</li>
            `)
        }

        for (let value in collectionForTitles) {
            if (collectionForTitles.hasOwnProperty(value)) {
                dropdown.insertAdjacentHTML('beforeend', `
                    <li tabIndex="-1" id='${value}'>${collectionForTitles[value]}</li>
                `)
            }
        }
    }
}

function setItemToLocalStorage(e, itemToSet, ItemToDelete, inputToDelete, inputToSet, dropdown) {

    if (e.target.tagName === 'LI') {
        localStorage.removeItem(ItemToDelete)
        inputToDelete.value = ''

        let keyValue = {
            [itemToSet]: e.target.innerText,
            id: e.target.id
        }

        let json = JSON.stringify(keyValue)

        localStorage.setItem(itemToSet, json);

        inputToSet.value = e.target.innerText
        showHideDropdown(dropdown)

        insertSelectedElement(e.target.innerText, e.target.id)
    }
}

function insertSelectedElement(selectedItem, selectedItemId) {

    let newMainDataForPost = getItemFromMovieCollection(mainDataForPost, selectedItem, selectedItemId)

    removeSearchSelectedPosts ()
    createSearchSelectedPosts (newMainDataForPost, false)
}

function getItemFromMovieCollection(mainDataForPost, selectedItem, selectedItemId) {

    let newMainDataForPost = deepClone(mainDataForPost)
    let arr = []

    newMainDataForPost.movieCollection.results.find( item => {
        if (item.title === selectedItem) {

            newMainDataForPost.movieCollection.results = [item]

            return true
        }else if(item.genre_ids.includes(Number(selectedItemId))) {
            arr.push(item)
            newMainDataForPost.movieCollection.results = arr

        }
    })

    return newMainDataForPost
}

function deepClone(obj) {
    let clObj;

    switch (typeof obj) {
        case "object":
            if (obj === null) {
                // null => null
                clObj = null;
            } else {
                switch (toString.call(obj)) {
                    case "[object Array]":
                        // It an array, create a new array with
                        // deep copies of the entries
                        clObj = obj.map(deepClone);
                        break;
                    case "[object Date]":
                        // Clone the date
                        clObj = new Date(obj);
                        break;
                    case "[object RegExp]":
                        // Clone the RegExp
                        clObj = new RegExp(obj);
                        break;
                    // ...probably a few others
                    default:
                        // Some other kind of object, deep-copy its
                        // properties into a new object
                        clObj = Object.keys(obj).reduce(function(prev, key) {
                            prev[key] = deepClone(obj[key]);
                            return prev;
                        }, {});
                        break;
                }
            }
            break;
        default:
            // It a primitive, copy via assignment
            clObj = obj;
            break;
    }
    return clObj;
}

function removeItemFromLocalStorage(input, item, dropdown) {
    if ( input.value === '') {
        inputForAuthor.disabled = false
        localStorage.removeItem(item)
        hideDropdown(dropdown)
        removeSearchSelectedPosts ()
    }
}

function createSearchSelectedPosts (mainDataForPost, searchable) {

    searchSelectedPostWrapper.id = 'searchSelectedPost'
    blogPost.after(searchSelectedPostWrapper)

    blogPost.style.display = 'none'

    let numberOfPosts = mainDataForPost.movieCollection.results.length

    createAudioPosts(searchSelectedPostWrapper, numberOfPosts, 0,  mainDataForPost,
        searchable, searchData)

}

function removeSearchSelectedPosts () {

    blogPost.style.display = 'block'
    searchSelectedPostWrapper.innerHTML = ''
}

function setInfoForSearchByAuthor(searchData, numberOfFilm, genre, backdrop, postType, filmTitle) {

    searchData[numberOfFilm] = {
        genre: genre,
        backdrop: backdrop,
        postType: postType,
        filmTitle: filmTitle
    }
}

function setAuthorsToDropdown(searchData) {
    let setForAuthors = new Set();

    for (let prop in searchData) {
        if (searchData.hasOwnProperty(prop)) {
            searchData[prop].genre.forEach(item => {
                setForAuthors.add(item)
            })
        }
    }

    const isDropDownForAuthors = true

    innerToDropdown(null, dropdownForAuthors, searchData, isDropDownForAuthors, setForAuthors)
}

function filterFunction(input, className, dropdown, message) {

    let filter = input.value.toUpperCase();
    let noLi = document.querySelector(`.${className}`);
    let count = 0;

    const li = dropdown.getElementsByTagName('li');

    if (noLi) {
        noLi.remove()
    }

    for (let i = 0; i < li.length; i++) {

        let txtValue = li[i].textContent;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            count++
            li[i].style.display = 'none';
        }
    }

    if (count >= li.length) {
        dropdown.insertAdjacentHTML('beforeend', `
             <li class="${className}">${message}</li>
        `)
    }

    showDropdown(dropdown)
}

export { createSearchSelectedPosts, deepClone, removeSearchSelectedPosts, setInfoForSearchByAuthor,
    setAuthorsToDropdown, searchSelectedPostWrapper, getItemFromMovieCollection, inputForAuthor}