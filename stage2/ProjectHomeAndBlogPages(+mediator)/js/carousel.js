function Slider(wrapper, sliderItems, prev, next, slides, slideSize) {
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
            if (!action) {
                posInitial = sliderItems.offsetLeft;
            }

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

function FirstSlider (wrapper, sliderItems, prev, next, slides, slideSize) {

    Slider.apply(this, arguments)

    function checkHover() {
        if (!this.hover) {
            this.shiftSlide(1)
        }
    }

    let shiftSlides = checkHover.bind(this)

   setInterval(shiftSlides, 4000, this.hover);

}

function SecondSlider (wrapper, sliderItems, prev, next, slides, slideSize) {

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

(function createFirstSlider() {
    const wrapper = document.getElementById('user-testimonials'),
        sliderItems = document.getElementById('all-testimonials-slides'),
        prev = document.getElementById('next-prev-button_arrow-left'),
        next = document.getElementById('next-prev-button_arrow-right'),
        slides = sliderItems.getElementsByClassName('testimonial-slide'),
        slideSize = sliderItems.getElementsByClassName('testimonial-slide')[0].offsetWidth;

    let firstInstanceSlider = new FirstSlider(wrapper, sliderItems, prev, next, slides, slideSize);

    prev.addEventListener('click', function () { firstInstanceSlider.shiftSlide(-1) });
    next.addEventListener('click', function () { firstInstanceSlider.shiftSlide(1) });

    sliderItems.addEventListener('transitionend', firstInstanceSlider.checkIndex);

    sliderItems.addEventListener("mouseleave", function (event) {
        firstInstanceSlider.hover= false
    })

    sliderItems.addEventListener("mouseenter", function (event) {
        firstInstanceSlider.hover= true
    })

})();

(function createSecondSlider() {
    const wrapper = document.getElementById('userLatestPortfolio'),
        sliderItems = document.getElementById('all-latest-portfolio-slides'),
        prev = document.getElementById('arrowLeftButtonPortfolio'),
        next = document.getElementById('arrowRightButtonPortfolio'),
        slides = sliderItems.getElementsByClassName('work-example');
        let slideSize = sliderItems.getElementsByClassName('work-example')[0].offsetWidth;

   slideSize = slideSize + 40


    let secondInstanceSlider = new SecondSlider(wrapper, sliderItems, prev, next, slides, slideSize)

    prev.addEventListener('click', function () { secondInstanceSlider.shiftSlide(-1) });
    next.addEventListener('click', function () { secondInstanceSlider.shiftSlide(1) });

    sliderItems.addEventListener('transitionend', secondInstanceSlider.checkIndex);

})();




