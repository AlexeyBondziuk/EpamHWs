import Post from './classPost.js'
import defaultAudioFile from '../img/audio.ogg'
import iconOfMelody from '../img/a-icon-melody.svg'

export default class AudioPost extends Post {

    constructor(numberOfFilm, backdrop, releaseDate,
                readingTime, starRating, genre, linkToFilmPage, filmId) {

        super(numberOfFilm, backdrop, releaseDate,
            readingTime, starRating, genre, linkToFilmPage, filmId);

        this.defaultAudioFile = defaultAudioFile;
        this.iconOfMelody = iconOfMelody
    }

    addEventListenerToPlayIcon(icon) {
        icon.addEventListener('play', () => {
            console.log(`Click to audio player. Audio file is hidden)`)
        })
    }
}

