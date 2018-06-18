import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { CssClasses } from '../../enums/css-classes.enum';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
    private isSidebarVisible: boolean = false;

    @ViewChild('navbarToggler')
    private navbarToggler: ElementRef;

    private body: HTMLElement;

    constructor (
        private router: Router,
        private renderer: Renderer2,
    ) { }

    public ngOnInit () : void {
        this.router.events.subscribe(() => {
            this.closeSidebar();
        });
    }

    public ngAfterViewInit () : void {
        this.body = document.body;
    }

    private openSidebar () : void {
        this.renderer.addClass(this.body, CssClasses.NAV_OPEN);
        this.renderer.addClass(this.navbarToggler.nativeElement, CssClasses.TOGGLED);
        this.isSidebarVisible = true;
    }

    private closeSidebar () {
        this.renderer.removeClass(this.body, CssClasses.NAV_OPEN);
        this.renderer.removeClass(this.navbarToggler.nativeElement, CssClasses.TOGGLED);

        this.isSidebarVisible = false;
    }

    public toggleSidebar () : void {
        (this.isSidebarVisible)
            ? this.closeSidebar()
            : this.openSidebar();
    }
}
