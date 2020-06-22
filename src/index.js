import './index.css';
import { Card } from '../javascript/Card.js';
import { UserInfo } from '../javascript/UserInfo.js';
import { Section } from '../javascript/Section.js';
import { PopupWithImage } from '../javascript/PopupWithImage.js';
import { PopupWithForm } from '../javascript/PopupWithForm.js';

const validationOptions = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_inactive',
  };


const editProfileButton = document.querySelector('.profile__edit-button');

const profileInfo = new UserInfo ('.profile__name', '.profile__profession')

const profilePopup = new PopupWithForm ('.popup_profile', onSubmitProfilePopupForm, validationOptions);

const picturePopup = new PopupWithImage ('.popup_picture'); //document.querySelector('.popup_picture');

const addCardButton = document.querySelector('.profile__add-button');

const addCardPopup = new PopupWithForm ('.popup_card', onSubmitAddCardPopupForm, validationOptions);


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
        addNewCard(item.name, item.link);
    }
}, '.elements');

function addNewCard(name, link) {
    const card = new Card(name, link, '#card-template',onOpenPicturePopup);
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
}

//popupwithimage
function onOpenPicturePopup(link, name) {
    picturePopup.open(link, name);
}


function onOpenAddCardPopup(){
    addCardPopup.open(true);
}


function onOpenProfilePopup(){
    profilePopup.open(false);
    const profileData = profileInfo.getUserInfo();
    profilePopup.setInputValues([profileData.name, profileData.profession]);
}


function onSubmitProfilePopupForm(values) {
    const [name, profession] = values;
    profileInfo.setUserInfo(name, profession);  
}


function onSubmitAddCardPopupForm(values) {
    const [name, link] = values;
    addNewCard(name, link);
}


defaultCardList.renderItems ();

editProfileButton.addEventListener('click', onOpenProfilePopup);

addCardButton.addEventListener('click', onOpenAddCardPopup);




