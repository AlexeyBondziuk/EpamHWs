import Post from '../src/js/classPost.js';

describe("classPost.js", function () {
    let post;

    beforeEach(() => {
        post = new Post()
    })

    it('should be unique Post', () => {
        const postSecond = new Post()
        expect(post).toEqual(postSecond)
        expect(post).not.toBe(postSecond)
    })

    it('addEventListenerToReadMoreButton() should be defined', function () {
        expect(post.addEventListenerToReadMoreButton).toBeDefined()
    });

    describe("read more button", function () {
        let button;

        it('addEventListenerToReadMoreButton() should be defined', function () {
            expect(post.addEventListenerToReadMoreButton).toBeDefined()
        });

        it('addEventListenerToReadMoreButton() should be called', function () {
            window.post = post

            const clickToReadMoreButtonSpy = spyOn(window.post, 'addEventListenerToReadMoreButton')

            button = document.createElement('button')
            document.body.appendChild(button)

            window.post.addEventListenerToReadMoreButton(button)

            button.click()
            expect(clickToReadMoreButtonSpy).toHaveBeenCalled()

        });

        it('document.location should be changed', function () {
            window.post = post
            window.post.linkToFilmPage = '#someLinkToFilmPage'

            button = document.createElement('button')
            document.body.appendChild(button)

            window.post.addEventListenerToReadMoreButton(button)

            button.click()

            expect(document.location).toMatch(window.post.linkToFilmPage)


        });

        afterEach(() => {
            if(button) button.remove()
        })
    })



});