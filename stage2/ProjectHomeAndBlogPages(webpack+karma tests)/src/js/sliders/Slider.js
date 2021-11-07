export default function Slider(wrapper, sliderItems, prev, next, slides, slideSize) {
    let slidesLength = slides.length,
        posInitial,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 0,
        allowShift = true,
        hover = false;

    sliderItems.appendChild(cloneFirst);
    sliderItems.insertBefore(cloneLast, firstSlide);

    this.shiftSlide = function (dir, action) {
        sliderItems.classList.add('shifting');

        if (allowShift) {
            // if (!action) {
                posInitial = sliderItems.offsetLeft;
            // }

            if (dir == 1) {
                sliderItems.style.left = (posInitial - slideSize) + "px";
                index++;
            } else if (dir == -1) {
                sliderItems.style.left = (posInitial + slideSize) + "px";
                index--;
            }
        }

        allowShift = false;
    }

    this.checkIndex = function (){
        sliderItems.classList.remove('shifting');

        if (index == -1) {
            sliderItems.style.left = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
        }

        if (index == slidesLength) {
            sliderItems.style.left = -(1 * slideSize) + "px";
            index = 0;
        }

        allowShift = true;
    }
}