import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UnauthorizedLayoutComponent } from './layouts/unauthorized-layout/unauthorized-layout.component';
import { NotFoundLayoutComponent } from './layouts/not-found-layout/not-found-layout.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';

export const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: AdminLayoutComponent,
        // canActivate: [AuthenticatedGuard],
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule',
    },
    {
        path: '',
        component: UnauthorizedLayoutComponent,
        loadChildren: './layouts/unauthorized-layout/unauthorized-layout.module#UnauthorizedLayoutModule',
    },
    {
        path: '**',
        component: NotFoundLayoutComponent,
    },
];
