import { Component, OnChanges } from '@angular/core';
import { NodeHeader } from '../../../../models/NodeHeader';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsContract } from '../../../../contracts/forms.contract';
import { CONFIGURE_ARTICLE_HEADER_FORM_CONFIG } from './configure-article-header.form-config';
import { MAX_ALLOWED_IMAGE_SIZE } from '../../../../app.constants';
import { NotificationsService } from '../../../../services/notifications.service';
import { FilesService } from '../../../../services/files.service';
import { ConfigureNodeWithImageComponent } from '../../../../classes/ConfigureNodeWithImageComponent';

@Component({
    selector: 'app-configure-article-header',
    templateUrl: './configure-article-header.component.html',
    styleUrls: ['./configure-article-header.component.scss'],
})
export class ConfigureArticleHeaderComponent
extends ConfigureNodeWithImageComponent<NodeHeader> implements OnChanges {
    public readonly FormsContract: typeof FormsContract = FormsContract;
    public readonly MAX_ALLOWED_IMAGE_SIZE: number = MAX_ALLOWED_IMAGE_SIZE;

    public nodeForm: FormGroup;

    constructor (
        private formBuilder: FormBuilder,
        private notifier: NotificationsService,
        filesService: FilesService,
    ) {
        super(filesService);
        this.nodeForm = formBuilder.group(CONFIGURE_ARTICLE_HEADER_FORM_CONFIG);

        this.imageControl = this.nodeForm.controls[FormsContract.NodeHeader.BACKGROUND_IMAGE];
    }

    public async ngOnChanges () : Promise<void> {
        if (this.nodeToEdit) {
            this.nodeForm.controls[FormsContract.NodeHeader.TITLE].setValue(this.nodeToEdit.title);

            this.imageElement = this.nodeToEdit.backgroundImage;
        }

        await super.ngOnChanges();
    }

    public onImagePreviewError (error: Error) : void {
        this.notifier.error(error.message);
    }

    public submit () : void {
        if (this.nodeForm.invalid) { return; }

        const newNode: NodeHeader = new NodeHeader(this.nodeForm.value);
        this.onSubmit.emit(newNode);
    }
}
