import PhotoPost from '../src/js/classVideoPost.js';

describe("classPhotoPost.js", function () {

    beforeEach(() => {
        window.photoPost = new PhotoPost()
    })

    it('should be unique photoPost', () => {
        const postSecond = new PhotoPost()
        expect(window.photoPost ).toEqual(postSecond)
        expect(window.photoPost ).not.toBe(postSecond)
    })
});