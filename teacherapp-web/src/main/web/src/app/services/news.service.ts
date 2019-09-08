import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SharedService} from './shared.service';
import {New} from '../dto/new';

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    private SERVER_URL: string;

    private NEWS_LIST: string;
    private NEWS_DELETE_BY_ID: string;
    private NEWS_CREATE: string;

    constructor(private http: HttpClient, private shared: SharedService) {
        this.SERVER_URL = this.shared.getServerURL();

        this.NEWS_LIST = this.SERVER_URL + '/api/news/list';
        this.NEWS_DELETE_BY_ID = this.SERVER_URL + '/api/news/{id}';
        this.NEWS_CREATE = this.SERVER_URL + '/api/news/create';
    }

    private getOptions() {
        const headers: HttpHeaders = new HttpHeaders({
            'Authorization': 'Basic ' + this.shared.getStorage().getItem('token')
        });

        return {headers: headers};
    }

    public createNews(note: any) {
        return this.http.put(this.NEWS_CREATE, note);
    }

    public list() {
        return this.http.get(this.NEWS_LIST);
    }

    public deleteNew(id: number) {
        const regExp = /{id}/gi;
        const url = this.NEWS_DELETE_BY_ID.replace(regExp, id.toString());
        return this.http.delete(url);
    }
}
