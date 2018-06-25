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
import { InterceptorsModule }  from './interceptors/interceptors.module';
import { ToastrModule } from 'ngx-toastr';
import { GuardsModule } from './guards/guards.module';
import { PipesModule } from './pipes/pipes.module';
import { DirectivesModule } from './directives/directives.module';
import { MatNativeDateModule } from '@angular/material';
import { ServicesModule } from './services/services.module';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ToastrModule.forRoot(),
        MatNativeDateModule,
        ComponentsModule,
        InterceptorsModule,
        GuardsModule,
        ServicesModule,
        PipesModule,
        DirectivesModule,
        RouterModule.forRoot(APP_ROUTES),
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        UnauthorizedLayoutComponent,
        NotFoundLayoutComponent,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
