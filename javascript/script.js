
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const submitButton = document.querySelector('.popup__button');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const popupName = document.querySelector('.popup__text_type_name');
const popupProfession = document.querySelector('.popup__text_type_profession');
const popupForm = document.querySelector('.popup__container');

//функция открытия формы и закрытия формы
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

//функция закрытия формы и сохранения внесенных изменения по нажатию на кнопку Submit
function onSubmitForm(event) {
    toggleForm(event);
    profileName.textContent = popupName.value; 
    profileProfession.textContent = popupProfession.value;
}

editButton.addEventListener('click', toggleForm);

closeButton.addEventListener('click', toggleForm);

popupForm.addEventListener('submit', onSubmitForm);

//array

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

//template

const cardsContainer = document.querySelector('.elements');

function addCard(name, link) {

    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.elements__item-title').textContent = name;
    cardElement.querySelector('.elements__item-picture').src = link;

    cardsContainer.prepend(cardElement);
}


initialCards.forEach(function (item) {
    
    addCard(item.name, item.link); 

});

//add button - открытие popup

const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup-add');
const closeButtonAdd = document.querySelector('.popup-add__close-button');
const submitButtonAdd = document.querySelector('.popup-add__button');
const popupPicture = document.querySelector('.popup__text_type_picture');
const popupLink = document.querySelector('.popup__text_type_link');
const popupFormAdd = document.querySelector('.popup-add__container');

function toggleFormAdd(event){
    event.preventDefault();

    if(popupAdd.classList.contains('popup_closed')) {
        popupAdd.classList.remove('popup_closed');
        popupAdd.classList.add('popup_opened');
        popupPicture.value = '';
        popupLink.value = '';
    }
    else {
        popupAdd.classList.add('popup_closed');
        popupAdd.classList.remove('popup_opened');
    }
}

//функция добавления картинки

function onSubmitFormAdd(event) {
    toggleFormAdd(event);
    const newCard = {name: popupPicture.value, link: popupLink.value};
    initialCards.push(newCard);
    addCard(newCard.name, newCard.link);
}


addButton.addEventListener('click', toggleFormAdd);

closeButtonAdd.addEventListener('click', toggleFormAdd);

popupFormAdd.addEventListener('submit', onSubmitFormAdd);


