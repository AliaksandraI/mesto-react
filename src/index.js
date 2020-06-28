import './index.css';
import { Card } from '../javascript/Card.js';
import { UserInfo } from '../javascript/UserInfo.js';
import { Section } from '../javascript/Section.js';
import { PopupWithImage } from '../javascript/PopupWithImage.js';
import { PopupWithForm } from '../javascript/PopupWithForm.js';
import { API } from '../javascript/Api.js';
import { Popup } from '../javascript/Popup';

const validationOptions = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_inactive',
  };


const editProfileButton = document.querySelector('.profile__edit-button');

export const api = new API({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
    headers: {
      authorization: 'f4b731d6-2118-4fcc-9305-6dde1beafd26',
      'Content-Type': 'application/json'
    }
});

const profileInfo = new UserInfo ('.profile__name', '.profile__profession')

const profilePopup = new PopupWithForm ('.popup_profile', onSubmitProfilePopupForm, validationOptions);

const picturePopup = new PopupWithImage ('.popup_picture');

const deleteCardPopup = new Popup ('.popup_check');

const addCardButton = document.querySelector('.profile__add-button');

const addCardPopup = new PopupWithForm ('.popup_card', onSubmitAddCardPopupForm, validationOptions);

const defaultCardList =  new Section({ 
    items:[],
    renderer: (item) => {
        addNewCard(item._id, item.name, item.link, item.likes);
    }
}, '.elements');

function addNewCard(id, name, link, likes) {
    let isLiked = false;
    const currentUserId = profileInfo.getId();

    let i;
    for(i=0; i < likes.length; i++){
        if(likes[i]._id == currentUserId){
            isLiked = true;
            break;
        }
    }

    const card = new Card(id, name, link, isLiked, likes.length, '#card-template', onOpenPicturePopup, likeClickHandler);
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
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
    api.updateUserInfo(name, profession)
        .then (user => {
            profileInfo.setUserInfo(user.name, user.about, user._id);
        })
        .catch(err => {
            console.log(err);
        });
}


function onSubmitAddCardPopupForm(values) {
    const [name, link] = values;
    
    api.addNewCard(name,link)
        .then(addedCard => {
            addNewCard(addedCard._id, addedCard.name, addedCard.link, addedCard.likes);
        })
        .catch(err => {
            console.log(err);
        });
}


editProfileButton.addEventListener('click', onOpenProfilePopup);

addCardButton.addEventListener('click', onOpenAddCardPopup);

api.getUserInfo()
    .then (user => {
        profileInfo.setUserInfo(user.name, user.about, user._id);
    })
    .catch(err => {
        console.log(err);
    }); 


api.getInitialCards()
    .then(cards => {
        defaultCardList.setItems(cards);
        defaultCardList.renderItems ();
    }).catch(err => {
        console.log(err);
    });

function likeClickHandler(currentCard) {
    const likePromise = currentCard.isLiked() ? api.dislikeCard(currentCard.getId()) : api.likeCard(currentCard.getId());
    
    likePromise.then(cardInfo => {
        currentCard.setLikeCount(cardInfo.likes.length);
        currentCard.toggleLike(!currentCard.isLiked());
    }).catch(err => {
        console.log(err);
    });
};

    