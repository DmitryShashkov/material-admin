import { Component, Input, OnChanges } from '@angular/core';
import { ArticleNode } from '../../../models/ArticleNode';
import { ImageElement } from '../../../models/ImageElement';

@Component({
    selector: '[app-node-card]',
    templateUrl: './node-card.component.html',
    styleUrls: ['./node-card.component.scss'],
})
export class NodeCardComponent implements OnChanges {
    public titleText: string;

    public subtitleText: string;

    public imageSrc: string;

    @Input()
    public node: ArticleNode;

    constructor () { }

    public ngOnChanges () : void {
        if (!this.node) { return; }

        this.titleText = this.node.getTitleText();
        this.subtitleText = this.node.type;

        const image: ImageElement = this.node.getTitleImage();
        if (!image) { return; }

        if (image.link) {
            this.imageSrc = image.link;
        } else if (image.file) {
            const reader: FileReader = new FileReader();

            reader.onload = () => {
                this.imageSrc = reader.result;
            };

            reader.readAsDataURL(image.file);
        }
    }
}
