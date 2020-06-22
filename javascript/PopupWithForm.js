import { FormValidator } from "./FormValidator.js";
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormCallback, validationOptions) {
        super(popupSelector);
        this._submitFormCallback = submitFormCallback;
        this._inputValues = Array.from(this._popupElement.querySelectorAll(validationOptions.inputSelector));
        this._popupForm = this._popupElement.querySelector('.popup__container');
        this._formValidator = new FormValidator (validationOptions, this._popupForm);
        this._formValidator.enableValidation();
        this._setEventListeners();
    }

    _getInputValues () {
        const resultInputValues = this._inputValues.map(function (input) {
            return input.value;
        });

        return resultInputValues;
    }

    setInputValues (values) {
        values.forEach((value, index) => this._inputValues[index].value = value);
    }

    _onSubmitAddCardPopupForm() {
        if (!this._popupElement.querySelector('.form__submit_inactive')){
            this.close();
            const result = this._getInputValues();
            this._submitFormCallback(result);
        }
    }

    _setEventListeners() {
        super._setEventListeners();
        this._popupForm.addEventListener('submit', () => {
            this._onSubmitAddCardPopupForm();
        });

        this._popupForm.addEventListener('mousedown', (evt) => {
            evt.stopImmediatePropagation();
          });
    }

    open (resetStatus) {
        super.open();
        this._formValidator.resetFormErrors(resetStatus);
        this._popupForm.reset()
    }

}




