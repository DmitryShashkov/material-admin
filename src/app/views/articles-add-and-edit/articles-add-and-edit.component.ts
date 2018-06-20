import { Component } from '@angular/core';
import { ArticleNode } from '../../models/ArticleNode';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { AddOrEditNodeComponent } from './add-or-edit-node/add-or-edit-node.component';
import { Subscription } from 'rxjs/Subscription';
import {BlogService} from "../../services/blog.service";
import {ImageElement} from "../../models/ImageElement";

@Component({
    selector: 'app-articles-add-and-edit',
    templateUrl: './articles-add-and-edit.component.html',
    styleUrls: ['./articles-add-and-edit.component.scss'],
})
export class ArticlesAddAndEditComponent {
    constructor (
        private dialog: MatDialog,
        private blogService: BlogService,
    ) { }

    public nodes: ArticleNode[] = [];

    public addNode (node: ArticleNode) : void {
        this.nodes.push(node);
        console.log(this.nodes);
    }

    private extractImages () : ImageElement[] {
        const images: ImageElement[] = [];

        for (const node of this.nodes) {
            for (const key in node) {
                if (node[key] instanceof ImageElement) {
                    images.push(node[key]);
                }
            }
        }

        return images;
    }

    public openAddNodeModal () : void {
        const options: MatDialogConfig = {
            width: '640px',
        };
        const dialogRef: MatDialogRef<AddOrEditNodeComponent>
            = this.dialog.open(AddOrEditNodeComponent, options);

        const dialogSubscription: Subscription = dialogRef.afterClosed()
            .subscribe((newNode: ArticleNode) => {
                this.addNode(newNode);
                dialogSubscription.unsubscribe();
            });
    }

    public publish () : void {
        const images: ImageElement[] = this.extractImages();
        this.blogService.uploadImages(images).subscribe(console.log, console.log);

        // this.blogService.publish(this.nodes).subscribe((res) => {
        //     console.log(res);
        // });
    }
}
