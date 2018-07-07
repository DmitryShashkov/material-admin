import { TransformableTextNodeClass } from '../../../types/transformable-text-node-class';
import { ArticleNodeTypes } from '../../../enums/article-node-types.enum';

export interface TransformableNodeDescriptor<T> {
    readonly title: string;
    readonly nodeType: ArticleNodeTypes;
    readonly transformableClass: TransformableTextNodeClass<T>;
}
