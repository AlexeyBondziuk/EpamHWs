import SelfSwitchingSlider from '../src/js/sliders/SelfSwitchingSlider.js';

describe("SelfSwitchingSlider.js", function () {

    const wrapper = document.createElement('div')

    let prev,
        next,
        sliderItems,
        slideSize,
        slider;

    function listener(dir) {
        slider.shiftSlide(dir)
    }

    function createSlides(numberOfSlides, parentNode) {
        for (let i = 0; i < numberOfSlides; i++) {
            let el = document.createElement('div')
            el.classList.add('testimonial-slide')
            parentNode.appendChild(el)
        }

        return parentNode
    }

    beforeEach(() => {

        prev = document.createElement('div'),
            next = document.createElement('div'),
            sliderItems = document.createElement('div'),
            slideSize = 100;

        document.body.appendChild(wrapper)
        wrapper.appendChild(prev)
        wrapper.appendChild(sliderItems)
        wrapper.appendChild(next)

        createSlides(3, sliderItems)

        const slides = sliderItems.getElementsByClassName('testimonial-slide')

        slider = new SelfSwitchingSlider(wrapper, sliderItems, prev, next, slides, slideSize)

    })

    describe('shiftSlide()', function () {

        it('shiftSlide() should add class shifting', () => {
            prev.addEventListener('click', listener(-1));

            prev.click()

            expect(sliderItems).toHaveClass('shifting')

            sliderItems.classList.remove('shifting')
        });

        it('shiftSlide() should move slide to left', () => {
            prev.addEventListener('click', listener (-1));

            prev.click()

            expect(sliderItems.style.left).toBe('108px')
        });

        it('shiftSlide() should move slide to right', () => {
            next.addEventListener('click', listener (1));

            next.click()

            expect(sliderItems.style.left).toBe('-92px')
        });

        it('shiftSlide() should not move slide with wrong parameter', () => {
            prev.addEventListener('click', listener (false));

            prev.click()

            expect(sliderItems.style.left).toBe('')

        })
    })

    describe('checkIndex ()', function () {

        const myCustomTransitionend = new CustomEvent('transitionend');

        it('checkIndex() should remove class shifting', () => {

            sliderItems.classList.add('shifting')

            sliderItems.addEventListener('transitionend', slider.checkIndex);

            sliderItems.dispatchEvent(myCustomTransitionend)

            expect(sliderItems).not.toHaveClass('shifting')
        });

        it('checkIndex() return to the left end point', () => {
            prev.addEventListener('click', listener (-1));

            sliderItems.addEventListener('transitionend', slider.checkIndex);

            sliderItems.dispatchEvent(myCustomTransitionend)

            prev.click()

            expect(sliderItems.style.left).toBe('-300px')
        });

        it('checkIndex() return to the right end point', () => {

            sliderItems = document.createElement('div'),

                wrapper.appendChild(sliderItems)

            createSlides(1, sliderItems)

            const slides = sliderItems.getElementsByClassName('testimonial-slide')

            slider = new SelfSwitchingSlider(wrapper, sliderItems, prev, next, slides, slideSize)

            next.addEventListener('click', listener (1));

            sliderItems.addEventListener('transitionend', slider.checkIndex);

            next.click()

            sliderItems.dispatchEvent(myCustomTransitionend)

            expect(sliderItems.style.left).toBe('-100px')
        })

        it('bla bla', () => {

           const shiftSliderSpy = spyOn(slider, 'shiftSlide')

            slider.checkHover()
            expect(shiftSliderSpy).toHaveBeenCalled()
        })


    })

    afterEach(() => {
        prev.removeEventListener('click', listener, false);
        next.removeEventListener('click', listener, false);

        sliderItems.style.left = ''

        sliderItems.removeEventListener('transitionend', slider.checkIndex);

        wrapper.remove()

    })

});