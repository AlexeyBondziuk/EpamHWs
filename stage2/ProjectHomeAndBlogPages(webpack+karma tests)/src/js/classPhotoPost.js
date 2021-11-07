import Post from './classPost.js'
import iconOfPicture from "../img/a-icon-picture.svg";

export default class PhotoPost extends Post {
    constructor(numberOfFilm, backdrop, releaseDate,
                readingTime, starRating, genre, linkToFilmPage, filmId) {

        super(numberOfFilm, backdrop, releaseDate,
            readingTime, starRating, genre, linkToFilmPage, filmId);


        this.iconOfPicture = iconOfPicture
    }
}