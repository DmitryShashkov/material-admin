import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {CollectionResponse} from "../../types/collection.response";
import {CommonComponent} from "../../classes/CommonComponent";
import {SubscriptionsContract} from "../../contracts/subscriptions.contract";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {CollectionDto} from "../../services/types/collection.dto";
import {PageEvent} from "@angular/material";
import {DataTableField} from "./types/data-table-field";
import {DataTableAction} from "./types/data-table-action";

@Component({
    selector: 'data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent<DataInstance, RequestDto extends CollectionDto>
extends CommonComponent implements OnInit {
    @Input()
    public tableName: string = 'Data table';

    @Input()
    public tableDescription: string = 'Common approach for displaying, sorting and filtering data';

    public currentDataPortion: BehaviorSubject<DataInstance[]> = new BehaviorSubject<DataInstance[]>(([]));

    public currentPage: BehaviorSubject<number> = new BehaviorSubject<number>((0));

    public readonly ITEMS_PER_PAGE_OPTIONS: number[] = [10, 20, 50];

    public itemsPerPage: BehaviorSubject<number> = new BehaviorSubject<number>(this.ITEMS_PER_PAGE_OPTIONS[0]);

    public totalItemsCount: BehaviorSubject<number> = new BehaviorSubject<number>((0));

    @Input()
    public dataGetter: (dto: RequestDto) => Observable<CollectionResponse<DataInstance>>;

    @Input()
    public dtoTransform: (innerDto: CollectionDto) => RequestDto;

    @Input()
    public fieldsList: DataTableField[] = [];

    @Input()
    public actionsList: DataTableAction<DataInstance>[] = [];

    constructor () {
        super();
    }

    public ngOnInit () : void {
        this.updateDataPortion();
    }

    private getInnerDto () : CollectionDto {
        return {
            limit: this.itemsPerPage.value,
            offset: this.itemsPerPage.value * this.currentPage.value,
        };
    }

    public updateDataPortion () {
        if (!this.dataGetter) {
            const message: string = 'Data getter is not set!';
            throw new Error(message);
        }

        const innerDto: CollectionDto = this.getInnerDto();
        const dataGetterDto: RequestDto = (this.dtoTransform)
            ? this.dtoTransform(innerDto)
            : innerDto as RequestDto;

        this.updateSubscription(
            SubscriptionsContract.DataTable.UPDATE_DATA_PORTION,
            this.dataGetter(dataGetterDto).subscribe(
                this.handleGetDataSuccess.bind(this),
                this.handleGetDataFailure.bind(this),
            ),
        );
    }

    private handleGetDataSuccess (response: CollectionResponse<DataInstance>) : void {
        this.currentDataPortion.next(response.items);
        this.totalItemsCount.next(response.total);
    }

    private handleGetDataFailure (res: any) : void {
        console.log(res);
    }

    public handlePaginationUpdate (event: PageEvent) : void {
        this.itemsPerPage.next(event.pageSize);
        this.currentPage.next(event.pageIndex);
        this.updateDataPortion();
    }
}
