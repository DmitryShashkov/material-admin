import { Pipe, PipeTransform } from '@angular/core';
import { lookup } from 'mime-types';

@Pipe({ name: 'file', pure: true })
export class FilesPipe implements PipeTransform {
    public transform (blob: Blob, linkOrName: string) : File {
        const parts: Blob[] = [blob];
        const fileName: string = linkOrName.split(('/')).pop();
        const properties: FilePropertyBag = {
            type: lookup(fileName) as string,
        };

        return new File(parts, fileName, properties);
    }
}
