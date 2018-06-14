import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { isFileRequest } from '../utils/is-file-request';

export class UrlInterceptor implements HttpInterceptor {
    intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (isFileRequest(request.url)) {
            return next.handle(request);
        }

        const updateOptions = {
            url: `${environment.restServerURL}/api/${environment.apiVersion}${request.url}`,
        };

        return next.handle(request.clone(updateOptions));
    }
}
