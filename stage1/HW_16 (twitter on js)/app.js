const root = document.getElementById('root');

const modifyItem = document.querySelector('#modifyItem');
const tweetItems = document.querySelector('#tweetItems');

const modifyItemHeader = document.querySelector('#modifyItemHeader');
const modifyItemInput = document.querySelector('#modifyItemInput')
const list = document.querySelector('#list');

const alertMessage = document.querySelector('#alertMessage');
const alertMessageText = document.querySelector('#alertMessageText');

const addTweetButton = document.querySelector('#navigationButtons > .addTweet');
const cancelModificationButton = document.querySelector('#cancelModification');
const saveModifiedItemButton = document.querySelector('#saveModifiedItem');
const navigationButtons = document.querySelector('#navigationButtons');
const formButtons = document.querySelector('.formButtons');
const goToLikedButton = document.createElement('button');
const backButton = document.createElement('button');



const defaultHref = window.location.href.split('#')[0];
const addTweetHref = defaultHref + '#/add';
const likedTwitsHref = defaultHref + '#/liked';
const editTweetHash= '#/edit';

const TIMEALERT = 2000;
const MAXTWEETLENGTH = 140;
const tweetIdPosInUrl = 7;

let count = 0;

function Tweet(id, tweetText, liked) {
    this.id = id;
    this.tweetText = tweetText;
    this.liked = liked;
}

function load() {
    createGoToLikedButton()
    count = 0;
    for(let key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) {
            continue;
        }
        count = Math.max(count, +key)
    }

    if (window.location.href === defaultHref || window.location.href === defaultHref + '#') {
        simpleTwitterPage()
    }else if(window.location.href === addTweetHref) {
        addTweetPage()
    }else if(window.location.href.indexOf(`${editTweetHash}`) > 0) {
        editTweetPage()
    }else if(window.location.href === likedTwitsHref) {
        likedTweetsPage()
    }

}
load()

addTweetButton.addEventListener('click', () => {
    window.location.hash = '#/add';
})

cancelModificationButton.addEventListener('click', () => {
    window.location.hash = '';
 })

saveModifiedItemButton.addEventListener('click', () => {
    if(window.location.href === addTweetHref) {
        if (addTweet()) {
            window.location.hash = ''
        }
    }else if(window.location.href.indexOf(`${editTweetHash}`) > 0) {
        if ( editTweet()) {
            window.location.hash = '';
        }
    }
})

goToLikedButton.addEventListener('click', () => {
    window.location.hash = '#/liked';
    list.innerHTML = '';
})

window.addEventListener('hashchange', () => {
    load()
});

function simpleTwitterPage() {
    if (tweetItems.classList.contains('hidden')) {
        tweetItems.classList.remove('hidden');
    }
    if (!modifyItem.classList.contains('hidden')) {
        modifyItem.classList.add('hidden');
    }
    if (list.classList.contains('hidden')) {
        list.classList.remove('hidden');
    }

    list.innerHTML = '';
    addListOfTweets()
}

function addTweetPage() {
    if (!tweetItems.classList.contains('hidden')) {
        tweetItems.classList.add('hidden');
    }
    if (modifyItem.classList.contains('hidden')) {
        modifyItem.classList.remove('hidden');
    }
    if (modifyItemInput.classList.contains('hidden')) {
        modifyItemInput.classList.remove('hidden');
    }
    if (formButtons.classList.contains('hidden')) {
        formButtons.classList.remove('hidden');
    }

    backButton.remove()

    modifyItemHeader.textContent = 'Add tweet';
    modifyItemInput.value = ''
}

function editTweetPage() {
    if (!tweetItems.classList.contains('hidden')) {
        tweetItems.classList.add('hidden');
    }
    if (modifyItem.classList.contains('hidden')) {
        modifyItem.classList.remove('hidden');
    }
    if (modifyItemInput.classList.contains('hidden')) {
        modifyItemInput.classList.remove('hidden');
    }
    if (formButtons.classList.contains('hidden')) {
        formButtons.classList.remove('hidden');
    }

    modifyItemHeader.textContent = 'Edit tweet';

    backButton.remove()
    list.innerHTML = '';

    let hash = window.location.hash
    let key = hash.substring(tweetIdPosInUrl)
    let twit = JSON.parse(localStorage.getItem(`${key}`));
    modifyItemInput.value = `${twit.tweetText}`

}

function likedTweetsPage() {
    if (!tweetItems.classList.contains('hidden')) {
        tweetItems.classList.add('hidden');
    }
    if (modifyItem.classList.contains('hidden')) {
        modifyItem.classList.remove('hidden');
    }
    if (!modifyItemInput.classList.contains('hidden')) {
        modifyItemInput.classList.add('hidden');
    }
    if (!formButtons.classList.contains('hidden')) {
        formButtons.classList.add('hidden');
    }

    modifyItemHeader.textContent = 'Liked Tweets';

    list.innerHTML = '';
    addListOfTweets(true)
    modifyItem.append(list)
    createBackButton()
}

function addTweet() {
    if (checkSameTweets(modifyItemInput.value)
        && checkLengthTweets(modifyItemInput.value)
        && checkEmptyTweets(modifyItemInput.value)) {

        let id = ++count;
        let tweetText = modifyItemInput.value
        let tweet = new Tweet(id, tweetText, false);
        let json = JSON.stringify(tweet)
        localStorage.setItem(tweet.id, json);
        return true
    }else {
        showMessage('Error! You can tweet about that')
        return false
    }
}

function editTweet() {
    if (checkSameTweets(modifyItemInput.value)
        && checkLengthTweets(modifyItemInput.value)
        && checkEmptyTweets(modifyItemInput.value)) {

        let hash = window.location.hash
        let key = hash.substring(tweetIdPosInUrl)
        let twit = JSON.parse(localStorage.getItem(`${key}`));
        let liked = twit.liked

        let tweetText = modifyItemInput.value
        let tweet = new Tweet(key, tweetText, liked);
        let json = JSON.stringify(tweet)
        localStorage.setItem(key, json);

        return true
    }else {
        showMessage('Error! You can tweet about that')
        return false
    }
}

function checkSameTweets(newTweetText) {
    for(let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let tweet = JSON.parse(localStorage.getItem(key));
        let tweetText = tweet.tweetText
        if (tweetText === newTweetText) {
            return false
        }
    }
    return true
}

function checkLengthTweets(newTweetText) {
    return newTweetText.length <= MAXTWEETLENGTH;

}

function checkEmptyTweets(newTweetText) {
    return newTweetText !== '';
}

function showMessage(message) {
    alertMessageText.textContent = message;
    alertMessage.append(alertMessageText);
    alertMessage.classList.toggle('hidden')
    setTimeout(() => {
        alertMessage.classList.toggle('hidden')
    }, TIMEALERT)
}

function addListOfTweets(liked) {
    for(let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let tweet = JSON.parse(localStorage.getItem(key));
        if (tweet.liked === liked || arguments.length === 0) {
            const li = document.createElement('li');
            const span = document.createElement('span');
            const buttonWrapper = document.createElement('div');
            buttonWrapper.classList.add('buttonWrapper');

            let tweetText = tweet.tweetText

            span.innerHTML = `${tweetText}`;

            span.onclick = () => {
                window.location.hash = `${'#/edit:' + tweet.id}`;
            }

            list.append(li)
            li.append(span)
            buttonWrapper.append(createRemoveButton(key))
            buttonWrapper.append(createLikeButton(key, tweet))
            li.append(buttonWrapper)
        }
    }
    tweetItems.append(list)
}

function createRemoveButton(key) {
    let removeButton = document.createElement('button');
    removeButton.innerHTML = 'remove';
    removeButton.value = `${key}`
    removeButton.onclick = () => {
        removeButton.closest('li').remove();
        localStorage.removeItem(`${removeButton.value}`)
    }
    return removeButton
}

function createLikeButton(key, tweet) {
    let likeButton = document.createElement('button');
    likeButton.innerHTML = tweet.liked ? 'unlike': 'like';
    likeButton.value = `${key}`
    likeButton.onclick = () => {

        tweet.liked = !tweet.liked;

        let json = JSON.stringify(tweet);
        localStorage.setItem(`${likeButton.value}`, json)
        likeButton.textContent === 'like' ? likeButton.textContent = 'unlike' : likeButton.textContent = 'like';

        createGoToLikedButton();
        if (tweet.liked) {
            showMessage(`Hooray! You liked tweet with id ${key}!`)
        } else if (!tweet.liked) {
            showMessage(`Sorry you no longer like tweet with id ${key}`);
            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                let tweet = JSON.parse(localStorage.getItem(key));
                if (tweet.liked) {
                    break
                } else if (i === localStorage.length - 1 && !tweet.liked) {
                    goToLikedButton.remove()
                }
            }
        }
    }
    return likeButton
}

function createGoToLikedButton() {
    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        let tweet = JSON.parse(localStorage.getItem(key));
        if (tweet.liked) {
            goToLikedButton.innerHTML ='Go to liked';
            navigationButtons.append(goToLikedButton)
        }
    }
}

function createBackButton() {
    backButton.innerHTML ='back';
    formButtons.after(backButton)
    backButton.onclick = () => {
        window.location.hash = '';
    }
}