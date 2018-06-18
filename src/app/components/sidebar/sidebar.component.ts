import { Component, OnInit } from '@angular/core';
import { NavigationEntry } from '../../types/navigation-entry';
import { RoutingContract } from '../../contracts/routing.contract';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
    public menuItems: NavigationEntry[] = [
        { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard' },
        { path: '/user-profile', title: 'User Profile',  icon:'person' },
        { path: '/table-list', title: 'Table List',  icon:'content_paste' },
        { path: '/typography', title: 'Typography',  icon:'library_books' },
        { path: '/icons', title: 'Icons',  icon:'bubble_chart' },
        { path: '/maps', title: 'Maps',  icon:'location_on' },
        { path: '/notifications', title: 'Notifications',  icon:'notifications' },
        { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive' },
        {
            path: RoutingContract.AdminLayout.ADD_ARTICLE,
            title: 'Add blog article',
            icon: 'note_add',
        },
        {
            path: RoutingContract.AdminLayout.MANAGE_IMAGES,
            title: 'Manage images',
            icon: 'insert_photo',
        },
    ];

    constructor () { }

    public ngOnInit () : void { }
}
