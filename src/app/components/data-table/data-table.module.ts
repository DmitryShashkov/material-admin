import { NgModule } from '@angular/core';
import { DataTableComponent } from './data-table.component';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatTooltipModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatPaginatorModule,
        MatTooltipModule,
    ],
    declarations: [
        DataTableComponent,
    ],
    exports: [
        DataTableComponent,
    ],
})
export class DataTableModule { }
