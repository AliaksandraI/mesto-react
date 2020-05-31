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

function onPopupClick (event) {
    const popupWhichIsOpen = document.querySelector('.popup_opened');
    if(popupWhichIsOpen) {
        togglePopup(popupWhichIsOpen);
    }
}

//функции открытия формы и закрытия формы изменения данных профайла
function onOpenProfilePopup(event){
    event.preventDefault();
    resetError(profilePopupForm, profilePopupName);
    resetError(profilePopupForm, profilePopupProfession);
    toggleButtonInactivityOnForm(profilePopupForm, validationOptions, false);
    togglePopup(profilePopup);
    profilePopupName.value = profileName.textContent;
    profilePopupProfession.value = profileProfession.textContent;
}

function onCloseProfilePopup(event){
    event.preventDefault();
    togglePopup(profilePopup);
}

//функция закрытия формы и сохранения внесенных изменения данных профайла по нажатию на кнопку Submit
function onSubmitProfilePopupForm(event) {
    if (!profilePopup.querySelector('.form__submit_inactive')){
        onCloseProfilePopup(event);
        profileName.textContent = profilePopupName.value; 
        profileProfession.textContent = profilePopupProfession.value;
    }
}

function onClosePicturePopup(event) {
    event.preventDefault();
    togglePopup(picturePopup);
}

//класс Card
class Card {
    constructor(name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .cloneNode(true);
        
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();

        this._element.querySelector('.elements__item-title').textContent = this._name;
        this._element.querySelector('.elements__item-picture').src = this._link;

        this._setEventListeners();

        return this._element;
    }


    _handleLikeClick(evt) {
        evt.target.classList.toggle('elements__heart-button_active');
    }

    _openPicturePopup(event) {
        event.preventDefault();
        togglePopup(picturePopup);
        picturePopupImage.src = this._link;
        picturePopupName.textContent = this._name;
    }

    _deleteCard(evt) {
        evt.target.parentElement.parentElement.remove();
    };

    _setEventListeners() {
        
        this._element.querySelector('.elements__heart-button').addEventListener('click', (evt) => {
            this._handleLikeClick(evt);
        });

        this._element.querySelector('.elements__item-picture').addEventListener('click', (evt) => {
            this._openPicturePopup(evt);
        });

        this._element.querySelector('.elements__delete-button').addEventListener('click', (evt) => {  
            this._deleteCard(evt);
        });

    }

}

initialCards.forEach((item) => {

  const card = new Card(item.name, item.link, '#card-template');

  const cardElement = card.generateCard();

  cardsContainer.prepend(cardElement);
});

//функции открытия и закрытия окна для добавления карточки 
function onOpenAddCardPopup(event){
    event.preventDefault();
    resetError(addCardPopupForm, addCardPopupName);
    resetError(addCardPopupForm, addCardPopupLink);
    toggleButtonInactivityOnForm(addCardPopupForm, validationOptions, true);
    togglePopup(addCardPopup);
    addCardPopupForm.reset(); 
}

function onCloseAddCardPopup(event){
    event.preventDefault();
    togglePopup(addCardPopup);
}

//функция добавления картинки
function onSubmitAddCardPopupForm(event) {
    if (!addCardPopup.querySelector('.form__submit_inactive')){
        onCloseAddCardPopup(event);
        const card = new Card(addCardPopupName.value, addCardPopupLink.value, '#card-template');
        const cardElement = card.generateCard();
        document.querySelector('.elements').prepend(cardElement);
    };
}

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


