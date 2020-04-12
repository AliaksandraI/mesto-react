
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const submitButton = document.querySelector('.popup__button');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const popupName = document.querySelector('.popup__text_type_name');
const popupProfession = document.querySelector('.popup__text_type_profession');
const popupForm = document.querySelector('.popup__container');

//функция открытия формы по нажатию на кнопку Edit
function onEditButtonClicked(event) {
    event.preventDefault();
    popup.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupProfession.value = profileProfession.textContent;
}

//функция закрытия формы по нажатию на кнопку Close, изменения не сохраняются
function onCloseButtonClicked(event) {
    event.preventDefault();
    popup.classList.remove('popup_opened');
}

//функция закрытия формы и сохранения внесенных изменения по нажатию на кнопку Submit
function onSubmitForm(event) {
    event.preventDefault();
    profileName.textContent = popupName.value; 
    profileProfession.textContent = popupProfession.value;
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', onEditButtonClicked);

closeButton.addEventListener('click', onCloseButtonClicked);

popupForm.addEventListener('submit', onSubmitForm);