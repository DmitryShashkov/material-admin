import { AbstractControl, ValidationErrors } from '@angular/forms';
import { MAX_ALLOWED_IMAGE_SIZE } from '../app.constants';
import { FormsContract } from '../contracts/forms.contract';

export function imageSize (control: AbstractControl) : ValidationErrors {
    const file: File = control.value;

    if (!file) { return null; }

    return (file.size > MAX_ALLOWED_IMAGE_SIZE)
        ? { [FormsContract.Errors.IMAGE_TOO_LARGE]: true }
        : null;
}
