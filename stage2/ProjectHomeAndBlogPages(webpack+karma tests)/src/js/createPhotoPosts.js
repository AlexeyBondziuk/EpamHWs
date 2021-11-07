import PhotoPost from './classPhotoPost.js';
import {setAuthorsToDropdown, setInfoForSearchByGenre} from './searchByInput.js';
import {
    getBackdropImage,
    setReleaseDate,
    getReadingTime,
    setStarRating,
    getGenre
} from './blogPageScript.js';

function createPhotoPosts(rootDiv, numberOfPhotoPosts, numberOfAudioPosts, numberOfVideoPosts,
                          mainDataForPost, searchable, searchData){

    for (let i = 0; i < numberOfPhotoPosts; i++) {
        let numberOfFilm = i + numberOfVideoPosts + numberOfAudioPosts

        let backdrop = getBackdropImage(mainDataForPost, numberOfFilm)
        let releaseDate = setReleaseDate(mainDataForPost, numberOfFilm)
        let readingTime = getReadingTime(mainDataForPost, numberOfFilm)
        let starRating = setStarRating(mainDataForPost, numberOfFilm)
        let genre = getGenre(mainDataForPost, numberOfFilm, searchable)
        let filmId = mainDataForPost.movieCollection.results[numberOfFilm].id
        let linkToFilmPage = `https://www.themoviedb.org/movie/${filmId}`

        let photoPostData = new PhotoPost(numberOfFilm, backdrop, releaseDate, readingTime, starRating, genre,
            linkToFilmPage, mainDataForPost.movieCollection.results[numberOfFilm].id)

        setInfoForSearchByGenre(searchData, numberOfFilm, genre, backdrop, 'photo', filmId)

        if (!searchable) {
            setAuthorsToDropdown(searchData)
        }

        photoPostInsertHtml(rootDiv, mainDataForPost.movieCollection.results, photoPostData)

        const readMoreButton = document.getElementById(`readMoreButton${photoPostData.filmId}`)

        photoPostData.addEventListenerToReadMoreButton(readMoreButton)

        const popUpMessageConfig = {
            backgroundColor: 'dark',
            callFromButton: true
        }

        $(`#deletePostButton_${photoPostData.filmId}`).on('click', () => {
            $(this).showPopup(popUpMessageConfig, photoPostData.filmId)
        })
    }

    function photoPostInsertHtml (rootDiv, listOfFilms, photoPostData) {

        rootDiv.insertAdjacentHTML('beforeend', `
            <div class="blog-section_blog-post_foto">
                <div class="img-wrapper">
                    <img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${
                        listOfFilms[photoPostData.numberOfFilm].poster_path}" alt="image of table">
                </div>
                <div class="blog-post-main-content">
                    <div class="blog-post-main-content_header">
                        <img src="${photoPostData.backdrop}" alt="image of backdrop">
                        <div>
                            <span class="blog-post-main-content_user-name">${photoPostData.genre.join(', ')}
                            </span>
                            <p class="card-text">
                                <small class="text-muted">
                                    <span>${photoPostData.releaseDate}</span>
                                    <span class="point">&#8226;</span>
                                    <span>${photoPostData.readingTime} min read</span>        
                                    <span class="point">&#8226;</span>        
                                    <img src="${photoPostData.iconOfComments}" alt="image of comments">
                                    <span>${photoPostData.vote_count}</span>
                                    <img src="${photoPostData.starRating[0]}" alt="image of star">
                                    <img src="${photoPostData.starRating[1]}" alt="image of star">
                                    <img src="${photoPostData.starRating[2]}" alt="image of star">
                                    <img src="${photoPostData.starRating[3]}" alt="image of star">
                                    <img src="${photoPostData.starRating[4]}" alt="image of star">                
                                </small>
                            </p>
                        </div>
                    </div>
                    <p class="blog-post-main-content_title"> ${listOfFilms[photoPostData.numberOfFilm].title} </p>
                    <p class="blog-post-main-content_text"> ${listOfFilms[photoPostData.numberOfFilm].overview}</p>
                    <div class="button-wrapper">
                        <button id="readMoreButton${photoPostData.filmId}" 
                            class="btn blog-post-main-content_read-more-button">
                             Read more
                        </button>
                        <button id="deletePostButton_${photoPostData.filmId}" 
                            class="btn blog-post-main-content_delete-button">
                            Delete
                        </button>
                    </div>
                    <div class="blog-post_corner-icon">
                        <img class="blog-post-main-content_content-icon" src="${photoPostData.iconOfPicture}" 
                            alt="image of melody">
                    </div>
                </div>
            </div>
        `)
    }
}

export {createPhotoPosts}