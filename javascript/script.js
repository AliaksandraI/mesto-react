
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const submitButton = document.querySelector('.popup__button');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const popupName = document.querySelector('.popup__text_type_name');
const popupProfession = document.querySelector('.popup__text_type_profession');
const popupForm = document.querySelector('.popup__container');


function onEditButtonClicked(event) {
    event.preventDefault();
    popup.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupProfession.value = profileProfession.textContent;
}

editButton.addEventListener('click', onEditButtonClicked);

function onCloseButtonClicked(event) {
    event.preventDefault();
    popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', onCloseButtonClicked);


function onSubmitForm(event) {
    event.preventDefault();
    profileName.textContent = popupName.value; 
    profileProfession.textContent = popupProfession.value;
    popup.classList.remove('popup_opened');
}

popupForm.addEventListener('submit', onSubmitForm);