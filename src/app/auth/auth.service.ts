import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { User } from "./user.model";

@Injectable({ providedIn: 'root' })
export class AuthService{
    user = new BehaviorSubject<User>(null!);

    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) {}

    register (user: User) {
        return this.http.post<AuthResponseData>('http://localhost:3000/users', { userName: user.userName, password: user.password, email: user.email, token: user.userName + 'Token', tokenExpirationTimer: 1000 })
        .pipe(catchError(this.handleError), tap(resData => {
            //console.log(resData)
            this.handleAuthentication({userName: resData.userName, password: resData.password, email: resData.email})
        }));
    }
    
    login (user: User) {
        let resUser: AuthResponseData = null!;
        
        return this.http.get<AuthResponseData[]>('http://localhost:3000/users')
        .pipe(map(users => {
            users.map(_user => {
                if (_user.userName === user.userName && _user.password === user.password)
                {
                    resUser = _user;
                }
            });
            if (resUser) {
                //alert('Welcome back ' + resUser.userName);
            }
            else {
                alert('Invalid credentials!');
            }
            return resUser;
        }),
        catchError(this.handleError), tap(resData => {
            this.handleAuthentication({userName: resData.userName, token: resData.token, tokenExpirationTimer: resData.tokenExpirationTimer})
        }));
    }

    logout() {
        this.user.next(null!);
        this.router.navigate(['/']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogin() {
        const userData: {
            userName: string, tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData')!);
        if (!userData) {
            return;
        }
        const loadedUser = {userName: userData.userName, token: '', password: '', tokenExpirationDate: new Date(userData.tokenExpirationDate)};
        
        //if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        //}
    }

    autoLogout(expirationDuration: number) {
        //console.log(expirationDuration)
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(user: AuthResponseData) {
        const tokenExpirationDate = new Date(new Date().getTime() + user.tokenExpirationTimer! * 1000);
        const _user = new User(user.userName, user.email, '', user.token ? user.token : '', tokenExpirationDate);
        this.user.next(_user);
        this.autoLogout(user.tokenExpirationTimer! * 1000);
        localStorage.setItem('userData', JSON.stringify({
            userName: _user.userName,
            tokenExpirationDate: tokenExpirationDate.toLocaleString()
        }));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';

        if (!errorRes.error || !errorRes.error.error)
        {
            return throwError(() => new Error(errorMessage))
        }
        switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This emial exists already';
        }
        return throwError(() => new Error(errorMessage));
        }
}

export interface AuthResponseData { // encrypt password
    userName: string,
    email?: string,
    password?: string,
    token?: string,
    tokenExpirationTimer?: number
}