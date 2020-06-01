export class FormValidator {
  constructor(validationOptions, formElement) {
    this._validationOptions = validationOptions;
    this._formElement = formElement;

    this._formInputs = Array.from(this._formElement.querySelectorAll(this._validationOptions.inputSelector));
    this._button = this._formElement.querySelector(this._validationOptions.submitButtonSelector);
  };

  _toggleErrorBasedOnValidity = (inputElement, isValid) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
  
    errorElement.textContent = isValid? '' : inputElement.validationMessage;
  
    inputElement.classList.toggle('form__input_type_error', !isValid);
    errorElement.classList.toggle('form__input-error_active', !isValid);
  };
  
  _hasInvalidInput = () => {
    return this._formInputs.some((inputElement) => {
        return !inputElement.validity.valid;
    })
  };
  
  _setEventListeners = () => {
      this._toggleButtonInactivity(this._hasInvalidInput());
    
      this._formInputs.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._toggleErrorBasedOnValidity(inputElement, inputElement.validity.valid);
          this._toggleButtonInactivity(this._hasInvalidInput());
        });
      });
  };
  
  _toggleButtonInactivity = (shouldBeInactive) => {
    this._button.classList.toggle(this._validationOptions.inactiveButtonClass, shouldBeInactive);
  };

  resetFormErrors = (shouldBeInactive) => {
    this._formInputs.forEach((inputElement) => {
      this._toggleErrorBasedOnValidity(inputElement, true);
    });

    this._toggleButtonInactivity(shouldBeInactive);
  };

  enableValidation = () => {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    
    this._formElement.addEventListener('click', (evt) => {
      evt.stopImmediatePropagation();
    });

    this._setEventListeners();
  };

}
