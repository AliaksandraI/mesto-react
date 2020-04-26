//переменные для изменения данных профайла
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const submitButton = document.querySelector('.popup__button');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const popupName = document.querySelector('.popup__text_type_name');
const popupProfession = document.querySelector('.popup__text_type_profession');
const popupForm = document.querySelector('.popup__container');
//переменные для template
const cardsContainer = document.querySelector('.elements');
const picturePopup = document.querySelector('.popup-picture');
const picturePopupLink = document.querySelector('.popup-picture__image');
const picturePopupName = document.querySelector('.popup-picture__title');
const picturePopupCloseButton = document.querySelector('.popup-picture__close-button');
//переменные для добавления карточек
const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup-add');
const closeAddCardPopupButton = document.querySelector('.popup-add__close-button');
const addCardPopupName = document.querySelector('.popup__text_type_picture');
const addCardPopupLink = document.querySelector('.popup__text_type_link');
const addCardPopupForm = document.querySelector('.popup-add__container');
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

//функция открытия формы и закрытия формы изменения данных профайла
function toggleForm(event){
    event.preventDefault();

    if(popup.classList.contains('popup_closed')) {
        popup.classList.remove('popup_closed');
        popup.classList.add('popup_opened');
        popupName.value = profileName.textContent;
        popupProfession.value = profileProfession.textContent;
    }
    else {
        popup.classList.add('popup_closed');
        popup.classList.remove('popup_opened');
    }
}

//функция закрытия формы и сохранения внесенных изменения данных профайла по нажатию на кнопку Submit
function onSubmitForm(event) {
    toggleForm(event);
    profileName.textContent = popupName.value; 
    profileProfession.textContent = popupProfession.value;
}

//функция открытия и закрытия картинки
function togglePicturePopup(card) {
    if(card) {
        picturePopup.classList.remove('popup-picture_closed');
        picturePopup.classList.add('popup-picture_opened');
        picturePopupLink.src = card.link;
        picturePopupName.textContent = card.name;
    }
    else {
        picturePopup.classList.remove('popup-picture_opened');
        picturePopup.classList.add('popup-picture_closed');
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
function toggleFormAdd(event){
    event.preventDefault();

    if(addCardPopup.classList.contains('popup_closed')) {
        addCardPopup.classList.remove('popup_closed');
        addCardPopup.classList.add('popup_opened');
        addCardPopupName.value = '';
        addCardPopupLink.value = '';
    }
    else {
        addCardPopup.classList.add('popup_closed');
        addCardPopup.classList.remove('popup_opened');
    }
}

//функция добавления картинки
function onSubmitFormAdd(event) {
    toggleFormAdd(event);
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
editButton.addEventListener('click', toggleForm);

closeButton.addEventListener('click', toggleForm);

popupForm.addEventListener('submit', onSubmitForm);

picturePopupCloseButton.addEventListener('click', function(){togglePicturePopup()});

addCardButton.addEventListener('click', toggleFormAdd);

closeAddCardPopupButton.addEventListener('click', toggleFormAdd);

addCardPopupForm.addEventListener('submit', onSubmitFormAdd);

//отрисовка карточек при открытии
renderCards();


