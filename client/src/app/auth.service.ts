import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const SERVER_PORT = 5000;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = `https://localhost:${SERVER_PORT}`
  token;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    this.http.post(this.url + `/auth`, { email, password }).subscribe((responce: any) => {
      console.log('authentificated')
      this.router.navigate(['profile']);
      localStorage.removeItem('line_test_token')
      localStorage.setItem('line_test_token', responce.token)
    })
  }
  logout() {
    localStorage.removeItem('line_tst_token')
  }

  public get logIn(): boolean {
    return (localStorage.getItem('line_tst_token') !== null)
  }
}
