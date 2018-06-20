import { BaseModel, ModelProperty } from 'ts-json-mapper';

export class ImageElement extends BaseModel {
    @ModelProperty()
    public isUploaded: boolean;

    public file: File;

    @ModelProperty()
    public link: string;

    constructor (options: any) {
        if (options instanceof File) {
            super({});
            this.file = options;
            this.isUploaded = false;
            return;
        }

        super(options);
        this.file = options.file;
    }
}
