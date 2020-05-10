
const form = document.querySelector('.form');
const formInput = form.querySelector('.form__input');
const formError = form.querySelector(`#${formInput.id}-error`);


const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.classList.add('form__input-error_active');
    errorElement.textContent = errorMessage;
};
  
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
 

const setEventListeners = (formElement, validationOptions) => {
    const inputList = Array.from(formElement.querySelectorAll(validationOptions.inputSelector));
    const buttonElement = formElement.querySelector( validationOptions.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, validationOptions);
  
    inputList.forEach((inputElement) => {
      
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement, validationOptions);
      });
    });
};
  
const enableValidation = (validationOptions) => {

    const formList = Array.from(document.querySelectorAll(validationOptions.formSelector));

    formList.forEach((formElement) => {
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


document.addEventListener('keydown', function(event) {
    if(document.querySelector('.popup_opened')) {
        const key = event.key; 
        if (key === "Escape") {
            const popupWhichIsOpen = document.querySelector('.popup_opened');
            popupWhichIsOpen.classList.remove('popup_opened');
        };
    } 
});


const enableOverlayClick = () => {
    const popupList = Array.from(document.querySelectorAll('.popup'));

    popupList.forEach((popupElement) => {
        popupElement.addEventListener('click', () => {
            if(document.querySelector('.popup_opened')) {
                const popupWhichIsOpen = document.querySelector('.popup_opened');
                popupWhichIsOpen.classList.remove('popup_opened');
            }
        });
    });
};


enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_inactive',
});

enableOverlayClick();

