import { UrlInterceptor } from './url.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        HttpClientModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UrlInterceptor,
            multi: true,
        },
    ],
})
export class InterceptorsModule { }
