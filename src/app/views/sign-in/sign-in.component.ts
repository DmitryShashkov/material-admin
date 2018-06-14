import { Component } from '@angular/core';
import {UsersService} from "../../services/users.service";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
    constructor (
        private usersService: UsersService,
    ) { }

    public signIn () {
        this.usersService.signIn('test13@gmail.com', 'qweqwe')
            .subscribe(console.log, console.log);
    }
}
