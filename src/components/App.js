import React from 'react';

import './App.css';

function App() {
  return (
    <div className="App">
      
      <main className="content">
            <section className="profile">
                <div className="profile__info">
                    <div className="profile__avatar">
                        <img src="images/pen.svg" className="profile_active" alt=" Изменение аватарки"></img>
                        <img onerror="this.onerror=null;this.src='images/not_found.svg';" className="profile__image" alt="Аватар"></img>
                    </div>
                    <div>
                        <div className="profile__name-container">
                            <h1 className="profile__name"></h1>
                            <button aria-label="edit" type="button" className="profile__edit-button">
                                <img src="./images/edit__button.svg" alt="Кнопка изменения"></img>
                            </button>
                        </div>
                        <p className="profile__profession"></p>
                    </div>
                </div>
                <button aria-label="add" type="button" className="profile__add-button">
                    <img src="./images/add__button.svg" className="profile__add-button-image" alt="Кнопка добавления"></img>
                </button>
            </section>

            <section className="elements">
            </section>

            <template id="card-template">
                <div className="elements__item">
                    <img onerror="this.onerror=null;this.src='images/not_found.svg';" className="elements__item-picture" alt="Картинка"></img>
                    <div className="elements__item-info">
                        <h2 className="elements__item-title"></h2>
                        <div className="elements__likes-container">
                            <button aria-label="like" type="button" className="elements__heart-button">
                            </button>
                            <p className="elements__likes"></p>
                        </div>
                    </div>
                    <button aria-label="delete" type="button" className="elements__delete-button">
                        <img src="./images/delete_button.svg" alt="Знак корзины"></img>
                    </button>
                </div>
            </template>

            <section className="popup popup_picture">
                <div className="popup__container popup__container_picture">
                    <img onerror="this.onerror=null;this.src='images/not_found.svg';"
                        alt="картинка" className="popup__image"></img>
                    <h2 className="popup__title popup__title_picture"></h2>
                    <button aria-label="close" type="button" className="popup__close-button">
                        <img src="./images/close_button.svg" alt="Кнопка закрыть" className="popup__close-button-image"></img>
                    </button>
                </div>
            </section>

            <section className="popup popup_profile">
                <form name="popup-form" method="get" action="#" className="popup__container form" novalidate>
                    <h2 className="popup__title">Редактировать профиль</h2>
                    <input id="name-input" type="text" required minlength="2" maxlength="40"
                        pattern="[A-Za-zА-Яа-яЁё\s\-]+$" value="name" placeholder="Имя"
                        className="popup__text popup__text_type_name form__input"></input>
                    <span id="name-input-error" className="form__input-error"></span>
                    <input id="profession-input" type="text" required minlength="2" maxlength="200"
                        pattern="[A-Za-zА-Яа-яЁё\s\-,]+$" value="profession" placeholder="О себе"
                        className="popup__text popup__text_type_profession form__input"></input>
                    <span id="profession-input-error" className="form__input-error"></span>
                    <button type="submit" className="popup__button form__submit form__submit_inactive">Сохранить</button>
                    <button aria-label="close" type="button" className="popup__close-button">
                        <img src="./images/close_button.svg" alt="Кнопка закрыть" className="popup__close-button-image"></img>
                    </button>
                </form>
            </section>

            <section className="popup popup_card">
                <form name="popup-add-form" method="get" action="#" className="popup__container form" novalidate>
                    <h2 className="popup__title">Новое место</h2>
                    <input id="picture-input" type="text" required minlength="1" maxlength="30" placeholder="Название"
                        className="popup__text popup__text_type_picture form__input"></input>
                    <span id="picture-input-error" className="form__input-error"></span>
                    <input id="url-input" type="url" required placeholder="Ссылка на картинку"
                        className="popup__text popup__text_type_link form__input"></input>
                    <span id="url-input-error" className="form__input-error"></span>
                    <button type="submit" className="popup__button form__submit">Создать</button>
                    <button aria-label="close" type="button" className="popup__close-button">
                        <img src="./images/close_button.svg" alt="Кнопка закрыть" className="popup__close-button-image"></img>
                    </button>
                </form>
            </section>

            <section className="popup popup_check">
                <div className="popup__container">
                    <h2 className="popup__title popup__title_check">Вы уверены?</h2>
                    <button type="button" className="popup__button">Да</button>
                    <button aria-label="close" type="button" className="popup__close-button">
                        <img src="./images/close_button.svg" alt="Кнопка закрыть" className="popup__close-button-image"></img>
                    </button>
                </div>
            </section>



            <section className="popup popup_avatar">
                <form name="popup-add-form" method="get" action="#" className="popup__container form" novalidate>
                    <h2 className="popup__title">Обновить аватар</h2>
                    <input id="url-input" type="url" required placeholder="Ссылка на аватар"
                        className="popup__text popup__text_type_link form__input"></input>
                    <span id="url-input-error" className="form__input-error"></span>
                    <button type="submit" className="popup__button form__submit">Сохранить</button>
                    <button aria-label="close" type="button" className="popup__close-button">
                        <img src="./images/close_button.svg" alt="Кнопка закрыть" className="popup__close-button-image"></img>
                    </button>
                </form>
            </section>


        </main>




    </div>
  );
}

export default App;
