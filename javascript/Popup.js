export class Popup {

    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._closeButton = this._popupElement.querySelector('.popup__close-button');
    }

    _togglePopup() {
        const isOpened = this._popupElement.classList.toggle('popup_opened');
        if (isOpened) {
            document.addEventListener("keydown", (evt) => {
                this._handleEscClose(evt);
            });
            this._popupElement.addEventListener("click", () => {
                this._onPopupClick();
            });
        }
        else {
            document.removeEventListener("keydown", (evt) => {
                this._handleEscClose(evt);
            });
            this._popupElement.removeEventListener("click", () => {
                this._onPopupClick();
            });
        }
    }

    _handleEscClose(event) {
        const isOpen = this._popupElement.classList.contains('popup_opened');
        if (isOpen && event.key === "Escape") {
            this._togglePopup();
        }
    }

    _onPopupClick() {
        const isOpen = this._popupElement.classList.contains('popup_opened');
        if (isOpen) {
            this._togglePopup();
        }
    }

    _setEventListeners() {
        this._closeButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.close();
        });
    }

    open () {
        this._togglePopup();
    }
    
    close () {
        this._togglePopup();
    }

}