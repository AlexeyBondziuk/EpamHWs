import SelfSwitchingSlider from './SelfSwitchingSlider'
import ThreeVisibleItemsSlider from "./ThreeVisibleItemsSlider";

function createFirstSlider() {
    const wrapper = document.getElementById('user-testimonials'),
        sliderItems = document.getElementById('all-testimonials-slides'),
        prev = document.getElementById('next-prev-button_arrow-left'),
        next = document.getElementById('next-prev-button_arrow-right'),
        slides = sliderItems.getElementsByClassName('testimonial-slide'),
        slideSize = sliderItems.getElementsByClassName('testimonial-slide')[0].offsetWidth;

    let firstInstanceSlider = new SelfSwitchingSlider(wrapper, sliderItems, prev, next, slides, slideSize);

    prev.addEventListener('click', function () { firstInstanceSlider.shiftSlide(-1) });
    next.addEventListener('click', function () { firstInstanceSlider.shiftSlide(1) });

    sliderItems.addEventListener('transitionend', firstInstanceSlider.checkIndex);

    sliderItems.addEventListener("mouseleave", function (event) {
        firstInstanceSlider.hover= false
    })

    sliderItems.addEventListener("mouseenter", function (event) {
        firstInstanceSlider.hover= true
    })

};
createFirstSlider()

function createSecondSlider() {
    const wrapper = document.getElementById('userLatestPortfolio'),
        sliderItems = document.getElementById('all-latest-portfolio-slides'),
        prev = document.getElementById('arrowLeftButtonPortfolio'),
        next = document.getElementById('arrowRightButtonPortfolio'),
        slides = sliderItems.getElementsByClassName('work-example');
        let slideSize = sliderItems.getElementsByClassName('work-example')[0].offsetWidth;

   slideSize = slideSize + 40


    let secondInstanceSlider = new ThreeVisibleItemsSlider(wrapper, sliderItems, prev, next, slides, slideSize)

    prev.addEventListener('click', function () { secondInstanceSlider.shiftSlide(-1) });
    next.addEventListener('click', function () { secondInstanceSlider.shiftSlide(1) });

    sliderItems.addEventListener('transitionend', secondInstanceSlider.checkIndex);

};
createSecondSlider()

export { createFirstSlider, createSecondSlider}






