import {Injectable} from "@angular/core";
import {MimeTypes} from "../enums/mime-types.enum";
import {MegabytesPipe} from "../pipes/megabytes.pipe";

@Injectable()
export class ValidationService {
    private readonly MAX_IMAGE_SIZE: number = 5 * 1024 * 1024;
    private readonly ALLOWED_IMAGE_TYPES: MimeTypes[] = [
        MimeTypes.IMAGE_PNG,
        MimeTypes.IMAGE_JPEG,
    ];

    constructor (
        private mb: MegabytesPipe,
    ) { }

    public checkImage (file: File) : Error[] {
        const errors: Error[] = [];

        if (file.size > this.MAX_IMAGE_SIZE) {
            const errorMessage: string = `File is too large (${this.mb.transform(file.size)} MB,
                while maximum ${this.mb.transform(this.MAX_IMAGE_SIZE)} are allowed)`;
            errors.push(new Error(errorMessage));
        }

        // if (!this.ALLOWED_IMAGE_TYPES.includes(<MimeTypes>file.type)) {
        //     const errorMessage: string =
        // }

        return errors;
    }
}
