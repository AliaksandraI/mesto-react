import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


class EditProfilePopup extends React.Component {
    
    static contextType = CurrentUserContext;

    constructor(props) {
        super(props);

        this.state = {
            name: 'Sasha',
            description: 'null'
        }
    }

   componentDidMount() {
        console.log('EditProfile');
        //if(this.context != null)
        //    this.setState({name: this.context.name, description: this.context.about});
    }
    

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
        console.log(this.context);
    }

    handleDescriptionChange = (event) => {
        this.setState({description: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onUpdateUser(this.state.name, this.state.description);
    }

    render () {

        //this.setState({name: this.context.name, description: this.context.about});

        return (
            <PopupWithForm name="profile" title="Редактировать профиль" buttonName="Сохранить" isSubmitActive={false} isOpen={this.props.isOpen}  onClose={this.props.onClose} onSubmit={this.handleSubmit}>
                <input id="name-input" type="text" required minLength="2" maxLength="40"
                    pattern="[A-Za-zА-Яа-яЁё\s\-]+$" placeholder="Имя"
                    className="popup__text popup__text_type_name form__input"
                    onChange={this.handleNameChange}
                    value={this.state.name}></input>
                <span id="name-input-error" className="form__input-error"></span>
                <input id="profession-input" type="text" required minLength="2" maxLength="200"
                    pattern="[A-Za-zА-Яа-яЁё\s\-,]+$" placeholder="О себе"
                    className="popup__text popup__text_type_profession form__input"
                    onChange={this.handleDescriptionChange}
                    value={this.state.description}></input>
                <span id="profession-input-error" className="form__input-error"></span>
            </PopupWithForm>
        )
    }
}


export default EditProfilePopup;