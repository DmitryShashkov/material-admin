import { BaseModel, ModelProperty } from 'ts-json-mapper';

export class ImageElement extends BaseModel {
    public file: File;

    @ModelProperty()
    public link: string;

    constructor (options: any) {
        if (options instanceof File) {
            super({});
            this.file = options;
            return;
        }

        super(options);
        this.file = options.file;
    }

    public setFileOnly (value: File) : void {
        this.file = value;
        this.link = null;
    }

    public setLinkOnly (value: string) : void {
        this.link = value;
        this.file = null;
    }
}
