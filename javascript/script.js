
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