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
  private CREATE_FOLDER: string;
  private RENAME_FOLDER: string;
  private DELETE_FOLDER: string;
  private DELETE_FILE: string;

  constructor(private http: HttpClient,
              private shared: SharedService) {
    this.SERVER_URL = this.shared.getServerURL();

    this.FOLDERS_LIST = this.SERVER_URL + '/api/materials/folder/list';
    this.GET_FOLDER_BY_ID = this.SERVER_URL + '/api/materials/folder/{id}';
    this.CREATE_FOLDER = this.SERVER_URL + '/api/materials/folder/create?name={name}';
    this.RENAME_FOLDER = this.SERVER_URL + '/api/materials/folder/rename/{id}?name={name}';
    this.DELETE_FOLDER = this.SERVER_URL + '/api/materials/folder/{id}';
    this.DELETE_FILE = this.SERVER_URL + '/api/materials/folder/{id}/deleteFile?fileId={fileId}';
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

  public createFolder(name: string) {
    const regExp = /{name}/gi;
    const url = this.CREATE_FOLDER.replace(regExp, name);
    return this.http.put<Observable<Object>>(url, null);
  }

  public renameFolder(name: string, folderId: number) {
    const regExp = /{id}/gi;
    const regExp2 = /{name}/gi;
    let url = this.RENAME_FOLDER.replace(regExp, folderId.toString());
    url = url.replace(regExp2, name);
    return this.http.post<Observable<Object>>(url, null);
  }

  deleteFolder(folderId: number) {
    const regExp = /{id}/gi;
    const url = this.DELETE_FOLDER.replace(regExp, folderId.toString());
    return this.http.delete<Observable<Object>>(url);
  }

  deleteFile(folderId: number, fileId: number) {
    const regExp = /{id}/gi;
    const regExp2 = /{fileId}/gi;
    let url = this.DELETE_FILE.replace(regExp, folderId.toString());
    url = url.replace(regExp2, fileId.toString());
    return this.http.post<Observable<Object>>(url, null);
  }
}
