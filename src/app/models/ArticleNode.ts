import {ArticleNodeTypes} from "../enums/article-node-types.enum";
import {BaseModel} from "ts-json-mapper";

export abstract class ArticleNode extends BaseModel {
    public type: ArticleNodeTypes;
}
