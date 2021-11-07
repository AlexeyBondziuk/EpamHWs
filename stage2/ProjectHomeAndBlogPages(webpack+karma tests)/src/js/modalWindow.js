(function ( $ ) {

    $.fn.showPopup = function (receivePopUpMessageConfig, buttonId) {

        const popupWrapperId = `popup-wrapper${buttonId}`
        const popupMessageId = `popup-message${buttonId}`
        const popupMessageBackgroundId = `popup-message_background${buttonId}`

        const defaultPopUpMessageConfig = {
            type: 'info',
            message: 'Are you sure you want to delete this post?',
            numberOfButtons: 2,
            backgroundColor: 'light',
            callFromButton: false
        }

        const popUpMessageConfig = $.extend( defaultPopUpMessageConfig, receivePopUpMessageConfig );


        function insertSecondButton() {

            if(popUpMessageConfig.numberOfButtons === 2) {
                return '<button class="popup-no">Cancel</button>'
            }else{
                return ''
            }
        }

        function addBackgroundColor(classElement) {
            if(popUpMessageConfig.backgroundColor === 'dark') {
                $(`#${classElement}`).addClass('popup-message_background-dark')
            }else if(popUpMessageConfig.backgroundColor === 'light') {
                $(`#${classElement}`).addClass('popup-message_background-light')
            }
        }

        function addTypeStyles(classElement) {
            if(popUpMessageConfig.type === 'info') {
                $(`.${classElement}`).addClass('popup-message_type_info')
            }else if(popUpMessageConfig.type === 'error') {
                $(`.${classElement}`).addClass('popup-message_type_error')
            }else if(popUpMessageConfig.type === 'success') {
                $(`.${classElement}`).addClass('popup-message_type_success')
            }
        }

        function removePopupFromDom() {
            document.querySelector(`#${popupWrapperId}`).remove()
        }

        $('body').append(`<div id = '${popupWrapperId}' class='popup-wrapper'></div>`)

        $(`#${popupWrapperId}`)
            .append(`
                     <div id="${popupMessageBackgroundId}" class="popup-message_background"></div>
                     <div id="${popupMessageId}" class="popup-message">
                        <button class="popup-close">х</button>
                        <p>${popUpMessageConfig.message}</p>
                        <button class="popup-yes">Ok</button>
                        ${insertSecondButton()}
                     </div>`)

            .on('click',function (event) {
                switch (event.target.className) {
                    case'popup-yes':
                        $(this).parents(`#${popupWrapperId}`).fadeOut();
                        console.log('You press "Ok"')
                        if (popUpMessageConfig.callFromButton) {
                            console.log(`You removed post with ${buttonId}`)
                        }
                        removePopupFromDom()

                        break
                    case 'popup-no':
                        $(this).parents(`#${popupWrapperId}`).fadeOut();
                        console.log('You press "Cancel"')
                        removePopupFromDom()
                        break
                    case 'popup-close':
                        $(this).parents(`#${popupWrapperId}`).fadeOut();
                        console.log('You press "Close"')
                        removePopupFromDom()
                        break

                    default:
                        if ($(event.target).closest('.popup-message').length === 0) {
                            $(this).fadeOut();
                            console.log('Nothing been selected')
                            removePopupFromDom()
                        }
                        $( document ).off()

                }
            })

        $(document).keydown(function (e) {
            if (e.keyCode === 27) {
                e.stopPropagation();
                $(`#${popupWrapperId}`).fadeOut().remove();
                $( document ).off()
            }
        });

        addBackgroundColor(popupMessageBackgroundId)
        addTypeStyles('popup-message')

        return this
    }
}( jQuery ));