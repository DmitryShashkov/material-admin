import {Component, ElementRef, ViewChild} from '@angular/core';
import {FilesService} from "../../services/files.service";

@Component({
    selector: 'app-manage-images',
    templateUrl: './manage-images.component.html',
    styleUrls: ['./manage-images.component.scss'],
})
export class ManageImagesComponent {
    @ViewChild('fileInput')
    private fileInput: ElementRef;

    constructor (
        private filesService: FilesService,
    ) {}

    public upload (arg) {
        const input: HTMLInputElement = this.fileInput.nativeElement;
        this.filesService.uploadImage(input.files[0]).subscribe();
    }
}
