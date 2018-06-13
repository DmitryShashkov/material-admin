import { Routes } from '@angular/router';
import { SignInComponent } from '../../sign-in/sign-in.component';

export const UNAUTHORIZED_LAYOUT_ROUTES: Routes = [
    {
        path: 'sign-in',
        component: SignInComponent,
    },
];
