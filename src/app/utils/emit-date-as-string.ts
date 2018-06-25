import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

export function emitDateAsString (control: AbstractControl) : Subscription {
    const options: Object = { emitEvent: false };
    const handler: (value: any) => void = (value: any) => {
        if (!(value instanceof Date)) { return; }
        control.setValue((<Date>value).toISOString(), options);
    };

    return control.valueChanges.subscribe(handler);
}
