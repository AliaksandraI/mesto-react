import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { UserInfo } from './UserInfo.js';
import { Section } from './Section.js';

const validationOptions = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_inactive',
  };

//переменные для изменения данных профайла
const editProfileButton = document.querySelector('.profile__edit-button');
const profileInfo = new UserInfo ('.profile__name', '.profile__profession')


//профайл попап
const profilePopup = document.querySelector('.popup_profile');
const closeProfileButton = profilePopup.querySelector('.popup__close-button');
const profilePopupName = profilePopup.querySelector('.popup__text_type_name');
const profilePopupProfession = profilePopup.querySelector('.popup__text_type_profession');
const profilePopupForm = profilePopup.querySelector('.popup__container');
const profilePopupFormValidator = new FormValidator (validationOptions, profilePopupForm);


//переменные для большой картинки
const picturePopup = document.querySelector('.popup_picture');
const picturePopupImage = picturePopup.querySelector('.popup__image');
const picturePopupName = picturePopup.querySelector('.popup__title_picture');
const picturePopupCloseButton = picturePopup.querySelector('.popup__close-button');

//переменные для добавления карточек
//const cardsContainer = document.querySelector('.elements');
const addCardButton = document.querySelector('.profile__add-button');

const addCardPopup = document.querySelector('.popup_card');
const closeAddCardPopupButton = addCardPopup.querySelector('.popup__close-button');
const addCardPopupName = addCardPopup.querySelector('.popup__text_type_picture');
const addCardPopupLink = addCardPopup.querySelector('.popup__text_type_link');
const addCardPopupForm = addCardPopup.querySelector('.popup__container');
const addCardPopupFormValidator = new FormValidator (validationOptions, addCardPopupForm);

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


const defaultCardList =  new Section({ 
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, '#card-template');
      card.addOpenPictureListener(onOpenPicturePopup);
      const cardElement = card.generateCard();
      defaultCardList.addItem(cardElement);
    }
}, '.elements');


//функция добавления картинки
function addNewCard(name, link) {
    const card = new Card(name, link, '#card-template');
    card.addOpenPictureListener(onOpenPicturePopup);
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
}


function togglePopup(popup) {
    const isOpened = popup.classList.toggle('popup_opened');
    if(isOpened){
        document.addEventListener("keydown", onDocumentKeydown);
        popup.addEventListener("click", onPopupClick);
    }
    else {
        document.removeEventListener("keydown", onDocumentKeydown);
        popup.removeEventListener("click", onPopupClick);
    }
}

function onDocumentKeydown(event) {
    const popupWhichIsOpen = document.querySelector('.popup_opened');
    if(popupWhichIsOpen && event.key === "Escape") {
        togglePopup(popupWhichIsOpen);
    }
}

function onPopupClick () {
    const popupWhichIsOpen = document.querySelector('.popup_opened');
    if(popupWhichIsOpen) {
        togglePopup(popupWhichIsOpen);
    }
}

//функции открытия формы и закрытия формы изменения данных профайла
function onOpenProfilePopup(event){
    event.preventDefault();
    profilePopupFormValidator.resetFormErrors(false);
    togglePopup(profilePopup);
    const profileData = profileInfo.getUserInfo();
    profilePopupName.value = profileData.name;
    profilePopupProfession.value = profileData.profession;
}

function onCloseProfilePopup(event){
    event.preventDefault();
    togglePopup(profilePopup);
}

//функция закрытия формы и сохранения внесенных изменения данных профайла по нажатию на кнопку Submit
function onSubmitProfilePopupForm(event) {
    if (!profilePopup.querySelector('.form__submit_inactive')){
        onCloseProfilePopup(event);
        profileInfo.setUserInfo(profilePopupName.value, profilePopupProfession.value);
    }
}

function onOpenPicturePopup(event, link, name) {
    event.preventDefault();
    togglePopup(picturePopup);
    picturePopupImage.src = link;
    picturePopupName.textContent = name;
}

function onClosePicturePopup(event) {
    event.preventDefault();
    togglePopup(picturePopup);
}

//функции открытия и закрытия окна для добавления карточки 
function onOpenAddCardPopup(event){
    event.preventDefault();
    addCardPopupFormValidator.resetFormErrors(true);
    togglePopup(addCardPopup);
    addCardPopupForm.reset(); 
}

function onCloseAddCardPopup(event){
    event.preventDefault();
    togglePopup(addCardPopup);
}



function onSubmitAddCardPopupForm(event) {
    if (!addCardPopup.querySelector('.form__submit_inactive')){
        onCloseAddCardPopup(event);
        addNewCard(addCardPopupName.value, addCardPopupLink.value);
    };
}

defaultCardList.renderItems ();


//обработчики событий
picturePopupImage.addEventListener('click', (evt) => {
    evt.stopImmediatePropagation();
});

editProfileButton.addEventListener('click', onOpenProfilePopup);

closeProfileButton.addEventListener('click', onCloseProfilePopup);

profilePopupForm.addEventListener('submit', onSubmitProfilePopupForm);

picturePopupCloseButton.addEventListener('click', onClosePicturePopup);

addCardButton.addEventListener('click', onOpenAddCardPopup);

closeAddCardPopupButton.addEventListener('click', onCloseAddCardPopup);

addCardPopupForm.addEventListener('submit', onSubmitAddCardPopupForm);

profilePopupFormValidator.enableValidation();

addCardPopupFormValidator.enableValidation();


