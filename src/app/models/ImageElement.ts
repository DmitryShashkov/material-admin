import {BaseModel, ModelProperty} from "ts-json-mapper";

export class ImageElement extends BaseModel {
    @ModelProperty()
    public isUploaded: boolean;

    public file: File;

    @ModelProperty()
    public link: string;

    constructor (options: any) {
        super(options);

        this.file = options.file;
    }
}
