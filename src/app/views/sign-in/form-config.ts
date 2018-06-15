import { Validators } from '@angular/forms';

export const SIGN_IN_CONTROLS_CONFIG = {
    email: [
        '', [Validators.required, Validators.email],
    ],
    password: [
        '', [Validators.required],
    ],
};
