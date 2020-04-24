import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SharedService} from './shared.service';

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {
    private SERVER_URL: string;

    private FEEDBACK_LIST: string;
    private FEEDBACK_DELETE_BY_ID: string;
    private FEEDBACK_CREATE: string;

    constructor(private http: HttpClient, private shared: SharedService) {
        this.SERVER_URL = this.shared.getServerURL();

        this.FEEDBACK_LIST = this.SERVER_URL + '/api/feedback/list';
        this.FEEDBACK_DELETE_BY_ID = this.SERVER_URL + '/api/feedback/{id}';
        this.FEEDBACK_CREATE = this.SERVER_URL + '/api/feedback/create';
    }

    private getOptions() {
        const headers: HttpHeaders = new HttpHeaders({
            'Authorization': 'Basic ' + this.shared.getStorage().getItem('token')
        });

        return {headers: headers};
    }

    public create(note: any) {
        return this.http.put(this.FEEDBACK_CREATE, note);
    }

    public list() {
        return this.http.get(this.FEEDBACK_LIST);
    }

    public delete(id: number) {
        const regExp = /{id}/gi;
        const url = this.FEEDBACK_DELETE_BY_ID.replace(regExp, id.toString());
        return this.http.delete(url);
    }
}