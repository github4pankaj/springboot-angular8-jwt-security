import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
       /* let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }*/
        let currentUsr = this.authenticationService.currentUserValue;
        
        let currentUser = localStorage.getItem('username');
        let token = localStorage.getItem('token');
        console.log("USERNAME:",currentUser,token,JSON.stringify(currentUsr));
        if (currentUser && token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: 'Bearer '+token
                }
            });
        }
        return next.handle(request);
    }
}