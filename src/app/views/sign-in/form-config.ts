import { Validators } from '@angular/forms';
import {FormsContract} from "../../contracts/forms.contract";

export const SIGN_IN_CONTROLS_CONFIG = {
    [FormsContract.SignIn.EMAIL]: [
        '', [Validators.required, Validators.email],
    ],
    [FormsContract.SignIn.PASSWORD]: [
        '', [Validators.required],
    ],
};
