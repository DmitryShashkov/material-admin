import {Component} from "@angular/core";
import {ArticleNodeTypes} from "../../../enums/article-node-types.enum";

@Component({
    selector: 'app-add-node',
    templateUrl: './add-or-edit-node.component.html',
    styleUrls: ['./add-or-edit-node.component.scss'],
})
export class AddOrEditNodeComponent {
    public readonly NODE_TYPES: typeof ArticleNodeTypes = ArticleNodeTypes;

    public currentNodeType: ArticleNodeTypes = ArticleNodeTypes.HEADER;
}
