import React from 'react';

import api from '../utils/Api';
import Card from './Card';

import penPath from '../images/pen.svg';
import notFoundImagePath from '../images/not_found.svg';
import editButtonPath from '../images/edit__button.svg';
import addButtonPath from '../images/add__button.svg';




class Main extends React.Component {
  
    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            userName: null,
            userDescription: null,
            userAvatar: null,
            cards:[]
        }
    }

    componentDidMount() {
        api.getUserInfo()
        .then (user => {
            this.setState({ userId: user._id,
                            userName: user.name,
                            userDescription: user.about,
                            userAvatar: user.avatar
            });
        })
        .catch(err => {
            console.log(err);
        }); 


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

    render () {

        return (
            <main className="content">
                <section className="profile">
                    <div className="profile__info">
                        <div className="profile__avatar">
                            <img src={penPath} className="profile_active" alt=" Изменение аватарки"></img>
                            <img src={this.state.userAvatar} 
                                onError={this.onImageNotFound} 
                                onClick={this.props.onEditAvatar} 
                                className="profile__image" alt="Аватар"></img>
                        </div>
                        <div>
                            <div className="profile__name-container">
                                <h1 className="profile__name">{this.state.userName}</h1>
                                <button aria-label="edit" type="button" 
                                onClick={this.props.onEditProfile} 
                                className="profile__edit-button">
                                    <img src={editButtonPath} alt="Кнопка изменения"></img>
                                </button>
                            </div>
                                <p className="profile__profession">{this.state.userDescription}</p>
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
   
                        <Card  card={card} currentUserId={this.state.userId} key={card._id} onCardClick={this.props.onCardClick}/>
                        )
                    )}

                </section>


            </main>
        );
    }

}






export default Main;
