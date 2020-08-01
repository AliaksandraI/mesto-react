import React from 'react';

import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext} from '../contexts/CurrentUserContext';

import FakeAvatarPath from '../images/гора_эльбрус.jpg';

import '../index.css';

class App extends React.Component {

    constructor(){
        super();
        this.state = {
            isEditProfilePopupOpen: false,
            isAddPlacePopupOpen: false,
            isEditAvatarPopupOpen: false,
            selectedCard: null,
            currentUser: null
        }
    }

    componentDidMount() {
        
        api.getUserInfo()
        .then (user => {
            this.setState({currentUser: user});
        }).catch(err => {
            this.setState({currentUser: {
                _id: 123,
                name: 'fake user',
                about: 'because of no internet',
                avatar: FakeAvatarPath
            }});
            console.log(err);
        });
    } 

    render () {
        return (        
            <div className="page">
                <Header />

                <CurrentUserContext.Provider value={this.state.currentUser}>


                <Main
                    onEditAvatar={this.handleEditAvatarClick}
                    onEditProfile={this.handleEditProfileClick}
                    onAddPlace={this.handleAddPlaceClick}
                    onCardClick={this.handleCardClick}
                />

                <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups}>
                </ImagePopup>

                <PopupWithForm name="profile" title="Редактировать профиль" buttonName="Сохранить" isSubmitActive={false} isOpen={this.state.isEditProfilePopupOpen}  onClose={this.closeAllPopups}>
                <input id="name-input" type="text" required minLength="2" maxLength="40"
                            pattern="[A-Za-zА-Яа-яЁё\s\-]+$" defaultValue="name" placeholder="Имя"
                            className="popup__text popup__text_type_name form__input"></input>
                        <span id="name-input-error" className="form__input-error"></span>
                        <input id="profession-input" type="text" required minLength="2" maxLength="200"
                            pattern="[A-Za-zА-Яа-яЁё\s\-,]+$" defaultValue="profession" placeholder="О себе"
                            className="popup__text popup__text_type_profession form__input"></input>
                        <span id="profession-input-error" className="form__input-error"></span>
                </PopupWithForm>

                <PopupWithForm name="card" title="Новое место" buttonName="Сохранить" isSubmitActive={true} isOpen={this.state.isAddPlacePopupOpen} onClose={this.closeAllPopups}>
                        <input id="picture-input" type="text" required minLength="1" maxLength="30" placeholder="Название"
                            className="popup__text popup__text_type_picture form__input"></input>
                        <span id="picture-input-error" className="form__input-error"></span>
                        <input id="url-input" type="url" required placeholder="Ссылка на картинку"
                            className="popup__text popup__text_type_link form__input"></input>
                        <span id="url-input-error" className="form__input-error"></span>
                </PopupWithForm>

                <PopupWithForm name="check" title="Вы уверены?" buttonName="Да" isSubmitActive={true} isOpen={false} onClose={this.closeAllPopups}>
                </PopupWithForm>

                <PopupWithForm name="avatar" title="Обновить аватар" buttonName="Сохранить" isSubmitActive={true} isOpen={this.state.isEditAvatarPopupOpen} onClose={this.closeAllPopups}>
                    <input id="url-input" type="url" required placeholder="Ссылка на аватар"
                            className="popup__text popup__text_type_link form__input"></input>
                    <span id="url-input-error" className="form__input-error"></span>
                </PopupWithForm>

                </CurrentUserContext.Provider>

                <Footer />



            </div>  
        );
    }
    

    handleEditAvatarClick = () => {
        this.setState({ isEditAvatarPopupOpen: true });
    }
    
    handleEditProfileClick = () => {
        this.setState({ isEditProfilePopupOpen: true });
    }
    
    handleAddPlaceClick = () => {
        this.setState({ isAddPlacePopupOpen: true });
    }

    handleAddPlaceClick = () => {
        this.setState({ isAddPlacePopupOpen: true });
    }

    handleCardClick =(card) => {
        this.setState({selectedCard: card});
    }

    closeAllPopups = () => {
        this.setState({ isEditProfilePopupOpen: false,
            isAddPlacePopupOpen: false, 
            isEditAvatarPopupOpen: false,
            selectedCard: null
        });
    }


}

export default App;



