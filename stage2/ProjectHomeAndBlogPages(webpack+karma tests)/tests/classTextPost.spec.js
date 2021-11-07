import TextPost from '../src/js/classTextPost.js';

describe("classTextPost.js", function () {

    beforeEach(() => {
        window.textpost = new TextPost()
    })

    it('should be unique photoPost', () => {
        const postSecond = new TextPost()
        expect(window.textpost ).toEqual(postSecond)
        expect(window.textpost ).not.toBe(postSecond)
    })
});