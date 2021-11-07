export default class Post {

    constructor(numberOfFilm, backdrop, releaseDate,
                readingTime, starRating, genre, linkToFilmPage, filmId) {

        this.numberOfFilm = numberOfFilm;
        // this.listOfFilms = listOfFilms;
        this.filmId = filmId

        this.backdrop = backdrop;
        this.releaseDate = releaseDate;
        this.readingTime = readingTime;
        this.starRating = starRating;
        this.genre= genre
        this.linkToFilmPage = linkToFilmPage;

    }
    goToFilmPage() {
        document.location = this.linkToFilmPage
    }

}


