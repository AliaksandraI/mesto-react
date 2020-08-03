import React from 'react';

import api from '../utils/Api';
import Card from './Card';

import penPath from '../images/pen.svg';
import notFoundImagePath from '../images/not_found.svg';
import editButtonPath from '../images/edit__button.svg';
import addButtonPath from '../images/add__button.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';



class Main extends React.Component {
  
    static contextType = CurrentUserContext;

    constructor(props) {
        super(props);

        this.state = {
           cards:[]
        }
    }

    componentDidMount() {
        api.getInitialCards()
        .then(cards => {
            this.setState({ cards: cards });
        }).catch(err => {
            console.log(err);
        });
    }

    onImageNotFound = (evt) => {
        evt.target.onerror = null;
        evt.target.src = notFoundImagePath;
    }


    handleCardLike = (card) => {
        const isLiked = card.likes.find((like) => like._id === this.context._id);
        const promise = isLiked ? api.dislikeCard(card._id) : api.likeCard(card._id);

        promise.then((newCard) => {
            const newCards = this.state.cards.map((c) => c._id === card._id ? newCard : c);
            this.setState({cards: newCards});
        });
    }


    handleCardDelete = (card) => {

        api.deleteCard(card._id)
            .then((deletedCard) => {
            const newCards = this.state.cards.filter((c) => c._id !== deletedCard._id);
            this.setState({cards: newCards});
        });
    }

    render () {
        
        return (
            <main className="content">
                <section className="profile">
                    <div className="profile__info">
                        <div className="profile__avatar">
                            <img src={penPath} className="profile_active" alt=" Изменение аватарки"></img>
                            <img src={this.context && this.context.avatar} 
                                onError={this.onImageNotFound} 
                                onClick={this.props.onEditAvatar} 
                                className="profile__image" alt="Аватар"></img>
                        </div>
                        <div>
                            <div className="profile__name-container">
                                <h1 className="profile__name">{this.context && this.context.name}</h1>
                                <button aria-label="edit" type="button" 
                                onClick={this.props.onEditProfile} 
                                className="profile__edit-button">
                                    <img src={editButtonPath} alt="Кнопка изменения"></img>
                                </button>
                            </div>
                                <p className="profile__profession">{this.context && this.context.about}</p>
                        </div>
                    </div>
                    <button aria-label="add" type="button"
                    onClick={this.props.onAddPlace}
                    className="profile__add-button">
                        <img src={addButtonPath} className="profile__add-button-image" alt="Кнопка добавления"></img>
                    </button>
                </section>

                <section className="elements">
                
                    {this.state.cards.map((card) => (
                        
                        <Card  card={card} currentUserId={this.context && this.context._id} key={card._id} onCardClick={this.props.onCardClick} onCardLike={this.handleCardLike} onCardDelete={this.handleCardDelete}/>
                        
                        )
                    )}

                </section>


            </main>
        );
    }

}






export default Main;
