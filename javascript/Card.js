export class Card {
    constructor(id, name, link, isLiked, likeCount, cardSelector, handleCardClick, handleLikeClick) {
        this._id = id;
        this._name = name;
        this._link = link;
        this._isLiked = isLiked;
        this._likeCount = likeCount;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .cloneNode(true);

        return cardElement;
    };

    _deleteCard(evt) {
        evt.target.parentElement.parentElement.remove();
    };

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick(this);
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

        this._likeButton = this._element.querySelector('.elements__heart-button');
        this._element.querySelector('.elements__item-title').textContent = this._name;
        this._element.querySelector('.elements__item-picture').src = this._link;
        this._likeElement = this._element.querySelector('.elements__likes');

        this.setLikeCount(this._likeCount);

        this.toggleLike(this._isLiked);

        this._setEventListeners();

        return this._element;
    }

    getId() {
        return this._id;
    }

    isLiked() {
        return this._isLiked;
    }

    setLikeCount (likeCount) {
        this._likeCount = likeCount;
        if (this._likeCount === 0) {
            this._likeElement.textContent = ' ';
        } else {
            this._likeElement.textContent = likeCount;
        }
        
    };

    toggleLike(isLiked){ 
        this._isLiked = isLiked;
        this._likeButton.classList.toggle('elements__heart-button_active', isLiked);
    }
}