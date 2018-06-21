import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ArticleNode} from "../models/ArticleNode";
import {ArticleSettings} from "../types/article-settings";
import {HttpClient} from "@angular/common/http";
import {ImageElement} from "../models/ImageElement";
import 'rxjs/add/observable/merge';
import {UploadImagesResponse} from "./types/upload-images.response";

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

    // settings: ArticleSettings
    public publish (nodes: ArticleNode[]) : Observable<any> {
        return this.http.get('https://www.example.com');
    }
}
