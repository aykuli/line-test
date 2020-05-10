import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs'

import constantas from '../assets/contstantas';
class Data {
  isStartTest: boolean
  progressValue: number
  timeRemain: number
  isEndTest: boolean
  impulseCount: number
}
class LogInfo {
  isloggedOut: boolean
}
export interface DataWithToken {
  token: string
  userId: string
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
  isloggedOut = new BehaviorSubject(new LogInfo());
  dataSource = new BehaviorSubject(new Data());
  url = constantas.url
  token: string = localStorage.getItem(constantas.lineTestToken);
  user: User;
  errorMsgs: any = '';
  serverMsg: string = '';

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    this.isloggedOut.next({ isloggedOut: false })

    const body = { email, password };
    const url = this.url + constantas.auth;

    this.http.post(url, body).subscribe((data: DataWithToken) => {

      this.token = data.token;

      localStorage.removeItem(constantas.lineTestToken);
      localStorage.setItem(constantas.lineTestToken, this.token);
    }, ({ error }) => {

      if (error.errors) {
        this.errorMsgs = error.errors[0].msg;
      } else {
        this.errorMsgs = error.message;
      }
    });
  }

  logout() {
    localStorage.removeItem(constantas.lineTestToken);
    this.isloggedOut.next({ isloggedOut: true })

    // отправляем данные на сервер, чтоб там сохранились результаты работы,
    // чтобы пользователь мог заходить с любой машины
    const body = { ...this.dataSource.getValue(), token: this.token, date: Date.now() };
    const url = this.url + '/put-profile-data';

    this.http.put(url, body).subscribe((data: any) => {
      this.serverMsg = data.message;
      setTimeout(() => {
        this.serverMsg = '';
      }, 2000)
    });
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem(constantas.lineTestToken) === this.token && this.token !== null)
  }
}
