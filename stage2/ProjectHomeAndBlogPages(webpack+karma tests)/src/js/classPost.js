import iconOfComments from "../img/a-icon-comment.svg";

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
        this.iconOfComments = iconOfComments

    }
    addEventListenerToReadMoreButton (button) {
        button.addEventListener('click', () => {
            document.location = this.linkToFilmPage
        })
    }

}


