import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = `http://localhost:5000`
  token: string;
  user: object = { id: '222', email: '000', password: '000' };


  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    const body = { email, password };
    const url = this.url + `/auth`;
    return this.http.post(url, body);
  }

  getUser() {
    console.log('getting user')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.get(this.url + `/user`, httpOptions)
  }

  setUser() {
    this.user = this.getUser();
    console.log(this.user)
  }

  logout() {
    localStorage.removeItem('line_tst_token')
  }

  public get logIn(): boolean {
    return (localStorage.getItem('line_tst_token') !== null)
  }
}
