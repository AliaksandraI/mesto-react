import React from 'react';
import closeButtonPath from '../images/close_button.svg';
import notFoundImagePath from '../images/not_found.svg';

class ImagePopup extends React.Component {
    render () {
        return (
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
        );
    }
}    



export default ImagePopup;