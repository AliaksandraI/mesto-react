export class Popup {

    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._closeButton = this._popupElement.querySelector('.popup__close-button');
        this._documentEscHandler = this._handleEscClose.bind(this);
        this._popupClickHandler = this._onPopupClick.bind(this);
    }

    _openPopup() {
        this._popupElement.classList.add('popup_opened');
        
        document.addEventListener("keydown", this._documentEscHandler);
        this._popupElement.addEventListener("mousedown", this._popupClickHandler);
    }

    _closePopup() {
        this._popupElement.classList.remove('popup_opened');

        document.removeEventListener("keydown", this._documentEscHandler);
        this._popupElement.removeEventListener("mousedown", this._popupClickHandler);
    }

    _handleEscClose(event) {
        const isOpen = this._popupElement.classList.contains('popup_opened');
        if (isOpen && event.key === "Escape") {
            this._closePopup();
        }
    }

    _onPopupClick() {
        const isOpen = this._popupElement.classList.contains('popup_opened');
        if (isOpen) {
            this._closePopup();
        }
    }

    _setEventListeners() {
        this._closeButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._closePopup();
        });
    }

    open () {
        this._openPopup();
    }
    
    close () {
        this._closePopup();
    }

}