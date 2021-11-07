import TextPost from './classTextPost.js';
import {setAuthorsToDropdown, setInfoForSearchByGenre} from './searchByInput.js';
import {
    getBackdropImage,
    setReleaseDate,
    getReadingTime,
    setStarRating,
    getGenre
} from './blogPageScript.js';

function createTextPosts(rootDiv, numberOfTextPosts, numberOfPhotoPosts, numberOfAudioPosts, numberOfVideoPosts,
                         mainDataForPost, searchable, searchData) {

    for (let i = 0; i < numberOfTextPosts; i++) {
        let numberOfFilm = i + numberOfVideoPosts + numberOfAudioPosts + numberOfPhotoPosts

        let backdrop = getBackdropImage(mainDataForPost, numberOfFilm)
        let releaseDate = setReleaseDate(mainDataForPost, numberOfFilm)
        let readingTime = getReadingTime(mainDataForPost, numberOfFilm)
        let starRating = setStarRating(mainDataForPost, numberOfFilm)
        let genre = getGenre(mainDataForPost, numberOfFilm, searchable)
        let filmId = mainDataForPost.movieCollection.results[numberOfFilm].id
        let linkToFilmPage = `https://www.themoviedb.org/movie/${filmId}`

        let textPostData = new TextPost(numberOfFilm, backdrop, releaseDate, readingTime, starRating, genre,
            linkToFilmPage, mainDataForPost.movieCollection.results[numberOfFilm].id)

        setInfoForSearchByGenre(searchData, numberOfFilm, genre, backdrop, 'text', filmId)

        if (!searchable) {
            setAuthorsToDropdown(searchData)
        }

        textPostInsertHtml(rootDiv, mainDataForPost.movieCollection.results, textPostData)

        const readMoreButton = document.getElementById(`readMoreButton${textPostData.filmId}`)

        textPostData.addEventListenerToReadMoreButton(readMoreButton)

        const popUpMessageConfig = {
            backgroundColor: 'dark',
            callFromButton: true
        }

        $(`#deletePostButton_${textPostData.filmId}`).on('click', () => {
            $(this).showPopup(popUpMessageConfig, textPostData.filmId)
        })
    }

    function textPostInsertHtml (rootDiv, listOfFilms, textPostData) {

        rootDiv.insertAdjacentHTML('beforeend', ` 
            <div class="blog-section_blog-post_text">
                <div class="blog-post-main-content">
                    <div class="blog-post-main-content_header">
                        <img src="${textPostData.backdrop}" alt="image of backdrop">
                        <div>
                            <span class="blog-post-main-content_user-name">${
                                textPostData.genre.join(', ')}
                            </span>
                            <p class="card-text">
                                <small class="text-muted">
                                    <span>${textPostData.releaseDate}</span>
                                    <span class="point">&#8226;</span>
                                    <span>${textPostData.readingTime} min read</span>
                                    <span class="point">&#8226;</span>
                                    <img src="${textPostData.iconOfComments}" alt="image of comments">
                                    <span>${listOfFilms[textPostData.numberOfFilm].vote_count}</span>
                                    <img src="${textPostData.starRating[0]}" alt="image of star">
                                    <img src="${textPostData.starRating[1]}" alt="image of star">
                                    <img src="${textPostData.starRating[2]}" alt="image of star">
                                    <img src="${textPostData.starRating[3]}" alt="image of star">
                                    <img src="${textPostData.starRating[4]}" alt="image of star">
                                </small>
                            </p>
                        </div>
                    </div>
                    <p class="blog-post-main-content_title"> ${listOfFilms[textPostData.numberOfFilm].title}</p>
                    <p class="blog-post-main-content_text"> ${listOfFilms[textPostData.numberOfFilm].overview}</p>
                    <div class="button-wrapper">
                        <button id="readMoreButton${textPostData.filmId}" 
                            class="btn blog-post-main-content_read-more-button">
                             Read more
                        </button>
                        <button id="deletePostButton_${textPostData.filmId}" 
                            class="btn blog-post-main-content_delete-button">
                            Delete
                        </button>
                    </div>
                    <div class="blog-post_corner-icon">
                        <img class="blog-post-main-content_content-icon" src="${textPostData.iconOfText}" 
                                alt="image of melody">
                    </div>
                </div>
            </div>
        `)
    }
}

export {createTextPosts}