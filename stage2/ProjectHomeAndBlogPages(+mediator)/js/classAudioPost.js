import Post from './classPost.js'

export default class AudioPost extends Post {
    #permissionToShowMessage = true;

    clickToPlayIcon() {
        if(this.#permissionToShowMessage) console.log(`Click to audio player. Audio file is hidden)`)
    }
}

