import { FormsContract } from '../../../../contracts/forms.contract';
import { Validators } from '@angular/forms';
import * as CustomValidators from '../../../../validators';

export const CONFIGURE_IMAGE_FORM_CONFIG = {
    [FormsContract.NodeImage.ANNOTATION]: [
        '', [],
    ],
    [FormsContract.NodeImage.ALT_TEXT]: [
        '', [Validators.required],
    ],
    [FormsContract.NodeImage.IMAGE]: [
        null, [
            Validators.required,
            CustomValidators.imageSize,
            CustomValidators.imageType,
        ],
    ],
    [FormsContract.NodeImage.LINK]: [
        '', [],
    ],
    [FormsContract.NodeImage.TITLE]: [
        '', [],
    ],
};
