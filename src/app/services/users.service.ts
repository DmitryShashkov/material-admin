import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SignInDto } from './types/sign-in.dto';
import { UserModel } from '../models/user.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UsersService {
    public readonly userSubject: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);

    constructor (
        private http: HttpClient,
    ) { }

    public signIn (email: string, password: string) : Observable<UserModel> {
        const url: string = '/users/sessions';
        const payload: SignInDto = { email, password };

        return this.http.post<UserModel>(url, payload)
            .map((data: any) => new UserModel(data))
            .do((user: UserModel) => {
                this.userSubject.next(user);
            });
    }

    public signOut () {}
}
