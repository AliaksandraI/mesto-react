export class FormValidator {
  constructor(validationOptions, formElement) {
    this._validationOptions = validationOptions;
    this._formElement = formElement;
  }


  _toggleErrorBasedOnValidity = (inputElement, isValid) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
  
    errorElement.textContent = isValid? '' : inputElement.validationMessage;
  
    inputElement.classList.toggle('form__input_type_error', !isValid);
    errorElement.classList.toggle('form__input-error_active', !isValid);
  };
  
  resetError = (inputElement) => {
    this._toggleErrorBasedOnValidity(inputElement, true);
  };
  
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
  };
  
  _setEventListeners = () => {
      const formInputs = Array.from(this._formElement.querySelectorAll(this._validationOptions.inputSelector));
      const buttonElement = this._formElement.querySelector(this._validationOptions.submitButtonSelector);
  
      this._toggleButtonInactivity(buttonElement, this._validationOptions.inactiveButtonClass, this._hasInvalidInput(formInputs));
    
      formInputs.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._toggleErrorBasedOnValidity(inputElement, inputElement.validity.valid);
          this._toggleButtonInactivity(buttonElement, this._validationOptions.inactiveButtonClass, this._hasInvalidInput(formInputs));
        });
      });
  };

  _toggleButtonState = () => {
    const formInputs = Array.from(this._formElement.querySelectorAll(this._validationOptions.inputSelector));
    const buttonElement = this._formElement.querySelector(this._validationOptions.submitButtonSelector);
     
    buttonElement.classList.toggle(this._validationOptions.inactiveButtonClass, this._hasInvalidInput(formInputs));
  };
  
  _toggleButtonInactivity = (button, inactiveClass, shouldBeInactive) => {
    button.classList.toggle(inactiveClass, shouldBeInactive);
  };
  
  toggleButtonInactivityOnForm = (shouldBeInactive) => {
    const buttonElement = this._formElement.querySelector(this._validationOptions.submitButtonSelector);
    this._toggleButtonInactivity(buttonElement, this._validationOptions.inactiveButtonClass, shouldBeInactive);
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
