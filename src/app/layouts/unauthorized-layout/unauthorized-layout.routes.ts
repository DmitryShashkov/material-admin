import { Routes } from '@angular/router';
import { SignInComponent } from '../../views/sign-in/sign-in.component';

export const UNAUTHORIZED_LAYOUT_ROUTES: Routes = [
    {
        path: 'sign-in',
        component: SignInComponent,
    },
];
