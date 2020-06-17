import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = super._popupElement.querySelector('.popup__image');
        this._name = super._popupElement.querySelector('.popup__title_picture');
    }
    
    open (link, name) {
        super._open();
        this._image.src = link;
        this._name.textContent = name;
    }
}