import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SignInDto } from './types/sign-in.dto';
import { UserModel } from '../models/user.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Storage } from '../utils/storage';

@Injectable()
export class UsersService {
    private static readonly USER_STORAGE_ALIAS: string = 'user';
    private readonly storage: Storage<UserModel>;

    public readonly userSubject: BehaviorSubject<UserModel>;

    constructor (
        private http: HttpClient,
    ) {
        this.storage = new Storage<UserModel>(UsersService.USER_STORAGE_ALIAS);
        this.userSubject = new BehaviorSubject<UserModel>(this.storage.restoreAs(UserModel));
    }

    public signIn (email: string, password: string) : Observable<UserModel> {
        const url: string = '/users/sessions';
        const payload: SignInDto = { email, password };

        return this.http.post<UserModel>(url, payload)
            .map((data: any) => new UserModel(data))
            .do((user: UserModel) => {
                this.storage.save(user);
                this.userSubject.next(user);
            });
    }

    public signOut () {}
}
