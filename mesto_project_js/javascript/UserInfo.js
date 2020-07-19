export class UserInfo {
    constructor (nameSelector, professionSelector, avatarSelector) {
        this._name = document.querySelector(nameSelector);
        this._profession = document.querySelector(professionSelector);
        this._avatar = document.querySelector(avatarSelector);
        this._id = null;
    }

    setAvatar(link){
        this._avatar.src = link;
    };

    getUserInfo () {
        return {
            name: this._name.textContent, 
            profession: this._profession.textContent
        };
    };

    setUserInfo (newName, newProfession, newId) {
        this._name.textContent = newName;
        this._profession.textContent = newProfession;
        this._id = newId
    }

    getId () {
        return this._id;
    }

}
