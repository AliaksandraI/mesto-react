import React from 'react';
import deleteButtonPath from '../images/delete_button.svg';
import notFoundImagePath from '../images/not_found.svg';

class Card extends React.Component {

    constructor(props) {
        super(props);
    }

    onImageNotFound = (evt) => {
        evt.target.onerror = null;
        evt.target.src = notFoundImagePath;
    }

    onCardClick = () => {
        this.props.onCardClick(this.props.card);
    }

    render () {
        return (
            <div className="elements__item" key={this.props.card._id}>
                        <img onError={this.onImageNotFound} onClick={this.onCardClick} className="elements__item-picture" alt="Картинка" src={this.props.card.link}></img>
                        <div className="elements__item-info">
                            <h2 className="elements__item-title">{this.props.card.name}</h2>
                            <div className="elements__likes-container">
                                <button aria-label="like" type="button" className={`elements__heart-button  ${this.props.card.likes.find((like) => like._id === this.props.currentUserId) ?  "elements__heart-button_active" : "" }  `}>
                                </button>
                                <p className="elements__likes">{this.props.card.likes ? this.props.card.likes.length : 0}</p>
                            </div>
                        </div>
                        <button aria-label="delete" type="button" className="elements__delete-button">
                            <img src={deleteButtonPath} alt="Знак корзины"></img>
                        </button>
            </div>
        );
    }
}    


export default Card;
