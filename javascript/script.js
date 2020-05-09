//переменные для изменения данных профайла
const editProfileButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

//профайл попап
const profilePopup = document.querySelector('.popup_profile');
const closeProfileButton = profilePopup.querySelector('.popup__close-button');
const profilePopupName = profilePopup.querySelector('.popup__text_type_name');
const profilePopupProfession = profilePopup.querySelector('.popup__text_type_profession');
const profilePopupForm = profilePopup.querySelector('.popup__container');

//переменные для большой картинки
const picturePopup = document.querySelector('.popup_picture');
const picturePopupImage = picturePopup.querySelector('.popup__image');
const picturePopupName = picturePopup.querySelector('.popup__title_picture');
const picturePopupCloseButton = picturePopup.querySelector('.popup__close-button');

//переменные для добавления карточек
const cardsContainer = document.querySelector('.elements');
const addCardButton = document.querySelector('.profile__add-button');

const addCardPopup = document.querySelector('.popup_card');
const closeAddCardPopupButton = addCardPopup.querySelector('.popup__close-button');
const addCardPopupName = addCardPopup.querySelector('.popup__text_type_picture');
const addCardPopupLink = addCardPopup.querySelector('.popup__text_type_link');
const addCardPopupForm = addCardPopup.querySelector('.popup__container');
//массив с картинками
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }  
];


function togglePopup(popup) {
    popup.classList.toggle('popup_opened');
}


//функции открытия формы и закрытия формы изменения данных профайла

function openProfilePopup(event){
    event.preventDefault();
    togglePopup(profilePopup);
    profilePopupName.value = profileName.textContent;
    profilePopupProfession.value = profileProfession.textContent; 
}

function closeProfilePopup(event){
    event.preventDefault();
    togglePopup(profilePopup);
}
   

//функция закрытия формы и сохранения внесенных изменения данных профайла по нажатию на кнопку Submit
function onSubmitProfileForm(event) {
    closeProfilePopup(event);
    profileName.textContent = profilePopupName.value; 
    profileProfession.textContent = profilePopupProfession.value;
}

//функции открытия и закрытия картинки

function openPicturePopup(event,card) {
    event.preventDefault();
    togglePopup(picturePopup);
    picturePopupImage.src = card.link;
    picturePopupName.textContent = card.name;
}

function closePicturePopup(event) {
    event.preventDefault();
    togglePopup(picturePopup);
}

//функция добавления карточки с картинкой
function addCard(card) {
    const name = card.name;
    const link = card.link;
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.elements__item-title').textContent = name;
    cardElement.querySelector('.elements__item-picture').src = link;

    cardElement.querySelector('.elements__heart-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__heart-button_active');
    });

    // функция открытия картинки
    cardElement.querySelector('.elements__item-picture').addEventListener('click', function(){
        openPicturePopup(event, card);
    });

    //функция удаления карточки
    cardElement.querySelector('.elements__delete-button').addEventListener('click', function (evt) {
        evt.target.parentElement.parentElement.remove();

        const index = initialCards.indexOf(card);
        if (index >= 0) {
            initialCards.splice(index, 1);
        }
    });

    cardsContainer.prepend(cardElement);
}

//функции открытия и закрытия окна для добавления карточки 
function openAddCardPopup(event){
    event.preventDefault();
    togglePopup(addCardPopup);
    addCardPopupForm.reset(); 
}

function closeAddCardPopup(event){
    event.preventDefault();
    togglePopup(addCardPopup);
}

//функция добавления картинки
function onSubmitAddCardForm(event) {
    closeAddCardPopup(event);
    const newCard = {name: addCardPopupName.value, link: addCardPopupLink.value};
    initialCards.push(newCard);
    addCard(newCard);
}

function renderCards() {
    initialCards.forEach(function (item) {
        addCard(item); 
    });
}


//обработчики событий
editProfileButton.addEventListener('click', openProfilePopup);

closeProfileButton.addEventListener('click', closeProfilePopup);

profilePopupForm.addEventListener('submit', onSubmitProfileForm);

picturePopupCloseButton.addEventListener('click', closePicturePopup);

addCardButton.addEventListener('click', openAddCardPopup);

closeAddCardPopupButton.addEventListener('click', closeAddCardPopup);

addCardPopupForm.addEventListener('submit', onSubmitAddCardForm);

//отрисовка карточек при открытии
renderCards();


//3й проект

const form = document.querySelector('.form');
const formInput = form.querySelector('.form__input');
const formError = form.querySelector(`#${formInput.id}-error`);


const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    console.log(inputElement);
    // Показываем сообщение об ошибке
    errorElement.classList.add('form__input-error_active');
    errorElement.textContent = errorMessage;
};
  
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    // Скрываем сообщение об ошибке
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      // Если проходит, скроем
      hideInputError(formElement, inputElement);
    }
  };
 

const setEventListeners = (formElement) => {
    
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__submit');
  
    toggleButtonState(inputList, buttonElement);
    

  // Обойдем все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
};
  
const enableValidation = () => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll('.form'));
  // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });
      formElement.addEventListener('mousedown', (evt) => {
        evt.stopImmediatePropagation();
      });

  // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement);
    });
};

  
 
const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
          // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true
  return !inputElement.validity.valid;
    })
};


const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add('form__submit_inactive');
    } else {
          // иначе сделай кнопку активной
      buttonElement.classList.remove('form__submit_inactive');
    }
};

// Вызовем функцию
enableValidation();

//Закрытие попапа нажатием на Esc
document.addEventListener('keydown', function(event) {
    const key = event.key; 
    if (key === "Escape") {
        const popupWhichIsOpen = document.querySelector('.popup_opened');
        popupWhichIsOpen.classList.remove('popup_opened');
    };
});

//Закрытие попапа кликом на оверлей



/*работает только на картинке

const popup = document.querySelector('.popup');

popup.addEventListener('mousedown', function() { 
        const popupWhichIsOpen = document.querySelector('.popup_opened');
        popupWhichIsOpen.classList.remove('popup_opened');
});

*/


//* не работает
const enableOverlayClick = () => {
    
    const popupList = Array.from(document.querySelectorAll('.popup'));

  
    popupList.forEach((popupElement) => {
      popupElement.addEventListener('mousedown', () => {
        const popupWhichIsOpen = document.querySelector('.popup_opened');
        popupWhichIsOpen.classList.remove('popup_opened');
      });
    });
};

//popup_picture stopPropagation
//picturePopup.addEventListener('mousedown', (evt) => {
  //  evt.stopImmediatePropagation();
//  });

enableOverlayClick();

