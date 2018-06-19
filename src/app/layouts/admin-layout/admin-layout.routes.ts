import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {RoutingContract} from "../../contracts/routing.contract";
import {ArticlesAddAndEditComponent} from "../../views/articles-add-and-edit/articles-add-and-edit.component";
import {ManageImagesComponent} from "../../views/manage-images/manage-images.component";

export const ADMIN_LAYOUT_ROUTES: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'user-profile',
        component: UserProfileComponent,
    },
    {
        path: 'table-list',
        component: TableListComponent,
    },
    {
        path: 'typography',
        component: TypographyComponent,
    },
    {
        path: 'icons',
        component: IconsComponent,
    },
    {
        path: 'maps',
        component: MapsComponent,
    },
    {
        path: 'notifications',
        component: NotificationsComponent,
    },
    {
        path: 'upgrade',
        component: UpgradeComponent,
    },
    {
        path: RoutingContract.AdminLayout.ADD_ARTICLE,
        loadChildren: '../../views/articles-add-and-edit/articles-add-and-edit.module#ArticlesAddAndEditModule',
    },
    {
        path: RoutingContract.AdminLayout.MANAGE_IMAGES,
        component: ManageImagesComponent,
    },
];
