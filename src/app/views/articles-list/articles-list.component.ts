import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BlogService} from "../../services/blog.service";
import {CommonComponent} from "../../classes/CommonComponent";
import {SubscriptionsContract} from "../../contracts/subscriptions.contract";
import {CollectionDto} from "../../services/types/collection.dto";
import {ArticleInstance} from "../../models/article-instance.model";
import {CollectionResponse} from "../../types/collection.response";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
    selector: 'app-articles-list',
    templateUrl: './articles-list.component.html',
    styleUrls: ['./articles-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesListComponent extends CommonComponent implements OnInit {
    private readonly PAGE_SIZE: number = 10;
    public currentPage: number = 0;

    public currentArticlesPortion: BehaviorSubject<ArticleInstance[]>
        = new BehaviorSubject<ArticleInstance[]>(([]));

    constructor (
        private blogService: BlogService,
    ) {
        super();
    }

    public ngOnInit () {
        this.loadPortionOfArticles();
    }

    public loadPortionOfArticles () {
        const limit: number = this.PAGE_SIZE;
        const offset: number = this.currentPage * this.PAGE_SIZE;
        const options: CollectionDto = { limit, offset };

        this.updateSubscription(
            SubscriptionsContract.ArticlesList.GET_LIST,
            this.blogService.getMyArticles(options).subscribe(this.savePortion.bind(this)),
        );
    }

    public savePortion (response: CollectionResponse<ArticleInstance>) : void {
        this.currentArticlesPortion.next(response.items);
    }
}
