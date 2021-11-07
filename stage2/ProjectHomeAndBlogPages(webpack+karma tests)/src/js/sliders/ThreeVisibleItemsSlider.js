import Slider from './Slider'

export default function ThreeVisibleItemsSlider (wrapper, sliderItems, prev, next, slides, slideSize) {

    Slider.apply(this, arguments)

    let slidesLength = slides.length,

        newFirstSlide = slides[0],
        newThirdSlide = slides[2],
        newFourthSlide = slides[3],
        preLastSlide = slides[slidesLength - 3],
        prePreLastSlide = slides[slidesLength - 4],

        cloneSecond = newThirdSlide.cloneNode(true),
        cloneThird = newFourthSlide.cloneNode(true),
        clonePreLast = preLastSlide.cloneNode(true),
        clonePrePreLast = prePreLastSlide.cloneNode(true);


    sliderItems.appendChild(cloneSecond);
    sliderItems.appendChild(cloneThird);
    sliderItems.insertBefore(clonePreLast, newFirstSlide);
    sliderItems.insertBefore(clonePrePreLast, clonePreLast);
}