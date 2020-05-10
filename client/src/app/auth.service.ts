import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import constantas from '../assets/contstantas';

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
  url = constantas.url
  token: string = localStorage.getItem(constantas.lineTestToken);
  user: User;
  errorMsgs: any = '';


  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    const body = { email, password };
    const url = this.url + constantas.auth;
    this.http.post(url, body).subscribe((data: DataWithToken) => {

      this.token = data.token

      localStorage.removeItem(constantas.lineTestToken)
      localStorage.setItem(constantas.lineTestToken, this.token)
    }, ({ error }) => {

      if (error.errors) {
        this.errorMsgs = error.errors[0].msg;
      } else {
        this.errorMsgs = error.message;
      }
    });
  }

  logout() {
    localStorage.removeItem(constantas.lineTestToken)

  }

  public get loggedIn(): boolean {
    return (localStorage.getItem(constantas.lineTestToken) === this.token && this.token !== null)
  }
}
