import { CommonComponent } from './CommonComponent';
import { EventEmitter, Input, Output } from '@angular/core';
import { ArticleNode } from '../models/ArticleNode';

export abstract class ConfigureNodeComponent<T extends ArticleNode> extends CommonComponent {
    @Input()
    public nodeToEdit: T;

    @Output()
    public onSubmit: EventEmitter<ArticleNode> = new EventEmitter<ArticleNode>();

    protected constructor () {
        super();
    }
}
