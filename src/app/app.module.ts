import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { APP_ROUTES } from './app.routes';
import { UnauthorizedLayoutComponent } from './layouts/unauthorized-layout/unauthorized-layout.component';
import { NotFoundLayoutComponent } from './layouts/not-found-layout/not-found-layout.component';
import { InterceptorsModule}  from './interceptors/interceptors.module';
import {UsersService} from "./services/users.service";

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ComponentsModule,
        InterceptorsModule,
        RouterModule.forRoot(APP_ROUTES),
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        UnauthorizedLayoutComponent,
        NotFoundLayoutComponent,
    ],
    providers: [
        UsersService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
