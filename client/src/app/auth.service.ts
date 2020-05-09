import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  url = `http://localhost:5000`
  token: string = '';
  user: User;
  errorMsgs = [{ msg: '' }]


  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    const body = { email, password };
    const url = this.url + `/auth`;
    this.http.post(url, body).subscribe((data: DataWithToken) => {

      this.token = data.token
      console.log('token: ', this.token)

      localStorage.removeItem('line_tst_token')
      localStorage.setItem('line_tst_token', this.token)
    }, ({ error }) => {

      this.errorMsgs = error.errors;
    });
  }

  logout() {
    localStorage.removeItem('line_tst_token')
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('line_tst_token') === this.token)
  }
}
