import {CanActivate, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Observable';
import { UsersService } from '../services/users.service';
import { UserModel } from '../models/user.model';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    constructor (
        private usersService: UsersService,
        private router: Router,
    ) { }

    public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {
        return this.usersService.userSubject.map((user: UserModel) => {
            if (!user) {
                this.router.navigateByUrl('/sign-in');
            }
            return !!user;
        });
    }
}
