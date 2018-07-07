import { ConfigureNodeComponent } from '../../../../classes/ConfigureNodeComponent';
import { NodeWithKeyMoment } from '../../../../models/node-with-key-moment.model';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CONFIGURE_KEY_MOMENT_FORM_CONFIG } from './configure-key-moment.form-config';
import { FormsContract } from '../../../../contracts/forms.contract';

@Component({
    selector: 'app-configure-key-moment',
    templateUrl: './configure-key-moment.component.html',
    styleUrls: ['./configure-key-moment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigureKeyMomentComponent extends ConfigureNodeComponent<NodeWithKeyMoment> {
    public nodeForm: FormGroup;

    constructor (
        private formBuilder: FormBuilder,
    ) {
        super();
        this.nodeForm = this.formBuilder.group(CONFIGURE_KEY_MOMENT_FORM_CONFIG);
    }

    public onEditorValueChanged (text: string) : void {
        this.nodeForm.controls[FormsContract.NodeKeyMoment.TEXT].setValue(text);
    }

    public submit () {
        if (this.nodeForm.invalid) { return; }

        const newNode: NodeWithKeyMoment = new NodeWithKeyMoment(this.nodeForm.value);
        this.onSubmit.emit(newNode);
    }
}
