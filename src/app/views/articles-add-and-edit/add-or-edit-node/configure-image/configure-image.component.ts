import {ChangeDetectionStrategy, Component, OnChanges} from '@angular/core';
import {ConfigureNodeWithImageComponent} from "../../../../classes/ConfigureNodeWithImageComponent";
import {NodeImage} from "../../../../models/node-image.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NotificationsService} from "../../../../services/notifications.service";
import {FormsContract} from "../../../../contracts/forms.contract";
import {FilesService} from "../../../../services/files.service";
import {CONFIGURE_IMAGE_FORM_CONFIG} from "./configure-image.form-config";

@Component({
    selector: 'app-configure-image',
    templateUrl: './configure-image.component.html',
    styleUrls: ['./configure-image.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigureImageComponent
extends ConfigureNodeWithImageComponent<NodeImage> implements OnChanges {
    public readonly FormsContract: typeof FormsContract = FormsContract;

    public nodeForm: FormGroup;

    constructor (
        private formBuilder: FormBuilder,
        private notifier: NotificationsService,
        filesService: FilesService,
    ) {
        super(filesService);
        this.nodeForm = formBuilder.group(CONFIGURE_IMAGE_FORM_CONFIG);

        this.imageControl = this.nodeForm.controls[FormsContract.NodeImage.IMAGE];
    }

    public async ngOnChanges () : Promise<void> {
        if (this.nodeToEdit) {
            this.nodeForm.controls[FormsContract.NodeImage.ALT_TEXT]
                .setValue(this.nodeToEdit.altText);
            this.nodeForm.controls[FormsContract.NodeImage.TITLE]
                .setValue(this.nodeToEdit.title);
            this.nodeForm.controls[FormsContract.NodeImage.ANNOTATION]
                .setValue(this.nodeToEdit.annotation);
            this.nodeForm.controls[FormsContract.NodeImage.LINK]
                .setValue(this.nodeToEdit.link);

            this.imageElement = this.nodeToEdit.image;
        }

        await super.ngOnChanges();
    }

    public onImagePreviewError (error: Error) : void {
        this.notifier.error(error.message);
    }

    public onEditorValueChanged (text: string) : void {
        this.nodeForm.controls[FormsContract.NodeImage.ANNOTATION].setValue(text);
    }

    public submit () : void {
        if (this.nodeForm.invalid) { return; }

        const newNode: NodeImage = new NodeImage(this.nodeForm.value);
        this.onSubmit.emit(newNode);
    }
}
