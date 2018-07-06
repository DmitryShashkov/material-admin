import { ArticleNode } from './ArticleNode';
import { ArticleNodeTypes } from '../enums/article-node-types.enum';
import { HeaderLevels } from '../enums/header-levels.enum';
import { ModelProperty } from 'ts-json-mapper';
import { ImageElement } from './ImageElement';

export class NodeSectionTitle extends ArticleNode {
    @ModelProperty()
    public text: string;

    @ModelProperty()
    public showInTableOfContents: boolean;

    @ModelProperty()
    public textInTableOfContents: string;

    @ModelProperty()
    public headerLevel: HeaderLevels;

    constructor (options: any) {
        super(options);

        this.type = ArticleNodeTypes.SECTION_TITLE;
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
