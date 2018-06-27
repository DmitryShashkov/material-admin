import { BaseModel, ModelProperty } from 'ts-json-mapper';
import { ImageElement } from './ImageElement';
import {ArticleInstance} from "./article-instance.model";

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
    public lastBreadcrumb: string;

    @ModelProperty()
    public publishingDate: Date;

    @ModelProperty('previewImage', ImageElement)
    public previewImage: ImageElement;

    @ModelProperty()
    public isPopular: boolean;

    constructor (options: any) {
        super(options);
    }

    public static fromArticleInstance (instance: ArticleInstance) : ArticleSettings {
        const data: any = {
            title: instance.title,
            description: instance.description,
            metaTitle: instance.metaTitle,
            metaDescription: instance.metaDescription,
            displayUrl: instance.url,
            lastBreadcrumb: '', // ????????
            publishingDate: instance.createdAt.toISOString(),
            previewImage: {
                link: instance.previewImage,
            },
            isPopular: instance.isPopular,
        };

        return new ArticleSettings(data);
    }
}
