import React from 'react';
import PopupWithForm from './PopupWithForm';

import closeButtonPath from '../images/close_button.svg';

import penPath from '../images/pen.svg';
import notFoundImagePath from '../images/not_found.svg';
import editButtonPath from '../images/edit__button.svg';
import addButtonPath from '../images/add__button.svg';
import deleteButtonPath from '../images/delete_button.svg';



class Main extends React.Component {
  
    render () {

        return (
            <main className="content">
                <section className="profile">
                    <div className="profile__info">
                        <div className="profile__avatar">
                            <img src={penPath} className="profile_active" alt=" Изменение аватарки"></img>
                            <img onError={() => { this.onerror = null; this.src = notFoundImagePath; }} 
                            onClick={this.handleEditAvatarClick} 
                            className="profile__image" alt="Аватар"></img>
                        </div>
                        <div>
                            <div className="profile__name-container">
                                <h1 className="profile__name"></h1>
                                <button aria-label="edit" type="button" 
                                onClick={this.handleEditProfileClick} 
                                className="profile__edit-button">
                                    <img src={editButtonPath} alt="Кнопка изменения"></img>
                                </button>
                            </div>
                            <p className="profile__profession"></p>
                        </div>
                    </div>
                    <button aria-label="add" type="button"
                    onClick={this.handleAddPlaceClick}
                    className="profile__add-button">
                        <img src={addButtonPath} className="profile__add-button-image" alt="Кнопка добавления"></img>
                    </button>
                </section>

                <section className="elements">
                </section>

                <template id="card-template">
                    <div className="elements__item">
                        <img onError={() => { this.onerror = null; this.src = notFoundImagePath; }} className="elements__item-picture" alt="Картинка"></img>
                        <div className="elements__item-info">
                            <h2 className="elements__item-title"></h2>
                            <div className="elements__likes-container">
                                <button aria-label="like" type="button" className="elements__heart-button">
                                </button>
                                <p className="elements__likes"></p>
                            </div>
                        </div>
                        <button aria-label="delete" type="button" className="elements__delete-button">
                            <img src={deleteButtonPath} alt="Знак корзины"></img>
                        </button>
                    </div>
                </template>

                <section className="popup popup_picture">
                    <div className="popup__container popup__container_picture">
                        <img onError={() => { this.onerror = null; this.src = notFoundImagePath; }}
                            alt="картинка" className="popup__image"></img>
                        <h2 className="popup__title popup__title_picture"></h2>
                        <button aria-label="close" type="button" className="popup__close-button">
                            <img src={closeButtonPath} alt="Кнопка закрыть" className="popup__close-button-image"></img>
                        </button>
                    </div>
                </section>

                <PopupWithForm name="profile" title="Редактировать профиль" isSubmitActive={false} >
                <input id="name-input" type="text" required minLength="2" maxLength="40"
                            pattern="[A-Za-zА-Яа-яЁё\s\-]+$" defaultValue="name" placeholder="Имя"
                            className="popup__text popup__text_type_name form__input"></input>
                        <span id="name-input-error" className="form__input-error"></span>
                        <input id="profession-input" type="text" required minLength="2" maxLength="200"
                            pattern="[A-Za-zА-Яа-яЁё\s\-,]+$" defaultValue="profession" placeholder="О себе"
                            className="popup__text popup__text_type_profession form__input"></input>
                        <span id="profession-input-error" className="form__input-error"></span>
                </PopupWithForm>



                <PopupWithForm name="card" title="Новое место" isSubmitActive={true}>
                        <input id="picture-input" type="text" required minLength="1" maxLength="30" placeholder="Название"
                            className="popup__text popup__text_type_picture form__input"></input>
                        <span id="picture-input-error" className="form__input-error"></span>
                        <input id="url-input" type="url" required placeholder="Ссылка на картинку"
                            className="popup__text popup__text_type_link form__input"></input>
                        <span id="url-input-error" className="form__input-error"></span>
                </PopupWithForm>



                <section className="popup popup_check">
                    <div className="popup__container">
                        <h2 className="popup__title popup__title_check">Вы уверены?</h2>
                        <button type="button" className="popup__button">Да</button>
                        <button aria-label="close" type="button" className="popup__close-button">
                            <img src={closeButtonPath} alt="Кнопка закрыть" className="popup__close-button-image"></img>
                        </button>
                    </div>
                </section>



                <PopupWithForm name="avatar" title="Обновить аватар" isSubmitActive={true}>
                    <input id="url-input" type="url" required placeholder="Ссылка на аватар"
                            className="popup__text popup__text_type_link form__input"></input>
                    <span id="url-input-error" className="form__input-error"></span>
                </PopupWithForm>


            </main>
        );
    }

    handleEditAvatarClick = () => {
        document.querySelector('.popup_avatar').classList.add('popup_opened');
    }

    handleEditProfileClick = () => {
        document.querySelector('.popup_profile').classList.add('popup_opened');
    }

    handleAddPlaceClick = () => {
        document.querySelector('.popup_card').classList.add('popup_opened');
    }


}






export default Main;
