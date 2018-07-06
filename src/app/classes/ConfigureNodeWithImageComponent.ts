import { ArticleNode } from '../models/ArticleNode';
import { ConfigureNodeComponent } from './ConfigureNodeComponent';
import { SubscriptionsContract } from '../contracts/subscriptions.contract';
import { FilesService } from '../services/files.service';
import { ImageElement } from '../models/ImageElement';
import { AbstractControl } from '@angular/forms';
import { OnChanges } from '@angular/core';

export abstract class ConfigureNodeWithImageComponent<T extends ArticleNode>
extends ConfigureNodeComponent<T> implements OnChanges {
    private readonly IMAGE_ELEMENT_ERROR_MESSAGE: string = 'Image element must be set!';

    private readonly IMAGE_CONTROL_ERROR_MESSAGE: string = 'Image control must be set!';

    protected imageElement: ImageElement;

    protected imageControl: AbstractControl;

    protected constructor (
        protected filesService: FilesService,
    ) {
        super();
    }

    public async ngOnChanges () : Promise<void> {
        if (this.nodeToEdit) {
            if (!this.imageElement) {
                throw new Error(this.IMAGE_ELEMENT_ERROR_MESSAGE);
            }

            this.updateSubscription(
                SubscriptionsContract.Images.PROVIDE_FILE,
                this.filesService.provideImageFile(this.imageElement)
                    .subscribe(this.processCurrentImage.bind(this)),
            );
        }
    }

    protected processCurrentImage (file: File) : void {
        if (!this.imageControl) {
            throw new Error(this.IMAGE_CONTROL_ERROR_MESSAGE);
        }

        this.updateSubscription(
            SubscriptionsContract.Images.TRACK_PREVIOUS,
            this.imageControl.valueChanges.subscribe(this.removePreviouslyUploadedImage.bind(this)),
        );

        this.imageControl.setValue(file);
    }

    protected removePreviouslyUploadedImage () : void {
        if (this.nodeToEdit) {
            if (this.imageElement.link) {
                this.updateSubscription(
                    SubscriptionsContract.Images.DELETE_PREVIOUS,
                    this.filesService.deleteImage(this.imageElement).subscribe(),
                );
            }
        }
    }
}
