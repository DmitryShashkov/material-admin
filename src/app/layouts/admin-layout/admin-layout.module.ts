import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ADMIN_LAYOUT_ROUTES } from './admin-layout.routes';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { MatButtonModule, MatInputModule, MatRippleModule, MatTooltipModule } from '@angular/material';
import { ManageImagesComponent } from '../../views/manage-images/manage-images.component';
import {ArticlesListComponent} from "../../views/articles-list/articles-list.component";
import {DataTableModule} from "../../components/data-table/data-table.module";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ADMIN_LAYOUT_ROUTES),
        FormsModule,
        MatButtonModule,
        MatRippleModule,
        MatInputModule,
        MatTooltipModule,
        DataTableModule,
    ],
    declarations: [
        DashboardComponent,
        UserProfileComponent,
        TableListComponent,
        TypographyComponent,
        IconsComponent,
        MapsComponent,
        NotificationsComponent,
        UpgradeComponent,
        ManageImagesComponent,
        ArticlesListComponent,
    ],
})
export class AdminLayoutModule {}
