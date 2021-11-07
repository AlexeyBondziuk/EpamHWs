import Post from './classPost.js'
import iconOfText from "../img/a-icon-text.svg";

export default class TextPost extends Post {
    constructor(numberOfFilm, backdrop, releaseDate,
                readingTime, starRating, genre, linkToFilmPage, filmId) {

        super(numberOfFilm, backdrop, releaseDate,
            readingTime, starRating, genre, linkToFilmPage, filmId);


        this.iconOfText = iconOfText
    }
}