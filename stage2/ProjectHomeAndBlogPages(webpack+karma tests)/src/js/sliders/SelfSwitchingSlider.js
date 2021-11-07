import Slider from './Slider'

export default  function SelfSwitchingSlider (wrapper, sliderItems, prev, next, slides, slideSize) {

    Slider.apply(this, arguments)

    this.checkHover = function () {
        if (!this.hover) {
            this.shiftSlide(1)
        }
    }
    console.log(this.hover)

    let shiftSlides = this.checkHover.bind(this)

    setInterval(shiftSlides, 4000, this.hover);

}