import { BaseModel, ModelProperty } from 'ts-json-mapper';
import { ImageElement } from './ImageElement';

export class ArticleSettings extends BaseModel {
    @ModelProperty()
    public title: string;

    @ModelProperty()
    public description: string;

    @ModelProperty()
    public metaTitle: string;

    @ModelProperty()
    public metaDescription: string;

    @ModelProperty()
    public displayUrl: string;

    @ModelProperty()
    public lastBreadCrumb: string;

    @ModelProperty()
    public publishingDate: Date;

    @ModelProperty('previewImage', ImageElement)
    public previewImage: ImageElement;

    @ModelProperty()
    public isPopular: boolean;

    constructor (options: any) {
        super(options);
    }
}
