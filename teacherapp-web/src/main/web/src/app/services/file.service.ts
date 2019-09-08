import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { SharedService } from './shared.service';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    private SERVER_URL: string;

    private GET_UPLOADED_FILE: string;
    private UPLOAD_FILE: string;
    private UPLOAD_FILE_IN_FOLDER: string;
    private USER_UPLOAD_PHOTO: string;
    private USER_DELETE_PHOTO: string;
    private GET_PORTFOLIO_FILE: string;

    constructor(private http: HttpClient, private shared: SharedService) {
        this.SERVER_URL = this.shared.getServerURL();

        this.USER_UPLOAD_PHOTO = this.SERVER_URL + '/api/user/uploadPortfolioPhoto';
        this.USER_DELETE_PHOTO = this.SERVER_URL + '/api/user/deletePortfolioPhoto';
        this.UPLOAD_FILE = this.SERVER_URL + '/api/user/{id}/upload/file';
        this.UPLOAD_FILE_IN_FOLDER = this.SERVER_URL + '/api/materials/folder/{id}/upload';
        this.GET_UPLOADED_FILE  = this.SERVER_URL + '/api/user/getYandex/{name}';
        this.GET_PORTFOLIO_FILE  = this.SERVER_URL + '/api/user/getPortfolioFile';
    }

    private getOptions() {
        const headers: HttpHeaders = new HttpHeaders({
            'Authorization': 'Basic ' + this.shared.getStorage().getItem('token')
        });

        return { headers: headers };
    }

    public uploadPortfolioPhoto(file: File): Observable<HttpEvent<{}>> {
        const formData: FormData = new FormData();

        formData.append('uploadedFile', file);

        const req = new HttpRequest('POST', this.USER_UPLOAD_PHOTO, formData, {
            reportProgress: true,
            responseType: 'text'
        });

        return this.http.request(req);
    }

    public deletePortfolioPhoto() {
        return this.http.delete<Observable<Object>>(this.USER_DELETE_PHOTO);
    }

    public uploadFileToFolder(id: number, file: File): Observable<HttpEvent<{}>> {
        const regExp = /{id}/gi;
        const url = this.UPLOAD_FILE_IN_FOLDER.replace(regExp, id.toString());

        const formData: FormData = new FormData();

        formData.append('uploadedFile', file);

        const req = new HttpRequest('POST', url, formData, {
            reportProgress: true,
            responseType: 'text'
        });

        return this.http.request(req);
    }

    public getFile(filename: string): Observable<any> {
        const regExp = /{name}/gi;
        const url = this.GET_UPLOADED_FILE.replace(regExp, filename);
        return this.http.get(url);
    }

    public getPortfolioFile(): Observable<any> {
        return this.http.get(this.GET_PORTFOLIO_FILE);
    }
}
