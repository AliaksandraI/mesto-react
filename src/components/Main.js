import React from 'react';

import penPath from '../images/pen.svg';
import notFoundImagePath from '../images/not_found.svg';
import editButtonPath from '../images/edit__button.svg';
import addButtonPath from '../images/add__button.svg';
import deleteButtonPath from '../images/delete_button.svg';



class Main extends React.Component {
  
    constructor(props) {
        super(props);
    }


    render () {

        return (
            <main className="content">
                <section className="profile">
                    <div className="profile__info">
                        <div className="profile__avatar">
                            <img src={penPath} className="profile_active" alt=" Изменение аватарки"></img>
                            <img onError={() => { this.onerror = null; this.src = notFoundImagePath; }} 
                            onClick={this.props.onEditAvatar} 
                            className="profile__image" alt="Аватар"></img>
                        </div>
                        <div>
                            <div className="profile__name-container">
                                <h1 className="profile__name"></h1>
                                <button aria-label="edit" type="button" 
                                onClick={this.props.onEditProfile} 
                                className="profile__edit-button">
                                    <img src={editButtonPath} alt="Кнопка изменения"></img>
                                </button>
                            </div>
                            <p className="profile__profession"></p>
                        </div>
                    </div>
                    <button aria-label="add" type="button"
                    onClick={this.props.onAddPlace}
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


            </main>
        );
    }

}






export default Main;
