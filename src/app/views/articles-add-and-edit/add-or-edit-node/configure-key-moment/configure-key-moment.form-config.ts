import { FormsContract } from '../../../../contracts/forms.contract';
import { Validators } from '@angular/forms';

export const CONFIGURE_KEY_MOMENT_FORM_CONFIG = {
    [FormsContract.NodeKeyMoment.TEXT]: [
        '', [Validators.required],
    ],
};
