import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import constantas from '../assets/constantas';
import Data from '../models/data';
import LogInfo from '../models/log-info';
import { Router } from '@angular/router';


export interface DataWithToken {
  token: string
  userId: string
  data: Data
}

export interface User {
  email: string
  password: string
  id: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedOut = new BehaviorSubject(new LogInfo());
  dataSource = new BehaviorSubject(new Data());

  url = constantas.url
  token: string = localStorage.getItem(constantas.lineTestToken);
  user: User;
  impulses = null;

  errorMsgs: any = '';
  serverMsg = null;

  constructor(private http: HttpClient, public router: Router) { }

  login(email: string, password: string) {
    const body = { email, password };
    const url = this.url + constantas.authUrl;

    this.http.post(url, body).subscribe((data: DataWithToken) => {
      this.token = data.token;
      this.isLoggedOut.next({ isLoggedOut: false });

      this.router.navigate(['profile']);

      if (!this.isEmptyData(data.data)) {
        this.dataSource.next(data.data);
      }

      localStorage.removeItem(constantas.lineTestToken);
      localStorage.setItem(constantas.lineTestToken, this.token);
    }, ({ error }) => {
      this.errorMsgs = error.errors
        ? error.errors[0].msg
        : error.message;

      setTimeout(() => {
        this.errorMsgs = null;
      }, 2000)
    });
  }

  isEmptyData(obj: object) {
    for (let key in obj) {
      return false;
    }
    return true;
  }

  logout() {
    localStorage.removeItem(constantas.lineTestToken);
    this.isLoggedOut.next({ isLoggedOut: true });
    this.router.navigate(['login']);

    // отправляем данные на сервер, чтоб там сохранились результаты работы,
    // чтобы пользователь мог заходить с любой машины
    const data = this.dataSource.getValue();
    const body = !this.isEmptyData(data)
      ? {
        ...this.dataSource.getValue(),
        token: this.token,
        date: new Date()
      }
      : {
        token: this.token
      };
    const url = this.url + constantas.profileDataUrl;

    this.http.post(url, body).subscribe((data: any) => {
      this.serverMsg = data.message;

      setTimeout(() => {
        this.serverMsg = '';
      }, 2000)
    });
  }

  public get loggedIn(): boolean {
    return (!!localStorage.getItem(constantas.lineTestToken) && this.token !== null)
  }

  sendTestResult(dataToSend: any) {
    const body = !this.isEmptyData(dataToSend)
      ? {
        ...this.dataSource.getValue(),
        token: this.token, date: new Date()
      }
      : { token: this.token };
    const url = this.url + constantas.profileDataUrl;

    this.http.post(url, body)
      .subscribe((data: any) => this.impulses = data.impulses);
  }

  getPrevTestResults() {
    const body = { token: this.token };
    const url = this.url + constantas.profileDataUrl;

    return this.http.put(url, body);
  }
}