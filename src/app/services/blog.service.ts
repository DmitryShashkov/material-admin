import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ArticleNode} from "../models/ArticleNode";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ImageElement} from "../models/ImageElement";
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import {UploadImagesResponse} from "./types/upload-images.response";
import {FilesPipe} from "../pipes/files.pipe";
import {ArticleSettings} from "../models/ArticleSettings";
import {ArticleInstance} from "../models/article-instance.model";
import {CollectionDto} from "./types/collection.dto";
import {HttpParamsOptions} from "@angular/common/http/src/params";
import {UsersService} from "./users.service";
import {CollectionResponse} from "../types/collection.response";

@Injectable()
export class BlogService {
    constructor (
        private http: HttpClient,
        private usersService: UsersService,
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

    public provideImageFile (image: ImageElement) : Observable<File> {
        if (image.file) {
            return Observable.of(image.file);
        }

        if (image.link) {
            const options = { responseType: 'blob' as 'json' };
            return this.http.get<File>(image.link, options)
                .map((blob: Blob) => new FilesPipe().transform(blob, image.link));
        }

        return Observable.of(null);
    }

    public deleteImage (image: ImageElement) : Observable<void> {
        const url: string = '/image-uploads';
        const linkParam: string = 'link';

        const params: HttpParams = new HttpParams().append(linkParam, image.link);

        const options = { params };
        return this.http.delete<void>(url, options);
    }

    public publish (nodes: ArticleNode[], settings: ArticleSettings) : Observable<ArticleInstance> {
        const url: string = '/blog-articles';
        const payload = { nodes, settings };

        return this.http.post<ArticleInstance>(url, payload)
            .map((data: any) => new ArticleInstance(data));
    }

    public getMyArticles (dto: CollectionDto) : Observable<CollectionResponse<ArticleInstance>> {
        const url: string = '/blog-articles';
        const authorIdParam: string = 'authorId';

        const paramsOptions: HttpParamsOptions = { fromObject: dto };
        const params: HttpParams = new HttpParams(paramsOptions)
            .append(authorIdParam, this.usersService.userSubject.value.id.toString());

        const options = { params };
        return this.http.get<CollectionResponse<ArticleInstance>>(url, options)
            .map((collection: CollectionResponse<any>) => {
                return {
                    items: collection.items.map((data: any) => new ArticleInstance(data)),
                    total: collection.total,
                };
            });
    }
}
