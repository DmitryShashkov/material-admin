import { Component, OnChanges } from '@angular/core';
import { NodeHeader } from '../../../../models/NodeHeader';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { FormsContract } from '../../../../contracts/forms.contract';
import { CONFIGURE_ARTICLE_HEADER_FORM_CONFIG } from './configure-article-header.form-config';
import { MAX_ALLOWED_IMAGE_SIZE } from '../../../../app.constants';
import { ConfigureNodeComponent } from '../../../../classes/ConfigureNodeComponent';
import { ImageElement } from '../../../../models/ImageElement';
import { SubscriptionsContract } from '../../../../contracts/subscriptions.contract';
import { NotificationsService } from '../../../../services/notifications.service';
import {FilesService} from "../../../../services/files.service";

@Component({
    selector: 'app-configure-article-header',
    templateUrl: './configure-article-header.component.html',
    styleUrls: ['./configure-article-header.component.scss'],
})
export class ConfigureArticleHeaderComponent extends ConfigureNodeComponent<NodeHeader> implements OnChanges {
    public readonly FormsContract: typeof FormsContract = FormsContract;
    public readonly MAX_ALLOWED_IMAGE_SIZE: number = MAX_ALLOWED_IMAGE_SIZE;

    public nodeForm: FormGroup;

    constructor (
        private formBuilder: FormBuilder,
        private notifier: NotificationsService,
        private filesService: FilesService,
    ) {
        super();
        this.nodeForm = formBuilder.group(CONFIGURE_ARTICLE_HEADER_FORM_CONFIG);
    }

    public async ngOnChanges () : Promise<void> {
        if (this.nodeToEdit) {
            this.nodeForm.controls[FormsContract.NodeHeader.TITLE].setValue(this.nodeToEdit.title);

            this.updateSubscription(
                SubscriptionsContract.Images.PROVIDE_FILE,
                this.filesService.provideImageFile(this.nodeToEdit.backgroundImage)
                    .subscribe(this.processCurrentImage.bind(this)),
            );
        }
    }

    public onImagePreviewError (error: Error) : void {
        this.notifier.error(error.message);
    }

    private processCurrentImage (file: File) : void {
        const backgroundImageControl: AbstractControl
            = this.nodeForm.controls[FormsContract.NodeHeader.BACKGROUND_IMAGE];

        this.updateSubscription(
            SubscriptionsContract.Images.TRACK_PREVIOUS,
            backgroundImageControl.valueChanges.subscribe(this.removePreviouslyUploadedImage.bind(this)),
        );

        backgroundImageControl.setValue(file);
    }

    private removePreviouslyUploadedImage () : void {
        if (this.nodeToEdit) {
            const image: ImageElement = this.nodeToEdit.backgroundImage;

            if (image.link) {
                this.updateSubscription(
                    SubscriptionsContract.Images.DELETE_PREVIOUS,
                    this.filesService.deleteImage(image).subscribe(),
                );
            }
        }
    }

    public submit () : void {
        if (this.nodeForm.invalid) { return; }

        const newNode: NodeHeader = new NodeHeader(this.nodeForm.value);
        this.onSubmit.emit(newNode);
    }
}
