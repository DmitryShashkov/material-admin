import { NgModule } from '@angular/core';
import { ArticlesAddAndEditComponent } from './articles-add-and-edit.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ARTICLES_ADD_AND_EDIT_ROUTES } from './articles-add-and-edit.routes';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddOrEditNodeComponent } from './add-or-edit-node/add-or-edit-node.component';
import { ConfigureArticleHeaderComponent } from './add-or-edit-node/configure-article-header/configure-article-header.component';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';
import { NodeCardComponent } from './node-card/node-card.component';
import { DndModule } from 'ng2-dnd';
import { ConfigureCommonTextComponent } from './add-or-edit-node/configure-common-text/configure-common-text.component';
import { ArticleSettingsComponent } from './article-settings/article-settings.component';
import { ConfigureTagsComponent } from './article-settings/configure-tags/configure-tags.component';
import { ConfigureImageComponent } from './add-or-edit-node/configure-image/configure-image.component';
import { ConfigureSectionTitleComponent } from './add-or-edit-node/configure-section-title/configure-section-title.component';
import {ConfigureKeyMomentComponent} from "./add-or-edit-node/configure-key-moment/configure-key-moment.component";

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatRadioModule,
        DndModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
        DirectivesModule,
        PipesModule,
        RouterModule.forChild(ARTICLES_ADD_AND_EDIT_ROUTES),
    ],
    declarations: [
        ArticlesAddAndEditComponent,
        ArticleSettingsComponent,
        AddOrEditNodeComponent,
        NodeCardComponent,
        ConfigureArticleHeaderComponent,
        ConfigureSectionTitleComponent,
        ConfigureCommonTextComponent,
        ConfigureImageComponent,
        ConfigureKeyMomentComponent,
        ConfigureTagsComponent,
    ],
    entryComponents: [
        ArticleSettingsComponent,
        AddOrEditNodeComponent,
    ],
    exports: [],
})
export class ArticlesAddAndEditModule { }
