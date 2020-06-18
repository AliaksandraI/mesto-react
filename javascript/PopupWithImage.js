import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);  
        this._name = this._popupElement.querySelector('.popup__title_picture');
        this._image = this._popupElement.querySelector('.popup__image');
        this._setEventListeners();
    }
    
    open (link, name) {
        super.open();
        this._image.src = link;
        this._name.textContent = name;
    }

    
    _setEventListeners() {
        super._setEventListeners();
        this._image.addEventListener('click', (evt) => {
            evt.stopImmediatePropagation();
        });
    }
    

}

