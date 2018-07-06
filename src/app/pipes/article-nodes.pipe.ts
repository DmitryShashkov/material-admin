import { Pipe, PipeTransform } from '@angular/core';
import { NodeHeader } from '../models/NodeHeader';
import { ArticleNodeTypes } from '../enums/article-node-types.enum';
import { ArticleNode } from '../models/ArticleNode';
import { NodeCommonText } from '../models/NodeCommonText';
import { NodeImage } from '../models/node-image.model';
import { NodeSectionTitle } from '../models/node-section-title.model';

@Pipe({ name: 'articleNodes', pure: true })
export class ArticleNodesPipe implements PipeTransform {
    public transform (data: ArticleNode) : ArticleNode {
        switch (data.type) {
            case ArticleNodeTypes.HEADER: {
                return new NodeHeader(data);
            }
            case ArticleNodeTypes.SECTION_TITLE: {
                return new NodeSectionTitle(data);
            }
            case ArticleNodeTypes.COMMON_TEXT: {
                return new NodeCommonText(data);
            }
            case ArticleNodeTypes.IMAGE: {
                return new NodeImage(data);
            }
            default: {
                return null;
            }
        }
    }
}
