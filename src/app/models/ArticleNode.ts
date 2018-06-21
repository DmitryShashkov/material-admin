import { ArticleNodeTypes } from '../enums/article-node-types.enum';
import { BaseModel } from 'ts-json-mapper';
import { ImageElement } from './ImageElement';

export abstract class ArticleNode extends BaseModel {
    public type: ArticleNodeTypes;

    public abstract getTitleText () : string;

    public abstract getTitleImage () : ImageElement;
}
