import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { SharedService } from './shared.service';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    private SERVER_URL: string;

    private USER_UPLOAD_PHOTO: string;
    private GET_UPLOADED_PHOTO: string;
    private UPLOAD_FILE: string;

    constructor(private http: HttpClient, private shared: SharedService) {
        this.SERVER_URL = this.shared.getServerURL();

        this.USER_UPLOAD_PHOTO = this.SERVER_URL + '/api/user/{id}/upload';
        this.UPLOAD_FILE = this.SERVER_URL + '/api/user/{id}/upload/file';
        this.GET_UPLOADED_PHOTO  = this.SERVER_URL + '/api/user/getYandex/{filename}';
    }

    private getOptions() {
        const headers: HttpHeaders = new HttpHeaders({
            'Authorization': 'Basic ' + this.shared.getStorage().getItem('token')
        });

        return { headers: headers };
    }

    public pushPhotoFileToStorage(id: number, file: File): Observable<HttpEvent<{}>> {
        const regExp = /{id}/gi;
        const url = this.USER_UPLOAD_PHOTO.replace(regExp, id.toString());

        const formData: FormData = new FormData();

        formData.append('uploadedFile', file);

        const req = new HttpRequest('POST', url, formData, {
            headers: this.getOptions().headers,
            reportProgress: true,
            responseType: 'text'
        });

        return this.http.request(req);
    }

    public pushFileToStorage(id: number, file: File): Observable<HttpEvent<{}>> {
        const regExp = /{id}/gi;
        const url = this.UPLOAD_FILE.replace(regExp, id.toString());

        const formData: FormData = new FormData();

        formData.append('uploadedFile', file);

        const req = new HttpRequest('POST', url, formData, {
            headers: this.getOptions().headers,
            reportProgress: true,
            responseType: 'text'
        });

        return this.http.request(req);
    }

    public getUploadedPhoto(filename: string): Observable<any> {
        const regExp = /{filename}/gi;
        const url = this.GET_UPLOADED_PHOTO.replace(regExp, filename);
        return this.http.get(url);
    }
}
