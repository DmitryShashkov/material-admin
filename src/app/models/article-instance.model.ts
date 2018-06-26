import { BaseModel, ModelProperty } from 'ts-json-mapper';
import { PublicAuthorProfile } from './public-author-profile.model';
import { ArticleTag } from './article-tag.model';

export class ArticleInstance extends BaseModel {
    @ModelProperty()
    public authorId: number;

    @ModelProperty()
    public createdAt: Date;

    @ModelProperty()
    public currentRating: number;

    @ModelProperty()
    public description: string;

    @ModelProperty()
    public design: string;

    @ModelProperty()
    public id: number;

    @ModelProperty()
    public isPopular: boolean;

    @ModelProperty()
    public metaDescription: string;

    @ModelProperty()
    public metaTitle: string;

    @ModelProperty()
    public previewImage: string;

    @ModelProperty()
    public ratingsAmount: number;

    @ModelProperty()
    public timeToRead: number;

    @ModelProperty()
    public title: string;

    @ModelProperty()
    public updatedAt: Date;

    @ModelProperty()
    public url: string;

    @ModelProperty()
    public viewsAmount: string;

    @ModelProperty('publicAuthorProfile', PublicAuthorProfile)
    public publicAuthorProfile?: PublicAuthorProfile | null;

    @ModelProperty('tags', ArticleTag)
    public tags?: ArticleTag[] | null;

    constructor (options: any) {
        super(options);
    }
}
