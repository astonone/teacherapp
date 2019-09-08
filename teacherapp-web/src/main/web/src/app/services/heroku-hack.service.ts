import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';

@Injectable({
    providedIn: 'root'
})
export class HerokuHackService {
    private SERVER_URL: string;

    private CHECK: string;

    constructor(private http: HttpClient, private shared: SharedService) {
        this.SERVER_URL = this.shared.getServerURL();

        this.CHECK = this.SERVER_URL + '/api/heroku/check';
    }

    public check() {
        return this.http.get<Observable<Object>>(this.CHECK);
    }
}
