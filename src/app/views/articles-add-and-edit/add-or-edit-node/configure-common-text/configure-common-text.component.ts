import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigureNodeComponent } from '../../../../classes/ConfigureNodeComponent';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CONFIGURE_COMMON_TEXT_FORM_CONFIG } from './configure-common-text.form-config';
import { FormsContract } from '../../../../contracts/forms.contract';
import { NodeCommonText } from '../../../../models/NodeCommonText';

@Component({
    selector: 'app-configure-common-text',
    templateUrl: './configure-common-text.component.html',
    styleUrls: ['./configure-common-text.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigureCommonTextComponent extends ConfigureNodeComponent<NodeCommonText> {
    public nodeForm: FormGroup;

    constructor (
        private formBuilder: FormBuilder,
    ) {
        super();
        this.nodeForm = this.formBuilder.group(CONFIGURE_COMMON_TEXT_FORM_CONFIG);
    }

    public onEditorValueChanged (text: string) : void {
        this.nodeForm.controls[FormsContract.NodeCommonText.TEXT].setValue(text);
    }

    public submit () {
        if (this.nodeForm.invalid) { return; }

        const newNode: NodeCommonText = new NodeCommonText(this.nodeForm.value);
        this.onSubmit.emit(newNode);
    }
}
