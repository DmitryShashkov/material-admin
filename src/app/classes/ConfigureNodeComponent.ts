import { ImageElement } from '../models/ImageElement';
import { BlogService } from '../services/blog.service';
import { CommonComponent } from './CommonComponent';
import { EventEmitter, Input, Output } from '@angular/core';
import { ArticleNode } from '../models/ArticleNode';

export abstract class ConfigureNodeComponent<T extends ArticleNode> extends CommonComponent {
    @Input()
    public nodeToEdit: T;

    @Output()
    public onSubmit: EventEmitter<ArticleNode> = new EventEmitter<ArticleNode>();

    protected constructor (
        protected blogService: BlogService,
    ) {
        super();
    }

    protected async provideImageFile (image: ImageElement) : Promise<File> {
        if (image.file) { return image.file; }

        if (image.link) {
            return this.blogService.getImageFile(image.link).toPromise();
        }

        return null;
    }
}
