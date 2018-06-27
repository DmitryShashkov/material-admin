import { ArticleInstance } from '../../models/article-instance.model';
import { ArticleNode } from '../../models/ArticleNode';

export interface ArticleDetailsResponse {
    readonly instance: ArticleInstance;
    readonly nodes: ArticleNode[];
}
