import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UsersService } from '../services/users.service';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Headers } from '../enums/headers.enum';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor (
        private usersService: UsersService,
    ) { }

    public intercept (
        request: HttpRequest<any>,
        next: HttpHandler,
    ) : Observable<HttpEvent<any>> {
        const user: UserModel = this.usersService.userSubject.getValue();

        if (!user) {
            return next.handle(request);
        }

        const authHeaderValue: string = `Bearer ${user.currentToken}`;
        const headers: HttpHeaders = request.headers.append(Headers.AUTHORIZATION, authHeaderValue);
        const updateOptions = { headers };

        return next.handle(request.clone(updateOptions));
    }
}
