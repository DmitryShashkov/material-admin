import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BlogService} from "../../services/blog.service";
import {CommonComponent} from "../../classes/CommonComponent";
import {SubscriptionsContract} from "../../contracts/subscriptions.contract";
import {CollectionDto} from "../../services/types/collection.dto";
import {ArticleInstance} from "../../models/article-instance.model";
import {CollectionResponse} from "../../types/collection.response";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {DataTableField} from "../../components/data-table/types/data-table-field";
import {DataTableAction} from "../../components/data-table/types/data-table-action";
import {Router} from "@angular/router";
import {RoutingContract} from "../../contracts/routing.contract";

@Component({
    selector: 'app-articles-list',
    templateUrl: './articles-list.component.html',
    styleUrls: ['./articles-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesListComponent extends CommonComponent {
    public articlesGetter = this.blogService.getMyArticles.bind(this.blogService);

    public articlesFieldsList: DataTableField[] = [
        {
            entityFieldName: 'title',
            columnName: 'Title',
        },
    ];

    public articlesActionsList: DataTableAction<ArticleInstance>[] = [
        {
            title: 'Edit',
            handler: this.navigateToArticleEdit.bind(this),
            icon: 'edit',
        },
    ];

    constructor (
        private blogService: BlogService,
        private router: Router,
    ) {
        super();
    }

    private async navigateToArticleEdit (article: ArticleInstance) : Promise<void> {
        const commands = [`/${RoutingContract.AdminLayout.EDIT_ARTICLE}`, article.id];
        await this.router.navigate(commands);
    }
}
