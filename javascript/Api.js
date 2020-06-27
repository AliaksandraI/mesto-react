export class API {
    constructor(options) {
      this.baseUrl = options.baseUrl;
      this.headers = options.headers;
    }
    
    _get(url) {
        return fetch(`${this.baseUrl}/${url}`, {
          headers: {
            authorization: this.headers.authorization
          }
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getUserInfo() {
        return this._get('users/me');
    }


    getInitialCards() {
        return this._get('cards');
    }

    updateUserInfo(name,about) {
        fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
              authorization: this.headers.authorization,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              about: about
            })
        });
    }

    addNewCard(name,link){
        fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: {
              authorization: this.headers.authorization,
              'Content-Type': 'application/json'
            },
            mode: "no-cors",
            body: JSON.stringify({
              name: name,
              link: link
            })
        });
    }

}