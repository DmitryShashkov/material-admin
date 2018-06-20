import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ArticleNode} from "../models/ArticleNode";
import {ArticleSettings} from "../types/article-settings";
import {HttpClient} from "@angular/common/http";
import {ImageElement} from "../models/ImageElement";
import 'rxjs/add/observable/merge';

@Injectable()
export class BlogService {
    constructor (
        private http: HttpClient,
    ) { }

    public uploadImages (images: ImageElement[]) : Observable<any> {
        const url: string = '/image-uploads';
        const observables: Observable<any>[] = images.map((image: ImageElement) => {
            const payload: FormData = new FormData();
            payload.append('image', image.file);
            return this.http.post<any>(url, payload);
        });
        return Observable.merge(...observables);
    }

    // settings: ArticleSettings
    public publish (nodes: ArticleNode[]) : Observable<any> {
        return this.http.get('https://www.example.com');
    }
}
