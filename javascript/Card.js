export class Card {
    constructor(name, link, cardSelector,handleCardClick) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .cloneNode(true);

        return cardElement;
    }

    _handleLikeClick(evt) {
        evt.target.classList.toggle('elements__heart-button_active');
    };

    _deleteCard(evt) {
        evt.target.parentElement.parentElement.remove();
    };

    _setEventListeners() {
        this._element.querySelector('.elements__heart-button').addEventListener('click', (evt) => {
            this._handleLikeClick(evt);
        });

        this._element.querySelector('.elements__item-picture').addEventListener('click', (evt) => {
            if(this._handleCardClick) {
                evt.preventDefault();
                this._handleCardClick(this._link, this._name);
            }
        });

        this._element.querySelector('.elements__delete-button').addEventListener('click', (evt) => {  
            this._deleteCard(evt);
        });

    };

    generateCard() {
        this._element = this._getTemplate();

        this._element.querySelector('.elements__item-title').textContent = this._name;
        this._element.querySelector('.elements__item-picture').src = this._link;

        this._setEventListeners();

        return this._element;
    }
}