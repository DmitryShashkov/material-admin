import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'split', pure: true })
export class SplitPipe implements PipeTransform {
    public transform (
        value: string,
        splitSeparator: string = '-',
        joinSeparator: string = ' ',
    ) : string {
        return value.split(splitSeparator).join(joinSeparator);
    }
}
