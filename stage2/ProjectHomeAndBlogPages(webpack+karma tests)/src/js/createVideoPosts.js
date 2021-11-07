// import * as $ from 'jquery'

import VideoPost from './classVideoPost.js';
import {setAuthorsToDropdown, setInfoForSearchByGenre} from './searchByInput.js';
import {
    getBackdropImage,
    setReleaseDate,
    getReadingTime,
    setStarRating,
    getGenre
} from './blogPageScript.js';

function createVideoPosts(rootDiv, numberOfVideoPosts, mainDataForPost, searchable, searchData) {

    async function getInfo(numberOfFilm) {
        let response = await fetch(
       `https://api.themoviedb.org/3/movie/
          ${mainDataForPost.movieCollection.results[numberOfFilm].id}/videos?api_key=0f3abe6c40314201d6cfc0d3278edea8`);

        if (response.ok) {
            let responseVideoRequest = await response.json();
            return responseVideoRequest
        } else {
            console.log('Ошибка HTTP: ' + response.status);
        }
    }

    for (let numberOfFilm = 0; numberOfFilm < numberOfVideoPosts; numberOfFilm++) {

        getInfo(numberOfFilm).then(responseVideoRequest => {

            let videoList = responseVideoRequest.results

            let videoKey = videoList[0].key

            let backdrop = getBackdropImage(mainDataForPost, numberOfFilm)
            let releaseDate = setReleaseDate(mainDataForPost, numberOfFilm)
            let readingTime = getReadingTime(mainDataForPost, numberOfFilm)
            let starRating = setStarRating(mainDataForPost, numberOfFilm)
            let genre = getGenre(mainDataForPost, numberOfFilm, searchable)
            let filmId = mainDataForPost.movieCollection.results[numberOfFilm].id
            let linkToFilmPage = `https://www.themoviedb.org/movie/${filmId}`

            let videoPostData = new VideoPost(numberOfFilm, videoKey, backdrop, releaseDate, readingTime, starRating,
                genre, linkToFilmPage, mainDataForPost.movieCollection.results[numberOfFilm].id)

            setInfoForSearchByGenre(searchData, numberOfFilm, genre, backdrop, 'video', filmId)

            if (!searchable) {
                setAuthorsToDropdown(searchData)
            }

            videoPostInsertHtml(rootDiv, mainDataForPost.movieCollection.results, videoPostData)

            const readMoreButton = document.getElementById(`readMoreButton${videoPostData.filmId}`)

            videoPostData.addEventListenerToReadMoreButton(readMoreButton)

            const rootForChangeVideoPost = document.querySelector(`#rootForChangeVideoPost${videoPostData.filmId}`)
            const iconPlay = document.querySelector(`#iconOfPlay${videoPostData.filmId}`);

            iconPlay.addEventListener('click', () => {
                    rootForChangeVideoPost.innerHTML = `     
                       <div class="video-wrapper">
                           <div class="icon-play-wrapper">
                                   <iframe width="560" height="379"
                                      src="https://www.youtube.com/embed/${videoPostData.videoKey}"
                                      title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay;
                                      clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                                    </iframe>
                             </div>
                         </div>`
                }
            )

            videoPostData.addEventListenerToIcon(iconPlay)

            const popUpMessageConfig = {
                backgroundColor: 'dark',
                callFromButton: true
            }

            $(`#deletePostButton_${videoPostData.filmId}`).on('click', () => {
                $(this).showPopup(popUpMessageConfig, videoPostData.filmId)
            })

        })
    }

    function videoPostInsertHtml (rootDiv, listOfFilms, videoPostData) {

        rootDiv.insertAdjacentHTML('beforeend', `
           <div class="blog-section_blog-post_video">
                 <div id="rootForChangeVideoPost${videoPostData.filmId}">
                    <div class="img-wrapper">
                        <img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${
                            listOfFilms[videoPostData.numberOfFilm].poster_path}" alt="image of poster">
                        <img id="iconOfPlay${videoPostData.filmId}" class="icon-play" src="${videoPostData.iconOfPlay}" 
                        alt="icon of play">            
                    </div>
                 </div>
                 <div class="blog-post-main-content">
                    <div class="blog-post-main-content_header">
                        <img src="${videoPostData.backdrop}" alt="image of user">
                        <div>
                            <span class="blog-post-main-content_user-name">${videoPostData.genre.join(', ')}
                            </span>
                            <p class="card-text">
                                <small class="text-muted">
                                    <span>${videoPostData.releaseDate}</span>
                                    <span class="point">&#8226;</span>
                                    <span>${videoPostData.readingTime} min read</span>
                                    <span class="point">&#8226;</span>
                                    <img src="${videoPostData.iconOfComments}" alt="image of comments">
                                    <span>${listOfFilms[videoPostData.numberOfFilm].vote_count}</span>
                                    <img src="${videoPostData.starRating[0]}" alt="image of star">
                                    <img src="${videoPostData.starRating[1]}" alt="image of star">
                                    <img src="${videoPostData.starRating[2]}" alt="image of star">
                                    <img src="${videoPostData.starRating[3]}" alt="image of star">
                                    <img src="${videoPostData.starRating[4]}" alt="image of star">
                                </small>
                            </p>
                        </div>
                    </div>
                    <p class="blog-post-main-content_title"> ${listOfFilms[videoPostData.numberOfFilm].title} </p>
                    <p class="blog-post-main-content_text"> ${listOfFilms[videoPostData.numberOfFilm].overview}</p>
                    <div class="button-wrapper">
                        <button id="readMoreButton${videoPostData.filmId}" 
                            class="btn blog-post-main-content_read-more-button">
                             Read more
                        </button>
                        <button id="deletePostButton_${videoPostData.filmId}" 
                            class="btn blog-post-main-content_delete-button">
                            Delete
                        </button>
                    </div>
                    <div class="blog-post_corner-icon">
                        <img class="blog-post-main-content_content-icon" src="${videoPostData.iconOfPlaymini}" 
                             alt="image of play">
                    </div>      
                 </div>        
           </div>    
        `)
    }
}

export {createVideoPosts}