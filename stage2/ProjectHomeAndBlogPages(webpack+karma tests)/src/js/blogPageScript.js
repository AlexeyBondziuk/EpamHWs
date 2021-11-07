import '../styles/styles.sass'
import fullStar from '../img/Star-1.svg'
import emptyStar from '../img/Star-2.svg'
import halfOfStar from '../img/Group.svg'
import noBackdropImage from '../img/no-image-icon-hi.png'

import { createVideoPosts } from './createVideoPosts.js';
import {createAudioPosts} from './createAudioPosts.js';
import { createPhotoPosts } from './createPhotoPosts.js';
import { createTextPosts } from './createTextPosts.js';
import {createSearchSelectedPosts, deepClone, getItemFromMovieCollection, inputForGenre} from './searchByInput.js';

const blogPost = document.querySelector('#blogPost');

let mainDataForPost = {};

async function requestMovieCollection () {
    let response =
        await fetch('https://api.themoviedb.org/3/movie/popular?api_key=0f3abe6c40314201d6cfc0d3278edea8');

    if (response.ok) {
        return await response.json();
    } else {
        console.log('Ошибка HTTP: ' + response.status);
    }
}

async function requestGenreIds (mainDataForPost) {
    let response =
        await fetch('http://api.themoviedb.org/3/genre/movie/list?api_key=0f3abe6c40314201d6cfc0d3278edea8');

    if (response.ok) {
        mainDataForPost.genreCollection = await response.json();
        return mainDataForPost
    } else {
        console.log('Ошибка HTTP: ' + response.status);
    }
}

async function requestMovieById (movieId) {
    let response =
        await fetch(`https://api.themoviedb.org/3/movie/
        ${movieId}?api_key=0f3abe6c40314201d6cfc0d3278edea8&language=en-US`);

    if (response.ok) {
        return await response.json();

    } else {
        console.log('Ошибка HTTP: ' + response.status);
    }
}

requestMovieCollection()
    .then(movieCollection => {
        mainDataForPost = {movieCollection}

        return requestGenreIds(mainDataForPost)

    })
    .then(mainDataForPost => {
        createPosts(mainDataForPost, blogPost)
})

function createPosts(mainDataForPost, rooDiv) {

    if (checkLocalStorage()) {
        let jsonTitleItem = localStorage.getItem('title')
        let jsonAuthorItem = localStorage.getItem('author')

        if (jsonTitleItem) {
            inputForGenre.disabled = true

            let objItem = JSON.parse(jsonTitleItem)

            requestMovieById(objItem.id)
                .then(movie => {

                let newMainDataForPost = deepClone(mainDataForPost)

                newMainDataForPost.movieCollection.results = [movie]

                createSearchSelectedPosts(newMainDataForPost, true)
            })
                .then(() => {
                    createPostsProlongation()
                })

        } else if (jsonAuthorItem) {

            let objItem = JSON.parse(jsonAuthorItem)

            let newMainDataForPost = getItemFromMovieCollection(mainDataForPost, objItem.author, objItem.id)

            createSearchSelectedPosts(newMainDataForPost, false)

            createPostsProlongation()

        }
    }else{
        createPostsProlongation()
    }

    function createPostsProlongation () {

        const numberOfVideoPosts = 5
        const numberOfAudioPosts = 5
        const numberOfPhotoPosts = 5
        const numberOfTextPosts = 5

        createVideoPosts(rooDiv, numberOfVideoPosts, mainDataForPost, false, searchData)
        createAudioPosts(rooDiv, numberOfAudioPosts, numberOfVideoPosts, mainDataForPost, false, searchData)
        createPhotoPosts(rooDiv, numberOfPhotoPosts, numberOfAudioPosts, numberOfVideoPosts,
            mainDataForPost, false, searchData)
        createTextPosts(rooDiv, numberOfTextPosts, numberOfPhotoPosts, numberOfAudioPosts, numberOfVideoPosts,
            mainDataForPost, false, searchData)
    }
}

const searchData = {};

function checkLocalStorage() {
    return localStorage.getItem('author') !== null
        && localStorage.getItem('author') !== undefined
        && localStorage.getItem('author') !== ''
        || localStorage.getItem('title') !== null
        && localStorage.getItem('title') !== undefined
        && localStorage.getItem('title') !== ''
}

function getBackdropImage(mainDataForPost, numberOfFilm) {
    const respondBackdropUrl = mainDataForPost.movieCollection.results[numberOfFilm].backdrop_path
    const backdropDomain = 'https://www.themoviedb.org/t/p/original'
    const defaultBackdropUrl = noBackdropImage

    if(respondBackdropUrl === null) {

        return defaultBackdropUrl

    }else{
        return backdropDomain + respondBackdropUrl
    }
}

function setReleaseDate(mainDataForPost, numberOfFilm) {
    let date = mainDataForPost.movieCollection.results[numberOfFilm].release_date
    if (date) {
        date = new Date(date);

        let resultMonth = new Intl.DateTimeFormat('en-US', {month: 'short'}).format(date);

        return `${date.getDate()} ${resultMonth}, ${date.getFullYear()}`
    }else{
        return 'unknown'
    }
}

function getReadingTime(mainDataForPost, numberOfFilm) {

    const text = mainDataForPost.movieCollection.results[numberOfFilm].overview
    const wpm = 256;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wpm)
}

function setStarRating(mainDataForPost, numberOfFilm) {

    const rating = Math.round(mainDataForPost.movieCollection.results[numberOfFilm].vote_average)
    const defaultNumberOfStars = 5;

    let arr = [0,1,2,3,4,5,6,7,8,9];
    let newArr = [];

    for(let i = 0; i < rating; i++) {
        arr[i] = true
    }

    for(let i = 0; i < arr.length; i++) {
        if( arr[i] === arr[i + 1]) {
            i += 1
            newArr.push(fullStar)
        }
    }

    if(rating % 2 !== 0) {
        newArr.push(halfOfStar)
    }

    let newArrLength = newArr.length

    for(let i = 0; i <= defaultNumberOfStars - newArrLength; i++ ) {
        newArr.push(emptyStar)
    }

    return newArr
}

function getGenre(mainDataForPost, numberOfFilm, searchable) {
    const arrOfGenres = [];

    if (searchable) {
        const arrOfGenresIds = mainDataForPost.movieCollection.results[numberOfFilm].genres
            arrOfGenresIds.map(item => {
                arrOfGenres.push(item.name)
            })

        return arrOfGenres

    }else {
        const arrOfGenresIds = mainDataForPost.movieCollection.results[numberOfFilm].genre_ids

        const fullListOfGenresIds = mainDataForPost.genreCollection.genres

        fullListOfGenresIds.map((item) => {
            arrOfGenresIds.forEach(newItem => {
                if (item.id === newItem) {
                    arrOfGenres.push(item.name)
                }
            })

        })

        return arrOfGenres
    }
}

const popUpMessageConfig = {
    message: 'Subscribe to this blog and get new updates first',
    numberOfButtons: 1,
    backgroundColor: 'light',
    callFromButton: false
}
setTimeout( $('document').showPopup, 10000, popUpMessageConfig)

export {requestMovieCollection,
    blogPost,
    mainDataForPost,
    createPosts,
    getBackdropImage,
    setReleaseDate,
    getReadingTime,
    setStarRating,
    getGenre,
    searchData
}