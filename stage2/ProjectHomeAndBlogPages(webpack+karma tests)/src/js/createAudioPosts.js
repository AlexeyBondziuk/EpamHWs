import AudioPost from './classAudioPost.js';
import {setAuthorsToDropdown, setInfoForSearchByGenre} from './searchByInput.js';
import {
    getBackdropImage,
    setReleaseDate,
    getReadingTime,
    setStarRating,
    getGenre
} from './blogPageScript.js';


function createAudioPosts(rootDiv, numberOfAudioPosts, numberOfVideoPosts, mainDataForPost, searchable, searchData) {

    for (let i = 0; i < numberOfAudioPosts; i++) {
        let numberOfFilm = i + numberOfVideoPosts

        let backdrop = getBackdropImage(mainDataForPost, numberOfFilm)
        let releaseDate = setReleaseDate(mainDataForPost, numberOfFilm)
        let readingTime = getReadingTime(mainDataForPost, numberOfFilm)
        let starRating = setStarRating(mainDataForPost, numberOfFilm)
        let genre = getGenre(mainDataForPost, numberOfFilm, searchable)
        let filmId = mainDataForPost.movieCollection.results[numberOfFilm].id
        let linkToFilmPage = `https://www.themoviedb.org/movie/${filmId}`

        let audioPostData = new AudioPost(numberOfFilm,
            backdrop, releaseDate, readingTime, starRating, genre, linkToFilmPage,
            mainDataForPost.movieCollection.results[numberOfFilm].id)

        setInfoForSearchByGenre(searchData, numberOfFilm, genre, backdrop, 'audio', filmId)

        if (!searchable) {
            setAuthorsToDropdown(searchData)
        }

        audioPostInsertHtml(rootDiv, mainDataForPost.movieCollection.results, audioPostData)

        const readMoreButton = document.getElementById(`readMoreButton${audioPostData.filmId}`)

        audioPostData.addEventListenerToReadMoreButton(readMoreButton)

        const audioIcon = document.querySelector(`#audioPlayer${audioPostData.filmId}`)

        audioPostData.addEventListenerToPlayIcon(audioIcon)

        const popUpMessageConfig = {
            backgroundColor: 'dark',
            callFromButton: true
        }

        $(`#deletePostButton_${audioPostData.filmId}`).on('click', () => {
            $(this).showPopup(popUpMessageConfig, audioPostData.filmId)
        })

    }

    function audioPostInsertHtml (rootDiv, listOfFilms, audioPostData ) {

        rootDiv.insertAdjacentHTML('beforeend', `
            <div class="blog-section_blog-post_audio">
                <div class="img-wrapper">
                    <img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${
                        listOfFilms[audioPostData.numberOfFilm].poster_path}" alt="image of poster">
                </div>
                <div class="blog-post-main-content">
                    <div class="blog-post-main-content_header">
                        <img src="${audioPostData.backdrop}" alt="image of backdrop">
                        <div>
                            <span class="blog-post-main-content_user-name">${audioPostData.genre.join(', ')}
                            </span>
                            <p class="card-text">
                                <small class="text-muted">
                                    <span>${audioPostData.releaseDate}</span>
                                    <span class="point">&#8226;</span>
                                    <span>${audioPostData.readingTime} min read</span>
                                    <span class="point">&#8226;</span>
                                    <img src="${audioPostData.iconOfComments}" alt="image of comments">
                                    <span>${listOfFilms[audioPostData.numberOfFilm].vote_count}</span>
                                    <img src="${audioPostData.starRating[0]}" alt="image of star">
                                    <img src="${audioPostData.starRating[1]}" alt="image of star">
                                    <img src="${audioPostData.starRating[2]}" alt="image of star">
                                    <img src="${audioPostData.starRating[3]}" alt="image of star">
                                    <img src="${audioPostData.starRating[4]}" alt="image of star">
                                </small>
                            </p>
                        </div>
                    </div>
                    <p class="blog-post-main-content_title"> ${listOfFilms[audioPostData.numberOfFilm].title} </p>
                    <audio controls id = 'audioPlayer${audioPostData.filmId}'> 
                        <source src="${audioPostData.defaultAudioFile}" type="audio/ogg">
                         Your browser does not support the <code>audio</code> element.
                    </audio>
                    <p class="blog-post-main-content_text"> ${listOfFilms[audioPostData.numberOfFilm].overview}</p>
                    <div class="button-wrapper">
                        <button id="readMoreButton${audioPostData.filmId}" 
                            class="btn blog-post-main-content_read-more-button">
                             Read more
                        </button>
                        <button id="deletePostButton_${audioPostData.filmId}" 
                            class="btn blog-post-main-content_delete-button">
                            Delete
                        </button>
                    </div>
                    <div class="blog-post_corner-icon">
                        <img class="blog-post-main-content_content-icon" 
                                  src="${audioPostData.iconOfMelody}" alt="image of melody">
                    </div>
                </div>
            </div>
        `)
    }
}

export {createAudioPosts}