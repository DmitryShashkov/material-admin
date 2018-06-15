import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignInComponent } from '../../views/sign-in/sign-in.component';
import { UNAUTHORIZED_LAYOUT_ROUTES } from './unauthorized-layout.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(UNAUTHORIZED_LAYOUT_ROUTES),
    ],
    declarations: [
        SignInComponent,
    ],
})
export class UnauthorizedLayoutModule { }
