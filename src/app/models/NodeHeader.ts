import { ArticleNode } from './ArticleNode';
import { ArticleNodeTypes } from '../enums/article-node-types.enum';
import { ImageElement } from './ImageElement';
import { ModelProperty } from 'ts-json-mapper';

export class NodeHeader extends ArticleNode {
    @ModelProperty()
    public title: string;

    @ModelProperty('backgroundImage', ImageElement)
    public backgroundImage: ImageElement;

    constructor (options: any) {
        super(options);

        this.type = ArticleNodeTypes.HEADER;
    }

    public getPrimaryText () : string {
        return this.title;
    }

    public getSecondaryText () : string {
        return '';
    }

    public getTitleImage () : ImageElement {
        return this.backgroundImage;
    }
}
