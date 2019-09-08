import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {
  private SERVER_URL: string;

  private FOLDERS_LIST: string;
  private GET_FOLDER_BY_ID: string;

  constructor(private http: HttpClient,
              private shared: SharedService) {
    this.SERVER_URL = this.shared.getServerURL();

    this.FOLDERS_LIST = this.SERVER_URL + '/api/materials/folder/list';
    this.GET_FOLDER_BY_ID = this.SERVER_URL + '/api/materials/folder/{id}';
  }

  private getOptions() {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Basic ' + this.shared.getStorage().getItem('token')
    });

    return { headers: headers };
  }

  public getFolders() {
    return this.http.get<Observable<Object>>(this.FOLDERS_LIST);
  }

  public getFolderById(folderId: number) {
    const regExp = /{id}/gi;
    const url = this.GET_FOLDER_BY_ID.replace(regExp, folderId.toString());
    return this.http.get<Observable<Object>>(url);
  }
}
