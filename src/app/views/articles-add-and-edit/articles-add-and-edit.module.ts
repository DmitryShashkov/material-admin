import {NgModule} from "@angular/core";
import {ArticlesAddAndEditComponent} from "./articles-add-and-edit.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ARTICLES_ADD_AND_EDIT_ROUTES} from "./articles-add-and-edit.routes";
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddOrEditNodeComponent} from "./add-or-edit-node/add-or-edit-node.component";
import {ConfigureArticleHeaderComponent} from "./add-or-edit-node/configure-article-header/configure-article-header.component";
import {ComponentsModule} from "../../components/components.module";
import {DirectivesModule} from "../../directives/directives.module";

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
        DirectivesModule,
        RouterModule.forChild(ARTICLES_ADD_AND_EDIT_ROUTES),
    ],
    declarations: [
        ArticlesAddAndEditComponent,
        AddOrEditNodeComponent,
        ConfigureArticleHeaderComponent,
    ],
    entryComponents: [
        AddOrEditNodeComponent,
    ],
    exports: [],
})
export class ArticlesAddAndEditModule { }
