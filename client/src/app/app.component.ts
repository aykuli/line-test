import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import User from '../models/user'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: User;

  title = 'client';
  isAuth: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('../assets/user.json').subscribe((data: User) => this.user = data)
  }
}
