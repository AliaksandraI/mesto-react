
const form = document.querySelector('.form');
const formInput = form.querySelector('.form__input');


function toggleInputError(errorElement, inputElement) {
    inputElement.classList.toggle('form__input_type_error');
    errorElement.classList.toggle('form__input-error_active');
}


const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    // Несмотря на то, что общий код вынесен в toggle, все равно необходимо вручную обращаться к классу form__input-error_active, 
    // чтобы 'контролированно' вызывать метод toggle, который в противном случае будет плодить 'четные' ошибки.
    if(!errorElement.classList.contains('form__input-error_active')) {
        toggleInputError(errorElement, inputElement);
    }

    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    // Несмотря на то, что общий код вынесен в toggle, все равно необходимо вручную обращаться к классу form__input-error_active, 
    // чтобы 'контролированно' вызывать метод toggle, который в противном случае будет плодить 'четные' ошибки.
    if(errorElement.classList.contains('form__input-error_active')) {
        toggleInputError(errorElement, inputElement);
    }

    errorElement.textContent = '';
};

const checkValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
 

const setEventListeners = (formElement, validationOptions) => {
    const formInputs = Array.from(formElement.querySelectorAll(validationOptions.inputSelector));
    const buttonElement = formElement.querySelector( validationOptions.submitButtonSelector);

    toggleButtonState(formInputs, buttonElement, validationOptions);
  
    formInputs.forEach((inputElement) => {
      
      inputElement.addEventListener('input', () => {
        checkValidity(formElement, inputElement);
        toggleButtonState(formInputs, buttonElement, validationOptions);
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

  
 
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};


const toggleButtonState = (inputList, buttonElement, validationOptions) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationOptions.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(validationOptions.inactiveButtonClass);
    }
};


enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_inactive',
});



