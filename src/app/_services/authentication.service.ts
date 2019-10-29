import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Config} from '../../config'
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        console.log('CONFIG URL:',Config.apiUrl);
        return this.http.post<any>(`${Config.apiUrl}/authenticate`, { username, password })
            .pipe(map(user => {
                console.log("user==>",user.token);
                //alert(user);
                localStorage.setItem('username', username);
                let tokenStr = 'Bearer '+user.token;
                localStorage.setItem('token', tokenStr);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                let users:User = {id: 0, username: username, password: password,firstName: '',lastName:''
                    ,token: tokenStr}

                this.currentUserSubject.next(users);
                return users;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        localStorage.removeItem('username');
        this.currentUserSubject.next(null);
    }
}