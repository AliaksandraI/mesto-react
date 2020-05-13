
const form = document.querySelector('.form');

const validationOptions = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
};

const toggleErrorBasedOnValidity = (form, inputElement, isValid) => {
  const errorElement = form.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = isValid? '' : inputElement.validationMessage;

  inputElement.classList.toggle('form__input_type_error', !isValid);
  errorElement.classList.toggle('form__input-error_active', !isValid);
};

const resetError = (form, inputElement) => {
  toggleErrorBasedOnValidity(form, inputElement, true);
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  })
};

const setEventListeners = (formElement, validationOptions) => {
    const formInputs = Array.from(formElement.querySelectorAll(validationOptions.inputSelector));
    const buttonElement = formElement.querySelector( validationOptions.submitButtonSelector);

    toggleButtonInactivity(buttonElement, validationOptions.inactiveButtonClass, hasInvalidInput(formInputs));
  
    formInputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        toggleErrorBasedOnValidity(formElement, inputElement, inputElement.validity.valid);
        toggleButtonInactivity(buttonElement, validationOptions.inactiveButtonClass, hasInvalidInput(formInputs));
      });
    });
};
  
const enableValidation = (validationOptions) => {

    const forms = Array.from(document.querySelectorAll(validationOptions.formSelector));

    forms.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      
      formElement.addEventListener('click', (evt) => {
        evt.stopImmediatePropagation();
      });

      setEventListeners(formElement, validationOptions);
    });
};

const toggleButtonState = (formElement, validationOptions) => {
  const formInputs = Array.from(formElement.querySelectorAll(validationOptions.inputSelector));
  const buttonElement = formElement.querySelector( validationOptions.submitButtonSelector);
   
  buttonElement.classList.toggle(validationOptions.inactiveButtonClass, hasInvalidInput(formInputs));
};

const toggleButtonInactivity = (button, inactiveClass, shouldBeInactive) => {
  button.classList.toggle(inactiveClass, shouldBeInactive);
};

const toggleButtonInactivityOnForm = (formElement, validationOptions, shouldBeInactive) => {
  const buttonElement = formElement.querySelector(validationOptions.submitButtonSelector);
  toggleButtonInactivity(buttonElement, validationOptions.inactiveButtonClass, shouldBeInactive);
};

enableValidation(validationOptions);



