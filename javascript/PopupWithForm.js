import { FormValidator } from "./FormValidator.js";
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormCallback, firstInputSelector, secondInputSelector,validationOptions) {
        super(popupSelector);
        this._submitFormCallback = submitFormCallback;
        this._firstInput = this._popupElement.querySelector(firstInputSelector);
        this._secondInput = this._popupElement.querySelector(secondInputSelector);
        this._popupForm = this._popupElement.querySelector('.popup__container');
        this._formValidator = new FormValidator (validationOptions, this._popupForm);
        this._formValidator.enableValidation();
        this._setEventListeners();
    }

    _getInputValues () {
        return {
            input1: this._firstInput.value, 
            input2: this._secondInput.value
        };
    }

    setInputValues (value1, value2) {
        this._firstInput.value = value1;
        this._secondInput.value = value2;
    }

    _onSubmitAddCardPopupForm() {
        if (!this._popupElement.querySelector('.form__submit_inactive')){
            this.close();
            const result = this._getInputValues ();
            this._submitFormCallback(result.input1, result.input2);
        }
    }

    _setEventListeners() {
        super._setEventListeners();
        this._popupForm = this._popupElement.querySelector('.popup__container');
        this._popupForm.addEventListener('submit', () => {
            this._onSubmitAddCardPopupForm();
        });
    }

    open (resetStatus) {
        super.open();
        this._formValidator.resetFormErrors(resetStatus);
        this._popupForm.reset()
    }

}




