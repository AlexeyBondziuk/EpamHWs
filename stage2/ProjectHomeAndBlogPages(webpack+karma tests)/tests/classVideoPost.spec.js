import VideoPost from '../src/js/classVideoPost.js';

describe("classVideoPost.js", function () {

    beforeEach(() => {
        window.videoPost = new VideoPost()
    })

    it('should be unique videoPost', () => {
        const postSecond = new VideoPost()
        expect(window.videoPost).toEqual(postSecond)
        expect(window.videoPost).not.toBe(postSecond)
    })

    describe("icon of play", function () {
        let icon;

        it('addEventListenerToIcon() should be defined', function () {
            expect(window.videoPost.addEventListenerToIcon).toBeDefined()
        });

        it('addEventListenerToIcon() should be called', function () {
            window.videoPost = new VideoPost()

            const clickToPlayIconSpy = spyOn(window.videoPost, 'addEventListenerToIcon')

            icon = document.createElement('img')
            document.body.appendChild(icon)

            window.videoPost.addEventListenerToIcon (icon)

            icon.click()
            expect(clickToPlayIconSpy).toHaveBeenCalled()

        });

        it('console.log() should be called', function () {
            window.videoPost = new VideoPost()

            const consoleLogIconSpy = spyOn(window.console, 'log')

            icon = document.createElement('img')
            document.body.appendChild(icon)

            window.videoPost.addEventListenerToIcon (icon)

            icon.click()
            expect(consoleLogIconSpy).toHaveBeenCalled()

        });


        afterEach(() => {
            if(icon) icon.remove()
        })
    })

});