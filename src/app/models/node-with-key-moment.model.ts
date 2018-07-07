import { ArticleTextNode } from './article-text-node.model';
import { ArticleNodeTypes } from '../enums/article-node-types.enum';
import { ImageElement } from './ImageElement';

export class NodeWithKeyMoment extends ArticleTextNode {
    constructor (options: any) {
        super(options);

        this.type = ArticleNodeTypes.KEY_MOMENT;
    }

    public getPrimaryText () : string {
        return this.text;
    }

    public getSecondaryText () : string {
        return '';
    }

    public getTitleImage () : ImageElement {
        return null;
    }
}
