import { Component } from '@angular/core';
import { ArticleNode } from '../../models/ArticleNode';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { AddOrEditNodeComponent } from './add-or-edit-node/add-or-edit-node.component';
import { Subscription } from 'rxjs/Subscription';
import {BlogService} from "../../services/blog.service";
import {ImageElement} from "../../models/ImageElement";
import {Observable} from "rxjs/Observable";
import {UploadImagesResponse} from "../../services/types/upload-images.response";
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/never';
import 'rxjs/add/observable/of';
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {ServerErrorResponse} from "../../services/types/server-error.response";
import {OpenEditModalDto} from "./types/open-edit-modal.dto";
import {ConfirmationService} from "../../services/confirmation.service";

@Component({
    selector: 'app-articles-add-and-edit',
    templateUrl: './articles-add-and-edit.component.html',
    styleUrls: ['./articles-add-and-edit.component.scss'],
})
export class ArticlesAddAndEditComponent {
    constructor (
        private dialog: MatDialog,
        private blogService: BlogService,
        private toastr: ToastrService,
        private confirmation: ConfirmationService,
    ) { }

    public nodes: ArticleNode[] = [];

    private addNode (node: ArticleNode) : void {
        if (node) {
            this.nodes.push(node);
        }

        console.log(this.nodes);
    }

    private replaceNode (nodeIndex: number, newNode: ArticleNode) : void {
        if (newNode) {
            this.nodes[nodeIndex] = newNode;
        }
    }

    private static extractImages (node: ArticleNode) : ImageElement[] {
        const images: ImageElement[] = [];

        for (const key in node) {
            if (node[key] instanceof ImageElement) {
                images.push(node[key]);
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

    public openEditNodeModal (nodeIndex: number) : void {
        const data: OpenEditModalDto = { nodeToEdit: this.nodes[nodeIndex] };
        const options: MatDialogConfig = {
            data,
            width: '640px',
        };
        const dialogRef: MatDialogRef<AddOrEditNodeComponent>
            = this.dialog.open(AddOrEditNodeComponent, options);
        const dialogSubscription: Subscription = dialogRef.afterClosed()
            .subscribe((editedNode: ArticleNode) => {
                this.replaceNode(nodeIndex, editedNode);
                dialogSubscription.unsubscribe();
            });
    }

    public deleteNode (nodeIndex: number) : void {
        const question: string = 'Do you really want to delete this node?';
        this.confirmation.ask(question)
            .flatMap((confirmed: boolean) => {
                return (confirmed)
                    ? Observable.of(null)
                    : Observable.never();
            })
            .flatMap(() => {
                const images: ImageElement[] = ArticlesAddAndEditComponent.extractImages(this.nodes[nodeIndex]);
                return (images.length)
                    ? this.performImagesDeleting(images)
                    : Observable.of(null);
            })
            .subscribe(() => {
                const deleteCount: number = 1;
                this.nodes.splice(nodeIndex, deleteCount);
            });
    }

    private performImagesUploading () : Observable<any> {
        const observables: Observable<UploadImagesResponse>[] = [];

        for (const node of this.nodes) {
            const images: ImageElement[] = ArticlesAddAndEditComponent.extractImages(node);

            for (const image of images) {
                observables.push(this.blogService.uploadImage(image)
                    .do((response: UploadImagesResponse) => {
                        image.isUploaded = true;
                        image.link = response.link;
                        image.file = null;
                    }));
            }
        }

        return Observable.merge(...observables);
    }

    private handleImageUploaded (response: UploadImagesResponse) : void {
        const message: string = `Image processed successfully: ${response.link}`;
        this.toastr.success(message);
    }

    private handleImageUploadError (response: HttpErrorResponse) {
        const serverErrorResponse: ServerErrorResponse = response.error;
        const message: string = serverErrorResponse.message || serverErrorResponse.error;
        this.toastr.error(message);
    }

    private performImagesDeleting (images: ImageElement[]) : Observable<void> {
        const observables: Observable<void>[] = images
            .filter((image) => !!image.link)
            .map((image) => this.blogService.deleteImage(image));

        return (observables.length)
            ? Observable.merge(...observables)
            : Observable.of(null);
    }

    public publish () : void {
        // const images: ImageElement[] = this.extractImages();
        this.performImagesUploading().subscribe(this.handleImageUploaded.bind(this), this.handleImageUploadError.bind(this), () => {
            console.log('uploaded!');
            console.log(this.nodes);
        })
        // this.blogService.uploadImages(images).subscribe(console.log, console.log);

        // this.blogService.publish(this.nodes).subscribe((res) => {
        //     console.log(res);
        // });
    }
}
