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
        openPicturePopup(event, card)
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
const formElement = document.querySelector('.form');

const formInput = document.querySelector('.popup__text');
console.log(formInput);
const formError = document.querySelector(`#${formInput.id}-error`);
console.log(formError);

const showInputError = (element) => {
    element.classList.add('form__input-error');
    // Показываем сообщение об ошибке
    //formError.classList.add('form__input-error_active');
  };
  
const hideInputError = (element) => {
    element.classList.remove('form__input-error');
    // Скрываем сообщение об ошибке
    //formError.classList.remove('form__input-error_active');
};

const isValid = () => {
    if (!formInput.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(formInput);
    } else {
      // Если проходит, скроем
      hideInputError(formInput);
    }
  };
  


formElement.addEventListener('submit', function (evt) {
    // Отменим стандартное поведение
    evt.preventDefault();
  });
  // Слушатель события input
  formInput.addEventListener('input', function (evt) {
    // Выведем в консоль значение свойства validity.valid поля ввода, 
    // на котором слушаем событие input
    console.log(evt.target.validity.valid);
  });
  

