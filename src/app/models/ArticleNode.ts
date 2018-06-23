import { ArticleNodeTypes } from '../enums/article-node-types.enum';
import {BaseModel, ModelProperty} from 'ts-json-mapper';
import { ImageElement } from './ImageElement';

export abstract class ArticleNode extends BaseModel {
    @ModelProperty()
    public type: ArticleNodeTypes;

    public abstract getTitleText () : string;

    public abstract getTitleImage () : ImageElement;
}
