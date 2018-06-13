import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignInComponent } from '../../sign-in/sign-in.component';
import { UNAUTHORIZED_LAYOUT_ROUTES } from './unauthorized-layout.routes';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UNAUTHORIZED_LAYOUT_ROUTES),
    ],
    declarations: [
        SignInComponent,
    ],
})
export class UnauthorizedLayoutModule { }
