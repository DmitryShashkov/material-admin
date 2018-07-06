import { ArticleNode } from './ArticleNode';
import { ArticleNodeTypes } from '../enums/article-node-types.enum';
import { ImageElement } from './ImageElement';
import { ModelProperty } from 'ts-json-mapper';

export class NodeImage extends ArticleNode {
    @ModelProperty()
    public altText: string;

    @ModelProperty()
    public title: string;

    @ModelProperty()
    public link: string;

    @ModelProperty('image', ImageElement)
    public image: ImageElement;

    @ModelProperty()
    public annotation: string;

    constructor (options: any) {
        super(options);

        this.type = ArticleNodeTypes.IMAGE;
    }

    public getPrimaryText () : string {
        return this.title;
    }

    public getSecondaryText () : string {
        return this.altText;
    }

    public getTitleImage () : ImageElement {
        return this.image;
    }
}
