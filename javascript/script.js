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

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function isPopupOpened(popup) {
    return popup.classList.contains('popup_opened');
}

//функция открытия формы и закрытия формы изменения данных профайла
function toggleProfilePopup(event){
    event.preventDefault();

    if(isPopupOpened(profilePopup)) {
        closePopup(profilePopup);
    }
    else {
        openPopup(profilePopup);
        profilePopupName.value = profileName.textContent;
        profilePopupProfession.value = profileProfession.textContent; 
    }
}

//функция закрытия формы и сохранения внесенных изменения данных профайла по нажатию на кнопку Submit
function onSubmitProfileForm(event) {
    toggleProfilePopup(event);
    profileName.textContent = profilePopupName.value; 
    profileProfession.textContent = profilePopupProfession.value;
}

//функция открытия и закрытия картинки
function togglePicturePopup(card) {
    if(card) {
        openPopup(picturePopup);
        picturePopupImage.src = card.link;
        picturePopupName.textContent = card.name;
    }
    else {
        closePopup(picturePopup);
    } 
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
        togglePicturePopup(card)
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

//функция открытия и закрытия окна для добавления карточки
function toggleAddCardPopup(event){
    event.preventDefault();

    if(isPopupOpened(addCardPopup)) {
        closePopup(addCardPopup);
    }
    else {
        openPopup(addCardPopup);
        addCardPopupForm.reset(); 
    }
}

//функция добавления картинки
function onSubmitAddCardForm(event) {
    toggleAddCardPopup(event);
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
editProfileButton.addEventListener('click', toggleProfilePopup);

closeProfileButton.addEventListener('click', toggleProfilePopup);

profilePopupForm.addEventListener('submit', onSubmitProfileForm);

picturePopupCloseButton.addEventListener('click', function(){togglePicturePopup(null)});

addCardButton.addEventListener('click', toggleAddCardPopup);

closeAddCardPopupButton.addEventListener('click', toggleAddCardPopup);

addCardPopupForm.addEventListener('submit', onSubmitAddCardForm);

//отрисовка карточек при открытии
renderCards();


