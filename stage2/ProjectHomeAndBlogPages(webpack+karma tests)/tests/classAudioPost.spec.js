import AudioPost from '../src/js/classAudioPost.js';

describe("classAudioPost.js", function () {

    beforeEach(() => {
        window.audioPost = new AudioPost()
    })

    it('should be unique audioPost', () => {
        const postSecond = new AudioPost()
        expect(window.audioPost).toEqual(postSecond)
        expect(window.audioPost).not.toBe(postSecond)
    })

    describe("icon of play", function () {
        let icon;

        it('addEventListenerToPlayIcon() should be defined', function () {
            expect(window.audioPost.addEventListenerToPlayIcon).toBeDefined()
        });

        it('addEventListenerToPlayIcon() should be called', function () {

            const addEventListenerToPlayIconSpy = spyOn(window.audioPost, 'addEventListenerToPlayIcon')

            icon = document.createElement('audio')
            document.body.appendChild(icon)

            window.audioPost.addEventListenerToPlayIcon(icon)

            icon.click()
            expect(addEventListenerToPlayIconSpy).toHaveBeenCalled()

        });

        it('console.log() should be called', function () {

            const consoleLogIconSpy = spyOn(window.console, 'log')

            icon = document.createElement('audio')
            document.body.appendChild(icon)

            window.audioPost.addEventListenerToPlayIcon(icon)

            const myPlayEvent = new CustomEvent('play');

            icon.dispatchEvent(myPlayEvent)
            expect(consoleLogIconSpy).toHaveBeenCalled()

        });

        afterEach(() => {
            if(icon) icon.remove()
        })
    })

});