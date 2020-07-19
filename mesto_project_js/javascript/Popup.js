export class Popup {

    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._closeButton = this._popupElement.querySelector('.popup__close-button');
        this._documentEscHandler = this._handleEscClose.bind(this);
        this._popupClickHandler = this._onPopupClick.bind(this);
    }


    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    _onPopupClick(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    }

    _setEventListeners() {
        this._closeButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.close();
        });
    }

    open () {
        this._popupElement.classList.add('popup_opened');
        
        document.addEventListener("keydown", this._documentEscHandler);
        this._popupElement.addEventListener("mousedown", this._popupClickHandler);
    }
    
    close () {
        this._popupElement.classList.remove('popup_opened');

        document.removeEventListener("keydown", this._documentEscHandler);
        this._popupElement.removeEventListener("mousedown", this._popupClickHandler);
    }

}