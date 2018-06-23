import { FormsContract } from '../../../../contracts/forms.contract';
import { Validators } from '@angular/forms';

export const CONFIGURE_COMMON_TEXT_FORM_CONFIG = {
    [FormsContract.NodeCommonText.TEXT]: [
        '', [Validators.required],
    ],
};
