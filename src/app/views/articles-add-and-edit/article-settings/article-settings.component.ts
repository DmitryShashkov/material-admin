import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ArticleNodeTypes} from "../../../enums/article-node-types.enum";
import {MatDialogRef} from "@angular/material";
import {AddOrEditNodeComponent} from "../add-or-edit-node/add-or-edit-node.component";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {ARTICLE_SETTINGS_FORM_CONFIG} from "./article-settings.form-config";
import {FormsContract} from "../../../contracts/forms.contract";
import {ToastrService} from "ngx-toastr";
import {NotificationsService} from "../../../services/notifications.service";
import {ArticleSettings} from "../../../models/ArticleSettings";
import {CommonComponent} from "../../../classes/CommonComponent";
import {emitDateAsString} from "../../../utils/emit-date-as-string";
import {SubscriptionsContract} from "../../../contracts/subscriptions.contract";

@Component({
    selector: 'app-article-settings',
    templateUrl: './article-settings.component.html',
    styleUrls: ['./article-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleSettingsComponent extends CommonComponent {
    public readonly FormsContract: typeof FormsContract = FormsContract;

    public settingsForm: FormGroup;

    constructor (
        public dialogRef: MatDialogRef<AddOrEditNodeComponent>,
        private formBuilder: FormBuilder,
        private notifier: NotificationsService,
    ) {
        super();

        this.settingsForm = this.formBuilder.group(ARTICLE_SETTINGS_FORM_CONFIG);

        const dateControl: AbstractControl = this.settingsForm.controls[FormsContract.ArticleSettings.PUBLISHING_DATE];
        this.updateSubscription(SubscriptionsContract.EMIT_DATE_AS_STRING, emitDateAsString(dateControl));
    }

    public onImagePreviewError (error: Error) : void {
        this.notifier.error(error.message);
    }

    public confirm () : void {
        if (this.settingsForm.invalid) { return; }

        const settings: ArticleSettings = new ArticleSettings(this.settingsForm.value);
        console.log(settings);
    }
}
