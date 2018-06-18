import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders,} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Headers, RequestOptions} from "@angular/http";

@Injectable()
export class FilesService {
    constructor (private http: HttpClient) {}

    public uploadImage (file: File) : Observable<any> {
        const url: string = '/image-uploads';

        // the old trick of uploading files with Angular:
        // in order to add boundary correctly, we shouldn't specify content type;
        const headers = new HttpHeaders();
        // headers.set('content-type', 'multipart/form-data');

        const data: FormData = new FormData();
        data.append('file', file);

        return this.http.post(url, data, { headers });
    }
}
