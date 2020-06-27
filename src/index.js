import './index.css';
import { Card } from '../javascript/Card.js';
import { UserInfo } from '../javascript/UserInfo.js';
import { Section } from '../javascript/Section.js';
import { PopupWithImage } from '../javascript/PopupWithImage.js';
import { PopupWithForm } from '../javascript/PopupWithForm.js';
import { API } from '../javascript/Api.js';

const validationOptions = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_inactive',
  };


const editProfileButton = document.querySelector('.profile__edit-button');

const api = new API({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
    headers: {
      authorization: 'f4b731d6-2118-4fcc-9305-6dde1beafd26',
      'Content-Type': 'application/json'
    }
});

const profileInfo = new UserInfo ('.profile__name', '.profile__profession')

const profilePopup = new PopupWithForm ('.popup_profile', onSubmitProfilePopupForm, validationOptions);

const picturePopup = new PopupWithImage ('.popup_picture');

const addCardButton = document.querySelector('.profile__add-button');

const addCardPopup = new PopupWithForm ('.popup_card', onSubmitAddCardPopupForm, validationOptions);

const defaultCardList =  new Section({ 
    items:[],
    renderer: (item) => {
        addNewCard(item.name, item.link);
    }
}, '.elements');

function addNewCard(name, link) {
    const card = new Card(name, link, '#card-template',onOpenPicturePopup);
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
    api.addNewCard(name,link);
}


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
    api.updateUserInfo(name, profession);
}


function onSubmitAddCardPopupForm(values) {
    const [name, link] = values;
    addNewCard(name, link);
}




editProfileButton.addEventListener('click', onOpenProfilePopup);

addCardButton.addEventListener('click', onOpenAddCardPopup);

api.getUserInfo()
    .then (user => {
        profileInfo.setUserInfo(user.name, user.about);
    })
    .catch(err => {
        console.log(err);
    });


api.getInitialCards()
    .then(cards => {
        defaultCardList.setItems(cards);
        defaultCardList.renderItems ();
    });




