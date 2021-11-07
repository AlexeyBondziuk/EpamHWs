let mainDataForPost = {};

const topSidebar = document.querySelector('.mediator-main-content_top-sidebar')
const postWrapper = document.querySelector('.mediator-main-content_post-wrapper')
const asideSidebar = document.querySelector('.mediator-main-content_aside-sidebar')
const topSidebarSelectedFilms = document.querySelector('.top-sidebar_selected-films')
const asideSidebarSelectedFilms = document.querySelector('.aside-sidebar_selected-films')

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

requestMovieCollection()
    .then(movieCollection => {
        mainDataForPost = {movieCollection}

        return requestGenreIds(mainDataForPost)

    })
    .then(mainDataForPost => {

        const mediator = new Mediator(mainDataForPost)

        const arrOfGenres = mediator.createArrOfGenres()
        const setOfGenres = mediator.createSetOfGenres(arrOfGenres)
        mediator.innerToSidebar(topSidebar, asideSidebar, setOfGenres)
        topSidebar.addEventListener('click', (e) => {
           mediator.showListOfSelectedFilms(e)
        })

        asideSidebar.addEventListener('click', (e) => {
            mediator.showListOfSelectedFilms(e)
        })

        topSidebarSelectedFilms.addEventListener('click', (e) => {
            mediator.showSelectedFilm(e)
        })

        asideSidebarSelectedFilms.addEventListener('click', (e) => {
            mediator.showSelectedFilm(e)
        })
    })

class Mediator {
    constructor(mainDataForPost) {
        this.mainDataForPost = mainDataForPost
    }

    createArrOfGenres (mainDataForPost) {
        let arrOfGenres = []

        for (let i = 0; i < this.mainDataForPost.movieCollection.results.length; i++) {
            let genre = this.getGenre(mainDataForPost, i)
            arrOfGenres.push(genre)
        }

        return arrOfGenres
    }

    getGenre(mainDataForPost, numberOfFilm) {
        const arrOfGenres = [];

        const arrOfGenresIds = this.mainDataForPost.movieCollection.results[numberOfFilm].genre_ids

        const fullListOfGenresIds = this.mainDataForPost.genreCollection.genres

        fullListOfGenresIds.forEach((item) => {
            arrOfGenresIds.forEach(newItem => {
                if (item.id === newItem) {
                    arrOfGenres.push(item.name)
                }
            })
        })

        return arrOfGenres
    }

   createSetOfGenres(arrOfGenres) {
        let setOfGenres = new Set();

        for (let value of arrOfGenres) {
            value.forEach(item => {
                setOfGenres.add(item)
            })
        }

      return setOfGenres
    }

    innerToSidebar (topSidebar, asideSidebar, setOfGenres) {
        topSidebar.innerHTML = '';
        asideSidebar.innerHTML = '';

        for (let value of setOfGenres) {
            mainDataForPost.genreCollection.genres.forEach(item => {
                if (item.name === value) {
                    topSidebar.insertAdjacentHTML('beforeend', `
                        <li tabIndex="-1" id='${item.id}top'>${value}</li>
                    `)
                    asideSidebar.insertAdjacentHTML('beforeend', `
                        <li tabIndex="-1" id='${item.id}aside'>${value}</li>
                    `)
                }
            })
        }
   }

    showListOfSelectedFilms(e) {

        if (e.target.tagName === 'LI') {

            const selectedGenreId = e.target.id

            const newMainDataForPost = this.getItemFromMovieCollection(null, selectedGenreId)
            const arrFilmTitles = this.createArrWithFilmTitles(newMainDataForPost)

            this.toggleActiveClasses(e.target, e.target.parentNode)
            this.innerSelectedFilms(arrFilmTitles, topSidebarSelectedFilms)
            this.innerSelectedFilms(arrFilmTitles, asideSidebarSelectedFilms)
        }
    }

    getItemFromMovieCollection(selectedItem, selectedItemId) {

        let newMainDataForPost = deepClone(this.mainDataForPost)
        let arr = []

        newMainDataForPost.movieCollection.results.forEach( item => {
            if(item.genre_ids.includes(parseInt(selectedItemId))) {
                arr.push(item)

                newMainDataForPost.movieCollection.results = arr

            }
        })

        return newMainDataForPost
    }

    createArrWithFilmTitles(newMainDataForPost) {
        let arrFilmTitles = []

        newMainDataForPost.movieCollection.results.forEach(item => {
            arrFilmTitles.push(item.title)
        })

        return arrFilmTitles
    }

    innerSelectedFilms (arrFilmTitles, sidebar) {
        sidebar.innerHTML = ''

        for (let value of arrFilmTitles) {

            sidebar.insertAdjacentHTML('beforeend', `
                  <li tabIndex="-1">${value}</li>
            `)
        }
    }

    showSelectedFilm(e) {

        if (e.target.tagName === 'LI') {

            postWrapper.innerHTML = ''

            const filmData = this.getDataToShowSelectedFilm(e)

            this.toggleActiveClasses(e.target, e.target.parentNode)


            postWrapper.insertAdjacentHTML('beforeend', `
                  <h3>${filmData.title}</h3>
                  <p>${filmData.overview}</p>
            `)
        }
    }

    getDataToShowSelectedFilm(e) {
        let filmData = {};

        if (e.target.tagName === 'LI') {

            mainDataForPost.movieCollection.results.forEach(item => {
                if (item.title === e.target.innerText) {
                    filmData = item
                }
            })
        }
        return filmData

    }

    toggleActiveClasses(targetElement, parentElement) {
        this.removeActiveClass(parentElement)
        this.addActiveClass(targetElement)
        this.toggleActiveClassesInOppositeSidebar(parentElement, targetElement)
    }

    toggleActiveClassesInOppositeSidebar (parentElement, targetElement) {

        let parentSideBar;

        if(parentElement.classList.contains('top-sidebar_selected-films')) {
            parentSideBar = asideSidebarSelectedFilms
        }else if(parentElement.classList.contains('aside-sidebar_selected-films')) {
            parentSideBar = topSidebarSelectedFilms
        }else if(parentElement.classList.contains('mediator-main-content_top-sidebar')) {
            parentSideBar = asideSidebar
        }else if(parentElement.classList.contains('mediator-main-content_aside-sidebar')) {
            parentSideBar = topSidebar
        }

        this.removeActiveClass(parentSideBar)

        for (let i = 0; i < parentSideBar.children.length; i++) {

            if(parentSideBar.children[i].innerText === targetElement.innerText) {
                this.addActiveClass(parentSideBar.children[i])
            }
        }

    }

    addActiveClass(targetElement) {
        targetElement.classList.add('active')
    }

    removeActiveClass(parentElement) {

        for(let i = 0; i < parentElement.children.length; i++){
            parentElement.children[i].classList.remove('active')
        }
    }
}

function deepClone(obj) {
    let clObj;

    switch (typeof obj) {
        case 'object':
            if (obj === null) {
                // null => null
                clObj = null;
            } else {
                switch (toString.call(obj)) {
                    case '[object Array]':
                        // It an array, create a new array with
                        // deep copies of the entries
                        clObj = obj.map(deepClone);
                        break;
                    case '[object Date]':
                        // Clone the date
                        clObj = new Date(obj);
                        break;
                    case '[object RegExp]':
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