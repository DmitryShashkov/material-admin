import { Pipe, PipeTransform } from '@angular/core';
import { ArticleTextNode } from '../models/article-text-node.model';
import { TransformableTextNodeClass } from '../types/transformable-text-node-class';

const removeMarkdown = require(('remove-markdown'));

@Pipe({ name: 'textArticleNodes', pure: true })
export class TextArticleNodesPipe<T extends ArticleTextNode> implements PipeTransform {
    public transform (node: ArticleTextNode, transformableClass: TransformableTextNodeClass<T>) : T {
        return new transformableClass(({
            text: removeMarkdown(node.text),
        }));
    }
}
