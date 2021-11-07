import Post from './classPost.js'
import iconOfPlaymini from '../img/a-icon-playmini.svg'
import iconOfPlay from '../img/a-icon-play.svg'

export default class VideoPost extends Post {

    constructor(numberOfFilm, videoKey, backdrop, releaseDate,
                readingTime, starRating, genre, linkToFilmPage, filmId) {

        super(numberOfFilm, backdrop, releaseDate,
            readingTime, starRating, genre, linkToFilmPage, filmId);

        this.videoKey = videoKey;
        this.iconOfPlaymini = iconOfPlaymini
        this.iconOfPlay = iconOfPlay
    }

    addEventListenerToIcon (icon) {
        icon.addEventListener('click', () => {
            console.log(`Click to video: ${this.videoKey}`)
        })
    }
}