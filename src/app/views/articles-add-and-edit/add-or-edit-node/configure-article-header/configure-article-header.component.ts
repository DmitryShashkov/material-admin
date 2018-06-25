import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output} from '@angular/core';
import { ArticleNode } from '../../../../models/ArticleNode';
import { NodeHeader } from '../../../../models/NodeHeader';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import { FormsContract } from '../../../../contracts/forms.contract';
import { CONFIGURE_ARTICLE_HEADER_FORM_CONFIG } from './configure-article-header.form-config';
import { ToastrService } from 'ngx-toastr';
import { MAX_ALLOWED_IMAGE_SIZE } from '../../../../app.constants';
import {BlogService} from "../../../../services/blog.service";
import {ConfigureNodeComponent} from "../../../../classes/ConfigureNodeComponent";
import {ImageElement} from "../../../../models/ImageElement";
import {SubscriptionsContract} from "../../../../contracts/subscriptions.contract";
import {NotificationsService} from "../../../../services/notifications.service";

@Component({
    selector: 'app-configure-article-header',
    templateUrl: './configure-article-header.component.html',
    styleUrls: ['./configure-article-header.component.scss'],
})
export class ConfigureArticleHeaderComponent extends ConfigureNodeComponent<NodeHeader> implements OnChanges, OnDestroy {
    public readonly FormsContract: typeof FormsContract = FormsContract;
    public readonly MAX_ALLOWED_IMAGE_SIZE: number = MAX_ALLOWED_IMAGE_SIZE;

    public nodeForm: FormGroup;

    constructor (
        private formBuilder: FormBuilder,
        private notifier: NotificationsService,
        blogService: BlogService,
    ) {
        super(blogService);
        this.nodeForm = formBuilder.group(CONFIGURE_ARTICLE_HEADER_FORM_CONFIG);
    }

    public async ngOnChanges () : Promise<void> {
        if (this.nodeToEdit) {
            this.nodeForm.controls[FormsContract.NodeHeader.TITLE].setValue(this.nodeToEdit.title);

            const backgroundImageFile: File = await this.provideImageFile(this.nodeToEdit.backgroundImage);
            const backgroundImageControl: AbstractControl
                = this.nodeForm.controls[FormsContract.NodeHeader.BACKGROUND_IMAGE];

            backgroundImageControl.setValue(backgroundImageFile);

            this.updateSubscription(
                SubscriptionsContract.ConfigureNode.ArticleHeader.TRACK_PREVIOUS_IMAGE,
                backgroundImageControl.valueChanges.subscribe(this.removePreviouslyUploadedImage.bind(this)),
            );
        }
    }

    public onImagePreviewError (error: Error) : void {
        this.notifier.error(error.message);
    }

    private removePreviouslyUploadedImage () : void {
        if (this.nodeToEdit) {
            const image: ImageElement = this.nodeToEdit.backgroundImage;

            if (image.link) {
                this.updateSubscription(
                    SubscriptionsContract.ConfigureNode.ArticleHeader.DELETE_PREVIOUS_IMAGE,
                    this.blogService.deleteImage(image).subscribe(),
                );
            }
        }
    }

    public submit () : void {
        if (this.nodeForm.invalid) { return; }

        const newNode: NodeHeader = new NodeHeader(this.nodeForm.value);
        this.onSubmit.emit(newNode);
    }

    public ngOnDestroy () : void {
        this.clearSubscriptions();
    }
}
