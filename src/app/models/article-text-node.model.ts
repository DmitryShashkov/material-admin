import { ArticleNode } from './ArticleNode';
import { ModelProperty } from 'ts-json-mapper';

export abstract class ArticleTextNode extends ArticleNode {
    @ModelProperty()
    public text: string;
}
