import { ChangeDetectionStrategy, Component, OnChanges } from '@angular/core';
import { ConfigureNodeComponent } from '../../../../classes/ConfigureNodeComponent';
import { NodeSectionTitle } from '../../../../models/node-section-title.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CONFIGURE_SECTION_TITLE_FORM_CONFIG } from './configure-section-title.form-config';
import { FormsContract } from '../../../../contracts/forms.contract';
import { SubscriptionsContract } from '../../../../contracts/subscriptions.contract';
import { HeaderLevels } from '../../../../enums/header-levels.enum';

@Component({
    selector: 'app-configure-section-title',
    templateUrl: './configure-section-title.component.html',
    styleUrls: ['./configure-section-title.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigureSectionTitleComponent
extends ConfigureNodeComponent<NodeSectionTitle>
implements OnChanges {
    public readonly FormsContract: typeof FormsContract = FormsContract;

    public readonly HeaderLevels: typeof HeaderLevels = HeaderLevels;

    public nodeForm: FormGroup;

    constructor (
        private formBuilder: FormBuilder,
    ) {
        super();
        this.nodeForm = this.formBuilder.group(CONFIGURE_SECTION_TITLE_FORM_CONFIG);

        const showInTOCControl: AbstractControl
            = this.nodeForm.controls[FormsContract.NodeSectionTitle.SHOW_IN_TABLE_OF_CONTENTS];
        this.updateSubscription(
            SubscriptionsContract.ConfigureArticle.TRACK_TOC,
            showInTOCControl.valueChanges.subscribe(this.handleShowInTOCToggle.bind(this)),
        );

        this.handleShowInTOCToggle(showInTOCControl.value);
    }

    public ngOnChanges () : void {
        if (this.nodeToEdit) {
            this.nodeForm.controls[FormsContract.NodeSectionTitle.TEXT]
                .setValue(this.nodeToEdit.text);
            this.nodeForm.controls[FormsContract.NodeSectionTitle.SHOW_IN_TABLE_OF_CONTENTS]
                .setValue(this.nodeToEdit.showInTableOfContents);
            this.nodeForm.controls[FormsContract.NodeSectionTitle.TEXT_IN_TABLE_OF_CONTENTS]
                .setValue(this.nodeToEdit.textInTableOfContents);
            this.nodeForm.controls[FormsContract.NodeSectionTitle.HEADER_LEVEL]
                .setValue(this.nodeToEdit.headerLevel);
        }
    }

    private handleShowInTOCToggle (showInTOC: boolean) : void {
        const textInTOCControl: AbstractControl
            = this.nodeForm.controls[FormsContract.NodeSectionTitle.TEXT_IN_TABLE_OF_CONTENTS];

        if (showInTOC) {
            textInTOCControl.setValidators([Validators.required]);
            textInTOCControl.updateValueAndValidity();
            textInTOCControl.enable();
            return;
        }

        textInTOCControl.setValue((''));
        textInTOCControl.updateValueAndValidity();
        textInTOCControl.setValidators(null);
        textInTOCControl.disable();
    }

    public onEditorValueChanged (text: string) : void {
        this.nodeForm.controls[FormsContract.NodeSectionTitle.TEXT].setValue(text);
    }

    public submit () {
        if (this.nodeForm.invalid) { return; }

        const newNode: NodeSectionTitle = new NodeSectionTitle(this.nodeForm.value);
        this.onSubmit.emit(newNode);
    }
}
