import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../dto/user';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private SERVER_URL: string;

  private USER_LOGIN: string;
  private USER_AUTH: string;
  private USER_GET: string;
  private USER_DELETE: string;
  private USER_CREATE: string;
  private USER_UPDATE: string;
  private USER_ADD_USER_DATA: string;
  private USER_UPDATE_INFO: string;
  private USER_GET_BY_ID: string;
  private GET_UPLOADED_PHOTO: string;
  private GET_PORTFOLIO_USER: string;

  constructor(private http: HttpClient,
              private shared: SharedService) {
    this.SERVER_URL = this.shared.getServerURL();

    this.USER_LOGIN = this.SERVER_URL + '/api/user/login';
    this.USER_AUTH = this.SERVER_URL + '/api/user/auth';
    this.USER_GET = this.SERVER_URL + '/api/user/email/';
    this.USER_GET_BY_ID = this.SERVER_URL + '/api/user/{id}';
    this.USER_DELETE = this.SERVER_URL + '/api/user/{id}';
    this.USER_CREATE = this.SERVER_URL + '/api/user/create';
    this.USER_UPDATE = this.SERVER_URL + '/api/user/update';
    this.USER_ADD_USER_DATA = this.SERVER_URL + '/api/user/{id}/user_details';
    this.USER_UPDATE_INFO = this.SERVER_URL + '/api/user/{id}/user_details';
    this.GET_UPLOADED_PHOTO  = this.SERVER_URL + '/api/user/files/{name}';
    this.GET_PORTFOLIO_USER  = this.SERVER_URL + '/api/user/getPortfolioUser';
  }

  private getOptions() {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Basic ' + this.shared.getStorage().getItem('token')
    });

    return { headers: headers };
  }

  public login(email: string, password: string) {
    return this.http.post<Observable<boolean>>(this.USER_LOGIN, {
      email,
      password
    });
  }

  public auth() {
    return this.http.post<Observable<User>>(this.USER_AUTH, {}, this.getOptions());
  }

  public createUser(email: string, password: string) {
    return this.http.post<Observable<Object>>(this.USER_CREATE + '?email=' + email + '&password=' + password, null);
  }

  public getPortfolioUser() {
    return this.http.get<Observable<Object>>(this.GET_PORTFOLIO_USER);
  }

  public addUserDetails(id: number, request: any) {
    const regExp = /{id}/gi;
    const url = this.USER_ADD_USER_DATA.replace(regExp, id.toString());
    return this.http.put<Observable<Object>>(url, request);
  }

  public updateUser(user: any) {
    return this.http.post<Observable<Object>>(this.USER_UPDATE, user);
  }

  public updateUserInfo(user: User) {
    const regExp = /{id}/gi;
    const url = this.USER_UPDATE_INFO.replace(regExp, user.id.toString());
    return this.http.put<Observable<Object>>(url, user.userDetails.toObject());
  }

  public deleteUser(id: number) {
    const regExp = /{id}/gi;
    const url = this.USER_DELETE.replace(regExp, id.toString());
    return this.http.delete<Observable<Object>>(url);
  }

  public getById(id: string) {
    const regExp = /{id}/gi;
    const url = this.USER_GET_BY_ID.replace(regExp, id);
    return this.http.get<Observable<Object>>(url);
  }
}
