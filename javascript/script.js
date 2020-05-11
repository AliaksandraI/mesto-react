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



function onOpenProfilePopup(event){
    event.preventDefault();
    hideInputError(profilePopupForm, profilePopupName);
    hideInputError(profilePopupForm, profilePopupProfession);
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

//функции открытия и закрытия картинки

function onOpenPicturePopup(event,card) {
    event.preventDefault();
    togglePopup(picturePopup);
    picturePopupImage.src = card.link;
    picturePopupName.textContent = card.name;
}

function onClosePicturePopup(event) {
    event.preventDefault();
    togglePopup(picturePopup);
}

//функция добавления карточки с картинкой
function addCard(card) {
    const name = card.name;
    const link = card.link;
    const cardElement = document.querySelector('#card-template').content.cloneNode(true);
   

    cardElement.querySelector('.elements__item-title').textContent = name;
    cardElement.querySelector('.elements__item-picture').src = link;

    cardElement.querySelector('.elements__heart-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__heart-button_active');
    });


     // функция открытия картинки
    cardElement.querySelector('.elements__item-picture').addEventListener('click', function(evt){
        onOpenPicturePopup(evt, card);
    });

    //функция удаления карточки
    cardElement.querySelector('.elements__delete-button').addEventListener('click', function (evt) {
        evt.target.parentElement.parentElement.remove();

    });

    cardsContainer.prepend(cardElement);
}

//функции открытия и закрытия окна для добавления карточки 
function onOpenAddCardPopup(event){
    event.preventDefault();

    hideInputError(addCardPopupForm, addCardPopupName);
    hideInputError(addCardPopupForm, addCardPopupLink);
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
    const newCard = {name: addCardPopupName.value, link: addCardPopupLink.value};
    //initialCards.push(newCard);
    addCard(newCard);
    }
}

function renderCards() {
    initialCards.forEach(function (item) {
        addCard(item); 
    });
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

//отрисовка карточек при открытии
renderCards();

