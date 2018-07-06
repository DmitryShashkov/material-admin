import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ArticleNode } from '../models/ArticleNode';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import { ArticleSettings } from '../models/ArticleSettings';
import { ArticleInstance } from '../models/article-instance.model';
import { CollectionDto } from './types/collection.dto';
import { HttpParamsOptions } from '@angular/common/http/src/params';
import { UsersService } from './users.service';
import { CollectionResponse } from '../types/collection.response';
import { ArticleDetailsResponse } from './types/article-details.response';
import { ArticleNodesPipe } from '../pipes/article-nodes.pipe';
import { TagInstance } from '../models/tag-instance.model';

@Injectable()
export class BlogService {
    constructor (
        private http: HttpClient,
        private usersService: UsersService,
    ) { }

    public publish (nodes: ArticleNode[], settings: ArticleSettings) : Observable<ArticleInstance> {
        const url: string = '/blog-articles';
        const payload = { nodes, settings };

        return this.http.post<ArticleInstance>(url, payload)
            .map((data: any) => new ArticleInstance(data));
    }

    public updateArticle (
        articleId: number,
        nodes: ArticleNode[],
        settings: ArticleSettings,
    ) : Observable<ArticleInstance> {
        const url: string = `/blog-articles/${articleId}`;
        const payload = { nodes, settings };

        return this.http.put<ArticleInstance>(url, payload)
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
                    items: collection.items.map(((data: any) => new ArticleInstance(data))),
                    total: collection.total,
                };
            });
    }

    public getSingleArticle (id: number) : Observable<ArticleDetailsResponse> {
        const url: string = `/blog-articles/${id}`;

        return this.http.get<ArticleDetailsResponse>(url)
            .map((response: ArticleDetailsResponse) => ({
                instance: new ArticleInstance(response.instance),
                nodes: response.nodes.map(((data: any) => new ArticleNodesPipe().transform(data))),
            }));
    }

    public getTags () : Observable<CollectionResponse<TagInstance>> {
        const url: string = '/blog-tags';

        return this.http.get<CollectionResponse<TagInstance>>(url)
            .map((response: CollectionResponse<TagInstance>) => ({
                items: response.items.map(((data: any) => new TagInstance(data))),
                total: response.total,
            }));
    }
}
