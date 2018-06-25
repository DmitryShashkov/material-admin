import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ArticleNode} from "../models/ArticleNode";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ImageElement} from "../models/ImageElement";
import 'rxjs/add/observable/merge';
import {UploadImagesResponse} from "./types/upload-images.response";
import {FilesPipe} from "../pipes/files.pipe";
import {ArticleSettings} from "../models/ArticleSettings";

@Injectable()
export class BlogService {
    constructor (
        private http: HttpClient,
    ) { }

    public uploadImage (image: ImageElement) : Observable<UploadImagesResponse> {
        const url: string = '/image-uploads';
        const imageFieldName: string = 'image';
        const replaceFieldName: string = 'replaceOf';

        const payload: FormData = new FormData();
        payload.append(imageFieldName, image.file);

        if (image.link) {
            payload.append(replaceFieldName, image.link);
        }

        return this.http.post<UploadImagesResponse>(url, payload);
    }

    public getImageFile (link: string) : Observable<File> {
        const options = { responseType: 'blob' as 'json' };
        return this.http.get<File>(link, options)
            .map((blob: Blob) => new FilesPipe().transform(blob, link));
    }

    public deleteImage (image: ImageElement) : Observable<void> {
        const url: string = '/image-uploads';
        const linkParam: string = 'link';

        const params: HttpParams = new HttpParams().append(linkParam, image.link);

        const options = { params };
        return this.http.delete<void>(url, options);
    }

    public publish (nodes: ArticleNode[], settings: ArticleSettings) : Observable<any> {
        const url: string = '/blog-articles';
        const payload = { nodes, settings };

        return this.http.post(url, payload);
    }
}
