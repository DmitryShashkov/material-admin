import {Component, Inject} from "@angular/core";
import {ArticleNodeTypes} from "../../../enums/article-node-types.enum";
import {ArticleNode} from "../../../models/ArticleNode";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {OpenEditModalDto} from "../types/open-edit-modal.dto";

@Component({
    selector: 'app-add-node',
    templateUrl: './add-or-edit-node.component.html',
    styleUrls: ['./add-or-edit-node.component.scss'],
})
export class AddOrEditNodeComponent {
    public readonly NODE_TYPES: typeof ArticleNodeTypes = ArticleNodeTypes;

    public currentNodeType: ArticleNodeTypes = ArticleNodeTypes.HEADER;

    public nodeToEdit: ArticleNode;

    constructor (
        public dialogRef: MatDialogRef<AddOrEditNodeComponent>,
        @Inject(MAT_DIALOG_DATA) public injectedData: OpenEditModalDto,
    ) {
        if (this.injectedData) {
            this.currentNodeType = this.injectedData.nodeToEdit.type;
            this.nodeToEdit = this.injectedData.nodeToEdit;
        }
    }

    public onNodeSubmitted (node: ArticleNode) : void {
        this.dialogRef.close(node);
    }
}
