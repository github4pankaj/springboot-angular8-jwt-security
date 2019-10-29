import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import {Config} from '../../config'
@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    headerDict = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYXZhaW51c2UiLCJleHAiOjE1NzIyNzQyMzcsImlhdCI6MTU3MjI1NjIzN30.IZqD_9f4_OqyhJrsjtVtNuBuoQwK4USxDvqx8nkyLJ43WdEV1Lbt_YTIu3rq0zUDeKzdMpUMfc4SAI8bgTcnLQ'
      }
    getAll() {
        return this.http.get<User[]>(`${Config.apiUrl}/users`,{ headers: this.headerDict});
    }

    register(user: User) {
        return this.http.post(`${Config.apiUrl}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${Config.apiUrl}/users/${id}`);
    }
}