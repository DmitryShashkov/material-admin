import { Component } from '@angular/core';
import { ArticleNode } from '../../models/ArticleNode';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {AddOrEditNodeComponent} from "./add-or-edit-node/add-or-edit-node.component";


@Component({
    selector: 'app-articles-add-and-edit',
    templateUrl: './articles-add-and-edit.component.html',
    styleUrls: ['./articles-add-and-edit.component.scss'],
})
export class ArticlesAddAndEditComponent {
    constructor (
        private dialog: MatDialog,
    ) {}

    public nodes: ArticleNode[] = [];

    public addNode (node: ArticleNode) : void {
        this.nodes.push(node);
    }

    public openAddNodeModal () : void {
        const options: MatDialogConfig = {
            minWidth: 400,
        };
        this.dialog.open(AddOrEditNodeComponent, options);
    }
}
