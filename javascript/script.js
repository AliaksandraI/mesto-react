
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const submitButton = document.querySelector('.popup__button');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const popupName = document.querySelector('.popup__text_type_name');
const popupProfession = document.querySelector('.popup__text_type_profession');
const popupForm = document.querySelector('.popup__container');

//вспомогательная функция открытия/закрытия формы
function togglePopup() {
    popup.classList.toggle('popup_opened');
    popup.classList.toggle('popup_closed');
}


//функция открытия формы по нажатию на кнопку Edit
function onEditButtonClicked(event) {
    event.preventDefault();
    togglePopup();
    popupName.value = profileName.textContent;
    popupProfession.value = profileProfession.textContent;
}

//функция закрытия формы по нажатию на кнопку Close, изменения не сохраняются
function onCloseButtonClicked(event) {
    event.preventDefault();
    togglePopup();
}

//функция закрытия формы и сохранения внесенных изменения по нажатию на кнопку Submit
function onSubmitForm(event) {
    event.preventDefault();
    profileName.textContent = popupName.value; 
    profileProfession.textContent = popupProfession.value;
    togglePopup();
}

editButton.addEventListener('click', onEditButtonClicked);

closeButton.addEventListener('click', onCloseButtonClicked);

popupForm.addEventListener('submit', onSubmitForm);