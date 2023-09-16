export class User {
    constructor(
        public userName: string,
        public email?: string,
        private _password?: string,
        private _token?: string,
        public tokenExpirationDate?: Date
        ) {}

    get token() {
        if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
            return '';
        }
        return this._token;
    }

    get password()  {
        return this._password; // to be added: encryption
    }

    // set password(password: string | undefined) { // to be removed for security
    //     this._password = password;
    // }
}