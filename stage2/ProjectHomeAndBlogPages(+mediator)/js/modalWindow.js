class PopUpMessageData {
    constructor(type, message, numberOfButtons, backgroundColor, callFromButton) {
        this.type = type;
        this.message = message;
        this.numberOfButtons = numberOfButtons;
        this.backgroundColor = backgroundColor;
        this.callFromButton = callFromButton;
    }
}

(function ( $ ) {

    $.fn.showPopup = function (popUpMessageData) {

        function mainLogic(button) {
            let buttonId = button.id

            function insertSecondButton() {

                if(popUpMessageData.numberOfButtons === 2) {
                    return '<button class="popup-no">Cancel</button>'
                }else{
                    return ''
                }
            }

            function addBackgroundColor(classElement) {
                if(popUpMessageData.backgroundColor === 'dark') {
                    $(`.${classElement}`).addClass('popup-message_background-dark')
                }else if(popUpMessageData.backgroundColor === 'light') {
                    $(`.${classElement}`).addClass('popup-message_background-light')
                }
            }

            function addTypeStyles(classElement) {
                if(popUpMessageData.type === 'info') {
                    $(`.${classElement}`).addClass('popup-message_type_info')
                }else if(popUpMessageData.type === 'error') {
                    $(`.${classElement}`).addClass('popup-message_type_error')
                }else if(popUpMessageData.type === 'success') {
                    $(`.${classElement}`).addClass('popup-message_type_success')
                }
            }

            $('body').append('<div class="popup-wrapper"></div>')
            $('.popup-wrapper').append(`
                     <div class="popup-message_background"></div>
                     <div class="popup-message">
                        <button class="popup-close">х</button>
                        <p>${popUpMessageData.message}</p>
                        <button class="popup-yes">Ok</button>
                        ${insertSecondButton()}
                     </div>`)

            addBackgroundColor('popup-message_background')
            addTypeStyles('popup-message')


            $('.popup-message').click(function clickToPopupMessage (event) {

                if (event.target.classList.contains('popup-yes')) {
                    $(this).parents('.popup-wrapper').fadeOut();
                    console.log('You press "Ok"')
                    if (popUpMessageData.callFromButton) {
                        console.log(`You removed post with ${buttonId}`)
                    }
                }
                if (event.target.classList.contains('popup-no')) {
                    $(this).parents('.popup-wrapper').fadeOut();
                    console.log('You press "Cancel"')
                }
                if (event.target.classList.contains('popup-close')) {
                    $(this).parents('.popup-wrapper').fadeOut();
                    console.log('You press "Close"')
                }

            })


            $('.popup-wrapper').click(function (e) {
                if ($(e.target).closest('.popup-message').length === 0) {
                    $(this).fadeOut();
                    console.log('Nothing been selected')
                }
            });

            $(document).keydown(function (e) {
                if (e.keyCode === 27) {
                    e.stopPropagation();
                    $('.popup-wrapper').fadeOut();
                }
            });
        }

        if(popUpMessageData.callFromButton) {
            $(this).click(function() {
                mainLogic(this)
            })
        }else{
            setTimeout( mainLogic, 10000, this)
        }

        return this
    }
}( jQuery ));

export { PopUpMessageData}