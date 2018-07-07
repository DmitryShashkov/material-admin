import { ArticleNodeTypes } from '../enums/article-node-types.enum';
import { ImageElement } from './ImageElement';
import { ArticleTextNode } from './article-text-node.model';

const removeMarkdown = require(('remove-markdown'));

export class NodeCommonText extends ArticleTextNode {
    private static readonly WORDS_FOR_TITLE: number = 5;

    constructor (options: any) {
        super(options);

        this.type = ArticleNodeTypes.COMMON_TEXT;
    }

    private getWords () : string[] {
        const separator: string = ' ';
        return this.text.split(separator);
    }

    public getPrimaryText () : string {
        const separator: string = ' ';
        const words: string[] = this.getWords();
        let text: string = words.slice(0, NodeCommonText.WORDS_FOR_TITLE).join(separator);

        if (words.length > NodeCommonText.WORDS_FOR_TITLE) {
            text += '...';
        }

        return removeMarkdown(text);
    }

    public getSecondaryText () : string {
        const separator: string = ' ';
        const words: string[] = this.getWords();

        if (words.length <= NodeCommonText.WORDS_FOR_TITLE) {
            return '';
        }

        const text: string = words.slice(NodeCommonText.WORDS_FOR_TITLE, words.length).join(separator);

        return removeMarkdown(text);
    }

    public getTitleImage () : ImageElement {
        return null;
    }
}
