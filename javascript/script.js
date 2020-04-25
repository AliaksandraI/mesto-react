
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


/*  addButton.addEventListener('click', function () {
    const     = document.querySelector('.input__text_type_link');
    const     = document.querySelector('.input__text_type_name');
  
    addCard(link.value, name.value);
  
    artist.value = '';
    title.value = '';
  }); */