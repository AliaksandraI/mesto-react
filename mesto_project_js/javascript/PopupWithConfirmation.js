import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._confirmButton = this._popupElement.querySelector('.popup__button');
        this._setEventListeners();
    }

    open (onConfirmCallback) {
        super.open();
        this._onConfirmCallback = onConfirmCallback;
    }

    _setEventListeners() {
        super._setEventListeners();
        this._confirmButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            if(this._onConfirmCallback) {
                this._onConfirmCallback();
            }
        });
    }
}