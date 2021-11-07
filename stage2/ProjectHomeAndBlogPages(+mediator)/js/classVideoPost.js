import Post from './classPost.js'

export default class VideoPost extends Post {

    constructor(numberOfFilm, videoKey, backdrop, releaseDate,
                readingTime, starRating, genre, linkToFilmPage, filmId) {

        super(numberOfFilm, backdrop, releaseDate,
            readingTime, starRating, genre, linkToFilmPage, filmId);

        this.videoKey = videoKey;
    }

    clickToPlayIcon() {
        console.log(`Click to video: ${this.videoKey}`)
    }
}