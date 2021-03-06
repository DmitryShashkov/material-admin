import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AddOrEditNodeComponent } from '../add-or-edit-node/add-or-edit-node.component';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ARTICLE_SETTINGS_FORM_CONFIG } from './article-settings.form-config';
import { FormsContract } from '../../../contracts/forms.contract';
import { NotificationsService } from '../../../services/notifications.service';
import { ArticleSettings } from '../../../models/ArticleSettings';
import { CommonComponent } from '../../../classes/CommonComponent';
import { emitDateAsString } from '../../../utils/emit-date-as-string';
import { SubscriptionsContract } from '../../../contracts/subscriptions.contract';
import { OpenSettingsModalDto } from '../types/open-settings-modal.dto';
import { omit } from 'lodash';
import { ImagePreviewComponent } from '../../../components/image-preview/image-preview.component';
import { ImageElement } from '../../../models/ImageElement';
import { FilesService } from '../../../services/files.service';

@Component({
    selector: 'app-article-settings',
    templateUrl: './article-settings.component.html',
    styleUrls: ['./article-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleSettingsComponent extends CommonComponent implements AfterViewInit {
    public readonly FormsContract: typeof FormsContract = FormsContract;

    public settingsForm: FormGroup;

    @ViewChild('articlePreview')
    private articlePreview: ImagePreviewComponent;

    constructor (
        public dialogRef: MatDialogRef<AddOrEditNodeComponent>,
        private formBuilder: FormBuilder,
        private notifier: NotificationsService,
        private filesService: FilesService,
        @Inject(MAT_DIALOG_DATA) public injectedData: OpenSettingsModalDto,
    ) {
        super();

        this.settingsForm = this.formBuilder.group(ARTICLE_SETTINGS_FORM_CONFIG);

        const dateControl: AbstractControl
            = this.settingsForm.controls[FormsContract.ArticleSettings.PUBLISHING_DATE];
        this.updateSubscription(
            SubscriptionsContract.EMIT_DATE_AS_STRING,
            emitDateAsString(dateControl),
        );

        if (this.injectedData.currentSettings) {
            const formValue: Partial<ArticleSettings> = omit(
                this.injectedData.currentSettings,
                FormsContract.ArticleSettings.PREVIEW_IMAGE,
            );
            this.settingsForm.patchValue(formValue);
        }
    }

    public ngAfterViewInit () : void {
        if (!this.injectedData.currentSettings) { return; }

        const image: ImageElement = this.injectedData.currentSettings.previewImage;
        this.updateSubscription(
            SubscriptionsContract.Images.PROVIDE_FILE,
            this.filesService.provideImageFile(image).subscribe(this.updatePreviewImage.bind(this)),
        );
    }

    private updatePreviewImage (file: File) : void {
        const previewImageControl: AbstractControl
            = this.settingsForm.controls[FormsContract.ArticleSettings.PREVIEW_IMAGE];
        const options: Object = { emitEvent: false };

        this.updateSubscription(
            SubscriptionsContract.Images.TRACK_PREVIOUS,
            previewImageControl.valueChanges.subscribe(this.removePreviouslyUploadedImage.bind(this)),
        );

        previewImageControl.setValue(file, options);

        this.articlePreview.forceRedraw(file);
    }

    private removePreviouslyUploadedImage () : void {
        if (!this.injectedData.currentSettings) { return; }

        const image: ImageElement = this.injectedData.currentSettings.previewImage;
        if (image.link) {
            this.updateSubscription(
                SubscriptionsContract.Images.DELETE_PREVIOUS,
                this.filesService.deleteImage(image).subscribe(),
            );
        }
    }

    public onImagePreviewError (error: Error) : void {
        this.notifier.error(error.message);
    }

    public updateTags (tags: number[]) : void {
        this.settingsForm.controls[FormsContract.ArticleSettings.TAGS].setValue(tags);
    }

    public confirm () : void {
        if (this.settingsForm.invalid) { return; }

        const settings: ArticleSettings = new ArticleSettings(this.settingsForm.value);
        this.dialogRef.close(settings);
    }
}
