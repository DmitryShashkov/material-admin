import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ALLOWED_IMAGE_TYPES } from '../app.constants';
import { FormsContract } from '../contracts/forms.contract';
import { MimeTypes } from '../enums/mime-types.enum';

export function imageType (control: AbstractControl) : ValidationErrors {
    const file: File = control.value;

    if (!file) { return null; }

    return (!ALLOWED_IMAGE_TYPES.includes(file.type as MimeTypes))
        ? { [FormsContract.Errors.IMAGE_IMPROPER_TYPE]: true }
        : null;
}
