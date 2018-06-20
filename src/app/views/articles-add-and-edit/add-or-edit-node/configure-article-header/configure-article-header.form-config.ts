import { FormsContract } from '../../../../contracts/forms.contract';
import { Validators } from '@angular/forms';
import * as CustomValidators from '../../../../validators';

export const CONFIGURE_ARTICLE_HEADER_FORM_CONFIG = {
    [FormsContract.NodeHeader.TITLE]: [
        '', Validators.required,
    ],
    [FormsContract.NodeHeader.BACKGROUND_IMAGE]: [
        null, [
            Validators.required,
            CustomValidators.imageSize,
            CustomValidators.imageType,
        ],
    ],
};
