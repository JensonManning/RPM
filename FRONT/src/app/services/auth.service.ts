import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginReq } from './loginreq';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AuthResponse } from './authresponse';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/users';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiURL;

  private tokenKey='token';
  constructor(private http: HttpClient) { }

  login(data: LoginReq): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/account/login`, data)
      .pipe(map((response) => {
        if (response.isSuccess) {
          localStorage.setItem(this.tokenKey, response.token);
        }
        return response;
      })
    );
  }

  getToken = ():string|null => localStorage.getItem(this.tokenKey);

  logout = ():void => localStorage.removeItem(this.tokenKey);

  isLoggedIn = ():boolean => {
    const token = this.getToken();
    if(!token) {
      return false;
    }
    return !this.IsTokenEpired();
  }

  IsTokenEpired()  {
    const token = this.getToken();
    if(!token) {
      return true;
    }
    const decoded = jwtDecode(token);
    const IsTokenEpired = Date.now() > decoded['exp']! * 1000;
    if(IsTokenEpired){
      this.logout();
    }
    return IsTokenEpired;
  }

  getUserDetails():Observable<Users> {
    return this.http.get<Users>(`${this.apiUrl}/account/detail`);
  }

  private _userLoggedIn = new BehaviorSubject<boolean>(false);

  get userLoggedIn(): Observable<boolean> {
      console.log("get userLoggedIn " + this._userLoggedIn.value);
      return this._userLoggedIn.asObservable();
  }

  set userLoggedIn(value: boolean) {
      console.log("set userLoggedIn " + value);
      this._userLoggedIn.next(value);
  }
}
