import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SIGN_IN_CONTROLS_CONFIG } from './form-config';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerError } from '../../types/server-error';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../../models/user.model';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
    public readonly signInForm: FormGroup;

    constructor (
        private usersService: UsersService,
        private formBuilder: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
    ) {
        this.signInForm = this.formBuilder.group(SIGN_IN_CONTROLS_CONFIG);
    }

    public signIn () {
        if (this.signInForm.invalid) { return; }

        this.usersService
            .signIn(this.signInForm.value.email, this.signInForm.value.password)
            .subscribe(this.handleSignInSuccess.bind(this), this.handleSignInFailure.bind(this));
    }

    private handleSignInSuccess (user: UserModel) {
        this.router.navigateByUrl('/');
    }

    private handleSignInFailure (response: HttpErrorResponse) {
        const error: ServerError = response.error;
        this.toastr.error(error.message);

        this.signInForm.reset();
    }
}
