import { BaseModel, ModelProperty } from 'ts-json-mapper';
import { ImageElement } from './ImageElement';
import {ArticleInstance} from "./article-instance.model";
import {TagInstance} from "./tag-instance.model";

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
    public tags: number[];

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
            lastBreadcrumb: instance.lastBreadcrumb,
            publishingDate: instance.createdAt.toISOString(),
            previewImage: {
                link: instance.previewImage,
            },
            tags: (instance.tags)
                ? instance.tags.map((tag: TagInstance) => tag.id)
                : [],
            isPopular: instance.isPopular,
        };

        return new ArticleSettings(data);
    }
}
