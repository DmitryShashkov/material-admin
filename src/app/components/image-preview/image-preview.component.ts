import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import { MimeTypes } from '../../enums/mime-types.enum';

@Component({
    selector: 'app-image-preview',
    templateUrl: './image-preview.component.html',
    styleUrls: ['./image-preview.component.scss'],
})
export class ImagePreviewComponent implements OnChanges {
    private readonly ALLOWED_MIME_TYPES: MimeTypes[] = [
        MimeTypes.IMAGE_JPEG,
        MimeTypes.IMAGE_PNG,
    ];

    @Input()
    public file: File;

    @Output()
    public onError: EventEmitter<Error> = new EventEmitter<Error>();

    private reader: FileReader = new FileReader();

    public imageDataURL: string;

    constructor () {
        this.reader.onload = this.previewFile.bind(this);
    }

    public ngOnChanges () : void {
        if (this.file) {
            const imageType: MimeTypes = this.file.type as MimeTypes;
            if (!this.ALLOWED_MIME_TYPES.includes(imageType)) {
                const errorMessage: string = `Cannot preview file of type ${imageType}, please use PNG or JPEG`;
                this.imageDataURL = null;
                this.onError.emit(new Error(errorMessage));
                return;
            }

            this.reader.readAsDataURL(this.file);
        }
    }

    private previewFile () {
        this.imageDataURL = this.reader.result;
    }
}
