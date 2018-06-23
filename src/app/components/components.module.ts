import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { MatDialogModule } from '@angular/material';
import {MdeEditorComponent} from "./mde-editor/mde-editor.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatDialogModule,
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        ImagePreviewComponent,
        ConfirmationComponent,
        MdeEditorComponent,
    ],
    exports: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        ImagePreviewComponent,
        MdeEditorComponent,
    ],
    entryComponents: [
        ConfirmationComponent,
    ],
})
export class ComponentsModule { }
