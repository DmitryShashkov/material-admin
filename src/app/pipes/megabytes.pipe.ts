import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'megabytes', pure: false })
export class MegabytesPipe implements PipeTransform {
    transform (value: number, maxDigits: number = 2) : string {
        const numericValue: number = value / 1024 / 1024;

        if (Number.isInteger(numericValue)) {
            return numericValue.toString();
        }

        return numericValue.toFixed(maxDigits);
    }
}
